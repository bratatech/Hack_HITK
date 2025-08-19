

import React, { useState } from "react";

// Learning Notes Modal
function NotesModal({ open, onClose, module }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-2xl text-[#0D47A1] hover:text-[#FF8F00] font-bold focus:outline-none focus:ring-2 focus:ring-[#0D47A1] rounded-full transition-colors"
          aria-label="Close notes"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-[#0D47A1] mb-4">{module.title} - Learning Notes</h2>
        <div className="text-[#1B5E20] text-base leading-relaxed">
          {module.notes}
        </div>
      </div>
    </div>
  );
}

const MODULES = [
  {
    title: "Climate Basics",
    desc: "Understand the science of climate change and its global impact.",
    notes: (
      <>
        <b>What is Climate?</b><br/>
        Climate is the average weather in a place over many years. It includes patterns of temperature, precipitation, humidity, wind, and seasons.<br/><br/>
        <b>Greenhouse Effect:</b> Greenhouse gases like carbon dioxide trap heat in the atmosphere, keeping Earth warm enough for life. Human activities are increasing these gases, causing global warming.<br/><br/>
        <b>Key Takeaways:</b>
        <ul className="list-disc ml-6">
          <li>Earth’s climate is changing faster than ever before.</li>
          <li>Reducing emissions and protecting forests are vital for climate action.</li>
        </ul>
      </>
    )
  },
  {
    title: "Marine Conservation",
    desc: "Explore the importance of oceans and how to protect marine life.",
    notes: (
      <>
        <b>Why Oceans Matter:</b><br/>
        Oceans cover 70% of Earth’s surface and produce over half of the world’s oxygen. They regulate climate and support diverse life.<br/><br/>
        <b>Threats:</b> Plastic pollution, overfishing, and climate change are harming marine ecosystems.<br/><br/>
        <b>How to Help:</b>
        <ul className="list-disc ml-6">
          <li>Reduce single-use plastics.</li>
          <li>Support sustainable seafood.</li>
          <li>Participate in beach cleanups.</li>
        </ul>
      </>
    )
  },
  {
    title: "Biodiversity",
    desc: "Learn why biodiversity matters and how to preserve it.",
    notes: (
      <>
        <b>What is Biodiversity?</b><br/>
        Biodiversity is the variety of all living things on Earth—plants, animals, fungi, and microorganisms.<br/><br/>
        <b>Why It Matters:</b> Healthy ecosystems provide food, clean water, medicine, and climate stability.<br/><br/>
        <b>Protecting Biodiversity:</b>
        <ul className="list-disc ml-6">
          <li>Protect habitats and endangered species.</li>
          <li>Promote sustainable agriculture and forestry.</li>
          <li>Reduce pollution and invasive species.</li>
        </ul>
      </>
    )
  }
];


// Simple animated stat counter
function Stat({ end, label }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = end / (duration / 16);
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [end]);
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-4xl font-bold text-[#0D47A1]">{count.toLocaleString()}</span>
      <span className="text-md text-[#1B5E20] mt-1">{label}</span>
    </div>
  );
}

