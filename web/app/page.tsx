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

      {/* ── Browse by type ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wider mb-4">Browse by type</h2>
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
                <p className="text-white font-bold text-sm leading-tight">{cat.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Popular searches ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wider mb-4">Popular searches</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Electric",      href: "/search?fuel_type=electric" },
            { label: "Under £5,000",  href: "/search?max_price=5000" },
            { label: "Under £10,000", href: "/search?max_price=10000" },
            { label: "Under £20,000", href: "/search?max_price=20000" },
            { label: "Automatic",     href: "/search?transmission=automatic" },
            { label: "Low mileage",   href: "/search?max_mileage=30000" },
            { label: "Nearly new",    href: "/search?min_year=2022" },
            { label: "Diesel",        href: "/search?fuel_type=diesel" },
            { label: "Petrol",        href: "/search?fuel_type=petrol" },
            { label: "Hybrid",        href: "/search?fuel_type=hybrid" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-teal-500 hover:text-teal-600 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Latest listings ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">Latest listings</h2>
          <Link href="/search" className="text-sm font-medium text-teal-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {result.vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: ShieldCheck,  title: "Verified dealers only",  desc: "Every dealer is part of the ClickDealer network — vetted and accountable." },
              { Icon: Users,        title: "No private sellers",     desc: "Dealers only. Every listing comes with a named, contactable dealership." },
              { Icon: RefreshCw,    title: "Real-time stock",        desc: "Listings update the moment a dealer adds, changes or sells a vehicle." },
              { Icon: MessageCircle, title: "Free to enquire",       desc: "Contact any dealer directly — no fees, no account, no middleman." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <Icon size={20} className="text-teal-500 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dealer CTA ───────────────────────────────────────────────────── */}
      <section className="bg-navy-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Are you a dealer?</p>
            <h2 className="text-2xl font-extrabold text-white mb-1">Get your stock in front of buyers — automatically.</h2>
            <p className="text-gray-400 text-sm">ClickDealer syncs your DMS directly to ClickMarket. No manual uploads. No stale listings.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="https://www.clickdealer.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-dealer-400 hover:bg-dealer-500 text-white font-bold px-5 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
            >
              Get started
            </a>
            <Link
              href="/dealer"
              className="inline-flex items-center border border-gray-500 hover:border-white text-gray-300 hover:text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
            >
              Dealer sign in
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
