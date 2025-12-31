"use client";

type Props = { className?: string };

export default function FoundingOrb({ className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={
        className ??
        "relative h-12 w-12 rounded-full overflow-hidden " +
          "bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.85),rgba(255,255,255,0.10),transparent_65%)] " +
          "border border-white/15 shadow-[0_0_55px_15px_rgba(147,51,234,0.22)]"
      }
    >
      <div className="absolute inset-0 opacity-70 animate-[spin_10s_linear_infinite]">
        <div className="absolute -inset-6 rounded-full bg-[conic-gradient(from_180deg,rgba(147,51,234,0.0),rgba(79,70,229,0.35),rgba(34,211,238,0.25),rgba(147,51,234,0.0))]" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.55),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(34,211,238,0.18),transparent_55%)]" />

      <div className="absolute inset-1 rounded-full border border-white/10" />
      <div className="absolute inset-0 animate-pulse opacity-40 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_55%)]" />
    </div>
  );
}
