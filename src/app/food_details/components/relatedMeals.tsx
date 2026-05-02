// BACA!!!!!!
// KALO NYARI LOGIC PRICE MEAL DLL ADA DI PAGE.TSX NYA

"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MapPin, Star } from "lucide-react";

interface Meal {
  id: number;
  name: string;
  restaurant: string;
  price: number;
  originalPrice: number;
  image: string;
  distance: string;
  rating: number;
  tag: string;
  portions: number;
}

interface RelatedMealsProps {
  meals: Meal[];
}

export function RelatedMeals({ meals }: RelatedMealsProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#BBAB8C]">
            More To Rescue
          </p>

          <h2 className="font-serif text-5xl leading-tight text-[#091413]">
            Toko Terdekat
          </h2>
        </div>

        <a
          href="#"
          className="hidden border-b border-[#BBAB8C]/40 pb-1 text-sm text-[#BBAB8C] transition-opacity hover:opacity-70 sm:block"
        >
          View all meals →
        </a>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {meals.map((meal) => {
          const isFavorite = favorites.includes(meal.id);

          const discount = Math.round(
            ((meal.originalPrice - meal.price) / meal.originalPrice) * 100,
          );

          return (
            <div
              key={meal.id}
              className="group overflow-hidden rounded-[28px] bg-[#FFFCFB] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={meal.image}
                  alt={meal.name}
                  fill
                  sizes="400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#091413]/30 to-transparent" />

                <div className="absolute left-3 top-3 rounded-full bg-[#BBAB8C] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#FFFCFB]">
                  -{discount}%
                </div>

                <button
                  onClick={() => toggleFavorite(meal.id)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFCFB]/90 backdrop-blur-sm transition-transform hover:scale-110"
                >
                  <Heart
                    size={14}
                    className={
                      isFavorite
                        ? "fill-[#BBAB8C] text-[#BBAB8C]"
                        : "text-[#091413]"
                    }
                  />
                </button>

                <div className="absolute bottom-3 left-3 rounded-full bg-[#091413]/75 px-2.5 py-1 text-[10px] text-[#FFFCFB] backdrop-blur-sm">
                  {meal.portions} left
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg leading-snug text-[#091413]">
                  {meal.name}
                </h3>

                <div className="mt-2 flex items-center gap-1 text-xs text-[#091413]/50">
                  <span>{meal.restaurant}</span>

                  <span>·</span>

                  <MapPin size={10} className="text-[#BBAB8C]" />

                  <span>{meal.distance}</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-semibold text-[#091413]">
                      Rp{meal.price.toFixed(2)}
                    </span>

                    <span className="text-sm text-[#091413]/30 line-through">
                      Rp{meal.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-[#BBAB8C] text-[#BBAB8C]" />

                    <span className="text-xs text-[#091413]/60">
                      {meal.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
