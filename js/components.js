(function () {
  const base = () => window.dt4uUrl("");
  const u = (p) => window.dt4uUrl(p);

  function currentPage() {
    const path = location.pathname.replace(/\\/g, "/");
    const file = path.split("/").pop() || "index.html";
    return file.replace(".html", "") || "index";
  }

  function navLink(href, label, id) {
    const active = currentPage() === id ? " is-active" : "";
    return `<a class="${active.trim()}" href="${u(href)}">${label}</a>`;
  }

  function cityLinks() {
    return DT4U.cities
      .map((c) => `<a href="${u("cities/" + c.slug + ".html")}">${c.name}</a>`)
      .join("");
  }

  function announcement() {
    const msg = `<span>Website designing starts at <b>₹4,999</b> · Minimal maintenance charges · ${DT4U.stats.customers} happy customers · ${DT4U.stats.developers} expert developers · 24/7 support · Experts reply within 24 hours · A to Z digital solutions across India</span>`;
    return `<div class="announce" role="region" aria-label="Offers and announcements"><div class="announce__track">${msg}${msg}${msg}${msg}</div></div>`;
  }

  function header() {
    return `
    <header class="header">
      <div class="header__inner">
        <a class="logo" href="${u("index.html")}" aria-label="digitaltech4u home">
          <img src="${u("images/favicon-mark.png")}" alt="digitaltech4u logo">
          <div>
            <strong>digitaltech4u</strong>
            <span>Best Web Agency</span>
          </div>
        </a>
        <nav class="nav" id="mainNav" aria-label="Primary">
          ${navLink("index.html", "Home", "index")}
          ${navLink("about.html", "About Us", "about")}
          <div class="has-sub">
            <a href="${u("services.html")}">Services</a>
            <div class="submenu">
              <a href="${u("services.html")}">All Services</a>
              <a href="${u("services.html")}#web">Website Development</a>
              <a href="${u("services.html")}#ecommerce">E-commerce</a>
              <a href="${u("services.html")}#marketing">Digital Marketing</a>
              <a href="${u("services.html")}#apps">Mobile Apps</a>
              <a href="${u("consultation.html")}">Free Consultation</a>
            </div>
          </div>
          <div class="has-sub">
            <a href="${u("cities/gwalior.html")}">Locations</a>
            <div class="submenu">${cityLinks()}</div>
          </div>
          ${navLink("portfolio.html", "Portfolio", "portfolio")}
          ${navLink("blog.html", "Insights", "blog")}
          ${navLink("support.html", "Support", "support")}
          ${navLink("contact.html", "Contact", "contact")}
        </nav>
        <div class="header__actions">
          <span class="india" title="Serving all of India">India <i class="flag" aria-hidden="true"></i></span>
          <a class="btn btn-lime" href="${u("consultation.html")}">Free Consultation</a>
          <button class="menu-btn" id="menuBtn" aria-label="Open menu">☰</button>
        </div>
      </div>
    </header>`;
  }

  function footer() {
    return `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          <a class="logo" href="${u("index.html")}">
            <img src="${u("images/favicon-mark.png")}" alt="">
            <div><strong>digitaltech4u</strong><span>${DT4U.tagline}</span></div>
          </a>
          <p>End-to-end website, software, app and digital marketing partner for Indian businesses. Registered office in Gwalior. Serving clients across India.</p>
          <p><strong style="color:#fff">Registered Business Address</strong><br>${DT4U.fullAddress}</p>
          <p><a href="mailto:${DT4U.email}">${DT4U.email}</a></p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="${u("about.html")}">About</a></li>
            <li><a href="${u("services.html")}">Services</a></li>
            <li><a href="${u("portfolio.html")}">Portfolio</a></li>
            <li><a href="${u("blog.html")}">2000+ Articles</a></li>
            <li><a href="${u("consultation.html")}">Free Consultation</a></li>
          </ul>
        </div>
        <div>
          <h4>Customer Care</h4>
          <ul>
            <li><a href="${u("support.html")}">Customer Support</a></li>
            <li><a href="${u("email-us.html")}">Email to Us</a></li>
            <li><a href="${u("raise-ticket.html")}">Raise Support Ticket</a></li>
            <li><a href="${u("track-ticket.html")}">Track Ticket</a></li>
            <li><a href="${u("feedback.html")}">Zoho Desk Feedback</a></li>
          </ul>
        </div>
        <div>
          <h4>Cities We Serve</h4>
          <ul>
            ${DT4U.cities.map((c) => `<li><a href="${u("cities/" + c.slug + ".html")}">Website Company in ${c.name}</a></li>`).join("")}
          </ul>
        </div>
      </div>
      <div class="container legal">
        <span>© ${new Date().getFullYear()} digitaltech4u. All rights reserved.</span>
        <span><a href="${u("privacy.html")}">Privacy</a> · <a href="${u("terms.html")}">Terms</a> · <a href="${u("sitemap.html")}">Sitemap</a></span>
      </div>
    </footer>
    <div class="fab" aria-label="Quick support">
      <a class="mail" href="${u("email-us.html")}" title="Email us">@</a>
      <a class="ticket" href="${u("raise-ticket.html")}" title="Create ticket">TKT</a>
    </div>`;
  }

  function inject() {
    const announceMount = document.getElementById("site-announce");
    const headerMount = document.getElementById("site-header");
    const footerMount = document.getElementById("site-footer");
    if (announceMount) announceMount.outerHTML = announcement();
    if (headerMount) headerMount.outerHTML = header();
    if (footerMount) footerMount.outerHTML = footer();

    const btn = document.getElementById("menuBtn");
    const nav = document.getElementById("mainNav");
    if (btn && nav) {
      btn.addEventListener("click", () => nav.classList.toggle("is-open"));
    }

    if (!document.getElementById("zoho-popout")) {
      const s = document.createElement("script");
      s.id = "zoho-popout";
      s.src = DT4U.zoho.popout;
      s.defer = true;
      document.body.appendChild(s);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
