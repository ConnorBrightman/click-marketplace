"use client";

import { useEffect } from "react";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 15 }, (_, i) => CURRENT_YEAR - i);
const BODY_TYPES = ["Hatchback", "Saloon", "SUV", "Estate", "Coupe", "Convertible", "MPV"];
const MILEAGE_OPTS = [10000, 20000, 30000, 50000, 75000, 100000];

export interface MoreFilterValues {
  transmission: string;
  body_type: string;
  min_year: string;
  max_year: string;
  min_mileage: string;
  max_mileage: string;
  doors: string;
  colour: string;
}

export const EMPTY_MORE: MoreFilterValues = {
  transmission: "",
  body_type: "",
  min_year: "",
  max_year: "",
  min_mileage: "",
  max_mileage: "",
  doors: "",
  colour: "",
};

interface Props {
  open: boolean;
  onClose: () => void;
  vehicleType: string;
  values: MoreFilterValues;
  onChange: (key: keyof MoreFilterValues, value: string) => void;
  onApply: () => void;
  onClear: () => void;
  applyLabel?: string;
}

function PillGroup({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(active && opt.value !== "" ? "" : opt.value)}
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

export default function MoreFiltersModal({
  open,
  onClose,
  vehicleType,
  values,
  onChange,
  onApply,
  onClear,
  applyLabel = "Apply filters",
}: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const isCar = vehicleType === "car";
  const hasValues = Object.values(values).some(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="font-semibold text-gray-900">More options</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          {/* Transmission */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
              Transmission
            </p>
            <PillGroup
              options={[
                { label: "Any", value: "" },
                { label: "Manual", value: "manual" },
                { label: "Automatic", value: "automatic" },
              ]}
              value={values.transmission}
              onChange={(v) => onChange("transmission", v)}
            />
          </div>

          {/* Body type */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
              Body type
            </p>
            <select
              value={values.body_type}
              onChange={(e) => onChange("body_type", e.target.value)}
              className="filter-select"
            >
              <option value="">Any</option>
              {BODY_TYPES.map((t) => (
                <option key={t} value={t.toLowerCase()}>{t}</option>
              ))}
            </select>
          </div>

          {/* Year — only for cars; non-cars already show year in main form */}
          {isCar && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                Year
              </p>
              <div className="flex gap-2">
                <select
                  value={values.min_year}
                  onChange={(e) => onChange("min_year", e.target.value)}
                  className="filter-select"
                >
                  <option value="">From year</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                <select
                  value={values.max_year}
                  onChange={(e) => onChange("max_year", e.target.value)}
                  className="filter-select"
                >
                  <option value="">To year</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Mileage */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
              Mileage
            </p>
            <div className="flex gap-2">
              <select
                value={values.min_mileage}
                onChange={(e) => onChange("min_mileage", e.target.value)}
                className="filter-select"
              >
                <option value="">Min miles</option>
                {MILEAGE_OPTS.slice(0, -1).map((m) => (
                  <option key={m} value={m}>{m.toLocaleString()}</option>
                ))}
              </select>
              <select
                value={values.max_mileage}
                onChange={(e) => onChange("max_mileage", e.target.value)}
                className="filter-select"
              >
                <option value="">Max miles</option>
                {MILEAGE_OPTS.map((m) => (
                  <option key={m} value={m}>{m.toLocaleString()}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Doors */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
              Doors
            </p>
            <PillGroup
              options={[
                { label: "Any", value: "" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
              ]}
              value={values.doors}
              onChange={(v) => onChange("doors", v)}
            />
          </div>

          {/* Colour */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
              Colour
            </p>
            <input
              type="text"
              placeholder="e.g. Red, Blue, Black"
              value={values.colour}
              onChange={(e) => onChange("colour", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 flex gap-3">
          {hasValues && (
            <button
              type="button"
              onClick={onClear}
              className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onApply}
            className="flex-1 bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold py-3 rounded-xl transition-all text-sm"
          >
            {applyLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
