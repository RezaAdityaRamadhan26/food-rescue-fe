"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import {
  Bell,
  ChevronRight,
  Clock3,
  Leaf,
  Package,
  Search,
  ShoppingBag,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";
import Image from "next/image";

const weeklyData = [
  { day: "Mon", rescue: 12 },
  { day: "Tue", rescue: 19 },
  { day: "Wed", rescue: 15 },
  { day: "Thu", rescue: 28 },
  { day: "Fri", rescue: 24 },
  { day: "Sat", rescue: 32 },
  { day: "Sun", rescue: 21 },
];

const impactData = [
  { name: "Completed", value: 68 },
  { name: "Pending", value: 20 },
  { name: "Cancelled", value: 12 },
];

const recentOrders = [
  {
    id: 1,
    customer: "Sari Dewi",
    product: "Nasi Box Ayam",
    status: "Completed",
    time: "12 mins ago",
  },
  {
    id: 2,
    customer: "Rian Saputra",
    product: "Roti Bakery",
    status: "Pending",
    time: "28 mins ago",
  },
  {
    id: 3,
    customer: "Amanda Putri",
    product: "Sayur Segar",
    status: "Processing",
    time: "1 hour ago",
  },
];

const stats = [
  {
    title: "Total Rescue",
    value: "1,284",
    growth: "+12%",
    icon: ShoppingBag,
  },
  {
    title: "Food Saved",
    value: "842 kg",
    growth: "+18%",
    icon: Package,
  },
  {
    title: "CO₂ Reduced",
    value: "2.1 ton",
    growth: "+9%",
    icon: Leaf,
  },
  {
    title: "Customers",
    value: "542",
    growth: "+21%",
    icon: Users,
  },
];

