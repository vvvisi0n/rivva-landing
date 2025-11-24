"use client";

const OPENERS = [
  "What’s a small thing that instantly makes your day better?",
  "What’s your ideal first date if we weren’t trying too hard?",
  "What’s something you’ve been obsessed with lately?",
  "Okay vibe check—what kind of connection are you looking for?",
  "What’s a green flag you wish more people had?",
];

export default function SuggestedOpeners({
  onPick,
  disabled,
}: {
  onPick: (text: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPENERS.map((o) => (
        <button
          key={o}
          onClick={() => onPick(o)}
          disabled={disabled}
          className={`text-xs px-3 py-2 rounded-full border transition
            ${
              disabled
                ? "bg-white/5 border-white/10 opacity-60 cursor-not-allowed"
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
            }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
