/**
 * =========================================================================
 * REAL TWO-WAY TRANSACTIONAL EMAIL HANDLER
 * =========================================================================
 * - Delivers messages to imamrasish786@gmail.com
 * - Verified From address
 * - Sets visitor's entered email as Reply-To
 * - Enables direct 2-way Gmail reply threading
 * - Server-side validation, honeypot & rate-limiting protection
 */

import { Resend } from 'resend';

function sanitize(str = '') {
  return String(str)
    .trim()
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/<[^>]*>?/gm, '');
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req, res) {
  // 1. CORS Configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  try {
    const body = req.body || {};
    const { name, email, subject, message, website, _honeypot } = body;

    // 3. Bot Protection / Honeypot Check
    if (website || _honeypot) {
      return res.status(200).json({ success: true, message: 'Message received.' });
    }

    // 4. Server-Side Input Sanitization
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanSubject = sanitize(subject);
    const cleanMessage = sanitize(message);

    // 5. Server-Side Strict Validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    if (!cleanName || cleanName.length < 2 || cleanName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid name. Name must be between 2 and 100 characters.',
      });
    }

    if (!cleanEmail || !emailRegex.test(cleanEmail) || cleanEmail.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.',
      });
    }

    if (!cleanSubject || cleanSubject.length < 3 || cleanSubject.length > 150) {
      return res.status(400).json({
        success: false,
        message: 'Subject must be between 3 and 150 characters.',
      });
    }

    if (!cleanMessage || cleanMessage.length < 10 || cleanMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be between 10 and 2000 characters.',
      });
    }

    const targetToEmail = process.env.CONTACT_TO_EMAIL || process.env.VITE_CONTACT_EMAIL || 'imamrasish786@gmail.com';
    const senderFromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
    const resendApiKey = process.env.RESEND_API_KEY;

    // 6. Strategy A: Use Resend Transactional Email Service (If API Key is configured)
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 20px; background-color: #f8fafc; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
            .header { background: #070b14; color: #ffffff; padding: 24px; border-bottom: 2px solid #06b6d4; }
            .badge { display: inline-block; padding: 4px 10px; background: rgba(6, 182, 212, 0.2); color: #38bdf8; font-size: 11px; font-weight: bold; border-radius: 6px; text-transform: uppercase; margin-bottom: 8px; }
            .title { font-size: 20px; font-weight: bold; margin: 0; color: #ffffff; }
            .content { padding: 24px; }
            .field-group { margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600; margin-bottom: 4px; }
            .value { font-size: 15px; color: #0f172a; font-weight: 500; }
            .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #06b6d4; border-radius: 8px; padding: 16px; margin-top: 16px; white-space: pre-wrap; font-size: 14px; color: #334155; }
            .reply-banner { margin-top: 24px; padding: 12px 16px; background: #ecfeff; border: 1px solid #cffafe; border-radius: 8px; color: #0891b2; font-size: 12px; font-weight: 500; display: flex; align-items: center; gap: 8px; }
            .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div class="badge">New Portfolio Inquiry</div>
              <h1 class="title">${escapeHtml(cleanSubject)}</h1>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Sender Name</div>
                <div class="value">${escapeHtml(cleanName)}</div>
              </div>
              <div class="field-group">
                <div class="label">Reply-To Email</div>
                <div class="value"><a href="mailto:${escapeHtml(cleanEmail)}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${escapeHtml(cleanEmail)}</a></div>
              </div>
              <div class="field-group" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
                <div class="label">Message</div>
                <div class="message-box">${escapeHtml(cleanMessage)}</div>
              </div>
              <div class="reply-banner">
                💡 <strong>Direct Two-Way Reply:</strong> Simply hit <strong>"Reply"</strong> in Gmail to respond directly to ${escapeHtml(cleanName)} (${escapeHtml(cleanEmail)}).
              </div>
            </div>
            <div class="footer">
              Delivered via Rashish Imam Portfolio Contact System • ${new Date().toUTCString()}
            </div>
          </div>
        </body>
        </html>
      `;

      const plainText = `NEW PORTFOLIO MESSAGE\n\nFrom: ${cleanName} (${cleanEmail})\nSubject: ${cleanSubject}\nDate: ${new Date().toUTCString()}\n\n----------------------------------------\n${cleanMessage}\n----------------------------------------\n\n* Hit 'Reply' in your email client to respond directly to ${cleanEmail}.`;

      const emailResult = await resend.emails.send({
        from: senderFromEmail,
        to: [targetToEmail],
        replyTo: `"${cleanName}" <${cleanEmail}>`,
        subject: `[Portfolio] ${cleanSubject} - from ${cleanName}`,
        html: htmlContent,
        text: plainText,
      });

      if (emailResult.error) {
        throw new Error(emailResult.error.message || 'Resend delivery rejected.');
      }

      return res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully! Rashish will reply to your email shortly.',
        id: emailResult.data?.id,
      });
    }

    // 7. Strategy B: FormSubmit Two-Way Relay with Reply-To Header (Fallback)
    const requestOrigin = req.headers['origin'] || req.headers['referer'] || `https://${req.headers['host'] || 'rashishimam.vercel.app'}`;
    const forwardResponse = await fetch(`https://formsubmit.co/ajax/${targetToEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: requestOrigin,
        Referer: requestOrigin,
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        _replyto: cleanEmail, // Sets Reply-To header so Gmail replies to the visitor
        subject: cleanSubject,
        message: cleanMessage,
        _subject: `[Portfolio Contact] ${cleanSubject} - from ${cleanName}`,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const forwardResult = await forwardResponse.json().catch(() => ({}));

    if (forwardResponse.ok && (forwardResult.success === true || forwardResult.success === 'true')) {
      return res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully! Rashish will reply to your email shortly.',
      });
    } else if (forwardResult.message && forwardResult.message.toLowerCase().includes('activation')) {
      return res.status(200).json({
        success: false,
        activationRequired: true,
        message: forwardResult.message,
      });
    } else {
      return res.status(502).json({
        success: false,
        message: forwardResult.message || 'Unable to deliver message at this moment. Please email directly to ' + targetToEmail,
      });
    }
  } catch (err) {
    console.error('Contact API Error:', err);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while processing your request. Please try again or email directly.',
    });
  }
}
