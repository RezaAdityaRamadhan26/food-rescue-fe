"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  Clock3,
  Leaf,
  MoreHorizontal,
  Package2,
  Pencil,
  Plus,
  Search,
  Trash2,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Active Foods",
    value: "24",
    desc: "+4 added today",
    color: "bg-[#AC7F5E]",
    text: "text-white",
  },
  {
    title: "Total Rescued",
    value: "1,284",
    desc: "+12% this week",
    color: "bg-[#FDFAF6]",
    text: "text-[#091413]",
  },
  {
    title: "Revenue Today",
    value: "Rp 2.4jt",
    desc: "+18% from yesterday",
    color: "bg-[#FDFAF6]",
    text: "text-[#091413]",
  },
  {
    title: "CO₂ Saved",
    value: "842kg",
    desc: "Environmental impact",
    color: "bg-[#FDFAF6]",
    text: "text-[#091413]",
  },
];

const foods = [
  {
    id: 1,
    image: "/Images/nasi-box.jpg",
    title: "Nasi Box Ayam",
    category: "Indonesian Food",
    originalPrice: "Rp 40.000",
    rescuePrice: "Rp 15.000",
    stock: 8,
    rescued: 12,
    total: 20,
    closing: "1h 20m",
    status: "Available",
    co2: "2.4kg",
  },
  {
    id: 2,
    image: "/images/bakery.jpg",
    title: "Fresh Bakery Bread",
    category: "Bakery",
    originalPrice: "Rp 28.000",
    rescuePrice: "Rp 10.000",
    stock: 3,
    rescued: 17,
    total: 20,
    closing: "45m",
    status: "Low Stock",
    co2: "1.2kg",
  },
  {
    id: 3,
    image: "/images/salad.jpg",
    title: "Healthy Salad Bowl",
    category: "Healthy Food",
    originalPrice: "Rp 35.000",
    rescuePrice: "Rp 14.000",
    stock: 0,
    rescued: 20,
    total: 20,
    closing: "Closed",
    status: "Sold Out",
    co2: "3.1kg",
  },
];

