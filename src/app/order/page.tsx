"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CreditCard, MapPin, ShieldCheck, X, CheckCircle2, Recycle, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

interface Product {
  id: string;
  name: string;
  description: string | null;
  originalPrice: number;
  sellingPrice: number;
  stock: number;
  imageUrl: string | null;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get("productId");
  const qty = parseInt(searchParams.get("quantity") || "1");

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(qty);
  const [deliveryType, setDeliveryType] = useState<"PICKUP" | "DELIVERY">("PICKUP");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${productId}`);
        setProduct(res.data.data);
      } catch {
        setProduct(null);
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const formatPrice = (price: number) =>
    `Rp${price.toLocaleString("id-ID")}`;

  const handleCompleteOrder = async () => {
    if (!product) return;
    setIsSubmitting(true);
    setError(null);

    try {
      await axiosInstance.post("/orders", {
        productId: product.id,
        quantity,
        deliveryType,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/buyer-profile");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal membuat pesanan");
    }
    setIsSubmitting(false);
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
        <p className="text-xl text-[#091413]/50">Tidak ada produk untuk dipesan</p>
        <Link href="/menu" className="mt-4 text-[#AC7F5E] underline">
          Kembali ke Menu
        </Link>
      </div>
    );
  }

  const subtotal = product.sellingPrice * quantity;
  const platformFee = 2000;
  const total = subtotal + platformFee;

  return (
    <div className="bg-[#FFFCFB] lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-screen">
      {/* LEFT */}
      <section className="border-r border-[#E3DBD1] p-10">
        <div className="mb-10">
          <Link
            href="/menu"
            className="text-sm text-[#091413]/65 flex items-center gap-3"
          >
            <X /> Kembali ke Menu
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <h1 className="text-4xl font-bold text-[#091413]">Order Summary</h1>

            <span className="rounded-full bg-[#BBAB8C] px-3 py-1 text-xs font-medium text-[#FFFCFB]">
              {quantity} item
            </span>
          </div>
        </div>

        {/* Product Card */}
        <div className="mb-5 rounded-3xl border border-[#E3DBD1] bg-[#FFFCFB] p-5">
          <div className="flex gap-5">
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-[#F0E8DC]">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-3xl">
                  <UtensilsCrossed size={28} className="text-[#AC7F5E]/60" />
                </div>
              )}
            </div>

            <div className="flex flex-1 justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#091413]">
                  {product.name}
                </h2>

                <p className="mt-1 text-sm text-[#8D7B68]">
                  Food Rescue • Ready today
                </p>

                <div className="mt-4 flex gap-2">
                  <span className="rounded-full bg-[#FFFAF5] px-3 py-1 text-xs text-[#091413]/65">
                    Qty {quantity}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-[#091413]">
                  {formatPrice(product.sellingPrice)}
                </p>

                <p className="mt-2 text-sm text-[#091413]/65 line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="rounded-3xl border border-[#E3DBD1] bg-[#FFFCFB] p-6">
          <div className="mb-4 flex justify-between">
            <span className="text-[#091413]/65">{product.name} × {quantity}</span>
            <span className="font-semibold text-[#091413]">
              {formatPrice(subtotal)}
            </span>
          </div>
          <div className="mb-4 flex justify-between">
            <span className="text-[#091413]/65">Biaya platform</span>
            <span className="font-semibold text-[#091413]">
              {formatPrice(platformFee)}
            </span>
          </div>

          <div className="h-px bg-[#EEE2D1]" />

          <div className="mt-5 flex justify-between">
            <span className="text-2xl font-bold text-[#091413]">Total</span>

            <span className="text-3xl font-bold text-[#091413]">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </section>

      {/* RIGHT */}
      <section className="bg-[#FFFCFB] p-10">
        {success ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#091413]">
              Pesanan Berhasil!
            </h2>
            <p className="mt-2 text-[#8D7B68]">
              Kamu akan diarahkan ke halaman profil...
            </p>
          </div>
        ) : (
          <>
            {/* Delivery Type */}
            <div className="mb-8">
              <h2 className="mb-5 text-2xl font-bold text-[#091413]">
                Metode Pengambilan
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setDeliveryType("PICKUP")}
                  className={`rounded-2xl border-2 px-5 py-4 text-left transition ${
                    deliveryType === "PICKUP"
                      ? "border-[#A67B5B] bg-[#F4E8D5]"
                      : "border-[#E5D7C4] bg-[#FFFCFB]"
                  }`}
                >
                  <CreditCard
                    className="mb-3 text-[#7B6248]"
                    size={22}
                  />

                  <p className="font-semibold text-[#091413]">Self Pickup</p>

                  <span className="text-sm text-[#8D7B68]">
                    Ambil sendiri di toko
                  </span>
                </button>

                <button
                  onClick={() => setDeliveryType("DELIVERY")}
                  className={`rounded-2xl border-2 px-5 py-4 text-left transition ${
                    deliveryType === "DELIVERY"
                      ? "border-[#A67B5B] bg-[#F4E8D5]"
                      : "border-[#E5D7C4] bg-[#FFFCFB]"
                  }`}
                >
                  <MapPin className="mb-3 text-[#7B6248]" size={22} />

                  <p className="font-semibold text-[#091413]">Delivery</p>

                  <span className="text-sm text-[#8D7B68]">Antar ke alamatmu</span>
                </button>
              </div>
            </div>

            {/* Address */}
            {deliveryType === "DELIVERY" && (
              <div className="mb-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#091413]">
                    Alamat Pengiriman
                  </label>

                  <textarea
                    rows={4}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Masukkan alamat lengkap"
                    className="w-full rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-4 outline-none transition focus:border-[#B88B67]"
                  />
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Security */}
            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-[#F3E8D8] p-4">
              <ShieldCheck className="text-[#7B6248]" />

              <p className="text-sm text-[#091413]">
                Secure payment & trusted UMKM partners
              </p>
            </div>

            {/* Button */}
            <Button
              onClick={handleCompleteOrder}
              disabled={isSubmitting}
              className="mt-8 w-full h-15 rounded-2xl bg-[#BBAB8C] py-5 text-lg font-semibold text-[#FFFCFB] transition hover:bg-[#9c8f76] disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                `Pesan Sekarang — ${formatPrice(total)}`
              )}
            </Button>

            <p className="mt-5 text-center text-sm text-[#8D7B68]">
              By continuing you support food waste reduction <Recycle size={14} className="inline text-green-600" />
            </p>
          </>
        )}
      </section>
    </div>
  );
}
