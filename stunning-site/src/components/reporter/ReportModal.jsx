import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../lib/api/index";

const CATS = [
  { label: "Plastic waste", icon: "🧴" },
  { label: "Oil spill", icon: "🛢️" },
  { label: "Illegal fishing", icon: "🎣" },
  { label: "Other", icon: "✨" },
];

export default function ReportModal({ open, onClose, onCreated }) {
  const [cat, setCat] = useState(CATS[0].label);
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [loc, setLoc] = useState({ lat: null, lng: null });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      );
    }
  }, [open]);

  // Simple “AI” detection preview (mock)
  const detected = useMemo(() => {
    const name = files?.[0]?.name?.toLowerCase() || "";
    if (name.includes("oil")) return "Detected: Oil spill near shore";
    if (name.includes("fish")) return "Detected: Fishing net / bycatch";
    if (name.includes("plastic")) return "Detected: Plastic waste on beach";
    return cat === "Oil spill" ? "Detected: Oil sheen on surface" :
           cat === "Illegal fishing" ? "Detected: Suspicious fishing activity" :
           "Detected: Litter / debris";
  }, [files, cat]);

  const suggest = () => {
    const t = new Date().toLocaleString();
    setDesc(d => d?.trim() ? d : `Observed ${cat.toLowerCase()} at approx ${loc.lat?.toFixed(4)}, ${loc.lng?.toFixed(4)} on ${t}. Visible impact on nearby habitat. Recommend immediate cleanup and monitoring.`);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const f = Array.from(e.dataTransfer.files || []).slice(0, 6);
    setFiles(f);
  };

  const submit = async () => {
    if (!cat || !desc.trim()) return alert("Please select a category and write a short description.");
    setBusy(true);
    try {
      const media = files.map(f => ({ url: URL.createObjectURL(f), type: f.type.startsWith("video") ? "video" : "image" }));
      const { report } = await api.createReport({
        type: cat,
        desc,
        location: { lat: loc.lat ?? 13.0827, lng: loc.lng ?? 80.2707 },
        media
      });
      onCreated?.(report);
      try { (await import("canvas-confetti")).default({ particleCount: 60, spread: 60, origin: { y: 0.8 } }); } catch {}
      onClose();
      // reset
      setFiles([]); setDesc(""); setCat(CATS[0].label);
    } catch (e) {
      console.error(e);
      alert("Could not create report (demo).");
    } finally { setBusy(false); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />

          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 200, damping: 24 }}
          >
            <div className="w-full max-w-[48rem] mx-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Report Incident</h3>
                <button className="text-navy/60 hover:text-navy" onClick={onClose}>✕</button>
              </div>

              {/* Categories */}
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CATS.map(c => (
                  <button key={c.label}
                    onClick={() => setCat(c.label)}
                    className={`rounded-xl border px-3 py-2 text-left ${cat===c.label ? "border-navy bg-navy/5" : "border-navy/20 bg-white"} `}
                  >
                    <div className="text-lg">{c.icon}</div>
                    <div className="text-sm font-medium">{c.label}</div>
                  </button>
                ))}
              </div>

              {/* Upload */}
              <div className="mt-4">
                <div
                  onDragOver={(e)=>e.preventDefault()}
                  onDrop={onDrop}
                  className="rounded-xl border border-dashed border-navy/25 p-4 text-center bg-navy/2"
                >
                  <div className="text-sm text-navy/70">Drag & drop photo/video here</div>
                  <div className="text-xs text-navy/50 mt-1">or</div>
                  <label className="inline-flex mt-2 cursor-pointer rounded-xl border border-navy/20 bg-white px-3 py-1 text-sm">
                    <input type="file" className="hidden" multiple accept="image/*,video/*"
                           onChange={(e)=>setFiles(Array.from(e.target.files||[]).slice(0,6))}/>
                    Choose files
                  </label>
                </div>
                {files.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {files.map((f,i)=>(
                      <div key={i} className="rounded-lg border border-navy/15 p-1 text-xs truncate">{f.name}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Smart description */}
              <div className="mt-4">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="mt-1 w-full min-h-[110px] rounded-xl border border-navy/20 px-3 py-2"
                  placeholder="What happened? Where? Any identifiers?"
                  value={desc}
                  onChange={(e)=>setDesc(e.target.value)}
                />
                <div className="mt-2 flex items-center gap-2">
                  <button className="rounded-lg border border-navy/20 px-3 py-1 text-sm" onClick={suggest}>✨ Suggest</button>
                  <span className="text-xs text-navy/60">{detected}</span>
                </div>
              </div>

              {/* Location */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-sm font-medium">Latitude</label>
                  <input className="mt-1 w-full rounded-xl border border-navy/20 px-3 py-2" value={loc.lat ?? ""} onChange={(e)=>setLoc(l=>({...l, lat: parseFloat(e.target.value)||""}))}/>
                </div>
                <div>
                  <label className="text-sm font-medium">Longitude</label>
                  <input className="mt-1 w-full rounded-xl border border-navy/20 px-3 py-2" value={loc.lng ?? ""} onChange={(e)=>setLoc(l=>({...l, lng: parseFloat(e.target.value)||""}))}/>
                </div>
                <div className="flex items-end">
                  <button className="w-full rounded-xl border border-navy/20 px-3 py-2" onClick={()=>{
                    if (!navigator.geolocation) return;
                    navigator.geolocation.getCurrentPosition(pos=> setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }));
                  }}>
                    📍 Use my location
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex items-center justify-end gap-2">
                <button className="rounded-xl px-4 py-2 border border-navy/20" onClick={onClose}>Cancel</button>
                <button disabled={busy} className="rounded-xl px-4 py-2 bg-navy text-white" onClick={submit}>
                  {busy ? "Submitting…" : "Submit"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
