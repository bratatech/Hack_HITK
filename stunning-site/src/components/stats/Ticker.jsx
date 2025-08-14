// src/components/stats/Ticker.jsx
import React, { useEffect, useState } from "react";

// 1,234,567 + optional suffix
function formatNumber(n, { suffix = "", decimals = 0 } = {}) {
  const k = Math.pow(10, decimals);
  const fixed = Math.round(n * k) / k;
  const parts = fixed.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return parts + (suffix ? ` ${suffix}` : "");
}

// rAF count-up (starts immediately)
function useCountUp(target, { duration = 1600, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0, t0 = 0;
    const from = 0;
    const to = target;
    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

    const tick = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      const eased = easeOutCubic(p);
      const v = from + (to - from) * eased;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return formatNumber(value, { decimals });
}

function Stat({ icon, label, value, suffix = "", decimals = 0, duration = 1600 }) {
  const text = useCountUp(value, { duration, decimals });
  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <div className="shrink-0 rounded-xl bg-white/10 border border-white/10 p-2">
        {icon}
      </div>
      <div>
        <div className="text-xl md:text-2xl font-bold text-ivory leading-none">
          {text}{suffix ? ` ${suffix}` : ""}
        </div>
        <div className="text-xs md:text-sm text-ivory/70 mt-1">{label}</div>
      </div>
    </div>
  );
}

export default function Ticker({
  stats = {
    wasteRemovedKg: 1843210,
    speciesProtected: 127,
    activeProjects: 36,
    sdgProgress: 62,
  },
}) {
  return (
    <div className="pointer-events-auto">
      <div
        className="relative mx-auto w-[94vw] max-w-5xl rounded-2xl
                   bg-white/10 backdrop-blur-md border border-white/15
                   shadow-[0_12px_60px_rgba(0,0,0,0.35)]"
      >
        {/* mint shimmer accent using your palette #9FF5DE */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-0.5 h-0.5 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(159,245,222,0) 0%, rgba(159,245,222,0.9) 50%, rgba(159,245,222,0) 100%)",
          }}
        />

        {/* grid of stats */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          <Stat
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                <path d="M7 2a1 1 0 0 0-1 1v2H4a2 2 0 0 0-2 2v2h20V7a2 2 0 0 0-2-2h-2V3a1 1 0 0 0-1-1H7ZM2 10v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-9H2Zm6 3h8a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2Z"/>
              </svg>
            }
            label="Waste Removed"
            value={stats.wasteRemovedKg}
            suffix="kg"
          />
          <Stat
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                <path d="M12 2C7.03 2 3 6.03 3 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Zm-1 4h2v5h3v2h-5V6Z" />
              </svg>
            }
            label="Species Protected"
            value={stats.speciesProtected}
          />
          <Stat
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                <path d="M4 4h16v2H4V4Zm0 7h16v2H4v-2Zm0 7h10v2H4v-2Z"/>
              </svg>
            }
            label="Active Projects"
            value={stats.activeProjects}
          />
          <Stat
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                <path d="M12 2a10 10 0 1 0 10 10h-8V2Z"/>
              </svg>
            }
            label="SDG Progress"
            value={stats.sdgProgress}
            suffix="%"
          />
        </div>
      </div>
    </div>
  );
}
