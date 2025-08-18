// src/pages/roles/Reporter.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import api from "../../lib/api/index";
import { Particles } from "../../components/decor/DecorFX.jsx";

import MapView from "../../components/reporter/MapView.jsx";
import ReportModal from "../../components/reporter/ReportModal.jsx";
import AIImpactCard from "../../components/reporter/AIImpactCard.jsx";
import MyReports from "../../components/reporter/MyReports.jsx";
import FooterImpact from "../../components/reporter/FooterImpact.jsx";
import Gamification from "../../components/reporter/Gamification.jsx";

export default function Reporter() {
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({ waste: true, marine: true, air: true, forest: true });

  // Load reports
  const load = async () => {
    const { items } = await api.listReports();
    setReports(items);
  };
  useEffect(() => { load(); }, []);

  const last = reports[0];
  const totals = useMemo(() => {
    const t = { plastic: 0, oil: 0, fishing: 0, other: 0 };
    for (const r of reports) {
      const s = r.type?.toLowerCase() || "";
      if (s.includes("oil")) t.oil++;
      else if (s.includes("plastic")) t.plastic++;
      else if (s.includes("fishing")) t.fishing++;
      else t.other++;
    }
    return t;
  }, [reports]);

  // time-of-day for particles only (background is fixed to bg-sea-veil so it always shows)
  const hour = new Date().getHours();
  const theme = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  // Framer Motion
  const wrap = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-sea-veil page-bg text-navy px-4 py-6 relative overflow-hidden">
      {/* subtle floating particles */}
      <Particles mode={theme} count={18} />

      <motion.div
        className="w-full max-w-[72rem] mx-auto relative"
        variants={wrap}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div className="flex items-center justify-between gap-3" variants={item}>
          <div className="flex items-center gap-3">
            <img
              src={"/avatar-eco.png"}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://i.pravatar.cc/80?img=65";
              }}
              alt="Eco Hero"
              className="w-10 h-10 rounded-full object-cover ring-1 ring-white/40"
            />
            <div>
              <div className="text-sm text-navy/70">Welcome back,</div>
              <div className="text-lg font-semibold">Eco Hero 🌊</div>
            </div>
          </div>
          <div className="hidden sm:block text-sm text-navy/70">
            <span className="mr-4">
              Reports submitted: <b>{reports.length}</b>
            </span>
            <span className="mr-4">
              Total impact: <b>{reports.reduce((a, b) => a + (b.impactScore || 0), 0)}</b>
            </span>
            <span>
              Wildlife helped: <b>{reports.length * 7}</b>
            </span>
          </div>
        </motion.div>

        {/* Quick nav pills (optional) */}
        <motion.div className="mt-4 flex flex-wrap items-center gap-2" variants={item}>
          {["Dashboard", "Community", "Challenges", "Resources", "Profile"].map((p) => (
            <button key={p} className="px-3 py-1 rounded-full border border-navy/20 bg-white text-sm">
              {p}
            </button>
          ))}
        </motion.div>

        {/* Filters + Map (single, full width) */}
        <motion.div className="mt-6" variants={item}>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-sm text-navy/70 mr-2">Layers:</span>
            {[
              { k: "waste", label: "Waste" },
              { k: "marine", label: "Marine life" },
              { k: "air", label: "Air quality" },
              { k: "forest", label: "Deforestation" },
            ].map((f) => (
              <label
                key={f.k}
                className="inline-flex items-center gap-2 text-sm bg-white/80 rounded-lg px-2 py-1 border border-navy/20"
              >
                <input
                  type="checkbox"
                  checked={filters[f.k]}
                  onChange={() => setFilters((s) => ({ ...s, [f.k]: !s[f.k] }))}
                />
                {f.label}
              </label>
            ))}
          </div>

          {/* Map card */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-navy/10 bg-white/70 glass">
            <MapView
              reports={reports}
              filters={filters}
              onOpenReport={() => setOpen(true)} // FAB opens your existing ReportModal
            />
          </div>
        </motion.div>

        {/* AI Prediction Card */}
        <motion.div className="mt-6" variants={item}>
          <AIImpactCard last={last} />
        </motion.div>

        {/* My Reports */}
        <motion.div className="mt-6" variants={item}>
          <MyReports />
        </motion.div>

        {/* Gamification Hub */}
        <motion.div
          className="mt-6 rounded-2xl border border-navy/15 bg-white/90 backdrop-blur p-5"
          variants={item}
        >
          <div className="font-semibold">Gamification Hub</div>
          <div className="text-sm text-navy/70">Badges, leaderboard, certificates & challenges</div>
          <div className="mt-4">
            <Gamification />
          </div>
        </motion.div>

        {/* Footer Impact */}
        <motion.div className="mt-6" variants={item}>
          <FooterImpact totals={totals} />
        </motion.div>
      </motion.div>

      {/* Report modal */}
      <ReportModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={() => {
          setOpen(false);
          load();
        }}
      />
    </div>
  );
}
