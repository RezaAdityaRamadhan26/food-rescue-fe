import Navbar from "./components/navbarMenu";
import HeroSection from "../(home)/components/hero";
import { Clock3, SearchIcon } from "lucide-react";
import Image from "next/image";
import ImpactSection from "../(home)/components/impact";
import Footer from "@/components/layout/footer";

export default function Menu() {
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
    <div>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <div className="container mx-auto px-8 py-32 lg:px-16">
        <h1 className="text-4xl font-serif text-center mt-10">
          Ada Makanan Yang Harus Diselamatkan!
        </h1>
        <p className="text-center text-[#091413]/65 mt-4">
          Temukan makanan lezat yang sedang dijual dengan harga spesial!
        </p>

        {/* search bar */}
        <div className="mt-15 flex items-center justify-between gap-6">
          {/* Categories */}
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
            {["Semua", "Makanan", "Minuman", "Toko Terdekat"].map(
              (category) => (
                <button
                  key={category}
                  className="flex h-10 items-center justify-center rounded-full border border-[#AC7F5E]/20 bg-[#FFFCFB] px-5 text-[14px] font-medium text-[#5C4A3A] transition-all duration-300 hover:border-[#AC7F5E] hover:bg-[#AC7F5E] hover:text-white"
                >
                  {category}
                </button>
              ),
            )}
          </div>

          {/* Search Bar */}
          <div className="flex h-12 w-full max-w-md items-center rounded-full border border-[#AC7F5E]/25 bg-[#FFFCFB]/90 px-2 shadow-sm backdrop-blur-md transition-all duration-300 focus-within:border-[#AC7F5E] focus-within:shadow-[0_0_0_4px_rgba(172,127,94,0.12)]">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent px-4 text-[15px] text-[#091413] placeholder:text-[#9A8070] outline-none"
            />
            <button className="flex h-11 w-11 items-center justify-center rounded-full text-[#091413]/55">
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className=" mt-8 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex w-max gap-8 [&::-webkit-scrollbar]:hidden">
            {menus.map((item, index) => (
              <div
                key={index}
                className="group w-90 rounded-[32px] bg-[#FFFAF5] p-5 transition-all duration-300 
                hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
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
        <div
          className=" mt-8 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex w-max gap-8 [&::-webkit-scrollbar]:hidden">
            {menus.map((item, index) => (
              <div
                key={index}
                className="group w-90 rounded-[32px] bg-[#FFFAF5] p-5 transition-all duration-300 
                hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
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
        <div
          className=" mt-8 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex w-max gap-8 [&::-webkit-scrollbar]:hidden">
            {menus.map((item, index) => (
              <div
                key={index}
                className="group w-90 rounded-[32px] bg-[#FFFAF5] p-5 transition-all duration-300 
                hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
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
        <div
          className=" mt-8 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex w-max gap-8 [&::-webkit-scrollbar]:hidden">
            {menus.map((item, index) => (
              <div
                key={index}
                className="group w-90 rounded-[32px] bg-[#FFFAF5] p-5 transition-all duration-300 
                hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
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
      <ImpactSection></ImpactSection>
      <Footer></Footer>
    </div>
  );
}
