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
    <div className="bg-white rounded-xl overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-all duration-200">
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
            {vehicle.dealer && (
              <p className="text-xs text-gray-400 mt-1">
                {vehicle.dealer.name}
                {vehicle.dealer.address_city ? ` · ${vehicle.dealer.address_city}` : ""}
              </p>
            )}
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
  );
}
