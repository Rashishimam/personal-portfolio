import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { Resend } from 'resend'

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Custom local dev middleware for /api/contact supporting real two-way email delivery
function localContactApiPlugin() {
  return {
    name: 'local-contact-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        if (url.startsWith('/api/contact')) {
          if (req.method === 'POST') {
            const chunks = [];
            req.on('data', chunk => chunks.push(chunk));
            req.on('end', async () => {
              try {
                const rawBody = Buffer.concat(chunks).toString('utf-8');
                const data = rawBody ? JSON.parse(rawBody) : {};
                const { name, email, subject, message, website, _honeypot } = data;

                // Honeypot bot protection
                if (website || _honeypot) {
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  return res.end(JSON.stringify({ success: true, message: 'Message received.' }));
                }

                // Server-side validation
                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
                if (!name || name.trim().length < 2 || !email || !emailRegex.test(email.trim()) || !subject || subject.trim().length < 3 || !message || message.trim().length < 10) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  return res.end(JSON.stringify({ success: false, message: 'Validation failed. Please verify your details.' }));
                }

                const targetToEmail = process.env.CONTACT_TO_EMAIL || process.env.VITE_CONTACT_EMAIL || 'imamrasish786@gmail.com';
                const senderFromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
                const resendApiKey = process.env.RESEND_API_KEY;

                // 1. Resend API
                if (resendApiKey) {
                  try {
                    const resend = new Resend(resendApiKey);
                    const htmlContent = `
                      <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
                        <h2 style="color: #0891b2; margin-top: 0;">New Portfolio Message</h2>
                        <p><strong>From:</strong> ${escapeHtml(name)} (<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>)</p>
                        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                        <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #06b6d4; border-radius: 6px; margin: 15px 0;">
                          ${escapeHtml(message)}
                        </div>
                        <p style="font-size: 12px; color: #0284c7; background: #ecfeff; padding: 8px 12px; border-radius: 6px;">
                          💡 Hit <strong>Reply</strong> in Gmail to send your response directly to ${escapeHtml(email)}.
                        </p>
                      </div>
                    `;

                    const result = await resend.emails.send({
                      from: senderFromEmail,
                      to: [targetToEmail],
                      replyTo: `"${name.trim()}" <${email.trim()}>`,
                      subject: `[Portfolio] ${subject.trim()} - from ${name.trim()}`,
                      html: htmlContent,
                      text: `From: ${name} (${email})\nSubject: ${subject}\n\n${message}\n\nHit Reply to respond directly to ${email}.`,
                    });

                    if (result.error) {
                      throw new Error(result.error.message);
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ success: true, message: 'Message delivered via Resend!' }));
                  } catch (resendErr) {
                    console.warn('Resend send error, falling back:', resendErr.message);
                  }
                }

                // 2. Fallback Relay
                try {
                  const reqOrigin = req.headers['origin'] || req.headers['referer'] || `http://${req.headers['host'] || 'localhost:5173'}`;
                  const response = await fetch(`https://formsubmit.co/ajax/${targetToEmail}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json',
                      Origin: reqOrigin,
                      Referer: reqOrigin,
                      'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    },
                    body: JSON.stringify({
                      name: name.trim(),
                      email: email.trim(),
                      _replyto: email.trim(),
                      subject: subject.trim(),
                      message: message.trim(),
                      _subject: `[Portfolio Contact] ${subject.trim()} - from ${name.trim()}`,
                      _template: 'table',
                      _captcha: 'false',
                    }),
                  });

                  const result = await response.json().catch(() => ({}));

                  if (response.ok && (result.success === true || result.success === 'true')) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ success: true, message: 'Your message has been sent successfully!' }));
                  } else if (result.message && result.message.toLowerCase().includes('activation')) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ success: false, activationRequired: true, message: result.message }));
                  } else {
                    res.writeHead(502, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ success: false, message: result.message || 'Unable to deliver message at this time.' }));
                  }
                } catch (fetchErr) {
                  res.writeHead(502, { 'Content-Type': 'application/json' });
                  return res.end(JSON.stringify({ success: false, message: 'Network error connecting to email relay.' }));
                }
              } catch (err) {
                console.error('API Error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'An internal error occurred.' }));
              }
            });
          } else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ success: false, message: 'Method not allowed.' }));
          }
        } else {
          next();
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env.VITE_CONTACT_EMAIL = env.VITE_CONTACT_EMAIL || 'imamrasish786@gmail.com';
  process.env.CONTACT_TO_EMAIL = env.CONTACT_TO_EMAIL || env.VITE_CONTACT_EMAIL || 'imamrasish786@gmail.com';
  process.env.RESEND_API_KEY = env.RESEND_API_KEY || '';
  process.env.CONTACT_FROM_EMAIL = env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

  return {
    plugins: [
      react(),
      tailwindcss(),
      localContactApiPlugin(),
    ],
  };
})
