import { getVehicle, formatPrice, formatMileage } from "@/lib/api";
import Link from "next/link";
import EnquiryForm from "@/components/vehicle/EnquiryForm";
import ImageGallery from "@/components/vehicle/ImageGallery";
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
              <h2 className="font-bold text-gray-900 mb-3">Sold by</h2>
              <p className="font-semibold text-gray-900">{vehicle.dealer.name}</p>
              {vehicle.dealer.address_line1 && (
                <p className="text-gray-500 text-sm mt-1">
                  {vehicle.dealer.address_line1}, {vehicle.dealer.address_city}, {vehicle.dealer.address_postcode}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 mt-3">
                {vehicle.dealer.phone && (
                  <a
                    href={`tel:${vehicle.dealer.phone}`}
                    className="inline-flex items-center gap-2 text-teal-500 font-semibold hover:underline text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {vehicle.dealer.phone}
                  </a>
                )}
                {(vehicle.dealer.website_url ?? "https://www.clickdealer.co.uk") && (
                  <a
                    href={vehicle.dealer.website_url ?? "https://www.clickdealer.co.uk"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal-500 font-semibold hover:underline text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit dealer website
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Enquiry form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <EnquiryForm vehicleId={vehicle.id} vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
