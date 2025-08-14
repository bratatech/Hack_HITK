import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSceneTransition } from "../../context/SceneTransitionContext";

/**
 * Plays a ~1.7s dive animation:
 * - quick darken/vignette + refraction shimmer
 * - streaking "bubbles" (2D canvas) moving downward
 * - navigate to destination at ~1.1s
 * - fade out by ~1.7s
 */
export default function DiveOverlay() {
  const { active, finishDive, getDestination } = useSceneTransition();
  const nav = useNavigate();
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startedRef = useRef(false);
  const t0Ref = useRef(0);

  useEffect(() => {
    if (!active) {
      // stop anim if running
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startedRef.current = false;
      return;
    }

    const DURATION = 1700;     // total ms
    const NAVIGATE_AT = 1100;  // ms to push route

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // size canvas
    function resize() {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    }
    resize();
    window.addEventListener("resize", resize);

    // bubble streaks
    const W = () => canvas.width;
    const H = () => canvas.height;
    const N = 120; // count (kept light)
    const bubbles = Array.from({ length: N }).map(() => ({
      x: Math.random() * W(),
      y: -(Math.random() * H()),
      r: 1.5 + Math.random() * 3.5,
      v: 280 + Math.random() * 320, // px/sec downward
      a: 0.18 + Math.random() * 0.22,
    }));

    function reset(i) {
      bubbles[i].x = Math.random() * W();
      bubbles[i].y = -bubbles[i].r - Math.random() * (H() * 0.3);
      bubbles[i].r = 1.5 + Math.random() * 3.5;
      bubbles[i].v = 280 + Math.random() * 320;
      bubbles[i].a = 0.18 + Math.random() * 0.22;
    }

    // animation loop
    function frame(t) {
      if (!t0Ref.current) t0Ref.current = t;
      const elapsed = t - t0Ref.current;
      const dt = Math.min(32, elapsed - (frame.prev || elapsed)) / 1000;
      frame.prev = elapsed;

      // navigate mid-animation (once)
      if (elapsed >= NAVIGATE_AT && !startedRef.current) {
        startedRef.current = true;
        const dest = getDestination() || "/explore";
        nav(dest);
      }

      // draw
      ctx.clearRect(0, 0, W(), H());

      // subtle blue wash + vignette
      const grad = ctx.createRadialGradient(W() * 0.5, H() * 0.55, H() * 0.1, W() * 0.5, H() * 0.5, H() * 0.8);
      grad.addColorStop(0, "rgba(0, 38, 105, 0.12)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0.45)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W(), H());

      // refraction shimmer (simple sin bands)
      const shimmer = Math.min(1, elapsed / 450);
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = 0.12 * shimmer;
      const bands = 6;
      for (let i = 0; i < bands; i++) {
        ctx.fillStyle = "rgba(180,220,255,0.65)";
        const y = (H() / bands) * i + Math.sin((elapsed * 0.004 + i) * 1.7) * 12 * dpr;
        ctx.fillRect(0, y, W(), 2 * dpr);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // bubbles (downward streaks)
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 1.0 * dpr;
      for (let i = 0; i < N; i++) {
        const b = bubbles[i];
        b.y += b.v * dt * dpr; // move down
        const len = 12 * dpr;
        ctx.globalAlpha = b.a;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x, b.y + len);
        ctx.stroke();
        if (b.y - len > H()) reset(i);
      }
      ctx.globalAlpha = 1;

      // darken at the end (settle underwater)
      const settle = Math.max(0, (elapsed - 1000) / 600);
      if (settle > 0) {
        ctx.fillStyle = `rgba(0,10,30,${0.25 * Math.min(1, settle)})`;
        ctx.fillRect(0, 0, W(), H());
      }

      if (elapsed < DURATION) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        // end
        window.removeEventListener("resize", resize);
        finishDive();
      }
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      rafRef.current = null;
      t0Ref.current = 0;
      startedRef.current = false;
    };
  }, [active, finishDive, getDestination, nav]);

  // Layered motion containers for a bit of tilt/zoom feel
  if (!active) return null;
  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* slight tilt/zoom container */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1, rotate: 0 }}
        animate={{ scale: 1.06, rotate: -1.2 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </motion.div>
    </motion.div>
  );
}
