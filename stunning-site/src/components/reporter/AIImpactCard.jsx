import React from "react";

function Ring({ label, value, color }) {
  const r = 28, c = 2*Math.PI*r;
  const off = c - (value/100)*c;
  return (
    <div className="flex items-center gap-3">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} stroke="#e5e7eb" strokeWidth="8" fill="none"/>
        <circle cx="36" cy="36" r={r} stroke={color} strokeWidth="8" fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          transform="rotate(-90 36 36)"/>
      </svg>
      <div>
        <div className="text-xl font-semibold">{value}</div>
        <div className="text-sm text-navy/70">{label}</div>
      </div>
    </div>
  );
}

export default function AIImpactCard({ last }) {
  if (!last) return null;
  return (
    <div className="rounded-2xl border border-navy/15 bg-white p-5">
      <div className="text-sm text-navy/60">AI Prediction (demo)</div>
      <div className="font-semibold mt-1">{last.type}</div>
      <p className="text-sm text-navy/70 mt-1">{last.desc}</p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Ring label="Severity" value={last.severity} color={last.severity>=80?"#ef4444":last.severity>=60?"#f59e0b":"#22c55e"} />
        <Ring label="Impact score" value={last.impactScore} color="#0ea5e9" />
        <div>
          <div className="text-sm text-navy/60">If unresolved (30 days)</div>
          <div className="text-2xl font-semibold mt-1">
            {Math.round(last.impactScore*5+50)}+ lives affected
          </div>
          <div className="text-xs text-navy/60 mt-1">Based on 3 similar incidents in your area</div>
        </div>
      </div>
    </div>
  );
}
