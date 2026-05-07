"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock3, SearchIcon, UtensilsCrossed } from "lucide-react";
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
    }, 300); // debounce search
    return () => clearTimeout(timeout);
  }, [fetchProducts]);

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

  return (
    <div>
      <NavbarMenu />
      <div className="container mx-auto px-8 py-32 lg:px-16">
        <h1 className="text-4xl font-serif text-center mt-10">
          Ada Makanan Yang Harus Diselamatkan!
        </h1>
        <p className="text-center text-[#091413]/65 mt-4">
          Temukan makanan lezat yang sedang dijual dengan harga spesial!
        </p>

        {/* Search & Filter */}
        <div className="mt-15 flex items-center justify-between gap-6">
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

          {/* Search Bar */}
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

        {/* Products Grid */}
        {isLoading ? (
          <div className="mt-16 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-3 border-[#AC7F5E]/20 border-t-[#AC7F5E]" />
          </div>
        ) : products.length === 0 ? (
          <div className="mt-16 text-center text-[#091413]/50">
            <p className="text-xl">Belum ada makanan tersedia</p>
            <p className="mt-2 text-sm">Coba lagi nanti atau ubah kata pencarian</p>
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
                <div className="relative aspect-4/3 overflow-hidden rounded-[15px] bg-[#F0E8DC]">
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
                        Berakhir dalam {getTimeRemaining(product.flashSaleEndTime)}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
