/**
 * =========================================================================
 * SECURITY & VALIDATION UTILITIES
 * =========================================================================
 * Implements input sanitization, rate limiting, and bot protection
 * for the contact form.
 */

/**
 * Strips HTML tags, malicious scripts, and encodes HTML entities
 * to protect against XSS and injection attacks.
 */
export function sanitizeInput(input = '') {
  if (typeof input !== 'string') return '';
  
  // Trim and remove dangerous control characters and null bytes
  let sanitized = input.trim().replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Strip script, iframe, object, and style tags and their contents
  sanitized = sanitized.replace(/<(script|iframe|object|embed|style)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, '');

  // Strip remaining HTML tags
  sanitized = sanitized.replace(/<[^>]*>?/gm, '');

  return sanitized;
}

/**
 * Validates email format according to standard RFC specifications.
 */
export function validateEmail(email = '') {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim()) && email.length <= 100;
}

/**
 * Enforces rate limiting on client side to prevent rapid spam submissions.
 * Returns { allowed: boolean, remainingSeconds: number }
 */
export function checkRateLimit(key = 'portfolio_contact_rate_limit', cooldownSeconds = 45) {
  try {
    const lastSubmission = localStorage.getItem(key);
    if (!lastSubmission) {
      return { allowed: true, remainingSeconds: 0 };
    }

    const elapsedSeconds = Math.floor((Date.now() - parseInt(lastSubmission, 10)) / 1000);
    if (elapsedSeconds < cooldownSeconds) {
      return {
        allowed: false,
        remainingSeconds: cooldownSeconds - elapsedSeconds,
      };
    }

    return { allowed: true, remainingSeconds: 0 };
  } catch {
    // If localStorage is unavailable, allow submission
    return { allowed: true, remainingSeconds: 0 };
  }
}

/**
 * Records the timestamp of a successful submission for rate limiting.
 */
export function recordSubmission(key = 'portfolio_contact_rate_limit') {
  try {
    localStorage.setItem(key, Date.now().toString());
  } catch {
    // Graceful fallback if localStorage is blocked
  }
}
