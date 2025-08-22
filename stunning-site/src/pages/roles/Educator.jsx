// src/pages/Educator.jsx
import React, { useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                               Mocked Page Data                              */
/* -------------------------------------------------------------------------- */
const USER = {
  name: "Dr. Rivera",
  level: 5,
  title: "Climate Advocate",
  xp: 90,
  nextLevelXp: 150,
  modulesCompleted: 3,
  totalPoints: 90,
  badgesEarned: 4,
  avatar: "/public/avatar-eco.png", // place an avatar here or swap the path
};

const BADGES = [
  { id: "ocean", label: "Ocean Protector", icon: "🌊", earned: true },
  { id: "climate", label: "Climate Scholar", icon: "🌍", earned: true },
  { id: "biodiv", label: "Biodiversity Champion", icon: "🦋", earned: true },
  { id: "reforest", label: "Reforestation Ranger", icon: "🌳", earned: false },
];

const RECENT = [
  { id: "ocean-pollution", title: "Ocean Pollution", points: 25, icon: "🌊" },
  { id: "climate-fund", title: "Climate Change Fundamentals", points: 30, icon: "🌍" },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "sustain", label: "Sustainable Living" },
  { id: "renew", label: "Renewable Energy" },
  { id: "waste", label: "Waste Management" },
  { id: "marine", label: "Marine Conservation" },
  { id: "climate", label: "Climate Basics" },
  { id: "biodiversity", label: "Biodiversity" },
];

