import Hero from "./sections/Hero";

// Quick toggle if you want to bring the header back later:
// const SHOW_HEADER = true;

export default function App() {
  return (
    <div className="min-h-screen bg-navy text-ivory">
      {/* {SHOW_HEADER && <Header />} */}
      <Hero />
    </div>
  );
}
