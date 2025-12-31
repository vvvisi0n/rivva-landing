"use client";

type Props = {
  className?: string;
  active?: boolean;
};

export default function RivvaOrb({ className, active = false }: Props) {
  return (
    <div
      aria-hidden="true"
      className={[
        "relative rounded-full",
        "bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),rgba(255,255,255,0.15),transparent_70%)]",
        "backdrop-blur-xl",
        "shadow-[0_0_40px_rgba(167,139,250,0.25)]",
        "transition-all duration-700 ease-out",
        active ? "animate-rivva-breathe" : "",
        className ?? "h-20 w-20",
      ].join(" ")}
    >
      <div
        className="absolute inset-2 rounded-full
        bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_65%)]
        opacity-60"
      />
    </div>
  );
}
