# Fieldwork — Agency Site + Backend

A dark-themed agency site (green primary, black secondary) hosted on
Netlify. The static pages are served from `public/`, a Netlify Function
(`netlify/functions/api.mts`) provides the `/api/*` routes, and all content
and contact-form enquiries are stored in Netlify Database (managed
Postgres). A content admin at `/admin.html` lets you add work/case
studies, edit services, and manage everything else on the site live —
no redeploying, no downloading files.

## Run it locally

```bash
npm install
cp .env.example .env      # then edit .env — at minimum set ADMIN_PASSWORD
netlify dev
```

`netlify dev` serves the site, runs the API function and connects to
the database. Visit `/admin.html` to log in with your ADMIN_PASSWORD.

## What's dynamic

- **Work / Case studies** — add, edit, or remove a project in the admin's
  "Work / Case Studies" panel. Each one automatically becomes a portfolio
  card (on Home + Work) and a full case-study page at
  `case-study.html?id=<its-id>` — no extra step.
- **Services** — edit the six-service list, or the standalone
  `/services.html` page's intro copy, from the admin.
- **Everything else on the site** — hero copy, about text, stats,
  clients, testimonials, mission/vision, process, team, contact details,
  footer — all editable the same way.
- **Contact form submissions** — land in a "Project Enquiries" panel in
  the admin (stored in the `enquiries` database table), instead of disappearing.

## How storage works

Site content lives in the `site_content` table as a single JSON document.
The first time it is read, it is seeded from `data/content.json`, which
is not published to the web. Contact-form submissions live in the
`enquiries` table. The schema is defined in `db/schema.ts` (Drizzle ORM).
After changing it, run `npx drizzle-kit generate --name <change>`.
Netlify applies the migrations in `netlify/database/migrations/`
automatically on deploy.

## Auth

Logging into `/admin.html` checks the password against `ADMIN_PASSWORD`
and sets an httpOnly, Secure cookie signed with `SESSION_SECRET` that
expires after 8 hours. Nothing is stored in localStorage. Admin login is
disabled until `ADMIN_PASSWORD` is set. This is intentionally simple
(one shared password, one admin). If you need multiple admins or roles,
switch to real user accounts, such as Netlify Identity.

## Deploying

`netlify.toml` at the repository root points Netlify at this folder
(`base = "Tiny gods-website"`) and publishes `public/`. Before going live:

1. Set `ADMIN_PASSWORD` and `SESSION_SECRET` under Project configuration →
   Environment variables in the Netlify UI (never commit `.env`).
2. Deploy. Database migrations run automatically before the deploy is
   published.

## Project structure

```
netlify/functions/api.mts   all /api/* routes
netlify/database/migrations generated SQL migrations
db/schema.ts, db/index.ts   database schema and client
drizzle.config.ts
data/content.json           initial content (seeds the database)
public/
  index.html, about.html, services.html, work.html,
  contact.html, case-study.html, admin.html
  styles.css             shared design system (dark theme, green accent)
  script.js              interactions (nav, reveal, counters, form submit)
  render.js              fetches /api/content and renders each page
```
