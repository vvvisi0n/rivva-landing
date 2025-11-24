"use client";

export default function CompatibilityMeter({
  score,
  label,
}: {
  score: number; // 0-100
  label?: string;
}) {
  const safe = Math.max(0, Math.min(100, score));

  return (
    <div className="min-w-[140px]">
      <div className="flex items-center justify-between text-[11px] text-white/60 mb-1">
        <span>{label ?? "compatibility"}</span>
        <span>{safe}%</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all"
          style={{ width: `${safe}%` }}
        />
      </div>
    </div>
  );
}
