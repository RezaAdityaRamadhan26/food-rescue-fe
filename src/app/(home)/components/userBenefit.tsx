"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";

export default function UserBenefitSection() {
  const router = useRouter();
  const { user, token } = useAuthStore();

  const handleMulaiSekarang = () => {
    if (token && user) {
      if (user.role === "MERCHANT") {
        router.push("/seller");
      } else {
        const menuSection = document.getElementById("menu");
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      router.push("/register");
    }
  };

  return (
    <section
      id="benefits"
      className="bg-[#FFFCFB] px-6 py-20 lg:py-32 lg:px-12"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:gap-24 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>

          <h1 className="max-w-full lg:max-w-2xl font-serif text-4xl md:text-5xl leading-[1.1] tracking-[-0.03em] text-[#091413]">
            Kenapa Harus Food Rescue?
          </h1>

          {/* SUBTITLE */}
          <p className="mt-6 md:mt-8 max-w-full lg:max-w-2xl text-[18px] md:text-[20px] leading-[1.8] text-[#091413] opacity-55">
            Nikmati makanan berkualitas dengan harga lebih hemat tanpa
            terbuang sia-sia.
          </p>

          {/* DESCRIPTION */}
          <div className="mt-8 md:mt-12 space-y-3">
            <p className="max-w-full lg:max-w-[650px] text-[16px] md:text-[18px] leading-[1.9] text-[#091413] opacity-55">
              Food Rescue membantu menghubungkan makanan yang belum
              terjual dengan pembeli yang membutuhkan. Dengan cara ini,
              kamu bisa menikmati makanan enak sekaligus membantu
              mengurangi limbah makanan.
            </p>

            <p className="max-w-full lg:max-w-[650px] text-[16px] md:text-[18px] leading-[1.9] text-[#091413] opacity-55">
              Selain itu, kamu juga ikut mendukung UMKM agar tetap
              mendapatkan penghasilan dari makanan yang seharusnya
              terbuang, sehingga setiap pembelianmu membawa manfaat
              bagi banyak pihak.
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleMulaiSekarang}
            className="mt-10 md:mt-14 rounded-[16px] md:rounded-[18px] bg-[#BBAB8C] px-8 py-3.5 md:px-9 md:py-4 text-[16px] md:text-[17px] font-medium text-[#FFFCFB] transition hover:opacity-90 cursor-pointer"
          >
            Mulai Sekarang
          </button>
        </div>

        {/* RIGHT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 overflow-hidden rounded-[24px] md:rounded-[36px]">
          <div className="flex h-64 sm:h-80 flex-col justify-between bg-[#BBAB8C] p-8 md:p-10">
            <div>
              <h3 className="text-[20px] md:text-[24px] font-semibold leading-[1.1] text-[#FFFAF5]">
                Makanan Layak Tidak Terbuang
              </h3>

              <p className="mt-4 md:mt-8 text-[16px] md:text-[20px] leading-[1.35] text-[#FFFAF5] opacity-85">
                Selamatkan makanan yang masih layak dan siap dinikmati.
              </p>
            </div>

            <div className="text-[#B98D67] mt-4 md:mt-6">
              <Image
                src="/images/food.png"
                alt="Food"
                width={45}
                height={45}
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </div>
          </div>

          <div className="relative h-64 sm:h-80 overflow-hidden sm:rounded-bl-[140px] sm:rounded-tr-[36px]">
            <Image
              src="/images/umkm1.jpg"
              alt="UMKM"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="relative h-64 sm:h-80 overflow-hidden sm:rounded-tr-[140px] order-last sm:order-none">
            <Image
              src="/images/umkm2.jpg"
              alt="UMKM"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex h-64 sm:h-80 flex-col justify-between bg-[#AC7F5E] p-8 md:p-10">
            <div>
              <h3 className="text-[20px] md:text-[24px] font-semibold leading-[1.1] text-[#FFFAF5]">
                Setiap Pembelian Punya Dampak
              </h3>

              <p className="mt-4 md:mt-8 text-[16px] md:text-[20px] leading-[1.35] text-[#FFFAF5] opacity-85">
                Kamu ikut mengurangi limbah makanan dan membantu UMKM.
              </p>
            </div>

            <div className="text-[#D8BEA0] mt-4 md:mt-6">
              <Image
                src="/images/recycle-bin.png"
                alt="Dampak"
                width={45}
                height={45}
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}