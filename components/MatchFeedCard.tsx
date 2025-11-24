"use client";

type Match = {
  id: string;
  name: string;
  age: number;
  city: string;
  bio: string;
  tags: string[];
  compatibility: number;
};

export default function MatchFeedCard({
  match,
  onLike,
  onPass,
  disabled,
}: {
  match: Match;
  onLike: () => void;
  onPass: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="w-full rounded-3xl bg-white/5 border border-white/10 p-6 md:p-7 shadow-2xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">
            {match.name}, {match.age}
          </h2>
          <p className="text-sm text-white/60">{match.city}</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-white/50 mb-1">compatibility</p>
          <p className="text-2xl font-extrabold">{match.compatibility}%</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-white/80 mt-4 leading-relaxed">{match.bio}</p>

      {/* Tags */}
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

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <button
          onClick={onPass}
          disabled={disabled}
          className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 text-white font-semibold hover:bg-white/15 transition active:scale-[0.98] disabled:opacity-50"
        >
          Pass
        </button>

        <button
          onClick={onLike}
          disabled={disabled}
          className="px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition active:scale-[0.98] disabled:opacity-50"
        >
          Like
        </button>
      </div>
    </div>
  );
}
