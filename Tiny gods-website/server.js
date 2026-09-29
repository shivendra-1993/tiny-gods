try { require('dotenv').config(); } catch(e) { /* dotenv is optional — fine if not installed */ }

const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret-please-change';

const DATA_DIR = path.join(__dirname, 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

if(!fs.existsSync(ENQUIRIES_FILE)){
  fs.writeFileSync(ENQUIRIES_FILE, '[]');
}

/* ---------- tiny file-backed "database" ---------- */
// A write queue keeps concurrent saves from corrupting the file — fine for
// a single-admin content site. Swap readJSON/writeJSON for a real database
// (Postgres, SQLite, Mongo) later without touching any route below except
// these two helpers.
let writeQueue = Promise.resolve();

function readJSON(file){
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
function writeJSON(file, data){
  writeQueue = writeQueue.then(function(){
    return fs.promises.writeFile(file, JSON.stringify(data, null, 2));
  });
  return writeQueue;
}

function readContent(){ return readJSON(CONTENT_FILE); }
function saveContent(data){ return writeJSON(CONTENT_FILE, data); }
function readEnquiries(){ return readJSON(ENQUIRIES_FILE); }
function saveEnquiries(data){ return writeJSON(ENQUIRIES_FILE, data); }

function slugify(s){
  return String(s).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'item';
}
function uniqueId(base, existingIds){
  let id = slugify(base);
  let candidate = id;
  let n = 2;
  while(existingIds.includes(candidate)){
    candidate = id + '-' + n;
    n++;
  }
  return candidate;
}

/* ---------- middleware ---------- */
app.use(express.json({ limit: '2mb' }));
app.use(session({
  name: 'fieldwork.sid',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 8 // 8 hours
    // secure: true  -- enable this once the site is served over HTTPS
  }
}));

function requireAuth(req, res, next){
  if(req.session && req.session.authed) return next();
  return res.status(401).json({ error: 'Not authenticated' });
}

/* ---------- auth ---------- */
app.post('/api/login', function(req, res){
  const password = (req.body && req.body.password) || '';
  // Constant-time-ish comparison to avoid trivial timing leaks.
  const a = Buffer.from(password);
  const b = Buffer.from(ADMIN_PASSWORD);
  const match = a.length === b.length && crypto.timingSafeEqual(a, b);
  if(!match) return res.status(401).json({ error: 'Incorrect password' });
  req.session.authed = true;
  res.json({ ok: true });
});

app.post('/api/logout', function(req, res){
  req.session.destroy(function(){ res.json({ ok: true }); });
});

app.get('/api/session', function(req, res){
  res.json({ authenticated: !!(req.session && req.session.authed) });
});

/* ---------- content (hero, about, services, work, team, etc.) ---------- */
app.get('/api/content', function(req, res){
  res.json(readContent());
});

app.put('/api/content', requireAuth, function(req, res){
  const body = req.body;
  if(!body || typeof body !== 'object' || Array.isArray(body)){
    return res.status(400).json({ error: 'Body must be a JSON object' });
  }
  saveContent(body).then(function(){
    res.json(body);
  }).catch(function(err){
    res.status(500).json({ error: 'Failed to save content', detail: String(err) });
  });
});

/* ---------- work / case studies ---------- */
app.post('/api/work', requireAuth, function(req, res){
  const content = readContent();
  const item = req.body || {};
  if(!item.title) return res.status(400).json({ error: 'title is required' });
  const existingIds = content.work.map(function(w){ return w.id; });
  item.id = item.id ? slugify(item.id) : uniqueId(item.title, existingIds);
  if(existingIds.includes(item.id)) item.id = uniqueId(item.id, existingIds);
  item.size = item.size || 'span-3';
  item.gradient = item.gradient || 'linear-gradient(135deg,#0F8B4C,#0A0A0A)';
  item.stats = Array.isArray(item.stats) ? item.stats : [];
  content.work.push(item);
  saveContent(content).then(function(){
    res.status(201).json(item);
  }).catch(function(err){
    res.status(500).json({ error: 'Failed to save', detail: String(err) });
  });
});

app.put('/api/work/:id', requireAuth, function(req, res){
  const content = readContent();
  const idx = content.work.findIndex(function(w){ return w.id === req.params.id; });
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  content.work[idx] = Object.assign({}, content.work[idx], req.body, { id: content.work[idx].id });
  saveContent(content).then(function(){
    res.json(content.work[idx]);
  }).catch(function(err){
    res.status(500).json({ error: 'Failed to save', detail: String(err) });
  });
});

app.delete('/api/work/:id', requireAuth, function(req, res){
  const content = readContent();
  const before = content.work.length;
  content.work = content.work.filter(function(w){ return w.id !== req.params.id; });
  if(content.work.length === before) return res.status(404).json({ error: 'Not found' });
  saveContent(content).then(function(){
    res.json({ ok: true });
  }).catch(function(err){
    res.status(500).json({ error: 'Failed to save', detail: String(err) });
  });
});

/* ---------- services ---------- */
app.post('/api/services', requireAuth, function(req, res){
  const content = readContent();
  const item = req.body || {};
  if(!item.name) return res.status(400).json({ error: 'name is required' });
  content.services.push({ name: item.name, desc: item.desc || '' });
  saveContent(content).then(function(){
    res.status(201).json(content.services[content.services.length - 1]);
  }).catch(function(err){
    res.status(500).json({ error: 'Failed to save', detail: String(err) });
  });
});

app.put('/api/services/:index', requireAuth, function(req, res){
  const content = readContent();
  const i = parseInt(req.params.index, 10);
  if(isNaN(i) || i < 0 || i >= content.services.length) return res.status(404).json({ error: 'Not found' });
  content.services[i] = Object.assign({}, content.services[i], req.body);
  saveContent(content).then(function(){
    res.json(content.services[i]);
  }).catch(function(err){
    res.status(500).json({ error: 'Failed to save', detail: String(err) });
  });
});

app.delete('/api/services/:index', requireAuth, function(req, res){
  const content = readContent();
  const i = parseInt(req.params.index, 10);
  if(isNaN(i) || i < 0 || i >= content.services.length) return res.status(404).json({ error: 'Not found' });
  content.services.splice(i, 1);
  saveContent(content).then(function(){
    res.json({ ok: true });
  }).catch(function(err){
    res.status(500).json({ error: 'Failed to save', detail: String(err) });
  });
});

/* ---------- contact form enquiries ---------- */
app.post('/api/enquiries', function(req, res){
  const b = req.body || {};
  if(!b.name || !b.email || !b.projectType || !b.message){
    return res.status(400).json({ error: 'name, email, projectType and message are required' });
  }
  const enquiries = readEnquiries();
  const entry = {
    id: crypto.randomUUID(),
    name: b.name, email: b.email, company: b.company || '', phone: b.phone || '',
    projectType: b.projectType, budget: b.budget || '', timeline: b.timeline || '',
    message: b.message, source: b.source || '',
    submittedAt: new Date().toISOString()
  };
  enquiries.unshift(entry);
  saveEnquiries(enquiries).then(function(){
    res.status(201).json({ ok: true });
  }).catch(function(err){
    res.status(500).json({ error: 'Failed to save enquiry', detail: String(err) });
  });
});

app.get('/api/enquiries', requireAuth, function(req, res){
  res.json(readEnquiries());
});

app.delete('/api/enquiries/:id', requireAuth, function(req, res){
  const enquiries = readEnquiries();
  const before = enquiries.length;
  const filtered = enquiries.filter(function(e){ return e.id !== req.params.id; });
  if(filtered.length === before) return res.status(404).json({ error: 'Not found' });
  saveEnquiries(filtered).then(function(){
    res.json({ ok: true });
  }).catch(function(err){
    res.status(500).json({ error: 'Failed to save', detail: String(err) });
  });
});

/* ---------- static site ---------- */
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function(){
  console.log('Fieldwork server running at http://localhost:' + PORT);
  if(ADMIN_PASSWORD === 'changeme'){
    console.log('⚠ Using the default admin password — set ADMIN_PASSWORD in your environment before deploying.');
  }
});
