"use client";

import { useMemo } from "react";
import type { Match } from "@/lib/matches";

export default function CoachNudge({ match }: { match: Match }) {
  const nudge = useMemo(() => {
    const lines = [
      `You and ${match.name} both feel ${match.vibe}-leaning. Don’t rush — lead with a real question.`,
      `Notice how their bio feels calm + clear. If that’s your vibe, open soft and intentional.`,
      `This match looks low-chaos. If you want steady, ask about what “consistency” means to them.`,
      `Energy feels warm here. Start with curiosity, not performance.`,
      `This could be a slow-burn win. Let it breathe.`,
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  }, [match]);

  return (
    <div className="rounded-2xl bg-black/40 border border-white/10 p-4 text-left">
      <p className="text-xs text-white/60 mb-1">Lumi coach nudge</p>
      <p className="text-sm text-white/80 leading-relaxed">{nudge}</p>
    </div>
  );
}
