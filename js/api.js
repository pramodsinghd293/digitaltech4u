/**
 * digitaltech4u public client API
 * Creates support tickets, emails developersoftware.support@gmail.com,
 * and stores ticket history locally so customers can track status.
 */
(function () {
  const STORAGE_KEY = "dt4u_tickets_v1";

  function loadTickets() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveTickets(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function ticketNumber() {
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    const time = Date.now().toString(36).toUpperCase().slice(-6);
    return "DT4U-" + time + "-" + rand;
  }

  async function sendEmail(payload) {
    const body = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone || "",
      _subject: payload.subject,
      _template: "table",
      _captcha: "false",
      ticket: payload.ticketId || "",
      type: payload.type || "query",
      message: payload.message,
      page: location.href,
      company: "digitaltech4u"
    };

    try {
      const res = await fetch(DT4U.formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error("Mail API " + res.status);
      return { ok: true, via: "api" };
    } catch (err) {
      const mailto =
        "mailto:" +
        encodeURIComponent(DT4U.email) +
        "?subject=" +
        encodeURIComponent(payload.subject) +
        "&body=" +
        encodeURIComponent(
          [
            "Ticket: " + (payload.ticketId || "N/A"),
            "Name: " + payload.name,
            "Email: " + payload.email,
            "Phone: " + (payload.phone || "-"),
            "Type: " + (payload.type || "query"),
            "",
            payload.message
          ].join("\n")
        );
      return { ok: false, via: "mailto", mailto, error: String(err) };
    }
  }

  async function createTicket(input) {
    const ticketId = ticketNumber();
    const record = {
      ticketId,
      name: input.name,
      email: input.email,
      phone: input.phone || "",
      type: input.type || "website-issue",
      message: input.message,
      status: "Open",
      createdAt: new Date().toISOString(),
      eta: "Our experts will get in touch within 24 hours. 24/7 support is available."
    };
    const list = loadTickets();
    list.unshift(record);
    saveTickets(list);

    const mail = await sendEmail({
      ...record,
      subject: "digitaltech4u Support Ticket " + ticketId + " — " + record.type
    });

    return { ...record, mail };
  }

  async function sendQuery(input) {
    return sendEmail({
      name: input.name,
      email: input.email,
      phone: input.phone,
      type: input.type || "consultation",
      message: input.message,
      subject: input.subject || "digitaltech4u website enquiry"
    });
  }

  function getTicket(id) {
    return loadTickets().find((t) => t.ticketId.toLowerCase() === String(id).toLowerCase()) || null;
  }

  window.DigitalTechAPI = {
    createTicket,
    sendQuery,
    getTicket,
    listTickets: loadTickets,
    email: "developersoftware.support@gmail.com"
  };
})();
