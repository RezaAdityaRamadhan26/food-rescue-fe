"use client";

import { useEffect, useState } from "react";
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
  Plus,
  CheckCircle,
  XCircle,
  Rocket,
  UtensilsCrossed,
} from "lucide-react";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";

interface OwnedProduct {
  id: string;
  name: string;
  sellingPrice: number;
  originalPrice: number;
  stock: number;
  imageUrl: string | null;
  type: string;
  category: { categoryName: string } | null;
}

interface MerchantOrder {
  id: string;
  quantity: number;
  itemPrice: number;
  totalPaidByBuyer: number;
  netSellerRevenue: number;
  status: string;
  createdAt: string;
  deliveryType: string;
  user: { fullname: string } | null;
  product: { name: string; type: string } | null;
}

const statusColors: Record<string, string> = {
  WAITING_PAYMENT: "bg-yellow-100 text-yellow-700",
  PREPARING: "bg-blue-100 text-blue-700",
  READY_FOR_PICKUP: "bg-green-100 text-green-700",
  ON_THE_WAY: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  WAITING_PAYMENT: "Menunggu",
  PREPARING: "Diproses",
  READY_FOR_PICKUP: "Siap Ambil",
  ON_THE_WAY: "Diantar",
  COMPLETED: "Selesai",
  CANCELLED: "Batal",
};

const nextStatus: Record<string, string> = {
  WAITING_PAYMENT: "PREPARING",
  PREPARING: "READY_FOR_PICKUP",
  READY_FOR_PICKUP: "ON_THE_WAY",
  ON_THE_WAY: "COMPLETED",
};

