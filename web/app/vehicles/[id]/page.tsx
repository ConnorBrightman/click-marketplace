import { getVehicle, formatPrice, formatMileage } from "@/lib/api";
import Link from "next/link";
import EnquiryForm from "@/components/vehicle/EnquiryForm";
import ImageGallery from "@/components/vehicle/ImageGallery";
import FinanceCalculator from "@/components/vehicle/FinanceCalculator";
import SaveButton from "@/components/vehicle/SaveButton";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const vehicle = await getVehicle(params.id);
    return {
      title: `${vehicle.year} ${vehicle.make} ${vehicle.model} — ${formatPrice(vehicle.price_pence)}`,
      description: vehicle.description || `${vehicle.year} ${vehicle.make} ${vehicle.model} for sale. ${formatMileage(vehicle.mileage)}, ${vehicle.fuel_type}, ${vehicle.transmission}.`,
    };
  } catch {
    return { title: "Vehicle not found" };
  }
}

export default async function VehicleDetailPage({ params }: PageProps) {
  let vehicle;
  try {
    vehicle = await getVehicle(params.id);
  } catch {
    notFound();
  }

  const specs = [
    { label: "Year", value: vehicle.year },
    { label: "Mileage", value: formatMileage(vehicle.mileage) },
    { label: "Fuel type", value: vehicle.fuel_type },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Body type", value: vehicle.body_type },
    { label: "Colour", value: vehicle.colour },
    { label: "Doors", value: vehicle.doors },
    { label: "Engine size", value: vehicle.engine_size },
    { label: "Registration", value: vehicle.registration },
  ].filter((s) => s.value);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link href="/search" className="hover:text-gray-700">Search</Link>
        <span>/</span>
        <Link href={`/search?make=${vehicle.make}`} className="hover:text-gray-700">{vehicle.make}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{vehicle.model}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Gallery + details */}
        <div className="lg:col-span-2 space-y-6">
          <ImageGallery images={vehicle.images} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              {vehicle.variant && (
                <p className="text-gray-500 text-lg mb-3">{vehicle.variant}</p>
              )}
              <p className="text-3xl font-extrabold text-navy-500">
                {formatPrice(vehicle.price_pence)}
              </p>
            </div>
            <SaveButton vehicleId={vehicle.id} size="md" />
          </div>

          {/* Specs grid */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Vehicle details</h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {specs.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">{s.label}</dt>
                  <dd className="mt-1 font-semibold text-gray-900 capitalize">{String(s.value)}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Description */}
          {vehicle.description && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{vehicle.description}</p>
            </div>
          )}

          {/* Dealer info */}
          {vehicle.dealer && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4">Sold by</h2>
              <div className="flex items-start gap-4">
                {/* Logo / initial */}
                {vehicle.dealer.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={vehicle.dealer.logo_url}
                    alt={vehicle.dealer.name}
                    className="w-16 h-16 rounded-lg object-contain border border-gray-100 bg-white p-1 flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-navy-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-extrabold text-white">
                      {vehicle.dealer.name.charAt(0)}
                    </span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-bold text-gray-900 text-lg">{vehicle.dealer.name}</p>
                    <span className="inline-flex items-center gap-1 bg-dealer-50 text-dealer-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-dealer-200">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  </div>
                  {vehicle.dealer.address_line1 && (
                    <p className="text-gray-500 text-sm">
                      {vehicle.dealer.address_line1}, {vehicle.dealer.address_city}, {vehicle.dealer.address_postcode}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {vehicle.dealer.phone && (
                  <a
                    href={`tel:${vehicle.dealer.phone}`}
                    className="inline-flex items-center gap-2 bg-dealer-400 hover:bg-dealer-500 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {vehicle.dealer.phone}
                  </a>
                )}
                {vehicle.dealer.website_url && (
                  <a
                    href={vehicle.dealer.website_url}
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
                {vehicle.dealer.slug && (
                  <Link
                    href={`/dealers/${vehicle.dealer.slug}`}
                    className="inline-flex items-center gap-2 border border-gray-200 hover:border-teal-400 text-gray-700 hover:text-teal-600 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                  >
                    View all stock →
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <EnquiryForm vehicleId={vehicle.id} vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
            <FinanceCalculator pricePence={vehicle.price_pence} />
          </div>
        </div>
      </div>
    </div>
  );
}
