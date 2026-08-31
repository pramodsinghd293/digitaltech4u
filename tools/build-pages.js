const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const site = "https://digitaltech4u.com";

function shell({ title, desc, canonical, base, body, extraHead = "" }) {
  const prefix = base === "." ? "" : "../";
  return `<!DOCTYPE html>
<html lang="en-IN" data-base="${base}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <link rel="icon" href="${prefix}images/favicon-mark.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,500&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${prefix}css/style.css">
  ${extraHead}
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <div id="site-announce"></div>
  <div id="site-header"></div>
  <main id="main">${body}</main>
  <div id="site-footer"></div>
  <script src="${prefix}js/config.js"></script>
  <script src="${prefix}js/api.js"></script>
  <script src="${prefix}js/articles.js"></script>
  <script src="${prefix}js/components.js"></script>
  <script src="${prefix}js/main.js"></script>
</body>
</html>
`;
}

function pageHero(img, alt, h1, crumb) {
  return `
  <section class="page-hero">
    <img class="hero__bg" src="${img}" alt="${alt}">
    <div class="hero__overlay"></div>
    <div class="container hero__content">
      <p class="eyebrow">digitaltech4u · India's Best Web Agency</p>
      <h1>${h1}</h1>
      <p class="crumbs">Home &gt; <span>${crumb}</span></p>
    </div>
  </section>`;
}

const pages = [];

pages.push({
  file: "about.html",
  title: "About digitaltech4u | 20+ Developers & 100+ Happy Customers",
  desc: "digitaltech4u is a Gwalior-registered IT company providing A to Z websites, apps, software and digital marketing across India.",
  canonical: site + "/about.html",
  base: ".",
  body: `
    ${pageHero("images/team-developers.png", "digitaltech4u expert developers team", "A to Z digital partner for Indian business", "About Us")}
    <section class="section"><div class="container grid-2">
      <div>
        <h2>We build, then we <em>stay</em></h2>
        <p>digitaltech4u exists so a shop in Gwalior, a clinic in Delhi or a manufacturer in Indore can get a real website, real marketing and real support without hiring a full IT department. Website designing starts at ₹4,999 with minimal maintenance charges.</p>
        <p>Our 20+ developers, designers and marketers ship end-to-end: strategy, UI/UX, code, SEO, ads, apps and 24/7 tickets. 100+ happy customers already run on this model. Registered office: B-752 Anand Nagar, Gwalior 474012.</p>
        <ul class="list">
          <li>Customer-first process and named ticket IDs</li>
          <li>Experts in touch within 24 hours</li>
          <li>Zoho Desk feedback plus email to developersoftware.support@gmail.com</li>
        </ul>
      </div>
      <img src="images/office-gwalior.png" alt="Registered operations connected to Gwalior" style="border-radius:18px;height:100%;object-fit:cover">
    </div></section>`
});

pages.push({
  file: "services.html",
  title: "IT & Website Services in India | digitaltech4u A to Z Solutions",
  desc: "Website development, ecommerce, WordPress, redesign, SEO, digital marketing, apps and software from digitaltech4u.",
  canonical: site + "/services.html",
  base: ".",
  body: `
    ${pageHero("images/service-web-design.png", "Website and digital services", "A to Z services for growing brands", "Services")}
    <section class="section" id="web"><div class="container">
      <div class="grid-3">
        ${[
          ["service-web-design.png","Custom Web Development","Business websites, UI/UX and conversion-focused landing pages."],
          ["service-ecommerce.png","E-commerce","Shopify, custom catalogues, payments and checkout UX."],
          ["service-wordpress.png","WordPress & CMS","Self-managed content with trained support."],
          ["service-redesign.png","Website Redesign","Faster, modern rebuilds of outdated sites."],
          ["service-digital-marketing.png","Digital Marketing","Social, content, funnels and brand campaigns."],
          ["service-seo.png","SEO & Local Pages","Sitemaps, schema, city pages and rankings."],
          ["service-mobile-app.png","Mobile Apps","Android and iOS for operations and customers."],
          ["team-developers.png","Custom Software","Internal tools, CRMs and automations."],
          ["support-24-7.png","Maintenance & Hosting","Minimal retainers, backups, tickets, 24/7 care."]
        ].map(([img,h,p]) => `<article class="feature-card" id="${h.split(" ")[0].toLowerCase()}">
          <img src="images/${img}" alt="${h}"><h3>${h}</h3><p class="muted">${p}</p>
        </article>`).join("")}
      </div>
      <p style="margin-top:28px"><a class="btn btn-lime" href="consultation.html">Get a free consultation</a></p>
    </div></section>`
});

