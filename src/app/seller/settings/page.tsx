"use client";

import { Settings, Bell, Shield, User, Globe } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";
import { useEffect } from "react";

export default function SellerSettingsPage() {
  const { user, token, fetchProfile } = useAuthStore();

  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
  }, [token, user, fetchProfile]);

  const settingSections = [
    {
      title: "Profil Akun",
      description: "Kelola informasi akun dan kata sandi",
      icon: User,
      items: [
        { label: "Nama", value: user?.fullname || "—" },
        { label: "Email", value: user?.email || "—" },
        { label: "Role", value: user?.role || "—" },
      ],
    },
    {
      title: "Notifikasi",
      description: "Atur preferensi notifikasi",
      icon: Bell,
      items: [
        { label: "Pesanan Baru", value: "Aktif" },
        { label: "Stok Rendah", value: "Aktif" },
        { label: "Ulasan Baru", value: "Nonaktif" },
      ],
    },
    {
      title: "Keamanan",
      description: "Keamanan akun dan autentikasi",
      icon: Shield,
      items: [
        { label: "Kata Sandi", value: "••••••••" },
        { label: "Two-Factor Auth", value: "Nonaktif" },
      ],
    },
    {
      title: "Bahasa & Region",
      description: "Preferensi tampilan aplikasi",
      icon: Globe,
      items: [
        { label: "Bahasa", value: "Indonesia" },
        { label: "Zona Waktu", value: "WIB (UTC+7)" },
        { label: "Mata Uang", value: "IDR (Rupiah)" },
      ],
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-5xl text-[#091413]">Settings</h1>
        <p className="mt-2 text-sm text-[#091413]/65">
          Kelola pengaturan akun dan preferensi aplikasi.
        </p>
      </div>

      <div className="space-y-5">
        {settingSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5EFE6]">
                  <Icon size={20} className="text-[#AC7F5E]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#091413]">{section.title}</h3>
                  <p className="text-sm text-[#091413]/65">{section.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-[#F1EBE3] bg-[#FFFAF5] px-4 py-3"
                  >
                    <span className="text-sm text-[#091413]">{item.label}</span>
                    <span className="text-sm text-[#091413]/65">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
