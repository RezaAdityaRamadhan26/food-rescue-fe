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
    <section id="contact" className="bg-[#FFFAF5] px-6 py-20 lg:py-32 lg:px-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="max-w-4xl font-serif text-3xl md:text-5xl leading-tight tracking-[-0.03em] text-[#091413]">
          Bergabung Bersama Food Rescue dan Jadikan Setiap Makanan Lebih Berarti
        </h1>

        <div className="mt-12 md:mt-20 flex flex-col sm:flex-row w-full sm:w-auto items-center justify-center gap-4 md:gap-8">
          <button
            onClick={handleScrollToMenu}
            className="flex h-16 md:h-20 w-full sm:w-64 font-serif items-center justify-center rounded-[20px] md:rounded-[24px] bg-[#BBAB8C] text-[20px] md:text-[24px] font-medium text-[#FFFCFB] transition duration-300 hover:opacity-90 cursor-pointer shadow-sm hover:scale-[0.98] active:scale-[0.95]"
          >
            Lihat Menu
          </button>

          {/* BUTTON SELLER */}
          <button
            onClick={handleMulaiJual}
            className="flex h-16 md:h-20 w-full sm:w-64 font-serif items-center justify-center rounded-[20px] md:rounded-[24px] bg-[#BBAB8C] text-[20px] md:text-[24px] font-medium text-[#FFFCFB] transition duration-300 hover:opacity-90 cursor-pointer shadow-sm hover:scale-[0.98] active:scale-[0.95]"
          >
            Mulai Jual
          </button>
        </div>
      </div>
    </section>
  );
}
