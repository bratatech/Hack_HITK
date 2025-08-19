import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const nav = useNavigate();
  const [f, setF] = useState({ email: "", password: "", name: "" });

  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError(""); // reset error

    try {
      // Send signup request to backend
      const res = await axios.post("http://localhost:5000/signup", {
        email: f.email,
        password: f.password,
        name: f.name,
      }, { withCredentials: true });

      if (res.status === 201) {
        // success → move to role selection
        nav("/select-role");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data || "Something went wrong");
    }
  }

  function onGoogle() {
    nav("/select-role"); // (later you can add OAuth)
  }

  return (
    <div className="min-h-[100svh] bg-ivory text-navy flex items-center justify-center px-4">
      <div className="w-full max-w-[28rem] bg-white rounded-2xl border border-navy/15 p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-navy/70 mt-1 text-sm">Email & password or continue with Google.</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={f.email}
              onChange={(e) => setF({ ...f, email: e.target.value })}
              className="mt-1 w-full rounded-xl border border-navy/20 px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              required
              value={f.name}
              onChange={(e) => setF({ ...f, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-navy/20 px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              minLength={6}
              required
              value={f.password}
              onChange={(e) => setF({ ...f, password: e.target.value })}
              className="mt-1 w-full rounded-xl border border-navy/20 px-3 py-2"
            />
            <p className="text-xs text-navy/60 mt-1">Min 6 characters.</p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full rounded-xl bg-navy text-white font-semibold py-2.5">
            Sign up
          </button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-navy/15" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-2 text-xs text-navy/60">or</span></div>
          </div>

          <button type="button" onClick={onGoogle} className="w-full rounded-xl border border-navy/20 py-2.5">
            Continue with Google
          </button>
        </form>

        <p className="text-sm text-navy/70 mt-4">
          Already have an account? <Link className="underline" to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
