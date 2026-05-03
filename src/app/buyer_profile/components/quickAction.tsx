import { Zap, MapPin, Gift, Calendar } from "lucide-react";

const actions = [
  {
    icon: Zap,
    label: "Flash Rescue",
    sublabel: "Segera habis",
    color: "#C4A882",
    bg: "#F5E6D3",
    count: 8,
  },
  {
    icon: MapPin,
    label: "Terdekat",
    sublabel: "Dalam 2 km",
    color: "#7BBF9C",
    bg: "#D8EEE3",
    count: 14,
  },
  {
    icon: Gift,
    label: "Kotak Kejutan",
    sublabel: "Isi campuran",
    color: "#D4A849",
    bg: "#F7EDCC",
    count: 5,
  },
  {
    icon: Calendar,
    label: "Pre-Order",
    sublabel: "Jadwalkan pickup",
    color: "#8B9ADA",
    bg: "#DDE2F5",
    count: 3,
  },
];

export function QuickActions() {
  return (
    <div>
      <h2
        className="mb-4 text-[1.25rem] text-[#091413] font-serif"
      >
        Aksi Cepat
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-[rgba(196,168,130,0.18)] bg-[#FFFAF5] p-4 text-center transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
              style={{
                boxShadow: "0 2px 12px rgba(45, 31, 20, 0.05)",
              }}
            >
              <div
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{
                  background: action.bg,
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={2}
                  style={{
                    color: action.color,
                  }}
                />

                <div
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full"
                  style={{
                    background: action.color,
                  }}
                >
                  <span className="text-[0.55rem] font-medium text-[#FFFCFB]">
                    {action.count}
                  </span>
                </div>
              </div>

              {/* TEXT */}
              <div>
                <div className="text-[0.82rem] font-semibold text-[#091413]">
                  {action.label}
                </div>

                <div className="text-[0.65rem] text-[#091413]/65">
                  {action.sublabel}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
