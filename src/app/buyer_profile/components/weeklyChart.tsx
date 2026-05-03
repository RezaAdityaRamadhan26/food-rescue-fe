import { Leaf } from "lucide-react";

const weekData = [
  { day: "Sen", meals: 3, co2: 1.2 },
  { day: "Sel", meals: 5, co2: 2.1 },
  { day: "Rab", meals: 2, co2: 0.8 },
  { day: "Kam", meals: 7, co2: 3.0 },
  { day: "Jum", meals: 4, co2: 1.7 },
  { day: "Sab", meals: 6, co2: 2.5 },
  { day: "Min", meals: 1, co2: 0.4 },
];

const maxMeals = Math.max(...weekData.map((d) => d.meals));

export function WeeklyChart() {
  return (
    <div
      className="rounded-2xl border border-[rgba(196,168,130,0.18)] bg-[#FFFAF5] p-5"
      style={{
        boxShadow: "0 2px 16px rgba(45, 31, 20, 0.06)",
      }}
    >
      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3
            className="text-[1.1rem] text-[#091413] font-serif"
          >
            Aktivitas Rescue Mingguan
          </h3>

          <p className="text-[0.72rem] text-[#091413]/65">
            28 makanan terselamatkan minggu ini
          </p>
        </div>

        <div
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
          style={{
            background: "#D8EEE3",
          }}
        >
          <Leaf size={12} className="text-[#5B8A6B]" />

          <span className="text-[0.72rem] font-semibold text-[#5B8A6B]">
            11.7 kg CO₂
          </span>
        </div>
      </div>

      {/* CHART */}
      <div className="flex h-28 items-end gap-2">
        {weekData.map((d, i) => {
          const heightPct = (d.meals / maxMeals) * 100;

          const isToday = i === 5;

          return (
            <div
              key={d.day}
              className="flex flex-1 flex-col items-center gap-1.5"
            >
              {/* VALUE */}
              <span className="text-[0.6rem] text-[#091413]/65">{d.meals}</span>

              {/* BAR */}
              <div
                className="relative w-full overflow-hidden rounded-t-lg transition-all duration-500"
                style={{
                  height: `${heightPct}%`,
                  minHeight: "8px",
                  background: isToday
                    ? "linear-gradient(to top, #7C5B3A, #C4A882)"
                    : "linear-gradient(to top, #D8EEE3, #A8C5B5)",
                }}
              >
                {isToday && (
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%)",
                      backgroundSize: "4px 4px",
                    }}
                  />
                )}
              </div>

              {/* DAY */}
              <span
                className={`text-[0.6rem] ${
                  isToday ? "font-semibold text-[#7C5B3A]" : "text-[#091413]/65"
                }`}
              >
                {d.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* LEGEND */}
      <div
        className="mt-4 flex items-center gap-4 border-t pt-3"
        style={{
          borderColor: "rgba(196, 168, 130, 0.15)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <div
            className="h-3 w-3 rounded-sm"
            style={{
              background: "#A8C5B5",
            }}
          />

          <span className="text-[0.65rem] text-[#091413]/65">Hari sebelumnya</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div
            className="h-3 w-3 rounded-sm"
            style={{
              background: "linear-gradient(135deg, #7C5B3A, #C4A882)",
            }}
          />

          <span className="text-[0.65rem] text-[#091413]/65">Hari ini</span>
        </div>
      </div>
    </div>
  );
}
