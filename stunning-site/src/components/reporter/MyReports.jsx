import React, { useEffect, useState } from "react";
import api from "../../lib/api/index";

const STATUS = ["open","assigned","in_progress","resolved"];

export default function MyReports() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    const { items } = await api.listReports();
    setItems(items);
  };
  useEffect(() => { load(); }, []);

  const changeStatus = async (id, status) => {
    await api.updateReport(id, { status });
    load();
  };

  const filtered = items.filter(x => filter==="all" ? true : x.status===filter);
  const totalImpact = items.reduce((a,b)=>a+(b.impactScore||0),0);

  return (
    <div className="rounded-2xl border border-navy/15 bg-white p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="font-semibold">My Reports</div>
          <div className="text-sm text-navy/70">Total Impact Score: {totalImpact}</div>
        </div>
        <div className="flex items-center gap-2">
          {["all",...STATUS].map(s=>(
            <button key={s} onClick={()=>setFilter(s)}
              className={`px-3 py-1 rounded-lg text-sm ${filter===s ? "bg-navy text-white" : "border border-navy/20 bg-white"}`}>
              {s.replace("_"," ")}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r=>(
          <article key={r.id} className="rounded-xl border border-navy/15 bg-white p-4">
            <div className="text-xs text-navy/60">{new Date(r.createdAt).toLocaleString()}</div>
            <div className="font-semibold mt-1">{r.type}</div>
            <div className="text-sm text-navy/70 line-clamp-3 mt-1">{r.desc}</div>
            <div className="mt-2 text-xs">Severity: <b>{r.severity}</b> • Impact: <b>{r.impactScore}</b></div>
            <div className="mt-3 flex items-center gap-2">
              <select className="rounded-lg border border-navy/20 px-2 py-1 text-sm" value={r.status}
                onChange={(e)=>changeStatus(r.id, e.target.value)}>
                {STATUS.map(s=><option key={s} value={s}>{s.replace("_"," ")}</option>)}
              </select>
              <a href="/role/reporter" className="text-sm underline text-navy/70">Details</a>
            </div>
          </article>
        ))}
        {filtered.length===0 && (
          <div className="text-navy/70 text-sm p-4">No reports yet.</div>
        )}
      </div>
    </div>
  );
}
