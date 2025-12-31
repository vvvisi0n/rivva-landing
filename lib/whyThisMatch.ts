import type { Match } from "@/lib/matches";
import type { UserProfile } from "@/lib/profile";

export function buildWhyThisMatch(match: Match, profile: UserProfile | null) {
  const reasons: string[] = [];

  if (match.compatibility != null) {
    reasons.push(`Compatibility score: ${match.compatibility}%. Your answers aligned on emotional pacing + communication style.`);
  }

  if (profile?.quizTier) {
    reasons.push(`Your Lumi tier: ${profile.quizTier}. This profile matches the vibe pattern Rivva expects for that tier.`);
  }

  const tags = match.vibeTags ?? [];
  if (tags.length) {
    reasons.push(`Shared vibe signals: ${tags.slice(0, 3).join(", ")}.`);
  }

  if (profile?.lookingFor) {
    const label =
      profile.lookingFor === "serious"
        ? "a serious relationship"
        : profile.lookingFor === "casual"
        ? "something casual / low pressure"
        : "connection";
    reasons.push(`You said you’re looking for ${label}. This person’s profile signals a similar direction.`);
  }

  if (profile?.pace) {
    const p =
      profile.pace === "slow"
        ? "slow + intentional"
        : profile.pace === "fast"
        ? "fast-moving"
        : "balanced";
    reasons.push(`Your pacing style is ${p}. This match fits that rhythm (based on prompt tone + interaction style).`);
  }

  if (!reasons.length) {
    reasons.push("This profile is in your discovery pool based on your early onboarding signals and engagement patterns.");
  }

  return reasons.slice(0, 5);
}
