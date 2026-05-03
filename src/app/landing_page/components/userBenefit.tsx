"use client";

import Image from "next/image";

export default function UserBenefitSection() {
  return (
    <section
      id="benefits"
      className="bg-[#FFFCFB] px-8 py-32 lg:px-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-24 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>

          <h1 className="max-w-155 font-serif text-5xl leading-[1.1] tracking-[-0.03em] text-[#091413]">
            Kenapa Harus Food Rescue?
          </h1>

          {/* SUBTITLE */}
          <p className="mt-8 max-w-155 text-[20px] leading-[1.8] text-[#091413] opacity-55">
            Nikmati makanan berkualitas dengan harga lebih hemat tanpa
            terbuang sia-sia.
          </p>

          {/* DESCRIPTION */}
          <div className="mt-12 space-y-3">
            <p className="max-w-162.5 text-[18px] leading-[1.9] text-[#091413] opacity-55">
              Food Rescue membantu menghubungkan makanan yang belum
              terjual dengan pembeli yang membutuhkan. Dengan cara ini,
              kamu bisa menikmati makanan enak sekaligus membantu
              mengurangi limbah makanan.
            </p>

            <p className="text-[18px] leading-[1.9] text-[#091413] opacity-55">
              Selain itu, kamu juga ikut mendukung UMKM agar tetap
              mendapatkan penghasilan dari makanan yang seharusnya
              terbuang, sehingga setiap pembelianmu membawa manfaat
              bagi banyak pihak.
            </p>
          </div>

          {/* BUTTON */}
          <button className="mt-14 rounded-[18px] bg-[#BBAB8C] px-9 py-4 text-[17px] font-medium text-[#FFFCFB] transition hover:opacity-90">
            Mulai Sekarang
          </button>
        </div>

        {/* RIGHT GRID */}
        <div className="grid grid-cols-2 overflow-hidden rounded-[36px]">
          <div className="flex h-80 flex-col justify-between bg-[#BBAB8C] p-10">
            <div>
              <h3 className="max-w-60 text-[24px] font-semibold leading-[1.1] text-[#FFFAF5]">
                Makanan Layak Tidak Terbuang
              </h3>

              <p className="mt-8 max-w-60 text-[20px] leading-[1.35] text-[#FFFAF5] opacity-85">
                Selamatkan makanan yang masih layak dan siap dinikmati.
              </p>
            </div>

            <div className="text-[#B98D67] mt-6">
              <Image
                src="/images/food.png"
                alt="Food"
                width={45}
                height={45}
              />
            </div>
          </div>

          <div className="relative h-80 overflow-hidden rounded-bl-[140px] rounded-tr-[36px]">
            <Image
              src="/images/umkm1.jpg"
              alt="UMKM"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <div className="relative h-80 overflow-hidden rounded-tr-[140px]">
            <Image
              src="/images/umkm2.jpg"
              alt="UMKM"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <div className="flex h-80 flex-col justify-between bg-[#AC7F5E] p-10">
            <div>
              <h3 className="max-w-65 text-[24px] font-semibold leading-[1.1] text-[#FFFAF5]">
                Setiap Pembelian Punya Dampak
              </h3>

              <p className="mt-8 max-w-60 text-[20px] leading-[1.35] text-[#FFFAF5] opacity-85">
                Kamu ikut mengurangi limbah makanan dan membantu UMKM.
              </p>
            </div>

            <div className="text-[#D8BEA0] mt-6">
              <Image
                src="/images/recycle-bin.png"
                alt="Dampak"
                width={45}
                height={45}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}