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
                ? "text-teal-600 font-semibold bg-teal-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
            onClick={onClose}
          >
            {label}
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      {NAV_TYPES.map(({ label, type }) => (
        <Link
          key={type}
          href={`/search?vehicle_type=${type}`}
          className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-lg ${
            isActive(type)
              ? "text-teal-600 bg-teal-50"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          {label}
        </Link>
      ))}
    </>
  );
}

const HeartIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main row */}
        <div className="flex items-center justify-between h-16">
          <Logo />

          <nav className="hidden md:flex items-center gap-0.5">
            <Suspense fallback={
              <div className="flex items-center gap-0.5">
                {NAV_TYPES.map(({ label }) => (
                  <span key={label} className="px-3 py-1.5 text-gray-400 text-sm font-medium">{label}</span>
                ))}
              </div>
            }>
              <NavLinks />
            </Suspense>
          </nav>

          {/* Desktop right cluster */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/saved"
              className="p-2 flex gap-2 justify-center align-middle rounded-lg  hover:text-teal-600 hover:bg-teal-50 transition-colors"
              aria-label="Saved vehicles"
            >
              <HeartIcon />
              <span className="font-medium">Saved</span>
            </Link>
            <Link
              href="/dealer"
              className="border border-navy-500 text-navy-500 hover:bg-navy-500 hover:text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Sign in
            </Link>
           
          </div>

          {/* Mobile right cluster */}
          <div className="md:hidden flex items-center gap-1">
            <Link
              href="/saved"
              className="p-2 rounded-lg text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
              aria-label="Saved vehicles"
            >
              <HeartIcon />
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
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
        </div>

        {/* Mobile nav drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            <Suspense fallback={null}>
              <NavLinks mobile onClose={() => setMenuOpen(false)} />
            </Suspense>
          </div>
        )}

      </div>
    </header>
  );
}
