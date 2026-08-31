(function () {
  const TOPICS = [
    { name: "Website Development", image: "service-web-design.png", cat: "Development" },
    { name: "Custom UI/UX Design", image: "service-web-design.png", cat: "Design" },
    { name: "E-commerce Websites", image: "service-ecommerce.png", cat: "Commerce" },
    { name: "WordPress & CMS", image: "service-wordpress.png", cat: "CMS" },
    { name: "Website Redesign", image: "service-redesign.png", cat: "Redesign" },
    { name: "Digital Marketing", image: "service-digital-marketing.png", cat: "Marketing" },
    { name: "SEO Services", image: "service-seo.png", cat: "SEO" },
    { name: "Mobile App Development", image: "service-mobile-app.png", cat: "Apps" },
    { name: "Custom Software", image: "team-developers.png", cat: "Software" },
    { name: "Brand Identity", image: "consultation.png", cat: "Branding" },
    { name: "Social Media Marketing", image: "service-digital-marketing.png", cat: "Marketing" },
    { name: "Google Ads & Performance", image: "service-seo.png", cat: "Ads" },
    { name: "Website Maintenance", image: "support-24-7.png", cat: "Support" },
    { name: "Business Growth Online", image: "office-gwalior.png", cat: "Growth" },
    { name: "Local SEO for Shops", image: "city-gwalior.png", cat: "SEO" },
    { name: "Payment Gateway Setup", image: "service-ecommerce.png", cat: "Commerce" },
    { name: "Landing Page Conversion", image: "service-web-design.png", cat: "Design" },
    { name: "Speed & Core Web Vitals", image: "service-redesign.png", cat: "Performance" },
    { name: "CRM and Lead Capture", image: "consultation.png", cat: "Software" },
    { name: "Content Marketing", image: "service-wordpress.png", cat: "Content" }
  ];

  const ANGLES = [
    "Why Every Business Needs",
    "A Complete Guide to",
    "How to Choose the Right Partner for",
    "Cost, Timeline and ROI of",
    "Beginner-Friendly Playbook for",
    "Mistakes Companies Make with",
    "2026 Strategy for",
    "End-to-End Checklist for",
    "What Growing Brands Should Know About",
    "From Idea to Launch:",
    "How digitaltech4u Delivers",
    "Small Business Benefits of",
    "Enterprise-Ready Approach to",
    "The Practical Roadmap for",
    "Customer Experience Secrets Behind"
  ];

  const PLACES = [
    "India", "Delhi", "Bhopal", "Indore", "Gwalior", "Mumbai", "Bengaluru",
    "Pune", "Hyderabad", "Jaipur", "Lucknow", "Ahmedabad", "Chennai",
    "Kolkata", "Nagpur", "Surat", "Noida", "Gurugram", "Chandigarh", "Kochi"
  ];

  const COUNT = 2200;

  function pick(arr, n) {
    return arr[n % arr.length];
  }

  function slugify(id, topic, angle, place) {
    return (
      String(id) +
      "-" +
      (angle + "-" + topic.name + "-in-" + place)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 80)
    );
  }

  function titleFor(id) {
    const topic = pick(TOPICS, id);
    const angle = pick(ANGLES, Math.floor(id / TOPICS.length));
    const place = pick(PLACES, Math.floor(id / (TOPICS.length * ANGLES.length)));
    return {
      topic,
      angle,
      place,
      title: angle + " " + topic.name + " in " + place
    };
  }

  function paragraphs(meta, id) {
    const { topic, place } = meta;
    const price = "₹4,999";
    const team = "20+ developers";
    const customers = "100+ happy customers";
    return [
      `<p>Businesses in ${place} are competing online every hour of the day. ${topic.name} is no longer a luxury item on a marketing wishlist. It is the storefront, sales desk, support centre and brand story rolled into one. digitaltech4u is a customer-first web agency that designs, builds and grows this digital layer end to end.</p>`,
      `<p>Owners often ask why they should invest now. The short answer: customers search, compare and buy on their phones. If your offer is missing, slow or confusing, they choose a competitor. A professional website plus ${topic.name.toLowerCase()} puts your company in that decision moment with clear messaging, fast pages and a path to enquiry.</p>`,
      `<p>Our A to Z model covers strategy, UI/UX, development, SEO, digital marketing, maintenance and 24/7 support. Website designing starts at ${price} with minimal maintenance charges, so first-time founders and established firms can both begin without a heavy IT department. A dedicated pod from our ${team} expert team stays accountable after launch.</p>`,
      `<p>For ${topic.name} in ${place}, we start with discovery: who you sell to, what action you want (call, WhatsApp, form, order), and which pages must rank. Then we wireframe, design, code and test. Every build is mobile-first, search-friendly and connected to lead capture so enquiries reach <a href="mailto:developersoftware.support@gmail.com">developersoftware.support@gmail.com</a>.</p>`,
      `<p>Growth does not stop at go-live. We add blogs, city pages, schema, sitemaps and conversion experiments. Existing customers can raise a support ticket with a unique ID, request changes, and expect an expert to respond within 24 hours. That operating rhythm is how we protect ${customers} and keep websites useful year after year.</p>`,
      `<p>If you are comparing agencies, look for proof of delivery, local understanding of Indian payments and languages, and a real support desk — not only a pretty mockup. digitaltech4u combines registered operations in Gwalior with pan-India delivery, Zoho Desk feedback, and a public ticket API so you always know the status of work.</p>`,
      `<h2>What you can expect from digitaltech4u</h2>`,
      `<p>Transparent scope, clean code, SEO basics baked in, and a named process for change requests. Whether you need a brochure site, Shopify or custom commerce, WordPress CMS, redesign, ads or an app, the same team can take you from first consultation to long-term growth. Book a free consultation or email us any time — our experts reply within 24 hours.</p>`
    ].join("\n");
  }

  function getArticle(id) {
    const n = Number(id);
    if (!n || n < 1 || n > COUNT) return null;
    const meta = titleFor(n);
    const slug = slugify(n, meta.topic, meta.angle, meta.place);
    const day = 1 + (n % 28);
    const month = 1 + (n % 12);
    return {
      id: n,
      slug,
      title: meta.title,
      category: meta.topic.cat,
      place: meta.place,
      topic: meta.topic.name,
      image: "images/" + meta.topic.image,
      date: "2026-" + String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0"),
      excerpt:
        "How " +
        meta.topic.name.toLowerCase() +
        " helps businesses in " +
        meta.place +
        " win more customers. Practical guidance from digitaltech4u, India's best web agency.",
      content: paragraphs(meta, n)
    };
  }

  function listArticles({ page = 1, perPage = 12, query = "", category = "" } = {}) {
    const q = query.trim().toLowerCase();
    const ids = [];
    for (let i = 1; i <= COUNT; i++) {
      const meta = titleFor(i);
      if (category && meta.topic.cat !== category) continue;
      if (q && !(meta.title + " " + meta.topic.cat + " " + meta.place).toLowerCase().includes(q)) continue;
      ids.push(i);
    }
    const total = ids.length;
    const start = (page - 1) * perPage;
    const slice = ids.slice(start, start + perPage).map(getArticle);
    return { total, page, perPage, items: slice, pages: Math.max(1, Math.ceil(total / perPage)) };
  }

  function categories() {
    return [...new Set(TOPICS.map((t) => t.cat))];
  }

  window.DT4UArticles = { COUNT, getArticle, listArticles, categories };
})();
