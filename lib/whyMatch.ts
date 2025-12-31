import type { Match } from "@/lib/matches";
import { loadProfile } from "@/lib/profile";

export type WhyMatch = {
  headline: string;
  summary: string;
  bullets: string[];
  signals: { label: string; value: string }[];
};

function pick<T>(arr: T[], fallback: T): T {
  if (!arr || arr.length === 0) return fallback;
  return arr[Math.floor(Math.random() * arr.length)];
}

function tierCopy(tier?: string) {
  switch (tier) {
    case "spark":
      return {
        headline: "Chemistry + curiosity",
        summary:
          "You tend to connect through energy, play, and quick emotional reads. This match fits that rhythm without feeling chaotic.",
      };
    case "anchor":
      return {
        headline: "Stability + consistency",
        summary:
          "You value steadiness and follow-through. This match signals grounded energy and low-drama connection building.",
      };
    case "empath":
      return {
        headline: "Emotional depth + safety",
        summary:
          "You’re tuned to emotional cues and care about how love feels. This match has signals that support safe, honest connection.",
      };
    case "magnetic":
      return {
        headline: "Confidence + warmth",
        summary:
          "You like bold energy that still feels kind. This match leans expressive while staying emotionally present.",
      };
    default:
      return {
        headline: "Intentional compatibility",
        summary:
          "Rivva prioritizes emotional alignment over endless swiping. This match fits your pace and the way you build trust.",
      };
  }
}

export function buildWhyMatch(match: Match): WhyMatch {
  const profile = loadProfile();
  const tier = profile?.quizTier;

  const vibeTags = match.vibeTags ?? [];
  const topTags = vibeTags.slice(0, 3);

  const pace = profile?.pace ?? "balanced";
  const lookingFor = profile?.lookingFor ?? "open";

  const base = tierCopy(tier);

  const bullets: string[] = [];

  bullets.push(
    lookingFor === "serious"
      ? "Your intent leans serious. This profile reads like someone who can build toward something real."
      : lookingFor === "casual"
      ? "You prefer low-pressure connection. This profile feels easy to talk to without forcing intensity."
      : "You’re open to connection. This profile has the right mix of warmth and curiosity."
  );

  bullets.push(
    pace === "slow"
      ? "Your pacing is slow + intentional. This match gives ‘steady over rushed’ energy."
      : pace === "fast"
      ? "You move fast when it feels right. This match has enough spark to keep momentum, without red flags."
      : "Your pacing is balanced. This match supports consistent connection without feeling heavy."
  );

  if (match.bio) {
    bullets.push("Their bio signals emotional presence (not just aesthetics).");
  }

  if (topTags.length > 0) {
    bullets.push(`Shared vibe signals: ${topTags.join(", ")}.`);
  } else {
    bullets.push("Vibe signals: calm energy, easy conversation, low-drama connection.");
  }

  const compatibilityLabel =
    match.compatibility == null
      ? "Learning"
      : match.compatibility >= 85
      ? "Very strong"
      : match.compatibility >= 75
      ? "Strong"
      : match.compatibility >= 65
      ? "Promising"
      : "Exploratory";

  const signals = [
    { label: "Intent", value: lookingFor },
    { label: "Pace", value: pace },
    { label: "Alignment", value: compatibilityLabel },
    { label: "Vibe", value: match.vibe ?? pick(["spark", "grounded", "deep"], "grounded") },
  ];

  return {
    headline: base.headline,
    summary: base.summary,
    bullets,
    signals,
  };
}
