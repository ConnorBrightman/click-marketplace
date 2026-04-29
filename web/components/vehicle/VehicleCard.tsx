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

      {vehicle.dealer && (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white border-t border-gray-100">
          <div className="w-7 h-7 rounded-md bg-navy-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">{vehicle.dealer.name.charAt(0)}</span>
          </div>
          <span className="text-xs font-semibold text-gray-700 truncate flex-1">{vehicle.dealer.name}</span>
          <span className="inline-flex items-center gap-1 bg-dealer-50 text-dealer-600 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-dealer-200 flex-shrink-0">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        </div>
      )}
    </Link>
  );
}
