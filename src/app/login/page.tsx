"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Leaf, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      const user = useAuthStore.getState().user;
      if (user?.role === "MERCHANT") {
        router.push("/seller");
      } else {
        router.push("/menu");
      }
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
            Food Rescue
          </h1>

          <p className="text-lg leading-relaxed text-white/60">
            Selamatkan makanan, hemat uang, dan bantu lingkungan. Bergabunglah
            dengan ribuan orang yang sudah berkontribusi.
          </p>

          <div className="mt-12 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#7BBF9C]">12K+</p>
              <p className="text-sm text-white/50">Makanan Diselamatkan</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#C4A882]">3.2 ton</p>
              <p className="text-sm text-white/50">Limbah Dicegah</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Form */}
      <div className="flex w-full items-center justify-center bg-[#FFFCFB] px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-2 flex items-center gap-2 lg:hidden">
            <Leaf size={24} className="text-[#5B8A6B]" />
            <span className="text-xl font-bold text-[#091413]">Food Rescue</span>
          </div>

          <h2 className="mb-2 font-serif text-4xl text-[#091413]">
            Selamat Datang
          </h2>

          <p className="mb-8 text-[#091413]/60">
            Masuk ke akun kamu untuk mulai menyelamatkan makanan
          </p>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
              {error}
              <button onClick={clearError} className="ml-2 font-semibold underline">
                Tutup
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#091413]">
                Email
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-4 transition focus-within:border-[#AC7F5E]">
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
              <div className="flex items-center gap-3 rounded-2xl border border-[#E7DAC8] bg-[#FFFCFB] px-5 py-4 transition focus-within:border-[#AC7F5E]">
                <Lock size={18} className="text-[#AC7F5E]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
                  Masuk
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#091413]/60">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#AC7F5E] transition hover:underline"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
