// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { SceneTransitionProvider } from "./context/SceneTransitionContext";
import DiveOverlay from "./components/overlay/DiveOverlay";

import Hero from "./sections/Hero";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Assistant from "./pages/Assistant";

/* NEW: role flow */
import SelectRole from "./pages/SelectRole.jsx";
import Reporter from "./pages/roles/Reporter.jsx";
import Volunteer from "./pages/roles/Volunteer.jsx";
import Educator from "./pages/roles/Educator.jsx";

export default function App() {
  return (
    <SceneTransitionProvider>
      <DiveOverlay />

      <Routes>
        {/* existing */}
        <Route path="/" element={<Hero />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/assistant" element={<Assistant />} />

        {/* NEW: signup → select role; login → role (or select role) */}
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/role/reporter" element={<Reporter />} />
        <Route path="/role/volunteer" element={<Volunteer />} />
        <Route path="/role/educator" element={<Educator />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SceneTransitionProvider>
  );
}
