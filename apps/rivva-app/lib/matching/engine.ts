import type { Candidate, RankedCandidate, ScoreBreakdown, UserSignal } from "./types";

function normalizeTags(tags?: string[]) {
  return (tags ?? [])
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 32);
}

function overlap(a?: string[], b?: string[]) {
  const A = new Set(normalizeTags(a));
  const B = new Set(normalizeTags(b));
  const hits: string[] = [];
  for (const t of A) {
    if (B.has(t)) hits.push(t);
  }
  return hits.slice(0, 8);
}

function tierScore(userTier?: string, candTier?: string) {
  if (!userTier || !candTier) return 0;
  return userTier === candTier ? 40 : 0;
}

function recencyScore(label?: string) {
  const s = (label ?? "").toLowerCase();
  if (!s) return 0;
  if (s.includes("online") || s.includes("now")) return 10;
  if (s.includes("today")) return 8;
  if (s.includes("1d") || s.includes("yesterday")) return 6;
  if (s.includes("2d") || s.includes("3d")) return 3;
  return 1;
}

export function rankCandidates(signal: UserSignal, candidates: Candidate[]): RankedCandidate[] {
  const userTags = [
    ...(signal.aboutMeTags ?? []),
    ...(signal.lookingForTags ?? []),
  ];

  return [...candidates]
    .map((c) => {
      const overlapTags = overlap(userTags, c.tags);
      const tagOverlap = Math.min(50, overlapTags.length * 10);
      const tierMatch = tierScore(signal.quizTier, c.quizTier);
      const recency = recencyScore(c.lastActiveLabel);

      const score: ScoreBreakdown = {
        tierMatch,
        tagOverlap,
        recency,
        total: tierMatch + tagOverlap + recency,
        overlapTags,
      };

      return { ...c, score };
    })
    .sort((a, b) => b.score.total - a.score.total);
}
