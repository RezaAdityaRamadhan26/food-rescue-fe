/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  initialSeconds?: number;
}

export function CountdownTimer({ initialSeconds = 5058 }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const format = (value: number) => String(value).padStart(2, "0");

  const timerItems = [
    {
      label: "HR",
      value: format(hours),
    },
    {
      label: "MIN",
      value: format(minutes),
    },
    {
      label: "SEC",
      value: format(secs),
    },
  ];

  return (
    <div className="flex items-center gap-5 rounded-[28px] border border-[#BBAB8C]/20 bg-[#BBAB8C]/10 p-5">
      <div className="flex items-center gap-2">
        <Clock size={16} className="text-[#BBAB8C]" strokeWidth={2} />

        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#BBAB8C]">
          Offer Ends In
        </span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        {timerItems.map((item, index) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#091413] text-[#FFFCFB]">
                <span className="text-xl">
                  {item.value}
                </span>
              </div>

              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#091413]/40">
                {item.label}
              </span>
            </div>

            {index !== timerItems.length - 1 && (
              <span className="mb-5 text-xl font-light text-[#BBAB8C]">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
