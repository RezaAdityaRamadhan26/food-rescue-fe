import Image from "next/image";
import { Clock, CheckCircle2, Package, ChevronRight, Leaf } from "lucide-react";

const orders = [
  {
    id: "ORB-2401",
    merchant: "Dapur Ibu Sri",
    items: "Nasi Padang Box + Sayur Lodeh",
    image:
      "https://images.unsplash.com/photo-1644286532437-c93e7af7a2b6?w=80&h=80&fit=crop",
    originalPrice: "Rp 45.000",
    rescuePrice: "Rp 18.000",
    saved: "Rp 27.000",
    co2: "1.2 kg CO₂",
    status: "completed",
    time: "Hari ini, 12:30",
    mealsTag: "2 makanan terselamatkan",
  },
  {
    id: "ORB-2389",
    merchant: "Toko Roti Harmoni",
    items: "Roti Sourdough + Croissant (6 pcs)",
    image:
      "https://images.unsplash.com/photo-1754479132065-4b68de2f1071?w=80&h=80&fit=crop",
    originalPrice: "Rp 72.000",
    rescuePrice: "Rp 28.000",
    saved: "Rp 44.000",
    co2: "0.8 kg CO₂",
    status: "completed",
    time: "Kemarin, 17:15",
    mealsTag: "6 porsi terselamatkan",
  },
  {
    id: "ORB-2374",
    merchant: "Segar Buah Pak Budi",
    items: "Kotak Buah Tropis Campur (3kg)",
    image:
      "https://images.unsplash.com/photo-1725126131526-0fe8e66484dc?w=80&h=80&fit=crop",
    originalPrice: "Rp 85.000",
    rescuePrice: "Rp 32.000",
    saved: "Rp 53.000",
    co2: "2.1 kg CO₂",
    status: "processing",
    time: "Hari ini, 09:00",
    mealsTag: "5 makanan terselamatkan",
  },
  {
    id: "ORB-2360",
    merchant: "Warung Sehat Bersama",
    items: "Salad Organik + Smoothie",
    image:
      "https://images.unsplash.com/photo-1757596057470-19d36962705d?w=80&h=80&fit=crop",
    originalPrice: "Rp 55.000",
    rescuePrice: "Rp 22.000",
    saved: "Rp 33.000",
    co2: "0.6 kg CO₂",
    status: "completed",
    time: "29 Des, 11:45",
    mealsTag: "2 makanan terselamatkan",
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    label: "Selesai",
    color: "#5B8A6B",
    bg: "#D8EEE3",
  },
  processing: {
    icon: Package,
    label: "Dalam perjalanan",
    color: "#C4A882",
    bg: "#F5E6D3",
  },
  pending: {
    icon: Clock,
    label: "Menunggu",
    color: "#9E8A78",
    bg: "#EEE8E0",
  },
};

export function RecentOrders() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2
          className="text-[1.25rem] text-[#091413] font-serif"
        >
          Rescue Terbaru
        </h2>

        <button className="flex items-center gap-1 text-[0.78rem] font-semibold text-[#091413] transition-all duration-200 hover:opacity-70">
          Lihat semua
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const status =
            statusConfig[order.status as keyof typeof statusConfig];

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
                  <Image
                    src={order.image}
                    alt={order.merchant}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
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
                      {order.merchant}
                    </div>

                    <div className="max-w-50 truncate text-[0.75rem] text-[#091413]/65">
                      {order.items}
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
                  <span
                    className="text-[1rem] text-[#091413]"
                  >
                    {order.rescuePrice}
                  </span>

                  <span className="text-[0.72rem] text-[#091413]/65 line-through">
                    {order.originalPrice}
                  </span>

                  <div
                    className="ml-1 rounded-lg px-2 py-0.5"
                    style={{
                      background: "#F5E6D3",
                    }}
                  >
                    <span className="text-[0.65rem] font-medium text-[#091413]">
                      Hemat {order.saved}
                    </span>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Leaf size={10} className="text-[#7BBF9C]" />

                    <span className="text-[0.65rem] text-[#7BBF9C]">
                      {order.co2} terselamatkan
                    </span>
                  </div>

                  <span className="text-[0.6rem] text-[#091413]/45">•</span>

                  <span className="text-[0.65rem] text-[#091413]/65">
                    {order.time}
                  </span>

                  <span className="text-[0.6rem] text-[#091413]/45">•</span>

                  <span className="text-[0.65rem] text-[#091413]/65">
                    #{order.id}
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