pages.push({
  file: "portfolio.html",
  title: "Portfolio | 100+ Happy Customers — digitaltech4u",
  desc: "Selected website, ecommerce and branding work by digitaltech4u for Indian businesses.",
  canonical: site + "/portfolio.html",
  base: ".",
  body: `
    ${pageHero("images/service-redesign.png", "digitaltech4u portfolio", "Work that helps brands sell", "Portfolio")}
    <section class="section"><div class="container">
      <p class="sub">A snapshot of the kinds of projects our 20+ experts ship. Names are representative of industries we serve — ask for a private walkthrough on a free consultation.</p>
      <div class="grid-3">
        ${[
          ["service-ecommerce.png","Retail storefront","Conversion-focused catalogue and UPI checkout."],
          ["service-web-design.png","Professional services firm","Authority site with lead forms and blog."],
          ["service-wordpress.png","Education institute","CMS for courses, notices and admissions."],
          ["service-mobile-app.png","Field operations app","Companion app for a growing distributor."],
          ["service-digital-marketing.png","Lead generation funnel","Ads plus landing pages for a clinic group."],
          ["city-gwalior.png","Local business SEO","City pages and Google Business pairing."]
        ].map(([img,h,p]) => `<article class="portfolio-card"><img src="images/${img}" alt="${h}"><div style="padding:16px"><h3>${h}</h3><p class="muted">${p}</p></div></article>`).join("")}
      </div>
    </div></section>`
});

pages.push({
  file: "consultation.html",
  title: "Free Consultation | Lets Talk — digitaltech4u",
  desc: "Book a free website consultation. digitaltech4u experts reply within 24 hours. Designing starts at ₹4,999.",
  canonical: site + "/consultation.html",
  base: ".",
  body: `
    ${pageHero("images/consultation.png", "Free consultation", "Get a free consultation", "Free Consultation")}
    <section class="section"><div class="container consult-wrap">
      <div>
        <h2>Tell us what you want to <em>launch</em></h2>
        <p class="sub">Share your name, email and phone. We map pages, features and a starting package. Website designing from ₹4,999 with minimal maintenance.</p>
      </div>
      <form class="consult-card" id="consultForm">
        <h3>Get Free Consultation</h3>
        <input class="field" name="name" placeholder="Your Name" required>
        <input class="field" name="email" type="email" placeholder="Your Email" required>
        <input class="field" name="phone" placeholder="Phone Number" required>
        <textarea class="field" name="message" placeholder="Project details"></textarea>
        <button class="btn btn-red" type="submit">Lets Talk</button>
        <div class="success"></div><div class="error"></div>
        <p class="form-note">We email developersoftware.support@gmail.com and reply within 24 hours.</p>
      </form>
    </div></section>`
});

