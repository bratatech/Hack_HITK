// src/components/auth/CtaCenter.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

// Simple modal for About EcoSphere
function AboutEcoSphereModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-[#0D47A1]/95 to-[#26c6da]/90 rounded-3xl shadow-2xl max-w-2xl w-full p-8 text-white border-2 border-white/20">
        <button
          className="absolute top-4 right-4 text-3xl text-white/80 hover:text-emerald-300 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300 rounded-full transition-colors"
          aria-label="Close about panel"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-3xl font-extrabold mb-4 text-emerald-200 drop-shadow">About EcoSphere</h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <img src="/public/logo.png" alt="EcoSphere Logo" className="w-24 h-24 rounded-xl shadow-lg border-2 border-emerald-200 bg-white object-contain" />
            <div>
              <h3 className="text-xl font-bold mb-1 text-sky-200">Our Mission</h3>
              <p className="text-white/90">EcoSphere empowers people to turn ocean data into real-world action. We connect communities, researchers, and volunteers to protect marine life and restore our blue planet.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <img src="/public/images/hotspot-1.jpg" alt="Hotspot Example" className="w-32 h-20 rounded-lg shadow border border-white/20 object-cover" />
            <div>
              <h3 className="text-lg font-semibold text-cyan-200 mb-1">Live Hotspots</h3>
              <p className="text-white/80">Explore real-time environmental hotspots, track marine health, and discover stories of impact from around the world.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <img src="/public/images/hotspot-2.jpg" alt="Community Project" className="w-32 h-20 rounded-lg shadow border border-white/20 object-cover" />
            <div>
              <h3 className="text-lg font-semibold text-cyan-200 mb-1">Community Projects</h3>
              <p className="text-white/80">Back and join community-led projects that restore marine life, reduce pollution, and drive sustainable change.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <img src="/public/images/hotspot-3.jpg" alt="Data Visualization" className="w-32 h-20 rounded-lg shadow border border-white/20 object-cover" />
            <div>
              <h3 className="text-lg font-semibold text-cyan-200 mb-1">Data to Action</h3>
              <p className="text-white/80">We transform complex ocean data into simple, actionable insights for everyone—educators, students, and citizens.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function CtaCenter() {
  const [aboutOpen, setAboutOpen] = useState(false);
  return (
    <div className="max-w-3xl w-full">
      <AboutEcoSphereModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <div className="mx-auto rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl px-6 py-10 sm:px-12 sm:py-12 text-center relative overflow-hidden">
        {/* soft radial glow */}
        <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(40%_30%_at_50%_0%,rgba(56,189,248,0.28),transparent_70%)]" />
        <motion.button
          type="button"
          onClick={() => setAboutOpen(true)}
          initial={{ y: -18, opacity: 0, scale: 0.96 }}
          animate={{
            y: [0, -2, 0],
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative mx-auto inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-base sm:text-lg font-semibold text-white/95 shadow-xl backdrop-blur-xl ring-1 ring-white/10 hover:bg-white/15 hover:border-white/40 transition cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-70 animate-ping"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]"></span>
          </span>
          <span className="tracking-tight">About&nbsp;EcoSphere</span>
          {/* subtle shine */}
          <span className="pointer-events-none absolute inset-0 rounded-full [mask-image:linear-gradient(180deg,white,transparent_60%)] opacity-60"
                style={{ boxShadow: "inset 0 1px 12px rgba(255,255,255,.18)" }} />
        </motion.button>
        {/* Headline */}
        <motion.h1
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.7, ease: "easeOut" }}
          className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white"
        >
          We turn <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-300">ocean data</span> into action
        </motion.h1>

        {/* Value prop */}
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-3 text-white/85 text-lg"
        >
          Explore live hotspots, follow real impact stories, and back
          community-led projects that restore marine life.
        </motion.p>

        {/* Benefits */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.6 }}
          className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-white/90"
        >
          <li className="rounded-xl bg-white/6 border border-white/10 px-3 py-2">🌍 Live 3D globe</li>
          <li className="rounded-xl bg-white/6 border border-white/10 px-3 py-2">📈 Real-time impact</li>
          <li className="rounded-xl bg-white/6 border border-white/10 px-3 py-2">🤝 Join the community</li>
        </motion.ul>

        {/* CTA row */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38, duration: 0.5 }}
          className="mt-6 text-white/80"
        >
          Ready to dive in?
        </motion.p>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-300 text-navy font-semibold px-6 py-3 shadow-md hover:shadow-lg hover:bg-emerald-200 transition"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="10" width="18" height="11" rx="2" />
              <path d="M7 10V7a5 5 0 0 1 10 0v3" />
            </svg>
            Login
          </a>

          <a
            href="/signup"
            className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-white font-semibold px-6 py-3 hover:bg-white/15 hover:border-white/40 transition"
          >
            Create an account
          </a>
        </motion.div>

        <p className="mt-3 text-xs text-white/60">Free account • No spam • Cancel anytime</p>
      </div>
    </div>
  );
}
