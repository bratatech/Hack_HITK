import React, { useMemo, useState } from "react";

const RESOURCES = [
  // datasets
  { id: 1, type: "dataset", title: "Hotspots Dataset", blurb: "GeoJSON of reported marine pollution hotspots.", meta: "Updated daily • GeoJSON/CSV" },
  { id: 2, type: "dataset", title: "Cleanup Results", blurb: "Aggregated cleanup counts by location & material.", meta: "Weekly • CSV" },
  // lessons
  { id: 3, type: "lesson", title: "Plastic Lifecycle (G7–8)", blurb: "Interactive activities & worksheets.", meta: "PDF • 12 pages" },
  { id: 4, type: "lesson", title: "Ocean Currents & Debris", blurb: "Teacher slides + student guide.", meta: "Slides/PDF" },
  // apis
  { id: 5, type: "api", title: "Impact API", blurb: "REST endpoints for counters & live stats.", meta: "REST • JSON" },
  { id: 6, type: "api", title: "Hotspots API", blurb: "Query hotspots by bbox, date, and severity.", meta: "REST • JSON" },
];

const TABS = [
  { key: "all", label: "All" },
  { key: "dataset", label: "Datasets" },
  { key: "lesson", label: "Lessons" },
  { key: "api", label: "APIs" },
];

export default function Educator() {
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return RESOURCES.filter((r) => {
      const matchesTab = tab === "all" ? true : r.type === tab;
      const matchesQ =
        !ql ||
        r.title.toLowerCase().includes(ql) ||
        r.blurb.toLowerCase().includes(ql) ||
        r.meta.toLowerCase().includes(ql);
      return matchesTab && matchesQ;
    });
  }, [tab, q]);

  return (
    <div className="min-h-[100svh] bg-ivory text-navy px-4 py-10">
      <div className="w-full max-w-[72rem] mx-auto">
        <div className="pill">🎓 Education / Research</div>
        <h1 className="title mt-3">Education & Research</h1>
        <p className="subtitle mt-1">
          Search datasets, lesson plans, and APIs for your coursework or research. (Demo only)
        </p>

        {/* Controls */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex rounded-xl border border-navy/20 bg-white p-1 w-full sm:w-auto">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  tab === t.key ? "bg-navy text-white" : "text-navy hover:bg-navy/5"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex-1">
            <div className="relative">
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search resources…"
                className="w-full rounded-xl border border-navy/20 bg-white px-10 py-2 outline-none focus:ring-2 focus:ring-navy/30"
                aria-label="Search resources"
              />
              <span className="absolute inset-y-0 left-3 flex items-center text-navy/60 pointer-events-none">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <article key={r.id} className="card">
              <div className="text-xs uppercase tracking-wide text-navy/60">
                {r.type === "dataset" ? "Dataset" : r.type === "lesson" ? "Lesson" : "API"}
              </div>
              <h3 className="font-semibold mt-1">{r.title}</h3>
              <p className="text-navy/70 text-sm mt-1">{r.blurb}</p>
              <p className="text-navy/60 text-xs mt-2">{r.meta}</p>

              <div className="mt-3 flex items-center gap-2">
                <a href="#" className="btn-primary">View</a>
                {r.type !== "lesson" && (
                  <a href="#" className="btn-ghost">Docs</a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-navy/15 bg-white p-6 text-center">
            <div className="text-2xl mb-2">🔎</div>
            <div className="font-semibold">No results</div>
            <div className="text-navy/70 text-sm">Try a different term or switch tabs.</div>
          </div>
        )}
      </div>
    </div>
  );
}
