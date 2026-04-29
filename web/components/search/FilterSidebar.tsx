"use client";

import { useRouter } from "next/navigation";
import { SearchParams } from "@/lib/api";

interface Props {
  makes: string[];
  currentParams: SearchParams;
}

export default function FilterSidebar({ makes, currentParams }: Props) {
  const router = useRouter();

  function update(key: string, value: string) {
    const params = new URLSearchParams(currentParams as Record<string, string>);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/search?${params.toString()}`);
  }

  function clear() {
    router.push("/search");
  }

  const hasFilters = Object.values(currentParams).some((v) => v && v !== "1");

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900">Filters</h2>
        {hasFilters && (
          <button onClick={clear} className="text-xs text-teal-500 hover:underline font-medium">
            Clear all
          </button>
        )}
      </div>

      <FilterGroup label="Vehicle type">
        <div className="space-y-2">
          {[
            { label: "Any", value: "" },
            { label: "Cars", value: "car" },
            { label: "Vans", value: "van" },
            { label: "Bikes", value: "bike" },
            { label: "Motorhomes", value: "motorhome" },
            { label: "Caravans", value: "caravan" },
          ].map(({ label, value }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="vehicle_type"
                value={value}
                checked={(currentParams.vehicle_type ?? "") === value}
                onChange={() => update("vehicle_type", value)}
                className="accent-teal-400"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Make">
        <select
          value={currentParams.make || ""}
          onChange={(e) => update("make", e.target.value)}
          className="filter-select"
        >
          <option value="">Any make</option>
          {makes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Body type">
        <select
          value={currentParams.body_type || ""}
          onChange={(e) => update("body_type", e.target.value)}
          className="filter-select"
        >
          <option value="">Any</option>
          {["Hatchback", "Saloon", "SUV", "Estate", "Coupe", "Convertible", "MPV"].map((t) => (
            <option key={t} value={t.toLowerCase()}>{t}</option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Fuel type">
        <div className="space-y-2">
          {["", "Petrol", "Diesel", "Hybrid", "Electric"].map((f) => (
            <label key={f} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="fuel_type"
                value={f}
                checked={(currentParams.fuel_type || "") === f.toLowerCase()}
                onChange={() => update("fuel_type", f.toLowerCase())}
                className="accent-teal-400"
              />
              <span className="text-sm text-gray-700">{f || "Any"}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Transmission">
        <div className="space-y-2">
          {["", "Manual", "Automatic"].map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="transmission"
                value={t}
                checked={(currentParams.transmission || "") === t.toLowerCase()}
                onChange={() => update("transmission", t.toLowerCase())}
                className="accent-teal-400"
              />
              <span className="text-sm text-gray-700">{t || "Any"}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Price range">
        <div className="flex gap-2">
          <select
            value={currentParams.min_price || ""}
            onChange={(e) => update("min_price", e.target.value)}
            className="filter-select"
          >
            <option value="">Min</option>
            {[5000, 10000, 15000, 20000, 30000, 40000].map((p) => (
              <option key={p} value={p}>£{p.toLocaleString()}</option>
            ))}
          </select>
          <select
            value={currentParams.max_price || ""}
            onChange={(e) => update("max_price", e.target.value)}
            className="filter-select"
          >
            <option value="">Max</option>
            {[10000, 15000, 20000, 30000, 40000, 60000, 80000].map((p) => (
              <option key={p} value={p}>£{p.toLocaleString()}</option>
            ))}
          </select>
        </div>
      </FilterGroup>

      <FilterGroup label="Year range">
        <div className="flex gap-2">
          <select
            value={currentParams.min_year || ""}
            onChange={(e) => update("min_year", e.target.value)}
            className="filter-select"
          >
            <option value="">From</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            value={currentParams.max_year || ""}
            onChange={(e) => update("max_year", e.target.value)}
            className="filter-select"
          >
            <option value="">To</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </FilterGroup>

      <FilterGroup label="Max mileage">
        <select
          value={currentParams.max_mileage || ""}
          onChange={(e) => update("max_mileage", e.target.value)}
          className="filter-select"
        >
          <option value="">Any mileage</option>
          {[10000, 20000, 30000, 50000, 75000, 100000].map((m) => (
            <option key={m} value={m}>{m.toLocaleString()} miles</option>
          ))}
        </select>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{label}</h3>
      {children}
    </div>
  );
}
