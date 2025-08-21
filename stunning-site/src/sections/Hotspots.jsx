// src/sections/Hotspots.jsx
import React, { useEffect, useState } from "react";

/* ---------------------- Modal ---------------------- */
function HotspotModal({ open, onClose, item }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        // close when clicking backdrop (but not when clicking inside the panel)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-[min(900px,96vw)] max-h-[80vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Top image */}
        {item.image ? (
          <div className="h-56 w-full overflow-hidden rounded-t-3xl">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy shadow hover:bg-white"
        >
          ×
        </button>

        {/* Body */}
        <div className="px-6 sm:px-8 py-6 text-navy">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
              {item.badge}
            </span>
            <span className="text-sm text-navy/60">{item.region}</span>
          </div>

          <h3 className="mt-3 text-2xl sm:text-3xl font-bold">{item.title}</h3>

          <div className="prose prose-slate max-w-none leading-relaxed mt-4">
            {item.rich}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- Section ---------------------- */
export default function Hotspots() {
  const [active, setActive] = useState(null);

  const items = [
    {
      id: "mumbai",
      image: "/public/images/hotspot-1.jpg",
      badge: "Plastic · High",
      region: "Arabian Sea",
      title: "Mumbai Coast — Plastic Surge",
      summary:
        "Post-monsoon runoff concentrating debris near shorelines; cleanup teams deployed.",
      rich: (
        <>
          <p>
            <strong>MUMBAI —</strong> Following the conclusion of the monsoon
            season, Mumbai&apos;s coast is once again facing a severe plastic
            surge, with massive amounts of debris washing ashore. The annual
            phenomenon, exacerbated by heavy rains and river runoff, has
            prompted the deployment of cleanup teams to address the accumulating
            waste.
          </p>

          <h4>The Monsoon&apos;s Aftermath</h4>
          <p>
            The post-monsoon plastic surge is a recurring environmental
            challenge for Mumbai, where storm drains and rivers like the Mithi
            carry vast quantities of city garbage, including plastic, into the
            Arabian Sea. As the tides recede after the heavy rains, the ocean
            “regurgitates” the plastic back onto the city&apos;s beaches and
            mangroves. A significant portion of this is single-use plastic,
            such as bags, wrappers, and bottles.
          </p>
          <p>The problem is compounded by a combination of factors:</p>
          <ul>
            <li>
              <strong>Urbanization and poor waste management:</strong> Rapid,
              unplanned urban development and insufficient waste collection
              systems mean a lot of litter ends up in waterways.
            </li>
            <li>
              <strong>Marine pollution:</strong> Studies have shown that the
              seas around Mumbai are among the most polluted in the world, with
              a high concentration of both macro and microplastics.
            </li>
            <li>
              <strong>Tidal and current action:</strong> The sea&apos;s natural
              currents and tidal patterns during the monsoon effectively funnel
              the dispersed plastic waste back toward the coast.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "gbr",
      image: "/public/images/hotspot-2.jpg",
      badge: "Bleaching · Moderate",
      region: "Coral Sea",
      title: "Great Barrier Reef — Coral Stress",
      summary:
        "Elevated temperatures linked to localized bleaching; monitoring live.",
      rich: (
        <>
          <p>
            <strong>Cairns, Australia —</strong> The Great Barrier Reef is
            grappling with a new wave of coral stress and localized bleaching,
            a clear indicator of the ongoing climate crisis impacting one of the
            world&apos;s most vital ecosystems. Scientists and conservationists
            are on high alert, with real-time monitoring underway to assess the
            damage and predict the reef&apos;s capacity for recovery.
          </p>
          <p>
            The current stress event is a direct consequence of elevated sea
            surface temperatures, a trend exacerbated by global warming.
            According to researchers, even a small increase in water temperature
            can trigger bleaching. This is the fifth major bleaching event to
            hit the Reef in less than a decade, giving corals less time to
            recover.
          </p>

          <strong>The Bleaching Process</strong>
          <p>
            Coral bleaching occurs when corals, under heat stress, expel the
            colorful algae (zooxanthellae) that live symbiotically within their
            tissues. These algae provide the coral with its color and most of
            its food. When they leave, the coral&apos;s white skeleton becomes
            visible. While a bleached coral isn&apos;t dead, it is weakened and
            highly susceptible to disease and starvation.
          </p>

          <strong>Monitoring and Response</strong>
          <p>
            A combination of aerial and in-water surveys is being used by AIMS
            and GBRMPA to track the extent and severity of bleaching. Satellite
            data (e.g., NOAA Coral Reef Watch) helps predict which areas are at
            highest risk.
          </p>
          <blockquote>
            “The frequency of these events is the real concern. The reef has
            shown an incredible ability to recover in the past, but with less
            time between bleaching events, its long-term resilience is being
            tested.”
          </blockquote>

          <strong>A Global Problem with Local Consequences</strong>
          <p>
            The Great Barrier Reef&apos;s plight is part of a global bleaching
            event affecting reefs across the Caribbean, Indian, and Pacific
            Oceans. While local actions (water quality, fishing pressure) help,
            the ultimate fate of the Reef hinges on rapid global reductions in
            greenhouse gas emissions.
          </p>
        </>
      ),
    },
    {
      id: "bengal",
      image: "/public/images/hotspot-3.jpg",
      badge: "Illegal · Critical",
      region: "Indian Ocean",
      title: "Bay of Bengal — Ghost Nets",
      summary:
        "Abandoned nets detected by patrols; entanglement risk for marine life.",
      rich: (
        <>
          <p>
            <strong>Bhubaneshwar, Odisha —</strong> Marine patrols in the Bay of
            Bengal have issued an urgent alert after discovering a significant
            increase in “ghost nets,” abandoned or lost fishing gear that poses
            a deadly threat to marine life. The silent menace is drifting
            through critical habitats, creating a lethal entanglement risk for
            countless species, including endangered sea turtles and dolphins.
          </p>
          <p>
            Ghost nets are a particularly insidious form of marine pollution.
            Made from durable plastics like nylon, these nets can float for
            centuries, continuing to “ghost fish” long after they are
            discarded.
          </p>

          <h4>A Growing Threat to Biodiversity</h4>
          <p>
            Patrols have reported an alarming number of nets entangled in reefs
            and drifting in open water, from the coast of Odisha to the
            Sunderbans. The nets ensnare a wide range of marine animals,
            including:
          </p>
          <ul>
            <li>
              <strong>Olive Ridley Sea Turtles:</strong> Ghost nets are a major
              cause of mortality, trapping turtles on migratory routes and
              preventing them from reaching the surface for air.
            </li>
            <li>
              <strong>Dolphins and Porpoises:</strong> Local species like the
              Indo-Pacific humpback dolphin frequently suffer fatal entanglement.
            </li>
            <li>
              <strong>Fish and Crustaceans:</strong> Nets decimate fish
              populations, impacting ecosystems and local livelihoods.
            </li>
          </ul>

          <strong>Urgent Call for Action</strong>
          <ul>
            <li>
              <strong>Retrieval Operations:</strong> Dive teams and specialized
              vessels are being deployed to locate and remove ghost nets.
            </li>
            <li>
              <strong>Awareness Campaigns:</strong> Educating fishing
              communities on responsible disposal and retrieval.
            </li>
            <li>
              <strong>Preventative Measures:</strong> Promote biodegradable gear
              and “net return” incentives for recycling.
            </li>
          </ul>
        </>
      ),
    },
  ];

  const openModal = (id) => {
    const it = items.find((x) => x.id === id);
    setActive(it || null);
  };

  const closeModal = () => setActive(null);

  return (
    <section className="bg-gradient-to-b from-teal-100/40 via-emerald-100/30 to-emerald-100/40 py-14 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section label */}
        <div className="flex justify-center">
          <span className="inline-flex rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-sm text-navy/80 shadow-sm">
            Current Hotspots
          </span>
        </div>

        <h2 className="mt-4 text-center text-3xl md:text-5xl font-black text-navy">
          Where help is needed right now
        </h2>
        <p className="mt-3 text-center text-navy/70 max-w-3xl mx-auto">
          Live problem snapshots we’re addressing with partners and community volunteers.
        </p>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((card) => (
            <article
              key={card.id}
              className="rounded-3xl bg-white shadow-[0_20px_60px_rgba(2,39,65,0.12)] ring-1 ring-navy/5 overflow-hidden"
            >
              {/* Image */}
              {card.image ? (
                <div className="h-64 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="inline-flex items-center rounded-full bg-navy/5 px-3 py-1 text-navy/70 ring-1 ring-navy/10">
                    {card.badge}
                  </span>
                  <span className="text-navy/50">{card.region}</span>
                </div>

                <h3 className="mt-3 text-xl font-bold text-navy">
                  {card.title}
                </h3>
                <p className="mt-2 text-navy/70">{card.summary}</p>

                <div className="mt-4">
                  <button
                    onClick={() => openModal(card.id)}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-2 font-medium text-navy hover:bg-emerald-200 transition"
                  >
                    View details
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      <HotspotModal open={!!active} onClose={closeModal} item={active} />
    </section>
  );
}
