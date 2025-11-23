"use client";

import React from "react";

type LumiOrbProps = {
  size?: number; // px
  className?: string;
};

export default function LumiOrb({ size = 180, className = "" }: LumiOrbProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-60 animate-pulse"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(124,58,237,0.9), rgba(34,211,238,0.35), transparent 65%)",
        }}
      />

      {/* Orb body */}
      <div
        className="relative rounded-full shadow-2xl animate-[float_4s_ease-in-out_infinite]"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          background:
            "radial-gradient(circle at 30% 25%, #a78bfa 0%, #7c3aed 35%, #22d3ee 70%, #0b0b14 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      />

      {/* Ring */}
      <div
        className="absolute rounded-full border border-white/10 animate-[spin_18s_linear_infinite]"
        style={{
          width: size * 0.95,
          height: size * 0.95,
          boxShadow: "0 0 40px rgba(124,58,237,0.35)",
        }}
      />
    </div>
  );
}
