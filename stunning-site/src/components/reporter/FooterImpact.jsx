import React from "react";

export default function FooterImpact({ totals = { plastic:0, oil:0, fishing:0, other:0 } }) {
  const sum = Object.values(totals).reduce((a,b)=>a+b,0) || 1;
  const sdg = [
    { name:"SDG 14: Life Below Water", v: totals.plastic + totals.oil + totals.fishing },
    { name:"SDG 15: Life on Land", v: totals.other },
    { name:"SDG 13: Climate Action", v: Math.round(sum*0.6) },
  ];
  const w = (v) => `${Math.round((v/sum)*100)}%`;
  return (
    <footer className="mt-8 rounded-2xl border border-navy/15 pastel-peri panel-shadow p-5">
      <div className="font-semibold">Partners & SDG Impact</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
        {["WWF","UNEP","Ocean Conserv.","Local NGO"].map(x=>(
          <div key={x} className="rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm text-center">{x}</div>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {sdg.map(s=>(
          <div key={s.name}>
            <div className="text-xs text-navy/70">{s.name}</div>
            <div className="h-2 w-full rounded-full bg-navy/10 overflow-hidden">
              <div className="h-full bg-[#7c3aed]" style={{ width: w(s.v) }} />
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
