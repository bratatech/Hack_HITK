// components/ClosingCTA.tsx
import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function ClosingCTA({
  title = "Join the EcoSphere beta",
  subtitle = "Get early access to the 3D globe, live hotspots, and real-time impact counters.",
  ctaHref = "/signup",
  ctaLabel = "Get Early Access",
  secondaryHref = "/ask",
  secondaryLabel = "Ask EcoSphere AI",
}: Props) {
  return (
    <section
      className="relative mt-20 border-t border-sky-200 bg-gradient-to-b from-sky-50/70 to-white"
      aria-labelledby="closing-cta-title"
      data-testid="closing-cta"
    >
      {/* subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_40%_at_50%_0%,rgba(56,189,248,0.18),transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-[72rem] px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-3xl">
            <h2
              id="closing-cta-title"
              className="text-3xl font-semibold tracking-tight text-sky-900"
            >
              {title}
            </h2>
            <p className="mt-2 text-lg text-sky-800/80">{subtitle}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-medium text-white shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 bg-sky-600 hover:bg-sky-700"
            >
              {ctaLabel}
            </a>

            <a
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-2xl border border-sky-200 bg-white/80 px-5 py-3 text-base font-medium text-sky-900 shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
            >
              ✨ {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
