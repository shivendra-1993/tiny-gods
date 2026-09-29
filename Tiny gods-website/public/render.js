(function(){
  "use strict";

  function arrow(){
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>';
  }
  function pad(n){ return (n < 10 ? "0" : "") + n; }
  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }

  function render(D){
    /* ---------- HERO (home page) ---------- */
    var heroEyebrow = document.getElementById('heroEyebrow');
    if(heroEyebrow){
      heroEyebrow.textContent = D.hero.eyebrow;
      document.getElementById('heroHeadline').innerHTML =
        esc(D.hero.headlinePre) + ' <span class="accent-word">' + esc(D.hero.headlineAccent) + '</span> ' + esc(D.hero.headlinePost);
      document.getElementById('heroSub').textContent = D.hero.sub;
      document.getElementById('heroTags').innerHTML = D.hero.tags.split(' · ').map(function(t){ return '<span>'+esc(t)+'</span>'; }).join(' · ');
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

    /* ---------- STATS ---------- */
    var statsGrid = document.getElementById('statsGrid');
    if(statsGrid){
      statsGrid.innerHTML = D.stats.map(function(s){
        return '<div class="stat"><div class="num" data-count="'+s.num+'" data-suffix="'+esc(s.suffix)+'">0</div><div class="label">'+esc(s.label)+'</div></div>';
      }).join('');
    }

    /* ---------- SERVICES (list used on home, work, services pages) ---------- */
    var servicesList = document.getElementById('servicesList');
    if(servicesList){
      servicesList.innerHTML = D.services.map(function(s, i){
        return '<div class="service-row"><div class="idx">'+pad(i+1)+'</div><div class="name">'+esc(s.name)+'</div>'+
          '<div class="desc">'+esc(s.desc)+'</div><div class="arrow">'+arrow()+'</div></div>';
      }).join('');
    }
    var servicesEyebrow = document.getElementById('servicesPageEyebrow');
    if(servicesEyebrow && D.servicesPage){
      servicesEyebrow.textContent = D.servicesPage.eyebrow;
      document.getElementById('servicesPageHeading').textContent = D.servicesPage.heading;
      document.getElementById('servicesPageIntro').textContent = D.servicesPage.intro;
    }

    /* ---------- WORK GRID (home teaser: first 3 · work.html: all) ---------- */
    function projCard(p){
      var mediaStyle = p.image
        ? 'background-image:url(\'' + esc(p.image) + '\');background-size:cover;background-position:center;'
        : 'background:' + p.gradient + ';';
      return '<a class="proj '+p.size+'" href="case-study.html?id='+encodeURIComponent(p.id)+'">'+
        '<div class="proj-media" style="'+mediaStyle+'"></div>'+
        '<div class="proj-arrow">'+arrow()+'</div>'+
        '<div class="proj-body"><div class="proj-cat">'+esc(p.category)+'</div><div class="proj-title">'+esc(p.title)+'</div></div>'+
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

    /* ---------- CLIENTS ---------- */
    var clientsGrid = document.getElementById('clientsGrid');
    if(clientsGrid){
      clientsGrid.innerHTML = D.clients.map(function(c){ return '<div class="logo-cell">'+esc(c)+'</div>'; }).join('');
    }

    /* ---------- TESTIMONIALS ---------- */
    var testiGrid = document.getElementById('testimonialsGrid');
    if(testiGrid){
      testiGrid.innerHTML = D.testimonials.map(function(t){
        return '<div class="testi-card"><div class="testi-mark">\u201C</div><div class="testi-quote">'+esc(t.quote)+'</div><div class="testi-who">'+esc(t.who)+'</div></div>';
      }).join('');
    }

    /* ---------- MISSION / VISION ---------- */
    var missionText = document.getElementById('missionText');
    if(missionText){
      missionText.innerHTML = esc(D.mission.pre) + ' <em>' + esc(D.mission.em) + '</em>' + esc(D.mission.post);
      document.getElementById('visionText').innerHTML = esc(D.vision.pre) + ' <em>' + esc(D.vision.em) + '</em>' + esc(D.vision.post);
    }

    /* ---------- PROCESS ---------- */
    var processTrack = document.getElementById('processTrack');
    if(processTrack){
      processTrack.innerHTML = D.process.map(function(s, i){
        return '<div class="process-step"><div class="process-line"></div><div class="idx">'+pad(i+1)+'</div>'+
          '<div class="title">'+esc(s.title)+'</div><p>'+esc(s.desc)+'</p></div>';
      }).join('');
    }

    /* ---------- TEAM ---------- */
    var teamGrid = document.getElementById('teamGrid');
    if(teamGrid){
      teamGrid.innerHTML = D.team.map(function(m){
        return '<div class="team-card"><div class="avatar" style="background:'+m.gradient+';">'+esc(m.initials)+'</div>'+
          '<div class="name">'+esc(m.name)+'</div><div class="role">'+esc(m.role)+'</div>'+
          '<p class="bio">'+esc(m.bio)+'</p><div class="social">LinkedIn \u2197</div></div>';
      }).join('');
    }

    /* ---------- CONTACT ---------- */
    var contactEmail = document.getElementById('contactEmail');
    if(contactEmail){
      contactEmail.textContent = D.contact.email;
      document.getElementById('contactPhone').textContent = D.contact.phone;
      document.getElementById('contactLocation').textContent = D.contact.location;
      document.getElementById('contactNote').textContent = D.contact.note;
      document.getElementById('contactResponseTime').textContent = D.contact.responseTime;
      document.getElementById('contactHours').textContent = D.contact.hours;
    }

    /* ---------- CASE STUDY (case-study.html) ---------- */
    var csTitle = document.getElementById('csTitle');
    if(csTitle){
      var params = new URLSearchParams(window.location.search);
      var id = params.get('id') || (D.work[0] && D.work[0].id);
      var idx = D.work.findIndex(function(p){ return p.id === id; });
      if(idx === -1) idx = 0;
      var project = D.work[idx];
      var next = D.work[(idx + 1) % D.work.length];

      document.title = project.title + ' — Fieldwork';
      document.getElementById('crumbTitle').textContent = project.title;
      document.getElementById('csCategory').textContent = project.category;
      csTitle.textContent = project.title;
      document.getElementById('csOverview').textContent = project.overview || '';
      document.getElementById('csClient').textContent = project.client || '—';
      document.getElementById('csIndustry').textContent = project.industry || '—';
      document.getElementById('csServices').textContent = project.servicesProvided || '—';
      document.getElementById('csYear').textContent = project.year || '—';
      document.getElementById('csChallenge').textContent = project.challenge || '';
      document.getElementById('csApproach').textContent = project.approach || '';
      document.getElementById('csSolution').textContent = project.solution || '';
      document.getElementById('csCover').style.background = project.gradient;
      document.getElementById('csNextTitle').textContent = next.title;
      document.getElementById('csNextLink').href = 'case-study.html?id=' + encodeURIComponent(next.id);

      var gallery = document.getElementById('csGallery');
      var hexes = (project.gradient.match(/#[0-9A-Fa-f]{6}/g) || ['#0F8B4C','#0A0A0A']);
      gallery.innerHTML =
        '<div style="background:'+project.gradient+';"></div>' +
        '<div style="background:linear-gradient(225deg,'+hexes.slice().reverse().join(',')+');"></div>';

      var statsWrap = document.getElementById('csStats');
      statsWrap.innerHTML = (project.stats || []).map(function(s){
        return '<div class="stat"><div class="num" data-count="'+s.num+'" data-suffix="'+esc(s.suffix)+'">0</div><div class="label">'+esc(s.label)+'</div></div>';
      }).join('');
    }

    /* ---------- FOOTER (every page) ---------- */
    document.querySelectorAll('[data-cms="footer.tagline"]').forEach(function(el){ el.textContent = D.footer.tagline; });
    document.querySelectorAll('[data-cms="footer.copyright"]').forEach(function(el){ el.textContent = D.footer.copyright; });
    document.querySelectorAll('[data-cms="contact.email"]').forEach(function(el){
      el.textContent = D.contact.email;
      if(el.tagName === 'A') el.href = 'mailto:' + D.contact.email;
    });
  }

  function boot(){
    fetch('/api/content')
      .then(function(res){
        if(!res.ok) throw new Error('Failed to load content (' + res.status + ')');
        return res.json();
      })
      .then(function(D){
        render(D);
        window.__SITE_CONTENT__ = D;
        if(window.initInteractions) window.initInteractions();
        document.dispatchEvent(new CustomEvent('site:rendered', { detail: D }));
      })
      .catch(function(err){
        console.error(err);
        var main = document.querySelector('main');
        if(main){
          var notice = document.createElement('div');
          notice.className = 'wrap';
          notice.style.padding = '160px 0 80px';
          notice.innerHTML = '<p style="font-family:var(--mono);font-size:14px;color:#C23B2C;">Could not reach the content server. Make sure the backend is running (npm start) and reload this page.</p>';
          main.prepend(notice);
        }
        if(window.initInteractions) window.initInteractions();
      });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
