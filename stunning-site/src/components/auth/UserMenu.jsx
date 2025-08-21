// src/components/auth/UserMenu.jsx
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/UserContext";

export default function UserMenu() {
  const { user, signOut } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-2.5 py-1.5 text-white hover:bg-white/15"
        title="Open user menu"
      >
        <img
          src={user.avatar || "/images/avatars/default1.png"}
          alt="Avatar"
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-sm font-medium">{user.username}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white text-navy shadow-lg ring-1 ring-navy/10 overflow-hidden">
          <div className="px-3 py-2 border-b border-navy/10">
            <p className="text-sm font-semibold">{user.username}</p>
            <p className="text-xs text-navy/60 truncate">{user.email}</p>
          </div>
          <a href="/profile" className="block px-3 py-2 text-sm hover:bg-navy/5">
            Profile (soon)
          </a>
          <button onClick={signOut} className="block w-full text-left px-3 py-2 text-sm hover:bg-navy/5">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
