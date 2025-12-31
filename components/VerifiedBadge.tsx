"use client";

export default function VerifiedBadge({ small }: { small?: boolean }) {
  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full border font-semibold " +
        (small
          ? "px-2 py-0.5 text-[10px] bg-emerald-500/10 border-emerald-400/30 text-emerald-200"
          : "px-2.5 py-1 text-xs bg-emerald-500/10 border-emerald-400/30 text-emerald-200")
      }
      title="Verified (mock)"
    >
      <span className="text-emerald-300">✓</span>
      Verified
    </span>
  );
}
