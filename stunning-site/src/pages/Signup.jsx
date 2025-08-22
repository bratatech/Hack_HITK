// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const PRESET_AVATARS = [
  "/images/avatars/aisha.jpg",
  "/images/avatars/liam.jpg",
  "/images/avatars/maya.jpg",
  "/images/avatars/default1.png",
  "/images/avatars/default2.png",
];

export default function Signup() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(PRESET_AVATARS[0]); // can be data URL after upload
  const [err, setErr] = useState("");

  // Optional: let users upload a custom avatar (we store as data URL)
  const onUploadAvatar = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErr("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result.toString());
    reader.readAsDataURL(file);
  };

  function onSubmit(e) {
    e.preventDefault();
    setErr("");

    const u = username.trim();
    const em = email.trim();

    if (!u) return setErr("Please enter a username.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return setErr("Please enter a valid email.");
    if (password.length < 6) return setErr("Password must be at least 6 characters.");

    // Save lightweight profile (front-end only demo — do NOT store passwords)
    const profile = { username: u, email: em, avatar };
    localStorage.setItem("ecos_user", JSON.stringify(profile));

    // pretend signup success -> go choose role
    nav("/select-role");
  }

  function onGoogle() {
    // Demo Google flow: set a sample user and move on
    const profile = { username: "OceanFriend", email: "you@example.com", avatar: PRESET_AVATARS[1] };
    localStorage.setItem("ecos_user", JSON.stringify(profile));
    nav("/select-role");
  }

  return (
    <div className="min-h-[100svh] bg-ivory text-navy flex items-center justify-center px-4">
      <div className="w-full max-w-[34rem] bg-white rounded-2xl border border-navy/15 p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-navy/70 mt-1 text-sm">
          Pick a username, email, password, and an avatar.
        </p>

        {err && (
          <div className="mt-3 rounded-lg bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">
            {err}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-xl border border-navy/20 px-3 py-2"
              placeholder="ex: ocean_ally"
              autoComplete="username"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-navy/20 px-3 py-2"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-navy/20 px-3 py-2"
              placeholder="Min 6 characters"
              autoComplete="new-password"
            />
            <p className="text-xs text-navy/60 mt-1">Min 6 characters.</p>
          </div>

          {/* Avatar picker */}
          <div>
            <label className="text-sm font-medium">Choose an avatar</label>
            <div className="mt-2 grid grid-cols-6 sm:grid-cols-8 gap-3">
              {PRESET_AVATARS.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setAvatar(src)}
                  className={`rounded-full p-[2px] ring-2 transition ${
                    avatar === src ? "ring-emerald-400" : "ring-transparent hover:ring-navy/20"
                  }`}
                  title="Select avatar"
                >
                  <img
                    src={src}
                    alt="Avatar option"
                    className="h-12 w-12 rounded-full object-cover bg-white shadow"
                  />
                </button>
              ))}

              {/* Upload tile */}
              <label className="cursor-pointer rounded-xl border border-dashed border-navy/20 grid place-items-center text-xs text-navy/70 hover:bg-navy/5">
                <span className="p-2 text-center">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onUploadAvatar(e.target.files?.[0])}
                />
              </label>

              {/* Current selection preview */}
              <div className="col-span-full flex items-center gap-3 mt-1">
                <span className="text-xs text-navy/60">Selected:</span>
                <img
                  src={avatar}
                  alt="Selected avatar"
                  className="h-10 w-10 rounded-full object-cover bg-white shadow ring-2 ring-emerald-300"
                />
                <span className="text-xs text-navy/60 truncate">{avatar.startsWith("data:") ? "Custom upload" : avatar}</span>
              </div>
            </div>
          </div>

          <button className="w-full rounded-xl bg-navy text-white font-semibold py-2.5">
            Create account
          </button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-navy/15" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-xs text-navy/60">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onGoogle}
            className="w-full rounded-xl border border-navy/20 py-2.5"
          >
            Continue with Google
          </button>
        </form>

        <p className="text-sm text-navy/70 mt-4">
          Already have an account?{" "}
          <Link className="underline" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
