import { getMakes, searchVehicles } from "@/lib/api";
import HeroSearch from "@/components/search/HeroSearch";
import VehicleCard from "@/components/vehicle/VehicleCard";
import Link from "next/link";

export default async function HomePage() {
  const [makes, featuredResult] = await Promise.all([
    getMakes(),
    searchVehicles({ sort: "recently_listed", per_page: "6" }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-500 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Find Your Next Car
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Search thousands of vehicles from trusted dealers across the UK.
              No hidden fees, no hassle.
            </p>
          </div>
          <HeroSearch makes={makes} />
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-teal-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-6 text-center text-navy-500">
            <div>
              <div className="text-2xl font-bold">{featuredResult.total}+</div>
              <div className="text-sm font-medium">Vehicles Listed</div>
            </div>
            <div>
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm font-medium">Trusted Dealers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">Free</div>
              <div className="text-sm font-medium">To Enquire</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick category links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by vehicle type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: "Cars", type: "car", icon: "🚗" },
            { label: "Vans", type: "van", icon: "🚐" },
            { label: "Bikes", type: "bike", icon: "🏍️" },
            { label: "Motorhomes", type: "motorhome", icon: "🚌" },
            { label: "Caravans", type: "caravan", icon: "🏕️" },
          ].map((cat) => (
            <Link
              key={cat.type}
              href={`/search?vehicle_type=${cat.type}`}
              className="flex flex-col items-center justify-center gap-2 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-400 transition-all"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="font-semibold text-gray-800 text-sm">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest listings</h2>
          <Link
            href="/search"
            className="text-teal-500 font-semibold text-sm hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResult.vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>
    </>
  );
}
