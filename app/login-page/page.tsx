"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ id: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Adjust the endpoint if your auth route is different
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Login successful — redirecting...");
        // short delay so user can see toast
        setTimeout(() => router.push("/allbooks"), 1200);
      } else {
        const json = await res.json().catch(() => null);
        const msg = json?.message || "Invalid credentials";
        toast.error(msg);
      }
    } catch (err) {
      toast.error("Unable to contact server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-2xl font-semibold text-center text-teal-700 mb-4">Sign in to BookHive</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                ID
              </label>
              <input
                id="id"
                name="id"
                value={form.id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
                placeholder="Enter your ID"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 px-2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" />
                </svg>
              ) : null}
              <span>{loading ? "Signing in..." : "Sign In"}</span>
            </button>

            <p className="text-center text-sm text-gray-500">Don’t have an account? Contact your admin.</p>
          </form>
        </div>
      </div>
    </>
  );
}
