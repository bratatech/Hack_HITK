export default function Edu() {
  return (
    <div className="wrap">
      <div className="card" data-role="edu">
        <h1 className="h1">Education / Research</h1>
        <div className="row">
          <p className="muted">Datasets, case studies, and lesson plans (demo UI).</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["Marine Debris Dataset", "Coral Health Map", "SDG 14 Lesson Kit"].map((t,i)=>(
              <div key={i} className="tile text-left">
                <div className="font-medium mb-1">{t}</div>
                <div className="text-sm text-white/70">Preview • Download</div>
                <button className="btn btn-ghost mt-3">Open</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