pages.push({
  file: "contact.html",
  title: "Contact digitaltech4u | Email & Registered Address Gwalior",
  desc: "Email developersoftware.support@gmail.com. Registered address B-752 Anand Nagar, Gwalior 474012. 24/7 support.",
  canonical: site + "/contact.html",
  base: ".",
  body: `
    ${pageHero("images/office-gwalior.png", "Contact digitaltech4u Gwalior", "Email us any time", "Contact")}
    <section class="section"><div class="container grid-2">
      <div>
        <h2>We are easy to <em>reach</em></h2>
        <p>Email: <a href="mailto:developersoftware.support@gmail.com">developersoftware.support@gmail.com</a></p>
        <p>Registered Business Address: B-752 Anand Nagar, Gwalior, Pincode 474012, Madhya Pradesh, India.</p>
        <p>Our experts get in touch within 24 hours. Support is available 24/7 via ticket, email and Zoho Desk.</p>
        <div class="map-note">Serving Bhopal, Delhi, Indore, Gwalior, Mumbai, Bengaluru, Pune, Hyderabad, Jaipur, Lucknow and the rest of India from one expert team.</div>
      </div>
      <form class="consult-card" id="contactForm">
        <h3>Send a message</h3>
        <input class="field" name="name" placeholder="Your Name" required>
        <input class="field" name="email" type="email" placeholder="Your Email" required>
        <input class="field" name="phone" placeholder="Phone Number">
        <input class="field" name="subject" placeholder="Subject">
        <textarea class="field" name="message" placeholder="How can we help?" required></textarea>
        <button class="btn btn-red" type="submit">Send email</button>
        <div class="success"></div><div class="error"></div>
      </form>
    </div></section>`
});

pages.push({
  file: "email-us.html",
  title: "Email to Us | developersoftware.support@gmail.com — digitaltech4u",
  desc: "Write to digitaltech4u any time. Queries go to developersoftware.support@gmail.com. Reply within 24 hours.",
  canonical: site + "/email-us.html",
  base: ".",
  body: `
    ${pageHero("images/support-24-7.png", "Email digitaltech4u support", "Email to us, any hour", "Email to Us")}
    <section class="section"><div class="container consult-wrap">
      <div>
        <p class="lead">Prefer your own inbox? Write directly to <a href="mailto:developersoftware.support@gmail.com">developersoftware.support@gmail.com</a> or use this form. Existing customers can also <a href="raise-ticket.html">create a support ticket</a> to get a tracking ID.</p>
      </div>
      <form class="consult-card" id="contactForm">
        <h3>Email our experts</h3>
        <input class="field" name="name" placeholder="Your Name" required>
        <input class="field" name="email" type="email" placeholder="Your Email" required>
        <input class="field" name="phone" placeholder="Phone Number">
        <textarea class="field" name="message" placeholder="Your query" required></textarea>
        <button class="btn btn-red" type="submit">Send</button>
        <div class="success"></div><div class="error"></div>
      </form>
    </div></section>`
});

pages.push({
  file: "support.html",
  title: "Customer Support 24/7 | Website Issue Help — digitaltech4u",
  desc: "24/7 customer support for website issues. Raise tickets, email us, or use Zoho Desk. Experts reply within 24 hours.",
  canonical: site + "/support.html",
  base: ".",
  body: `
    ${pageHero("images/support-24-7.png", "24/7 customer support", "Customer support that actually answers", "Customer Support")}
    <section class="section"><div class="container">
      <div class="grid-3">
        <article class="feature-card"><h3>Raise a ticket</h3><p class="muted">Get a random ticket number, describe the issue or change, and track it.</p><p><a class="btn btn-lime" href="raise-ticket.html">Create ticket</a></p></article>
        <article class="feature-card"><h3>Email to us</h3><p class="muted">Send queries to developersoftware.support@gmail.com any time.</p><p><a class="btn btn-ghost" href="email-us.html">Email form</a></p></article>
        <article class="feature-card"><h3>Track status</h3><p class="muted">Already have an ID? Look it up on this device.</p><p><a class="btn btn-ghost" href="track-ticket.html">Track ticket</a></p></article>
      </div>
      <h2 style="margin-top:48px">Zoho Desk embedded feedback</h2>
      <p class="sub">Official DigitalTech4u widget from Zoho Desk. Use it to share feedback without leaving this page.</p>
      <div class="zoho-embed" id="zsfeedbackwidgetdiv"></div>
    </div></section>
    <script src="https://desk.zoho.in/portal/api/feedbackwidget/276969000000361004?orgId=60085600486&displayType=embeded"></script>`
});

