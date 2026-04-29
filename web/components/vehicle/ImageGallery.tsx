"use client";

import Image from "next/image";
import { useState } from "react";
import { VehicleImage } from "@/lib/api";

interface Props {
  images: VehicleImage[];
  alt: string;
}

export default function ImageGallery({ images, alt }: Props) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/10] bg-gray-100 rounded-xl flex items-center justify-center">
        <svg className="w-20 h-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={images[current].url}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
              {current + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setCurrent(i)}
              className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                i === current ? "border-teal-400" : "border-transparent"
              }`}
            >
              <Image
                src={img.url}
                alt={`${alt} image ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
