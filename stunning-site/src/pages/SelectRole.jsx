import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; 

const ROLES = [
  { key: "reporter", name: "Report a problem", desc: "Submit pollution/incidents.", emoji: "🛟" },
  { key: "volunteer", name: "Volunteer", desc: "Join cleanups & mapping.", emoji: "🤝" },
  { key: "educator", name: "Education / Research", desc: "Use datasets & lessons.", emoji: "🎓" },
];

export default function SelectRole() {
  const nav = useNavigate();
  const { user } = useAuth(); // Comes from AuthProvider

  async function pickRole(roleKey) {
    try {
      // Save role into backend (for latest user / max(id) logic handled in backend)
      await axios.post("http://localhost:5000/select-role", { role: roleKey });

      // Save temporarily in localStorage in case login is required
      localStorage.setItem("pendingRole", roleKey);

      // Always go to login page after picking role
      nav("/login");
    } catch (err) {
      console.error("❌ Failed to save role:", err);
      alert("Could not save your role. Please try again.");
    }
  }

  return (
    <div className="min-h-[100svh] bg-ivory text-navy flex items-center justify-center px-4">
      <div className="w-full max-w-[48rem]">
        <h1 className="text-3xl font-bold">How would you like to contribute?</h1>
        <p className="text-navy/70 mt-1">Pick a role. You can change it later.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ROLES.map((r) => (
            <button
              key={r.key}
              onClick={() => pickRole(r.key)}
              className="text-left rounded-2xl border border-navy/15 bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-transform transition-shadow duration-200"
              aria-label={`Select ${r.name} role`}
            >
              <div className="text-2xl">{r.emoji}</div>
              <div className="font-semibold mt-2">{r.name}</div>
              <div className="text-sm text-navy/70 mt-1">{r.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
