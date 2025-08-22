// src/components/layout/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="w-full max-w-[72rem] mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand + brief */}
        <div>
          <h4 className="text-xl font-semibold">EcoSphere</h4>
          <p className="mt-2 text-white/80 text-sm">Ocean-first data, stories, and tools to mobilize action.</p>
          <form className="mt-4 flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input id="newsletter-email" type="email" required placeholder="Your email" className="w-full rounded-xl px-3 py-2 text-navy placeholder:text-navy/60" />
            <button type="submit" className="rounded-xl px-4 py-2 bg-white text-navy font-medium hover:bg-white/90 transition">Subscribe</button>
          </form>
        </div>

        {/* Company links */}
        <div>
          <h5 className="text-sm font-semibold tracking-wide uppercase text-white/70">Company</h5>
          <ul className="mt-3 space-y-2 text-white/90">
            <li><a className="hover:text-white transition" href="/about">About us</a></li>
            <li><a className="hover:text-white transition" href="/contact">Contact us</a></li>
            <li><a className="hover:text-white transition" href="/careers">Careers</a></li>
            <li><a className="hover:text-white transition" href="/faq">FAQ</a></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h5 className="text-sm font-semibold tracking-wide uppercase text-white/70">Contact</h5>
          <ul className="mt-3 space-y-2 text-white/90 text-sm">
            <li>Website: <a className="underline decoration-white/30 hover:text-white" href="https://example.com" target="_blank" rel="noreferrer">example.com</a></li>
            <li>Email: <a className="underline decoration-white/30 hover:text-white" href="mailto:hello@example.com">hello@example.com</a></li>
            <li>Phone: <a className="underline decoration-white/30 hover:text-white" href="tel:+919000000000">+91 90000 00000</a></li>
            <li>Hours: Mon–Fri, 10:00–18:00 IST</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h5 className="text-sm font-semibold tracking-wide uppercase text-white/70">Follow</h5>
          <div className="mt-3 flex items-center gap-3">
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" title="Instagram">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://facebook.com/yourprofile" target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" title="Facebook">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M13.5 21v-7h2.6l.4-3h-3v-1.9c0-.9.3-1.5 1.6-1.5H17V4.1c-.8-.1-1.7-.1-2.5-.1-2.6 0-4.3 1.6-4.3 4.4V11H8v3h2.2v7h3.3z" /></svg>
            </a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" title="X (Twitter)">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4l16 16M20 4L4 20" /></svg>
            </a>
            <a href="https://linkedin.com/company/yourprofile" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" title="LinkedIn">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h4v1.9h.06c.56-1.07 1.94-2.2 3.98-2.2 2.38 0 3.96 1.7 3.96 4.68V21h-4v-6.64c0-1.6-.57-2.68-2-2.68-1.1 0-1.74.74-2.03 1.45-.1.23-.13.56-.13.88V21h-4V9z" /></svg>
            </a>
          </div>
          <p className="mt-3 text-white/70 text-xs">Follow for field updates, datasets, and feature drops.</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="w-full max-w-[72rem] mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/80">
          <p>© {new Date().getFullYear()} EcoSphere. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/terms" className="hover:text-white transition">Terms</a>
            <a href="/privacy" className="hover:text-white transition">Privacy</a>
            <a href="#top" className="hover:text-white transition" aria-label="Back to top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
