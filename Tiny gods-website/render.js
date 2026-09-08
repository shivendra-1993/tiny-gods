(function(){
  "use strict";
  if(typeof SITE_DATA === "undefined") return;
  var D = SITE_DATA;

  function arrow(){
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>';
  }
  function pad(n){ return (n < 10 ? "0" : "") + n; }

  /* ---------- HERO (home page) ---------- */
  var heroEyebrow = document.getElementById('heroEyebrow');
  if(heroEyebrow){
    heroEyebrow.textContent = D.hero.eyebrow;
    document.getElementById('heroHeadline').innerHTML =
      D.hero.headlinePre + ' <span class="accent-word">' + D.hero.headlineAccent + '</span> ' + D.hero.headlinePost;
    document.getElementById('heroSub').textContent = D.hero.sub;
    document.getElementById('heroTags').innerHTML = D.hero.tags.split(' · ').map(function(t){ return '<span>'+t+'</span>'; }).join(' · ');
  }

  /* ---------- ABOUT (teaser on home, full on about.html) ---------- */
  var aboutHeading = document.getElementById('aboutHeading');
  if(aboutHeading){
    document.getElementById('aboutEyebrow').textContent = D.about.eyebrow;
    aboutHeading.textContent = D.about.heading;
    document.getElementById('aboutIntro').textContent = D.about.intro;
    var aboutExtra = document.getElementById('aboutExtra');
    if(aboutExtra) aboutExtra.textContent = D.about.extra;
    var q = document.getElementById('aboutQuote');
    if(q) q.textContent = '\u201C' + D.about.quote + '\u201D';
    var qw = document.getElementById('aboutQuoteWho');
    if(qw) qw.textContent = D.about.quoteWho;
  }

  /* ---------- STATS (any page with #statsGrid) ---------- */
  var statsGrid = document.getElementById('statsGrid');
  if(statsGrid){
    statsGrid.innerHTML = D.stats.map(function(s){
      return '<div class="stat"><div class="num" data-count="'+s.num+'" data-suffix="'+s.suffix+'">0</div><div class="label">'+s.label+'</div></div>';
    }).join('');
  }

  /* ---------- SERVICES (any page with #servicesList) ---------- */
  var servicesList = document.getElementById('servicesList');
  if(servicesList){
    servicesList.innerHTML = D.services.map(function(s, i){
      return '<div class="service-row"><div class="idx">'+pad(i+1)+'</div><div class="name">'+s.name+'</div>'+
        '<div class="desc">'+s.desc+'</div><div class="arrow">'+arrow()+'</div></div>';
    }).join('');
  }

  /* ---------- WORK GRID (home teaser: first 3 · work.html: all 6) ---------- */
  function projCard(p){
    return '<a class="proj '+p.size+'" href="case-study.html?id='+p.id+'">'+
      '<div class="proj-media" style="background:'+p.gradient+';"></div>'+
      '<div class="proj-arrow">'+arrow()+'</div>'+
      '<div class="proj-body"><div class="proj-cat">'+p.category+'</div><div class="proj-title">'+p.title+'</div></div>'+
      '</a>';
  }
  var workTeaser = document.getElementById('workGridTeaser');
  if(workTeaser){
    workTeaser.innerHTML = D.work.slice(0,3).map(projCard).join('');
  }
  var workFull = document.getElementById('workGridFull');
  if(workFull){
    workFull.innerHTML = D.work.map(function(p, i){
      return projCard(Object.assign({}, p, { category: pad(i+1) + ' · ' + p.category }));
    }).join('');
  }

  /* ---------- CLIENTS (any page with #clientsGrid) ---------- */
  var clientsGrid = document.getElementById('clientsGrid');
  if(clientsGrid){
    clientsGrid.innerHTML = D.clients.map(function(c){ return '<div class="logo-cell">'+c+'</div>'; }).join('');
  }

  /* ---------- TESTIMONIALS (home page) ---------- */
  var testiGrid = document.getElementById('testimonialsGrid');
  if(testiGrid){
    testiGrid.innerHTML = D.testimonials.map(function(t){
      return '<div class="testi-card"><div class="testi-mark">\u201C</div><div class="testi-quote">'+t.quote+'</div><div class="testi-who">'+t.who+'</div></div>';
    }).join('');
  }

  /* ---------- MISSION / VISION (about.html) ---------- */
  var missionText = document.getElementById('missionText');
  if(missionText){
    missionText.innerHTML = D.mission.pre + ' <em>' + D.mission.em + '</em>' + D.mission.post;
    document.getElementById('visionText').innerHTML = D.vision.pre + ' <em>' + D.vision.em + '</em>' + D.vision.post;
  }

  /* ---------- PROCESS (about.html) ---------- */
  var processTrack = document.getElementById('processTrack');
  if(processTrack){
    processTrack.innerHTML = D.process.map(function(s, i){
      return '<div class="process-step"><div class="process-line"></div><div class="idx">'+pad(i+1)+'</div>'+
        '<div class="title">'+s.title+'</div><p>'+s.desc+'</p></div>';
    }).join('');
  }

  /* ---------- TEAM (about.html) ---------- */
  var teamGrid = document.getElementById('teamGrid');
  if(teamGrid){
    teamGrid.innerHTML = D.team.map(function(m){
      return '<div class="team-card"><div class="avatar" style="background:'+m.gradient+';">'+m.initials+'</div>'+
        '<div class="name">'+m.name+'</div><div class="role">'+m.role+'</div>'+
        '<p class="bio">'+m.bio+'</p><div class="social">LinkedIn \u2197</div></div>';
    }).join('');
  }

  /* ---------- CONTACT (contact.html) ---------- */
  var contactEmail = document.getElementById('contactEmail');
  if(contactEmail){
    contactEmail.textContent = D.contact.email;
    document.getElementById('contactPhone').textContent = D.contact.phone;
    document.getElementById('contactLocation').textContent = D.contact.location;
    document.getElementById('contactNote').textContent = D.contact.note;
    document.getElementById('contactResponseTime').textContent = D.contact.responseTime;
    document.getElementById('contactHours').textContent = D.contact.hours;
    document.querySelectorAll('.contact-detail dd[data-cms="email"]').forEach(function(el){ el.textContent = D.contact.email; });
  }

  /* ---------- FOOTER (every page) ---------- */
  document.querySelectorAll('[data-cms="footer.tagline"]').forEach(function(el){ el.textContent = D.footer.tagline; });
  document.querySelectorAll('[data-cms="footer.copyright"]').forEach(function(el){ el.textContent = D.footer.copyright; });
  document.querySelectorAll('[data-cms="contact.email"]').forEach(function(el){
    el.textContent = D.contact.email;
    if(el.tagName === 'A') el.href = 'mailto:' + D.contact.email;
  });

})();
