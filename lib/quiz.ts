export type QuizTier = "spark" | "steady" | "deep" | "grounded";

export function scoreToTier(score: number): QuizTier {
  if (score >= 11) return "grounded";
  if (score >= 9) return "deep";
  if (score >= 6) return "steady";
  return "spark";
}

export function tierLabel(tier: QuizTier) {
  switch (tier) {
    case "grounded":
      return "Grounded Connector";
    case "deep":
      return "Deep Feeler";
    case "steady":
      return "Steady Builder";
    case "spark":
    default:
      return "Spark Seeker";
  }
}

export function tierSummary(tier: QuizTier) {
  switch (tier) {
    case "grounded":
      return "You prioritize emotional safety and consistency. You connect best with calm, values-led people who feel like home.";
    case "deep":
      return "You want meaningful connection early. Chemistry matters, but only when the conversation feels real and emotionally present.";
    case "steady":
      return "You’re into slow-burn trust. You thrive with partners who show up predictably and grow with you.";
    case "spark":
    default:
      return "You lead with energy and attraction. You want fun + curiosity first, then depth once the vibe is right.";
  }
}

export function tierVibes(tier: QuizTier) {
  // which kinds of matches to prioritize for now
  switch (tier) {
    case "grounded":
      return ["grounded", "steady", "deep"];
    case "deep":
      return ["deep", "grounded", "steady"];
    case "steady":
      return ["steady", "grounded", "spark"];
    case "spark":
    default:
      return ["spark", "steady", "deep"];
  }
}
