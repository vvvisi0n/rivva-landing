"use client";

type Match = {
  id: string;
  name: string;
  age: number;
  city: string;
  vibe: string;
  tags: string[];
  compatibility: number; // 0-100
};

export default function MatchCard({ match }: { match: Match }) {
  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-5 shadow-lg hover:bg-white/10 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-lg font-semibold">
            {match.name}, {match.age}
          </h4>
          <p className="text-sm text-white/60">{match.city}</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-white/50 mb-1">compatibility</p>
          <p className="text-xl font-bold text-white">
            {match.compatibility}%
          </p>
        </div>
      </div>

      <p className="text-white/80 mt-3 text-sm leading-relaxed">
        {match.vibe}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {match.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/75"
          >
            {t}
          </span>
        ))}
      </div>

      <button
        className="mt-5 w-full px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition active:scale-[0.98]"
        onClick={() => alert("Matches will be interactive in Phase 3.")}
      >
        View Match
      </button>
    </div>
  );
}
