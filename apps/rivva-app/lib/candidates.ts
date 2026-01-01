import type { Candidate } from "./matching/types";

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "c_001",
    name: "Maya",
    age: 28,
    city: "Brooklyn",
    headline: "Calm. Direct. Warm once I feel safe.",
    tags: ["calm", "communication", "intentional", "music", "coffee", "boundaries"],
    quizTier: "B",
    lastActiveLabel: "Today",
  },
  {
    id: "c_002",
    name: "Sam",
    age: 30,
    city: "Queens",
    headline: "Low drama. High consistency.",
    tags: ["consistency", "honesty", "quiet", "books", "walks", "cooking"],
    quizTier: "A",
    lastActiveLabel: "Online now",
  },
  {
    id: "c_003",
    name: "Ari",
    age: 27,
    city: "Manhattan",
    headline: "I like real plans. Not endless texting.",
    tags: ["plans", "clarity", "direct", "museum", "fitness", "family"],
    quizTier: "C",
    lastActiveLabel: "2d",
  },
  {
    id: "c_004",
    name: "Noor",
    age: 29,
    city: "Jersey City",
    headline: "Emotionally steady. Quiet confidence.",
    tags: ["emotionally steady", "boundaries", "growth", "art", "tea", "values"],
    quizTier: "B",
    lastActiveLabel: "1d",
  },
];
