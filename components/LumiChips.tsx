"use client";

type Props = {
  suggestions: string[];
  onPick: (text: string) => void;
  disabled?: boolean;
};

export default function LumiChips({ suggestions, onPick, disabled }: Props) {
  if (!suggestions.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((s, i) => (
        <button
          key={i}
          disabled={disabled}
          onClick={() => onPick(s)}
          className={`text-sm px-3 py-2 rounded-full border transition
            ${
              disabled
                ? "bg-white/5 border-white/10 opacity-50 cursor-not-allowed"
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
            }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
