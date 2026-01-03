export type RankedCandidate = {
  id: string;
  name?: string;
  score: number;
  reasons: string[];
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function hashScore(seed: string) {
  // stable-ish pseudo score (no randomness in UI)
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

export function rankCandidates(viewer: any, candidates: any[]): RankedCandidate[] {
  const viewerSeed =
    (viewer?.id ?? "") +
    "|" +
    (viewer?.quizTier ?? "") +
    "|" +
    (viewer?.intent ?? "") +
    "|" +
    (viewer?.lookingForTags?.join(",") ?? "") +
    "|" +
    (viewer?.aboutMeTags?.join(",") ?? "");

  return (candidates ?? [])
    .map((c) => {
      const seed = viewerSeed + "|" + (c?.id ?? "") + "|" + (c?.name ?? "");
      const base = (hashScore(seed) % 41) + 55; // 55..95
      const score = clamp(base, 50, 99);

      const reasons: string[] = [];
      if (viewer?.quizTier && c?.quizTier && viewer.quizTier === c.quizTier) reasons.push("Similar quiz tier");
      if (viewer?.intent && c?.intent && viewer.intent === c.intent) reasons.push("Shared intent");
      if (!reasons.length) reasons.push("Compatible vibe");

      return {
        id: String(c?.id ?? ""),
        name: c?.name,
        age: c?.age,
        city: c?.city,
        score,
        reasons,
      } as RankedCandidate;
    })
    .filter((x) => x.id)
    .sort((a, b) => b.score - a.score);
}
