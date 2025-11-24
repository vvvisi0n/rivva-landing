"use client";

import type { Match } from "@/lib/matches";

const OPENERS: Record<Match["vibe"], string[]> = {
  spark: [
    "Okay, important question: what’s your ‘small joy’ this week?",
    "You give good energy — what’s something you’re excited about right now?",
    "We’re matching vibes already. What’s your idea of a perfect first date?",
  ],
  steady: [
    "You seem grounded. What does consistency look like for you in dating?",
    "What’s something you value that you wish people asked you more?",
    "What’s your definition of a peaceful relationship?",
  ],
  deep: [
    "What’s a belief about love you’ve changed your mind about?",
    "When do you feel most understood by someone?",
    "What kind of connection are you hoping to build next?",
  ],
  grounded: [
    "What’s your favorite kind of calm day?",
    "What’s a green flag you notice early?",
    "What’s something you’re building for yourself this year?",
  ],
};

export default function LumiOpeners({
  match,
  onPick,
}: {
  match: Match;
  onPick: (text: string) => void;
}) {
  const options = OPENERS[match.vibe];

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
