// src/pages/Assistant.jsx
import React, { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Assistant() {
  const q = useQuery().get("q") || "";

  return (
    <main className="min-h-[100svh] bg-sea-veil text-navy">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/explore" className="text-navy underline underline-offset-2">← Back to Explore</Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold">Ecosphere AI Assistant</h1>
        <p className="mt-2 text-navy/80">
          (Prototype) We’ll wire this to your real AI next. Your prompt:
        </p>

        <div className="mt-6 glass rounded-2xl p-5 bg-white/70">
          <label className="block text-sm font-semibold mb-2 text-navy/80">Prompt</label>
          <textarea
            defaultValue={q}
            rows={4}
            className="w-full rounded-xl border border-navy/15 p-3 bg-white/90 outline-none"
          />
          <div className="mt-4">
            <button
              className="rounded-xl px-4 py-2 bg-primary text-navy font-semibold"
              onClick={() => alert("Hook this button to your AI API")}
            >
              Generate Answer
            </button>
          </div>
        </div>

        <div className="mt-10 text-sm text-navy/70">
          <p>
            Tip: This page was opened with{" "}
            <code className="px-1 py-0.5 bg-white/70 rounded">?q=…</code> from the
            floating AI chip.
          </p>
        </div>
      </div>
    </main>
  );
}
