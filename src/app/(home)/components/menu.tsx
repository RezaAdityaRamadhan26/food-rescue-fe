"use client";

import Image from "next/image";
import { Clock3, UtensilsCrossed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

interface Product {
  id: string;
  name: string;
  originalPrice: number;
  sellingPrice: number;
  imageUrl: string | null;
  flashSaleEndTime: string | null;
  restaurant: { name: string } | null;
}

export default function MenuSection() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products", {
          params: { limit: 5 },
        });
        setProducts(res.data.data || []);
      } catch {
        setProducts([]);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const formatPrice = (price: number) =>
    `Rp${price.toLocaleString("id-ID")}`;

  const getTimeRemaining = (endTime: string | null) => {
    if (!endTime) return null;
    const diff = new Date(endTime).getTime() - Date.now();
    if (diff <= 0) return "Berakhir";
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Fallback static data in case API is unreachable or returns empty
  const fallbackMenus = [
    {
      id: "fb-1",
      name: "Nasi Goreng Spesial",
      restaurant: { name: "Warung Bu Devi" },
      sellingPrice: 10000,
      originalPrice: 18000,
      imageUrl: "/images/nasiGoreng.jpg",
      flashSaleEndTime: null,
    },
  ];

  const displayProducts = products.length > 0 ? products : (isLoading ? [] : fallbackMenus);

  return (
    <section
      id="menu"
      className="overflow-hidden bg-[#FFFCFB] px-8 py-32 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="mt-6 text-5xl leading-[1.15] tracking-[-0.03em] text-[#091413] font-serif">
            Pilihan Makanan
            <br />
            Untuk Diselamatkan
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-[1.8] text-[#091413] opacity-65">
            Temukan makanan lezat dengan harga hemat, siap untuk kamu
            selamatkan.
          </p>
        </div>

        <button
          onClick={() => router.push("/menu")}
          className="text-[#AC7F5E] hover:text-[#8B5A2B] ml-300 mt-25"
        >
          View All
        </button>

        {isLoading ? (
          <div className="mt-10 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#AC7F5E]/20 border-t-[#AC7F5E]" />
          </div>
        ) : (
          <div
            className="mt-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex w-max gap-8 [&::-webkit-scrollbar]:hidden">
              {displayProducts.map((item, index) => (
                <div
                  key={item.id || index}
                  onClick={() => router.push(`/food-details?id=${item.id}`)}
                  className="group w-90 cursor-pointer rounded-[32px] bg-[#FFFAF5] p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-4/3 overflow-hidden rounded-[15px] bg-[#F0E8DC]">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-4xl text-[#AC7F5E]/40">
                        <UtensilsCrossed size={36} />
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="mt-6">
                    <p className="text-sm font-medium tracking-[0.15em] text-[#091413] opacity-65">
                      {item.restaurant?.name || "—"}
                    </p>

                    <h3 className="mt-3 text-[25px] font-semibold leading-[1.2] text-[#091413]">
                      {item.name}
                    </h3>

                    <div className="mt-5 flex items-end gap-3">
                      <span className="text-[25px] font-semibold text-[#AC7F5E]">
                        {formatPrice(item.sellingPrice)}
                      </span>

                      <span className="mb-1 text-[16px] text-[#AC7F5E] opacity-55 line-through">
                        {formatPrice(item.originalPrice)}
                      </span>
                    </div>

                    {item.flashSaleEndTime && (
                      <div className="mt-6 flex items-center gap-2 text-[#091413] opacity-65">
                        <Clock3 size={18} strokeWidth={1.8} />
                        <span className="text-[12px] font-medium">
                          Berakhir dalam{" "}
                          {getTimeRemaining(item.flashSaleEndTime)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
