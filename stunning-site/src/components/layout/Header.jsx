// src/components/layout/Header.jsx
import React, { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shell = "sticky top-0 z-50 transition bg-navy/50 backdrop-blur";
  const sc = "shadow-lg border-b border-white/10 bg-navy/70";

  const [q, setQ] = useState("");
  const onSearch = (e) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    window.location.href = `/search?q=${encodeURIComponent(term)}`;
  };

  return (
    <header className={`${shell} ${scrolled ? sc : ""}`}>
      <nav className="w-full max-w-[72rem] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="EcoSphere logo" className="h-8 w-8 rounded-full ring-1 ring-white/20 object-contain" />
          <span className="text-white font-semibold text-lg tracking-tight">EcoSphere</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-white/90">
          <li><a href="/community" className="hover:text-white transition">Join Community</a></li>
          <li><a href="/#stories" className="hover:text-white transition">Stories</a></li>
          <li><a href="/#impact" className="hover:text-white transition">Impact</a></li>
          <li><a href="/#hotspots" className="hover:text-white transition">Hotspots</a></li>
        </ul>

        {/* Search (desktop) */}
        <form onSubmit={onSearch} className="hidden md:block w-64" role="search">
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

        {/* Mobile menu button */}
        <button
          aria-label="Open menu"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
          onClick={() => setOpen((s) => !s)}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-navy/90 backdrop-blur">
          <div className="w-full max-w-[72rem] mx-auto px-4 py-4 space-y-4">
            {/* Search (mobile) */}
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
              className="relative"
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

            <ul className="grid gap-3 text-white/90">
              <li><a href="/community" className="block py-2" onClick={() => setOpen(false)}>Join Community</a></li>
              <li><a href="/#stories" className="block py-2" onClick={() => setOpen(false)}>Stories</a></li>
              <li><a href="/#impact" className="block py-2" onClick={() => setOpen(false)}>Impact</a></li>
              <li><a href="/#hotspots" className="block py-2" onClick={() => setOpen(false)}>Hotspots</a></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
