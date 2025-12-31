"use client";

import type { Match } from "@/lib/matches";

// These are the only "vibe buckets" that OPENERS supports.
// Keep this independent from Match so TS doesn't break when Match changes.
type OpenerVibe = "spark" | "grounded" | "deep";

const OPENERS: Record<OpenerVibe, string[]> = {
  spark: [
    "Okay, important question: what’s your ‘small joy’ this week?",
    "You give good energy — what’s something you’re excited about right now?",
    "What’s a random thing you’ve been obsessed with lately?",
  ],
  grounded: [
    "What’s something you’re looking forward to this month?",
    "What’s your ideal kind of weekend?",
    "What’s a green flag you wish more people had?",
  ],
  deep: [
    "What’s something you’re proud of that most people wouldn’t guess?",
    "What’s a lesson you’ve learned about love the hard way?",
    "What kind of connection are you hoping to build right now?",
  ],
};

// Infer vibe without requiring Match to have a `vibe` field.
// Order of preference:
// 1) match.vibe if present
// 2) derive from vibeTags if present
// 3) default to "grounded"
function inferVibe(match: Match): OpenerVibe {
  const maybeVibe = (match as any).vibe as OpenerVibe | undefined;
  if (maybeVibe && maybeVibe in OPENERS) return maybeVibe;

  const tags = match.vibeTags?.map((t) => t.toLowerCase()) ?? [];

  // lightweight heuristics
  if (
    tags.some((t) =>
      ["spark", "playful", "fun", "flirty", "energy", "excited"].includes(t)
    )
  ) {
    return "spark";
  }

  if (
    tags.some((t) =>
      ["deep", "introspective", "emotional", "growth", "healing"].includes(t)
    )
  ) {
    return "deep";
  }

  return "grounded";
}

export default function LumiOpeners({
  match,
  onPick,
}: {
  match: Match;
  onPick: (text: string) => void;
}) {
  const vibe = inferVibe(match);
  const options = OPENERS[vibe];

  return (
    <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
      <p className="text-xs text-white/60 mb-2">
        Lumi suggests starting like this:
      </p>

      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => (
          <button
            key={i}
            onClick={() => onPick(o)}
            className="text-xs px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition"
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}