"use client";

import { useEffect, useState } from "react";
import { Store, MapPin, FileText, Edit3, Save } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";

export default function SellerStorePage() {
  const { user, token, fetchProfile } = useAuthStore();

  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
  }, [token, user, fetchProfile]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-5xl text-[#091413]">My Store</h1>
        <p className="mt-2 text-sm text-[#091413]/65">
          Kelola informasi restoran dan profil toko kamu.
        </p>
      </div>

      {/* Store Profile Card */}
      <div className="mb-6 rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-6">
        <div className="flex items-start gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#AC7F5E] to-[#BBAB8C]">
            <Store size={36} className="text-white" />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#091413]">
              {user?.fullname || "Restoran Saya"}
            </h2>
            <p className="mt-1 text-sm text-[#091413]/65">{user?.email}</p>

            <div className="mt-3 flex items-center gap-2 text-sm text-[#091413]/65">
              <MapPin size={14} className="text-[#AC7F5E]" />
              <span>Alamat belum diatur</span>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-2xl border border-[#AC7F5E] px-5 py-3 text-sm font-semibold text-[#AC7F5E] transition hover:bg-[#AC7F5E] hover:text-white">
            <Edit3 size={16} />
            Edit Profil
          </button>
        </div>
      </div>

      {/* Store Info */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-6">
          <h3 className="mb-4 text-lg font-semibold text-[#091413]">Informasi Toko</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#091413]/65">Nama Toko</label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-3.5">
                <Store size={18} className="text-[#AC7F5E]" />
                <input
                  type="text"
                  defaultValue={user?.fullname || ""}
                  className="w-full bg-transparent outline-none placeholder:text-[#091413]/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#091413]/65">Alamat</label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-3.5">
                <MapPin size={18} className="text-[#AC7F5E]" />
                <input
                  type="text"
                  placeholder="Jl. Contoh No. 123"
                  className="w-full bg-transparent outline-none placeholder:text-[#091413]/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#091413]/65">Deskripsi</label>
              <div className="flex items-start gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-3.5">
                <FileText size={18} className="mt-0.5 text-[#AC7F5E]" />
                <textarea
                  rows={3}
                  placeholder="Ceritakan tentang restoran kamu..."
                  className="w-full resize-none bg-transparent outline-none placeholder:text-[#091413]/30"
                />
              </div>
            </div>

            <button className="flex items-center gap-2 rounded-2xl bg-[#AC7F5E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8B6A4A]">
              <Save size={16} />
              Simpan Perubahan
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-6">
          <h3 className="mb-4 text-lg font-semibold text-[#091413]">Jam Operasional</h3>
          <div className="space-y-3">
            {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((day) => (
              <div key={day} className="flex items-center justify-between rounded-xl border border-[#F1EBE3] bg-[#FFFAF5] p-3">
                <span className="text-sm font-medium text-[#091413]">{day}</span>
                <span className="text-sm text-[#091413]/65">08:00 - 21:00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
