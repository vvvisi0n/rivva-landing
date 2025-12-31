"use client";

type Props = {
  className?: string;
  title?: string;
};

export default function LumiOrb({ className, title = "Lumi" }: Props) {
  return (
    <div
      aria-hidden="true"
      title={title}
      className={
        className ??
        [
          "relative h-10 w-10 rounded-full",
          "border border-white/10",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.35)]",
          "bg-gradient-to-br from-white/10 via-white/5 to-white/0",
          "overflow-hidden",
        ].join(" ")
      }
    >
      {/* soft core */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-300/25 via-indigo-300/10 to-transparent" />

      {/* glow ring */}
      <div className="absolute inset-[-6px] rounded-full blur-xl bg-violet-400/10" />

      {/* sparkle highlight */}
      <div className="absolute top-2 left-2 h-2.5 w-2.5 rounded-full bg-white/50 blur-[0.5px]" />

      {/* subtle motion (won’t be aggressive; low-stimulation can disable transitions globally) */}
      <div className="absolute inset-0 rounded-full animate-pulse opacity-30 bg-violet-400/10" />
    </div>
  );
}
