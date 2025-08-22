// src/pages/Explore.jsx
import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Lenis from "lenis";

import UnderwaterScene from "../scenes/UnderwaterScene.jsx";
import CtaCenter from "../components/auth/CtaCenter.jsx";
import Ticker from "../components/stats/Ticker.jsx";
import Hotspots from "../sections/Hotspots.jsx";
import Stories from "../sections/Stories.jsx";
import PromptChip from "../components/ai/PromptChip.jsx";
import Header from "../components/layout/Header.jsx";

/* ======================= Footer ======================= */
/* ======================= Footer ======================= */
function Footer() {
  // Simple front-end handler (replace with your API later)
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email")?.toString().trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
    if (!ok) return alert("Please enter a valid email address.");
    alert("Thanks for subscribing! We'll keep you updated.");
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand + brief + newsletter */}
        <div>
          <h4 className="text-xl font-semibold">EcoSphere</h4>
          <p className="mt-2 text-white/80 text-sm">
            Together for healthy oceans, vibrant ecosystems, and a sustainable future
          </p>

          {/* Newsletter form — capped width, visible input with white border */}
          <form
            onSubmit={handleSubscribe}
            className="mt-4 flex items-center gap-2 w-full max-w-[320px]"
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="
                flex-1 min-w-0
                bg-white/95 text-navy placeholder:text-navy/60
                border border-white rounded-xl
                px-3 py-2 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent
              "
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl px-4 py-2 bg-white text-navy font-medium hover:bg-white/90 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-2 text-xs text-white/60">No spam. Unsubscribe anytime.</p>
        </div>

        {/* Company links */}
        <div>
          <h5 className="text-sm font-semibold tracking-wide uppercase text-white/70">Company</h5>
          <ul className="mt-3 space-y-2 text-white/90">
            <li><a className="hover:text-white transition" href="/about">About us</a></li>
            <li><a className="hover:text-white transition" href="/contact">Contact us</a></li>
          
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h5 className="text-sm font-semibold tracking-wide uppercase text-white/70">Contact</h5>
          <ul className="mt-3 space-y-2 text-white/90 text-sm">
            <li>
              Website:&nbsp;
              <a className="underline decoration-white/30 hover:text-white" href="/" rel="noreferrer">
                ecosphere.com
              </a>
            </li>
            <li>
              Email:&nbsp;
              <a className="underline decoration-white/30 hover:text-white" href="mailto:eco.sphere@gmail.com">
                eco.sphere@gmail.com
              </a>
            </li>
            <li>
              Phone:&nbsp;
              <a className="underline decoration-white/30 hover:text-white" href="tel:+919235091777">
                +91 92350 91777
              </a>
            </li>
            <li>Hours: Mon–Sat, 09:00–18:00 IST</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h5 className="text-sm font-semibold tracking-wide uppercase text-white/70">Follow</h5>
          <div className="mt-3 flex items-center gap-3">
            {/* Instagram */}
            <a
              href="https://instagram.com/yourprofile"
              target="_blank" rel="noreferrer" aria-label="Instagram"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com/yourprofile"
              target="_blank" rel="noreferrer" aria-label="Facebook"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M13.5 21v-7h2.6l.4-3h-3v-1.9c0-.9.3-1.5 1.6-1.5H17V4.1c-.8-.1-1.7-.1-2.5-.1-2.6 0-4.3 1.6-4.3 4.4V11H8v3h2.2v7h3.3z" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a
              href="https://twitter.com/yourprofile"
              target="_blank" rel="noreferrer" aria-label="X (Twitter)"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/yourprofile"
              target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h4v1.9h.06c.56-1.07 1.94-2.2 3.98-2.2 2.38 0 3.96 1.7 3.96 4.68V21h-4v-6.64c0-1.6-.57-2.68-2-2.68-1.1 0-1.74.74-2.03 1.45-.1.23-.13.56-.13.88V21h-4V9z" />
              </svg>
            </a>
          </div>
          <p className="mt-3 text-white/70 text-xs">
            Follow for field updates, datasets, and feature drops.
          </p>
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



export default function Explore() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let rafId;
    const loop = (t) => { lenis.raf(t); rafId = requestAnimationFrame(loop); };
    rafId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  const stats = { wasteRemovedKg: 1843210, speciesProtected: 127, activeProjects: 36, sdgProgress: 62 };

  return (
    <div className="bg-ivory text-navy" id="top">
      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-navy">
        {/* Glass header is ABSOLUTE inside the hero, so it scrolls away */}
        <Header />

        <Canvas camera={{ fov: 55, position: [0, 2.5, 12] }} dpr={[1, 1.5]} gl={{ antialias: true }} style={{ position: "absolute", inset: 0 }}>
          <Suspense fallback={null}><UnderwaterScene /></Suspense>
        </Canvas>

        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 22%, rgba(0,0,0,0) 55%)", mixBlendMode: "screen" }} />

        <div className="absolute inset-0 z-20 grid place-items-center px-4">
          <CtaCenter />
        </div>

        {/* Anchor for Impact */}
        <div id="impact" className="absolute top-[65%] left-0 right-0 h-0" />

        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20 px-4 w-full flex justify-center">
          <Ticker stats={stats} />
        </div>

        <PromptChip />
      </section>

      {/* CONTENT SECTIONS */}
      <div id="hotspots">
        <Hotspots />
      </div>
      <div id="stories">
        <Stories />
      </div>

      <Footer />
    </div>
  );
}