pages.push({
  file: "raise-ticket.html",
  title: "Raise a Support Ticket | Website Changes & Issues — digitaltech4u",
  desc: "Existing customers can create a support ticket. A unique ticket number is generated and emailed to our team.",
  canonical: site + "/raise-ticket.html",
  base: ".",
  body: `
    ${pageHero("images/support-24-7.png", "Raise a website support ticket", "Issue with your website? Raise a ticket", "Support Tickets")}
    <section class="section"><div class="container consult-wrap">
      <div>
        <h2>Change requests &amp; <em>fixes</em></h2>
        <p>Existing customers can request content edits, bug fixes, new sections or urgent downtime help. A random ticket number is generated instantly. Our experts get in touch within 24 hours. 24/7 intake.</p>
        <p class="muted">API: DigitalTechAPI.createTicket() stores the ID locally and emails developersoftware.support@gmail.com.</p>
      </div>
      <form class="consult-card" id="ticketForm" data-ticket="true">
        <h3>Create support ticket</h3>
        <input class="field" name="name" placeholder="Your Name" required>
        <input class="field" name="email" type="email" placeholder="Your Email" required>
        <input class="field" name="phone" placeholder="Phone Number">
        <select class="field" name="type">
          <option value="website-issue">Issue with website</option>
          <option value="change-request">Request a change</option>
          <option value="downtime">Site down / urgent</option>
          <option value="billing">Billing / maintenance</option>
          <option value="other">Other</option>
        </select>
        <textarea class="field" name="message" placeholder="Describe the issue or change" required></textarea>
        <button class="btn btn-red" type="submit">Generate ticket</button>
        <div class="success"></div><div class="error"></div>
        <div class="ticket-box">Your ticket ID<br><span class="ticket-id"></span><p>Save this ID. Track it any time on the Track Ticket page.</p></div>
      </form>
    </div></section>`
});

pages.push({
  file: "track-ticket.html",
  title: "Track Support Ticket | digitaltech4u",
  desc: "Track your digitaltech4u support ticket status with your ticket number.",
  canonical: site + "/track-ticket.html",
  base: ".",
  body: `
    ${pageHero("images/support-24-7.png", "Track support ticket", "Track your ticket", "Track Ticket")}
    <section class="section"><div class="container" style="max-width:640px">
      <form class="consult-card" id="trackForm">
        <h3>Enter ticket number</h3>
        <input class="field" name="ticket" placeholder="DT4U-XXXXXX-XXXX" required>
        <button class="btn btn-red" type="submit">Check status</button>
      </form>
      <div id="trackResult"></div>
    </div></section>`
});

pages.push({
  file: "feedback.html",
  title: "Zoho Desk Feedback Widget | digitaltech4u",
  desc: "Send feedback to DigitalTech4u through the official Zoho Desk iframe widget.",
  canonical: site + "/feedback.html",
  base: ".",
  body: `
    ${pageHero("images/consultation.png", "Zoho Desk feedback", "Official Zoho Desk channel", "Feedback")}
    <section class="section"><div class="container">
      <p class="sub">This iframe is the DigitalTech4u Zoho Desk advanced web form. Popup chat is also loaded site-wide.</p>
      <div class="zoho-embed">
        <iframe id="zsfeedbackFrame" width="890" height="570" name="zsfeedbackFrame" scrolling="no" allowtransparency="false" frameborder="0" src="https://desk.zoho.in/support/fbw?formType=AdvancedWebForm&fbwId=edbsnc17663b2559a719532c7a97509bd6245cb4217a569790e1e48a0e5c08246de23&xnQsjsdp=edbsn9b766b4c1fd9df741d6753e7ec7ba2ae&mode=showNewWidget&displayType=iframe"></iframe>
      </div>
    </div></section>
    <script src="https://desk.zoho.in/portal/api/feedbackwidget/276969000000361004?orgId=60085600486&displayType=iframe"></script>`
});

pages.push({
  file: "blog.html",
  title: "Insights | 2,200+ Website Development Articles — digitaltech4u",
  desc: "Guides on website development, SEO, ecommerce and why businesses must grow online. Written for Indian companies.",
  canonical: site + "/blog.html",
  base: ".",
  body: `
    ${pageHero("images/service-wordpress.png", "Website development articles", "2,200+ articles for growing businesses", "Insights")}
    <section class="section"><div class="container">
      <div class="blog-tools">
        <input class="search" id="blogSearch" placeholder="Search articles, cities, topics">
        <select class="select" id="blogCat"><option value="">All categories</option></select>
      </div>
      <div class="grid-3" id="blogList"></div>
      <div class="pagination" id="blogPager"></div>
    </div></section>`
});

