/**
 * Contact endpoint. Cloudflare Pages Function, POST /api/contact.
 *
 * Behaviour:
 *   - Accepts JSON or form-encoded input.
 *   - A non-empty `company` honeypot returns a normal-looking success and
 *     sends nothing. Bots get no signal that they were caught.
 *   - Missing name, email or message, or a malformed email, returns 400
 *     { ok: false, error: "validation" }.
 *   - Sends through Resend. 2xx gives { ok: true }, anything else gives
 *     { ok: false, error: "send" }.
 *
 * The API key and Resend's own response never reach the client. Failures are
 * logged server side only, where they show up in `wrangler pages deployment
 * tail` or the Pages dashboard logs.
 *
 * Configuration lives in the Cloudflare Pages dashboard under
 * Settings > Environment variables. See docs/HANDOFF.md steps 3 to 5.
 */

interface Env {
  /** Required. Without it every submission returns error "send". */
  RESEND_API_KEY?: string;
  /** Where leads are delivered. Comma separated for more than one. */
  CONTACT_TO_EMAIL?: string;
  /** Envelope sender. Its domain must be verified in Resend. */
  CONTACT_FROM_EMAIL?: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

const DEFAULT_TO = "info@bhatoya.com";
const DEFAULT_FROM = "info@bhatoya.com";
const FROM_NAME = "Dixon Masonry Website";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Deliberately permissive. Real delivery is the only true test of an address. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MAX_FIELD = 5000;

interface Submission {
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string;
}

function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_FIELD);
}

async function readSubmission(request: Request): Promise<Submission | null> {
  const contentType = request.headers.get("content-type") ?? "";

  try {
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as Record<string, unknown>;
      return {
        name: clean(body.name),
        email: clean(body.email),
        phone: clean(body.phone),
        message: clean(body.message),
        company: clean(body.company),
      };
    }

    if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const form = await request.formData();
      return {
        name: clean(form.get("name")),
        email: clean(form.get("email")),
        phone: clean(form.get("phone")),
        message: clean(form.get("message")),
        company: clean(form.get("company")),
      };
    }
  } catch {
    return null;
  }

  return null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Strip CR and LF from anything that lands in a header-like field, so a
 * submitted name cannot inject extra headers into the outbound message.
 */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function buildText(sub: Submission): string {
  return [
    `New inquiry from the Dixon Masonry website`,
    ``,
    `Name:    ${sub.name}`,
    `Email:   ${sub.email}`,
    `Phone:   ${sub.phone || "not given"}`,
    ``,
    `Message:`,
    sub.message,
    ``,
    `---`,
    `Reply to this email to answer ${sub.name} directly.`,
  ].join("\n");
}

function buildHtml(sub: Submission): string {
  const rows = [
    ["Name", sub.name],
    ["Email", sub.email],
    ["Phone", sub.phone || "not given"],
  ]
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:4px 16px 4px 0;font-weight:600;white-space:nowrap;">${escapeHtml(
          label as string,
        )}</th><td style="padding:4px 0;">${escapeHtml(value as string)}</td></tr>`,
    )
    .join("");

  return [
    `<div style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.6;color:#1a1715;">`,
    `<p style="margin:0 0 16px;"><strong>New inquiry from the Dixon Masonry website</strong></p>`,
    `<table cellpadding="0" cellspacing="0" style="margin:0 0 20px;">${rows}</table>`,
    `<p style="margin:0 0 6px;font-weight:600;">Message</p>`,
    `<p style="margin:0 0 20px;white-space:pre-wrap;">${escapeHtml(sub.message)}</p>`,
    `<hr style="border:0;border-top:1px solid #e3ddd4;margin:20px 0;" />`,
    `<p style="margin:0;color:#5c5550;font-size:13px;">Reply to this email to answer ${escapeHtml(
      sub.name,
    )} directly.</p>`,
    `</div>`,
  ].join("");
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

/**
 * Fallback for submissions made with JavaScript disabled, where the browser
 * navigates to this endpoint and expects a page rather than JSON.
 */
