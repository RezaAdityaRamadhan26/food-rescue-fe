"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { ArrowUpRight, Leaf, Store, TrendingUp, Wind } from "lucide-react";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useCounter(target: number, duration = 2600, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let start: number | null = null;

    const animate = (ts: number) => {
      if (!start) start = ts;

      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.round(eased * target));

      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };

    requestAnimationFrame(animate);
  }, [shouldStart, target, duration]);

  return count;
}

function CircleArc({ pct, animate }: { pct: number; animate: boolean }) {
  const r = 42;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="rgba(185,141,103,0.13)"
        strokeWidth="8"
      />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="#B98D67"
        strokeWidth="8"
        strokeDasharray={circ}
        strokeDashoffset={animate ? offset : circ}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        style={{
          transition: animate
            ? "stroke-dashoffset 2.8s cubic-bezier(0.16,1,0.3,1)"
            : "none",
        }}
      />
    </svg>
  );
}

function DotGrid({ animate }: { animate: boolean }) {
  const dots = [
    { x: 6, y: 6, r: 3.5, o: 0.95, d: 0 },
    { x: 27, y: 17, r: 4.5, o: 0.95, d: 8 },
    { x: 42, y: 47, r: 4, o: 0.9, d: 22 },
  ];

  return (
    <svg viewBox="0 0 100 54" className="w-full h-13.5">
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill="#C9A882"
          initial={{ opacity: 0, scale: 0 }}
          animate={animate ? { opacity: d.o, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: d.d * 0.02 }}
        />
      ))}
    </svg>
  );
}

const mealsSparkData = [
  { v: 42 },
  { v: 68 },
  { v: 55 },
  { v: 85 },
  { v: 95 },
  { v: 108 },
  { v: 100 },
  { v: 130 },
];

const monthlyWaste = [
  { m: "Jan", p: 62 },
  { m: "Feb", p: 71 },
  { m: "Mar", p: 68 },
  { m: "Apr", p: 75 },
  { m: "May", p: 80 },
  { m: "Jun", p: 68 },
];

type UMKMCardProps = {
  count: number;
  inView: boolean;
};

const cardStyle: React.CSSProperties = {
  background: "rgba(22,36,32,0.93)",
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
  border: "1px solid rgba(185,141,103,0.18)",
  borderRadius: "28px",
  boxShadow:
    "0 12px 52px rgba(9,20,19,0.22), 0 3px 12px rgba(9,20,19,0.12), inset 0 1px 0 rgba(185,141,103,0.08)",
  padding: "32px",
  position: "relative",
  overflow: "hidden",
};

const glowTop: React.CSSProperties = {
  position: "absolute",
  top: "-25%",
  right: "-8%",
  width: "260px",
  height: "260px",
  background:
    "radial-gradient(circle, rgba(185,141,103,0.09) 0%, transparent 70%)",
  pointerEvents: "none",
};

const glowBottom: React.CSSProperties = {
  position: "absolute",
  bottom: "-20%",
  left: "-10%",
  width: "200px",
  height: "200px",
  background: "radial-gradient(circle, rgba(44,90,55,0.1) 0%, transparent 70%)",
  pointerEvents: "none",
};

