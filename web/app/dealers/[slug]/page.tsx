import { getDealerBySlug, formatPrice, formatMileage } from "@/lib/api";
import VehicleListCard from "@/components/vehicle/VehicleListCard";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { dealer } = await getDealerBySlug(params.slug);
    return {
      title: `${dealer.name} — Used Vehicles`,
      description: `Browse used vehicles from ${dealer.name}${dealer.address_city ? `, ${dealer.address_city}` : ""}. ClickDealer verified dealer.`,
    };
  } catch {
    return { title: "Dealer not found" };
  }
}

export default async function DealerProfilePage({ params }: PageProps) {
  let profile;
  try {
    profile = await getDealerBySlug(params.slug);
  } catch {
    notFound();
  }

  const { dealer, vehicles, total } = profile;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link href="/search" className="hover:text-gray-700">Search</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{dealer.name}</span>
      </nav>

      {/* Dealer header */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Logo / initials */}
          <div className="flex-shrink-0">
            {dealer.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={dealer.logo_url}
                alt={dealer.name}
                className="w-24 h-24 rounded-xl object-contain border border-gray-100 bg-white p-2"
              />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-navy-500 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-extrabold text-white">
                  {dealer.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl font-extrabold text-gray-900">{dealer.name}</h1>
              <span className="inline-flex items-center gap-1.5 bg-dealer-50 text-dealer-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-dealer-200">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                ClickDealer Verified
              </span>
            </div>

            {dealer.address_line1 && (
              <p className="text-gray-500 text-sm flex items-center gap-1 mb-3">
                <svg className="w-4 h-4 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {dealer.address_line1}, {dealer.address_city}, {dealer.address_postcode}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {dealer.phone && (
                <a
                  href={`tel:${dealer.phone}`}
                  className="inline-flex items-center gap-2 bg-dealer-400 hover:bg-dealer-500 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {dealer.phone}
                </a>
              )}
              {dealer.website_url && (
                <a
                  href={dealer.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gray-200 hover:border-teal-400 text-gray-700 hover:text-teal-600 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit website
                </a>
              )}
            </div>
          </div>

          {/* Stock count */}
          <div className="text-center sm:text-right flex-shrink-0">
            <div className="text-3xl font-extrabold text-navy-500">{total}</div>
            <div className="text-sm text-gray-500">vehicles in stock</div>
          </div>
        </div>
      </div>

      {/* Vehicle listings */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {total} vehicle{total !== 1 ? "s" : ""} in stock
      </h2>

      {vehicles.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium">No vehicles currently listed</p>
        </div>
      ) : (
        <div className="space-y-4">
          {vehicles.map((v) => (
            <VehicleListCard key={v.id} vehicle={v} />
          ))}
        </div>
      )}
    </div>
  );
}
