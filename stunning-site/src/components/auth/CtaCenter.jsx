// src/components/auth/CtaCenter.jsx
import React from "react";
import { motion } from "framer-motion";

export default function CtaCenter() {
  return (
    <div className="max-w-3xl w-full">
      <div className="mx-auto rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl px-6 py-10 sm:px-12 sm:py-12 text-center relative overflow-hidden">
        {/* soft radial glow */}
        <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(40%_30%_at_50%_0%,rgba(56,189,248,0.28),transparent_70%)]" />

        {/* Headline */}
        <motion.h1
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white"
        >
          We turn{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-300">
            ocean data
          </span>{" "}
          into action
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

        {/* CTA row */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.5 }}
          className="mt-6 text-white/80"
        >
          Ready to dive in?
        </motion.p>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
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
