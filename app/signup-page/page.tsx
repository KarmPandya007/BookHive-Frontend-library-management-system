"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_BASE_URL } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    id: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!form.name || !form.email || !form.phone || !form.address || !form.id || !form.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      // Update this URL if your backend signup endpoint is different
      const res = await fetch(`${API_BASE_URL}/readers/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: Number(form.phone),
          address: form.address,
          id: Number(form.id),
          password: form.password,
        }),
      });

      if (res.ok) {
        toast.success("Registration successful — redirecting to login...");
        setTimeout(() => router.push("/allbooks"), 1300);
      } else {
        const json = await res.json().catch(() => null);
        const message = json?.message || "Registration failed";
        toast.error(message);
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
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4 py-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-2xl font-semibold text-center text-teal-700 mb-4">Create an account</h2>
          <p className="text-center text-sm text-gray-500 mb-6">Register to access BookHive features</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500" placeholder="Jane Doe" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500" placeholder="you@example.com" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500" placeholder="9876543210" />
              </div>

              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">ID (numeric)</label>
                <input id="id" name="id" type="number" value={form.id} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500" placeholder="12345" />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea id="address" name="address" value={form.address} onChange={handleChange} required rows={2} className="w-full px-3 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500" placeholder="Street, City, State" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} className="w-full px-3 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500" placeholder="Create a strong password" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium disabled:opacity-60">
              {loading ? "Creating account..." : "Create account"}
            </button>

            <p className="text-center text-sm text-gray-500">Already registered? <a className="text-teal-600 font-medium" href="/login-page">Sign in</a></p>
          </form>
        </div>
      </div>
    </>
  );
}
