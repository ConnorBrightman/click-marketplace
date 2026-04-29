import { getMakes, searchVehicles, SearchParams } from "@/lib/api";
import VehicleCard from "@/components/vehicle/VehicleCard";
import FilterSidebar from "@/components/search/FilterSidebar";
import SortBar from "@/components/search/SortBar";
import Pagination from "@/components/search/Pagination";
import type { Metadata } from "next";

interface PageProps {
  searchParams: SearchParams & { page?: string; sort?: string };
}

const TYPE_LABELS: Record<string, string> = {
  car: "Cars",
  van: "Vans",
  bike: "Bikes",
  motorhome: "Motorhomes",
  caravan: "Caravans",
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const typeLabel = TYPE_LABELS[searchParams.vehicle_type ?? ""] ?? "Vehicles";
  const parts = [searchParams.make, searchParams.body_type, searchParams.fuel_type]
    .filter(Boolean)
    .join(" ");
  return {
    title: parts ? `${parts} ${typeLabel} for sale` : `Used ${typeLabel} for sale`,
    description: `Search used ${parts ? parts + " " : ""}${typeLabel.toLowerCase()} from trusted UK dealers.`,
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const [makes, result] = await Promise.all([
    getMakes(),
    searchVehicles(searchParams),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {result.total.toLocaleString()} used{" "}
          {TYPE_LABELS[searchParams.vehicle_type ?? ""] ?? "vehicles"} for sale
        </h1>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar makes={makes} currentParams={searchParams} />
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <SortBar total={result.total} currentParams={searchParams} />

          {result.vehicles.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-medium">No vehicles found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
              {result.vehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          )}

          {result.total_pages > 1 && (
            <Pagination
              currentPage={result.page}
              totalPages={result.total_pages}
              currentParams={searchParams}
            />
          )}
        </div>
      </div>
    </div>
  );
}
