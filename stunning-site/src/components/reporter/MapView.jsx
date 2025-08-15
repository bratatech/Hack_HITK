// src/components/reporter/MapView.jsx
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap, useMapEvents } from "react-leaflet";
import { motion } from "framer-motion";

const severityColor = (s = 50) => (s >= 80 ? "#ef4444" : s >= 60 ? "#f59e0b" : "#22c55e");

function Locator({ setCenter }) {
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {}
    );
  }, [setCenter]);
  useMapEvents({});
  return null;
}

function IntroFly({ center }) {
  const map = useMap();
  useEffect(() => {
    try {
      map.setZoom(3);
      const t = setTimeout(() => {
        map.flyTo(center, 12, { duration: 2 });
      }, 350);
      return () => clearTimeout(t);
    } catch {}
  }, [map, center]);
  return null;
}

/* Make sure tiles lay out correctly after being placed in a 50% column */
function ResizeFix() {
  const map = useMap();
  useEffect(() => {
    const fix = () => map.invalidateSize();
    fix();
    window.addEventListener("resize", fix);
    return () => window.removeEventListener("resize", fix);
  }, [map]);
  return null;
}

/* Listen for `window.dispatchEvent(new CustomEvent("focus-incident",{detail:item}))` and fly to it */
function FocusIncidentBridge() {
  const map = useMap();
  useEffect(() => {
    const handler = (e) => {
      const it = e.detail;
      const lat = it?.coords?.[0] ?? it?.location?.lat;
      const lng = it?.coords?.[1] ?? it?.location?.lng;
      if (typeof lat === "number" && typeof lng === "number") {
        map.flyTo([lat, lng], 15, { duration: 1.6 });
      }
    };
    window.addEventListener("focus-incident", handler);
    return () => window.removeEventListener("focus-incident", handler);
  }, [map]);
  return null;
}

export default function MapView({ reports = [], filters, onOpenReport, height = "60vh" }) {
  const [center, setCenter] = useState({ lat: 13.0827, lng: 80.2707 }); // Chennai default

  const visible = useMemo(() => {
    return reports.filter((r) => {
      const t = r.type?.toLowerCase() || "";
      const isWaste = t.includes("plastic") || t.includes("oil") || t.includes("waste");
      const isMarine = t.includes("fishing") || t.includes("turtle") || t.includes("coral");
      const isAir = t.includes("smoke") || t.includes("air");
      const isForest = t.includes("mangrove") || t.includes("deforest");
      return (
        (filters.waste && isWaste) ||
        (filters.marine && isMarine) ||
        (filters.air && isAir) ||
        (filters.forest && isForest) ||
        (!isWaste && !isMarine && !isAir && !isForest)
      );
    });
  }, [reports, filters]);

  return (
    <div className="map-sky border border-navy/15 relative" style={{ overflow: "visible" }}>
      <MapContainer center={[center.lat, center.lng]} zoom={3} style={{ height, width: "100%" }}>
        <Locator setCenter={setCenter} />
        <IntroFly center={center} />
        <ResizeFix />
        <FocusIncidentBridge />
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {visible.map((r) => (
          <CircleMarker
            key={r.id}
            center={[r.location?.lat || center.lat, r.location?.lng || center.lng]}
            radius={10}
            pathOptions={{ color: severityColor(r.severity), fillOpacity: 0.6 }}
          />
        ))}
      </MapContainer>

      <motion.button
        onClick={onOpenReport}
        className="btn-fab absolute z-[1000] bottom-5 right-5 md:bottom-4 md:right-4 rounded-full px-5 py-3 font-semibold shadow-xl text-white pointer-events-auto"
        style={{ background: "#10b981" }}
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 12px 28px rgba(16,185,129,.25)",
            "0 12px 28px rgba(16,185,129,.45)",
            "0 12px 28px rgba(16,185,129,.25)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      >
        + Report Incident
      </motion.button>
    </div>
  );
}
