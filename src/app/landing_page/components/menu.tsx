"use client";

import Image from "next/image";
import { Clock3 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MenuSection() {
  const router = useRouter();

  const menus = [
    {
      image: "/images/nasiGoreng.jpg",
      title: "Nasi Goreng Spesial",
      store: "Warung Bu Devi",
      price: "Rp10.000",
      originalPrice: "Rp18.000",
      time: "01:24:12",
    },
    {
      image: "/images/nasiGoreng.jpg",
      title: "Nasi Goreng Spesial",
      store: "Warung Bu Devi",
      price: "Rp10.000",
      originalPrice: "Rp18.000",
      time: "00:21:42",
    },
    {
      image: "/images/nasiGoreng.jpg",
      title: "Nasi Goreng Spesial",
      store: "Warung Bu Devi",
      price: "Rp10.000",
      originalPrice: "Rp18.000",
      time: "02:04:11",
    },
    {
      image: "/images/nasiGoreng.jpg",
      title: "Nasi Goreng Spesial",
      store: "Warung Bu Devi",
      price: "Rp10.000",
      originalPrice: "Rp18.000",
      time: "01:12:52",
    },
    {
      image: "/images/nasiGoreng.jpg",
      title: "Nasi Goreng Spesial",
      store: "Warung Bu Devi",
      price: "Rp10.000",
      originalPrice: "Rp18.000",
      time: "00:04:10",
    },
  ];

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

          {/* SUBTITLE */}
          <p className="mt-6 max-w-3xl text-lg leading-[1.8] text-[#091413] opacity-65">
            Temukan makanan lezat dengan harga hemat, siap untuk kamu
            selamatkan.
          </p>
        </div>

        {/* MENU SCROLL */}
        {/* button view all buat ke menu page tapi belom diarahin, arahin sebduru */}
        <button
          onClick={() => router.push("/menu_page")}
          className="text-[#AC7F5E] hover:text-[#8B5A2B] ml-300 mt-25"
        >
          View All
        </button>
        <div
          className="mt-5 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex w-max gap-8 [&::-webkit-scrollbar]:hidden">
            {menus.map((item, index) => (
              <div
                key={index}
                className="group w-90 rounded-[32px] bg-[#FFFAF5] p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              >
                {/* IMAGE */}
                <div className="relative aspect-4/3 overflow-hidden rounded-[15px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="mt-6">
                  {/* STORE */}
                  <p className="text-sm font-medium tracking-[0.15em] text-[#091413] opacity-65">
                    {item.store}
                  </p>

                  {/* TITLE */}
                  <h3 className="mt-3 text-[25px] font-semibold leading-[1.2] text-[#091413]">
                    {item.title}
                  </h3>

                  {/* PRICE */}
                  <div className="mt-5 flex items-end gap-3">
                    <span className="text-[25px] font-semibold text-[#AC7F5E]">
                      {item.price}
                    </span>

                    <span className="mb-1 text-[16px] text-[#AC7F5E] opacity-55 line-through">
                      {item.originalPrice}
                    </span>
                  </div>

                  {/* TIMER */}
                  <div className="mt-6 flex items-center gap-2 text-[#091413] opacity-65">
                    <Clock3 size={18} strokeWidth={1.8} />

                    <span className="text-[12px] font-medium">
                      Berakhir dalam {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
