"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Dashboard {
  active_listings: number;
  total_views: number;
  unread_enquiries: number;
  total_enquiries: number;
}

export default function DealerDashboardPage() {
  const router = useRouter();
  const [dash, setDash] = useState<Dashboard | null>(null);
  const [dealerName, setDealerName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("dealer_token");
    if (!token) {
      router.replace("/dealer");
      return;
    }
    setDealerName(localStorage.getItem("dealer_name") || "");

    fetch("/api/v1/dealer/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (r.status === 401) { router.replace("/dealer"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setDash(data); })
      .finally(() => setLoading(false));
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("dealer_token");
    localStorage.removeItem("dealer_id");
    localStorage.removeItem("dealer_name");
    router.push("/dealer");
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">{dealerName}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-700 font-medium"
        >
          Sign out
        </button>
      </div>

      {dash && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: "Active listings", value: dash.active_listings, icon: "🚗" },
            { label: "Total views", value: dash.total_views.toLocaleString(), icon: "👁" },
            { label: "Unread enquiries", value: dash.unread_enquiries, icon: "📬", highlight: dash.unread_enquiries > 0 },
            { label: "Total enquiries", value: dash.total_enquiries, icon: "📩" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`bg-white rounded-xl border shadow-sm p-6 ${stat.highlight ? "border-teal-400" : "border-gray-100"}`}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Link
          href="/dealer/listings"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900">My Listings</h2>
            <span className="text-teal-400 group-hover:translate-x-1 transition-transform">→</span>
          </div>
          <p className="text-sm text-gray-500">View, edit and manage your vehicle listings.</p>
        </Link>

        <Link
          href="/dealer/enquiries"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900">Enquiries</h2>
            <span className="text-teal-400 group-hover:translate-x-1 transition-transform">→</span>
          </div>
          <p className="text-sm text-gray-500">View customer enquiries from potential buyers.</p>
        </Link>
      </div>
    </div>
  );
}
