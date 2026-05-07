"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section id="contact" className="bg-[#FFFAF5] px-8 py-40 lg:px-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="max-w-4xl font-serif text-5xl leading-tight tracking-[-0.03em] text-[#091413]">
          Bergabung Bersama Food Rescue dan Jadikan Setiap Makanan Lebih Berarti
        </h1>

        <div className="mt-30 flex flex-wrap items-center justify-center gap-10">

          <Link
            href="#menu"
            className="flex h-22 w-72 font-serif items-center justify-center rounded-[24px] bg-[#BBAB8C] text-[25px] font-medium text-[#FFFCFB] transition duration-300 hover:opacity-90"
          >
            Lihat Menu
          </Link>

          {/* BUTTON SELLER */}
          <Link
            href="#seller"
            className="flex h-22 w-72 font-serif items-center justify-center rounded-[24px] bg-[#BBAB8C] text-[25px] font-medium text-[#FFFCFB] transition duration-300 hover:opacity-90"
          >
            Mulai Jual
          </Link>
        </div>
      </div>
    </section>
  );
}