export default function SellerDashboardPage() {
  const { user, token, fetchProfile } = useAuthStore();
  const router = useRouter();

  const [products, setProducts] = useState<OwnedProduct[]>([]);
  const [orders, setOrders] = useState<MerchantOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
  }, [token, user, fetchProfile]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch owned products independently
      try {
        const [ownedRes, allRes] = await Promise.all([
          axiosInstance.get("/products/owned").catch(() => ({ data: [] })),
          axiosInstance.get("/products", { params: { limit: 100 } }).catch(() => ({ data: [] })),
        ]);

        const ownedData = ownedRes.data?.data?.products || ownedRes.data?.products || ownedRes.data?.data || ownedRes.data || [];
        const ownedArray = Array.isArray(ownedData) ? ownedData : [];

        const allData = allRes.data?.data?.products || allRes.data?.products || allRes.data?.data || allRes.data || [];
        const allArray = Array.isArray(allData) ? allData : [];

        const knownRestIds = new Set(ownedArray.map((p) => p.restaurantId).filter(Boolean));
        if (user?.id) knownRestIds.add(user.id);

        const knownRestNames = new Set(ownedArray.map((p) => p.restaurant?.name).filter(Boolean));
        if (user?.fullname) knownRestNames.add(user.fullname);

        const knownUserIds = new Set(ownedArray.map((p) => p.restaurant?.userId).filter(Boolean));
        if (user?.id) knownUserIds.add(user.id);

        const matchingFromAll = allArray.filter((p) => {
          if (!p) return false;
          if (p.restaurantId && knownRestIds.has(p.restaurantId)) return true;
          if (p.restaurant?.id && knownRestIds.has(p.restaurant.id)) return true;
          if (p.restaurant?.name && knownRestNames.has(p.restaurant.name)) return true;
          if (p.restaurant?.userId && knownUserIds.has(p.restaurant.userId)) return true;
          return false;
        });

        const mergedMap = new Map();
        [...ownedArray, ...matchingFromAll].forEach((p) => {
          if (p && p.id) mergedMap.set(p.id, p);
        });

        setProducts(Array.from(mergedMap.values()));
      } catch (error) {
        console.error("Error fetching owned products on dashboard:", error);
        setProducts([]);
      }

      // Fetch orders independently
      try {
        const orderRes = await axiosInstance.get("/orders");
        const orderData = orderRes.data?.data?.orders || orderRes.data?.orders || orderRes.data?.data || orderRes.data || [];
        setOrders(Array.isArray(orderData) ? orderData : []);
      } catch (error) {
        console.error("Error fetching orders on dashboard:", error);
        setOrders([]);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await axiosInstance.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal update status");
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    await handleUpdateStatus(orderId, "CANCELLED");
  };

  const formatPrice = (price: number) =>
    `Rp${price.toLocaleString("id-ID")}`;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFCFB]">
        <div className="h-12 w-12 animate-spin rounded-full border-3 border-[#AC7F5E]/20 border-t-[#AC7F5E]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FFFCFB]">
      <main className="min-h-screen flex-1">
        <div className="p-4 sm:p-6 lg:p-10">
          {/* Header */}
          <div className="mb-5 flex flex-col gap-4 rounded-[24px] border border-[#EEE7DE] bg-[#FFFCFB] p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex h-10 sm:h-12 w-full items-center gap-2 sm:gap-3 rounded-2xl border border-[#EFE7DD] bg-[#FFFCFB] px-3 sm:px-4 lg:max-w-md">
              <Search size={18} className="text-[#091413]/55" />
              <input
                type="text"
                placeholder="Search orders, products..."
                className="w-full bg-transparent text-xs sm:text-sm outline-none placeholder:text-[#091413]/55"
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
              <button className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-[#EFE7DD] bg-[#FAF8F5] transition hover:scale-105">
                <Bell size={18} className="text-[#AC7F5E]" />
              </button>

              <div className="flex items-center gap-2 sm:gap-3 rounded-2xl border border-[#EFE7DD] bg-[#FAF8F5] px-2 sm:px-3 py-1.5 sm:py-2">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#AC7F5E] text-xs sm:text-sm font-bold text-white">
                  {user?.fullname?.charAt(0)?.toUpperCase() || "M"}
                </div>
                <div className="hidden xs:block">
                  <h3 className="text-xs sm:text-sm font-semibold text-[#091413]">
                    {user?.fullname || "Merchant"}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#091413]/65">{user?.email}</p>
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
          </div>



          {/* GRID */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
            {/* ORDERS */}
            <div className="rounded-[20px] md:rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-4 md:p-5 xl:col-span-8">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#091413]">
                    Pesanan Masuk
                  </h2>
                  <p className="text-sm text-[#091413]/65">
                    Kelola pesanan rescue terbaru
                  </p>
                </div>
              </div>

              {orders.length === 0 ? (
                <p className="py-10 text-center text-[#091413]/50">
                  Belum ada pesanan masuk
                </p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 rounded-2xl border border-[#F1EBE3] bg-[#FFFCFB] p-3 sm:p-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#FFFCFB]">
                          <ShoppingBag size={18} className="text-[#AC7F5E]" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-xs sm:text-base text-[#091413]">
                            {order.user?.fullname || "Customer"}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#091413]/65">
                            {order.product?.name} × {order.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                        <div className="text-right">
                          <p className="text-xs sm:text-sm font-semibold text-[#091413]">
                            {formatPrice(order.totalPaidByBuyer)}
                          </p>

                          <div
                            className={`mt-1 inline-block rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold ${
                              statusColors[order.status] || "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {statusLabels[order.status] || order.status}
                          </div>
                        </div>

                        {/* Actions */}
                        {nextStatus[order.status] && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(order.id, nextStatus[order.status])
                            }
                            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-green-100 text-green-700 transition hover:bg-green-200"
                            title="Lanjutkan status"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}

                        {order.status !== "COMPLETED" &&
                          order.status !== "CANCELLED" && (
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-red-100 text-red-600 transition hover:bg-red-200"
                              title="Batalkan"
                            >
                              <XCircle size={16} />
                            </button>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* MY PRODUCTS */}
            <div className="rounded-[20px] md:rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-4 md:p-5 xl:col-span-4 mt-5 md:mt-0">
              <div className="mb-5">
                <h2 className="text-xl font-semibold text-[#091413]">
                  Produk Saya
                </h2>
                <p className="text-sm text-[#091413]/65">
                  {products.length} produk terdaftar
                </p>
              </div>

              {products.length === 0 ? (
                <p className="py-10 text-center text-[#091413]/50">
                  Belum ada produk
                </p>
              ) : (
                <div className="space-y-3">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-2 sm:gap-3 rounded-2xl border border-[#F1EBE3] bg-[#FFFAF5] p-2 sm:p-3"
                    >
                      <div className="relative h-10 w-10 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-xl bg-[#F0E8DC]">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <UtensilsCrossed size={20} className="text-[#AC7F5E]/60" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs sm:text-sm font-semibold text-[#091413]">
                          {product.name}
                        </p>
                        <p className="text-[10px] sm:text-xs text-[#091413]/50">
                          {formatPrice(product.sellingPrice)} · Stok {product.stock}
                        </p>
                      </div>

                      {product.stock <= 3 && (
                        <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[9px] sm:text-[0.6rem] font-semibold text-red-600">
                          Low
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="relative overflow-hidden rounded-[20px] md:rounded-[28px] bg-gradient-to-br from-[#AC7F5E] to-[#BBAB8C] p-4 md:p-6 text-[#FFFCFB] xl:col-span-12 mt-5">
              <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-[#FFFCFB]/5" />

              <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFFCFB]/10">
                    <Store size={28} />
                  </div>

                  <h2 className="text-3xl font-bold">
                    Tingkatkan Rescue UMKM Kamu <Rocket size={24} className="inline" />
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm text-[#FFFCFB]/75">
                    Tambahkan produk baru, tingkatkan diskon rescue, dan bantu
                    lebih banyak makanan terselamatkan hari ini.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
