"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  makes: string[];
}

const VEHICLE_TYPES = [
  { label: "Cars", value: "car" },
  { label: "Vans", value: "van" },
  { label: "Bikes", value: "bike" },
  { label: "Motorhomes", value: "motorhome" },
  { label: "Caravans", value: "caravan" },
];

export default function HeroSearch({ makes }: Props) {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState("car");
  const [make, setMake] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [q, setQ] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("vehicle_type", vehicleType);
    if (q) params.set("q", q);
    if (make) params.set("make", make);
    if (minPrice) params.set("min_price", minPrice);
    if (maxPrice) params.set("max_price", maxPrice);
    if (fuelType) params.set("fuel_type", fuelType);
    router.push(`/search?${params.toString()}`);
  }

  const isCar = vehicleType === "car";

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl p-6 shadow-2xl max-w-3xl mx-auto"
    >
      {/* Vehicle type tabs */}
      <div className="flex gap-1 mb-5 bg-gray-100 rounded-xl p-1">
        {VEHICLE_TYPES.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => { setVehicleType(value); setMake(""); setFuelType(""); }}
            className={`flex-1 py-2 px-1 rounded-lg text-sm font-semibold transition-colors ${
              vehicleType === value
                ? "bg-navy-500 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder={`Search ${VEHICLE_TYPES.find(t => t.value === vehicleType)?.label.toLowerCase() ?? "vehicles"}...`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-base"
        />
      </div>

      {isCar && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="filter-select text-gray-700"
          >
            <option value="">Any make</option>
            {makes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="filter-select text-gray-700"
          >
            <option value="">Any fuel</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
          </select>

          <select
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="filter-select text-gray-700"
          >
            <option value="">Min price</option>
            <option value="5000">£5,000</option>
            <option value="10000">£10,000</option>
            <option value="15000">£15,000</option>
            <option value="20000">£20,000</option>
            <option value="30000">£30,000</option>
          </select>

          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="filter-select text-gray-700"
          >
            <option value="">Max price</option>
            <option value="10000">£10,000</option>
            <option value="15000">£15,000</option>
            <option value="20000">£20,000</option>
            <option value="30000">£30,000</option>
            <option value="50000">£50,000</option>
          </select>
        </div>
      )}

      {!isCar && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <select
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="filter-select text-gray-700"
          >
            <option value="">Min price</option>
            <option value="1000">£1,000</option>
            <option value="5000">£5,000</option>
            <option value="10000">£10,000</option>
            <option value="20000">£20,000</option>
            <option value="50000">£50,000</option>
          </select>

          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="filter-select text-gray-700"
          >
            <option value="">Max price</option>
            <option value="5000">£5,000</option>
            <option value="10000">£10,000</option>
            <option value="20000">£20,000</option>
            <option value="50000">£50,000</option>
            <option value="100000">£100,000</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-teal-400 hover:bg-teal-500 text-navy-500 font-bold py-3 rounded-lg transition-colors text-base"
      >
        Search {VEHICLE_TYPES.find(t => t.value === vehicleType)?.label}
      </button>
    </form>
  );
}