function htmlResponse(title: string, message: string, status = 200): Response {
  const page = `<!doctype html>
<html lang="en-US"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${escapeHtml(title)}</title>
<style>
:root{color-scheme:light dark}
body{margin:0;min-height:100dvh;display:grid;place-items:center;padding:2rem;
background:#faf8f5;color:#1a1715;
font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;line-height:1.65}
@media (prefers-color-scheme:dark){body{background:#141210;color:#f4f0ea}}
main{max-width:34rem}
h1{font-family:Georgia,serif;font-weight:400;font-size:clamp(1.6rem,1.3rem+1.4vw,2.4rem);
line-height:1.15;margin:0 0 1rem}
p{margin:0 0 1.5rem;color:#5c5550}
@media (prefers-color-scheme:dark){p{color:#a89f96}}
a{color:inherit;text-underline-offset:.2em}
</style></head>
<body><main>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(message)}</p>
<p><a href="/">Back to Dixon Masonry</a></p>
</main></body></html>`;

  return new Response(page, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function wantsJson(request: Request): boolean {
  return (request.headers.get("accept") ?? "").includes("application/json");
}

export async function onRequestPost(context: RequestContext): Promise<Response> {
  const { request, env } = context;
  const asJson = wantsJson(request);

  const sub = await readSubmission(request);

  if (!sub) {
    return asJson
      ? json({ ok: false, error: "validation" }, 400)
      : htmlResponse(
          "That did not come through",
          "We could not read the form submission. Please go back and try again.",
          400,
        );
  }

  // Honeypot. Looks exactly like success from the outside, sends nothing.
  if (sub.company !== "") {
    return asJson
      ? json({ ok: true })
      : htmlResponse(
          "Thanks, your message is on its way",
          "Brent typically replies within one business day.",
        );
  }

  const valid =
    sub.name !== "" &&
    sub.message !== "" &&
    sub.email !== "" &&
    EMAIL_RE.test(sub.email);

  if (!valid) {
    return asJson
      ? json({ ok: false, error: "validation" }, 400)
      : htmlResponse(
          "A couple of details are missing",
          "Please go back and check your name, email address and message, then send again.",
          400,
        );
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    // Misconfiguration, not the visitor's problem. Same shape as a send failure.
    console.error("contact: RESEND_API_KEY is not set");
    return asJson
      ? json({ ok: false, error: "send" }, 502)
      : htmlResponse(
          "That did not send",
          "Something went wrong on our end. Please call or text us and we will get right back to you.",
          502,
        );
  }

  const to = (env.CONTACT_TO_EMAIL ?? DEFAULT_TO)
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  const from = (env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM).trim();
  const safeName = singleLine(sub.name);

  try {
    const sent = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${from}>`,
        to,
        reply_to: sub.email,
        subject: `New inquiry from ${safeName}`,
        text: buildText(sub),
        html: buildHtml(sub),
      }),
    });

    if (!sent.ok) {
      // Status and body stay server side. The client learns only that it failed.
      const detail = await sent.text().catch(() => "");
      console.error(`contact: resend responded ${sent.status}`, detail.slice(0, 500));
      return asJson
        ? json({ ok: false, error: "send" }, 502)
        : htmlResponse(
            "That did not send",
            "Something went wrong sending your message. Please call or text us and we will get right back to you.",
            502,
          );
    }
  } catch (error) {
    console.error("contact: request to resend threw", error);
    return asJson
      ? json({ ok: false, error: "send" }, 502)
      : htmlResponse(
          "That did not send",
          "Something went wrong sending your message. Please call or text us and we will get right back to you.",
          502,
        );
  }

  return asJson
    ? json({ ok: true })
    : htmlResponse(
        "Thanks, your message is on its way",
        "Brent typically replies within one business day.",
      );
}

// Only onRequestPost is exported. Pages answers other methods with 405 on its
// own, and adding a generic onRequest here would shadow this handler.
