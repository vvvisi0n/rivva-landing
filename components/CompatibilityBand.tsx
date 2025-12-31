"use client";

export default function CompatibilityBand({
  score,
}: {
  score?: number;
}) {
  const s = typeof score === "number" ? Math.max(0, Math.min(100, score)) : null;

  const label =
    s == null ? "—" :
    s >= 85 ? "Strong" :
    s >= 70 ? "Good" :
    s >= 55 ? "Moderate" :
    "Low";

  const width = s == null ? 0 : s;

  return (
    <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Compatibility</p>
        <p className="text-xs text-white/70">
          {s == null ? "Not scored" : `${label} • ${s}%`}
        </p>
      </div>

      <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full bg-white/70" style={{ width: `${width}%` }} />
      </div>

      <p className="text-xs text-white/60 mt-3">
        Rivva prioritizes “why” over a number.
      </p>
    </div>
  );
}
