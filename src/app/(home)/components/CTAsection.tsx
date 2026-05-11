"use client";

import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();
  const { user, token } = useAuthStore();

  const handleMulaiJual = (e: React.MouseEvent) => {
    e.preventDefault();
    if (token && user) {
      if (user.role === "MERCHANT") {
        router.push("/seller");
      } else {
        alert(
          "Anda masuk sebagai Pembeli. Untuk mulai berjualan, silakan keluar terlebih dahulu dan daftar sebagai Penjual (UMKM)."
        );
      }
    } else {
      router.push("/register?role=MERCHANT");
    }
  };

  const handleScrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="contact" className="bg-[#FFFAF5] px-8 py-40 lg:px-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="max-w-4xl font-serif text-5xl leading-tight tracking-[-0.03em] text-[#091413]">
          Bergabung Bersama Food Rescue dan Jadikan Setiap Makanan Lebih Berarti
        </h1>

        <div className="mt-30 flex flex-wrap items-center justify-center gap-10">
          <button
            onClick={handleScrollToMenu}
            className="flex h-22 w-72 font-serif items-center justify-center rounded-[24px] bg-[#BBAB8C] text-[25px] font-medium text-[#FFFCFB] transition duration-300 hover:opacity-90 cursor-pointer"
          >
            Lihat Menu
          </button>

          {/* BUTTON SELLER */}
          <button
            onClick={handleMulaiJual}
            className="flex h-22 w-72 font-serif items-center justify-center rounded-[24px] bg-[#BBAB8C] text-[25px] font-medium text-[#FFFCFB] transition duration-300 hover:opacity-90 cursor-pointer"
          >
            Mulai Jual
          </button>
        </div>
      </div>
    </section>
  );
}
