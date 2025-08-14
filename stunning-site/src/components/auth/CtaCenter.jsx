// src/components/auth/CtaCenter.jsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Button from "../ui/Button";

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function CtaCenter() {
  const cardRef = useRef(null);

  // magnetic micro-interaction
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 120, damping: 12, mass: 0.2 });
  const y = useSpring(rawY, { stiffness: 120, damping: 12, mass: 0.2 });

  function onMove(e) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    rawX.set(clamp(dx * 12, -12, 12));
    rawY.set(clamp(dy * 12, -12, 12));
  }
  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className="relative w-[90vw] max-w-[560px] mx-auto rounded-3xl
                 bg-white/10 backdrop-blur-md border border-white/15
                 shadow-[0_20px_80px_rgba(0,0,0,0.35)]
                 p-6 md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/20" />

      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-ivory">Welcome</h2>
        <p className="mt-2 text-ivory/80">Dive in to continue your journey.</p>

        {/* Single primary Login button */}
        <div className="mt-6 flex justify-center">
          <Button
            as={Link}
            to="/login"
            variant="primary"
            className="px-6 py-3 text-base md:text-lg"
          >
            {/* filled lock icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="mr-2 inline"
            >
              <path d="M12 1a5 5 0 0 0-5 5v3H6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3h-1V6a5 5 0 0 0-5-5Zm-3 8V6a3 3 0 1 1 6 0v3H9Z" />
            </svg>
            Login
          </Button>
        </div>

        {/* Subcopy with sign-up link */}
        <p className="mt-3 text-ivory/70 text-sm">
          New here?{" "}
          <Link
            to="/signup"
            className="underline decoration-1 underline-offset-2 text-ivory"
          >
            Create an account
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
