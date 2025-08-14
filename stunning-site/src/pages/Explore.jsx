// src/pages/Explore.jsx
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import Lenis from "lenis";

import UnderwaterScene from "../scenes/UnderwaterScene.jsx";
import CtaCenter from "../components/auth/CtaCenter.jsx";
import Ticker from "../components/stats/Ticker.jsx";
import Hotspots from "../sections/Hotspots.jsx";
import Stories from "../sections/Stories.jsx";
import PromptChip from "../components/ai/PromptChip.jsx";

export default function Explore() {
  // Smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Sample stats (replace with API later)
  const stats = {
    wasteRemovedKg: 1_843_210,
    speciesProtected: 127,
    activeProjects: 36,
    sdgProgress: 62,
  };

  return (
    <div className="bg-ivory text-navy">
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

        {/* Stats ticker near bottom-center */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20 px-4 w-full flex justify-center">
          <Ticker stats={stats} />
        </div>

        {/* 3) Mounted here: AI prompt chip (fixed bottom-right) */}
        <PromptChip />
      </section>

      {/* CONTENT SECTIONS (page scrolls naturally) */}
      <Hotspots />
      <Stories />

      {/* Spacer / future sections */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-navy">More coming next</h3>
          <p className="mt-3 text-navy/80">
            Next we’ll add the 3D globe with live hotspots, impact counters, and a closing CTA band.
          </p>
        </div>
      </section>
    </div>
  );
}
