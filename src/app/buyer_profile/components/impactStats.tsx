import { Utensils, Wind, Wallet, Store, TrendingUp } from "lucide-react";

const stats = [
  {
    id: 1,
    icon: Utensils,
    label: "Makanan Terselamatkan",
    value: "347",
    unit: "makanan",
    change: "+12 minggu ini",
    color: "#7C5B3A",
    lightColor: "#F5E6D3",
    accent: "#C4A882",
  },
  {
    id: 2,
    icon: Wind,
    label: "Emisi CO₂ Berkurang",
    value: "84.2",
    unit: "kg",
    change: "+3.1 kg minggu ini",
    color: "#4A7C59",
    lightColor: "#D8EEE3",
    accent: "#7BBF9C",
  },
  {
    id: 3,
    icon: Wallet,
    label: "Uang Dihemat",
    value: "Rp 1.2JT",
    unit: "total",
    change: "+Rp 85RB minggu ini",
    color: "#7C5B3A",
    lightColor: "#F5E6D3",
    accent: "#C4A882",
  },
  {
    id: 4,
    icon: Store,
    label: "UMKM Didukung",
    value: "23",
    unit: "penjual",
    change: "+2 UMKM bulan ini",
    color: "#5B6BAA",
    lightColor: "#DDE2F5",
    accent: "#8B9ADA",
  },
];

export function ImpactStats() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2
          className="text-[1.25rem] text-[#091413] font-serif"
        >
          Dampak Sustainability Kamu
        </h2>

        <button className="rounded-lg bg-[#BBAB8C] px-3 py-1.5 text-[0.78rem] font-semibold text-[#FFFCFB] transition-all duration-200 hover:opacity-80">
          Lihat Semua
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.id}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(196,168,130,0.18)] bg-[#FFFAF5] p-4 transition-transform duration-300 hover:scale-[1.02] md:p-5"
              style={{
                boxShadow: "0 2px 16px rgba(45, 31, 20, 0.07)",
              }}
            >
              <div
                className="absolute top-0 right-0 h-20 w-20 rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-60"
                style={{
                  background: `radial-gradient(circle at center, ${stat.lightColor}, transparent)`,
                  transform: "translate(30%, -30%)",
                }}
              />

              <div
                className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: stat.lightColor,
                }}
              >
                <Icon
                  size={17}
                  strokeWidth={2}
                  style={{
                    color: stat.color,
                  }}
                />
              </div>

              <div
                className="text-[1.5rem] leading-[1.1] text-[#091413]"
              >
                {stat.value}
              </div>
              <div className="mt-0.5 text-[0.72rem] text-[#091413]/65">
                {stat.unit}
              </div>
              <div className="mt-1.5 text-[0.7rem] font-medium text-[#091413]/80">
                {stat.label}
              </div>
              <div
                className="mt-3 flex items-center gap-1 pt-3"
                style={{
                  borderTop: "1px solid rgba(196, 168, 130, 0.15)",
                }}
              >
                <TrendingUp
                  size={11}
                  style={{
                    color: stat.accent,
                  }}
                />

                <span
                  className="text-[0.65rem] font-semibold"
                  style={{
                    color: stat.accent,
                  }}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
