export type QuizTier = "A" | "B" | "C" | "D" | "E";

export const QUIZ_COPY: Record<
  QuizTier,
  {
    headline: string;
    subhead: string;
    strengths: string[];
    watchouts: string[];
    nextSteps: string[];
  }
> = {
  A: {
    headline: "Steady signal. Low noise.",
    subhead:
      "You prefer clarity, directness, and calm. Rivva will keep matches tight and intentional.",
    strengths: ["Clear communication", "Strong boundaries", "Low drama tolerance"],
    watchouts: ["Over-filtering too early", "Mistaking calm for chemistry"],
    nextSteps: ["Add 3–5 tags", "Set your intent", "Preview your first matches"],
  },
  B: {
    headline: "Warm signal. Selective energy.",
    subhead:
      "You’re open, but still intentional. Rivva will prioritize aligned values and pace.",
    strengths: ["Balanced openness", "Good pacing", "Healthy curiosity"],
    watchouts: ["Going quiet when unsure", "Giving too much benefit of doubt"],
    nextSteps: ["Add 3–5 tags", "Set your intent", "Preview your first matches"],
  },
  C: {
    headline: "Open signal. High potential.",
    subhead:
      "You’re curious and exploring. Rivva will help you turn exploration into alignment.",
    strengths: ["Openness", "Curiosity", "Adaptability"],
    watchouts: ["Mixed signals", "Saying yes too fast"],
    nextSteps: ["Add tags that define your boundaries", "Set your intent", "Preview your first matches"],
  },
  D: {
    headline: "Selective signal. Strong filter.",
    subhead:
      "You know what you want. Rivva will focus on fewer, higher-confidence introductions.",
    strengths: ["High standards", "Strong discernment", "Self-awareness"],
    watchouts: ["Dismissing good fits too quickly", "Assuming mismatch without clarity"],
    nextSteps: ["Add tags that describe your non-negotiables", "Set your intent", "Preview your first matches"],
  },
  E: {
    headline: "Protected signal. Clarity-first.",
    subhead:
      "You value safety and control. Rivva will keep matching conservative and respectful.",
    strengths: ["Boundaries", "Self-protection", "Clear priorities"],
    watchouts: ["Keeping distance even when safe", "Assuming worst-case intent"],
    nextSteps: ["Add tags that clarify your pace", "Set your intent", "Preview your first matches"],
  },
};
