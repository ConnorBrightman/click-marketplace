"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Logo from "@/components/ui/Logo";

const NAV_TYPES = [
  { label: "Cars", type: "car" },
  { label: "Vans", type: "van" },
  { label: "Bikes", type: "bike" },
  { label: "Motorhomes", type: "motorhome" },
  { label: "Caravans", type: "caravan" },
];

function NavLinks({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("vehicle_type");

  function isActive(type: string) {
    return pathname === "/search" && currentType === type;
  }

  if (mobile) {
    return (
      <>
        {NAV_TYPES.map(({ label, type }) => (
          <Link
            key={type}
            href={`/search?vehicle_type=${type}`}
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive(type)
                ? "bg-teal-400 text-navy-500 font-semibold"
                : "text-gray-300 hover:text-white hover:bg-navy-600"
            }`}
            onClick={onClose}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/dealer"
          className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-navy-600 transition-colors"
          onClick={onClose}
        >
          Dealer Portal
        </Link>
      </>
    );
  }

  return (
    <>
      {NAV_TYPES.map(({ label, type }) => (
        <Link
          key={type}
          href={`/search?vehicle_type=${type}`}
          className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
            isActive(type)
              ? "bg-teal-400 text-navy-500 font-semibold"
              : "text-gray-300 hover:text-white hover:bg-navy-600"
          }`}
        >
          {label}
        </Link>
      ))}
      <Link
        href="/dealer"
        className="ml-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-navy-600 rounded-lg transition-colors text-sm font-medium"
      >
        Dealer Portal
      </Link>
    </>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-navy-500 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <nav className="hidden md:flex items-center gap-1">
            <Suspense fallback={
              <div className="flex items-center gap-1">
                {NAV_TYPES.map(({ label }) => (
                  <span key={label} className="px-3 py-2 text-gray-300 text-sm font-medium">{label}</span>
                ))}
              </div>
            }>
              <NavLinks />
            </Suspense>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dealer"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/search?vehicle_type=car"
              className="bg-teal-400 hover:bg-teal-500 text-navy-500 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Find a Vehicle
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-navy-600 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-navy-600 py-3 space-y-1">
            <Suspense fallback={null}>
              <NavLinks mobile onClose={() => setMenuOpen(false)} />
            </Suspense>
          </div>
        )}
      </div>
    </header>
  );
}
