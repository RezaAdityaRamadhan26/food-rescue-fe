"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Leaf,
  Mail,
  Lock,
  User,
  Store,
  MapPin,
  FileText,
  ArrowRight,
} from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";

type Role = "CUSTOMER" | "MERCHANT";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [role, setRole] = useState<Role>("CUSTOMER");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Merchant fields
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: any = { fullname, email, password, role };

    if (role === "MERCHANT") {
      data.restaurantName = restaurantName;
      data.restaurantAddress = restaurantAddress;
      data.restaurantDescription = restaurantDescription;
    }

    const success = await register(data);
    if (success) {
      router.push("/login");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT — Branding */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-br from-[#3D2C1E] via-[#5C3D22] to-[#4A3728] lg:flex">
        <div className="absolute top-0 right-0 h-96 w-96 translate-x-[30%] translate-y-[-30%] rounded-full bg-[radial-gradient(circle,#C4A882,transparent)] opacity-15" />
        <div className="absolute bottom-0 left-0 h-80 w-80 translate-x-[-30%] translate-y-[30%] rounded-full bg-[radial-gradient(circle,#5B8A6B,transparent)] opacity-10" />

        <div className="relative z-10 max-w-md px-12 text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
            <Leaf size={40} className="text-[#7BBF9C]" />
          </div>

          <h1 className="mb-4 font-serif text-5xl leading-tight text-white">
            Bergabunglah
          </h1>

          <p className="text-lg leading-relaxed text-white/60">
            Jadilah bagian dari komunitas yang peduli terhadap lingkungan dan membantu
            mengurangi limbah makanan di Indonesia.
          </p>
        </div>
      </div>

      {/* RIGHT — Form */}
      <div className="flex w-full items-center justify-center bg-[#FFFCFB] px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-2 flex items-center gap-2 lg:hidden">
            <Leaf size={24} className="text-[#5B8A6B]" />
            <span className="text-xl font-bold text-[#091413]">Food Rescue</span>
          </div>

          <h2 className="mb-2 font-serif text-4xl text-[#091413]">Buat Akun</h2>

          <p className="mb-8 text-[#091413]/60">
            Pilih jenis akun dan isi informasi kamu
          </p>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
              {error}
              <button onClick={clearError} className="ml-2 font-semibold underline">
                Tutup
              </button>
            </div>
          )}

          {/* Role Selector */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("CUSTOMER")}
              className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-5 py-4 text-sm font-semibold transition ${
                role === "CUSTOMER"
                  ? "border-[#AC7F5E] bg-[#F4E8D5] text-[#5C4A3A]"
                  : "border-[#E7DAC8] bg-[#FFFCFB] text-[#091413]/60"
              }`}
            >
              <User size={18} />
              Pembeli
            </button>

            <button
              type="button"
              onClick={() => setRole("MERCHANT")}
              className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-5 py-4 text-sm font-semibold transition ${
                role === "MERCHANT"
                  ? "border-[#AC7F5E] bg-[#F4E8D5] text-[#5C4A3A]"
                  : "border-[#E7DAC8] bg-[#FFFCFB] text-[#091413]/60"
              }`}
            >
              <Store size={18} />
              Penjual (UMKM)
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Fullname */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#091413]">
                Nama Lengkap
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-3.5 transition focus-within:border-[#AC7F5E]">
                <User size={18} className="text-[#AC7F5E]" />
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Nama lengkap kamu"
                  required
                  className="w-full bg-transparent outline-none placeholder:text-[#091413]/30"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#091413]">
                Email
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-3.5 transition focus-within:border-[#AC7F5E]">
                <Mail size={18} className="text-[#AC7F5E]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-transparent outline-none placeholder:text-[#091413]/30"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#091413]">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-3.5 transition focus-within:border-[#AC7F5E]">
                <Lock size={18} className="text-[#AC7F5E]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  required
                  className="w-full bg-transparent outline-none placeholder:text-[#091413]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#091413]/40 transition hover:text-[#091413]/70"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Merchant Fields */}
            {role === "MERCHANT" && (
              <div className="space-y-4 rounded-2xl border border-dashed border-[#D8C2A3] bg-[#FFF8EE] p-5">
                <p className="text-sm font-semibold text-[#5C4A3A]">
                  Informasi Restoran
                </p>

                <div className="flex items-center gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-3.5">
                  <Store size={18} className="text-[#AC7F5E]" />
                  <input
                    type="text"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    placeholder="Nama restoran"
                    required
                    className="w-full bg-transparent outline-none placeholder:text-[#091413]/30"
                  />
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-3.5">
                  <MapPin size={18} className="text-[#AC7F5E]" />
                  <input
                    type="text"
                    value={restaurantAddress}
                    onChange={(e) => setRestaurantAddress(e.target.value)}
                    placeholder="Alamat restoran"
                    required
                    className="w-full bg-transparent outline-none placeholder:text-[#091413]/30"
                  />
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-3.5">
                  <FileText size={18} className="mt-0.5 text-[#AC7F5E]" />
                  <textarea
                    value={restaurantDescription}
                    onChange={(e) => setRestaurantDescription(e.target.value)}
                    placeholder="Deskripsi singkat (opsional)"
                    rows={2}
                    className="w-full resize-none bg-transparent outline-none placeholder:text-[#091413]/30"
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#BBAB8C] py-4 text-lg font-semibold text-white transition hover:bg-[#9c8f76] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Daftar
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#091413]/60">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#AC7F5E] transition hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
