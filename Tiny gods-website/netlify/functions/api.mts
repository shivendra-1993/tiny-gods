import type { Config } from "@netlify/functions";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { enquiries, siteContent } from "../../db/schema.js";
// Initial site content, used to seed the database the first time it is read.
import defaultContent from "../../data/content.json" with { type: "json" };

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const SESSION_SECRET = process.env.SESSION_SECRET || ADMIN_PASSWORD;
const SESSION_COOKIE = "fieldwork.sid";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours, in seconds
const CONTENT_ROW_ID = 1;

type Content = Record<string, any>;

/* ---------- helpers ---------- */
function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(data, { status, headers });
}

function slugify(s: unknown) {
  return String(s).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "item";
}
function uniqueId(base: string, existingIds: string[]) {
  const id = slugify(base);
  let candidate = id;
  let n = 2;
  while (existingIds.includes(candidate)) {
    candidate = id + "-" + n;
    n++;
  }
  return candidate;
}

async function readBody(req: Request): Promise<any> {
  try { return await req.json(); } catch { return null; }
}

/* ---------- content storage ---------- */
async function readContent(): Promise<Content> {
  const [row] = await db.select().from(siteContent).where(eq(siteContent.id, CONTENT_ROW_ID));
  if (row) return row.data as Content;
  await db.insert(siteContent)
    .values({ id: CONTENT_ROW_ID, data: defaultContent })
    .onConflictDoNothing();
  return defaultContent as Content;
}

async function saveContent(data: Content) {
  await db.insert(siteContent)
    .values({ id: CONTENT_ROW_ID, data })
    .onConflictDoUpdate({ target: siteContent.id, set: { data, updatedAt: new Date() } });
}

