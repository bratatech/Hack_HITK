/*
import React, { useState } from "react";
import Button from "./ui/Button";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fixed header */}
      <header className="fixed inset-x-0 top-0 z-[100] h-16 md:h-20">
        {/* Glass bar */}
        <div className="h-full backdrop-blur-md bg-white/5 border-b border-white/10 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 h-full flex items-center justify-between">
            {/* Brand */}
            <a href="/" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/20 text-primary font-black">
                E
              </span>
              <span className="text-ivory font-semibold tracking-widest hidden sm:inline">
                ECOSPHERE
              </span>
            </a>

            {/* Simple nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-ivory/80">
              <a href="#" className="hover:text-ivory">Home</a>
              <button
                className="hover:text-ivory"
                onClick={() => setOpen(true)}
              >
                About
              </button>
              <a href="#" className="hover:text-ivory">Projects</a>
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <Button as="a" variant="glass" href="#hero" className="hidden sm:inline-flex">
                Get Started
              </Button>
            </div>
          </div>

          {/* Soft divider line under the header */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {open && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative bg-gradient-to-br from-[#0D47A1]/95 to-[#26c6da]/90 rounded-3xl shadow-2xl max-w-2xl w-full p-8 text-white border-2 border-white/20">
              <button
                className="absolute top-4 right-4 text-3xl text-white/80 hover:text-emerald-300 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300 rounded-full transition-colors"
                aria-label="Close about panel"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
              <h2 className="text-3xl font-extrabold mb-4 text-emerald-200 drop-shadow">About EcoSphere</h2>
              <div className="flex flex-col gap-6">
                <p>EcoSphere is a platform dedicated to turning ocean data into actionable insights.</p>
                <p>It works by aggregating real-time data from marine ecosystems and presenting it in an interactive format.</p>
                <p>EcoSphere has a significant impact on the environment by promoting community-led projects that restore marine life.</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent overlap with fixed header */}
      <div aria-hidden className="h-16 md:h-20" />
    </>
  
*/
