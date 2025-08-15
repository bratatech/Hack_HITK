// src/pages/Explore.jsx
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Lenis from "lenis";

import UnderwaterScene from "../scenes/UnderwaterScene.jsx";
import CtaCenter from "../components/auth/CtaCenter.jsx";
import Ticker from "../components/stats/Ticker.jsx";
import Hotspots from "../sections/Hotspots.jsx";
import Stories from "../sections/Stories.jsx";
import PromptChip from "../components/ai/PromptChip.jsx";

/* ======================= Top Navigation ======================= */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base =
    "sticky top-0 z-50 transition shadow-none border-transparent bg-navy/50 backdrop-blur";
  const scrolledCls =
    "shadow-lg border-b border-white/10 bg-navy/70 backdrop-blur";

  /* Simple search that redirects to /search?q=... */
  const SearchBar = ({ className = "" }) => {
    const [q, setQ] = useState("");
    const onSubmit = (e) => {
      e.preventDefault();
      const term = q.trim();
      if (!term) return;
      window.location.href = `/search?q=${encodeURIComponent(term)}`;
    };
    return (
      <form onSubmit={onSubmit} className={`w-full ${className}`} role="search">
        <div className="relative">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search EcoSphere…"
            aria-label="Search"
            className="w-full rounded-xl bg-white/10 text-white placeholder-white/70 px-10 py-2 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/80">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </span>
        </div>
      </form>
    );
  };

  return (
    <header className={`${base} ${scrolled ? scrolledCls : ""}`}>
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <a href="/" className="flex items-center gap-3">
          {/* Put logo at /public/logo.png or change src */}
          <img
            src="/logo.png"
            alt="Ecosphere logo"
            className="h-8 w-8 rounded-full ring-1 ring-white/20 object-contain"
          />
          <span className="text-white font-semibold text-lg tracking-tight">
            EcoSphere
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-white/90">
          <li><a href="/community" className="hover:text-white transition">Join Community</a></li>
          <li><a href="#stories" className="hover:text-white transition">Stories</a></li>
          <li><a href="#impact" className="hover:text-white transition">Impact</a></li>
          <li><a href="#hotspots" className="hover:text-white transition">Hotspots</a></li>
        </ul>

        {/* Search (desktop) */}
        <div className="hidden md:block w-64">
          <SearchBar />
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Open menu"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
          onClick={() => setOpen((s) => !s)}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-navy/90 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
            {/* Search (mobile) */}
            <div>
              <div className="w-full">
                <div className="relative">
                  <form
                    role="search"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.currentTarget.querySelector("input");
                      const term = (input?.value || "").trim();
                      if (!term) return;
                      setOpen(false);
                      window.location.href = `/search?q=${encodeURIComponent(term)}`;
                    }}
                  >
                    <input
                      type="search"
                      placeholder="Search EcoSphere…"
                      aria-label="Search"
                      className="w-full rounded-xl bg-white/10 text-white placeholder-white/70 px-10 py-2 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                    <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/80">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M21 21l-4.3-4.3" />
                      </svg>
                    </span>
                  </form>
                </div>
              </div>
            </div>

            <ul className="grid gap-3 text-white/90">
              <li><a href="/community" className="block py-2" onClick={() => setOpen(false)}>Join Community</a></li>
              <li><a href="#stories" className="block py-2" onClick={() => setOpen(false)}>Stories</a></li>
              <li><a href="#impact" className="block py-2" onClick={() => setOpen(false)}>Impact</a></li>
              <li><a href="#hotspots" className="block py-2" onClick={() => setOpen(false)}>Hotspots</a></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

