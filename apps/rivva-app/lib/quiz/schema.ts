export type QuizTone = "calm" | "playful" | "direct" | "soft";
export type QuizPace = "slow" | "medium" | "fast";
export type QuizValues = "family" | "faith" | "ambition" | "stability" | "creativity" | "service";

export type QuizResult = {
  tone: QuizTone;
  pace: QuizPace;
  values: QuizValues[];
  nonNegotiables: string[];
};

export const DEFAULT_QUIZ: QuizResult = {
  tone: "calm",
  pace: "slow",
  values: ["stability", "family"],
  nonNegotiables: ["respect", "consistency"],
};
