(function(){
  "use strict";

  /* ---------- header scroll state ---------- */
  var header = document.getElementById('siteHeader');
  if(header){
    var onScroll = function(){
      if(window.scrollY > 40){ header.classList.add('scrolled'); }
      else{ header.classList.remove('scrolled'); }
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById('burgerBtn');
  var mobileNav = document.getElementById('mobileNav');
  if(burger && mobileNav){
    burger.addEventListener('click', function(){
      var open = mobileNav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        mobileNav.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal, .process-step');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  /* ---------- animated counters ---------- */
  var counters = document.querySelectorAll('.stat .num');
  var animateCounter = function(el){
    var target = parseInt(el.getAttribute('data-count'),10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400, startTime = null;
    var step = function(ts){
      if(!startTime) startTime = ts;
      var progress = Math.min((ts - startTime)/duration, 1);
      var eased = 1 - Math.pow(1-progress, 3);
      el.textContent = Math.round(eased*target) + suffix;
      if(progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if(counters.length && 'IntersectionObserver' in window){
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ animateCounter(entry.target); cio.unobserve(entry.target); }
      });
    }, {threshold:.6});
    counters.forEach(function(el){ cio.observe(el); });
  }

  /* ---------- hero pixel grid animation (home page only) ---------- */
  var grid = document.getElementById('pixelGrid');
  if(grid){
    var cells = [];
    for(var i=0;i<72;i++){
      var d = document.createElement('div');
      grid.appendChild(d);
      cells.push(d);
    }
    var palette = ['#F0F0F0','#F0F0F0','#F0F0F0','#0F8B4C','#8FE3B0','#0A0A0A'];
    function pulseGrid(){
      var count = 6 + Math.floor(Math.random()*6);
      for(var i=0;i<count;i++){
        (function(){
          var cell = cells[Math.floor(Math.random()*cells.length)];
          var color = palette[Math.floor(Math.random()*palette.length)];
          cell.style.background = color;
          setTimeout(function(){ cell.style.background = '#F0F0F0'; }, 1300 + Math.random()*900);
        })();
      }
    }
    pulseGrid();
    setInterval(pulseGrid, 900);
  }

  /* ---------- magnetic buttons ---------- */
  var magnets = document.querySelectorAll('.btn-primary, .btn-ghost');
  magnets.forEach(function(btn){
    btn.addEventListener('mousemove', function(e){
      var r = btn.getBoundingClientRect();
      var x = e.clientX - r.left - r.width/2;
      var y = e.clientY - r.top - r.height/2;
      btn.style.transform = 'translate(' + (x*0.18) + 'px,' + (y*0.35) + 'px)';
    });
    btn.addEventListener('mouseleave', function(){
      btn.style.transform = 'translate(0,0)';
    });
  });

  /* ---------- contact form validation (contact page only) ---------- */
  var form = document.getElementById('projectForm');
  if(form){
    var submitBtn = document.getElementById('submitBtn');
    var formStatus = document.getElementById('formStatus');
    var successState = document.getElementById('successState');

    function setError(fieldName, hasError){
      var field = form.querySelector('[data-field="'+fieldName+'"]');
      if(!field) return;
      field.classList.toggle('error', hasError);
    }

    function isValidEmail(v){
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var projectType = form.projectType.value;
      var message = form.message.value.trim();

      var valid = true;
      if(name.length < 2){ setError('name', true); valid = false; } else { setError('name', false); }
      if(!isValidEmail(email)){ setError('email', true); valid = false; } else { setError('email', false); }
      if(!projectType){ setError('projectType', true); valid = false; } else { setError('projectType', false); }
      if(message.length < 10){ setError('message', true); valid = false; } else { setError('message', false); }

      if(!valid){
        formStatus.textContent = 'Please check the highlighted fields.';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      formStatus.textContent = '';

      setTimeout(function(){
        successState.classList.add('show');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Project Enquiry <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>';
      }, 1100);
    });
  }

})();
