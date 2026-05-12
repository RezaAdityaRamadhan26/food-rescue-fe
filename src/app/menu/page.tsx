"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock3, Flame, SearchIcon, UtensilsCrossed } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import NavbarMenu from "./components/navbarMenu";
import Footer from "@/components/layout/footer";
import axiosInstance from "@/lib/axios";

interface Product {
  id: string;
  name: string;
  description: string | null;
  originalPrice: number;
  sellingPrice: number;
  stock: number;
  imageUrl: string | null;
  type: string;
  flashSaleEndTime: string | null;
  restaurant: { name: string } | null;
  category: { id: number; categoryName: string } | null;
}

interface Category {
  id: number;
  categoryName: string;
}

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);

    try {
      let res;

      if (selectedCategory) {
        res = await axiosInstance.get(`/products/category/${selectedCategory}`);

        setProducts(res.data.data || []);
      } else {
        res = await axiosInstance.get("/products", {
          params: { search, limit: 50 },
        });

        setProducts(res.data.data || []);
      }
    } catch {
      setProducts([]);
    }

    setIsLoading(false);
  }, [selectedCategory, search]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res.data.data || []);
      } catch {
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeout);
  }, [fetchProducts]);

  const formatPrice = (price: number) => `Rp${price.toLocaleString("id-ID")}`;

  const getTimeRemaining = (endTime: string | null) => {
    if (!endTime) return null;

    const diff = new Date(endTime).getTime() - Date.now();

    if (diff <= 0) return "Berakhir";

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0",
    )}:${String(s).padStart(2, "0")}`;
  };

  // FLASH RESCUE PRODUCTS
  const flashRescueProducts = products.filter(
    (product) =>
      product.flashSaleEndTime &&
      new Date(product.flashSaleEndTime).getTime() > Date.now(),
  );

  return (
    <div>
      <NavbarMenu />

      <div className="container mx-auto px-8 py-32 lg:px-16">
        {/* HERO */}
        <div className="text-center">
          <h1 className="mt-10 text-4xl font-serif text-[#091413] lg:text-5xl">
            Ada Makanan Yang Harus Diselamatkan!
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[#091413]/65">
            Temukan makanan lezat yang masih sangat layak konsumsi dengan harga
            spesial. Selamatkan makanan, bantu UMKM, dan kurangi food waste
            bersama.
          </p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="mt-15 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Categories */}
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex h-10 items-center justify-center rounded-full border px-5 text-[14px] font-medium transition-all duration-300 ${
                selectedCategory === null
                  ? "border-[#AC7F5E] bg-[#AC7F5E] text-white"
                  : "border-[#AC7F5E]/20 bg-[#FFFCFB] text-[#5C4A3A] hover:border-[#AC7F5E] hover:bg-[#AC7F5E] hover:text-white"
              }`}
            >
              Semua
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex h-10 items-center justify-center rounded-full border px-5 text-[14px] font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "border-[#AC7F5E] bg-[#AC7F5E] text-white"
                    : "border-[#AC7F5E]/20 bg-[#FFFCFB] text-[#5C4A3A] hover:border-[#AC7F5E] hover:bg-[#AC7F5E] hover:text-white"
                }`}
              >
                {cat.categoryName}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex h-12 w-full max-w-md items-center rounded-full border border-[#AC7F5E]/25 bg-[#FFFCFB]/90 px-2 shadow-sm backdrop-blur-md transition-all duration-300 focus-within:border-[#AC7F5E] focus-within:shadow-[0_0_0_4px_rgba(172,127,94,0.12)]">
            <input
              type="text"
              placeholder="Cari makanan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent px-4 text-[15px] text-[#091413] placeholder:text-[#9A8070] outline-none"
            />

            <button className="flex h-11 w-11 items-center justify-center rounded-full text-[#091413]/55">
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* FLASH RESCUE SECTION */}
        {flashRescueProducts.length > 0 && (
          <section className="mt-18 overflow-hidden rounded-[36px] border border-[#E8D9C8] bg-gradient-to-br from-[#FFF6EE] via-[#FFF9F5] to-[#FFF1E4] p-7 lg:p-10">
            {/* HEADER */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#F2C8A7] bg-[#FFF3E8] px-4 py-2">
                  <Flame className="h-4 w-4 text-[#D97706]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A16207]">
                    Flash Rescue
                  </span>
                </div>

                <h2 className="mt-5 text-3xl font-serif text-[#091413] lg:text-4xl">
                  Selamatkan Sebelum Terlambat
                </h2>

                <p className="mt-3 max-w-2xl text-[#091413]/65">
                  Makanan ini memiliki waktu penyelamatan terbatas dengan harga
                  rescue spesial. Ambil sekarang sebelum terbuang sia-sia.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8D9C8] bg-white/70 px-5 py-4 backdrop-blur-md">
                <p className="text-sm text-[#091413]/60">
                  Total makanan rescue
                </p>

                <h3 className="mt-1 text-3xl font-semibold text-[#AC7F5E]">
                  {flashRescueProducts.length}
                </h3>
              </div>
            </div>

            {/* FLASH PRODUCTS */}
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {flashRescueProducts.slice(0, 3).map((product) => {
                const discount = Math.round(
                  ((product.originalPrice - product.sellingPrice) /
                    product.originalPrice) *
                    100,
                );

                return (
                  <Link
                    key={product.id}
                    href={`/food-details?id=${product.id}`}
                    className="group relative overflow-hidden rounded-[28px] bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                  >
                    {/* BADGE */}
                    <div className="absolute top-4 left-4 z-20 rounded-full bg-[#E63946] px-4 py-2 text-xs font-bold tracking-wide text-white shadow-lg">
                      HEMAT {discount}%
                    </div>

                    {/* IMAGE */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#F4E9DD]">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="33vw"
                          className="object-cover transition duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#AC7F5E]/40">
                          <UtensilsCrossed size={42} />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    {/* CONTENT */}
                    <div className="mt-5">
                      <p className="text-sm font-medium tracking-[0.15em] text-[#091413]/55">
                        {product.restaurant?.name || "Restaurant"}
                      </p>

                      <h3 className="mt-2 text-2xl font-semibold leading-tight text-[#091413]">
                        {product.name}
                      </h3>

                      <div className="mt-5 flex items-end gap-3">
                        <span className="text-[28px] font-bold text-[#AC7F5E]">
                          {formatPrice(product.sellingPrice)}
                        </span>

                        <span className="mb-1 text-sm text-[#091413]/40 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </div>

                      {/* TIMER */}
                      <div className="mt-6 rounded-2xl border border-[#F3D7BC] bg-[#FFF8F1] p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFE8D2]">
                            <Clock3
                              className="h-5 w-5 text-[#C26B1D]"
                              strokeWidth={2}
                            />
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-[0.15em] text-[#091413]/45">
                              Rescue Berakhir Dalam
                            </p>

                            <h4 className="mt-1 text-lg font-semibold text-[#091413]">
                              {getTimeRemaining(product.flashSaleEndTime)}
                            </h4>
                          </div>
                        </div>
                      </div>

                      {/* FOOTER */}
                      <div className="mt-5 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-[#091413]/45">
                            Stok Tersisa
                          </p>

                          <p className="mt-1 font-semibold text-[#091413]">
                            {product.stock} porsi
                          </p>
                        </div>

                        <div className="rounded-full bg-[#AC7F5E] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-[#8C6548]">
                          Rescue Sekarang
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* PRODUCTS */}
        <section className="mt-18">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#AC7F5E]">
                Explore Menu
              </p>

              <h2 className="mt-2 text-3xl font-serif text-[#091413]">
                Semua Makanan Rescue
              </h2>
            </div>

            <p className="hidden text-sm text-[#091413]/50 lg:block">
              {products.length} makanan tersedia
            </p>
          </div>

          {/* LOADING */}
          {isLoading ? (
            <div className="mt-16 flex justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#AC7F5E]/20 border-t-[#AC7F5E]" />
            </div>
          ) : products.length === 0 ? (
            <div className="mt-16 text-center text-[#091413]/50">
              <p className="text-xl">Belum ada makanan tersedia</p>

              <p className="mt-2 text-sm">
                Coba lagi nanti atau ubah kata pencarian
              </p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/food-details?id=${product.id}`}
                  className="group rounded-[32px] bg-[#FFFAF5] p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[15px] bg-[#F0E8DC]">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#AC7F5E]/40">
                        <UtensilsCrossed size={36} />
                      </div>
                    )}

                    {product.stock <= 3 && product.stock > 0 && (
                      <div className="absolute top-3 left-3 rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold text-white">
                        Sisa {product.stock}
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="mt-6">
                    <p className="text-sm font-medium tracking-[0.15em] text-[#091413] opacity-65">
                      {product.restaurant?.name || "—"}
                    </p>

                    <h3 className="mt-3 text-[20px] font-semibold leading-[1.2] text-[#091413]">
                      {product.name}
                    </h3>

                    <div className="mt-5 flex items-end gap-3">
                      <span className="text-[22px] font-semibold text-[#AC7F5E]">
                        {formatPrice(product.sellingPrice)}
                      </span>

                      <span className="mb-1 text-[14px] text-[#AC7F5E] opacity-55 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>

                    {product.flashSaleEndTime && (
                      <div className="mt-6 flex items-center gap-2 text-[#091413] opacity-65">
                        <Clock3 size={18} strokeWidth={1.8} />

                        <span className="text-[12px] font-medium">
                          Berakhir dalam{" "}
                          {getTimeRemaining(product.flashSaleEndTime)}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
