export type QuizTier = "A" | "B" | "C" | "D" | "E";

export type MatchCandidate = {
  id: string;
  name?: string;
  age?: number;
  city?: string;
  lookingFor?: string;
  aboutMeTags?: string[];
  lookingForTags?: string[];
  quizTier?: QuizTier;

  // Optional future fields. Safe to ignore if missing.
  values?: string[];
  dealbreakers?: string[];
};

export type ViewerProfile = {
  id?: string;
  age?: number;
  city?: string;
  lookingFor?: string;
  aboutMeTags?: string[];
  lookingForTags?: string[];
  quizTier?: QuizTier;

  // Optional future fields.
  values?: string[];
  dealbreakers?: string[];

  // Preferences.
  distanceMiles?: number;
};

export type MatchExplanation = {
  label: string;
  detail: string;
  weight: number;
};

export type ScoredMatch = {
  candidate: MatchCandidate;
  score: number; // 0..100
  explanations: MatchExplanation[];
};