export default function FoodManagementPage() {
  return (
    <div className="min-h-screen bg-[#FFFCFB] p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-serif text-5xl text-[#091413]">
            Food Management
          </h1>

          <p className="mt-2 text-sm text-[#091413]/65">
            Kelola makanan rescue dan stok harian UMKM kamu.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-2xl bg-[#AC7F5E] px-5 py-3 text-sm font-semibold text-[#FFFCFB] transition hover:scale-[1.02]">
            <Plus size={18} />
            Add Food
          </button>

          <button className="rounded-2xl border border-[#AC7F5E] px-5 py-3 text-sm font-semibold text-[#AC7F5E] transition hover:bg-[#AC7F5E] hover:text-[#FFFCFB]">
            Export Data
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`rounded-[28px] border border-[#EEE2D4] p-5 shadow-[0_4px_20px_rgba(45,31,20,0.04)] ${item.color}`}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p
                  className={`text-sm ${
                    index === 0 ? "text-[#FFFCFB]" : "text-[#9E8A78]"
                  }`}
                >
                  {item.title}
                </p>

                <h2 className={`mt-3 text-5xl font-bold ${item.text}`}>
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  index === 0
                    ? "bg-[#FFFCFB]/10 text-[#FFFCFB]"
                    : "bg-[#FFFCFB] text-[#091413]"
                }`}
              >
                <TrendingUp size={20} />
              </div>
            </div>

            <div
              className={`text-sm ${
                index === 0 ? "text-[#FFFCFB]/75" : "text-[#9E8A78]"
              }`}
            >
              {item.desc}
            </div>
          </motion.div>
        ))}
      </div>

      {/* FILTER */}
      <div className="mb-6 rounded-[28px] border border-[#EEE2D4] bg-[#FDFAF6] p-4 shadow-[0_4px_20px_rgba(45,31,20,0.04)]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* SEARCH */}
          <div className="flex h-12 w-full items-center gap-3 rounded-2xl border border-[#EFE7DD] bg-white px-4 xl:max-w-md">
            <Search size={18} className="text-[#A18B76]" />

            <input
              type="text"
              placeholder="Search foods..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#B7A18B]"
            />
          </div>

          {/* FILTER BUTTON */}
          <div className="flex flex-wrap gap-3">
            <button className="rounded-2xl bg-[#AC7F5E] px-4 py-2 text-sm font-semibold text-white">
              All
            </button>

            <button className="rounded-2xl border border-[#EEE2D4] bg-white px-4 py-2 text-sm text-[#7C5B3A]">
              Available
            </button>

            <button className="rounded-2xl border border-[#EEE2D4] bg-white px-4 py-2 text-sm text-[#7C5B3A]">
              Low Stock
            </button>

            <button className="rounded-2xl border border-[#EEE2D4] bg-white px-4 py-2 text-sm text-[#7C5B3A]">
              Sold Out
            </button>
          </div>
        </div>
      </div>

      {/* FOOD GRID */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {foods.map((food, index) => {
          const progress = (food.rescued / food.total) * 100;

          return (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="group overflow-hidden rounded-[30px] border border-[#EEE2D4] bg-[#FDFAF6] shadow-[0_4px_20px_rgba(45,31,20,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(45,31,20,0.08)]"
            >
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={food.image}
                  alt={food.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#091413]/70 via-transparent to-transparent" />

                {/* STATUS */}
                <div className="absolute left-4 top-4">
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      food.status === "Available"
                        ? "bg-[#F5E6D3] text-[#AC7F5E]"
                        : food.status === "Low Stock"
                          ? "bg-[#F5E6D3] text-[#B7791F]"
                          : "bg-[#F8D7DA] text-[#C53030]"
                    }`}
                  >
                    {food.status}
                  </div>
                </div>

                {/* ACTION */}
                <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-[#091413] backdrop-blur-md">
                  <MoreHorizontal size={18} />
                </button>

                {/* COUNTDOWN */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 backdrop-blur-md">
                  <Clock3 size={14} className="text-white" />

                  <span className="text-xs font-medium text-white">
                    Closing in {food.closing}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                {/* TOP */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#091413]">
                      {food.title}
                    </h2>

                    <p className="mt-1 text-sm text-[#9E8A78]">
                      {food.category}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5EFE6] text-[#AC7F5E]">
                    <Package2 size={18} />
                  </div>
                </div>

                {/* PRICE */}
                <div className="mb-5 flex items-end gap-3">
                  <div>
                    <p className="text-xs text-[#9E8A78]">Original</p>

                    <span className="text-sm text-[#B8A898] line-through">
                      {food.originalPrice}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-[#9E8A78]">Rescue</p>

                    <span className="text-2xl font-bold text-[#091413]">
                      {food.rescuePrice}
                    </span>
                  </div>
                </div>

                {/* STOCK */}
                <div className="mb-5 flex items-center justify-between rounded-2xl bg-[#F8F4EF] p-4">
                  <div>
                    <p className="text-xs text-[#9E8A78]">Stock Left</p>

                    <h3 className="mt-1 text-2xl font-bold text-[#091413]">
                      {food.stock}
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-[#9E8A78]">CO₂ Saved</p>

                    <div className="mt-1 flex items-center gap-1 text-[#AC7F5E]">
                      <Leaf size={15} />

                      <span className="font-semibold">{food.co2}</span>
                    </div>
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-[#091413]">
                      Rescue Progress
                    </p>

                    <span className="text-sm text-[#7C5B3A]">
                      {food.rescued}/{food.total}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-[#EEE2D4]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full bg-linear-to-r from-[#AC7F5E] to-[#C4A882]"
                    />
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#AC7F5E] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#EEE2D4] bg-white text-[#B7791F] transition hover:bg-[#F5EFE6]">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
