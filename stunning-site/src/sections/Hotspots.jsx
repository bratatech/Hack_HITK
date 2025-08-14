// src/sections/Hotspots.jsx
import SectionHeading from "../components/typography/SectionHeading";

const HOTSPOTS = [
  {
    id: "hs-001",
    title: "Mumbai Coast – Plastic Surge",
    region: "Arabian Sea",
    type: "Plastic",
    severity: "High",
    color: "#FFE7E7",
    desc: "Post-monsoon runoff concentrating debris near shorelines; cleanup teams deployed.",
    img: "/images/hotspot-1.jpg",
  },
  {
    id: "hs-002",
    title: "Great Barrier Reef – Coral Stress",
    region: "Coral Sea",
    type: "Bleaching",
    severity: "Moderate",
    color: "#CAEBFF",
    desc: "Elevated temperatures linked to localized bleaching; monitoring live.",
    img: "/images/hotspot-2.jpg",
  },
  {
    id: "hs-003",
    title: "Bay of Bengal – Ghost Nets",
    region: "Indian Ocean",
    type: "Illegal",
    severity: "Critical",
    color: "#9FF5DE",
    desc: "Abandoned nets detected by patrols; entanglement risk for marine life.",
    img: "/images/hotspot-3.jpg",
  },
];

function PlaceholderImage({ className }) {
  return (
    <div
      className={`w-full h-40 rounded-xl ${className}`}
      style={{
        background:
          "linear-gradient(135deg, #CAEBFF 0%, #9FF5DE 48%, #FDFAEC 100%)",
      }}
      aria-hidden="true"
    />
  );
}

export default function Hotspots() {
  return (
    <section className="relative py-16 md:py-20 bg-sea-veil">
      <SectionHeading
        eyebrow="Current Hotspots"
        title="Where help is needed right now"
        desc="Live problem snapshots we’re addressing with partners and community volunteers."
      />

      <div className="mt-10 max-w-6xl mx-auto grid gap-6 px-4 md:grid-cols-3">
        {HOTSPOTS.map((h) => (
          <article
            key={h.id}
            className="rounded-2xl border border-navy/10 bg-white/80 shadow-[0_10px_40px_rgba(14,73,129,0.10)] overflow-hidden"
          >
            {/* Image (or gradient placeholder) */}
            {h.img ? (
              <img
                src={h.img}
                alt={h.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "block";
                }}
              />
            ) : null}
            <PlaceholderImage className="hidden" />

            <div className="p-4">
              <div className="flex items-center justify-between">
                <span
                  className="text-xs px-2 py-1 rounded-full border"
                  style={{
                    backgroundColor: h.color + "B3",
                    borderColor: "#0E498133",
                    color: "#0E4981",
                  }}
                >
                  {h.type} · {h.severity}
                </span>
                <span className="text-xs text-navy/70">{h.region}</span>
              </div>

              <h3 className="mt-3 text-lg font-bold text-navy">{h.title}</h3>
              <p className="mt-2 text-sm text-navy/80">{h.desc}</p>

              <div className="mt-4">
                <button
                  className="inline-flex items-center gap-2 text-sm font-semibold
                             text-navy bg-primary/50 hover:bg-primary rounded-lg px-3 py-2 transition"
                >
                  View details
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.293 4.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 1 1-1.414-1.414L17.586 12l-4.293-4.293a1 1 0 0 1 0-1.414Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
