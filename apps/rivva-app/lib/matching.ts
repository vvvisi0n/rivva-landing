import type { UserProfile } from "@/lib/profile";

export type MatchResult = {
  candidate: UserProfile;
  score: number;
  reasons: string[];
};

function norm(x: string) {
  return x.toLowerCase().trim();
}

function overlap(a?: string[], b?: string[]) {
  const A = new Set((a ?? []).map(norm));
  const B = new Set((b ?? []).map(norm));
  let n = 0;
  for (const x of A) if (B.has(x)) n += 1;
  return n;
}

function containsAny(hay?: string[], needles?: string[]) {
  const H = new Set((hay ?? []).map(norm));
  for (const n of (needles ?? []).map(norm)) {
    if (H.has(n)) return true;
  }
  return false;
}

export function scoreMatch(me: UserProfile, other: UserProfile): MatchResult {
  const reasons: string[] = [];
  let score = 0;

  // Gate 1. Dealbreakers. If they violate, they do not pass.
  // MVP rule. If my boundary appears in their About Me, we reject.
  // Later this becomes richer with structured fields.
  if (containsAny(other.aboutMeTags, me.boundaries)) {
    return { candidate: other, score: -9999, reasons: ["Rejected by boundaries"] };
  }

  // Gate 2. Intent alignment
  if (me.intent && other.intent) {
    if (me.intent === other.intent) {
      score += 24;
      reasons.push("Same intent");
    } else {
      score -= 12;
      reasons.push("Different intent");
    }
  }

  // Gate 3. Signal overlap
  const aboutOverlap = overlap(me.aboutMeTags, other.aboutMeTags);
  if (aboutOverlap > 0) {
    score += aboutOverlap * 8;
    reasons.push(`Shared traits. ${aboutOverlap}`);
  }

  const wantOverlap = overlap(me.lookingForTags, other.lookingForTags);
  if (wantOverlap > 0) {
    score += wantOverlap * 10;
    reasons.push(`Shared priorities. ${wantOverlap}`);
  }

  const boundaryOverlap = overlap(me.boundaries, other.boundaries);
  if (boundaryOverlap > 0) {
    score += boundaryOverlap * 6;
    reasons.push(`Shared boundaries. ${boundaryOverlap}`);
  }

  // Gate 4. Location soft boost
  if (me.city && other.city && norm(me.city) === norm(other.city)) {
    score += 8;
    reasons.push("Same city");
  }

  // Quality floor
  if (score < 10) reasons.push("Low confidence match");

  return { candidate: other, score, reasons };
}

export function rankMatches(me: UserProfile, candidates: UserProfile[]): MatchResult[] {
  return candidates
    .map((c) => scoreMatch(me, c))
    .filter((r) => r.score > -9999)
    .sort((a, b) => b.score - a.score);
}