const MODULES = [
  {
    id: "ocean",
    category: "marine",
    track: "Marine Conservation",
    title: "Ocean Pollution: Understanding the Crisis",
    desc:
      "Learn about the sources, impacts, and solutions to ocean pollution affecting marine ecosystems worldwide.",
    minutes: 15,
    level: "Beginner",
    points: 25,
    accent: "from-sky-200/60 to-indigo-100",
  },
  {
    id: "climate-fund",
    category: "climate",
    track: "Climate Basics",
    title: "Climate Change Fundamentals",
    desc:
      "Understand the science behind climate change, its causes, effects, and actionable solutions.",
    minutes: 20,
    level: "Beginner",
    points: 30,
    accent: "from-cyan-100 to-blue-100",
  },
  {
    id: "biodiv",
    category: "biodiversity",
    track: "Biodiversity",
    title: "Biodiversity Conservation Basics",
    desc:
      "Explore the importance of biodiversity, threats to ecosystems, and conservation strategies.",
    minutes: 25,
    level: "Intermediate",
    points: 35,
    accent: "from-emerald-100 to-lime-100",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Reusable UI Bits                               */
/* -------------------------------------------------------------------------- */
function ProgressBar({ value, max, color = "bg-gray-900" }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full h-3 rounded-full bg-gray-200" aria-hidden>
      <div className={`h-3 rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Stat({ value, label, color = "text-gray-900" }) {
  return (
    <div className="text-center">
      <div className={`text-3xl font-extrabold leading-none ${color}`}>{value}</div>
      <div className="text-sm text-gray-500 leading-tight">{label}</div>
    </div>
  );
}

function BadgePill({ earned, icon, label }) {
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm border shadow-sm";
  return (
    <span
      className={
        earned
          ? `${base} bg-white border-gray-200 text-gray-700`
          : `${base} bg-gray-50 text-gray-400 border-gray-100 opacity-70`
      }
      title={earned ? label : `${label} (locked)`}
    >
      <span className="text-lg leading-none">{icon}</span>
      {label}
    </span>
  );
}

function ModuleCard({ m, onStart }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden">
      <div className="p-5">
        <span className="inline-block text-xs font-semibold text-gray-700 bg-white ring-1 ring-gray-200 rounded-full px-3 py-1 mb-3">
          {m.track}
        </span>
        <h3 className="text-lg font-bold text-gray-900">{m.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{m.desc}</p>

        <div className="mt-4 flex items-center gap-4 text-gray-500 text-sm">
          <span className="inline-flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80">
              <path fill="currentColor" d="M12 8v5l4 2 .75-1.86-2.75-1.39V8z" />
              <path fill="currentColor" d="M12 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10m0-18a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8" />
            </svg>
            {m.minutes} min
          </span>
          <span className="inline-flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80">
              <path fill="currentColor" d="M12 2l3 7h7l-5.5 4 2.5 7-7-4.5L5.5 20 8 13 2 9h7z" />
            </svg>
            {m.level}
          </span>
          <span className="inline-flex items-center gap-1">⭐ <span className="font-medium">{m.points}</span> pts</span>
        </div>
      </div>

      <div className={`h-2 bg-gradient-to-r ${m.accent}`} aria-hidden />
      <div className="p-5 pt-3">
        <button
          onClick={() => onStart(m)}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 transition"
        >
          Start Learning <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Tiny SVG Charts                               */
/* -------------------------------------------------------------------------- */
function LineChart({ data, stroke = "#111827" /* gray-900 */ }) {
  const width = 320;
  const height = 100;
  const pad = 8;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const scaleX = (i) => pad + (i * (width - pad * 2)) / (data.length - 1 || 1);
  const scaleY = (v) => height - pad - ((v - min) * (height - pad * 2)) / (max - min || 1);
  const points = data.map((v, i) => `${scaleX(i)},${scaleY(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-24">
      <rect x="0" y="0" width={width} height={height} fill="#F3F4F6" rx="8" />
      <polyline fill="none" stroke={stroke} strokeWidth="2.5" points={points} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Filters & Mock Generators                        */
/* -------------------------------------------------------------------------- */
const REGIONS = ["Global", "Africa", "Americas", "Asia", "Europe", "Oceania"];
const RANGES = [
  { id: "1y", label: "Past year" },
  { id: "5y", label: "Past 5 years" },
  { id: "10y", label: "Past 10 years" },
];

function seeded(region, range) {
  const seed = (region + range).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return Array.from({ length: 12 }, (_, i) =>
    Math.round(40 + 10 * Math.sin((i + (seed % 7)) / 2) + ((seed % 13) - 6))
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Page                                      */
/* -------------------------------------------------------------------------- */
const LearningPopup = ({ module, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full overflow-y-auto max-h-[80vh]">
        <h2 className="text-2xl font-bold mb-4">{module.title}</h2>
        <div className="text-sm text-gray-700 mb-4 whitespace-pre-wrap">
          {module.content}
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function Educator() {
  const [category, setCategory] = useState("all");
  const [region, setRegion] = useState("Global");
  const [range, setRange] = useState("5y");

  const [selectedModule, setSelectedModule] = useState(null);

  const filtered = useMemo(() => {
    if (category === "all") return MODULES;
    return MODULES.filter((m) => m.category === category);
  }, [category]);

  const deforestation = useMemo(() => seeded(region, range), [region, range]);
  const marineWaste = useMemo(() => seeded(region + "w", range), [region, range]);
  const biodiversity = useMemo(() => seeded(region + "b", range), [region, range]);

  const handleStart = (module) => {
    setSelectedModule(module);
  };

  // Trusted sources for direct download/open:
  const PDF_SOURCES = [
    // IPCC AR6 Synthesis Report – Summary for Policymakers (stable direct PDF)
    "https://www.ipcc.ch/report/ar6/syr/downloads/report/IPCC_AR6_SYR_SPM.pdf",
    // IPCC AR5 WG1 SPM (backup)
    "https://www.ipcc.ch/site/assets/uploads/2018/02/WG1AR5_SPM_FINAL.pdf",
  ];
  const CSV_SOURCES = [
    // Our World in Data – CO2 emissions
    "https://ourworldindata.org/grapher/co2.csv",
    // Our World in Data – GHG emissions by sector
    "https://ourworldindata.org/grapher/ghg-emissions-by-sector.csv",
  ];

  const downloadPdf = () => {
    const url = PDF_SOURCES[Math.floor(Math.random() * PDF_SOURCES.length)];
    const a = document.createElement("a");
    a.href = url;
    a.download = ""; // let browser use filename from server
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadCsv = () => {
    const url = CSV_SOURCES[Math.floor(Math.random() * CSV_SOURCES.length)];
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sky-50">
      {/* Top profile bar */}
      <div className="w-full flex items-center justify-end px-6 pt-4">
        <div className="flex items-center gap-3 bg-white/80 rounded-full shadow px-4 py-2 border border-[#CAEBFF]">
          <img
            src={USER.avatar}
            alt="Profile avatar"
            className="w-10 h-10 rounded-full border-2 border-[#0D47A1] bg-[#CAEBFF] object-cover"
          />
          <span className="text-[#0D47A1] font-semibold text-base">Hello, {USER.name}</span>
        </div>
      </div>

      {/* Hero / Banner */}
      <section className="mx-auto max-w-6xl px-4 mt-4">
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 ring-1 ring-white/20">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="16" rx="3" fill="white" opacity=".15" />
                  <path d="M12 5v14" stroke="white" strokeWidth="2" opacity=".85" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Learn &amp; Act Hub</h1>
              <p className="mt-2 text-white/90 max-w-3xl">
                Empower yourself with knowledge. Complete modules, earn badges, and
                become a more effective climate champion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Card */}
      <section className="mx-auto max-w-6xl px-4 mt-6">
        <div className="rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 p-6 sm:p-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">🏅</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Learning Journey</h2>
              </div>
              <p className="text-gray-500 text-sm mt-1">Your progress and achievements</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <Stat value={USER.modulesCompleted} label="Modules Completed" color="text-emerald-600" />
              <Stat value={USER.totalPoints} label="Total Points" color="text-blue-600" />
              <Stat value={USER.badgesEarned} label="Badges Earned" color="text-violet-600" />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-800">
                Level {USER.level}: {USER.title}
              </span>
              <span className="text-gray-500">{USER.xp}/{USER.nextLevelXp} XP</span>
            </div>
            <div className="mt-2">
              <ProgressBar value={USER.xp} max={USER.nextLevelXp} color="bg-gray-900" />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {Math.max(0, USER.nextLevelXp - USER.xp)} points to next level!
            </p>
          </div>

          {/* Badges */}
          <div className="mt-6">
            <h3 className="text-gray-900 font-semibold">My Badges</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {BADGES.map((b) => (
                <BadgePill key={b.id} earned={b.earned} icon={b.icon} label={b.label} />
              ))}
            </div>
          </div>

          {/* Recently Completed */}
          <div className="mt-8">
            <h3 className="text-gray-900 font-semibold">Recently Completed</h3>
            <ul className="mt-3 space-y-3">
              {RECENT.map((r) => (
                <li key={r.id} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{r.icon}</span>
                    <span className="font-medium text-gray-800">{r.title}</span>
                  </div>
                  <span className="text-sm text-gray-600">+{r.points} points</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="mx-auto max-w-6xl px-4 mt-8">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={
                  active
                    ? "whitespace-nowrap rounded-full bg-gray-900 text-white px-4 py-2 text-sm font-semibold shadow-sm"
                    : "whitespace-nowrap rounded-full bg-white text-gray-700 px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
                }
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Modules Grid */}
      <section className="mx-auto max-w-6xl px-4 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((m) => (
          <ModuleCard key={m.id} m={m} onStart={handleStart} />
        ))}
      </section>

      {/* --------------------------- Download Reports --------------------------- */}
      <section className="mx-auto max-w-6xl px-4 mt-10 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Download Reports</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 text-center">
            <div className="text-3xl mb-2">📄</div>
            <h3 className="font-semibold text-gray-900">Research Paper (PDF)</h3>
            <p className="text-sm text-gray-500 mb-4">Download a trusted environment research PDF (IPCC).</p>
            <button
              onClick={downloadPdf}
              className="inline-flex items-center justify-center rounded-xl bg-gray-900 text-white font-semibold px-5 py-2.5 hover:bg-black/90"
            >
              Download PDF
            </button>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Data Table (CSV)</h3>
            <p className="text-sm text-gray-500 mb-4">Download a climate dataset CSV (Our World in Data).</p>
            <button
              onClick={downloadCsv}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 text-white font-semibold px-5 py-2.5 hover:bg-blue-700"
            >
              Download CSV
            </button>
          </div>
        </div>
      </section>

      {/* ============================== Static Footer ============================== */}
      <footer
        role="contentinfo"
        className="mt-auto bg-[#0B4775] text-white/95 border-t border-white/20"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Top row: Home | EcoSphere | Social */}
          <div className="h-12 flex items-center justify-between text-xs sm:text-sm">
            <a href="/" className="font-medium hover:text-white">Home</a>
            <span className="font-semibold tracking-wide">EcoSphere</span>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-white">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2H21L13.5 10.59 22 22h-6.8l-5.1-6.64L4.2 22H2l8.06-9.2L2 2h6.8l4.66 6.07L18.244 2Zm-1.2 18h1.87L7.04 4h-1.9l11.9 16Z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zM8 8h3.8v2.04h.05c.53-1 1.84-2.05 3.79-2.05 4.06 0 4.81 2.67 4.81 6.14V23h-4v-6.62c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.53 1.72-2.53 3.5V23H8V8z"/>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5A11.5 11.5 0 0 0 8.2 22.9c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.2-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.6 1.1 3.2.8.1-.7.4-1.1.6-1.4-2.7-.3-5.6-1.3-5.6-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a10.8 10.8 0 0 1 5.8 0C16.2 3.6 17.2 3.9 17.2 3.9c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.2 0 4.7-2.9 5.7-5.6 6 .4.3.7.9.7 1.9v2.7c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-white/20" />

          <div className="h-10 flex items-center justify-between text-[11px] sm:text-xs">
            <span>© {new Date().getFullYear()} EcoSphere. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="/terms" className="hover:text-white">Terms</a>
              <a href="/privacy" className="hover:text-white">Privacy</a>
              <button
                type="button"
                className="hover:text-white"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                title="Back to top"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
      {/* ============================ End Static Footer ============================ */}

      {/* Learning Module Popup */}
      {selectedModule && (
        <LearningPopup
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
        />
      )}
    </div>
  );
}
