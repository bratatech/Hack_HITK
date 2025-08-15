import React, { useState } from "react";

export default function Reporter() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    type: "Plastic waste",
    desc: "",
    files: []
  });

  function onSubmit(e) {
    e.preventDefault();
    // Frontend-only: stash the last report so Login flow can work without a backend
    const payload = {
      ...form,
      files: form.files?.length ? Array.from(form.files).map((f) => f.name) : [],
      ts: new Date().toISOString(),
    };
    try {
      localStorage.setItem("ecos_last_report", JSON.stringify(payload));
    } catch {}
    setSent(true);
  }

  return (
    <div className="min-h-[100svh] bg-ivory text-navy flex items-center justify-center px-4">
      <div className="w-full max-w-[40rem] card">
        <div className="pill">🛟 Reporter</div>
        <h1 className="title mt-3">Report an Incident</h1>
        <p className="subtitle mt-1">
          Upload evidence and describe what happened. (Demo only—no backend yet.)
        </p>

        {!sent ? (
          <form onSubmit={onSubmit} className="form mt-6">
            <div className="field">
              <label htmlFor="type" className="label">Type</label>
              <select
                id="type"
                className="select"
                value={form.type}
                onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
              >
                <option>Plastic waste</option>
                <option>Oil spill</option>
                <option>Illegal fishing</option>
                <option>Other</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="desc" className="label">Description</label>
              <textarea
                id="desc"
                required
                className="textarea"
                placeholder="What happened? Where? Any identifiers?"
                value={form.desc}
                onChange={(e) => setForm((s) => ({ ...s, desc: e.target.value }))}
              />
              <p className="hint">Don’t include personal info.</p>
            </div>

            <div className="field">
              <label htmlFor="files" className="label">Photos / Video</label>
              <input
                id="files"
                type="file"
                multiple
                accept="image/*,video/*"
                className="input bg-white"
                onChange={(e) => setForm((s) => ({ ...s, files: e.target.files }))}
              />
              <p className="hint">Up to a few files; larger uploads can be added later.</p>
            </div>

            <button className="btn-primary btn-lg w-full">Submit (demo)</button>
          </form>
        ) : (
          <div className="mt-6">
            <div className="rounded-xl border border-emerald-300/50 bg-emerald-50 px-4 py-3 text-emerald-900">
              ✅ Thanks! Your demo report was saved locally.
            </div>
            <div className="grid-2 mt-4">
              <a className="btn-ghost" href="/explore">← Back to Explore</a>
              <button className="btn-primary" onClick={() => setSent(false)}>
                Report another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
