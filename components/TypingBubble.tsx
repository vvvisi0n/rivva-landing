"use client";

import React from "react";

type Props = {
  label?: string;
  className?: string;
};

export default function TypingBubble({
  label = "Lumi is typing…",
  className,
}: Props) {
  return (
    <div
      className={`flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 ${className || ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-white/70 animate-bounce [animation-delay:-0.2s]" />
        <span className="h-2 w-2 rounded-full bg-white/70 animate-bounce [animation-delay:-0.1s]" />
        <span className="h-2 w-2 rounded-full bg-white/70 animate-bounce" />
      </div>
      <p className="text-sm text-white/70">{label}</p>
    </div>
  );
}
