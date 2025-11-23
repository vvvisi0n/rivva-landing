"use client";

import React from "react";

export default function TypingBubble({
  label = "Lumi is thinking…",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative bg-white/10 border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-1 shadow-md">
        <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce [animation-delay:-0.2s]" />
        <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce [animation-delay:-0.1s]" />
        <span className="w-2 h-2 rounded-full bg-white/70 animate-bounce" />
      </div>

      {label && (
        <p className="text-sm text-white/70 select-none">{label}</p>
      )}
    </div>
  );
}
