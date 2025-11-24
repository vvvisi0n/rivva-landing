"use client";

import React from "react";

type Props = {
  label?: string;
  className?: string;
};

export default function TypingBubble({
  label = "Lumi is thinking…",
  className = "",
}: Props) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-1">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
      <p className="text-sm text-white/75">{label}</p>
    </div>
  );
}