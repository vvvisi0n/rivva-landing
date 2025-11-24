"use client";

import React from "react";

type Props = {
  index: number; // 0-based
  total: number;
};

export default function QuizProgressHeader({ index, total }: Props) {
  const pct = Math.round((index / total) * 100);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-white/70">
          Question {index + 1} of {total}
        </p>
        <p className="text-sm text-white/70">{pct}%</p>
      </div>

      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}