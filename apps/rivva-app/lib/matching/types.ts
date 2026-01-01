export type QuizTier = "A" | "B" | "C" | "D" | "E";

export type Candidate = {
  id: string;
  name: string;
  age: number;
  city: string;
  headline: string;
  tags: string[];
  quizTier?: QuizTier;
  lastActiveLabel?: string;
};

export type UserSignal = {
  quizTier?: QuizTier;
  aboutMeTags?: string[];
  lookingForTags?: string[];
};

export type ScoreBreakdown = {
  tierMatch: number;
  tagOverlap: number;
  recency: number;
  total: number;
  overlapTags: string[];
};

export type RankedCandidate = Candidate & {
  score: ScoreBreakdown;
};
