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

function distanceMiles(viewer: any, cand: any): number | null {
  const vg = viewer?.geo;
  const cg = cand?.geo;
  if (!vg || !cg) return null;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 3958.7613;
  const dLat = toRad(cg.lat - vg.lat);
  const dLng = toRad(cg.lng - vg.lng);
  const lat1 = toRad(vg.lat);
  const lat2 = toRad(cg.lat);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}
