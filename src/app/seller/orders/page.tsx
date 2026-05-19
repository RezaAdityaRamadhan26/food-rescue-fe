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
  X,
  User,
  Calendar,
  Receipt,
  MapPin,
  UtensilsCrossed,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { motion, AnimatePresence } from "framer-motion";

interface MerchantOrder {
  id: string;
  quantity: number;
  itemPrice: number;
  platformFeeBuyer: number;
  platformFeeSeller: number;
  totalPaidByBuyer: number;
  netSellerRevenue: number;
  status: string;
  createdAt: string;
  deliveryType: string;
  note: string | null;
  user: { fullname: string; email: string } | null;
  product: { name: string; type: string; imageUrl?: string } | null;
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
  const [selectedOrder, setSelectedOrder] = useState<MerchantOrder | null>(null);

  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = "hidden";
      // Find the sidebar and hide it if it's the main nav
      const sidebar = document.querySelector("aside") || document.querySelector("[role='navigation']");
      if (sidebar) (sidebar as HTMLElement).style.display = "none";
    } else {
      document.body.style.overflow = "auto";
      const sidebar = document.querySelector("aside") || document.querySelector("[role='navigation']");
      if (sidebar) (sidebar as HTMLElement).style.display = "";
    }
    
    return () => {
      document.body.style.overflow = "auto";
      const sidebar = document.querySelector("aside") || document.querySelector("[role='navigation']");
      if (sidebar) (sidebar as HTMLElement).style.display = "";
    };
  }, [selectedOrder]);

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
      const updatedOrders = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
      setOrders(updatedOrders);
      
      // Update selected order if open
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
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
    <div className="pb-20 lg:pb-0">
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
                onClick={() => setSelectedOrder(order)}
                className="group flex flex-col gap-4 rounded-[24px] border border-[#EEE7DE] bg-[#FFFCFB] p-5 transition cursor-pointer hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
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
                  
                  <ChevronRight size={20} className="text-[#AC7F5E] opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-[#FFFCFB] shadow-2xl"
            >
              <div className="relative h-24 bg-[#AC7F5E]">
                <div className="absolute inset-0 opacity-10">
                   <svg width="100%" height="100%"><pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="2" fill="#FFFFFF" /></pattern><rect width="100%" height="100%" fill="url(#pattern)" /></svg>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40"
                >
                  <X size={20} />
                </button>
                <div className="absolute -bottom-8 left-8 flex items-center gap-4">
                  <div className="h-20 w-20 flex items-center justify-center rounded-2xl border-4 border-[#FFFCFB] bg-[#F5EFE6] shadow-lg">
                    <User size={32} className="text-[#AC7F5E]" />
                  </div>
                  <div className="translate-y-4">
                     <h3 className="text-xl font-bold text-[#091413]">{selectedOrder.user?.fullname}</h3>
                     <p className="text-sm text-[#091413]/60">{selectedOrder.user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 pt-16">
                <div className="mb-6 flex items-center justify-between">
                  <div 
                    className="flex items-center gap-1.5 rounded-full px-3 py-1"
                    style={{ background: statusConfig[selectedOrder.status]?.bg || "#EEE8E0" }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full" style={{ background: statusConfig[selectedOrder.status]?.color || "#9E8A78" }} />
                    <span className="text-[0.75rem] font-bold uppercase tracking-wider" style={{ color: statusConfig[selectedOrder.status]?.color || "#9E8A78" }}>
                      {statusConfig[selectedOrder.status]?.label}
                    </span>
                  </div>
                  <p className="text-xs font-mono font-medium text-[#091413]/40">#{selectedOrder.id.slice(0, 12)}</p>
                </div>

                <div className="mb-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-[#F8F5F2] p-4">
                    <div className="flex items-center gap-2 text-[0.65rem] font-bold text-[#9E8A78] uppercase mb-1">
                      <Calendar size={12} /> Tanggal
                    </div>
                    <p className="text-sm font-semibold text-[#091413]">
                      {new Date(selectedOrder.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#F8F5F2] p-4">
                    <div className="flex items-center gap-2 text-[0.65rem] font-bold text-[#9E8A78] uppercase mb-1">
                      <MapPin size={12} /> Pengambilan
                    </div>
                    <p className="text-sm font-semibold text-[#091413]">{selectedOrder.deliveryType}</p>
                  </div>
                </div>

                <div className="mb-8 overflow-hidden rounded-2xl border border-[#EEE2D4]">
                   <div className="bg-[#FDFAF6] px-5 py-3 border-b border-[#EEE2D4] flex items-center justify-between">
                      <h4 className="text-[0.75rem] font-bold text-[#9E8A78] uppercase">Produk & Pembayaran</h4>
                      <TrendingUp size={14} className="text-[#AC7F5E]" />
                   </div>
                   <div className="p-5 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#091413]/70">{selectedOrder.product?.name} ({selectedOrder.quantity}x)</span>
                        <span className="font-semibold text-[#091413]">{formatPrice(selectedOrder.itemPrice * selectedOrder.quantity)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#091413]/70 text-xs italic">Potongan Platform</span>
                        <span className="font-semibold text-red-500">-{formatPrice(selectedOrder.platformFeeSeller || 0)}</span>
                      </div>
                      <div className="pt-3 mt-3 border-t border-[#EEE2D4] flex justify-between items-center">
                        <div>
                           <span className="block text-[0.65rem] font-bold text-[#9E8A78] uppercase">Pendapatan Bersih</span>
                           <span className="text-xl font-bold text-[#5B8A6B]">{formatPrice(selectedOrder.netSellerRevenue)}</span>
                        </div>
                        <div className="text-right">
                           <span className="block text-[0.65rem] font-bold text-[#9E8A78] uppercase">Total User Bayar</span>
                           <span className="text-sm font-bold text-[#091413]">{formatPrice(selectedOrder.totalPaidByBuyer)}</span>
                        </div>
                      </div>
                   </div>
                </div>

                {selectedOrder.note && (
                   <div className="mb-8">
                      <h4 className="text-[0.7rem] font-bold text-[#9E8A78] uppercase mb-2">Catatan Pelanggan</h4>
                      <div className="rounded-xl bg-[#F5F5F5] p-3 text-sm text-[#091413]/70 border-l-4 border-[#AC7F5E]">
                        "{selectedOrder.note}"
                      </div>
                   </div>
                )}

                {/* MODAL ACTIONS */}
                <div className="flex gap-3">
                   {nextStatus[selectedOrder.status] && (
                     <button 
                        onClick={() => handleUpdateStatus(selectedOrder.id, nextStatus[selectedOrder.status])}
                        className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#AC7F5E] py-4 text-sm font-bold text-white shadow-lg shadow-[#AC7F5E]/20 transition hover:bg-[#8e694d]"
                     >
                        <CheckCircle size={18} />
                        Update ke {statusConfig[nextStatus[selectedOrder.status]].label}
                     </button>
                   )}
                   {selectedOrder.status !== "COMPLETED" && selectedOrder.status !== "CANCELLED" && (
                     <button 
                        onClick={() => handleUpdateStatus(selectedOrder.id, "CANCELLED")}
                        className={`flex items-center justify-center gap-2 rounded-2xl border-2 border-red-100 py-4 text-sm font-bold text-red-500 transition hover:bg-red-50 ${nextStatus[selectedOrder.status] ? "px-6" : "flex-1"}`}
                     >
                        <XCircle size={18} />
                        Batalkan
                     </button>
                   )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
