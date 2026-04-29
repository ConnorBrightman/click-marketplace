"use client";

import { useRouter } from "next/navigation";
import { SearchParams } from "@/lib/api";

interface Props {
  total: number;
  currentParams: SearchParams & { sort?: string };
}

export default function SortBar({ total, currentParams }: Props) {
  const router = useRouter();

  function handleSort(sort: string) {
    const params = new URLSearchParams(currentParams as Record<string, string>);
    params.set("sort", sort);
    params.delete("page");
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <p className="text-sm text-gray-500">
        <span className="font-semibold text-gray-900">{total.toLocaleString()}</span> results
      </p>
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500 hidden sm:block">Sort:</label>
        <select
          value={currentParams.sort || ""}
          onChange={(e) => handleSort(e.target.value)}
          className="filter-select text-sm w-auto"
        >
          <option value="">Best match</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest first</option>
          <option value="mileage">Lowest mileage</option>
          <option value="recently_listed">Recently listed</option>
        </select>
      </div>
    </div>
  );
}
