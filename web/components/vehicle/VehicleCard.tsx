import Link from "next/link";
import Image from "next/image";
import { Vehicle, formatPrice, formatMileage } from "@/lib/api";

interface Props {
  vehicle: Vehicle;
}

const TYPE_ICONS: Record<string, string> = {
  car: "🚗",
  van: "🚐",
  bike: "🏍️",
  motorhome: "🚌",
  caravan: "🏕️",
};

const fuelColors: Record<string, string> = {
  Electric: "bg-green-100 text-green-700",
  Hybrid: "bg-teal-100 text-teal-700",
  Petrol: "bg-blue-100 text-blue-700",
  Diesel: "bg-gray-100 text-gray-700",
};

export default function VehicleCard({ vehicle }: Props) {
  const image = vehicle.images?.[0];
  const fuelBadge = fuelColors[vehicle.fuel_type] ?? "bg-gray-100 text-gray-600";

  return (
    <Link href={`/vehicles/${vehicle.id}`} className="card group block">
      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
        {image ? (
          <Image
            src={image.url}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-5xl opacity-30">{TYPE_ICONS[vehicle.vehicle_type] ?? "🚗"}</span>
          </div>
        )}
        {vehicle.featured && (
          <span className="absolute top-2 left-2 bg-teal-400 text-navy-500 text-xs font-bold px-2 py-1 rounded-md">
            Featured
          </span>
        )}
        <span
          className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-md ${fuelBadge}`}
        >
          {vehicle.fuel_type}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        {vehicle.variant && (
          <p className="text-gray-500 text-sm mb-2 truncate">{vehicle.variant}</p>
        )}

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {formatMileage(vehicle.mileage)}
          </span>
          <span>{vehicle.transmission}</span>
          {vehicle.engine_size && <span>{vehicle.engine_size}</span>}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-extrabold text-navy-500">
            {formatPrice(vehicle.price_pence)}
          </span>
          {vehicle.dealer?.address_city && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {vehicle.dealer.address_city}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
