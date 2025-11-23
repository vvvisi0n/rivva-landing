"use client";

import React from "react";

type TypingBubbleProps = {
  label?: string;
  className?: string;
};

export default function TypingBubble({
  label = "Lumi is typing…",
  className = "",
}: TypingBubbleProps) {
  return (
    <div
      className={`flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 w-fit ${className}`}
      aria-live="polite"
      aria-label={label}
    >
      {/* Dots */}
      <div className="flex items-center gap-1">
        <span className="dot" />
        <span className="dot dot-delay-1" />
        <span className="dot dot-delay-2" />
      </div>

      {/* Label */}
      <p className="text-sm text-white/70">{label}</p>
    </div>
  );
}