pages.push({
  file: "article.html",
  title: "Article | digitaltech4u Insights",
  desc: "Website development and business growth guidance from digitaltech4u.",
  canonical: site + "/article.html",
  base: ".",
  body: `<section class="section"><div class="container article" id="articleRoot"></div></section>`
});

pages.push({
  file: "privacy.html",
  title: "Privacy Policy | digitaltech4u",
  desc: "How digitaltech4u handles enquiry, ticket and support data.",
  canonical: site + "/privacy.html",
  base: ".",
  body: `<section class="section"><div class="container article">
    <h1>Privacy Policy</h1>
    <p>Enquiries, consultation forms and support tickets are used only to respond to you. Emails are sent to developersoftware.support@gmail.com. Ticket IDs stored in your browser stay on your device. We do not sell personal data. Contact the same email to request deletion of a conversation.</p>
  </div></section>`
});

pages.push({
  file: "terms.html",
  title: "Terms of Service | digitaltech4u",
  desc: "Website designing packages, support tickets and maintenance terms for digitaltech4u.",
  canonical: site + "/terms.html",
  base: ".",
  body: `<section class="section"><div class="container article">
    <h1>Terms</h1>
    <p>Website designing packages start at ₹4,999. Scope is confirmed in writing after consultation. Support tickets are for existing customers; response target is 24 hours, with 24/7 intake. Minimal maintenance, if opted, covers updates agreed in the retainer. Gwalior registered address applies for notices: B-752 Anand Nagar, 474012.</p>
  </div></section>`
});

pages.push({
  file: "sitemap.html",
  title: "HTML Sitemap | digitaltech4u",
  desc: "All digitaltech4u pages, city landings and 2,200 insight articles.",
  canonical: site + "/sitemap.html",
  base: ".",
  body: `<section class="section"><div class="container" id="sitemapList"><h1>Sitemap</h1></div></section>`
});

const cities = [
  { slug: "bhopal", name: "Bhopal", image: "city-bhopal.png", extra: "From lakeside brands to government-adjacent services, Bhopal companies need websites that look credible and load fast on mobile." },
  { slug: "delhi", name: "Delhi", image: "city-delhi.png", extra: "Delhi-NCR competition is intense. We pair sharp UI with SEO and ads so you are not invisible among thousands of nearby offers." },
  { slug: "indore", name: "Indore", image: "city-indore.png", extra: "Indore's trading and food businesses grow faster with ecommerce, WhatsApp-friendly sites and local search pages." },
  { slug: "gwalior", name: "Gwalior", image: "city-gwalior.png", extra: "This is our registered home. B-752 Anand Nagar, Gwalior 474012. Local businesses get the same national-grade delivery as metro clients." },
  { slug: "mumbai", name: "Mumbai", image: "city-delhi.png", extra: "Mumbai teams need speed: landing pages, paid campaigns and dashboards that sales can use the same week." },
  { slug: "bengaluru", name: "Bengaluru", image: "city-bhopal.png", extra: "Product companies and services firms here expect clean UX, performance and a backlog handled through tickets — we run that way." },
  { slug: "pune", name: "Pune", image: "city-indore.png", extra: "Manufacturing and education brands in Pune use us for multilingual sites, lead forms and long-term maintenance." },
  { slug: "hyderabad", name: "Hyderabad", image: "city-gwalior.png", extra: "Hyderabad's growth story needs bilingual content, maps, and funnels that turn searchers into booked calls." },
  { slug: "jaipur", name: "Jaipur", image: "city-delhi.png", extra: "Heritage brands and exporters in Jaipur get catalogue sites, Instagram-led marketing and secure checkout." },
  { slug: "lucknow", name: "Lucknow", image: "city-bhopal.png", extra: "Lucknow professionals and retailers get trustworthy websites, Google Business alignment and patient support." }
];

