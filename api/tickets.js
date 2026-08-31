/**
 * Ticket & enquiry API (browser)
 * POST-style helper used by the website forms.
 *
 * createTicket({ name, email, phone, type, message })
 *   -> { ticketId, status, eta, mail }
 * sendQuery({ name, email, phone, message, subject })
 * getTicket(ticketId)
 * listTickets()
 *
 * Emails are delivered to developersoftware.support@gmail.com
 */
export const SUPPORT_EMAIL = "developersoftware.support@gmail.com";
