import React, { useMemo } from "react";

export function Particles({ mode = "morning", count = 16 }) {
  // pick a mix per mode
  const types = mode === "evening" ? ["p-star","p-bubble"] :
                mode === "afternoon" ? ["p-leaf","p-bubble"] :
                ["p-bubble","p-leaf"];
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const x = Math.round(Math.random() * 100);         // 0–100%
      const d = 10 + Math.random() * 10;                  // 10–20s
      const tx = (Math.random() * 160 - 80).toFixed(0);   // -80..+80px drift
      const cls = types[(Math.random() * types.length) | 0];
      return { i, x, d, tx, cls };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, count]); // fix count/mode only

  return (
    <div className="particles">
      {items.map(({ i, x, d, tx, cls }) => (
        <span key={i} className={`particle ${cls}`} style={{ "--x": `${x}%`, "--d": `${d}s`, "--tx": `${tx}px` }} />
      ))}
    </div>
  );
}
