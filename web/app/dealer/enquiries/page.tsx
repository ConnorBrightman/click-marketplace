"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  is_read: boolean;
  created_at: string;
  vehicle_id: string;
}

export default function DealerEnquiriesPage() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("dealer_token");
    if (!token) { router.replace("/dealer"); return; }

    fetch("/api/v1/dealer/enquiries", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (r.status === 401) { router.replace("/dealer"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setEnquiries(data); })
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link href="/dealer/dashboard" className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">Enquiries</h1>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading...</div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium">No enquiries yet</p>
          <p className="text-sm mt-1">Customer enquiries will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {enquiries.map((e) => (
            <div
              key={e.id}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${
                !e.is_read ? "border-teal-400" : "border-gray-100"
              }`}
            >
              <button
                onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {!e.is_read && (
                    <span className="flex-shrink-0 w-2 h-2 bg-teal-400 rounded-full" />
                  )}
                  <div className="min-w-0">
                    <p className={`font-semibold text-gray-900 truncate ${!e.is_read ? "" : "font-medium"}`}>
                      {e.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(e.created_at).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm flex-shrink-0">{expanded === e.id ? "▲" : "▼"}</span>
              </button>

              {expanded === e.id && (
                <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Email</p>
                      <a href={`mailto:${e.email}`} className="text-teal-500 hover:underline mt-1 block">{e.email}</a>
                    </div>
                    {e.phone && (
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Phone</p>
                        <a href={`tel:${e.phone}`} className="text-teal-500 hover:underline mt-1 block">{e.phone}</a>
                      </div>
                    )}
                  </div>
                  {e.message && (
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Message</p>
                      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line bg-gray-50 rounded-lg px-3 py-2">
                        {e.message}
                      </p>
                    </div>
                  )}
                  <div className="pt-1">
                    <Link
                      href={`/vehicles/${e.vehicle_id}`}
                      className="text-xs text-gray-400 hover:text-gray-600 font-medium"
                      target="_blank"
                    >
                      View vehicle →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
