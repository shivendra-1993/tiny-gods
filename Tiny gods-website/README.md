# Fieldwork — Agency Site + Backend

A dark-themed agency site (green primary, black secondary) backed by a small
Express server: it serves the site, stores all content in a JSON file on
disk, and gives you a content admin at `/admin.html` to add work/case
studies, edit services, and manage everything else on the site live —
no redeploying, no downloading files.

## Run it locally

```bash
npm install
cp .env.example .env      # then edit .env — at minimum set ADMIN_PASSWORD
npm start
```

Visit http://localhost:3000 for the site, and http://localhost:3000/admin.html
to log in and edit content (the password is whatever you set as
ADMIN_PASSWORD).

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
  the admin (stored in `data/enquiries.json`), instead of disappearing.

## How storage works

`data/content.json` is the live database for everything except leads;
`data/enquiries.json` holds contact-form submissions. Both are just JSON
files read/written by `server.js` — good enough for a single-admin content
site. If you outgrow it, swap the `readJSON`/`writeJSON` helpers near the
top of `server.js` for calls to a real database (Postgres, SQLite, Mongo);
every route already goes through those two functions.

## Auth

Logging into `/admin.html` checks the password against `ADMIN_PASSWORD`
and sets an httpOnly session cookie (`express-session`) — nothing is ever
stored in the browser's localStorage. This is intentionally simple
(one shared password, one admin) — fine for a small agency site, but if
you need multiple admins or roles, replace the login route with real
user accounts.

## Deploying

This is a normal Node/Express app, so it runs anywhere Node runs:
Railway, Render, Fly.io, a VPS with `pm2`, etc. A few things to do before
going live:

1. Set real values for `ADMIN_PASSWORD` and `SESSION_SECRET` in your
   host's environment settings (never commit `.env`).
2. In `server.js`, uncomment `secure: true` on the session cookie once
   the site is served over HTTPS (it should always be, in production).
3. Make sure `data/` is on persistent storage — some hosts (e.g. certain
   serverless/edge platforms) wipe the filesystem on every deploy, which
   would erase your content and leads. A regular VPS or a host with a
   persistent disk/volume (Railway, Render with a disk, a droplet) is what
   this setup expects.
4. Point your domain at the host, as covered in the hosting steps we
   went over earlier.

## Project structure

```
server.js              Express app + API routes
package.json
.env.example
data/
  content.json          all site content (the "database")
  enquiries.json         contact-form submissions
public/
  index.html, about.html, services.html, work.html,
  contact.html, case-study.html, admin.html
  styles.css             shared design system (dark theme, green accent)
  script.js              interactions (nav, reveal, counters, form submit)
  render.js               fetches /api/content and renders each page
```