for (const c of cities) {
  pages.push({
    file: path.join("cities", c.slug + ".html"),
    title: `Website Designing Company in ${c.name} | digitaltech4u`,
    desc: `Website designing company in ${c.name}. Sites from ₹4,999, 20+ developers, 24/7 support. digitaltech4u serves ${c.name} and all of India from Gwalior.`,
    canonical: `${site}/cities/${c.slug}.html`,
    base: "..",
    body: `
      ${pageHero("../images/" + c.image, "Website designing company in " + c.name, "Website Designing Company in " + c.name, "Website Designing Company In " + c.name)}
      <section class="section"><div class="container grid-2">
        <div>
          <h2>End-to-end websites for ${c.name} businesses</h2>
          <p>${c.extra}</p>
          <p>digitaltech4u is not a single-city shop. The same 20+ expert team designs, codes, markets and supports brands across India. Website designing starts at ₹4,999 with minimal maintenance. 100+ happy customers. Experts reply within 24 hours.</p>
          <ul class="list">
            <li>Custom web, UI/UX, WordPress, ecommerce and redesign</li>
            <li>Digital marketing, SEO and city-specific landing pages</li>
            <li>Support tickets, email and Zoho Desk for existing customers</li>
          </ul>
          <p><a class="btn btn-lime" href="../consultation.html">Free consultation</a> <a class="btn btn-ghost" href="../raise-ticket.html">Raise a ticket</a></p>
        </div>
        <form class="consult-card" id="consultForm">
          <h3>Get Free Consultation</h3>
          <input class="field" name="name" placeholder="Your Name" required>
          <input class="field" name="email" type="email" placeholder="Your Email" required>
          <input class="field" name="phone" placeholder="Phone Number" required>
          <textarea class="field" name="message" placeholder="I need a website in ${c.name}"></textarea>
          <button class="btn btn-red" type="submit">Lets Talk</button>
          <div class="success"></div><div class="error"></div>
        </form>
      </div></section>`
  });
}

for (const p of pages) {
  const full = path.join(root, p.file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(
    full,
    shell({
      title: p.title,
      desc: p.desc,
      canonical: p.canonical,
      base: p.base,
      body: p.body
    }),
    "utf8"
  );
}

const staticUrls = [
  "/",
  "/about.html",
  "/services.html",
  "/portfolio.html",
  "/blog.html",
  "/consultation.html",
  "/contact.html",
  "/email-us.html",
  "/support.html",
  "/raise-ticket.html",
  "/track-ticket.html",
  "/feedback.html",
  "/privacy.html",
  "/terms.html",
  "/sitemap.html"
].concat(cities.map((c) => "/cities/" + c.slug + ".html"));

function urlset(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url><loc>${site}${u}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`
  )
  .join("\n")}
</urlset>
`;
}

fs.writeFileSync(path.join(root, "sitemap-pages.xml"), urlset(staticUrls), "utf8");

const articleChunks = 4;
const per = 550;
const articleSitemaps = [];
for (let i = 0; i < articleChunks; i++) {
  const start = i * per + 1;
  const end = Math.min(2200, (i + 1) * per);
  const urls = [];
  for (let id = start; id <= end; id++) urls.push("/article.html?id=" + id);
  const name = "sitemap-articles-" + (i + 1) + ".xml";
  fs.writeFileSync(path.join(root, name), urlset(urls), "utf8");
  articleSitemaps.push(name);
}

const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${site}/sitemap-pages.xml</loc></sitemap>
  ${articleSitemaps.map((n) => `<sitemap><loc>${site}/${n}</loc></sitemap>`).join("\n  ")}
</sitemapindex>
`;
fs.writeFileSync(path.join(root, "sitemap.xml"), index, "utf8");

fs.writeFileSync(
  path.join(root, "robots.txt"),
  `User-agent: *
Allow: /
Sitemap: ${site}/sitemap.xml
`,
  "utf8"
);

console.log("Wrote", pages.length, "html pages plus sitemaps");
