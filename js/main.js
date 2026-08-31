(function () {
  function bindConsult(formId, type) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const ok = form.querySelector(".success");
      const err = form.querySelector(".error");
      const ticketBox = form.querySelector(".ticket-box");
      if (ok) ok.style.display = "none";
      if (err) err.style.display = "none";
      const btn = form.querySelector("button[type=submit]");
      if (btn) btn.disabled = true;
      try {
        if (form.dataset.ticket === "true") {
          const result = await DigitalTechAPI.createTicket({
            name: data.name,
            email: data.email,
            phone: data.phone,
            type: data.type || type,
            message: data.message
          });
          if (ticketBox) {
            ticketBox.style.display = "block";
            ticketBox.querySelector(".ticket-id").textContent = result.ticketId;
          }
          if (ok) {
            ok.style.display = "block";
            ok.textContent =
              "Ticket created. Our experts will get in touch within 24 hours. A copy is sent to " +
              DT4U.email +
              ".";
          }
          if (result.mail && result.mail.mailto) {
            window.location.href = result.mail.mailto;
          }
        } else {
          const mail = await DigitalTechAPI.sendQuery({
            name: data.name,
            email: data.email,
            phone: data.phone,
            type: type,
            subject: data.subject || ("digitaltech4u " + type),
            message: data.message
          });
          if (ok) {
            ok.style.display = "block";
            ok.textContent = "Message received. We reply within 24 hours on " + DT4U.email + ".";
          }
          if (mail.mailto) window.location.href = mail.mailto;
        }
        form.reset();
      } catch (ex) {
        if (err) {
          err.style.display = "block";
          err.textContent = "Could not send right now. Email us at " + DT4U.email;
        }
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

  function renderBlog() {
    const root = document.getElementById("blogList");
    if (!root || !window.DT4UArticles) return;
    const search = document.getElementById("blogSearch");
    const select = document.getElementById("blogCat");
    const pager = document.getElementById("blogPager");
    if (select && !select.dataset.ready) {
      DT4UArticles.categories().forEach((c) => {
        const o = document.createElement("option");
        o.value = c;
        o.textContent = c;
        select.appendChild(o);
      });
      select.dataset.ready = "1";
    }
    let page = 1;
    function paint() {
      const res = DT4UArticles.listArticles({
        page,
        perPage: 12,
        query: search ? search.value : "",
        category: select ? select.value : ""
      });
      root.innerHTML = res.items
        .map(
          (a) => `
        <article class="post-card">
          <img src="${dt4uUrl(a.image)}" alt="${a.title}">
          <div style="padding:16px">
            <p class="muted">${a.category} · ${a.place} · ${a.date}</p>
            <h3><a href="${dt4uUrl("article.html?id=" + a.id)}">${a.title}</a></h3>
            <p class="muted">${a.excerpt}</p>
          </div>
        </article>`
        )
        .join("");
      if (pager) {
        const buttons = [];
        const start = Math.max(1, res.page - 2);
        const end = Math.min(res.pages, start + 6);
        buttons.push(`<button data-p="${Math.max(1, res.page - 1)}">Prev</button>`);
        for (let i = start; i <= end; i++) {
          buttons.push(`<button class="${i === res.page ? "is-active" : ""}" data-p="${i}">${i}</button>`);
        }
        buttons.push(`<button data-p="${Math.min(res.pages, res.page + 1)}">Next</button>`);
        pager.innerHTML = buttons.join("") + `<span class="muted" style="align-self:center"> ${res.total} articles</span>`;
        pager.querySelectorAll("button").forEach((b) =>
          b.addEventListener("click", () => {
            page = Number(b.dataset.p);
            paint();
            window.scrollTo({ top: 180, behavior: "smooth" });
          })
        );
      }
    }
    if (search) search.addEventListener("input", () => { page = 1; paint(); });
    if (select) select.addEventListener("change", () => { page = 1; paint(); });
    paint();
  }

  function renderArticle() {
    const root = document.getElementById("articleRoot");
    if (!root || !window.DT4UArticles) return;
    const id = Number(new URLSearchParams(location.search).get("id") || "1");
    const a = DT4UArticles.getArticle(id);
    if (!a) {
      root.innerHTML = "<p>Article not found.</p>";
      return;
    }
    document.title = a.title + " | digitaltech4u";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", a.excerpt);
    root.innerHTML = `
      <img src="${dt4uUrl(a.image)}" alt="${a.title}" style="width:100%;height:360px;object-fit:cover;border-radius:18px;margin-bottom:22px">
      <p class="eyebrow">${a.category} · ${a.place}</p>
      <h1>${a.title}</h1>
      <p class="muted">Published ${a.date} · digitaltech4u Editorial</p>
      ${a.content}
      <p><a class="btn btn-lime" href="${dt4uUrl("consultation.html")}">Get a free consultation</a></p>
    `;
  }

  function renderTrack() {
    const form = document.getElementById("trackForm");
    const out = document.getElementById("trackResult");
    if (!form || !out) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = form.ticket.value.trim();
      const t = DigitalTechAPI.getTicket(id);
      if (!t) {
        out.innerHTML = "<div class='error' style='display:block'>No local record for that ID. Check the ID from your confirmation email or raise a new ticket.</div>";
        return;
      }
      out.innerHTML = `<div class="ticket-box" style="display:block">
        <div class="ticket-id">${t.ticketId}</div>
        <p>Status: <b>${t.status}</b></p>
        <p>${t.eta}</p>
        <p class="muted">${t.type} · ${t.createdAt}</p>
        <p>${t.message}</p>
      </div>`;
    });
  }

  function renderSitemapPage() {
    const root = document.getElementById("sitemapList");
    if (!root) return;
    const pages = [
      "index.html","about.html","services.html","portfolio.html","blog.html","consultation.html",
      "support.html","email-us.html","raise-ticket.html","track-ticket.html","contact.html","feedback.html",
      "privacy.html","terms.html"
    ];
    const city = DT4U.cities.map((c) => "cities/" + c.slug + ".html");
    root.innerHTML =
      "<h2>Main pages</h2><ul class='list'>" +
      pages.concat(city).map((p) => `<li><a href="${dt4uUrl(p)}">${p}</a></li>`).join("") +
      "</ul><h2>Insight articles (2,200)</h2><p class='muted'>All articles are available at article.html?id=1 through id=2200 and listed on the blog with search.</p>";
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindConsult("consultForm", "consultation");
    bindConsult("contactForm", "email-query");
    bindConsult("ticketForm", "website-issue");
    renderBlog();
    renderArticle();
    renderTrack();
    renderSitemapPage();
  });
})();
