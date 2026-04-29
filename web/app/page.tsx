import Image from "next/image";
import { getMakes, searchVehicles } from "@/lib/api";
import HeroSearch from "@/components/search/HeroSearch";
import VehicleCard from "@/components/vehicle/VehicleCard";
import Link from "next/link";
import { ShieldCheck, RefreshCw, MessageCircle, Users } from "lucide-react";
import carPromo from "@/assets/car-promo.jpg";
import vanPromo from "@/assets/van-promo.jpg";
import bikePromo from "@/assets/bike-promo.jpg";
import motorhomePromo from "@/assets/motorhome-promo.webp";
import caravanPromo from "@/assets/caravan-promo.webp";
import heroImage from "@/assets/hero-image-2.jpg";

export default async function HomePage() {
  const [makes, result] = await Promise.all([
    getMakes(),
    searchVehicles({ sort: "recently_listed", per_page: "6" }),
  ]);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-10 lg:py-14">

            {/* Left — search */}
            <div>
              <p className="text-teal-500 text-xs font-bold uppercase tracking-widest mb-3">
                The UK&apos;s used vehicle marketplace
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-3">
                Search <span className="text-teal-500">45,000+</span><br />used vehicles
              </h1>
              <p className="text-gray-500 text-base mb-7 max-w-sm">
                Cars, vans, bikes, motorhomes and caravans from 2,800+ verified dealers across the UK.
              </p>

              <HeroSearch makes={makes} />

              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-sm text-gray-500">
                {[
                  { Icon: Users,         stat: "2,800+",  label: "dealers" },
                  { Icon: ShieldCheck,   stat: "45,000+", label: "live listings" },
                  { Icon: MessageCircle, stat: "Free",    label: "to enquire" },
                ].map(({ Icon, stat, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon size={14} className="text-teal-500" strokeWidth={2} />
                    <span><strong className="text-gray-800">{stat}</strong> {label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image showcase */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image
                  src={heroImage}
                  alt="Browse vehicles"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="50vw"
                />
              </div>
              {/* Floating stat badges */}
              <div className="absolute -bottom-3 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                  <ShieldCheck size={16} className="text-teal-500" strokeWidth={2} />
                </div>
                <div className="leading-tight">
                  <p className="text-xs text-gray-400">Verified dealers</p>
                  <p className="font-bold text-gray-900 text-sm">2,800+ nationwide</p>
                </div>
              </div>
              <div className="absolute -top-3 -right-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                  <RefreshCw size={16} className="text-teal-500" strokeWidth={2} />
                </div>
                <div className="leading-tight">
                  <p className="text-xs text-gray-400">Updated live</p>
                  <p className="font-bold text-gray-900 text-sm">45,000+ listings</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Categories ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold text-teal-500 mb-4">Categories</h2>
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
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100"
            >
              <Image
                src={cat.photo}
                alt={cat.label}
                fill
                className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-sm">{cat.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular searches */}
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            { label: "Electric",      href: "/search?fuel_type=electric" },
            { label: "Under £5,000",  href: "/search?max_price=5000" },
            { label: "Under £10,000", href: "/search?max_price=10000" },
            { label: "Under £20,000", href: "/search?max_price=20000" },
            { label: "Automatic",     href: "/search?transmission=automatic" },
            { label: "Low mileage",   href: "/search?max_mileage=30000" },
            { label: "Nearly new",    href: "/search?min_year=2022" },
            { label: "Diesel",        href: "/search?fuel_type=diesel" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-teal-500 hover:text-teal-500 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Just listed ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-teal-500">Just listed</h2>
          <Link href="/search" className="text-sm font-medium text-teal-500 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {result.vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* ── Dealer CTA ───────────────────────────────────────────────────── */}
      <section className="bg-teal-500 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Are you a dealer?</p>
            <h2 className="text-2xl font-extrabold text-white mb-1">Get your stock in front of buyers — automatically.</h2>
            <p className="text-white/70 text-sm">ClickDealer syncs your DMS directly to ClickMarket. No manual uploads.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="https://www.clickdealer.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-teal-600 hover:bg-teal-50 font-bold px-5 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
            >
              Get started with ClickDealer
            </a>
            <Link
              href="/dealer"
              className="inline-flex items-center border border-white/40 hover:border-white text-white/80 hover:text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