/* ======================= Footer ======================= */
function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand + brief + newsletter */}
        <div>
          <h4 className="text-xl font-semibold">EcoSphere</h4>
          <p className="mt-2 text-white/80 text-sm">
            Ocean-first data, stories, and tools to mobilize action.
          </p>
          <form className="mt-4 flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your email"
              className="w-full rounded-xl px-3 py-2 text-navy placeholder:text-navy/60"
            />
            <button
              type="submit"
              className="rounded-xl px-4 py-2 bg-white text-navy font-medium hover:bg-white/90 transition"
            >
              Subscribe
            </button>
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
            <li>
              Website:&nbsp;
              <a className="underline decoration-white/30 hover:text-white" href="https://example.com" target="_blank" rel="noreferrer">
                https://example.com
              </a>
            </li>
            <li>
              Email:&nbsp;
              <a className="underline decoration-white/30 hover:text-white" href="mailto:hello@example.com">
                hello@example.com
              </a>
            </li>
            <li>
              Phone:&nbsp;
              <a className="underline decoration-white/30 hover:text-white" href="tel:+919000000000">
                +91 90000 00000
              </a>
            </li>
            <li>Hours: Mon–Fri, 10:00–18:00 IST</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h5 className="text-sm font-semibold tracking-wide uppercase text-white/70">Follow</h5>
          <div className="mt-3 flex items-center gap-3">
            {/* Instagram */}
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" title="Instagram">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://facebook.com/yourprofile" target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" title="Facebook">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M13.5 21v-7h2.6l.4-3h-3v-1.9c0-.9.3-1.5 1.6-1.5H17V4.1c-.8-.1-1.7-.1-2.5-.1-2.6 0-4.3 1.6-4.3 4.4V11H8v3h2.2v7h3.3z" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" title="X (Twitter)">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com/company/yourprofile" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" title="LinkedIn">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h4v1.9h.06c.56-1.07 1.94-2.2 3.98-2.2 2.38 0 3.96 1.7 3.96 4.68V21h-4v-6.64c0-1.6-.57-2.68-2-2.68-1.1 0-1.74.74-2.03 1.45-.1.23-.13.56-.13.88V21h-4V9z" />
              </svg>
            </a>
          </div>
          <p className="mt-3 text-white/70 text-xs">Follow for field updates, datasets, and feature drops.</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/80">
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

/* ======================= Page ======================= */
export default function Explore() {
  // Smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let rafId;
    const loop = (t) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const stats = {
    wasteRemovedKg: 1843210,
    speciesProtected: 127,
    activeProjects: 36,
    sdgProgress: 62,
  };

  return (
    <div className="bg-ivory text-navy" id="top">
      <Header />

      {/* HERO: Underwater full-height section */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-navy">
        <Canvas
          camera={{ fov: 55, position: [0, 2.5, 12] }}
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Suspense fallback={null}>
            <UnderwaterScene />
          </Suspense>
        </Canvas>

        {/* Top light shafts overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 22%, rgba(0,0,0,0) 55%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Centered CTAs */}
        <div className="absolute inset-0 z-20 grid place-items-center px-4">
          <CtaCenter />
        </div>

        {/* Invisible anchor so nav -> Impact lands above the ticker */}
        <div id="impact" className="absolute top-[65%] left-0 right-0 h-0" />

        {/* Stats ticker near bottom-center */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20 px-4 w-full flex justify-center">
          <Ticker stats={stats} />
        </div>

        {/* AI prompt chip (fixed bottom-right) */}
        <PromptChip />
      </section>

      {/* CONTENT SECTIONS (page scrolls naturally) */}
      <div id="hotspots">
        <Hotspots />
      </div>
      <div id="stories">
        <Stories />
      </div>

      {/* Closing CTA (only Early Access button) */}
      <section id="cta" className="py-16 md:py-20 bg-white border-t border-navy/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="max-w-3xl">
              <h3 className="text-3xl md:text-4xl font-bold text-navy">Join the EcoSphere beta</h3>
              <p className="mt-3 text-lg text-navy/80">
                Get early access to the 3D globe, live hotspots, and real-time impact counters.
              </p>
            </div>
            <div className="flex">
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-medium text-white bg-navy hover:bg-navy/90 shadow-md transition focus:outline-none focus:ring-2 focus:ring-navy/40 focus:ring-offset-2"
              >
                Get Early Access
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
