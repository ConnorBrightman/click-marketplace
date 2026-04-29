"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchParams } from "@/lib/api";
import MoreFiltersModal, { MoreFilterValues, EMPTY_MORE } from "./MoreFiltersModal";

const MORE_KEYS: (keyof MoreFilterValues)[] = [
  "transmission", "body_type", "min_year", "max_year",
  "min_mileage", "max_mileage", "doors", "colour",
];

interface Props {
  total: number;
  currentParams: SearchParams & { sort?: string };
}

function paramsToMore(p: SearchParams): MoreFilterValues {
  const sp = p as Record<string, string>;
  return {
    transmission: sp.transmission || "",
    body_type:    sp.body_type    || "",
    min_year:     sp.min_year     || "",
    max_year:     sp.max_year     || "",
    min_mileage:  sp.min_mileage  || "",
    max_mileage:  sp.max_mileage  || "",
    doors:        sp.doors        || "",
    colour:       sp.colour       || "",
  };
}

export default function SortBar({ total, currentParams }: Props) {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [values, setValues] = useState<MoreFilterValues>(() => paramsToMore(currentParams));

  // Sync local state from URL whenever the modal is closed
  useEffect(() => {
    if (!showMore) setValues(paramsToMore(currentParams));
  }, [currentParams, showMore]);

  function handleSort(sort: string) {
    const params = new URLSearchParams(currentParams as Record<string, string>);
    params.set("sort", sort);
    params.delete("page");
    router.push(`/search?${params.toString()}`);
  }

  function applyMore() {
    const params = new URLSearchParams(currentParams as Record<string, string>);
    MORE_KEYS.forEach((key) => {
      if (values[key]) params.set(key, values[key]);
      else params.delete(key);
    });
    params.delete("page");
    router.push(`/search?${params.toString()}`);
    setShowMore(false);
  }

  function clearMore() {
    const params = new URLSearchParams(currentParams as Record<string, string>);
    MORE_KEYS.forEach((key) => params.delete(key));
    params.delete("page");
    router.push(`/search?${params.toString()}`);
    setShowMore(false);
  }

  const moreActiveCount = MORE_KEYS.filter(
    (k) => (currentParams as Record<string, string>)[k]
  ).length;

  return (
    <>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{total.toLocaleString()}</span> results
        </p>

        <div className="flex items-center gap-2">
          {/* More filters button */}
          <button
            type="button"
            onClick={() => setShowMore(true)}
            className={`flex items-center gap-1.5 text-sm font-medium border rounded-lg px-3 py-2 transition-colors ${
              moreActiveCount > 0
                ? "border-teal-300 text-teal-700 bg-teal-50"
                : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            More filters
            {moreActiveCount > 0 && (
              <span className="bg-teal-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {moreActiveCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <label className="text-sm text-gray-500 hidden sm:block">Sort:</label>
          <select
            value={currentParams.sort || ""}
            onChange={(e) => handleSort(e.target.value)}
            className="filter-select text-sm w-auto"
          >
            <option value="">Best match</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest first</option>
            <option value="mileage">Lowest mileage</option>
            <option value="recently_listed">Recently listed</option>
          </select>
        </div>
      </div>

      <MoreFiltersModal
        open={showMore}
        onClose={() => setShowMore(false)}
        vehicleType={currentParams.vehicle_type ?? "car"}
        values={values}
        onChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
        onApply={applyMore}
        onClear={clearMore}
      />
    </>
  );
}
