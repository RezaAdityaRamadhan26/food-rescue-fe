"use client";

import { useState, useEffect } from "react";
import { Settings, Bell, Shield, User, Globe, Check, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";
import axiosInstance from "@/lib/axios";
import { motion, AnimatePresence } from "framer-motion";

export default function SellerSettingsPage() {
  const { user, token, fetchProfile } = useAuthStore();

  // Password change states
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
  }, [token, user, fetchProfile]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 6) {
      setPasswordError("Sandi baru harus terdiri dari minimal 6 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Konfirmasi sandi baru tidak cocok.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosInstance.put("/auth/profile", { password: newPassword });
      setPasswordSuccess("Sandi Anda berhasil diperbarui!");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setIsChangingPassword(false);
        setPasswordSuccess(null);
      }, 3000);
    } catch (err: any) {
      setPasswordError(
        err.response?.data?.message || "Gagal memperbarui sandi. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="min-h-screen bg-[#FFFCFB] p-6 pt-24 lg:px-16">
      <div className="mb-6">
        <h1 className="font-serif text-5xl text-[#091413]">Settings</h1>
        <p className="mt-2 text-sm text-[#091413]/65">
          Kelola pengaturan akun, preferensi notifikasi, dan keamanan sistem Anda.
        </p>
      </div>

      <div className="space-y-5">
        {settingSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-6 shadow-[0_4px_20px_rgba(45,31,20,0.02)]"
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
                    <span className="text-sm text-[#091413] font-medium">{item.label}</span>
                    
                    {item.label === "Kata Sandi" ? (
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-[#091413]/65 font-mono">{item.value}</span>
                        <button
                          onClick={() => {
                            setIsChangingPassword(!isChangingPassword);
                            setPasswordError(null);
                            setPasswordSuccess(null);
                          }}
                          className="rounded-lg bg-[#AC7F5E]/10 px-3 py-1.5 text-xs font-bold text-[#AC7F5E] hover:bg-[#AC7F5E]/20 transition"
                        >
                          {isChangingPassword ? "Batal" : "Ubah"}
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-[#091413]/65">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Password Change Expandable Section */}
              <AnimatePresence>
                {section.title === "Keamanan" && isChangingPassword && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handlePasswordSubmit}
                    className="mt-4 space-y-4 border-t border-[#F1EBE3] pt-4 overflow-hidden"
                  >
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-[#AC7F5E]" />
                      <h4 className="text-sm font-bold text-[#091413]">Atur Sandi Baru</h4>
                    </div>

                    {passwordError && (
                      <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600 border border-red-100">
                        <AlertCircle size={14} />
                        <span>{passwordError}</span>
                      </div>
                    )}

                    {passwordSuccess && (
                      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-700 border border-emerald-100">
                        <Check size={14} />
                        <span>{passwordSuccess}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#091413]/65 uppercase tracking-wider">Sandi Baru</label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Minimal 6 karakter"
                          className="w-full rounded-xl border border-[#E7DAC8] bg-[#FFFCFB] px-4 py-2.5 text-sm outline-none transition focus:border-[#AC7F5E]"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-[#091413]/65 uppercase tracking-wider">Konfirmasi Sandi Baru</label>
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Konfirmasi sandi"
                          className="w-full rounded-xl border border-[#E7DAC8] bg-[#FFFCFB] px-4 py-2.5 text-sm outline-none transition focus:border-[#AC7F5E]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsChangingPassword(false);
                          setNewPassword("");
                          setConfirmPassword("");
                          setPasswordError(null);
                        }}
                        className="rounded-xl border border-[#EEE2D4] px-4 py-2 text-xs font-bold text-[#091413]/60 transition hover:bg-gray-50"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-xl bg-[#AC7F5E] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#8B6A4A] disabled:opacity-50"
                      >
                        {isSubmitting ? "Menyimpan..." : "Simpan Sandi"}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
