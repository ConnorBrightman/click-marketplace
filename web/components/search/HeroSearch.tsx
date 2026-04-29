"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MoreFiltersModal, { MoreFilterValues, EMPTY_MORE } from "./MoreFiltersModal";

interface Props {
  makes: string[];
}

const VEHICLE_TYPES = [
  { label: "Cars",       value: "car" },
  { label: "Vans",       value: "van" },
  { label: "Bikes",      value: "bike" },
  { label: "Motorhomes", value: "motorhome" },
  { label: "Caravans",   value: "caravan" },
];

const DISTANCES = [
  { label: "Any distance",     value: "" },
  { label: "Within 10 miles",  value: "10" },
  { label: "Within 20 miles",  value: "20" },
  { label: "Within 30 miles",  value: "30" },
  { label: "Within 50 miles",  value: "50" },
  { label: "Within 100 miles", value: "100" },
  { label: "Nationwide",       value: "nationwide" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 15 }, (_, i) => CURRENT_YEAR - i);

const PRICE_OPTS: Record<string, number[]> = {
  car:       [3000, 5000, 8000, 10000, 15000, 20000, 30000, 50000],
  van:       [3000, 5000, 10000, 20000, 30000, 50000, 75000],
  bike:      [500, 1000, 3000, 5000, 10000, 20000],
  motorhome: [10000, 20000, 30000, 50000, 75000, 100000],
  caravan:   [2000, 5000, 10000, 20000, 30000, 50000],
};

export default function HeroSearch({ makes }: Props) {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState("car");
  const [col1, setCol1] = useState("");   // make (cars) | min year (others)
  const [col2, setCol2] = useState("");   // fuel type (cars) | max year (others)
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [q, setQ] = useState("");
  const [postcode, setPostcode] = useState("");
  const [distance, setDistance] = useState("");
  const [moreFilters, setMoreFilters] = useState<MoreFilterValues>(EMPTY_MORE);
  const [showMore, setShowMore] = useState(false);

  function switchType(value: string) {
    setVehicleType(value);
    setCol1("");
    setCol2("");
    setMinPrice("");
    setMaxPrice("");
    setMoreFilters(EMPTY_MORE);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("vehicle_type", vehicleType);
    if (q)        params.set("q", q);
    if (minPrice) params.set("min_price", minPrice);
    if (maxPrice) params.set("max_price", maxPrice);
    if (postcode) params.set("postcode", postcode);
    if (postcode && distance) params.set("distance", distance);

    if (vehicleType === "car") {
      if (col1) params.set("make", col1);
      if (col2) params.set("fuel_type", col2);
      if (moreFilters.min_year) params.set("min_year", moreFilters.min_year);
      if (moreFilters.max_year) params.set("max_year", moreFilters.max_year);
    } else {
      if (col1) params.set("min_year", col1);
      if (col2) params.set("max_year", col2);
    }

    if (moreFilters.transmission) params.set("transmission", moreFilters.transmission);
    if (moreFilters.body_type)    params.set("body_type",    moreFilters.body_type);
    if (moreFilters.min_mileage)  params.set("min_mileage",  moreFilters.min_mileage);
    if (moreFilters.max_mileage)  params.set("max_mileage",  moreFilters.max_mileage);
    if (moreFilters.doors)        params.set("doors",        moreFilters.doors);
    if (moreFilters.colour)       params.set("colour",       moreFilters.colour);

    router.push(`/search?${params.toString()}`);
  }

  const isCar = vehicleType === "car";
  const prices = PRICE_OPTS[vehicleType] ?? PRICE_OPTS.car;

  const moreActiveCount = [
    moreFilters.transmission,
    moreFilters.body_type,
    isCar ? moreFilters.min_year : "",
    isCar ? moreFilters.max_year : "",
    moreFilters.min_mileage,
    moreFilters.max_mileage,
    moreFilters.doors,
    moreFilters.colour,
  ].filter(Boolean).length;

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full overflow-hidden"
    >
      {/* Vehicle type tabs */}
      <div className="flex border-b border-gray-100">
        {VEHICLE_TYPES.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => switchType(value)}
            className={`flex-1 py-3 px-1 text-sm font-semibold transition-colors border-b-2 ${
              vehicleType === value
                ? "border-teal-400 text-teal-600 bg-teal-50"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="p-5 space-y-3">
        {/* Keyword search */}
        <input
          type="text"
          placeholder={`Search ${VEHICLE_TYPES.find(t => t.value === vehicleType)?.label.toLowerCase() ?? "vehicles"} by make, model…`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-sm"
        />

        {/* Location row */}
        <div className="flex gap-2 bg-gray-50 rounded-xl p-3 border border-gray-200">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none font-medium min-w-0"
            />
          </div>
          <div className="w-px bg-gray-300 self-stretch" />
          <select
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="bg-transparent text-sm text-gray-700 focus:outline-none font-medium flex-shrink-0"
          >
            {DISTANCES.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* 4-column filter row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Col 1: Make (cars) | From year (others) */}
          {isCar ? (
            <select
              value={col1}
              onChange={(e) => setCol1(e.target.value)}
              className="filter-select text-gray-700"
            >
              <option value="">Any make</option>
              {makes.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          ) : (
            <select
              value={col1}
              onChange={(e) => setCol1(e.target.value)}
              className="filter-select text-gray-700"
            >
              <option value="">From year</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          )}

          {/* Col 2: Fuel (cars) | To year (others) */}
          {isCar ? (
            <select
              value={col2}
              onChange={(e) => setCol2(e.target.value)}
              className="filter-select text-gray-700"
            >
              <option value="">Any fuel</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
            </select>
          ) : (
            <select
              value={col2}
              onChange={(e) => setCol2(e.target.value)}
              className="filter-select text-gray-700"
            >
              <option value="">To year</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          )}

          {/* Col 3: Min price */}
          <select
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="filter-select text-gray-700"
          >
            <option value="">Min price</option>
            {prices.slice(0, -1).map((p) => (
              <option key={p} value={p}>£{p.toLocaleString()}</option>
            ))}
          </select>

          {/* Col 4: Max price */}
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="filter-select text-gray-700"
          >
            <option value="">Max price</option>
            {prices.slice(1).map((p) => (
              <option key={p} value={p}>£{p.toLocaleString()}</option>
            ))}
          </select>
        </div>

        {/* More options link */}
        <div>
          <button
            type="button"
            onClick={() => setShowMore(true)}
            className="flex items-center gap-1.5 text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            More options
            {moreActiveCount > 0 && (
              <span className="bg-teal-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {moreActiveCount}
              </span>
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold py-3 rounded-lg transition-all text-base"
        >
          Search {VEHICLE_TYPES.find(t => t.value === vehicleType)?.label}
        </button>
      </div>

      <MoreFiltersModal
        open={showMore}
        onClose={() => setShowMore(false)}
        vehicleType={vehicleType}
        values={moreFilters}
        onChange={(key, value) => setMoreFilters((prev) => ({ ...prev, [key]: value }))}
        onApply={() => setShowMore(false)}
        onClear={() => setMoreFilters(EMPTY_MORE)}
        applyLabel="Done"
      />
    </form>
  );
}
