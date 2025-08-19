import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const nav = useNavigate();
  const [f, setF] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/login", // ✅ backend login API
        { withCredentials: true } // ✅ only needed if using cookies/session
      );

      console.log("Login success:", res.data);

      // OPTIONAL: If backend returns a JWT token, save it
      // localStorage.setItem("token", res.data.token);

      nav("/dashboard"); // ✅ redirect after successful login
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password."); // show user-friendly message
    }
  }

  function onGoogle() {
    // If you implement Google OAuth later
    window.location.href = "http://localhost:5000/auth/google";
  }

  return (
    <div className="min-h-[100svh] bg-navy text-white flex items-center justify-center px-4">
      <div className="w-full max-w-[28rem] rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-white/80 mt-1 text-sm">Use credentials or Google.</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          {/* ✅ Email field */}
          <div>
            <label className="text-sm font-medium text-white/90">Email</label>
            <input
              type="email"
              required
              value={f.email}
              onChange={(e) => setF({ ...f, email: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/25 bg-white text-navy px-3 py-2"
            />
          </div>

          {/* ✅ Password field */}
          <div>
            <label className="text-sm font-medium text-white/90">Password</label>
            <input
              type="password"
              required
              value={f.password}
              onChange={(e) => setF({ ...f, password: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/25 bg-white text-navy px-3 py-2"
            />
          </div>

          {/* ✅ Show error if login fails */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-300 text-navy font-semibold py-2.5"
          >
            Log in
          </button>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 text-xs text-white/70">or</span>
            </div>
          </div>

          {/* Google login button */}
          <button
            type="button"
            onClick={onGoogle}
            className="w-full rounded-xl border border-white/25 bg-white/10 text-white font-medium py-2.5"
          >
            Continue with Google
          </button>
        </form>

        <p className="text-sm text-white/80 mt-4">
          New here? <Link className="underline" to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
