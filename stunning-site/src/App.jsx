// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Explore from "./pages/Explore.jsx";
import Signup from "./pages/Signup.jsx";
import SelectRole from "./pages/SelectRole.jsx"; // Import the actual SelectRole component
import Reporter from "./pages/roles/Reporter.jsx";
import Volunteer from "./pages/roles/Volunteer.jsx";
import Educator from "./pages/roles/Educator.jsx"; // Import Educator component

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Explore />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/select-role" element={<SelectRole />} /> {/* Use SelectRole component here */}
      {/* Added routes for reporter, volunteer, and educator */}
      <Route path="/role/reporter" element={<Reporter />} />
      <Route path="/role/volunteer" element={<Volunteer />} />
      <Route path="/role/educator" element={<Educator />} />
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
