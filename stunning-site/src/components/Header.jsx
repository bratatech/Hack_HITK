import React from "react";
import Button from "./ui/Button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Glass bar */}
      <div className="backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          {/* Brand */}
          <a href="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/20 text-primary font-black">
              E
            </span>
            <span className="text-ivory font-semibold tracking-widest hidden sm:inline">
              ECOSPHERE
            </span>
          </a>

          {/* Simple nav (placeholders for now) */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-ivory/80">
            <a href="#" className="hover:text-ivory">Home</a>
            <a href="#" className="hover:text-ivory">About</a>
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
    </header>
  );
}
