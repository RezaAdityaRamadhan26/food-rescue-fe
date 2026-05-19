"use client";

import Image from "next/image";
import { MapPin, Star, Leaf, Edit3, Bell, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";
import { useEffect } from "react";
import { Button } from "@/components/ui/button"; 

export function ProfileHero() {
  // Ambil fungsi logout langsung dari Zustand store kamu
  const { user, token, fetchProfile, logout } = useAuthStore();

  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
  }, [token, user, fetchProfile]);

  const handleLogout = async () => {
    // Jalankan fungsi logout dari useAuthStore
    await logout();
    // Setelah state dan cookie bersih, arahkan user ke halaman login
    window.location.href = "/login";
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Selamat pagi" : hour < 17 ? "Selamat siang" : "Selamat malam";

  const displayName = user?.fullname || "Pengguna";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#3D2C1E_0%,#5C3D22_50%,#4A3728_100%)] p-6 shadow-[0_8px_40px_rgba(45,31,20,0.25)] md:p-8">
      {/* BACKGROUND */}
      <div className="absolute top-0 right-0 h-64 w-64 translate-x-[30%] translate-y-[30%] rounded-full bg-[radial-gradient(circle,#C4A882,transparent)] opacity-10" />
      <div className="absolute bottom-0 left-1/3 h-48 w-48 -translate-x-1/2 translate-y-[40%] rounded-full bg-[radial-gradient(circle,#5B8A6B,transparent)] opacity-[0.08]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,#C4A882_1px,transparent_0)] bg-size-[32px_32px] opacity-[0.05]" />
      
      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        {/* AVATAR */}
        <div className="relative shrink-0">
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-[3px] border-[#C4A88280] bg-[#AC7F5E] shadow-[0_8px_24px_rgba(0,0,0,0.3)] md:h-24 md:w-24">
            <span className="text-2xl font-bold text-white md:text-3xl">
              {initials}
            </span>
          </div>

          {/* ONLINE BADGE */}
          <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#3D2C1E] bg-[#5B8A6B]">
            <Leaf size={10} className="text-[#FFFCFB]" strokeWidth={2.5} />
          </div>
        </div>

        {/* INFO */}
        <div className="flex-1">
          <div className="mb-0.5 text-[0.8rem] tracking-wider text-[#C4A882]">
            {greeting}, <span className="inline-block animate-bounce">✋</span>
          </div>

          <h1 className="mb-1.5 text-[1.75rem] leading-[1.2] text-[#FFFCFB]">
            {displayName}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            {/* BADGE */}
            <div className="flex items-center gap-1.5 rounded-full border border-[#5B8A6B4D] bg-[#5B8A6B40] px-3 py-1">
              <Leaf size={11} className="text-[#7BBF9C]" />
              <span className="text-[0.72rem] font-semibold text-[#7BBF9C]">
                {user?.role === "MERCHANT" ? "Merchant" : "Penjaga Lingkungan"}
              </span>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-[#9E8A78]" />
              <span className="text-[0.75rem] text-[#9E8A78]">
                {user?.email || "—"}
              </span>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-[#E8C99A] text-[#E8C99A]" />
              <span className="text-[0.75rem] font-semibold text-[#E8C99A]">
                4.9
              </span>
              <span className="text-[0.75rem] text-[#7A6355]">
                (128 rescue)
              </span>
            </div>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex flex-wrap gap-2 self-start">
          <Button 
            variant="outline" 
            size="icon"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FFFFFF26] bg-[#FFFFFF1A] p-0 transition-all duration-200 hover:scale-105 hover:bg-[#FFFFFF26]"
          >
            <Bell size={16} className="text-[#C4A882]" />
          </Button>

          <Button 
            className="flex h-9 items-center gap-2 rounded-xl bg-[#7C5B3A] px-4 text-[#FFFCFB] transition-all duration-200 hover:scale-105 hover:bg-[#63482E]"
          >
            <Edit3 size={14} />
            <span className="text-[0.8rem] font-medium">Edit Profil</span>
          </Button>

          {/* LOGOUT BUTTON */}
          <Button 
            onClick={handleLogout}
            className="flex h-9 items-center gap-2 rounded-xl bg-red-600/80 px-4 text-[#FFFCFB] transition-all duration-200 hover:scale-105 hover:bg-red-600"
          >
            <LogOut size={14} />
            <span className="text-[0.8rem] font-medium">Logout</span>
          </Button>
        </div>
      </div>

      {/* LEVEL */}
      <div className="relative z-10 mt-6 border-t border-[#FFFFFF1A] pt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[0.75rem] text-[#9E8A78]">
            Level 12 • Penjaga Bumi
          </span>
          <span className="text-[0.75rem] font-semibold text-[#C4A882]">
            2,340 / 3,000 XP
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[#FFFFFF1A]">
          <div className="h-full w-[78%] rounded-full bg-[linear-gradient(90deg,#5B8A6B,#7BBF9C)] transition-all duration-700" />
        </div>

        <div className="mt-1 text-[0.7rem] text-[#8E7665]">
          660 XP lagi untuk mencapai Level 13 — Yuk terus selamatkan makanan! <Leaf size={12} className="inline text-[#7BBF9C]" />
        </div>
      </div>
    </div>
  );
}