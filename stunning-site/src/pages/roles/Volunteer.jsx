import React from "react";

const EVENTS = [
  { t: "Beach Cleanup", when: "Sat • 7:00 AM", where: "4.2 km away" },
  { t: "Mangrove Plantation", when: "Sun • 8:00 AM", where: "8.5 km away" },
  { t: "Turtle Nest Watch", when: "Fri • 6:00 PM", where: "12.1 km away" },
  { t: "Harbor Debris Audit", when: "Wed • 5:30 PM", where: "6.7 km away" },
  { t: "Riverbank Sweep", when: "Thu • 7:30 AM", where: "9.3 km away" },
  { t: "Hotspot Mapping Walk", when: "Tue • 4:00 PM", where: "3.9 km away" },
];

export default function Volunteer() {
  return (
    <div className="min-h-[100svh] bg-ivory text-navy px-4 py-10">
      <div className="w-full max-w-[72rem] mx-auto">
        <div className="pill">🤝 Volunteer</div>
        <h1 className="title mt-3">Volunteer</h1>
        <p className="subtitle mt-1">Browse nearby cleanups and projects (demo UI).</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EVENTS.map((e) => (
            <div key={e.t} className="card">
              <div className="font-semibold">{e.t}</div>
              <div className="text-sm text-navy/70 mt-1">
                {e.when} • {e.where}
              </div>
              <button className="btn-primary mt-3">Join</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
