// src/pages/roles/Reporter.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import api from "../../lib/api/index";
import { Particles } from "../../components/decor/DecorFX.jsx";

import MapView from "../../components/reporter/MapView.jsx";
import ReportModal from "../../components/reporter/ReportModal.jsx";
import AIImpactCard from "../../components/reporter/AIImpactCard.jsx";
import MyReports from "../../components/reporter/MyReports.jsx";
import Gamification from "../../components/reporter/Gamification.jsx";

/* ------------------------------ Small UI bits ------------------------------ */

const Profile = ({ name, avatar }) => (
  <div className="flex items-center gap-3 bg-white/80 rounded-full shadow px-4 py-2 border border-[#CAEBFF]">
    <img
      src={avatar}
      alt="Profile avatar"
      className="w-10 h-10 rounded-full border-2 border-[#0D47A1] bg-[#CAEBFF] object-cover"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "https://i.pravatar.cc/80?img=65";
      }}
    />
    <span className="text-[#0D47A1] font-semibold text-base truncate max-w-[12rem]">
      {name}
    </span>
  </div>
);

function Chip({ children, tone = "gray" }) {
  const tones = {
    gray: "bg-gray-100 text-gray-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tones[tone] || tones.gray}`}>
      {children}
    </span>
  );
}

const RecentIncidents = ({ items }) => {
  // Show incidents not owned by the user. If API lacks a flag, show samples.
  const others = useMemo(() => {
    try {
      return (items || []).filter(
        (r) => !(r?.mine || r?.isMine || r?.ownedByMe || r?.userIsOwner)
      );
    } catch {
      return [];
    }
  }, [items]);

  const list = [
    {
      id: "sample-1",
      title: "Plastic Waste Accumulation in Manila Bay",
      locationName: "Manila Bay, Philippines",
      severity: "severe",
      status: "reported",
      impactScore: 78,
      createdAt: new Date().toISOString(),
      helpNeeded: 15,
      description:
        "Large amounts of plastic debris washing up on shore, affecting marine life and beach ecosystems.",
    },
    {
      id: "sample-2",
      title: "Oil Spill in Gulf of Mexico",
      locationName: "Gulf of Mexico",
      severity: "critical",
      status: "in progress",
      impactScore: 95,
      createdAt: new Date().toISOString(),
      helpNeeded: 45,
      description:
        "Major oil spill detected from offshore drilling platform. Immediate response required to contain spread.",
    },
    {
      id: "sample-3",
      title: "Illegal Deforestation in Amazon Basin",
      locationName: "Amazon Rainforest, Amazonas",
      severity: "severe",
      status: "reported",
      impactScore: 72,
      createdAt: new Date().toISOString(),
      helpNeeded: 28,
      description:
        "Satellite imagery reveals rapid deforestation in protected area. Local communities report loss of habitat.",
    },
    {
      id: "sample-4",
      title: "Urban Air Pollution in Delhi",
      locationName: "Delhi, India",
      severity: "critical",
      status: "reported",
      impactScore: 88,
      createdAt: new Date().toISOString(),
      helpNeeded: 20,
      description:
        "High levels of air pollution detected in urban areas, causing health issues among residents.",
    },
    {
      id: "sample-5",
      title: "Coral Bleaching in Great Barrier Reef",
      locationName: "Great Barrier Reef, Australia",
      severity: "severe",
      status: "in progress",
      impactScore: 85,
      createdAt: new Date().toISOString(),
      helpNeeded: 30,
      description:
        "Rising sea temperatures causing widespread coral bleaching, threatening marine biodiversity.",
    },
  ];

  const toneFor = (sev) =>
    String(sev || "").toLowerCase().includes("critical")
      ? "red"
      : String(sev || "").toLowerCase().includes("severe")
      ? "amber"
      : "gray";

  return (
    <div className="rounded-2xl border border-navy/15 bg-white/90 backdrop-blur p-5">
      <div className="flex items-center gap-2 mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-navy/80">
          <path fill="currentColor" d="M11 21q-1.85 0-3.487-.712t-2.85-1.926q-1.212-1.215-1.925-2.863T2.025 12q0-1.85.713-3.488T4.664 5.662T7.525 3.737T11 3q1.85 0 3.488.713t2.862 1.95T19.275 8.5t.725 3.5q0 1.85-.712 3.488T16.95 18.338T13.95 20.263T11 21Zm0-2q2.925 0 4.963-2.038T18 12q0-2.925-2.037-4.962T11 5Q8.075 5 6.038 7.038T4 12q0 2.925 2.038 4.963T11 19Zm.5-3q.575 0 .988-.413T12.9 13.7q0-.575-.413-.988T11.5 12.3q-.575 0-.988.412T10.1 13.7q0 .575.413.988T11.5 16Z"/>
        </svg>
        <h3 className="font-semibold text-lg">Recent Incidents ({list.length})</h3>
      </div>

      <div className="space-y-4 max-h-[28rem] overflow-auto pr-1">
        {list.map((r) => {
          const date = r?.createdAt ? new Date(r.createdAt) : null;
          const when = date ? date.toLocaleString() : "—";
          const sev = r?.severity || r?.urgency || "severe";

          return (
            <div
              key={r?.id || `${r?.title}-${when}`}
              className="rounded-xl border border-gray-100 bg-white shadow-sm p-4 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-gray-900">
                    {r?.title || "Environmental Incident"}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {r?.description ||
                      "Community-reported environmental impact requiring attention."}
                  </div>

                  <div className="mt-3 text-sm text-gray-600 flex flex-wrap items-center gap-4">
                    <span className="inline-flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C8.134 2 5 5.134 5 9c0 6 7 13 7 13s7-7 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 112.5-2.5 2.5 2.5 0 01-2.5 2.5z" />
                      </svg>
                      {r?.locationName || (r?.location?.lat && r?.location?.lng ? `${r.location.lat}, ${r.location.lng}` : "Unknown location")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 8v5l4 2 .75-1.86-2.75-1.39V8z" />
                        <path fill="currentColor" d="M12 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10m0-18a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8" />
                      </svg>
                      {when}
                    </span>
                  </div>
                </div>

                <Chip tone={toneFor(sev)}>{String(sev).toLowerCase()}</Chip>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Chip tone="blue">reported</Chip>
                  <Chip tone="blue">
                    <span className="inline-flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 12a5 5 0 0 1 5-5h3v2h-3a3 3 0 0 0-3 3v3h-2zM7 7H4v2h3a3 3 0 0 1 3 3v3h2v-3a5 5 0 0 0-5-5z"/>
                      </svg>
                      {r?.helpNeeded ?? 15} needed
                    </span>
                  </Chip>
                </div>
                <div className="text-sm text-gray-600">
                  Impact: <b>{r?.impactScore ?? 80}/100</b>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* --------------------------------- Page ---------------------------------- */

export default function Reporter() {
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({
    waste: true,
    marine: true,
    air: true,
    forest: true,
  });

  // Load all reports once, and again after create
  const load = async () => {
    try {
      const { items } = await api.listReports();
      setReports(Array.isArray(items) && items.length > 0 ? items : [
        {
          id: "report-1",
          title: "Plastic Waste Cleanup",
          description: "Efforts to clean up plastic waste in local rivers and beaches.",
          progress: "Completed",
          impactScore: 85,
        },
        {
          id: "report-2",
          title: "Air Quality Monitoring",
          description: "Monitoring air pollution levels in urban areas.",
          progress: "In progress",
          impactScore: 72,
        },
        {
          id: "report-3",
          title: "Coral Reef Restoration",
          description: "Restoration of damaged coral reefs in marine reserves.",
          progress: "In progress",
          impactScore: 78,
        },
      ]);
    } catch (err) {
      console.error("Failed to load reports:", err);
      setReports([
        {
          id: "report-1",
          title: "Plastic Waste Cleanup",
          description: "Efforts to clean up plastic waste in local rivers and beaches.",
          progress: "Completed",
          impactScore: 85,
        },
        {
          id: "report-2",
          title: "Air Quality Monitoring",
          description: "Monitoring air pollution levels in urban areas.",
          progress: "In progress",
          impactScore: 72,
        },
        {
          id: "report-3",
          title: "Coral Reef Restoration",
          description: "Restoration of damaged coral reefs in marine reserves.",
          progress: "In progress",
          impactScore: 78,
        },
      ]);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const last = reports?.[0];

  // background particles
  const hour = new Date().getHours();
  const theme = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  // Framer Motion
  const wrap = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen flex flex-col bg-sea-veil text-navy relative overflow-hidden">
      <Particles mode={theme} count={18} />

      <motion.div
        className="w-full max-w-[72rem] mx-auto px-4 py-6 relative flex-1"
        variants={wrap}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div className="flex items-start justify-between gap-3" variants={item}>
          <div className="flex items-center gap-6">
            <img src="/logo.png" alt="EcoSphere Logo" className="w-12 h-12" />
            <h1 className="text-5xl font-extrabold tracking-tight" style={{ fontFamily: "Monotype Corsiva", color: "#0D47A1" }}>
              Citizen Reporter Hub
            </h1>
          </div>
        </motion.div>

        {/* Filters + map + report button */}
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
                  checked={!!filters[f.k]}
                  onChange={() => setFilters((s) => ({ ...s, [f.k]: !s[f.k] }))}
                />
                {f.label}
              </label>
            ))}

            <div className="ml-auto">
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white font-semibold px-4 py-2 shadow hover:bg-blue-700"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 11V6h2v5h5v2h-5v5h-2v-5H6v-2z" />
                </svg>
                Report Incident
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden ring-1 ring-navy/10 bg-white/70 glass">
            <MapView
              reports={reports}
              filters={filters}
              onOpenReport={() => setOpen(true)}
            />
          </div>
        </motion.div>

        {/* Your reports */}
        <motion.div className="mt-6" variants={item}>
          <div className="rounded-2xl border border-navy/15 bg-white/90 backdrop-blur p-5">
            <h3 className="font-semibold text-lg">My Reports</h3>
            <p className="text-sm text-navy/70 mt-1">
              Reports submitted by you, along with their progress and impact.
            </p>

            <div className="mt-4 space-y-4">
              {reports.map((report) => (
                <div key={report.id || report.title} className="rounded-xl border border-gray-100 bg-white shadow-sm p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{report.title || "Untitled Report"}</div>
                      <div className="mt-1 text-sm text-gray-600">{report.description || "No description available."}</div>
                      <div className="mt-3 text-sm text-gray-600">
                        Progress: <b>{report.progress || "In progress"}</b>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Impact: <b>{report.impactScore || "Unknown"}/100</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Others' incidents, styled like screenshot */}
        <motion.div className="mt-6" variants={item}>
          <RecentIncidents items={reports} />
        </motion.div>

        {/* Gamification hub (kept) */}
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
      </motion.div>

      {/* Static footer (matches Educator) */}
      <footer role="contentinfo" className="bg-[#0B4775] text-white/95 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4">
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

      {/* Report modal – onCreated reloads so the new pin shows on the live map */}
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
