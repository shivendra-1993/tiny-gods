(function(){
  "use strict";

  var projects = [
    {
      id:"fintech",
      title:"Fintech Platform",
      category:"UX/UI · Product Design",
      client:"Finova",
      industry:"Financial Services",
      services:"UX Research, UI Design, Design System",
      year:"2025",
      overview:"A ground-up redesign of a personal finance platform used by over 200,000 people to track spending, budget and invest.",
      challenge:"Finova's existing product had grown feature by feature over four years with no shared design language. Core tasks like setting a budget took too many steps, and new users dropped off before reaching the features that made the product valuable.",
      approach:"We started with usage data and 14 customer interviews to map where people actually got stuck. From there we rebuilt the information architecture around three jobs — track, budget, grow — and prototyped the new flows with real account data in weekly sessions with the Finova team.",
      solution:"The result is a cleaner product built on a new design system: a simplified dashboard, a redesigned budgeting flow that takes a third of the steps, and a component library the internal team now maintains and extends themselves.",
      gradient:"linear-gradient(135deg,#0F8B4C,#0A0A0A)",
      stats:[
        {num:38, suffix:"%", label:"Faster onboarding completion"},
        {num:52, suffix:"%", label:"Increase in weekly active use"},
        {num:4.7, suffix:"/5", label:"Post-launch satisfaction score"}
      ]
    },
    {
      id:"healthcare",
      title:"Healthcare Digital Experience",
      category:"UX/UI · Design System",
      client:"Northstar Health",
      industry:"Healthcare",
      services:"UX/UI Design, Design System, Accessibility Audit",
      year:"2024",
      overview:"A patient portal redesign for a healthcare network serving over 40 clinics, built around clarity and accessibility for a wide range of ages and abilities.",
      challenge:"Patients were missing appointments and struggling to find test results in a portal that hadn't been redesigned in nearly a decade. Accessibility complaints were rising, and clinic staff were fielding calls the portal should have prevented.",
      approach:"We ran accessibility audits alongside in-clinic observation sessions with patients across different age groups, then rebuilt the core flows — booking, results, messaging — around a WCAG-conscious component library from day one.",
      solution:"A calmer, higher-contrast interface with a simplified appointment flow, plain-language results pages, and a documented design system the clinical software team now ships new features against.",
      gradient:"linear-gradient(160deg,#8FE3B0,#0F8B4C)",
      stats:[
        {num:29, suffix:"%", label:"Fewer missed appointments"},
        {num:61, suffix:"%", label:"Drop in support call volume"},
        {num:100, suffix:"%", label:"WCAG AA conformance"}
      ]
    },
    {
      id:"fashion",
      title:"Luxury Fashion Brand",
      category:"Branding · E-commerce",
      client:"Aster",
      industry:"Fashion & Retail",
      services:"Brand Strategy, Visual Identity, E-commerce Design",
      year:"2024",
      overview:"A full brand identity and flagship e-commerce experience for an independent luxury fashion label expanding into direct-to-consumer.",
      challenge:"Aster had strong wholesale relationships but no consistent brand identity of its own, and no direct e-commerce presence — leaving it dependent on retail partners to tell its story.",
      approach:"We developed a brand strategy and visual identity from the ground up — name treatment, typography, colour system, photography direction — then translated it into a flagship online store designed to feel as considered as the product itself.",
      solution:"A monochrome, editorial identity system and a custom e-commerce experience with an emphasis on large imagery, minimal navigation, and a checkout built for conversion without feeling transactional.",
      gradient:"linear-gradient(135deg,#F0F0F0,#0A0A0A)",
      stats:[
        {num:3.1, suffix:"x", label:"Direct-to-consumer revenue growth"},
        {num:44, suffix:"%", label:"Increase in average order value"},
        {num:18, suffix:"pts", label:"Brand recognition lift"}
      ]
    },
    {
      id:"saas",
      title:"Enterprise SaaS Platform",
      category:"Product Design · UX Strategy",
      client:"Vertex",
      industry:"Enterprise Software",
      services:"UX Strategy, Product Design, Design System",
      year:"2025",
      overview:"A redesign of Vertex's core operations platform, used daily by enterprise teams to manage complex, multi-step workflows.",
      challenge:"The product had accumulated years of feature requests with no unifying UX strategy, resulting in inconsistent patterns across modules and a steep learning curve for new customers.",
      approach:"We audited every module against a shared set of interaction patterns, consolidated overlapping features, and worked with Vertex's product and engineering teams to phase the rebuild without disrupting existing customers.",
      solution:"A unified design system rolled out module by module, a redesigned navigation model that scales to hundreds of workflows, and a measurable drop in time-to-proficiency for new customer teams.",
      gradient:"linear-gradient(110deg,#0A0A0A,#0F8B4C 80%)",
      stats:[
        {num:47, suffix:"%", label:"Faster time-to-proficiency"},
        {num:31, suffix:"%", label:"Reduction in support tickets"},
        {num:9, suffix:"", label:"Modules unified under one system"}
      ]
    },
    {
      id:"edtech",
      title:"Education Technology Platform",
      category:"UX/UI · Research",
      client:"Lumina",
      industry:"Education",
      services:"UX Research, UX/UI Design",
      year:"2023",
      overview:"A learning platform redesign for a K-12 edtech company, built around research with both students and teachers.",
      challenge:"Teachers found the assignment and grading tools confusing, and student engagement dropped off sharply after the first few weeks of each term.",
      approach:"We ran separate research tracks with teachers and students, since their needs pulled in different directions, then designed two tailored experiences from a shared underlying system.",
      solution:"A simplified teacher dashboard for assigning and grading work in fewer steps, and a more visual, encouraging student experience designed to sustain engagement across a full term.",
      gradient:"linear-gradient(150deg,#0F8B4C,#8FE3B0)",
      stats:[
        {num:56, suffix:"%", label:"Improved term-long engagement"},
        {num:33, suffix:"%", label:"Faster grading workflow"},
        {num:4.6, suffix:"/5", label:"Teacher satisfaction score"}
      ]
    },
    {
      id:"mobility",
      title:"Mobility & Transportation",
      category:"Digital Product · UX/UI",
      client:"Orbit",
      industry:"Mobility & Transportation",
      services:"Product Design, UX/UI Design",
      year:"2023",
      overview:"A rider app for a multi-modal mobility platform combining bikes, scooters and transit passes into a single experience.",
      challenge:"Riders had to switch between separate apps for each mode of transport, and pricing across modes was confusing enough that many people defaulted to a single option out of habit.",
      approach:"We mapped full rider journeys across modes and built a unified booking and payment flow, with a pricing comparison view designed to make multi-modal trips feel like the obvious choice.",
      solution:"One app covering bikes, scooters and transit, with real-time availability, unified payment, and a route planner that compares cost and time across every available mode.",
      gradient:"linear-gradient(135deg,#0A0A0A,#4D4D4D)",
      stats:[
        {num:2.4, suffix:"x", label:"Increase in multi-modal trips"},
        {num:41, suffix:"%", label:"Faster average checkout"},
        {num:12, suffix:"", label:"Cities launched in year one"}
      ]
    }
  ];

  function getParam(name){
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  var id = getParam('id') || 'fintech';
  var index = projects.findIndex(function(p){ return p.id === id; });
  if(index === -1) index = 0;
  var project = projects[index];
  var next = projects[(index + 1) % projects.length];

  document.getElementById('pageTitle').textContent = project.title + ' — Fieldwork';
  document.getElementById('crumbTitle').textContent = project.title;
  document.getElementById('csCategory').textContent = project.category;
  document.getElementById('csTitle').textContent = project.title;
  document.getElementById('csOverview').textContent = project.overview;
  document.getElementById('csClient').textContent = project.client;
  document.getElementById('csIndustry').textContent = project.industry;
  document.getElementById('csServices').textContent = project.services;
  document.getElementById('csYear').textContent = project.year;
  document.getElementById('csChallenge').textContent = project.challenge;
  document.getElementById('csApproach').textContent = project.approach;
  document.getElementById('csSolution').textContent = project.solution;
  document.getElementById('csCover').style.background = project.gradient;
  document.getElementById('csNextTitle').textContent = next.title;
  document.getElementById('csNextLink').href = 'case-study.html?id=' + next.id;

  var gallery = document.getElementById('csGallery');
  for(var i=0;i<2;i++){
    var block = document.createElement('div');
    block.style.background = i === 0 ? project.gradient : 'linear-gradient(225deg,' + project.gradient.match(/#[0-9A-Fa-f]{6}/g).reverse().join(',') + ')';
    gallery.appendChild(block);
  }

  var statsWrap = document.getElementById('csStats');
  project.stats.forEach(function(s){
    var div = document.createElement('div');
    div.className = 'stat';
    div.innerHTML = '<div class="num" data-count="'+s.num+'" data-suffix="'+s.suffix+'">0</div><div class="label">'+s.label+'</div>';
    statsWrap.appendChild(div);
  });

})();
