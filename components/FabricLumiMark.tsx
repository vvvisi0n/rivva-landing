"use client";

type Props = {
  className?: string;
  shape?: "tile" | "seal"; // tile = rounded square, seal = circle
};

export default function FabricLumiMark({ className, shape = "tile" }: Props) {
  const radius = shape === "seal" ? "rounded-full" : "rounded-3xl";

  return (
    <div
      aria-hidden="true"
      title="Lumi"
      className={[
        "relative isolate",
        "h-10 w-10",
        radius,
        "border border-white/10",
        "bg-white/5",
        "shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
        "overflow-hidden",
        className ?? "",
      ].join(" ")}
    >
      {/* Fabric sheen */}
      <div
        className={[
          "absolute inset-0",
          "bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.20),transparent_55%)]",
        ].join(" ")}
      />

      {/* Soft weave (no image needed) */}
      <div
        className={[
          "absolute inset-0 opacity-35 mix-blend-overlay",
          "bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_35%,rgba(255,255,255,0.06)_70%,transparent_100%)]",
        ].join(" ")}
      />

      {/* Micro texture lines */}
      <div
        className={[
          "absolute inset-0 opacity-25",
          "bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_4px)]",
        ].join(" ")}
      />

      {/* Inner “thread” accent */}
      <div
        className={[
          "absolute inset-[7px]",
          radius,
          "border border-white/10",
          "bg-[radial-gradient(circle_at_60%_40%,rgba(180,140,255,0.35),transparent_70%)]",
          "shadow-inner",
        ].join(" ")}
      />

      {/* Tiny stitch dot */}
      <div className="absolute bottom-[7px] right-[7px] h-1.5 w-1.5 rounded-full bg-white/60 opacity-70" />
    </div>
  );
}
