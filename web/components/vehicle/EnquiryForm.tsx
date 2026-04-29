"use client";

import { useState } from "react";
import { submitEnquiry } from "@/lib/api";

interface Props {
  vehicleId: string;
  vehicleName: string;
}

export default function EnquiryForm({ vehicleId, vehicleName }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hi, I'm interested in the ${vehicleName}. Could you please provide more details?`,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitEnquiry({
        vehicle_id: vehicleId,
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        message: form.message || undefined,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-bold text-gray-900 mb-2">Enquiry sent!</h3>
        <p className="text-sm text-gray-500">
          The dealer will be in touch shortly at {form.email}.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h2 className="font-bold text-gray-900 mb-1">Enquire about this car</h2>
      <p className="text-sm text-gray-500 mb-5">Free — no obligation</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Your name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Email address *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Phone number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            placeholder="07700 900000"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Message</label>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
          />
        </div>

        {status === "error" && (
          <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-teal-400 hover:bg-teal-500 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
        >
          {status === "loading" ? "Sending..." : "Send Enquiry"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          By submitting you agree to be contacted by the dealer regarding this vehicle.
        </p>
      </form>
    </div>
  );
}
