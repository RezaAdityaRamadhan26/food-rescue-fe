"use client";

import {
  BarChart3,
  TrendingUp,
  ShoppingBag,
  Users,
  Leaf,
  ArrowUpRight,
} from "lucide-react";

export default function SellerAnalyticsPage() {
  const metrics = [
    { title: "Total Penjualan", value: "Rp 12.4jt", change: "+18%", icon: TrendingUp },
    { title: "Pesanan Bulan Ini", value: "284", change: "+12%", icon: ShoppingBag },
    { title: "Pelanggan Unik", value: "156", change: "+21%", icon: Users },
    { title: "CO₂ Dicegah", value: "842 kg", change: "+9%", icon: Leaf },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-5xl text-[#091413]">Analytics</h1>
        <p className="mt-2 text-sm text-[#091413]/65">
          Pantau performa dan dampak lingkungan restoranmu.
        </p>
      </div>

      {/* Metrics */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`rounded-[28px] border p-6 ${
                index === 0
                  ? "border-[#28553D] bg-gradient-to-br from-[#AC7F5E] to-[#BBAB8C] text-white"
                  : "border-[#EEE7DE] bg-[#FFFCFB]"
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    index === 0 ? "bg-white/10" : "bg-[#F5EFE6] text-[#7C5B3A]"
                  }`}
                >
                  <Icon size={22} />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-green-500">
                  <ArrowUpRight size={14} />
                  {item.change}
                </div>
              </div>
              <p className={`text-sm ${index === 0 ? "text-white/75" : "text-[#091413]/65"}`}>
                {item.title}
              </p>
              <h2 className="mt-1 text-3xl font-bold">{item.value}</h2>
            </div>
          );
        })}
      </div>

      {/* Placeholder Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-6">
          <h2 className="mb-2 text-xl font-semibold text-[#091413]">Tren Penjualan</h2>
          <p className="mb-6 text-sm text-[#091413]/65">Grafik penjualan 30 hari terakhir</p>
          <div className="flex h-48 items-center justify-center rounded-2xl bg-[#F5EFE6]">
            <div className="text-center">
              <BarChart3 size={40} className="mx-auto mb-2 text-[#AC7F5E]/40" />
              <p className="text-sm text-[#091413]/40">Grafik akan tersedia segera</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-6">
          <h2 className="mb-2 text-xl font-semibold text-[#091413]">Produk Terlaris</h2>
          <p className="mb-6 text-sm text-[#091413]/65">Produk paling banyak dipesan</p>
          <div className="flex h-48 items-center justify-center rounded-2xl bg-[#F5EFE6]">
            <div className="text-center">
              <ShoppingBag size={40} className="mx-auto mb-2 text-[#AC7F5E]/40" />
              <p className="text-sm text-[#091413]/40">Data akan tersedia segera</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
