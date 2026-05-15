"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, CheckCircle2, Package, ChevronRight, Leaf, AlertCircle, UtensilsCrossed, X, MapPin, Receipt, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { motion, AnimatePresence } from "framer-motion";

interface Order {
  id: string;
  quantity: number;
  itemPrice: number;
  platformFeeBuyer: number;
  totalPaidByBuyer: number;
  status: string;
  createdAt: string;
  deliveryType: string;
  note: string | null;
  product: {
    name: string;
    imageUrl: string | null;
    restaurant: { 
      name: string;
      address: string;
    } | null;
  };
}

const statusConfig: Record<string, { icon: any; label: string; color: string; bg: string }> = {
  WAITING_PAYMENT: {
    icon: Clock,
    label: "Menunggu",
    color: "#9E8A78",
    bg: "#EEE8E0",
  },
  PREPARING: {
    icon: Package,
    label: "Diproses",
    color: "#C4A882",
    bg: "#F5E6D3",
  },
  READY_FOR_PICKUP: {
    icon: Package,
    label: "Siap Diambil",
    color: "#5B8A6B",
    bg: "#D8EEE3",
  },
  ON_THE_WAY: {
    icon: Package,
    label: "Dalam perjalanan",
    color: "#C4A882",
    bg: "#F5E6D3",
  },
  COMPLETED: {
    icon: CheckCircle2,
    label: "Selesai",
    color: "#5B8A6B",
    bg: "#D8EEE3",
  },
  CANCELLED: {
    icon: AlertCircle,
    label: "Dibatalkan",
    color: "#D44",
    bg: "#FDE8E8",
  },
};

