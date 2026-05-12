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
        const prodRes = await axiosInstance.get("/products/owned");
        setProducts(prodRes.data.data || []);
      } catch (error) {
        console.error("Error fetching owned products on dashboard:", error);
        setProducts([]);
      }

      // Fetch orders independently
      try {
        const orderRes = await axiosInstance.get("/orders");
        setOrders(orderRes.data.data || []);
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
        <div className="p-6 lg:p-10">
          {/* Header */}
          <div className="mb-5 flex flex-col gap-4 rounded-[24px] border border-[#EEE7DE] bg-[#FFFCFB] p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex h-12 w-full items-center gap-3 rounded-2xl border border-[#EFE7DD] bg-[#FFFCFB] px-4 lg:max-w-md">
              <Search size={18} className="text-[#091413]/55" />
              <input
                type="text"
                placeholder="Search orders, products..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#091413]/55"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#EFE7DD] bg-[#FAF8F5] transition hover:scale-105">
                <Bell size={18} className="text-[#AC7F5E]" />
              </button>

              <div className="flex items-center gap-3 rounded-2xl border border-[#EFE7DD] bg-[#FAF8F5] px-3 py-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#AC7F5E] text-sm font-bold text-white">
                  {user?.fullname?.charAt(0)?.toUpperCase() || "M"}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#091413]">
                    {user?.fullname || "Merchant"}
                  </h3>
                  <p className="text-xs text-[#091413]/65">{user?.email}</p>
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
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
            {/* ORDERS */}
            <div className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-5 xl:col-span-8">
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
                      className="flex items-center justify-between rounded-2xl border border-[#F1EBE3] bg-[#FFFCFB] p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFFCFB]">
                          <ShoppingBag size={18} className="text-[#AC7F5E]" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-[#091413]">
                            {order.user?.fullname || "Customer"}
                          </h3>
                          <p className="text-sm text-[#091413]/65">
                            {order.product?.name} × {order.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-[#091413]">
                            {formatPrice(order.totalPaidByBuyer)}
                          </p>

                          <div
                            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
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
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-700 transition hover:bg-green-200"
                            title="Lanjutkan status"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}

                        {order.status !== "COMPLETED" &&
                          order.status !== "CANCELLED" && (
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600 transition hover:bg-red-200"
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
            <div className="rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] p-5 xl:col-span-4">
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
                      className="flex items-center gap-3 rounded-2xl border border-[#F1EBE3] bg-[#FFFAF5] p-3"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#F0E8DC]">
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
                        <p className="truncate text-sm font-semibold text-[#091413]">
                          {product.name}
                        </p>
                        <p className="text-xs text-[#091413]/50">
                          {formatPrice(product.sellingPrice)} · Stok {product.stock}
                        </p>
                      </div>

                      {product.stock <= 3 && (
                        <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[0.6rem] font-semibold text-red-600">
                          Low
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#AC7F5E] to-[#BBAB8C] p-6 text-[#FFFCFB] xl:col-span-12">
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
