// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { SceneTransitionProvider } from "./context/SceneTransitionContext";
import DiveOverlay from "./components/overlay/DiveOverlay";

import Hero from "./sections/Hero";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Assistant from "./pages/Assistant"; // 4) Route target for /assistant

export default function App() {
  return (
    <SceneTransitionProvider>
      {/* Dive animation overlay used when leaving the hero */}
      <DiveOverlay />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 4) This enables navigation like /assistant?q=... from the chip */}
        <Route path="/assistant" element={<Assistant />} />
      </Routes>
    </SceneTransitionProvider>
  );
}
