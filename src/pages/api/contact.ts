import type { APIRoute } from 'astro';

// server-rendered endpoint (the site already runs output: 'server' on Vercel)
export const prerender = false;

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// where messages are delivered, and the verified sender (must be an address on a
// domain you've verified in Resend — see setup notes)
const TO_EMAIL = 'evelynrodriguezc0@gmail.com';
const FROM_EMAIL = 'Portfolio <hi@evelynr.dev>';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let payload: Record<string, string>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Malformed request.' }, 400);
  }

  const name = (payload.name ?? '').trim();
  const email = (payload.email ?? '').trim();
  const message = (payload.message ?? '').trim();
  const turnstileToken = payload.turnstileToken ?? '';

  // server-side validation (never trust the client)
  if (!name || !email || !message) {
    return json({ error: 'Please fill in every field.' }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }
  if (message.length > 1000 || name.length > 80) {
    return json({ error: 'That message is too long.' }, 400);
  }

  // spam check: verify the Cloudflare Turnstile token (skipped only if no secret is
  // configured yet, so the form still works before Turnstile is wired up)
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: turnstileToken,
        remoteip: clientAddress ?? '',
      }),
    });
    const outcome = (await verify.json()) as { success: boolean };
    if (!outcome.success) {
      return json({ error: 'Spam check failed. Please reload and try again.' }, 400);
    }
  }

  // send the email through Resend's HTTP API
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return json({ error: 'Email is not configured on the server.' }, 500);
  }

  const send = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `New message from ${name} via evelynr.dev`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!send.ok) {
    console.error('Resend error:', send.status, await send.text());
    return json({ error: 'Could not send right now. Please email me directly.' }, 502);
  }

  return json({ success: true });
};
