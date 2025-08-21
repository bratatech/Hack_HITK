// src/sections/Stories.jsx
import React, { useState } from "react";
import SectionHeading from "../components/typography/SectionHeading";

const STORIES = [
  {
    id: "st-001",
    name: "Aisha Sharma",
    role: "Community Volunteer – Mumbai",
    story:
      "We formed a 20-person circle to skim floating debris after the rains. By noon, we cleared 1.2 tons. It felt like the shoreline could breathe again.",
    accent: "#9FF5DE",
    avatar: "/images/avatars/aisha.jpg", // put this file in public/images/avatars/
  },
  {
    id: "st-002",
    name: "Liam Nguyen",
    role: "Field Researcher – GBR",
    story:
      "We trained local divers to log coral stress using a simple heat map app. That shared data enabled rapid cooling interventions in two lagoons.",
    accent: "#CAEBFF",
    avatar: "/images/avatars/liam.jpg",
  },
  {
    id: "st-003",
    name: "Maya D’Souza",
    role: "Net Recovery Lead – Bay of Bengal",
    story:
      "A fishing crew tipped us about a drifting ghost net. We hauled it at dawn—turtles free, damage minimized. Collaboration saved the day.",
    accent: "#FFE7E7",
    avatar: "/images/avatars/maya.jpg",
  },
];

function Avatar({ src, color, alt }) {
  const [failed, setFailed] = useState(false);

  // If we have an image and it hasn't failed, show it
  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-12 w-12 rounded-full object-cover ring-2 ring-white/80 shadow-md"
      />
    );
  }

  // Fallback: your original soft gradient circle
  return (
    <div
      className="h-12 w-12 rounded-full ring-2 ring-white/80 shadow-md border border-navy/10"
      style={{
        background: `radial-gradient(circle at 30% 30%, ${color}, #FDFAEC)`,
      }}
      aria-hidden="true"
    />
  );
}

export default function Stories() {
  return (
    <section className="relative py-16 md:py-20 bg-sea-veil">
      <SectionHeading
        eyebrow="Stories from the Field"
        title="People powering real change"
        desc="Snapshots from volunteers and researchers solving marine problems together."
      />

      <div className="mt-10 max-w-6xl mx-auto grid gap-6 px-4 md:grid-cols-3">
        {STORIES.map((s) => (
          <article
            key={s.id}
            className="rounded-2xl border border-navy/10 bg-white/85 shadow-[0_10px_40px_rgba(14,73,129,0.08)] p-5"
          >
            <div className="flex items-center gap-3">
              <Avatar src={s.avatar} color={s.accent} alt={s.name} />
              <div>
                <h3 className="font-bold text-navy">{s.name}</h3>
                <p className="text-xs text-navy/70">{s.role}</p>
              </div>
            </div>
            <p className="mt-4 text-navy/90 leading-relaxed">{s.story}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
