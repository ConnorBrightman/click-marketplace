import Image from "next/image";
import { getMakes, searchVehicles } from "@/lib/api";
import HeroSearch from "@/components/search/HeroSearch";
import VehicleCard from "@/components/vehicle/VehicleCard";
import Link from "next/link";
import carPromo from "@/assets/car-promo.jpg";
import vanPromo from "@/assets/van-promo.jpg";
import bikePromo from "@/assets/bike-promo.jpg";
import motorhomePromo from "@/assets/motorhome-promo.webp";
import caravanPromo from "@/assets/caravan-promo.webp";

export default async function HomePage() {
  const [makes, featuredResult] = await Promise.all([
    getMakes(),
    searchVehicles({ sort: "recently_listed", per_page: "6" }),
  ]);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[600px] lg:min-h-[680px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85"
          alt="Luxury car on open road"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-4">
              Click Marketplace
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-none mb-5">
              Find your next<br />
              vehicle with<br />
              <span className="text-teal-500">confidence.</span>
            </h1>
            <p className="text-gray-500 text-lg mb-8 max-w-sm leading-relaxed">
              Thousands of used vehicles from trusted UK dealers, updated in real time.
            </p>

            <HeroSearch makes={makes} />

            <div className="flex items-center gap-8 mt-8">
              <div>
                <p className="text-2xl font-bold text-gray-900">{featuredResult.total}+</p>
                <p className="text-xs text-gray-400 mt-0.5">Vehicles listed</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-xs text-gray-400 mt-0.5">Trusted dealers</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-2xl font-bold text-gray-900">Free</p>
                <p className="text-xs text-gray-400 mt-0.5">To enquire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Browse by type ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">Browse by type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "Cars",       type: "car",       photo: carPromo },
            { label: "Vans",       type: "van",       photo: vanPromo },
            { label: "Bikes",      type: "bike",      photo: bikePromo },
            { label: "Motorhomes", type: "motorhome", photo: motorhomePromo },
            { label: "Caravans",   type: "caravan",   photo: caravanPromo },
          ].map((cat) => (
            <Link
              key={cat.type}
              href={`/search?vehicle_type=${cat.type}`}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden"
            >
              <Image
                src={cat.photo}
                alt={cat.label}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-lg leading-tight">{cat.label}</p>
                <p className="text-white/75 text-sm font-medium mt-0.5 group-hover:text-white/100 transition-colors">
                  Browse all →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Latest listings ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Latest listings</h2>
          <Link href="/search" className="text-teal-600 font-medium text-sm hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResult.vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* ── Dealer CTA ───────────────────────────────────────────────────── */}
      <section className="bg-navy-500 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-dealer-400 text-sm font-semibold uppercase tracking-widest mb-3">
                Are you a dealer?
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                Get your stock in front of thousands of buyers — automatically.
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                ClickDealer connects your dealership&apos;s DMS directly to ClickMarket.
                Every vehicle you add, update, or sell is reflected here in real time.
                No manual uploads. No stale listings.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.clickdealer.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-dealer-400 hover:bg-dealer-500 text-white font-bold px-6 py-3 rounded-lg transition-colors text-base"
                >
                  Get started with ClickDealer
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <Link
                  href="/dealer"
                  className="inline-flex items-center gap-2 border border-gray-500 hover:border-dealer-400 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors text-base"
                >
                  Dealer sign in
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
                  title: "Auto stock sync",
                  desc: "Your DMS inventory publishes to ClickMarket instantly — no manual work.",
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />,
                  title: "Your own website",
                  desc: "ClickDealer builds and hosts your dealership website, fully integrated.",
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                  title: "Leads to your inbox",
                  desc: "Buyer enquiries route directly to you — or straight into your CRM.",
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
                  title: "Dealer dashboard",
                  desc: "Track views, enquiries, and stock performance in one place.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="w-9 h-9 bg-dealer-400/20 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-dealer-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {icon}
                    </svg>
                  </div>
                  <h3 className="font-bold text-white mb-1">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
