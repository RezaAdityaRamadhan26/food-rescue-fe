"use client";

import { HandPlatter, ShoppingBag, UtensilsCrossed } from "lucide-react";

export default function CaraKerjaSection() {
  const steps = [
    {
      icon: <UtensilsCrossed size={34} strokeWidth={1.8} />,
      title: "Pilih Makanan",
      description:
        "Temukan berbagai makanan berkualitas dari UMKM terdekat dengan harga yang lebih hemat.",
    },
    {
      icon: <ShoppingBag size={34} strokeWidth={1.8} />,
      title: "Tentukan Cara Ambil",
      description: "Ambil langsung di tempat atau kirim ke rumah dengan mudah.",
    },
    {
      icon: <HandPlatter size={34} strokeWidth={1.8} />,
      title: "Selamatkan dan Nikmati",
      description:
        "Nikmati makanan favoritmu sambil membantu mengurangi limbah makanan dan mendukung UMKM lokal.",
    },
  ];

  return (
    <section id="about" className="bg-[#FFFCFB] px-8 py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.2] tracking-[-0.03em] text-[#091413]">
            Cara Kerja Food Rescue
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5F5F5F]">
            3 langkah mudah untuk menikmati makanan enak dengan harga lebih
            hemat
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {steps.map((item, index) => (
            <div
              key={index}
              className="group rounded-[32px] border border-[#E4D9CC] bg-[#FFFAF5] p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="flex h-18 w-18 items-center justify-center rounded-full bg-[#E3DBD1] text-[#AC7F5E] transition-all duration-300 group-hover:bg-[#AC7F5E] group-hover:text-white">
                {item.icon}
              </div>

              <h3 className="mt-8 text-2xl font-semibold text-[#091413]">
                {item.title}
              </h3>

              <p className="mt-4 leading-relaxed text-[#5F5F5F]">
                {item.description}
              </p>

              <span className="mt-10 block text-sm font-medium tracking-[0.2em] text-[#C7B8A6]">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
