"use client";

import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Package,
  AlertCircle,
  ChevronRight,
  CheckCircle,
  XCircle,
  Search,
  Filter,
} from "lucide-react";
import axiosInstance from "@/lib/axios";

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

const statusConfig: Record<string, { icon: any; label: string; color: string; bg: string }> = {
  WAITING_PAYMENT: { icon: Clock, label: "Menunggu", color: "#9E8A78", bg: "#EEE8E0" },
  PREPARING: { icon: Package, label: "Diproses", color: "#C4A882", bg: "#F5E6D3" },
  READY_FOR_PICKUP: { icon: Package, label: "Siap Ambil", color: "#5B8A6B", bg: "#D8EEE3" },
  ON_THE_WAY: { icon: Package, label: "Diantar", color: "#7B68EE", bg: "#E8E4F5" },
  COMPLETED: { icon: CheckCircle2, label: "Selesai", color: "#5B8A6B", bg: "#D8EEE3" },
  CANCELLED: { icon: AlertCircle, label: "Batal", color: "#D44", bg: "#FDE8E8" },
};

const nextStatus: Record<string, string> = {
  WAITING_PAYMENT: "PREPARING",
  PREPARING: "READY_FOR_PICKUP",
  READY_FOR_PICKUP: "ON_THE_WAY",
  ON_THE_WAY: "COMPLETED",
};

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<MerchantOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/orders");
        setOrders(res.data.data || []);
      } catch {
        setOrders([]);
      }
      setIsLoading(false);
    };
    fetchOrders();
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

  const formatPrice = (price: number) => `Rp${price.toLocaleString("id-ID")}`;

  const filtered = filterStatus === "ALL"
    ? orders
    : orders.filter((o) => o.status === filterStatus);

  const statusFilters = ["ALL", "WAITING_PAYMENT", "PREPARING", "READY_FOR_PICKUP", "ON_THE_WAY", "COMPLETED", "CANCELLED"];

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-3 border-[#AC7F5E]/20 border-t-[#AC7F5E]" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-serif text-5xl text-[#091413]">Orders</h1>
          <p className="mt-2 text-sm text-[#091413]/65">
            Kelola pesanan rescue yang masuk dari pelanggan.
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-[#091413]/65">
          <ShoppingBag size={16} className="text-[#AC7F5E]" />
          <span>{orders.length} total pesanan</span>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
              filterStatus === s
                ? "bg-[#AC7F5E] text-white"
                : "border border-[#EEE2D4] bg-[#FFFCFB] text-[#7C5B3A] hover:bg-[#F5EFE6]"
            }`}
          >
            {s === "ALL" ? "Semua" : (statusConfig[s]?.label || s)}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-[#EEE7DE] bg-[#FFFCFB] py-20">
          <ShoppingBag size={48} className="mb-4 text-[#AC7F5E]/30" />
          <p className="text-[#091413]/50">Belum ada pesanan</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const status = statusConfig[order.status] || statusConfig.WAITING_PAYMENT;
            const StatusIcon = status.icon;

            return (
              <div
                key={order.id}
                className="flex flex-col gap-4 rounded-[24px] border border-[#EEE7DE] bg-[#FFFCFB] p-5 transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5EFE6]">
                    <ShoppingBag size={22} className="text-[#AC7F5E]" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#091413]">
                      {order.user?.fullname || "Customer"}
                    </h3>
                    <p className="text-sm text-[#091413]/65">
                      {order.product?.name} × {order.quantity}
                    </p>
                    <p className="text-xs text-[#091413]/40">
                      {new Date(order.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {" · "}#{order.id.slice(0, 8)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#091413]">
                      {formatPrice(order.totalPaidByBuyer)}
                    </p>
                    <div
                      className="mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                      style={{ background: status.bg }}
                    >
                      <StatusIcon size={12} style={{ color: status.color }} />
                      <span className="text-xs font-semibold" style={{ color: status.color }}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {nextStatus[order.status] && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, nextStatus[order.status])}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700 transition hover:bg-green-200"
                        title="Lanjutkan status"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}

                    {order.status !== "COMPLETED" && order.status !== "CANCELLED" && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, "CANCELLED")}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 transition hover:bg-red-200"
                        title="Batalkan"
                      >
                        <XCircle size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
