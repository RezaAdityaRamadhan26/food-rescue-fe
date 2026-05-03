import { Button } from "@/components/ui/button";
import {
  Heart,
  Star,
  MapPin,
  Clock,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

const umkmList = [
  {
    id: 1,
    name: "Dapur Ibu Sri",
    category: "Masakan Rumahan Indonesia",
    image: "https://images.unsplash.com/photo-1709201761899-7b36ce377f86",
    rating: 4.9,
    reviews: 234,
    distance: "0.8 km",
    closingIn: "2 jam 15 mnt",
    discount: "Hingga diskon 60%",
    tags: ["Nasi Box", "Lauk Pauk"],
    mealsThisMonth: 12,
    co2Saved: "5.4 kg",
    isOpen: true,
    isFavorite: true,
  },
  {
    id: 2,
    name: "Toko Roti Harmoni",
    category: "Toko Roti & Bakery",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
    rating: 4.8,
    reviews: 187,
    distance: "1.2 km",
    closingIn: "45 mnt",
    discount: "Hingga diskon 55%",
    tags: ["Roti", "Pastry"],
    mealsThisMonth: 8,
    co2Saved: "3.1 kg",
    isOpen: true,
    isFavorite: true,
  },
  {
    id: 3,
    name: "Segar Buah Pak Budi",
    category: "Buah & Sayur Segar",
    image: "https://images.unsplash.com/photo-1690293319115-7c444db81c7d",
    rating: 4.7,
    reviews: 156,
    distance: "0.5 km",
    closingIn: "3 jam 30 mnt",
    discount: "Hingga diskon 50%",
    tags: ["Buah", "Sayuran"],
    mealsThisMonth: 6,
    co2Saved: "7.2 kg",
    isOpen: true,
    isFavorite: true,
  },
];

export function FavoriteUMKM() {
  return (
    <div>
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-[1.1rem] text-[#091413]">
          UMKM Favorit
        </h2>

        <button className="flex items-center gap-1 text-[0.78rem] font-semibold text-[#AC7F5E] transition-all duration-200 hover:opacity-70">
          Lihat lainnya →
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {umkmList.map((umkm) => (
          <div
            key={umkm.id}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-[rgba(196,168,130,0.18)] bg-[#FDFAF6] shadow-[0_2px_16px_rgba(45,31,20,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            {/* IMAGE */}
            <div className="relative h-32 overflow-hidden">
              <Image
                src={umkm.image}
                alt={umkm.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-[rgba(45,31,20,0.7)] to-transparent" />

              {/* FAVORITE */}
              <Button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFCFB]/90 p-0 transition-all duration-200 hover:scale-110">
                <Heart
                  size={14}
                  className="text-[#C4564E]"
                  fill={umkm.isFavorite ? "#C4564E" : "none"}
                />
              </Button>

              {/* STATUS */}
              <div
                className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 ${
                  umkm.isOpen ? "bg-[#D8EEE3]" : "bg-[#F5E6D3]"
                }`}
              >
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    umkm.isOpen ? "bg-[#5B8A6B]" : "bg-[#C4A882]"
                  }`}
                />

                <span
                  className={`text-[0.62rem] font-semibold ${
                    umkm.isOpen ? "text-[#5B8A6B]" : "text-[#7C5B3A]"
                  }`}
                >
                  {umkm.isOpen ? "Buka" : "Tutup"}
                </span>
              </div>

              {/* CLOSING */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                <Clock size={11} className="text-[#FFFCFB]/85" />

                <span className="text-[0.7rem] text-[#FFFCFB]/85">
                  Tutup dalam {umkm.closingIn}
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-4">
              {/* TITLE */}
              <div className="mb-1 flex items-start justify-between">
                <div>
                  <h3 className="text-[0.9rem] font-medium text-[#091413]">
                    {umkm.name}
                  </h3>

                  <p className="text-[0.72rem] text-[#091413]/75">
                    {umkm.category}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Star size={12} className="fill-[#E8C99A] text-[#E8C99A]" />

                  <span className="text-[0.78rem] font-medium text-[#091413]">
                    {umkm.rating}
                  </span>

                  <span className="text-[0.68rem] text-[#091413]/65">
                    ({umkm.reviews})
                  </span>
                </div>
              </div>

              {/* TAGS */}
              <div className="mb-3 mt-2 flex gap-1.5">
                {umkm.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-[#F5E6D3] px-2 py-0.5 text-[0.65rem] font-medium text-[#AC7F5E]"
                  >
                    {tag}
                  </span>
                ))}

                <span className="ml-auto rounded-lg bg-[#F5E6D3] px-2 py-0.5 text-[0.65rem] font-bold text-[#AC7F5E]">
                  {umkm.discount}
                </span>
              </div>

              {/* STATS */}
              <div className="flex items-center gap-3 border-t border-[rgba(196,168,130,0.15)] pt-3">
                <div className="flex items-center gap-1">
                  <MapPin size={10} className="text-[#BBAB8C]" />

                  <span className="text-[0.65rem] text-[#091413]/65">
                    {umkm.distance}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <ShoppingBag size={10} className="text-[#BBAB8C]" />

                  <span className="text-[0.65rem] text-[#091413]/65">
                    {umkm.mealsThisMonth} rescue
                  </span>
                </div>

                <div className="ml-auto flex items-center gap-1">
                  <TrendingUp size={10} className="text-[#7BBF9C]" />

                  <span className="text-[0.65rem] font-semibold text-[#7BBF9C]">
                    {umkm.co2Saved} terselamatkan
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#7C5B3A] to-[#5C3D22] py-2.5 text-[#F5EFE6] transition-all duration-200 hover:opacity-90 hover:shadow-md active:scale-95">
                <ShoppingBag size={14} />

                <span className="text-[0.82rem] font-semibold">
                  Rescue Sekarang
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
