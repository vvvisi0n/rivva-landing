import type { MatchCandidate, ViewerProfile, ScoredMatch, MatchExplanation } from "./types";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function normTags(x?: string[]) {
  return (x ?? []).map((s) => s.trim().toLowerCase()).filter(Boolean);
}

function jaccard(a: string[], b: string[]) {
  const A = new Set(a);
  const B = new Set(b);
  if (A.size === 0 && B.size === 0) return 0;
  let inter = 0;
  for (const v of A) if (B.has(v)) inter += 1;
  const union = new Set([...A, ...B]).size;
  return union ? inter / union : 0;
}

function tierDistance(a?: string, b?: string) {
  if (!a || !b) return 2;
  const order = ["A", "B", "C", "D", "E"];
  const ia = order.indexOf(a);
  const ib = order.indexOf(b);
  if (ia === -1 || ib === -1) return 2;
  return Math.abs(ia - ib);
}

function safeAge(a: unknown) {
  return typeof a === "number" && Number.isFinite(a) ? a : undefined;
}

/**
 * Hard filters. These prevent bad matches.
 * MVP rules are conservative. We can loosen later.
 */
export function passesHardFilters(viewer: ViewerProfile, c: MatchCandidate) {
  if (viewer.id && c.id === viewer.id) return false;

  // If both declare intent and they conflict, skip.
  if (viewer.lookingFor && c.lookingFor && viewer.lookingFor !== c.lookingFor) return false;

  // Optional. If you later store dealbreakers, enforce them here.
  // For MVP, we only enforce if both sides provide a dealbreaker list.
  const vd = normTags(viewer.dealbreakers);
  const cd = normTags(c.dealbreakers);
  if (vd.length && cd.length) {
    const overlap = jaccard(vd, cd);
    // If dealbreakers overlap too much, it usually means both flagged similar hard no categories.
    // This is a conservative skip. Tune later.
    if (overlap > 0.55) return false;
  }

  return true;
}

export function scoreCandidate(viewer: ViewerProfile, c: MatchCandidate): ScoredMatch {
  const explanations: MatchExplanation[] = [];

  // Weights. Total about 100, but we clamp.
  const W_TIER = 28;
  const W_LOOKING_FOR = 18;
  const W_TAGS = 28;
  const W_VALUES = 18;
  const W_CITY = 8;

  let score = 0;

  // Quiz tier alignment. Best is same tier. Next is adjacent.
  const td = tierDistance(viewer.quizTier, c.quizTier);
  const tierPoints = td === 0 ? 1 : td === 1 ? 0.75 : td === 2 ? 0.45 : 0.2;
  if (viewer.quizTier && c.quizTier) {
    score += tierPoints * W_TIER;
    explanations.push({
      label: "Similar pacing",
      detail: td === 0 ? "Your quiz tier aligns strongly." : "Your quiz tiers are close enough to communicate smoothly.",
      weight: Math.round(tierPoints * W_TIER),
    });
  }

  // Intent. If both have lookingFor and match, reward. If missing, neutral.
  if (viewer.lookingFor && c.lookingFor) {
    const ok = viewer.lookingFor === c.lookingFor;
    const pts = ok ? 1 : 0;
    score += pts * W_LOOKING_FOR;
    if (ok) {
      explanations.push({
        label: "Aligned intent",
        detail: "You are looking for the same type of connection.",
        weight: W_LOOKING_FOR,
      });
    }
  }

  // Tags. About-me tags + looking-for tags.
  const a1 = normTags(viewer.aboutMeTags);
  const a2 = normTags(c.aboutMeTags);
  const l1 = normTags(viewer.lookingForTags);
  const l2 = normTags(c.lookingForTags);

  const aboutSim = jaccard(a1, a2);
  const wantSim = jaccard(l1, l2);
  const tagSim = clamp((aboutSim * 0.55 + wantSim * 0.45), 0, 1);

  if (a1.length || l1.length) {
    score += tagSim * W_TAGS;
    if (tagSim >= 0.35) {
      explanations.push({
        label: "Shared signals",
        detail: "Your tags overlap in meaningful ways.",
        weight: Math.round(tagSim * W_TAGS),
      });
    }
  }

  // Values. Optional list. This becomes powerful later.
  const v1 = normTags(viewer.values);
  const v2 = normTags(c.values);
  const valSim = jaccard(v1, v2);
  if (v1.length) {
    score += valSim * W_VALUES;
    if (valSim >= 0.25) {
      explanations.push({
        label: "Value alignment",
        detail: "You prioritize similar relationship values.",
        weight: Math.round(valSim * W_VALUES),
      });
    }
  }

  // City. Light preference. Not required. Just stabilizes early matching.
  if (viewer.city && c.city) {
    const same = viewer.city.trim().toLowerCase() === c.city.trim().toLowerCase();
    const pts = same ? 1 : 0;
    score += pts * W_CITY;
    if (same) {
      explanations.push({
        label: "Same city",
        detail: "You are in the same area.",
        weight: W_CITY,
      });
    }
  }

  // Light age sanity. If candidate is missing age, no penalty.
  const va = safeAge(viewer.age);
  const ca = safeAge(c.age);
  if (va && ca) {
    const gap = Math.abs(va - ca);
    // gentle penalty past 10 year gap.
    const agePenalty = gap <= 10 ? 0 : clamp((gap - 10) / 20, 0, 1) * 10;
    score = score - agePenalty;
  }

  // Final clamp.
  score = clamp(Math.round(score), 0, 100);

  // Keep only the best explanations. Quiet, not noisy.
  explanations.sort((x, y) => y.weight - x.weight);
  const top = explanations.slice(0, 3);

  return { candidate: c, score, explanations: top };
}

export function rankCandidates(viewer: ViewerProfile, candidates: MatchCandidate[], opts?: { minScore?: number; limit?: number }) {
  const minScore = typeof opts?.minScore === "number" ? opts.minScore : 62;
  const limit = typeof opts?.limit === "number" ? opts.limit : 12;

  const scored: ScoredMatch[] = [];
  for (const c of candidates) {
    if (!passesHardFilters(viewer, c)) continue;
    const s = scoreCandidate(viewer, c);
    if (s.score >= minScore) scored.push(s);
  }

  scored.sort((a, b) => b.score - a.score);

  // Curation rule. Do not show too many.
  return scored.slice(0, limit);
}

