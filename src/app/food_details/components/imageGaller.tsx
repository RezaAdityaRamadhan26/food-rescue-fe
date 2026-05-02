"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative aspect-4/5 overflow-hidden rounded-[36px] bg-[#E3DBD1]">
        <Image
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#091413]/30 to-transparent" />

        <button
          onClick={prevImage}
          className="absolute left-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFFCFB]/90 opacity-0 shadow-md transition-all group-hover:opacity-100"
        >
          <ChevronLeft size={18} className="text-[#091413]" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFFCFB]/90 opacity-0 shadow-md transition-all group-hover:opacity-100"
        >
          <ChevronRight size={18} className="text-[#091413]" />
        </button>

        <div className="absolute left-5 top-5 flex gap-2">
          <span className="rounded-full bg-[#BBAB8C] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#FFFCFB]">
            Rescue Deal
          </span>

          <span className="rounded-full bg-[#091413]/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#FFFCFB] backdrop-blur-sm">
            Today Only
          </span>
        </div>

        <div className="absolute right-5 top-5 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-[#091413] text-[#FFFCFB]">
          <span className="text-sm font-bold leading-none">63%</span>

          <span className="mt-0.5 text-[9px] tracking-[0.06em] opacity-70">
            OFF
          </span>
        </div>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-[#FFFCFB]"
                  : "w-1.5 bg-[#FFFCFB]/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-square overflow-hidden rounded-3xl transition-all ${
              index === activeIndex
                ? "ring-2 ring-[#B98D67]"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="200px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
