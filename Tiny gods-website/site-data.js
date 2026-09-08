/* ============================================================
   SITE CONTENT
   This file is the single source of truth for all editable
   copy on the site. Every page loads it and renders itself
   from it. Edit it directly, or use admin.html to edit it
   through a form and download a replacement copy.
============================================================ */
const SITE_DATA = {

  brand: {
    name: "Fieldwork",
    ctaLabel: "Start a Project"
  },

  hero: {
    eyebrow: "Independent Design Agency — Est. 2016",
    headlinePre: "We design digital",
    headlineAccent: "experiences",
    headlinePost: "that move brands forward.",
    sub: "We are an independent design agency helping ambitious companies turn complex ideas into simple, meaningful and memorable digital experiences.",
    tags: "Strategy · UX/UI · Branding · Digital Products"
  },

  about: {
    eyebrow: "About Us",
    heading: "We are a design partner, not just a design vendor.",
    intro: "We partner with businesses at the intersection of strategy, technology and creativity. From defining a brand's direction to designing complex digital products, we bring clarity to complicated problems and create experiences people actually want to use.",
    extra: "We're independent by choice — small enough to stay close to every project, experienced enough to handle the ones other studios turn down.",
    quote: "Good design disappears. What's left is a business that finally makes sense to the people using it.",
    quoteWho: "Alex Morgan, Founder & Creative Director"
  },

  stats: [
    { num: 10,  suffix: "+", label: "Years of Experience" },
    { num: 150, suffix: "+", label: "Projects Delivered" },
    { num: 40,  suffix: "+", label: "Brands Transformed" },
    { num: 12,  suffix: "",  label: "Countries Reached" }
  ],

  services: [
    { name: "Brand Strategy", desc: "Brand positioning, identity strategy, research and brand direction." },
    { name: "UX/UI Design", desc: "User research, information architecture, wireframes, interaction design and high-fidelity UI." },
    { name: "Digital Products", desc: "Websites, SaaS platforms, mobile applications and enterprise products." },
    { name: "Design Systems", desc: "Scalable design systems, component libraries, design tokens and documentation." },
    { name: "Branding & Visual Identity", desc: "Logos, visual systems, typography, colour systems and brand guidelines." },
    { name: "Creative Design", desc: "Campaigns, marketing websites, digital experiences and creative direction." }
  ],

  work: [
    { id: "fintech",    title: "Fintech Platform",                 category: "UX/UI · Product Design",       size: "span-4",  gradient: "linear-gradient(135deg,#0F8B4C,#0A0A0A)" },
    { id: "healthcare", title: "Healthcare Digital Experience",     category: "UX/UI · Design System",        size: "span-2",  gradient: "linear-gradient(160deg,#8FE3B0,#0F8B4C)" },
    { id: "fashion",    title: "Luxury Fashion Brand",              category: "Branding · E-commerce",        size: "span-2s", gradient: "linear-gradient(135deg,#F0F0F0,#0A0A0A)" },
    { id: "saas",       title: "Enterprise SaaS Platform",          category: "Product Design · UX Strategy", size: "span-4",  gradient: "linear-gradient(110deg,#0A0A0A,#0F8B4C 80%)" },
    { id: "edtech",     title: "Education Technology Platform",     category: "UX/UI · Research",             size: "span-3",  gradient: "linear-gradient(150deg,#0F8B4C,#8FE3B0)" },
    { id: "mobility",   title: "Mobility & Transportation",         category: "Digital Product · UX/UI",      size: "span-3",  gradient: "linear-gradient(135deg,#0A0A0A,#4D4D4D)" }
  ],

  clients: ["NOVA","Vertex","Aster","Northstar","Finova","Lumina","Orbit","Elevate","Vercelix","Urban Labs"],

  testimonials: [
    { quote: "The team didn't just redesign our product — they helped us rethink the entire experience around our customers.", who: "Product Director, Fintech Company" },
    { quote: "Their ability to combine strategy with exceptional visual design made them an invaluable partner.", who: "Founder, Technology Startup" },
    { quote: "The new experience transformed how our customers interact with our platform, from day one.", who: "VP Product, Enterprise Company" }
  ],

  mission: { pre: "To make complex ideas", em: "simple", post: ", useful and meaningful through design." },
  vision:  { pre: "A future where every digital interaction feels", em: "intuitive", post: ", inclusive and human." },

  process: [
    { title: "Discover", desc: "Understand the business, users and opportunity." },
    { title: "Define",   desc: "Turn research into clear problems, priorities and strategy." },
    { title: "Explore",  desc: "Generate ideas, concepts and possible solutions." },
    { title: "Design",   desc: "Transform the strategy into intuitive digital experiences." },
    { title: "Deliver",  desc: "Build, test, refine and launch with confidence." }
  ],

  team: [
    { initials: "AM", name: "Alex Morgan",   role: "Founder & Creative Director",  bio: "Sets the creative direction and leads client partnerships from first call to final launch.", gradient: "linear-gradient(135deg,#0F8B4C,#0A0A0A)" },
    { initials: "SC", name: "Sarah Chen",    role: "Head of UX",                   bio: "Leads research and experience strategy across every engagement.", gradient: "linear-gradient(135deg,#8FE3B0,#0F8B4C)" },
    { initials: "DC", name: "Daniel Carter", role: "Senior Product Designer",      bio: "Turns strategy into interfaces people can actually use, end to end.", gradient: "linear-gradient(135deg,#0A0A0A,#4D4D4D)" },
    { initials: "MP", name: "Maya Patel",    role: "Brand Strategist",             bio: "Shapes positioning and narrative for brands entering new markets.", gradient: "linear-gradient(135deg,#0F8B4C,#8FE3B0)" },
    { initials: "RW", name: "Ryan Williams", role: "UI / Visual Designer",         bio: "Obsessed with type, colour and the details most people never notice.", gradient: "linear-gradient(135deg,#4D4D4D,#0A0A0A)" },
    { initials: "NK", name: "Nina Kapoor",   role: "UX Researcher",                bio: "Runs the studies and interviews that keep decisions grounded in reality.", gradient: "linear-gradient(135deg,#0A5C33,#8FE3B0)" },
    { initials: "JT", name: "Jordan Tan",    role: "Design Systems Lead",          bio: "Builds the components and tokens that keep products consistent at scale.", gradient: "linear-gradient(135deg,#0A0A0A,#0F8B4C)" },
    { initials: "EO", name: "Elena Osei",    role: "Delivery & Ops Lead",          bio: "Keeps projects moving on time, on scope and without the chaos.", gradient: "linear-gradient(135deg,#8FE3B0,#0A0A0A)" }
  ],

  contact: {
    email: "hello@fieldwork.studio",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    note: "Tell us what you're working on, where you're stuck, or what you're hoping to build. We'll take it from there.",
    responseTime: "Within 1 business day",
    hours: "Mon – Fri, 10:00 – 19:00 IST"
  },

  footer: {
    tagline: "Designing what comes next.",
    copyright: "© 2026 Fieldwork Studio. All rights reserved."
  }
};
