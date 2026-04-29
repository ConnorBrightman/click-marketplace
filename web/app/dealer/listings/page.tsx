"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Vehicle, formatPrice, formatMileage } from "@/lib/api";

export default function DealerListingsPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("dealer_token");
    if (!token) { router.replace("/dealer"); return; }

    fetch("/api/v1/dealer/vehicles", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (r.status === 401) { router.replace("/dealer"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setVehicles(data); })
      .finally(() => setLoading(false));
  }, [router]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this listing?")) return;
    const token = localStorage.getItem("dealer_token");
    await fetch(`/api/v1/dealer/vehicles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setVehicles((vs) => vs.filter((v) => v.id !== id));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/dealer/dashboard" className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">My Listings</h1>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading...</div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium">No listings yet</p>
          <p className="text-sm mt-1">Vehicles synced from the DMS will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Vehicle</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Price</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Mileage</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden lg:table-cell">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden lg:table-cell">Views</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-900">{v.year} {v.make} {v.model}</div>
                    {v.variant && <div className="text-gray-400 text-xs mt-0.5">{v.variant}</div>}
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell font-semibold text-navy-500">
                    {formatPrice(v.price_pence)}
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-gray-600">
                    {formatMileage(v.mileage)}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className={`badge ${
                      v.status === "active" ? "bg-green-100 text-green-700" :
                      v.status === "sold" ? "bg-gray-100 text-gray-600" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-gray-500">
                    {v.views_count}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 justify-end">
                      <Link
                        href={`/vehicles/${v.id}`}
                        className="text-gray-400 hover:text-gray-600 text-xs font-medium"
                        target="_blank"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="text-red-400 hover:text-red-600 text-xs font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
