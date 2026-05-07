"use client";

import { useState } from "react";
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
} from "lucide-react";

import Navbar from "@/components/layout/navbar";
import { CountdownTimer } from "./components/countdownTimer";
import { ImageGallery } from "./components/imageGaller";
import { RelatedMeals } from "./components/relatedMeals";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1647093953000-9065ed6f85ef",
    alt: "Food 1",
  },
  {
    src: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841",
    alt: "Food 2",
  },
  {
    src: "https://images.unsplash.com/photo-1712565043059-cd19ff8394cb",
    alt: "Food 3",
  },
];

const relatedMeals = [
  {
    id: 1,
    name: "Velvety Tomato Bisque",
    restaurant: "Maison Blanche",
    price: 5000,
    originalPrice: 10000,
    image: "https://images.unsplash.com/photo-1659758058868-214380ccf253",
    distance: "12.4 m",
    rating: 4.7,
    tag: "Pickup",
    portions: 5,
  },
];

type InfoTab = "description" | "nutrition" | "ingredients";

export default function FoodDetailsPage() {
  const [isFav, setIsFav] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<InfoTab>("description");

  const handleBuy = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };
  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FFFCFB] text-[#091413]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10 pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ImageGallery images={galleryImages} />
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BBAB8C] text-sm font-semibold text-[#FFFCFB]">
                  DV
                </div>

                <div>
                  <p className="text-sm font-medium">Warung Bu Devi</p>

                  <div className="flex items-center gap-1.5 text-xs opacity-50">
                    <MapPin size={10} className="text-[#BBAB8C]" />

                    <span>2.8 m away</span>

                    <span>·</span>

                    <Star size={10} className="fill-[#BBAB8C] text-[#BBAB8C]" />

                    <span>4.9 (238)</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
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
                Nasi Goreng
                <br />
                <span className="italic">Spesial</span>
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between rounded-3xl bg-[#FFFCFB] p-6">
              <div>
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-bold">Rp10.000</span>

                  <span className="text-xl opacity-30 line-through">
                    Rp18.000
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-[#B98D67]">
                  Kamu Hemat Rp8.000
                </p>
              </div>

              <div className="rounded-2xl border border-[#B98D67]/20 bg-[#091413]/10 px-5 py-4 text-center">
                <p className="text-3xl font-bold text-[#B98D67]">63%</p>

                <p className="text-xs font-semibold uppercase tracking-widest text-[#B98D67]">
                  Off
                </p>
              </div>
            </div>

            <CountdownTimer />

            {/* Stock */}
            <div className="rounded-3xl bg-[#FFFCFB] p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm">
                  Hanya{" "}
                  <span className="font-semibold text-[#B98D67]">3 Porsi</span>{" "}
                  Tersisa
                </p>

                <span className="text-xs opacity-40">3 of 10 remaining</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#091413]/10">
                <div className="h-full w-[30%] rounded-full bg-[#B98D67]" />
              </div>
            </div>

            {/* Pickup */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-3xl border border-[#B98D67]/20 bg-[#FFFCFB] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#B98D67]/10">
                  <ShoppingBag size={18} className="text-[#B98D67]" />
                </div>

                <div>
                  <p className="text-sm font-medium">Pickup</p>
                  <p className="text-xs opacity-50">Ready 6–8 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-3xl border border-[#B98D67]/20 bg-[#FFFCFB] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#B98D67]/10">
                  <Bike size={18} className="text-[#BBAB8C]" />
                </div>

                <div>
                  <p className="text-sm font-medium">Delivery</p>
                  <p className="text-xs opacity-50">+Rp5.000 ongkir</p>
                </div>
              </div>
            </div>

            <Field>
              <FieldLabel className="input-field-catatan font-serif text-sm">Catatan</FieldLabel>
              <Input
                id="input-field-catatan "
                type="text"
                placeholder="Tambah porsinya ya 🤗"
                className="h-13 rounded-3xl border border-[#091413]/10 bg-[#FFFCFB] px-5 py-4"
              />
            </Field>

            {/* Sustainability */}
            <div className="flex items-center gap-3 rounded-3xl border border-[#091413]/10 bg-[#FFFCFB] px-5 py-4">
              <Leaf size={16} className="text-green-700" />

              <p className="text-sm opacity-70">
                Rescuing this meal prevents{" "}
                <span className="font-semibold text-green-700">0.8kg CO₂</span>{" "}
                emissions.
              </p>
            </div>

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
                  onClick={() => setQuantity((q) => Math.min(3, q + 1))}
                  className="text-xl opacity-40 transition-opacity hover:opacity-100"
                >
                  +
                </button>
              </div>

              {/* Save CTA */}
              <button
                onClick={handleBuy}
                className={`flex flex-1 items-center justify-center gap-2 rounded-3xl py-4 text-sm font-medium text-[#FFFCFB] transition-all active:scale-[0.98] ${
                  saved ? "bg-green-700" : "bg-[#BBAB8C]"
                }`}
              >
                {saved ? (
                  <>
                    <Check size={16} />
                    Pembelian Berhasil!
                  </>
                ) : (
                  <>Buy Now</>
                )}
              </button>

              <button
                onClick={handleSave}
                className={`flex flex-1 items-center justify-center gap-2 rounded-3xl py-4 text-sm font-medium text-[#FFFCFB] transition-all active:scale-[0.98] ${
                  saved ? "bg-green-700" : "bg-[#BBAB8C]"
                }`}
              >
                {saved ? (
                  <>
                    <Check size={16} />
                    Orderan Tersimpan!
                  </>
                ) : (
                  <>Save To Orders</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-20">
          <div className="mb-8 flex gap-8 border-b border-[#091413]/10">
            {(["description", "nutrition", "ingredients"] as InfoTab[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`border-b-2 pb-4 text-sm font-medium capitalize transition-all ${
                    activeTab === tab
                      ? "border-[#BBAB8C] opacity-100"
                      : "border-transparent opacity-40"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          <div className="rounded-[32px] bg-[#FFFCFB] p-10">
            {activeTab === "description" && (
              <div className="max-w-3xl">
                <h3 className="mb-5 font-serif text-3xl">Deskripsi</h3>

                <p className="leading-8 opacity-70">
                  Nasi Goreng Spesial ini merupakan hidangan lezat yang dibuat
                  dengan bahan-bahan berkualitas tinggi dan resep tradisional
                  yang sudah teruji. Dengan cita rasa yang kaya dan aroma yang
                  menggugah selera, nasi goreng ini siap memanjakan lidahmu
                  sambil membantu mengurangi limbah makanan. Jangan lewatkan
                  kesempatan untuk menikmati hidangan spesial ini dengan harga
                  yang lebih hemat!
                </p>
              </div>
            )}

            {activeTab === "nutrition" && (
              <div>
                <div className="mb-6 flex items-center gap-2">
                  <h3 className="font-serif text-3xl">Fakta Nutrisi</h3>

                  <Info size={14} className="opacity-30" />
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
                  {[
                    "Calories",
                    "Protein",
                    "Carbs",
                    "Fat",
                    "Fiber",
                    "Sodium",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-3xl bg-[#F6F1EA] p-5 text-center"
                    >
                      <p className="text-2xl font-semibold">480</p>

                      <p className="mt-1 text-xs uppercase tracking-wider opacity-50">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div>
                <h3 className="mb-6 font-serif text-3xl">Bahan-Bahan</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  {["Nasi", "Telur Ceplok", "Sayuran", "Daging Ayam"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#BBAB8C]/20">
                          <Check size={10} className="text-[#BBAB8C]" />
                        </div>

                        <span className="opacity-70">{item}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <RelatedMeals meals={relatedMeals} />
    </div>
  );
}
