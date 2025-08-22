// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({ user: null, setUser: () => {}, signOut: () => {} });

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load once from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("ecos_user");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  // Persist changes
  useEffect(() => {
    if (user) localStorage.setItem("ecos_user", JSON.stringify(user));
    else localStorage.removeItem("ecos_user");
  }, [user]);

  const signOut = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
