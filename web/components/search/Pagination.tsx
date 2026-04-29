"use client";

import Link from "next/link";
import { SearchParams } from "@/lib/api";

interface Props {
  currentPage: number;
  totalPages: number;
  currentParams: SearchParams & Record<string, string | undefined>;
}

export default function Pagination({ currentPage, totalPages, currentParams }: Props) {
  function pageHref(page: number) {
    const params = new URLSearchParams(currentParams as Record<string, string>);
    params.set("page", String(page));
    return `/search?${params.toString()}`;
  }

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      {currentPage > 1 && (
        <Link
          href={pageHref(currentPage - 1)}
          className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          ← Prev
        </Link>
      )}

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-3 py-2 text-gray-400 text-sm">
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={pageHref(p as number)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-navy-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={pageHref(currentPage + 1)}
          className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Next →
        </Link>
      )}
    </div>
  );
}