function MealsCard({ count, inView }: { count: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "rgba(255,252,251,0.78)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,252,251,0.65)",
        borderRadius: "28px",
        boxShadow:
          "0 10px 48px rgba(9,20,19,0.07), 0 2px 10px rgba(9,20,19,0.04), inset 0 1px 0 rgba(255,255,255,0.7)",
        padding: "32px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Card inner glow */}
      <div
        style={{
          position: "absolute",
          top: "-25%",
          right: "-10%",
          width: "220px",
          height: "220px",
          background:
            "radial-gradient(circle, rgba(185,141,103,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div
            style={{
              background: "rgba(185,141,103,0.12)",
              borderRadius: "12px",
              padding: "8px",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              style={{ width: 18, height: 18, color: "#B98D67" }}
            >
              <path
                d="M18 8h1a4 4 0 0 1 0 8h-1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <line
                x1="6"
                y1="1"
                x2="6"
                y2="4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <line
                x1="10"
                y1="1"
                x2="10"
                y2="4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <line
                x1="14"
                y1="1"
                x2="14"
                y2="4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11.5px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "#9A8070",
            }}
          >
            MEALS RESCUED
          </span>
        </div>
        <div
          className="flex items-center gap-1"
          style={{
            background: "rgba(44,90,55,0.09)",
            borderRadius: "20px",
            padding: "4px 10px",
          }}
        >
          <TrendingUp size={11} style={{ color: "#2C5A37" }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11.5px",
              fontWeight: 600,
              color: "#2C5A37",
            }}
          >
            +24.8%
          </span>
        </div>
      </div>

      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(2.4rem, 3.5vw, 3.1rem)",
          fontWeight: 700,
          color: "#091413",
          lineHeight: 1,
          marginBottom: "5px",
          letterSpacing: "-0.02em",
        }}
      >
        {count.toLocaleString()}
      </div>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px",
          color: "#9A8070",
          marginBottom: "22px",
          lineHeight: 1.5,
        }}
      >
        Meals rescued and counting
      </p>

      {/* Sparkline */}
      <div style={{ height: "62px", marginBottom: "6px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mealsSparkData}
            margin={{ top: 5, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="mealGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B98D67" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#B98D67" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke="#B98D67"
              strokeWidth={2}
              fill="url(#mealGrad)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between">
        {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              color: "#C4B5A8",
            }}
          >
            {m}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function CO2Card({ count, inView }: { count: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "rgba(255,252,251,0.78)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,252,251,0.65)",
        borderRadius: "28px",
        boxShadow:
          "0 10px 48px rgba(9,20,19,0.07), 0 2px 10px rgba(9,20,19,0.04), inset 0 1px 0 rgba(255,255,255,0.7)",
        padding: "32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "220px",
          height: "220px",
          background:
            "radial-gradient(circle, rgba(44,90,55,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="flex items-center gap-2.5 mb-5">
        <div
          style={{
            background: "rgba(44,90,55,0.1)",
            borderRadius: "12px",
            padding: "8px",
          }}
        >
          <Wind size={18} style={{ color: "#2C5A37" }} />
        </div>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11.5px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "#9A8070",
          }}
        >
          CO₂ PREVENTED
        </span>
      </div>

      <div className="flex items-center gap-5 mb-5">
        <div
          style={{
            width: "96px",
            height: "96px",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <CircleArc pct={78} animate={inView} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: "#B98D67",
                lineHeight: 1,
              }}
            >
              78%
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "9.5px",
                color: "#C4B5A8",
                marginTop: "2px",
              }}
            >
              annual goal
            </span>
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.9rem, 2.8vw, 2.6rem)",
              fontWeight: 700,
              color: "#091413",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: "4px",
            }}
          >
            {count.toLocaleString()}
            <span
              style={{
                fontSize: "1.1rem",
                color: "#B98D67",
                fontWeight: 500,
                marginLeft: "3px",
              }}
            >
              t
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "#9A8070",
              lineHeight: 1.6,
            }}
          >
            Metric tons of CO₂
            <br />
            prevented this year
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(185,141,103,0.12)",
          paddingTop: "16px",
        }}
      >
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {[
            { dot: "#B98D67", text: "≈ 267 cars removed" },
            { dot: "#2C5A37", text: "3.2 km² forest saved" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: item.dot,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  color: "#9A8070",
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function WasteCard({ count, inView }: { count: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "rgba(255,252,251,0.78)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,252,251,0.65)",
        borderRadius: "28px",
        boxShadow:
          "0 10px 48px rgba(9,20,19,0.07), 0 2px 10px rgba(9,20,19,0.04), inset 0 1px 0 rgba(255,255,255,0.7)",
        padding: "32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-5%",
          width: "180px",
          height: "180px",
          background:
            "radial-gradient(circle, rgba(185,141,103,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="flex items-center gap-2.5 mb-5">
        <div
          style={{
            background: "rgba(185,141,103,0.12)",
            borderRadius: "12px",
            padding: "8px",
          }}
        >
          <Leaf size={18} style={{ color: "#B98D67" }} />
        </div>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11.5px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "#9A8070",
          }}
        >
          FOOD WASTE REDUCED
        </span>
      </div>

      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(2.4rem, 3.5vw, 3.1rem)",
          fontWeight: 700,
          color: "#091413",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          marginBottom: "5px",
        }}
      >
        {count}
        <span style={{ color: "#B98D67" }}>%</span>
      </div>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px",
          color: "#9A8070",
          marginBottom: "20px",
        }}
      >
        Reduction from partner restaurants
      </p>

      {/* Monthly bar chart */}
      <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
        {monthlyWaste.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10.5px",
                color: "#C4B5A8",
                width: "26px",
                flexShrink: 0,
              }}
            >
              {item.m}
            </span>
            <div
              style={{
                flex: 1,
                height: "5px",
                background: "rgba(185,141,103,0.09)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${item.p}%` } : { width: 0 }}
                transition={{
                  duration: 1.3,
                  delay: 0.45 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, #B98D67 0%, ${item.p > 75 ? "#CFA882" : "#D4B89C"} 100%)`,
                  borderRadius: "3px",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10.5px",
                color: "#9A8070",
                width: "28px",
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {item.p}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function UMKMCard({ count, inView }: UMKMCardProps) {
  return (
    <motion.div
      style={cardStyle}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: 0.46,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* ── Glow Effects ── */}
      <div style={glowTop} />
      <div style={glowBottom} />

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div
            style={{
              background: "rgba(185,141,103,0.15)",
              borderRadius: "12px",
              padding: "8px",
            }}
          >
            <Store size={18} style={{ color: "#C9A882" }} />
          </div>

          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11.5px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "rgba(185,141,103,0.65)",
            }}
          >
            LOCAL UMKM PARTNERS
          </span>
        </div>

        <div
          style={{
            background: "rgba(185,141,103,0.1)",
            borderRadius: "50%",
            padding: "6px",
          }}
        >
          <ArrowUpRight size={14} style={{ color: "rgba(185,141,103,0.6)" }} />
        </div>
      </div>

      {/* ── Main Value ── */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(2.4rem, 3.5vw, 3.1rem)",
          fontWeight: 700,
          color: "#F6F1EA",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          marginBottom: "6px",
        }}
      >
        {count.toLocaleString()}
      </div>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px",
          color: "rgba(246,241,234,0.45)",
          marginBottom: "22px",
          lineHeight: 1.5,
        }}
      >
        Businesses across 24 cities
      </p>

      {/* ── Dot Grid ── */}
      <DotGrid animate={inView} />

      {/* ── Categories ── */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {[
          { dot: "#C9A882", text: "Restaurants" },
          { dot: "rgba(201,168,130,0.45)", text: "Cafés" },
          { dot: "rgba(201,168,130,0.22)", text: "Markets" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: item.dot,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11.5px",
                color: "rgba(246,241,234,0.45)",
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ImpactSection() {
  const { ref, inView } = useInView();

  const meals = useCounter(847293, 2800, inView);
  const co2 = useCounter(1240, 2500, inView);
  const waste = useCounter(68, 2200, inView);
  const umkm = useCounter(2847, 2600, inView);

  return (
    <section ref={ref} className="min-h-screen py-28 px-6 bg-[#FFFCFB]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        <h1 className="text-5xl font-serif text-center text-[#091413] col-span-full">
          Dampak Food Rescue
        </h1>
        <p className="text-lg text-[#091413]/65 col-span-full text-center max-w-3xl mx-auto">
          Kami bermitra dengan UMKM lokal untuk menyelamatkan kelebihan makanan,
          mengurangi emisi karbon, dan menciptakan perubahan yang berarti bagi
          masyarakat, satu makanan yang diselamatkan pada satu waktu.
        </p>
        <div className="mt-15 mx-aut grid md:grid-cols-2 gap-6 col-span-full">
          <MealsCard count={meals} inView={inView} />
          <CO2Card count={co2} inView={inView} />
          <WasteCard count={waste} inView={inView} />
          <UMKMCard count={umkm} inView={inView} />
        </div>
      </div>
    </section>
  );
}
