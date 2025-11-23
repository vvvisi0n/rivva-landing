"use client";

type BlueprintTier = {
  title: string;
  subtitle: string;
  description: string;
  strengths: string[];
  watchouts: string[];
  lumiTip: string;
};

export default function BlueprintCard({
  tier,
  score,
  maxScore,
}: {
  tier: BlueprintTier;
  score: number;
  maxScore: number;
}) {
  const pct = Math.round((score / maxScore) * 100);

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-7 shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {tier.title}
          </h2>
          <p className="text-white/70 mt-1">{tier.subtitle}</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-white/50 mb-1">Compatibility Score</p>
          <p className="text-2xl font-semibold">
            {pct}%
          </p>
          <p className="text-xs text-white/50">
            {score}/{maxScore}
          </p>
        </div>
      </div>

      <p className="text-white/80 leading-relaxed mt-5">
        {tier.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <p className="text-sm font-semibold text-white mb-2">Your strengths</p>
          <ul className="text-sm text-white/75 list-disc pl-5 space-y-1">
            {tier.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <p className="text-sm font-semibold text-white mb-2">Watch-outs</p>
          <ul className="text-sm text-white/75 list-disc pl-5 space-y-1">
            {tier.watchouts.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-purple-500/15 to-cyan-400/10 border border-white/10 p-4 mt-5">
        <p className="text-sm text-white/85">
          <span className="font-semibold">Lumi tip:</span> {tier.lumiTip}
        </p>
      </div>
    </div>
  );
}