export function RecentOrders({ isFullPage = false }: { isFullPage?: boolean }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = "hidden";
      // Find the nav element and hide it
      const nav = document.querySelector("nav");
      if (nav) nav.style.display = "none";
    } else {
      document.body.style.overflow = "auto";
      const nav = document.querySelector("nav");
      if (nav) nav.style.display = "flex";
    }
    
    return () => {
      document.body.style.overflow = "auto";
      const nav = document.querySelector("nav");
      if (nav) nav.style.display = "flex";
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

  const formatPrice = (price: number) =>
    `Rp ${price?.toLocaleString("id-ID") || 0}`;

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#AC7F5E]/20 border-t-[#AC7F5E]" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E7DAC8] bg-[#FFFAF5] p-8 text-center">
        <p className="text-[#091413]/50">Belum ada pesanan</p>
      </div>
    );
  }

  const displayOrders = isFullPage ? orders : orders.slice(0, 4);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[1.25rem] text-[#091413] font-serif">
          {isFullPage ? "Semua Transaksi" : "Rescue Terbaru"}
        </h2>

        {!isFullPage && (
          <Link 
            href="/buyer-profile?tab=orders"
            className="flex items-center gap-1 text-[0.78rem] font-semibold text-[#091413] transition-all duration-200 hover:opacity-70"
          >
            Lihat semua
            <ChevronRight size={14} />
          </Link>
        )}
      </div>

      <div className="space-y-3">
        {displayOrders.map((order) => {
          const status = statusConfig[order.status] || statusConfig.WAITING_PAYMENT;
          const StatusIcon = status.icon;

          return (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="group flex cursor-pointer gap-4 rounded-2xl border border-[rgba(196,168,130,0.18)] bg-[#FFFAF5] p-4 transition-all duration-300 hover:shadow-md"
              style={{
                boxShadow: "0 2px 12px rgba(45, 31, 20, 0.05)",
              }}
            >
              {/* IMAGE */}
              <div className="relative shrink-0">
                <div
                  className="relative h-16 w-16 overflow-hidden rounded-xl border md:h-20 md:w-20"
                  style={{
                    borderColor: "rgba(196, 168, 130, 0.2)",
                  }}
                >
                  {order.product.imageUrl ? (
                    <Image
                      src={order.product.imageUrl}
                      alt={order.product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#F0E8DC]">
                      <UtensilsCrossed size={24} className="text-[#AC7F5E]/60" />
                    </div>
                  )}
                </div>

                <div
                  className="absolute -top-1 -right-1 flex items-center gap-0.5 rounded-full px-1.5 py-0.5"
                  style={{
                    background: "#D8EEE3",
                    border: "1px solid rgba(91,138,107,0.3)",
                  }}
                >
                  <Leaf size={8} className="text-[#5B8A6B]" />
                </div>
              </div>

              {/* CONTENT */}
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[0.85rem] font-semibold text-[#091413]">
                      {order.product.restaurant?.name || "—"}
                    </div>

                    <div className="max-w-50 truncate text-[0.75rem] text-[#091413]/65">
                      {order.product.name} × {order.quantity}
                    </div>
                  </div>

                  {/* STATUS */}
                  <div
                    className="flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1"
                    style={{
                      background: status.bg,
                    }}
                  >
                    <StatusIcon
                      size={11}
                      style={{
                        color: status.color,
                      }}
                    />

                    <span
                      className="text-[0.65rem] font-semibold"
                      style={{
                        color: status.color,
                      }}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* PRICE */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[1rem] text-[#091413]">
                    {formatPrice(order.totalPaidByBuyer)}
                  </span>
                </div>

                {/* FOOTER */}
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-[0.65rem] text-[#091413]/65">
                    {new Date(order.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <span className="text-[0.6rem] text-[#091413]/45">•</span>

                  <span className="text-[0.65rem] text-[#091413]/65">
                    #{order.id.slice(0, 8)}
                  </span>
                </div>
              </div>

              {/* ARROW */}
              <div className="flex shrink-0 items-center">
                <ChevronRight
                  size={16}
                  className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
              </div>
            </div>
          );
        })}
      </div>

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
              {/* MODAL HEADER */}
              <div className="relative h-32 bg-[#F5E6D3]">
                <div className="absolute inset-0 opacity-10">
                   <svg width="100%" height="100%"><pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="2" fill="#7C5B3A" /></pattern><rect width="100%" height="100%" fill="url(#pattern)" /></svg>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#091413] backdrop-blur-md transition hover:bg-white"
                >
                  <X size={20} />
                </button>
                <div className="absolute -bottom-8 left-8">
                  <div className="h-20 w-20 overflow-hidden rounded-2xl border-4 border-[#FFFCFB] bg-white shadow-lg">
                    {selectedOrder.product.imageUrl ? (
                      <Image src={selectedOrder.product.imageUrl} alt={selectedOrder.product.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#F0E8DC]">
                        <UtensilsCrossed size={32} className="text-[#AC7F5E]/60" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* MODAL CONTENT */}
              <div className="px-8 pb-8 pt-12">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#091413]">{selectedOrder.product.name}</h3>
                    <p className="text-[#AC7F5E] font-medium">{selectedOrder.product.restaurant?.name}</p>
                  </div>
                  <div 
                    className="flex items-center gap-1.5 rounded-full px-3 py-1"
                    style={{ background: statusConfig[selectedOrder.status]?.bg || "#EEE8E0" }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full" style={{ background: statusConfig[selectedOrder.status]?.color || "#9E8A78" }} />
                    <span className="text-[0.75rem] font-bold uppercase tracking-wider" style={{ color: statusConfig[selectedOrder.status]?.color || "#9E8A78" }}>
                      {statusConfig[selectedOrder.status]?.label}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[0.7rem] font-bold text-[#9E8A78] uppercase tracking-wider">
                      <Calendar size={12} /> Tanggal Pesanan
                    </div>
                    <p className="text-sm font-semibold text-[#091413]">
                      {new Date(selectedOrder.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="flex items-center justify-end gap-2 text-[0.7rem] font-bold text-[#9E8A78] uppercase tracking-wider">
                      <Receipt size={12} /> Order ID
                    </div>
                    <p className="text-sm font-mono font-semibold text-[#091413]">#{selectedOrder.id.slice(0, 12)}</p>
                  </div>
                </div>

                <div className="mb-8 rounded-2xl bg-[#FDFAF6] p-5 border border-[#EEE2D4]">
                   <h4 className="text-[0.75rem] font-bold text-[#9E8A78] uppercase tracking-wider mb-4">Rincian Pembayaran</h4>
                   <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#091413]/70">{selectedOrder.product.name} ({selectedOrder.quantity}x)</span>
                        <span className="font-semibold text-[#091413]">{formatPrice(selectedOrder.itemPrice * selectedOrder.quantity)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#091413]/70">Biaya Layanan</span>
                        <span className="font-semibold text-[#091413]">{formatPrice(selectedOrder.platformFeeBuyer)}</span>
                      </div>
                      <div className="pt-3 mt-3 border-t border-[#EEE2D4] flex justify-between">
                        <span className="font-bold text-[#091413]">Total Bayar</span>
                        <span className="text-xl font-bold text-[#AC7F5E]">{formatPrice(selectedOrder.totalPaidByBuyer)}</span>
                      </div>
                   </div>
                </div>

                {selectedOrder.note && (
                   <div className="mb-6">
                      <h4 className="text-[0.75rem] font-bold text-[#9E8A78] uppercase tracking-wider mb-2">Catatan</h4>
                      <div className="rounded-xl bg-[#F5EFE6] p-4 text-sm text-[#091413]/80 italic border-l-4 border-[#AC7F5E]">
                        "{selectedOrder.note}"
                      </div>
                   </div>
                )}

                <div className="flex items-center gap-3 text-sm text-[#091413]/65">
                  <MapPin size={16} className="text-[#AC7F5E]" />
                  <span>{selectedOrder.deliveryType === "PICKUP" ? "Ambil di Lokasi: " : "Alamat Resto: "} {selectedOrder.product.restaurant?.address || "Alamat tidak tersedia"}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
