"use client";

import { useEffect, useState } from "react";
import { Store, MapPin, FileText, Edit3, Save, X, Clock, Check, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";
import { motion, AnimatePresence } from "framer-motion";

interface OperationalHour {
  day: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

const defaultHours: OperationalHour[] = [
  { day: "Senin", openTime: "08:00", closeTime: "21:00", isClosed: false },
  { day: "Selasa", openTime: "08:00", closeTime: "21:00", isClosed: false },
  { day: "Rabu", openTime: "08:00", closeTime: "21:00", isClosed: false },
  { day: "Kamis", openTime: "08:00", closeTime: "21:00", isClosed: false },
  { day: "Jumat", openTime: "08:00", closeTime: "21:00", isClosed: false },
  { day: "Sabtu", openTime: "09:00", closeTime: "22:00", isClosed: false },
  { day: "Minggu", openTime: "09:00", closeTime: "22:00", isClosed: true },
];

export default function SellerStorePage() {
  const { user, token, fetchProfile } = useAuthStore();

  // Store information states
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  // Operational hours states
  const [hours, setHours] = useState<OperationalHour[]>(defaultHours);
  const [isEditingHours, setIsEditingHours] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
  }, [token, user, fetchProfile]);

  // Load store profile and hours from localStorage on mount/user load
  useEffect(() => {
    if (user?.id) {
      // 1. Store Details
      const storedName = localStorage.getItem(`store_name_${user.id}`);
      const storedAddress = localStorage.getItem(`store_address_${user.id}`);
      const storedDesc = localStorage.getItem(`store_desc_${user.id}`);

      setStoreName(storedName || user.fullname || "");
      setAddress(storedAddress || "Jl. Nusantara No. 45, Jakarta");
      setDescription(storedDesc || "Restoran keluarga menyajikan hidangan lokal berkualitas tinggi dengan konsep zero food waste.");

      // 2. Operational Hours
      const storedHours = localStorage.getItem(`operational_hours_${user.id}`);
      if (storedHours) {
        try {
          setHours(JSON.parse(storedHours));
        } catch (e) {
          console.error("Failed to parse operational hours:", e);
        }
      } else {
        setHours(defaultHours);
      }
    }
  }, [user]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Save Store Details
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    localStorage.setItem(`store_name_${user.id}`, storeName);
    localStorage.setItem(`store_address_${user.id}`, address);
    localStorage.setItem(`store_desc_${user.id}`, description);

    showToast("Profil Toko Berhasil Diperbarui!");
    setIsEditingInfo(false);
  };

  // Save Operational Hours
  const handleSaveHours = () => {
    if (!user?.id) return;

    localStorage.setItem(`operational_hours_${user.id}`, JSON.stringify(hours));
    showToast("Jam Operasional Berhasil Disimpan!");
    setIsEditingHours(false);
  };

  const handleHourChange = (index: number, field: keyof OperationalHour, value: any) => {
    const updated = [...hours];
    updated[index] = { ...updated[index], [field]: value };
    setHours(updated);
  };

  return (
    <div className="min-h-screen bg-[#FFFCFB] p-6 pt-24 lg:px-16">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl px-5 py-3.5 shadow-xl backdrop-blur-md ${
              toastType === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {toastType === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6">
        <h1 className="font-serif text-5xl text-[#091413]">My Store</h1>
        <p className="mt-2 text-sm text-[#091413]/65">
          Kelola profil toko, alamat restoran, dan jadwal operasional mingguan Anda.
        </p>
      </div>

      {/* Store Profile Card */}
      <div className="mb-6 rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-6 shadow-[0_4px_20px_rgba(45,31,20,0.03)]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-[#AC7F5E] to-[#BBAB8C]">
            <Store size={36} className="text-white" />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#091413]">
              {storeName || user?.fullname || "Restoran Saya"}
            </h2>
            <p className="mt-1 text-sm text-[#091413]/65">{user?.email}</p>

            <div className="mt-3 flex items-center gap-2 text-sm text-[#091413]/65">
              <MapPin size={14} className="text-[#AC7F5E]" />
              <span>{address}</span>
            </div>
          </div>

          <button
            onClick={() => setIsEditingInfo(!isEditingInfo)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-[#AC7F5E] px-5 py-3 text-sm font-semibold text-[#AC7F5E] transition hover:bg-[#AC7F5E] hover:text-white"
          >
            <Edit3 size={16} />
            {isEditingInfo ? "Batal Edit" : "Edit Profil"}
          </button>
        </div>
      </div>

      {/* Store Info & Operational Hours Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Info Form */}
        <div className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-6 shadow-[0_4px_20px_rgba(45,31,20,0.03)]">
          <h3 className="mb-5 text-lg font-semibold text-[#091413]">Informasi Toko</h3>
          
          <form onSubmit={handleSaveInfo} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#091413]/65 uppercase tracking-wider">Nama Toko</label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-4 py-3 focus-within:border-[#AC7F5E] transition">
                <Store size={18} className="text-[#AC7F5E]" />
                <input
                  type="text"
                  required
                  disabled={!isEditingInfo}
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Masukkan nama restoran Anda"
                  className="w-full bg-transparent outline-none disabled:text-[#091413]/50"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#091413]/65 uppercase tracking-wider">Alamat</label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-4 py-3 focus-within:border-[#AC7F5E] transition">
                <MapPin size={18} className="text-[#AC7F5E]" />
                <input
                  type="text"
                  required
                  disabled={!isEditingInfo}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Jl. Contoh No. 123"
                  className="w-full bg-transparent outline-none disabled:text-[#091413]/50"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#091413]/65 uppercase tracking-wider">Deskripsi</label>
              <div className="flex items-start gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-4 py-3 focus-within:border-[#AC7F5E] transition">
                <FileText size={18} className="mt-0.5 text-[#AC7F5E]" />
                <textarea
                  rows={4}
                  required
                  disabled={!isEditingInfo}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan tentang restoran Anda..."
                  className="w-full resize-none bg-transparent outline-none disabled:text-[#091413]/50"
                />
              </div>
            </div>

            {isEditingInfo && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                type="submit"
                className="flex items-center gap-2 rounded-2xl bg-[#AC7F5E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8B6A4A] shadow-md"
              >
                <Save size={16} />
                Simpan Perubahan
              </motion.button>
            )}
          </form>
        </div>

        {/* Operational Hours */}
        <div className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-6 shadow-[0_4px_20px_rgba(45,31,20,0.03)]">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#091413]">Jam Operasional</h3>
            
            <button
              onClick={() => setIsEditingHours(!isEditingHours)}
              className="flex items-center gap-1.5 rounded-xl border border-[#EEE2D4] bg-[#FDFAF6] px-3.5 py-1.5 text-xs font-semibold text-[#7C5B3A] transition hover:bg-[#F5EFE6]"
            >
              {isEditingHours ? (
                <>
                  <X size={14} />
                  Batal
                </>
              ) : (
                <>
                  <Edit3 size={14} />
                  Atur Jadwal
                </>
              )}
            </button>
          </div>

          {/* Operational Hours List / Form */}
          <div className="space-y-3">
            {hours.map((item, index) => (
              <div
                key={item.day}
                className={`flex flex-col gap-3 rounded-2xl border p-4 transition duration-300 sm:flex-row sm:items-center sm:justify-between ${
                  item.isClosed
                    ? "border-[#F1EBE3] bg-[#FAF8F5]/60 text-[#091413]/40"
                    : "border-[#F1EBE3] bg-[#FFFAF5]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock size={16} className={item.isClosed ? "text-[#091413]/30" : "text-[#AC7F5E]"} />
                  <span className="text-sm font-bold text-[#091413]">{item.day}</span>
                </div>

                {isEditingHours ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Status Toggle */}
                    <button
                      type="button"
                      onClick={() => handleHourChange(index, "isClosed", !item.isClosed)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                        item.isClosed
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      }`}
                    >
                      {item.isClosed ? "Tutup" : "Buka"}
                    </button>

                    {/* Time Input controls */}
                    {!item.isClosed && (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="time"
                          value={item.openTime}
                          onChange={(e) => handleHourChange(index, "openTime", e.target.value)}
                          className="rounded-xl border border-[#E7DAC8] bg-white px-2.5 py-1 text-xs outline-none text-[#091413] font-medium"
                        />
                        <span className="text-xs text-[#091413]/40">-</span>
                        <input
                          type="time"
                          value={item.closeTime}
                          onChange={(e) => handleHourChange(index, "closeTime", e.target.value)}
                          className="rounded-xl border border-[#E7DAC8] bg-white px-2.5 py-1 text-xs outline-none text-[#091413] font-medium"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {item.isClosed ? (
                      <span className="rounded-full bg-red-50 border border-red-100 px-3 py-1 text-xs font-bold text-red-500">
                        Tutup
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-[#091413]/75">
                        {item.openTime} - {item.closeTime}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isEditingHours && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleSaveHours}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#AC7F5E] py-3.5 text-sm font-bold text-white transition hover:bg-[#8B6A4A] shadow-md"
              >
                <Save size={16} />
                Simpan Jam Operasional
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
