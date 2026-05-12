"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Leaf,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

interface Order {
  id: string;
  userId: string;
  quantity: number;
  netSellerRevenue: number;
  totalPaidByBuyer: number;
  status: string;
  createdAt: string;
  product?: {
    name: string;
  };
}

export default function SellerAnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch owned products independently
      try {
        const prodRes = await axiosInstance.get("/products/owned");
        setProducts(prodRes.data.data || []);
      } catch (err) {
        console.error("Error fetching owned products on analytics:", err);
        setProducts([]);
      }

      // Fetch orders independently
      try {
        const orderRes = await axiosInstance.get("/orders");
        setOrders(orderRes.data.data || []);
      } catch (err) {
        console.error("Error fetching orders on analytics:", err);
        setOrders([]);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Format IDR Price
  const formatPrice = (price: number) => {
    if (price >= 1_000_000) {
      return `Rp ${(price / 1_000_000).toFixed(1)}jt`;
    }
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  // Computations
  const completedOrders = orders.filter((o) => o.status === "COMPLETED");
  const activeOrders = orders.filter((o) => o.status !== "CANCELLED");

  // Metric 1: Total Revenue
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.netSellerRevenue, 0);

  // Metric 2: Orders This Month
  const now = new Date();
  const currentMonthOrders = orders.filter((o) => {
    if (!o.createdAt) return false;
    const orderDate = new Date(o.createdAt);
    return (
      orderDate.getMonth() === now.getMonth() &&
      orderDate.getFullYear() === now.getFullYear()
    );
  });
  const ordersThisMonthCount = currentMonthOrders.length;

  // Metric 3: Unique Customers
  const uniqueCustomersCount = new Set(activeOrders.map((o) => o.userId)).size;

  // Metric 4: CO₂ Prevented (portions saved * 1.5kg)
  const totalRescuedPortions = completedOrders.reduce((sum, o) => sum + o.quantity, 0);
  const co2Saved = totalRescuedPortions * 1.5;

  const metrics = [
    {
      title: "Total Penjualan",
      value: formatPrice(totalRevenue),
      change: orders.length > 0 ? "Realtime" : "No Data",
      icon: TrendingUp,
    },
    {
      title: "Pesanan Masuk",
      value: String(orders.length),
      change: `Bulan ini: ${ordersThisMonthCount}`,
      icon: ShoppingBag,
    },
    {
      title: "Pelanggan Unik",
      value: String(uniqueCustomersCount),
      change: "Aktif",
      icon: Users,
    },
    {
      title: "CO₂ Dicegah",
      value: `${co2Saved.toFixed(1)} kg`,
      change: `Porti: ${totalRescuedPortions}`,
      icon: Leaf,
    },
  ];

  // Graph 1: Sales Trend (Last 7 days)
  const salesTrendData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });

    const dailyRevenue = orders
      .filter(
        (o) =>
          o.status === "COMPLETED" &&
          o.createdAt &&
          new Date(o.createdAt).toDateString() === d.toDateString()
      )
      .reduce((sum, o) => sum + o.netSellerRevenue, 0);

    const dailyOrdersCount = orders.filter(
      (o) =>
        o.createdAt &&
        new Date(o.createdAt).toDateString() === d.toDateString()
    ).length;

    return {
      date: dateStr,
      "Revenue (Rp)": dailyRevenue,
      "Pesanan": dailyOrdersCount,
    };
  });

  // Graph 2: Best Selling Products
  const productSalesMap: Record<string, number> = {};
  completedOrders.forEach((o) => {
    if (o.product) {
      const prodName = o.product.name;
      productSalesMap[prodName] = (productSalesMap[prodName] || 0) + o.quantity;
    }
  });

  const topProductsData = Object.entries(productSalesMap)
    .map(([name, sales]) => ({
      name: name.length > 15 ? name.substring(0, 15) + "..." : name,
      "Terjual": sales,
    }))
    .sort((a, b) => b["Terjual"] - a["Terjual"])
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFCFB]">
        <div className="h-12 w-12 animate-spin rounded-full border-3 border-[#AC7F5E]/20 border-t-[#AC7F5E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFCFB] p-6 pt-24 lg:px-16">
      <div className="mb-6">
        <h1 className="font-serif text-5xl text-[#091413]">Analytics</h1>
        <p className="mt-2 text-sm text-[#091413]/65">
          Pantau performa finansial dan dampak lingkungan penyelamatan makanan restoran Anda.
        </p>
      </div>

      {/* Metrics */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`rounded-[28px] border p-6 shadow-[0_4px_20px_rgba(45,31,20,0.03)] ${
                index === 0
                  ? "border-[#28553D] bg-gradient-to-br from-[#AC7F5E] to-[#BBAB8C] text-white"
                  : "border-[#EEE7DE] bg-[#FFFCFB]"
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    index === 0 ? "bg-white/10 text-white" : "bg-[#F5EFE6] text-[#7C5B3A]"
                  }`}
                >
                  <Icon size={22} />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-1 ${
                    index === 0 ? "bg-white/15 text-white" : "bg-[#F2EFE9] text-[#7C5B3A]"
                  }`}
                >
                  {index === 0 && <ArrowUpRight size={12} />}
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

      {/* Charts section */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Sales Trend Chart */}
        <div className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-6 shadow-[0_4px_20px_rgba(45,31,20,0.03)]">
          <h2 className="text-xl font-semibold text-[#091413]">Tren Pendapatan</h2>
          <p className="mb-6 text-sm text-[#091413]/65">Grafik pendapatan bersih 7 hari terakhir</p>
          
          <div className="h-64 w-full">
            {isMounted && completedOrders.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesTrendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#AC7F5E" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#AC7F5E" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1ECE6" vertical={false} />
                  <XAxis dataKey="date" stroke="#091413" opacity={0.4} fontSize={12} tickLine={false} />
                  <YAxis stroke="#091413" opacity={0.4} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFCFB",
                      borderRadius: "16px",
                      border: "1px solid #EEE7DE",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Revenue (Rp)"
                    stroke="#AC7F5E"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl bg-[#F5EFE6]">
                <div className="text-center p-6">
                  <BarChart3 size={36} className="mx-auto mb-2 text-[#AC7F5E]/40" />
                  <p className="text-sm font-medium text-[#091413]/60">Belum Ada Transaksi Selesai</p>
                  <p className="text-xs text-[#091413]/40 mt-1">Pendapatan akan tercatat otomatis saat pesanan selesai.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-6 shadow-[0_4px_20px_rgba(45,31,20,0.03)]">
          <h2 className="text-xl font-semibold text-[#091413]">Produk Terlaris</h2>
          <p className="mb-6 text-sm text-[#091413]/65">Produk paling banyak diselamatkan oleh pembeli</p>

          <div className="h-64 w-full">
            {isMounted && topProductsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProductsData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1ECE6" vertical={false} />
                  <XAxis dataKey="name" stroke="#091413" opacity={0.4} fontSize={11} tickLine={false} />
                  <YAxis stroke="#091413" opacity={0.4} fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFCFB",
                      borderRadius: "16px",
                      border: "1px solid #EEE7DE",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Bar dataKey="Terjual" fill="#BBAB8C" radius={[8, 8, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl bg-[#F5EFE6]">
                <div className="text-center p-6">
                  <ShoppingBag size={36} className="mx-auto mb-2 text-[#AC7F5E]/40" />
                  <p className="text-sm font-medium text-[#091413]/60">Belum Ada Penjualan Produk</p>
                  <p className="text-xs text-[#091413]/40 mt-1">Data penjualan produk akan dihitung otomatis.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
