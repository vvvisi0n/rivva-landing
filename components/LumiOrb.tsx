"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  size?: number;          // px
  className?: string;
  pulse?: boolean;
};

export default function LumiOrb({ size = 180, className = "", pulse = true }: Props) {
  const [t, setT] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 60);
    return () => clearInterval(id);
  }, []);

  const glow = useMemo(() => {
    // subtle breathing glow
    const a = pulse ? 0.5 + 0.5 * Math.sin(t / 10) : 0.7;
    return {
      boxShadow: `
        0 0 ${40 * a}px rgba(140, 92, 255, 0.55),
        0 0 ${80 * a}px rgba(90, 200, 255, 0.35),
        0 0 ${120 * a}px rgba(140, 92, 255, 0.25)
      `,
      transform: `translateY(${pulse ? Math.sin(t / 12) * 4 : 0}px)`,
    } as React.CSSProperties;
  }, [t, pulse]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div
        className="rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-400 opacity-90"
        style={{ width: size, height: size, ...glow }}
      />

      {/* inner core */}
      <div
        className="absolute rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
        style={{ width: size * 0.6, height: size * 0.6 }}
      />

      {/* tiny sparkles */}
      <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
        <div className="absolute top-2 left-10 h-2 w-2 rounded-full bg-white/80 blur-[1px]" />
        <div className="absolute bottom-6 right-12 h-1.5 w-1.5 rounded-full bg-white/70 blur-[1px]" />
        <div className="absolute top-14 right-6 h-1 w-1 rounded-full bg-white/60 blur-[1px]" />
      </div>
    </div>
  );
}
