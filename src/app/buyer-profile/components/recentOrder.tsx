"use client";

import Image from "next/image";
import { Clock, CheckCircle2, Package, ChevronRight, Leaf, AlertCircle, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

interface Order {
  id: string;
  quantity: number;
  itemPrice: number;
  totalPaidByBuyer: number;
  status: string;
  createdAt: string;
  product: {
    name: string;
    imageUrl: string | null;
    restaurant: { name: string } | null;
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

export function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    `Rp ${price.toLocaleString("id-ID")}`;

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

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[1.25rem] text-[#091413] font-serif">
          Rescue Terbaru
        </h2>

        <button className="flex items-center gap-1 text-[0.78rem] font-semibold text-[#091413] transition-all duration-200 hover:opacity-70">
          Lihat semua
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const status = statusConfig[order.status] || statusConfig.WAITING_PAYMENT;
          const StatusIcon = status.icon;

          return (
            <div
              key={order.id}
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
    </div>
  );
}
