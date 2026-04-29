"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DealerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: "dealer" }),
      });
      if (!res.ok) {
        setError("No dealer account found for that email address.");
        return;
      }
      const data = await res.json();
      localStorage.setItem("dealer_token", data.token);
      localStorage.setItem("dealer_id", data.dealer.id);
      localStorage.setItem("dealer_name", data.dealer.name);
      router.push("/dealer/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-navy-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-teal-400 font-bold text-lg">CM</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Dealer Portal</h1>
          <p className="text-gray-500 mt-1 text-sm">Sign in to manage your listings</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="sales@yourdealership.co.uk"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-3">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-400 hover:bg-teal-500 disabled:opacity-50 text-navy-500 font-bold py-3 rounded-lg transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 font-medium mb-2">Demo accounts:</p>
            <div className="space-y-1 text-xs text-gray-600 font-mono">
              <p>sales@midlandsmotorco.co.uk</p>
              <p>info@northerncarsdirect.co.uk</p>
              <p>sales@capitalautogroup.co.uk</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