export default function SellerDashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#FFFCFB]">
      <main className="min-h-screen flex-1 ">
        <div>
          <div className="mb-5 flex flex-col gap-4 rounded-[24px] border border-[#EEE7DE] bg-[#FFFCFB] p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex h-12 w-full items-center gap-3 rounded-2xl border border-[#EFE7DD] bg-[#FFFCFB] px-4 lg:max-w-md">
              <Search size={18} className="text-[#091413]/55" />

              <input
                type="text"
                placeholder="Search orders, customer..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#091413]/55"
              />
            </div>

            {/* PROFILE */}
            <div className="flex items-center gap-3">
              <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#EFE7DD] bg-[#FAF8F5] transition hover:scale-105">
                <Bell size={18} className="text-[#AC7F5E]" />
              </button>

              <div className="flex items-center gap-3 rounded-2xl border border-[#EFE7DD] bg-[#FAF8F5] px-3 py-2">
                <Image
                  src="/images/avatar.png"
                  alt="Profile"
                  width={48}
                  height={48}
                  className="overflow-hidden rounded-full h-12 w-12 object-cover"
                />

                <div>
                  <h3 className="text-sm font-semibold text-[#091413]">
                    Warung Bu Devi
                  </h3>

                  <p className="text-xs text-[#091413]/65">devi@foodrescue.id</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="font-serif text-5xl text-[#091413]">Dashboard</h1>

              <p className="mt-2 text-sm text-[#091413]/65">
                Monitor rescue makanan dan performa UMKM kamu.
              </p>
            </div>

            <div className="flex gap-3">
              <button className="rounded-2xl bg-[#AC7F5E] px-5 py-3 text-sm font-semibold text-[#FFFCFB] transition hover:scale-[1.02]">
                + Tambah Produk
              </button>

              <button className="rounded-2xl border border-[#AC7F5E] px-5 py-3 text-sm font-semibold text-[#AC7F5E] transition hover:bg-[#AC7F5E] hover:text-[#FFFCFB]">
                Export Data
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-[28px] border p-5 ${
                    index === 0
                      ? "border-[#28553D] bg-linear-to-br from-[#AC7F5E] to-[#BBAB8C] text-[#FFFCFB]"
                      : "border-[#EEE7DE] bg-[#FFFCFB]"
                  }`}
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <p
                        className={`text-sm ${
                          index === 0 ? "text-[#FFFCFB]" : "text-[#091413]/65"
                        }`}
                      >
                        {item.title}
                      </p>

                      <h2 className="mt-3 text-5xl font-bold">{item.value}</h2>
                    </div>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                        index === 0
                          ? "bg-[#FFFCFB]/10"
                          : "bg-[#F5EFE6] text-[#7C5B3A]"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp size={15} />

                    <span>{item.growth} bulan ini</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
            {/* CHART */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-5 xl:col-span-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#091413]">
                    Weekly Rescue Activity
                  </h2>

                  <p className="text-sm text-[#9E8A78]">
                    Aktivitas rescue makanan minggu ini
                  </p>
                </div>

                <button className="rounded-xl bg-[#BBAB8C] px-3 py-2 text-sm text-[#FFFCFB]">
                  Weekly
                </button>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient
                        id="colorRescue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#AC7F5E"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#BBAB8C"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#EFE7DD" />

                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#AC7F5E", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="rescue"
                      stroke="#AC7F5E"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRescue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* IMPACT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-5 xl:col-span-5"
            >
              <div className="mb-5">
                <h2 className="text-xl font-semibold text-[#091413]">
                  Rescue Impact
                </h2>

                <p className="text-sm text-[#9E8A78]">
                  Distribusi status rescue
                </p>
              </div>

              <div className="h-70">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={impactData}
                      dataKey="value"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={4}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-5 flex justify-center gap-5">
                {impactData.map((item) => (
                  <div key={item.name} className="text-center">
                    <h3 className="text-lg font-bold text-[#091413]">
                      {item.value}%
                    </h3>

                    <p className="text-xs text-[#091413]/65">{item.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ORDERS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-5 xl:col-span-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#091413]">
                    Recent Orders
                  </h2>

                  <p className="text-sm text-[#091413]/65">
                    Pesanan rescue terbaru
                  </p>
                </div>

                <button className="flex items-center gap-1 text-sm font-medium text-[#BBAB8C]">
                  View all
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-2xl border border-[#F1EBE3] bg-[#FFFCFB] p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFFCFB]">
                        <ShoppingBag size={18} className="text-[#AC7F5E]" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#091413]">
                          {order.customer}
                        </h3>

                        <p className="text-sm text-[#091413]/65">
                          {order.product}
                        </p>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="rounded-full bg-[#BBAB8C] px-3 py-1 text-xs font-semibold text-[#FFFCFB]">
                        {order.status}
                      </div>

                      <div className="mt-2 flex items-center justify-end gap-1 text-xs text-[#091413]/65">
                        <Clock3 size={12} />
                        {order.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* MINI CHART */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-5 xl:col-span-4"
            >
              <div className="mb-5">
                <h2 className="text-xl font-semibold text-[#091413]">
                  Product Analytics
                </h2>

                <p className="text-sm text-[#091413]/65">
                  Produk paling banyak diselamatkan
                </p>
              </div>

              <div className="h-65">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFE7DD" />

                    <XAxis dataKey="day" axisLine={false} tickLine={false} />

                    <Tooltip />

                    <Bar
                      dataKey="rescue"
                      radius={[20, 20, 0, 0]}
                      fill="#AC7F5E"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* STORE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-[28px] bg-linear-to-br from-[#AC7F5E] to-[#BBAB8C] p-6 text-[#FFFCFB] xl:col-span-12"
            >
              <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-[#FFFCFB]/5" />

              <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFFCFB]/10">
                    <Store size={28} />
                  </div>

                  <h2 className="text-3xl font-bold">
                    Tingkatkan Rescue UMKM Kamu 🚀
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm text-[#FFFCFB]/75">
                    Tambahkan produk baru, tingkatkan diskon rescue, dan bantu
                    lebih banyak makanan terselamatkan hari ini.
                  </p>
                </div>

                <button className="h-fit rounded-2xl bg-[#FFFCFB] px-6 py-4 font-semibold text-[#AC7F5E] transition hover:scale-[1.03]">
                  Manage Store
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