function Educator() {
  // State for search bar and suggestions
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = [
    "Climate Basics",
    "Marine Conservation",
    "Biodiversity",
    "SDG 13",
    "SDG 14",
    "SDG 15",
    "Deforestation",
    "Ocean Health Index",
    "Global Forest Watch"
  ];
  const filteredSuggestions = search.length > 0 ? suggestions.filter(s => s.toLowerCase().includes(search.toLowerCase())) : [];

  // Module notes modal state
  const [notesOpen, setNotesOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);

  const handleStartLesson = (idx) => {
    setActiveModule(idx);
    setNotesOpen(true);
  };
  // No quiz, so no points/badges update here

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    // Optionally, you can do something with the search value here (e.g., filter modules, show a message, etc.)
    // For now, just keep the search value as is.
  };

  return (
    <div className="min-h-screen font-serif relative overflow-x-hidden bg-sea-veil">
      {/* Profile Bar */}
      <div className="w-full flex items-center justify-end px-8 pt-6 pb-2">
        <div className="flex items-center gap-3 bg-white/80 rounded-full shadow px-4 py-2 border border-[#CAEBFF]">
          <img src="/public/avatar-eco.png" alt="Profile avatar" className="w-10 h-10 rounded-full border-2 border-[#0D47A1] bg-[#CAEBFF] object-cover" />
          <span className="text-[#0D47A1] font-semibold text-lg">Hello, Dr. Rivera</span>
        </div>
      </div>
      {/* Decorative background pattern */}
      <div aria-hidden className="pointer-events-none select-none absolute inset-0 z-0">
        <svg width="100%" height="100%" className="absolute left-0 top-0 opacity-10" style={{mixBlendMode:'multiply'}}>
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#90caf9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      {/* Hero Section: Book Metaphor */}
      <section className="flex flex-col items-center justify-center min-h-[70vh] relative">
        <div className="bg-white/95 shadow-2xl rounded-[2.5rem] border-2 border-[#B39DDB] border-b-8 border-b-[#0D47A1] px-10 py-14 text-center max-w-3xl mt-16 relative z-10 transition-all duration-300">
          <div className="flex justify-center mb-4">
            {/* Book Icon with glow */}
            <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#E1BEE7] to-[#0D47A1]/30 shadow-lg p-3">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <rect x="5" y="10" width="50" height="40" rx="8" fill="#E1BEE7" stroke="#1B5E20" strokeWidth="2"/>
                <rect x="10" y="15" width="40" height="30" rx="4" fill="#fff" stroke="#0D47A1" strokeWidth="1.5"/>
                <path d="M30 15v30" stroke="#0D47A1" strokeWidth="1.5"/>
              </svg>
            </span>
          </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#0D47A1] mb-6 tracking-tight">
                  Global Environmental Knowledge Center
                </h1>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                  <span className="bg-[#E1BEE7] text-[#1B5E20] px-4 py-2 rounded-full font-semibold shadow-md border border-[#B39DDB]">47,000+ educators worldwide</span>
                  <span className="bg-[#E1BEE7] text-[#1B5E20] px-4 py-2 rounded-full font-semibold shadow-md border border-[#B39DDB]">12 languages</span>
                  <span className="bg-[#E1BEE7] text-[#1B5E20] px-4 py-2 rounded-full font-semibold shadow-md border border-[#B39DDB]">156 research datasets</span>
                </div>
                {/* Search Bar */}
                <form className="flex items-center justify-center mt-4 relative" onSubmit={handleSearch} autoComplete="off">
                  <input
                    type="text"
                    className="w-full max-w-xs px-4 py-2 border border-[#0D47A1] rounded-l-lg focus:outline-none text-[#1B5E20] placeholder:text-[#0D47A1]"
                    placeholder="Search topics, SDGs, regions..."
                    value={search}
                    onChange={e => {
                      setSearch(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  <button type="submit" className="bg-[#0D47A1] text-white px-4 py-2 rounded-r-lg font-semibold">Search</button>
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <ul className="absolute left-0 top-full w-full max-w-xs bg-white border border-[#E1BEE7] rounded-b-lg shadow z-20">
                      {filteredSuggestions.map((s, i) => (
                        <li key={i} className="px-4 py-2 hover:bg-[#E1BEE7] cursor-pointer text-[#1B5E20]" onMouseDown={() => { setSearch(s); setShowSuggestions(false); }}>{s}</li>
                      ))}
                    </ul>
                  )}
                </form>
              </div>
              {/* Decorative: Book shadow */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-[340px] h-8 bg-[#0D47A1]/20 rounded-full blur-xl z-0" />
            </section>

            {/* Interactive Learning Modules Section (placeholder) */}
        <section className="max-w-6xl mx-auto mt-20 px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B5E20] mb-6 flex items-center">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mr-2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#0D47A1" strokeWidth="2"/><rect x="2" y="3" width="20" height="14" rx="4" fill="#E1BEE7" stroke="#1B5E20" strokeWidth="2"/></svg>
                Interactive Learning Modules
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {MODULES.map((mod, idx) => (
                  <div key={mod.title} className="bg-white/95 rounded-3xl shadow-xl p-8 flex flex-col items-center border border-[#E1BEE7] hover:border-[#0D47A1] transition-all duration-200 group">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#E1BEE7] to-[#fff] rounded-full flex items-center justify-center mb-4 border-2 border-[#B39DDB] group-hover:scale-105 transition-transform">
                      <span className="text-3xl">{idx === 0 ? "🌎" : idx === 1 ? "🌊" : "🌳"}</span>
                    </div>
                    <h3 className="font-bold text-[#0D47A1] text-lg mb-2 group-hover:text-[#1B5E20] transition-colors">{mod.title}</h3>
                    <span className="bg-[#FF8F00] text-white px-2 py-1 rounded-full text-xs mb-2 shadow">{idx === 0 ? "Beginner" : idx === 1 ? "Intermediate" : "Advanced"}</span>
                    <span className="text-sm text-[#1B5E20] mb-2">45 min reading + 15 min quiz</span>
                    <button className="bg-[#0D47A1] hover:bg-[#1B5E20] text-white px-4 py-2 rounded font-semibold mt-auto shadow transition-colors duration-150" onClick={() => handleStartLesson(idx)}>Start Lesson</button>
                  </div>
                ))}
              </div>
            </section>

            {/* Reward Points & Badges (placeholder) */}
            <section className="max-w-5xl mx-auto mt-16 px-4">
              <h2 className="text-2xl font-bold text-[#1B5E20] mb-4 flex items-center">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2"><circle cx="12" cy="12" r="10" fill="#FF8F00" stroke="#1B5E20" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2"/></svg>
                Academic Achievements
              </h2>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="bg-[#FF8F00] text-white px-4 py-2 rounded-full font-semibold shadow">{points} Points</span>
                {badges.length === 0 ? <span className="italic text-gray-500">No badges yet</span> : badges.map((b, i) => (
                  <span key={i} className="bg-[#E1BEE7] text-[#1B5E20] px-4 py-2 rounded-full font-semibold shadow">{b} Badge</span>
                ))}
              </div>
      {/* Learning Notes Modal */}
      <NotesModal
        open={notesOpen}
        onClose={() => setNotesOpen(false)}
        module={activeModule !== null ? MODULES[activeModule] : {title:'',notes:''}}
      />
            </section>

            {/* Analytics Panel (placeholder) */}
            <section className="max-w-5xl mx-auto mt-16 px-4">
              <h2 className="text-2xl font-bold text-[#1B5E20] mb-4 flex items-center">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2"><rect x="3" y="3" width="18" height="18" rx="4" fill="#E1BEE7" stroke="#0D47A1" strokeWidth="2"/><path d="M7 17V13M12 17V9M17 17V7" stroke="#1B5E20" strokeWidth="2"/></svg>
                Environmental Intelligence Dashboard
              </h2>
              <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
                {/* Graphs and filters will go here */}
                <div className="flex-1">
                  <div className="h-40 bg-gradient-to-r from-[#E1BEE7] to-[#0D47A1]/30 rounded-xl flex items-center justify-center text-[#0D47A1] font-bold text-lg">[Deforestation Graph]</div>
                  <div className="h-40 bg-gradient-to-r from-[#E1BEE7] to-[#1B5E20]/30 rounded-xl flex items-center justify-center text-[#1B5E20] font-bold text-lg mt-4">[Marine Waste Chart]</div>
                </div>
                <div className="flex-1">
                  <div className="h-40 bg-gradient-to-r from-[#E1BEE7] to-[#FF8F00]/30 rounded-xl flex items-center justify-center text-[#FF8F00] font-bold text-lg">[Biodiversity Trend]</div>
                  <div className="flex gap-2 mt-4">
                    <button className="bg-[#0D47A1] text-white px-3 py-1 rounded">Region</button>
                    <button className="bg-[#1B5E20] text-white px-3 py-1 rounded">Time</button>
                    <button className="bg-[#FF8F00] text-white px-3 py-1 rounded">Layer</button>
                  </div>
                </div>
              </div>
            </section>

            {/* SDG Scorecards (placeholder) */}
            <section className="max-w-5xl mx-auto mt-16 px-4">
              <h2 className="text-2xl font-bold text-[#1B5E20] mb-4 flex items-center">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2"><rect x="2" y="2" width="20" height="20" rx="5" fill="#E1BEE7" stroke="#0D47A1" strokeWidth="2"/></svg>
                SDG Scorecards
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center">
                  <span className="text-3xl mb-2">🌡️</span>
                  <h3 className="font-bold text-[#0D47A1] mb-2">Climate Action (13)</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div className="bg-[#FF8F00] h-4 rounded-full" style={{width:'70%'}}></div>
                  </div>
                  <span className="text-sm text-[#FF8F00]">Needs Attention</span>
                </div>
                <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center">
                  <span className="text-3xl mb-2">🌊</span>
                  <h3 className="font-bold text-[#0D47A1] mb-2">Life Below Water (14)</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div className="bg-[#1B5E20] h-4 rounded-full" style={{width:'85%'}}></div>
                  </div>
                  <span className="text-sm text-[#1B5E20]">On Track</span>
                </div>
                <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center">
                  <span className="text-3xl mb-2">🌳</span>
                  <h3 className="font-bold text-[#0D47A1] mb-2">Life on Land (15)</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div className="bg-red-500 h-4 rounded-full" style={{width:'40%'}}></div>
                  </div>
                  <span className="text-sm text-red-500">Critical Action Required</span>
                </div>
              </div>
            </section>

            {/* Download Reports (placeholder) */}
            <section className="max-w-5xl mx-auto mt-16 px-4">
              <h2 className="text-2xl font-bold text-[#1B5E20] mb-4 flex items-center">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2"><rect x="4" y="4" width="16" height="16" rx="4" fill="#E1BEE7" stroke="#0D47A1" strokeWidth="2"/></svg>
                Download Reports
              </h2>
              <div className="flex gap-6 items-center">
                <div className="bg-white/90 rounded-xl shadow p-6 flex flex-col items-center">
                  <span className="text-3xl mb-2">📄</span>
                  <span className="font-bold mb-2">Research Paper (PDF)</span>
                  <button className="bg-[#0D47A1] text-white px-4 py-2 rounded font-semibold">Download PDF</button>
                </div>
                <div className="bg-white/90 rounded-xl shadow p-6 flex flex-col items-center">
                  <span className="text-3xl mb-2">📊</span>
                  <span className="font-bold mb-2">Data Table (CSV)</span>
                  <button className="bg-[#1B5E20] text-white px-4 py-2 rounded font-semibold">Download CSV</button>
                </div>
              </div>
            </section>

            {/* Research Data Hub (placeholder) */}
            <section className="max-w-5xl mx-auto mt-16 px-4 mb-24">
              <h2 className="text-2xl font-bold text-[#1B5E20] mb-4 flex items-center">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2"><rect x="2" y="2" width="20" height="20" rx="5" fill="#E1BEE7" stroke="#0D47A1" strokeWidth="2"/></svg>
                Research Data Hub
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center">
                  <span className="text-3xl mb-2">🌐</span>
                  <span className="font-bold mb-2 text-[#0D47A1]">UNEP</span>
                  <span className="text-sm text-gray-600 mb-2">Official UN Environment Programme datasets</span>
                  <button className="bg-[#1B5E20] text-white px-4 py-2 rounded font-semibold">View Data</button>
                </div>
                <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center">
                  <span className="text-3xl mb-2">🛰️</span>
                  <span className="font-bold mb-2 text-[#0D47A1]">Global Forest Watch</span>
                  <span className="text-sm text-gray-600 mb-2">Satellite imagery & deforestation maps</span>
                  <button className="bg-[#0D47A1] text-white px-4 py-2 rounded font-semibold">View Data</button>
                </div>
                <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center">
                  <span className="text-3xl mb-2">🐠</span>
                  <span className="font-bold mb-2 text-[#0D47A1]">Ocean Health Index</span>
                  <span className="text-sm text-gray-600 mb-2">Marine health visualizations & coral reef data</span>
                  <button className="bg-[#FF8F00] text-white px-4 py-2 rounded font-semibold">View Data</button>
                </div>
              </div>
            </section>
          </div>
  );
}

export default Educator;


