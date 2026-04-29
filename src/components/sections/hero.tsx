"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#E3DBD1]">
      <div className="mx-auto flex min-h-screen max-w-480 items-start justify-between px-42.5 pt-17.5">
        <div className="relative z-10 flex flex-col">
          <h1 className="-ml-20 mt-25 max-w-250 font-serif text-[55px] leading-[1.15] tracking-[-0.03em] text-[#091413]">
            Selamatkan Lebih Banyak Makanan, Hemat Lebih Banyak Uang!
          </h1>

          {/* container timer */}
          <div className="-ml-20 mt-25 flex h-27.5 w-270 items-center justify-between rounded-[28px] bg-[#C0B08E] px-12">
            <p className="text-[20px] font-normal text-[#FFFCFB]">
              Segera diselamatkan, sebelum terbuang!
            </p>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-[8px] border border-[#FFFCFB]/60 text-[24px] font-medium text-[#FFFCFB]">
                  127
                </div>
                <span className="mt-1.5 text-[13px] text-[#FFFCFB]">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-[8px] border border-[#FFFCFB]/60 text-[24px] font-medium text-[#FFFCFB]">
                  14
                </div>
                <span className="mt-1.5 text-[13px] text-[#FFFCFB]">Hours</span>
              </div>
              <span className="mb-5.5 text-[32px] text-[#FFFCFB]">:</span>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-[8px] border border-[#FFFCFB]/60 text-[24px] font-medium text-[#FFFCFB]">
                  33
                </div>
                <span className="mt-1.5 text-[13px] text-[#FFFCFB]">
                  Minutes
                </span>
              </div>
              <span className="mb-5.5 text-[32px] text-[#FFFCFB]">:</span>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-[8px] border border-[#FFFCFB]/60 text-[24px] font-medium text-[#FFFCFB]">
                  59
                </div>
                <span className="mt-1.5 text-[13px] text-[#FFFCFB]">
                  Seconds
                </span>
              </div>
            </div>
            <Link
              href="#menu"
              className="flex h-17.5 w-45 items-center justify-center rounded-[24px] bg-[#FFFCFB] text-[20px] font-medium text-[#BBAB8C] transition hover:opacity-90"
            >
              Buy Now
            </Link>
          </div>
        </div>

        <div className="absolute left-55 top-0 h-full w-full">
          <Image
            src="/images/food1.png"
            alt="Food Hero"
            fill
            priority
            sizes="50vw"
            className="object-contain object-top-right"
          />
        </div>
      </div>
    </section>
  );
}