/* ---------- sessions (stateless signed cookie) ---------- */
function sign(value: string) {
  return createHmac("sha256", SESSION_SECRET).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

function createSessionCookie() {
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000);
  const token = expires + "." + sign(expires);
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}`;
}

function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

function isAuthed(req: Request) {
  if (!SESSION_SECRET) return false;
  const cookies = req.headers.get("cookie") || "";
  const match = cookies.split(/;\s*/).find((c) => c.startsWith(SESSION_COOKIE + "="));
  if (!match) return false;
  const [expires, signature] = match.slice(SESSION_COOKIE.length + 1).split(".");
  if (!expires || !signature || !safeEqual(signature, sign(expires))) return false;
  return Number(expires) > Date.now();
}

const unauthorized = () => json({ error: "Not authenticated" }, 401);

/* ---------- router ---------- */
export default async (req: Request) => {
  const method = req.method;
  const parts = new URL(req.url).pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  const [resource, param] = parts;

  try {
    /* ---------- auth ---------- */
    if (resource === "login" && method === "POST") {
      if (!ADMIN_PASSWORD) {
        return json({ error: "Admin login is disabled until ADMIN_PASSWORD is set" }, 503);
      }
      const body = await readBody(req);
      const password = (body && body.password) || "";
      if (!safeEqual(String(password), ADMIN_PASSWORD)) {
        return json({ error: "Incorrect password" }, 401);
      }
      return json({ ok: true }, 200, { "Set-Cookie": createSessionCookie() });
    }

    if (resource === "logout" && method === "POST") {
      return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() });
    }

    if (resource === "session" && method === "GET") {
      return json({ authenticated: isAuthed(req) });
    }

    /* ---------- content (hero, about, services, work, team, etc.) ---------- */
    if (resource === "content" && !param) {
      if (method === "GET") return json(await readContent());
      if (method === "PUT") {
        if (!isAuthed(req)) return unauthorized();
        const body = await readBody(req);
        if (!body || typeof body !== "object" || Array.isArray(body)) {
          return json({ error: "Body must be a JSON object" }, 400);
        }
        await saveContent(body);
        return json(body);
      }
    }

    /* ---------- work / case studies ---------- */
    if (resource === "work") {
      if (!isAuthed(req)) return unauthorized();
      const content = await readContent();
      content.work = Array.isArray(content.work) ? content.work : [];

      if (method === "POST" && !param) {
        const item = (await readBody(req)) || {};
        if (!item.title) return json({ error: "title is required" }, 400);
        const existingIds = content.work.map((w: any) => w.id);
        item.id = item.id ? slugify(item.id) : uniqueId(item.title, existingIds);
        if (existingIds.includes(item.id)) item.id = uniqueId(item.id, existingIds);
        item.size = item.size || "span-3";
        item.gradient = item.gradient || "linear-gradient(135deg,#0F8B4C,#0A0A0A)";
        item.stats = Array.isArray(item.stats) ? item.stats : [];
        content.work.push(item);
        await saveContent(content);
        return json(item, 201);
      }

      if (param && (method === "PUT" || method === "DELETE")) {
        const idx = content.work.findIndex((w: any) => w.id === param);
        if (idx === -1) return json({ error: "Not found" }, 404);
        if (method === "PUT") {
          const updates = (await readBody(req)) || {};
          content.work[idx] = Object.assign({}, content.work[idx], updates, { id: content.work[idx].id });
          await saveContent(content);
          return json(content.work[idx]);
        }
        content.work.splice(idx, 1);
        await saveContent(content);
        return json({ ok: true });
      }
    }

    /* ---------- services ---------- */
    if (resource === "services") {
      if (!isAuthed(req)) return unauthorized();
      const content = await readContent();
      content.services = Array.isArray(content.services) ? content.services : [];

      if (method === "POST" && !param) {
        const item = (await readBody(req)) || {};
        if (!item.name) return json({ error: "name is required" }, 400);
        const service = { name: item.name, desc: item.desc || "" };
        content.services.push(service);
        await saveContent(content);
        return json(service, 201);
      }

      if (param !== undefined && (method === "PUT" || method === "DELETE")) {
        const i = parseInt(param, 10);
        if (isNaN(i) || i < 0 || i >= content.services.length) return json({ error: "Not found" }, 404);
        if (method === "PUT") {
          const updates = (await readBody(req)) || {};
          content.services[i] = Object.assign({}, content.services[i], updates);
          await saveContent(content);
          return json(content.services[i]);
        }
        content.services.splice(i, 1);
        await saveContent(content);
        return json({ ok: true });
      }
    }

    /* ---------- contact form enquiries ---------- */
    if (resource === "enquiries") {
      if (method === "POST" && !param) {
        const b = (await readBody(req)) || {};
        if (!b.name || !b.email || !b.projectType || !b.message) {
          return json({ error: "name, email, projectType and message are required" }, 400);
        }
        await db.insert(enquiries).values({
          id: randomUUID(),
          name: String(b.name), email: String(b.email),
          company: String(b.company || ""), phone: String(b.phone || ""),
          projectType: String(b.projectType), budget: String(b.budget || ""),
          timeline: String(b.timeline || ""), message: String(b.message),
          source: String(b.source || ""),
        });
        return json({ ok: true }, 201);
      }

      if (!isAuthed(req)) return unauthorized();

      if (method === "GET" && !param) {
        const rows = await db.select().from(enquiries).orderBy(desc(enquiries.submittedAt));
        return json(rows.map((r) => ({ ...r, submittedAt: r.submittedAt.toISOString() })));
      }

      if (method === "DELETE" && param) {
        const deleted = await db.delete(enquiries).where(eq(enquiries.id, param)).returning({ id: enquiries.id });
        if (deleted.length === 0) return json({ error: "Not found" }, 404);
        return json({ ok: true });
      }
    }

    return json({ error: "Not found" }, 404);
  } catch (err) {
    console.error(err);
    return json({ error: "Server error" }, 500);
  }
};

export const config: Config = {
  path: ["/api", "/api/*"],
};
