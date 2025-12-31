/**
 * Rivva Design System — Emotional Aurora
 * This is the single source of truth for color decisions.
 */

export const RivvaColors = {
  background: {
    gradient: "bg-gradient-to-b from-indigo-950 via-violet-950 to-slate-950",
    surface: "bg-white/5",
    surfaceStrong: "bg-white/10",
    border: "border-white/10",
  },

  text: {
    primary: "text-white",
    secondary: "text-white/70",
    muted: "text-white/50",
  },

  accent: {
    lumi: {
      text: "text-violet-300",
      bg: "bg-violet-500/20",
      border: "border-violet-400/30",
      glow: "shadow-[0_0_30px_rgba(139,92,246,0.35)]",
    },

    emotion: {
      primary: "bg-rose-500",
      text: "text-rose-300",
      softBg: "bg-rose-500/10",
      border: "border-rose-400/30",
    },

    success: {
      bg: "bg-emerald-400",
      text: "text-emerald-200",
      border: "border-emerald-400/40",
    },
  },

  focus: {
    ring: "focus:ring-2 focus:ring-violet-400/60",
  },
};
