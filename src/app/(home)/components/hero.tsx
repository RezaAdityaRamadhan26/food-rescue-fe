"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";
import axiosInstance from "@/lib/axios";

export default function HeroSection() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchTargetDate = async () => {
      try {
        const res = await axiosInstance.get("/products");
        const products = res.data.data || [];
        const activeFlashSales = products
          .filter(
            (p: any) =>
              p.type === "FLASH_SALE" &&
              p.flashSaleEndTime &&
              new Date(p.flashSaleEndTime).getTime() > Date.now()
          )
          .sort(
            (a: any, b: any) =>
              new Date(a.flashSaleEndTime).getTime() -
              new Date(b.flashSaleEndTime).getTime()
          );

        if (activeFlashSales.length > 0) {
          setTargetDate(new Date(activeFlashSales[0].flashSaleEndTime));
        } else {
          // Fallback: End of the current day
          const endOfToday = new Date();
          endOfToday.setHours(23, 59, 59, 999);
          setTargetDate(endOfToday);
        }
      } catch {
        // Fallback: 4 hours from now
        const fallback = new Date();
        fallback.setHours(fallback.getHours() + 4);
        setTargetDate(fallback);
      }
    };

    fetchTargetDate();
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      } 

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (token && user?.role === "MERCHANT") {
      router.push("/seller");
    } else {
      const menuSection = document.getElementById("menu");
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-[#E3DBD1]">
      <div className="mx-auto flex min-h-screen max-w-480 items-start justify-between px-42.5 pt-17.5">
        <div className="relative z-10 flex flex-col">
          <h1 className="-ml-20 mt-25 max-w-250 font-serif text-[55px] leading-[1.15] tracking-[-0.03em] text-[#091413]">
            Selamatkan Lebih Banyak Makanan, Hemat Lebih Banyak Uang!
          </h1>

          {/* container timer */}
          <div className="-ml-20 mt-30 flex h-23 w-270 items-center justify-between rounded-[28px] bg-[#C0B08E] px-12">
            <p className="text-[20px] font-normal text-[#FFFCFB]">
              Segera diselamatkan, sebelum terbuang!
            </p>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-[#FFFCFB]/60 text-[18px] font-medium text-[#FFFCFB]">
                  {String(timeLeft.days).padStart(2, "0")}
                </div>
                <span className="mt-1.5 text-[13px] text-[#FFFCFB]">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-[#FFFCFB]/60 text-[18px] font-medium text-[#FFFCFB]">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <span className="mt-1.5 text-[13px] text-[#FFFCFB]">Hours</span>
              </div>
              <span className="mb-5.5 text-[32px] text-[#FFFCFB]">:</span>
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-[#FFFCFB]/60 text-[18px] font-medium text-[#FFFCFB]">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <span className="mt-1.5 text-[13px] text-[#FFFCFB]">
                  Minutes
                </span>
              </div>
              <span className="mb-5.5 text-[32px] text-[#FFFCFB]">:</span>
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-[#FFFCFB]/60 text-[18px] font-medium text-[#FFFCFB]">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <span className="mt-1.5 text-[13px] text-[#FFFCFB]">
                  Seconds
                </span>
              </div>
            </div>
            <button
              onClick={handleBuyNow}
              className="flex h-15 w-45 items-center justify-center rounded-[18px] bg-[#FFFCFB] text-[18px] font-medium text-[#BBAB8C] transition hover:opacity-90 cursor-pointer"
            >
              Buy Now
            </button>
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
