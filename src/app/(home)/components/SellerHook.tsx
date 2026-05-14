"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";

export default function SellerSection() {
  const router = useRouter();
  const { user, token } = useAuthStore();

  const handleMulaiJual = () => {
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

  const features = [
    {
      icon: "/images/icon1.png",
      title: "Tidak Perlu Takut Rugi",
      description:
        "Makanan yang tidak terjual tidak akan dikenakan biaya apa pun.",
    },
    {
      icon: "/images/icon2.png",
      title: "Jangkau Lebih Banyak Pelanggan",
      description:
        "Perkenalkan usahamu ke lebih banyak pembeli di sekitar toko mu.",
    },
    {
      icon: "/images/icon3.png",
      title: "Proses Mudah & Praktis",
      description:
        "Upload makanan, atur penjualan, dan mulai jualan dengan lebih mudah.",
    },
  ];

  return (
    <section id="seller" className="bg-[#FFFCFB] px-6 py-20 lg:py-32 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:gap-24 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto lg:max-w-none">
          <div className="relative aspect-3/4 overflow-hidden rounded-[20px]">
            <Image
              src="/images/nasiBebek.jpg"
              alt="Seller Food"
              fill
              priority
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-3 justify-center">
            <div className="relative aspect-square overflow-hidden rounded-[20px]">
              <Image
                src="/images/putriAyu.jpg"
                alt="Food"
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover"
              />
            </div>

            <div className="relative aspect-square overflow-hidden rounded-[20px]">
              <Image
                src="/images/nastar.jpg"
                alt="Food"
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="max-w-full lg:max-w-lg font-serif text-4xl md:text-5xl leading-[1.2] tracking-[-0.03em] text-[#091413]">
            Mulai Jual Tanpa Takut Rugi!
          </h1>

          {/* FEATURE LIST */}
          <div className="mt-10 md:mt-16 flex flex-col gap-8 md:gap-10">
            {features.map((item, index) => (
              <div key={index} className="flex items-start gap-4 md:gap-6">
                <div className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-full bg-[#AC7F5E]">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={36}
                    height={36}
                    className="object-contain w-8 h-8 md:w-10 md:h-10"
                  />
                </div>

                <div className="pt-1">
                  <h3 className="text-[20px] md:text-[25px] leading-[1.3] text-[#091413] font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-1 max-w-full lg:max-w-md text-[15px] md:text-[16px] leading-normal text-[#091413] opacity-65">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleMulaiJual}
            className="mt-10 md:mt-14 rounded-[16px] md:rounded-[18px] bg-[#AC7F5E] px-8 py-3.5 md:px-9 md:py-4 text-[16px] md:text-[17px] font-medium text-[#FFFCFB] transition hover:opacity-90 cursor-pointer shadow-sm"
          >
            Mulai Jual Sekarang
          </button>
        </div>
      </div>
    </section>
  );
}
