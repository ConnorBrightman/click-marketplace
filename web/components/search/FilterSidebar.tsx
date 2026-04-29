"use client";

import { useRouter } from "next/navigation";
import { SearchParams } from "@/lib/api";

interface Props {
  makes: string[];
  currentParams: SearchParams;
}

function PillGroup({
  options,
  value,
  onSelect,
}: {
  options: { label: string; value: string }[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(active && opt.value !== "" ? "" : opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              active
                ? "bg-teal-50 text-teal-700 border-teal-300"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{label}</p>
      {children}
    </div>
  );
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
    <div className="bg-white rounded-xl px-5 pt-4 pb-2">
      <div className="flex items-center justify-between mb-1 py-2">
        <h2 className="font-semibold text-gray-900 text-sm">Filters</h2>
        {hasFilters && (
          <button onClick={clear} className="text-xs text-teal-600 hover:text-teal-700 font-medium">
            Clear all
          </button>
        )}
      </div>

      <Section label="Location">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Postcode"
            value={currentParams.postcode || ""}
            onChange={(e) => update("postcode", e.target.value.toUpperCase())}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          />
          <select
            value={(currentParams as Record<string, string>).distance || ""}
            onChange={(e) => update("distance", e.target.value)}
            className="filter-select"
          >
            <option value="">Any distance</option>
            <option value="10">Within 10 miles</option>
            <option value="20">Within 20 miles</option>
            <option value="30">Within 30 miles</option>
            <option value="50">Within 50 miles</option>
            <option value="100">Within 100 miles</option>
            <option value="nationwide">Nationwide</option>
          </select>
        </div>
      </Section>

      <Section label="Vehicle type">
        <PillGroup
          options={[
            { label: "All", value: "" },
            { label: "Cars", value: "car" },
            { label: "Vans", value: "van" },
            { label: "Bikes", value: "bike" },
            { label: "Motorhomes", value: "motorhome" },
            { label: "Caravans", value: "caravan" },
          ]}
          value={currentParams.vehicle_type ?? ""}
          onSelect={(v) => update("vehicle_type", v)}
        />
      </Section>

      <Section label="Make">
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
      </Section>

      <Section label="Body type">
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
      </Section>

      <Section label="Fuel type">
        <PillGroup
          options={[
            { label: "Any", value: "" },
            { label: "Petrol", value: "petrol" },
            { label: "Diesel", value: "diesel" },
            { label: "Hybrid", value: "hybrid" },
            { label: "Electric", value: "electric" },
          ]}
          value={(currentParams.fuel_type || "").toLowerCase()}
          onSelect={(v) => update("fuel_type", v)}
        />
      </Section>

      <Section label="Transmission">
        <PillGroup
          options={[
            { label: "Any", value: "" },
            { label: "Manual", value: "manual" },
            { label: "Automatic", value: "automatic" },
          ]}
          value={(currentParams.transmission || "").toLowerCase()}
          onSelect={(v) => update("transmission", v)}
        />
      </Section>

      <Section label="Price">
        <div className="flex gap-2">
          <select
            value={currentParams.min_price || ""}
            onChange={(e) => update("min_price", e.target.value)}
            className="filter-select"
          >
            <option value="">Min</option>
            {[3000, 5000, 8000, 10000, 15000, 20000, 30000, 40000].map((p) => (
              <option key={p} value={p}>£{p.toLocaleString()}</option>
            ))}
          </select>
          <select
            value={currentParams.max_price || ""}
            onChange={(e) => update("max_price", e.target.value)}
            className="filter-select"
          >
            <option value="">Max</option>
            {[5000, 8000, 10000, 15000, 20000, 30000, 50000, 75000].map((p) => (
              <option key={p} value={p}>£{p.toLocaleString()}</option>
            ))}
          </select>
        </div>
      </Section>

      <Section label="Year">
        <div className="flex gap-2">
          <select
            value={currentParams.min_year || ""}
            onChange={(e) => update("min_year", e.target.value)}
            className="filter-select"
          >
            <option value="">From</option>
            {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            value={currentParams.max_year || ""}
            onChange={(e) => update("max_year", e.target.value)}
            className="filter-select"
          >
            <option value="">To</option>
            {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </Section>

      <Section label="Mileage">
        <div className="flex gap-2">
          <select
            value={currentParams.min_mileage || ""}
            onChange={(e) => update("min_mileage", e.target.value)}
            className="filter-select"
          >
            <option value="">Min</option>
            {[10000, 20000, 30000, 50000, 75000].map((m) => (
              <option key={m} value={m}>{m.toLocaleString()}</option>
            ))}
          </select>
          <select
            value={currentParams.max_mileage || ""}
            onChange={(e) => update("max_mileage", e.target.value)}
            className="filter-select"
          >
            <option value="">Max</option>
            {[10000, 20000, 30000, 50000, 75000, 100000].map((m) => (
              <option key={m} value={m}>{m.toLocaleString()}</option>
            ))}
          </select>
        </div>
      </Section>

      <Section label="Doors">
        <PillGroup
          options={[
            { label: "Any", value: "" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
          ]}
          value={currentParams.doors?.toString() || ""}
          onSelect={(v) => update("doors", v)}
        />
      </Section>

      <Section label="Colour">
        <input
          type="text"
          placeholder="e.g. Red, Blue, Black"
          value={currentParams.colour || ""}
          onChange={(e) => update("colour", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
        />
      </Section>
    </div>
  );
}
