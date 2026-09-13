import React, { useState } from 'react';
import { Mail, Copy, Check, Send, MessageSquare, Clock, Globe, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { sanitizeInput, validateEmail } from '../utils/security';

export default function Contact() {
  const { contact, socialLinks } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | 'activation_required' | null
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot field for bot protection
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(socialLinks.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#38bdf8', '#6366f1'],
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const validate = () => {
    const errors = {};
    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = formData.email.trim();
    const cleanSubject = sanitizeInput(formData.subject);
    const cleanMessage = sanitizeInput(formData.message);

    if (!cleanName || cleanName.length < 2) {
      errors.name = 'Please enter a valid name (at least 2 characters).';
    } else if (cleanName.length > 100) {
      errors.name = 'Name cannot exceed 100 characters.';
    }

    if (!cleanEmail || !validateEmail(cleanEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!cleanSubject || cleanSubject.length < 3) {
      errors.subject = 'Please enter a subject (at least 3 characters).';
    } else if (cleanSubject.length > 150) {
      errors.subject = 'Subject cannot exceed 150 characters.';
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      errors.message = 'Please enter a message (at least 10 characters).';
    } else if (cleanMessage.length > 2000) {
      errors.message = 'Message cannot exceed 2000 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate clicks while a submission is already in flight
    if (isSubmitting) return;

    // 1. Bot Honeypot Check
    if (formData.website) {
      // Silently pretend success to mislead spam bots
      setSubmitStatus('success');
      return;
    }

    // 2. Form Validation
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    // 3. Sanitize Input Data
    const sanitizedPayload = {
      name: sanitizeInput(formData.name),
      email: formData.email.trim(),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message),
    };

    try {
      // 1. Try local/serverless /api/contact endpoint first
      let response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(sanitizedPayload),
      });

      let result;

      // 2. If /api/contact is unavailable (e.g. running on static Vite host/preview), call FormSubmit directly
      if (!response.ok && (response.status === 404 || response.status === 405)) {
        response = await fetch(`https://formsubmit.co/ajax/${socialLinks.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: sanitizedPayload.name,
            email: sanitizedPayload.email,
            _replyto: sanitizedPayload.email,
            subject: sanitizedPayload.subject,
            message: sanitizedPayload.message,
            _subject: `[Portfolio Direct Message] ${sanitizedPayload.subject} - from ${sanitizedPayload.name}`,
            _template: 'table',
            _captcha: 'false',
          }),
        });
      }

      try {
        result = await response.json();
      } catch (e) {
        result = {};
      }

      // Check for activation requirement from FormSubmit
      if (
        result.activationRequired ||
        (result.success === 'false' && result.message && result.message.toLowerCase().includes('activation')) ||
        (typeof result.message === 'string' && result.message.toLowerCase().includes('activate your form'))
      ) {
        setSubmitStatus('activation_required');
        setErrorMessage(
          `FormSubmit requires a one-time activation. An activation email was sent to ${socialLinks.email}. Please open your Gmail inbox (or spam) and click "Activate Form". After doing this once, all messages will arrive directly in your inbox!`
        );
        return;
      }

      // Successful submission check
      if (
        response.ok &&
        result.success !== false &&
        result.success !== 'false' &&
        (result.success === true || result.success === 'true' || result.ok === true)
      ) {
        setSubmitStatus('success');
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#38bdf8', '#10b981', '#6366f1'],
        });
      } else {
        throw new Error(
          result.message ||
          `Unable to deliver message at this moment. Please email directly to ${socialLinks.email}.`
        );
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(
        err.message && !err.message.includes('fetch')
          ? err.message
          : `Unable to connect to the email server. Please email directly to ${socialLinks.email}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitStatus(null);
    setErrorMessage('');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      website: '',
    });
    setFieldErrors({});
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3 glow-pill">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {contact.cta}
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            {contact.subheading}
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Links & Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1-Click Copy Email Card */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Direct Email</span>
                </span>
                <span className="text-[11px] text-cyan-400 font-mono">
                  Primary Inbox
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-sm font-mono text-cyan-300 select-all truncate pr-2">
                  {socialLinks.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 shrink-0"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Channels Card (GitHub & LinkedIn) */}
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Professional Profiles</span>
              </h3>

              <div className="space-y-3">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-cyan-950/20 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-5 h-5 text-cyan-400" />
                    <div>
                      <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300">GitHub Profile</span>
                      <span className="text-xs text-slate-500 block">github.com/Rashishimam</span>
                    </div>
                  </div>
                  <span className="text-xs text-cyan-400 group-hover:translate-x-0.5 transition-transform">→</span>
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-cyan-950/20 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-5 h-5 text-blue-400" />
                    <div>
                      <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300">LinkedIn Profile</span>
                      <span className="text-xs text-slate-500 block">linkedin.com/in/rashish-imam</span>
                    </div>
                  </div>
                  <span className="text-xs text-cyan-400 group-hover:translate-x-0.5 transition-transform">→</span>
                </a>
              </div>
            </div>

            {/* Status Card */}
            <div className="glass-panel rounded-2xl p-5 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Status</span>
                <p className="text-xs text-slate-200 font-medium">{contact.status}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Secure Functional Contact Form */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white">
                Send a Direct Message
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400/90 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Protected</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 mb-6">
              Messages submitted here are delivered straight to <span className="text-cyan-400 font-mono">{socialLinks.email}</span>.
            </p>

            {/* Success State */}
            {submitStatus === 'success' && (
              <div className="p-8 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>! Your message has been delivered to Rashish Imam ({socialLinks.email}). You will receive a response soon.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white hover:border-cyan-500/40 transition-all duration-200"
                >
                  Send Another Message
                </button>
              </div>
            )}

            {/* One-Time Activation Required State */}
            {submitStatus === 'activation_required' && (
              <div className="p-6 mb-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-left space-y-4 animate-fade-in">
                <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
                  <span>One-Time Form Activation Required</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  FormSubmit needs a one-time confirmation to prevent spam. An activation email has been sent to <strong className="text-cyan-300">{socialLinks.email}</strong>.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-2">
                  <p className="font-semibold text-slate-200">How to activate (takes 5 seconds):</p>
                  <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px]">
                    <li>Open Gmail (<strong className="text-slate-300">{socialLinks.email}</strong>).</li>
                    <li>Look for the email with subject: <strong className="text-cyan-300">"FormSubmit - Activate form"</strong> (check Spam/Junk if not in Primary).</li>
                    <li>Click the <strong className="text-emerald-400">"Activate Form"</strong> button inside.</li>
                  </ol>
                </div>
                <p className="text-[11px] text-slate-400">
                  ✨ Once activated, all future messages from this contact form will arrive directly in your inbox with 2-way reply support!
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
                  >
                    Open Gmail Inbox ↗
                  </a>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Back to Form
                  </button>
                </div>
              </div>
            )}

            {/* Error State Banner */}
            {submitStatus === 'error' && (
              <div className="p-4 mb-5 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-3 text-xs text-rose-200 animate-fade-in">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{errorMessage}</p>
                  <a
                    href={`mailto:${socialLinks.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message || '')}`}
                    className="underline text-cyan-300 hover:text-cyan-200 mt-1 inline-block"
                  >
                    Click here to open your email client directly
                  </a>
                </div>
              </div>
            )}

            {/* Form */}
            {submitStatus !== 'success' && submitStatus !== 'activation_required' && (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot Invisible Field (Blocks Bots) */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    left: '-9999px',
                    height: 0,
                    width: 0,
                    zIndex: -1,
                    pointerEvents: 'none',
                  }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      maxLength={100}
                      placeholder="Jane Doe"
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                        fieldErrors.name
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.name}</p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={100}
                      placeholder="jane@example.com"
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                        fieldErrors.email
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Subject / Topic <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    maxLength={150}
                    placeholder="Internship Opportunity / Project Collaboration"
                    disabled={isSubmitting}
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                      fieldErrors.subject
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                    }`}
                  />
                  {fieldErrors.subject && (
                    <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.subject}</p>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    maxLength={2000}
                    placeholder="Write your message here..."
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors resize-none ${
                      fieldErrors.message
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                    }`}
                  ></textarea>
                  {fieldErrors.message && (
                    <p className="text-[11px] text-rose-400 mt-1">{fieldErrors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
