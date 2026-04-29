"use client";

import { useState, useEffect } from "react";

export default function SaveButton({ vehicleId, size = "md" }: { vehicleId: string; size?: "sm" | "md" }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("savedVehicles") || "[]") as string[];
    setSaved(list.includes(vehicleId));
  }, [vehicleId]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const list = JSON.parse(localStorage.getItem("savedVehicles") || "[]") as string[];
    const next = list.includes(vehicleId)
      ? list.filter((id) => id !== vehicleId)
      : [...list, vehicleId];
    localStorage.setItem("savedVehicles", JSON.stringify(next));
    setSaved(next.includes(vehicleId));
  }

  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const btnSize = size === "sm" ? "p-1" : "p-1.5";

  return (
    <button
      onClick={toggle}
      className={`${btnSize} rounded-full transition-colors flex-shrink-0 ${
        saved
          ? "text-red-500 bg-red-50 hover:bg-red-100"
          : "text-gray-300 hover:text-red-400 hover:bg-gray-100"
      }`}
      aria-label={saved ? "Remove from saved" : "Save vehicle"}
    >
      <svg
        className={iconSize}
        fill={saved ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
