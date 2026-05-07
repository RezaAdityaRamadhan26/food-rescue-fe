import { Lock, Sprout, Croissant, TreePine, Store, Gem, Globe, Trophy, Flame } from "lucide-react";

const badgeIcons: Record<number, any> = {
  1: Sprout,
  2: Croissant,
  3: TreePine,
  4: Store,
  5: Gem,
  6: Globe,
};

const badges = [
  {
    id: 1,
    name: "Penyelamat Pertama",
    description: "Menyelesaikan rescue makanan pertama",
    earned: true,
    earnedDate: "12 Okt 2024",
    rarity: "Umum",
    rarityColor: "#7BBF9C",
    rarityBg: "#D8EEE3",
  },
  {
    id: 2,
    name: "Pahlawan Roti",
    description: "Menyelamatkan lebih dari 10 roti & bakery",
    earned: true,
    earnedDate: "5 Nov 2024",
    rarity: "Langka",
    rarityColor: "#C4A882",
    rarityBg: "#F5E6D3",
  },
  {
    id: 3,
    name: "Pejuang Bumi",
    description: "Mengurangi setara 50kg emisi CO₂",
    earned: true,
    earnedDate: "28 Nov 2024",
    rarity: "Langka",
    rarityColor: "#5B8A6B",
    rarityBg: "#C5DFD1",
  },
  {
    id: 4,
    name: "Sahabat UMKM",
    description: "Mendukung lebih dari 10 UMKM lokal",
    earned: true,
    earnedDate: "10 Des 2024",
    rarity: "Langka",
    rarityColor: "#5B8A6B",
    rarityBg: "#C5DFD1",
  },
  {
    id: 5,
    name: "Penyelamat Diamond",
    description: "Selamatkan total 500 makanan",
    earned: false,
    progress: 347,
    target: 500,
    rarity: "Epic",
    rarityColor: "#8B9ADA",
    rarityBg: "#DDE2F5",
  },
  {
    id: 6,
    name: "Penjaga Bumi",
    description: "Capai level 15 penjaga lingkungan",
    earned: false,
    progress: 12,
    target: 15,
    rarity: "Legendary",
    rarityColor: "#D4A849",
    rarityBg: "#F7EDCC",
  },
];

const streakDays = [true, true, true, true, true, false, false];

const dayLabels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export function Achievements() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-[1.25rem] text-[#091413]">
          Pencapaian & Badge
        </h2>

        <div className="flex items-center gap-2 rounded-full border border-[rgba(196,168,130,0.3)] bg-[#FFFAF5] px-3 py-1.5">
          <Trophy size={14} className="text-[#C4A882]" />

          <span className="text-[0.75rem] font-semibold text-[#7C5B3A]">
            4 / 6 tercapai
          </span>
        </div>
      </div>

      {/* STREAK */}
      <div className="mb-4 flex flex-col items-start gap-4 rounded-2xl bg-linear-to-br from-[#3D2C1E] to-[#5C3D22] p-4 shadow-[0_4px_20px_rgba(45,31,20,0.2)] sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <Flame size={22} className="text-orange-400" />

            <span className="text-[1.3rem] text-[#F5EFE6]">
              Streak 5 Hari!
            </span>
          </div>

          <p className="text-[0.78rem] leading-relaxed text-[#CDB9A7]">
            Kamu keren! Terus selamatkan makanan setiap hari supaya streak tetap
            berjalan.
          </p>
        </div>

        <div className="flex gap-2">
          {dayLabels.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm ${
                  streakDays[i]
                    ? "bg-linear-to-br from-[#7C5B3A] to-[#C4A882]"
                    : "border border-white/10 bg-white/10"
                }`}
              >
                {streakDays[i] ? (
                  <Flame size={14} className="text-orange-300" />
                ) : (
                  <span className="text-white/30">·</span>
                )}
              </div>

              <span
                className={`text-[0.6rem] ${
                  streakDays[i] ? "text-[#C4A882]" : "text-[#4A3728]"
                }`}
              >
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* BADGES */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {badges.map((badge) => {
          const BadgeIcon = badgeIcons[badge.id] || Sprout;

          return (
            <div
              key={badge.id}
              className={`group flex flex-col items-center rounded-2xl p-4 text-center transition-all duration-300 ${
                badge.earned
                  ? "cursor-pointer border border-[rgba(196,168,130,0.25)] bg-[#FFFAF5] shadow-[0_2px_16px_rgba(45,31,20,0.07)] hover:scale-105"
                  : "border border-dashed border-[rgba(196,168,130,0.2)] bg-[#FFFAF5] opacity-70"
              }`}
            >
              {/* ICON */}
              <div
                className="relative mb-2 flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background: badge.earned ? badge.rarityBg : "#EEE8E0",
                  boxShadow: badge.earned
                    ? `0 4px 12px ${badge.rarityColor}30`
                    : "none",
                }}
              >
                {badge.earned ? (
                  <BadgeIcon
                    size={22}
                    style={{ color: badge.rarityColor }}
                  />
                ) : (
                  <Lock size={16} className="text-[#B8A898]" />
                )}
              </div>

              {/* RARITY */}
              <div
                className="mb-1.5 rounded-full px-2 py-0.5"
                style={{
                  background: badge.rarityBg,
                }}
              >
                <span
                  className="text-[0.58rem] font-bold uppercase tracking-[0.04em]"
                  style={{
                    color: badge.rarityColor,
                  }}
                >
                  {badge.rarity}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="text-[0.75rem] font-semibold leading-[1.2] text-[#2D1F14]">
                {badge.name}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-0.75 text-[0.62rem] leading-[1.3] text-[#9E8A78]">
                {badge.description}
              </p>

              {/* DATE */}
              {badge.earned && badge.earnedDate && (
                <div className="mt-1.5 text-[0.6rem] text-[#C4A882]">
                  ✓ {badge.earnedDate}
                </div>
              )}

              {/* PROGRESS */}
              {!badge.earned && badge.progress !== undefined && (
                <div className="mt-2 w-full">
                  <div className="mb-1 flex justify-between">
                    <span className="text-[0.58rem] text-[#9E8A78]">
                      {badge.progress}/{badge.target}
                    </span>

                    <span className="text-[0.58rem] text-[#9E8A78]">
                      {Math.round((badge.progress / badge.target) * 100)}%
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-[#EEE8E0]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(badge.progress / badge.target) * 100}%`,
                        background: `linear-gradient(90deg, ${badge.rarityColor}, ${badge.rarityColor}88)`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
