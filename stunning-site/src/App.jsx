import { Routes, Route } from "react-router-dom";
import { SceneTransitionProvider } from "./context/SceneTransitionContext";
import DiveOverlay from "./components/overlay/DiveOverlay";
import Hero from "./sections/Hero";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <SceneTransitionProvider>
      {/* Dive overlay lives above everything */}
      <DiveOverlay />

      <div className="min-h-screen bg-navy text-ivory">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </SceneTransitionProvider>
  );
}
