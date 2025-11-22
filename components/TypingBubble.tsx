"use client";

import React from "react";

type TypingBubbleProps = {
  label?: string;          // optional text like "Lumi is thinking..."
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function TypingBubble({
  label = "Lumi is thinking…",
  className = "",
  size = "md",
}: TypingBubbleProps) {
  const dotSize =
    size === "sm" ? "w-1.5 h-1.5" : size === "lg" ? "w-3 h-3" : "w-2 h-2";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Bubble */}
      <div className="bg-white/90 border border-slate-200 shadow-sm rounded-2xl px-4 py-2 flex items-center gap-2">
        <span
          className={`${dotSize} rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]`}
        />
        <span
          className={`${dotSize} rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]`}
        />
        <span
          className={`${dotSize} rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]`}
        />
      </div>

      {/* Label */}
      <span className="text-sm text-slate-500">{label}</span>
    </div>
  );
}
