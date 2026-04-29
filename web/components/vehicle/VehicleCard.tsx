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

export default function VehicleCard({ vehicle }: Props) {
  const image = vehicle.images?.[0];

  return (
    <Link
      href={`/vehicles/${vehicle.id}`}
      className="group block bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
        {image ? (
          <Image
            src={image.url}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl opacity-20">{TYPE_ICONS[vehicle.vehicle_type] ?? "🚗"}</span>
          </div>
        )}
        {vehicle.featured && (
          <span className="absolute top-2 left-2 bg-teal-500 text-white text-xs font-semibold px-2 py-0.5 rounded-md">
            Featured
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 mb-0.5">{vehicle.year} · {vehicle.make}</p>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug">
          {vehicle.model}{vehicle.variant ? ` ${vehicle.variant}` : ""}
        </h3>

        <p className="text-xs text-gray-400 mt-2.5">
          {[formatMileage(vehicle.mileage), vehicle.fuel_type, vehicle.transmission]
            .filter(Boolean)
            .join(" · ")}
        </p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-base font-bold text-gray-900">
            {formatPrice(vehicle.price_pence)}
          </span>
          {vehicle.dealer?.address_city && (
            <span className="text-xs text-gray-400">{vehicle.dealer.address_city}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
