import type { QuizResult } from "@/lib/quiz/schema";
import type { Candidate } from "@/lib/matching/candidates";

export type ScoreBreakdown = {
  total: number;
  tone: number;
  pace: number;
  values: number;
  nonNegotiables: number;
  notes: string[];
};

function overlap<T extends string>(a: T[], b: T[]) {
  const s = new Set(a);
  return b.filter((x) => s.has(x));
}

export function scoreCandidate(q: QuizResult, c: Candidate): ScoreBreakdown {
  let total = 0;
  const notes: string[] = [];

  const tone = q.tone === c.tone ? 35 : 0;
  if (tone) notes.push("Tone aligned.");
  total += tone;

  const pace = q.pace === c.pace ? 25 : 0;
  if (pace) notes.push("Pace aligned.");
  total += pace;

  const v = overlap(q.values, c.values);
  const values = Math.min(30, v.length * 10);
  if (values) notes.push(`Shared values. ${v.join(", ")}.`);
  total += values;

  const nn = q.nonNegotiables ?? [];
  const nnHits = nn.filter((x) => {
    const t = (c.about + " " + c.headline).toLowerCase();
    return t.includes(x.toLowerCase());
  });
  const nonNegotiables = Math.min(10, nnHits.length * 5);
  if (nonNegotiables) notes.push("Non negotiables reflected.");
  total += nonNegotiables;

  return { total, tone, pace, values, nonNegotiables, notes };
}

export function pickBestMatch(q: QuizResult, candidates: Candidate[]) {
  const scored = candidates
    .map((c) => ({ c, s: scoreCandidate(q, c) }))
    .sort((a, b) => b.s.total - a.s.total);

  return scored[0];
}
