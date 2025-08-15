export default function Volunteer() {
  return (
    <div className="wrap">
      <div className="card" data-role="volunteer">
        <h1 className="h1">Volunteer</h1>
        <div className="row">
          <p className="muted">Browse nearby cleanups and projects (demo UI).</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["Beach Cleanup", "Mangrove Plantation", "Turtle Nest Watch"].map((t,i)=>(
              <div key={i} className="tile text-left">
                <div className="font-medium mb-1">{t}</div>
                <div className="text-sm text-white/70">Sat • 7:00 AM • 4.2 km away</div>
                <button className="btn btn-pri mt-3">Join</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
