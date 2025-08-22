// src/components/layout/Header.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";

/* -------- About Modal -------- */
function AboutEcoSphereModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-[#0D47A1]/95 to-[#26c6da]/90 rounded-3xl shadow-2xl max-w-3xl w-[92vw] p-8 text-white border-2 border-white/20">
        <button
          className="absolute top-4 right-4 text-3xl text-white/80 hover:text-emerald-300 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300 rounded-full transition-colors"
          aria-label="Close about panel"
          onClick={onClose}
        >
          ×
        </button>

        <div className="flex items-center gap-3 mb-4">
          {/* NOTE: files in /public are served from root → use /logo.png */}
          <img src="/logo.png" alt="EcoSphere Logo" className="h-10 w-10 rounded-lg bg-white object-contain" />
          <h2 className="text-3xl font-extrabold text-emerald-200 drop-shadow">About EcoSphere</h2>
        </div>

        <div className="grid gap-6 text-white/90">
          <section>
            <h3 className="text-lg font-semibold text-sky-200 mb-1">What it is</h3>
            <p>EcoSphere turns ocean data into real-world action by connecting citizens, researchers, NGOs, and local authorities.</p>
          </section>

          <section className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-white/10 border border-white/20 p-4">
              <h4 className="font-semibold text-cyan-200 mb-1">How it works</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Collects reports &amp; media from the field</li>
                <li>Maps live hotspots &amp; trends</li>
                <li>AI classifies incidents &amp; severity</li>
              </ul>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/20 p-4">
              <h4 className="font-semibold text-cyan-200 mb-1">For communities</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>See nearby issues &amp; verified updates</li>
                <li>Join cleanup / conservation projects</li>
                <li>Track progress with open metrics</li>
              </ul>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/20 p-4">
              <h4 className="font-semibold text-cyan-200 mb-1">Impact</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Waste removed &amp; species protected</li>
                <li>Faster reporting → faster response</li>
                <li>Open data for education &amp; research</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-sky-200 mb-1">What you can do here</h3>
            <p>Report incidents, explore hotspots, follow stories, and support community-led efforts that restore marine life.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

/* -------- Small user chip + menu (reads from localStorage) -------- */
function useStoredUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = () => {
      try {
        const obj = JSON.parse(localStorage.getItem("ecos_user") || "null");
        setUser(obj);
      } catch {
        setUser(null);
      }
    };
    load();
    // update if another tab logs in/out
    const onStorage = (e) => {
      if (e.key === "ecos_user") load();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return [user, setUser];
}

function UserMenu() {
  const [user, setUser] = useStoredUser();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <a href="/login" className="rounded-xl border border-white/30 bg-white/10 text-white px-3 py-2 text-sm hover:bg-white/15">Login</a>
        <a href="/signup" className="rounded-xl bg-emerald-300 text-navy px-3 py-2 text-sm font-semibold hover:bg-emerald-200">
          Create account
        </a>
      </div>
    );
  }

  const avatarSrc = user.avatar || "/images/avatars/default1.png";

  const signOut = () => {
    localStorage.removeItem("ecos_user");
    setUser(null);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-2.5 py-1.5 text-white hover:bg-white/15"
        title="Open user menu"
      >
        <img src={avatarSrc} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />
        <span className="text-sm font-medium">{user.username}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white text-navy shadow-lg ring-1 ring-navy/10 overflow-hidden">
          <div className="px-3 py-2 border-b border-navy/10">
            <p className="text-sm font-semibold">{user.username}</p>
            <p className="text-xs text-navy/60 truncate">{user.email}</p>
          </div>
          <a href="/profile" className="block px-3 py-2 text-sm hover:bg-navy/5">Profile (soon)</a>
          <button onClick={signOut} className="block w-full text-left px-3 py-2 text-sm hover:bg-navy/5">Sign out</button>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const handler = () => setAboutOpen(true);
    window.addEventListener("open-about-modal", handler);
    return () => window.removeEventListener("open-about-modal", handler);
  }, []);

  const sections = useMemo(() => ({ hotspots: "#hotspots", stories: "#stories", impact: "#impact" }), []);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = (new FormData(e.currentTarget).get("q") || "").toString().trim().toLowerCase();
    if (!term) return;
    if (term.includes("about")) return setAboutOpen(true);
    const key = Object.keys(sections).find((k) => term === k || term.includes(k) || k.includes(term));
    if (!key) return;
    document.querySelector(sections[key])?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // NOTE: Header is positioned absolutely by its parent (hero) so it scrolls away.
  return (
    <>
      <AboutEcoSphereModal open={aboutOpen} onClose={() => setAboutOpen(false)} />

      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-[min(1100px,94vw)]">
        <div
          className="
            flex items-center justify-between gap-4
            rounded-2xl border border-white/20 bg-white/10
            backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            px-4 sm:px-6 py-3 text-white
          "
        >
          {/* Brand */}
          <a href="/" className="flex items-center gap-3 shrink-0">
            {/* same path fix here */}
            <img src="/logo.png" alt="EcoSphere Logo" className="h-9 w-9 rounded-lg object-contain bg-white/90" />
            <span className="text-xl font-semibold tracking-widest">ECOSPHERE</span>
          </a>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button type="button" onClick={() => setAboutOpen(true)} className="text-white/80 hover:text-white transition">About</button>
            <a href="#hotspots" className="text-white/80 hover:text-white transition">Hotspots</a>
            <a href="#stories" className="text-white/80 hover:text-white transition">Stories</a>
            <a href="#impact" className="text-white/80 hover:text-white transition">Impact</a>
          </nav>

          {/* Right side: search + user */}
          <div className="flex items-center gap-3 ml-auto">
            <form onSubmit={handleSearch} className="relative hidden sm:block" role="search" aria-label="Site search">
              <input
                name="q"
                type="search"
                placeholder="Search: hotspots, stories, impact…"
                className="w-64 rounded-xl bg-white/10 border border-white/25 placeholder-white/60 text-white pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40"
              />
              <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.2-3.2" />
              </svg>
            </form>

            {/* User chip / auth buttons */}
            <UserMenu />
          </div>
        </div>

        {/* Mobile quick links */}
        <div className="mt-2 md:hidden flex justify-center gap-5 text-white/85 text-sm">
          <button type="button" onClick={() => setAboutOpen(true)} className="hover:text-white">About</button>
          <a href="#hotspots" className="hover:text-white">Hotspots</a>
          <a href="#stories" className="hover:text-white">Stories</a>
          <a href="#impact" className="hover:text-white">Impact</a>
        </div>
      </div>
    </>
  );
}
