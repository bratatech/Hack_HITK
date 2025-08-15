export default function Report() {
  return (
    <div className="wrap">
      <div className="card" data-role="report">
        <h1 className="h1">Report an Incident</h1>
        <div className="row">
          <div className="field">
            <label className="lbl" htmlFor="type">Type</label>
            <select id="type" className="in">
              <option>Plastic waste</option>
              <option>Oil spill</option>
              <option>Illegal fishing</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field">
            <label className="lbl" htmlFor="desc">Description</label>
            <textarea id="desc" className="in" rows="4" placeholder="What happened? Where?"></textarea>
          </div>
          <div className="field">
            <label className="lbl" htmlFor="photo">Photo / Video</label>
            <input id="photo" className="in" type="file" accept="image/*,video/*" />
          </div>
          <button className="btn btn-pri btn-full">Submit (demo)</button>
        </div>
      </div>
    </div>
  );
}
