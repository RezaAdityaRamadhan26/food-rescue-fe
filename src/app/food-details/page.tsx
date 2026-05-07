"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Heart,
  MapPin,
  Star,
  Bike,
  ShoppingBag,
  Check,
  Leaf,
  Info,
  Share2,
  ShoppingCart,
} from "lucide-react";

import Navbar from "@/components/layout/navbar";
import { CountdownTimer } from "./components/countdownTimer";
import { ImageGallery } from "./components/imageGaller";
import { RelatedMeals } from "./components/relatedMeals";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

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
  flashSaleStartTime: string | null;
  categoryId: number;
  restaurantId: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: { fullname: string };
}

type InfoTab = "description" | "reviews";

export default function FoodDetailsPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<InfoTab>("description");

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${productId}`);
        setProduct(res.data.data);
      } catch {
        setProduct(null);
      }
      setIsLoading(false);
    };

    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get(`/reviews/product/${productId}`);
        setReviews(res.data.data || []);
      } catch {
        setReviews([]);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [productId]);

  const formatPrice = (price: number) =>
    `Rp${price.toLocaleString("id-ID")}`;

  const handleAddToCart = () => {
    if (!product) return;
    // Navigate to order page with product info
    const params = new URLSearchParams({
      productId: product.id,
      quantity: String(quantity),
    });
    router.push(`/order?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFCFB]">
        <div className="h-12 w-12 animate-spin rounded-full border-3 border-[#AC7F5E]/20 border-t-[#AC7F5E]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFFCFB]">
        <Navbar />
        <p className="mt-24 text-xl text-[#091413]/50">Produk tidak ditemukan</p>
      </div>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100
  );
  const savings = product.originalPrice - product.sellingPrice;

  const galleryImages = product.imageUrl
    ? [{ src: product.imageUrl, alt: product.name }]
    : [
        {
          src: "https://images.unsplash.com/photo-1647093953000-9065ed6f85ef",
          alt: product.name,
        },
      ];

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "—";

  return (
    <div className="min-h-screen bg-[#FFFCFB] text-[#091413]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10 pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ImageGallery images={galleryImages} />
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BBAB8C] text-sm font-semibold text-[#FFFCFB]">
                  {product.name.slice(0, 2).toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-medium">{product.name}</p>

                  <div className="flex items-center gap-1.5 text-xs opacity-50">
                    <Star size={10} className="fill-[#BBAB8C] text-[#BBAB8C]" />
                    <span>{avgRating} ({reviews.length} ulasan)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[black/5]">
                  <Share2 size={15} />
                </button>

                <button
                  onClick={() => setIsFav(!isFav)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                    isFav ? "bg-[#B98D67]/20" : "bg-[black/5]"
                  }`}
                >
                  <Heart
                    size={15}
                    className={
                      isFav ? "fill-[#B98D67] text-[#B98D67]" : "text-[#091413]"
                    }
                  />
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="font-serif text-5xl leading-tight tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between rounded-3xl bg-[#FFFCFB] p-6">
              <div>
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-bold">
                    {formatPrice(product.sellingPrice)}
                  </span>

                  <span className="text-xl opacity-30 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-[#B98D67]">
                  Kamu Hemat {formatPrice(savings)}
                </p>
              </div>

              <div className="rounded-2xl border border-[#B98D67]/20 bg-[#091413]/10 px-5 py-4 text-center">
                <p className="text-3xl font-bold text-[#B98D67]">{discount}%</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#B98D67]">
                  Off
                </p>
              </div>
            </div>

            {product.flashSaleEndTime && <CountdownTimer />}

            {/* Stock */}
            <div className="rounded-3xl bg-[#FFFCFB] p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm">
                  Hanya{" "}
                  <span className="font-semibold text-[#B98D67]">
                    {product.stock} Porsi
                  </span>{" "}
                  Tersisa
                </p>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#091413]/10">
                <div
                  className="h-full rounded-full bg-[#B98D67]"
                  style={{ width: `${Math.min((product.stock / 10) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Delivery options */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-3xl border border-[#B98D67]/20 bg-[#FFFCFB] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#B98D67]/10">
                  <ShoppingBag size={18} className="text-[#B98D67]" />
                </div>

                <div>
                  <p className="text-sm font-medium">Pickup</p>
                  <p className="text-xs opacity-50">Ambil sendiri</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-3xl border border-[#B98D67]/20 bg-[#FFFCFB] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#B98D67]/10">
                  <Bike size={18} className="text-[#BBAB8C]" />
                </div>

                <div>
                  <p className="text-sm font-medium">Delivery</p>
                  <p className="text-xs opacity-50">Antar ke alamat</p>
                </div>
              </div>
            </div>

            {/* Sustainability */}
            <div className="flex items-center gap-3 rounded-3xl border border-[#091413]/10 bg-[#091413]/1 px-5 py-4">
              <Leaf size={16} className="text-green-700" />

              <p className="text-sm opacity-70">
                Rescuing this meal prevents{" "}
                <span className="font-semibold text-green-700">0.8kg CO₂</span>{" "}
                emissions.
              </p>
            </div>

            {/* Quantity + CTA */}
            <div className="flex gap-4">
              <div className="flex items-center gap-4 rounded-3xl bg-[#FFFCFB] px-5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-xl opacity-40 transition-opacity hover:opacity-100"
                >
                  −
                </button>

                <span className="text-xl font-semibold">{quantity}</span>

                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="text-xl opacity-40 transition-opacity hover:opacity-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-3xl bg-[#BBAB8C] py-4 text-sm font-medium text-[#FFFCFB] transition-all active:scale-[0.98] hover:bg-[#9c8f76]"
              >
                <ShoppingCart size={16} />
                Pesan Sekarang — {formatPrice(product.sellingPrice * quantity)}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-20">
          <div className="mb-8 flex gap-8 border-b border-[#091413]/10">
            {(["description", "reviews"] as InfoTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 pb-4 text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? "border-[#BBAB8C] opacity-100"
                    : "border-transparent opacity-40"
                }`}
              >
                {tab === "reviews" ? `Ulasan (${reviews.length})` : "Deskripsi"}
              </button>
            ))}
          </div>

          <div className="rounded-[32px] bg-[#FFFCFB] p-10">
            {activeTab === "description" && (
              <div className="max-w-3xl">
                <h3 className="mb-5 font-serif text-3xl">Deskripsi</h3>

                <p className="leading-8 opacity-70">
                  {product.description ||
                    "Makanan lezat yang siap untuk diselamatkan. Pesan sekarang dan nikmati dengan harga hemat!"}
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="mb-6 font-serif text-3xl">
                  Ulasan ({reviews.length})
                </h3>

                {reviews.length === 0 ? (
                  <p className="text-[#091413]/50">
                    Belum ada ulasan untuk produk ini
                  </p>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="rounded-2xl border border-[#E7DAC8] bg-[#FFFAF5] p-5"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#AC7F5E] text-sm font-semibold text-white">
                              {review.user.fullname.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-[#091413]">
                                {review.user.fullname}
                              </p>
                              <p className="text-xs text-[#091413]/50">
                                {new Date(review.createdAt).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < review.rating
                                    ? "fill-[#E8C99A] text-[#E8C99A]"
                                    : "text-[#091413]/15"
                                }
                              />
                            ))}
                          </div>
                        </div>

                        {review.comment && (
                          <p className="text-sm leading-relaxed text-[#091413]/70">
                            {review.comment}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <RelatedMeals meals={[]} />
    </div>
  );
}
