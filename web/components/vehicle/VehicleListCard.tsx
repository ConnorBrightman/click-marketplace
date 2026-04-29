import Link from "next/link";
import Image from "next/image";
import { Vehicle, formatPrice, formatMileage } from "@/lib/api";
import SaveButton from "./SaveButton";

const TYPE_ICONS: Record<string, string> = {
  car: "🚗",
  van: "🚐",
  bike: "🏍️",
  motorhome: "🚌",
  caravan: "🏕️",
};

function estimateMonthly(pricePence: number): string {
  const price = pricePence / 100;
  const principal = price * 0.9;
  const rate = 0.099 / 12;
  const n = 48;
  const monthly = (principal * rate) / (1 - Math.pow(1 + rate, -n));
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(monthly);
}

export default function VehicleListCard({ vehicle }: { vehicle: Vehicle }) {
  const image = vehicle.images?.[0];
  const monthly = estimateMonthly(vehicle.price_pence);

  const specs = [
    vehicle.fuel_type,
    vehicle.transmission,
    vehicle.body_type
      ? vehicle.body_type.charAt(0).toUpperCase() + vehicle.body_type.slice(1)
      : null,
    vehicle.engine_size,
  ].filter(Boolean).join(" · ");

  const details = [
    formatMileage(vehicle.mileage),
    vehicle.doors ? `${vehicle.doors} doors` : null,
    vehicle.colour
      ? vehicle.colour.charAt(0).toUpperCase() + vehicle.colour.slice(1)
      : null,
  ].filter(Boolean).join(" · ");

  return (
    <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col">
      <div className="flex flex-col sm:flex-row flex-1">
      {/* Image */}
      <Link
        href={`/vehicles/${vehicle.id}`}
        className="relative sm:w-56 flex-shrink-0 aspect-[4/3] sm:aspect-auto bg-gray-100"
      >
        {image ? (
          <Image
            src={image.url}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 224px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl opacity-15">{TYPE_ICONS[vehicle.vehicle_type] ?? "🚗"}</span>
          </div>
        )}
        {vehicle.featured && (
          <span className="absolute top-2 left-2 bg-teal-500 text-white text-xs font-semibold px-2 py-0.5 rounded-md">
            Featured
          </span>
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-3">
            <Link href={`/vehicles/${vehicle.id}`} className="min-w-0">
              <p className="text-xs text-gray-400 mb-0.5">{vehicle.year} · {vehicle.make}</p>
              <h3 className="font-semibold text-gray-900 text-base leading-snug">
                {vehicle.model}{vehicle.variant ? ` ${vehicle.variant}` : ""}
              </h3>
            </Link>
            <SaveButton vehicleId={vehicle.id} />
          </div>

          {specs && <p className="text-sm text-gray-500 mt-2">{specs}</p>}
          {details && <p className="text-sm text-gray-400 mt-0.5">{details}</p>}
        </div>

        <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-xl font-bold text-gray-900">{formatPrice(vehicle.price_pence)}</p>
            <p className="text-xs text-gray-400 mt-0.5">From {monthly}/mo · 9.9% APR representative</p>
          </div>
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          >
            View
          </Link>
        </div>
      </div>
      </div>

      {vehicle.dealer && (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white border-t border-gray-100">
          <div className="w-7 h-7 rounded-md bg-navy-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">{vehicle.dealer.name.charAt(0)}</span>
          </div>
          <span className="text-xs font-semibold text-gray-700 truncate flex-1">{vehicle.dealer.name}</span>
          {vehicle.dealer.address_city && (
            <span className="text-xs text-gray-400 flex-shrink-0">{vehicle.dealer.address_city}</span>
          )}
          <span className="inline-flex items-center gap-1 bg-dealer-50 text-dealer-600 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-dealer-200 flex-shrink-0">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified dealer
          </span>
        </div>
      )}
    </div>
  );
}
