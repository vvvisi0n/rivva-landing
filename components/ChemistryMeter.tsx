"use client";

export default function ChemistryMeter({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, score));

  const label =
    clamped < 25
      ? "Warming up"
      : clamped < 55
      ? "Good flow"
      : clamped < 80
      ? "Strong vibe"
      : "High chemistry";

  return (
    <div className="w-full rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-white/60">Chemistry</p>
        <p className="text-xs text-white/70">{label}</p>
      </div>

      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>

      <p className="mt-2 text-[11px] text-white/50">
        Lumi updates this based on tone + momentum.
      </p>
    </div>
  );
}
