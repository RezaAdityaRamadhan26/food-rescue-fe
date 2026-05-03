"use client";

import Image from "next/image";

export default function SellerSection() {
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
    <section id="seller" className="bg-[#FFFCFB] px-8 py-32 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-28 lg:grid-cols-2">
        <div className="flex gap-2">
          <div className="relative h-127 w-105 overflow-hidden rounded-[20px]">
            <Image
              src="/images/nasiBebek.jpg"
              alt="Seller Food"
              fill
              priority
              sizes="30vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 self-center">
            <div className="relative h-62 w-60 overflow-hidden rounded-[20px]">
              <Image
                src="/images/putriAyu.jpg"
                alt="Food"
                fill
                priority
                sizes="20vw"
                className="object-cover"
              />
            </div>

            <div className="relative h-62 w-60 overflow-hidden rounded-[20px]">
              <Image
                src="/images/nastar.jpg"
                alt="Food"
                fill
                priority
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="max-w-120 font-serif text-5xl leading-[1.2] tracking-[-0.03em] text-[#091413]">
            Mulai Jual Tanpa Takut Rugi!
          </h1>

          {/* FEATURE LIST */}
          <div className="mt-16 flex flex-col gap-10">
            {features.map((item, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#AC7F5E]">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={42}
                    height={42}
                    className="object-contain"
                  />
                </div>

                <div className="pt-1">
                  <h3 className="text-[25px] leading-[1.3] text-[#091413]">
                    {item.title}
                  </h3>

                  <p className="mt-1 max-w-120 text-[16px] leading-normal text-[#091413] opacity-65">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
