import type { Match } from "@/lib/matches";

export type LumiReason = {
  matchId: string;
  createdAt: number;
  reason: string;
};

const KEY = "rivva_lumi_reasons";

export function loadLumiReasons(): LumiReason[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as LumiReason[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLumiReason(match: Match, reason: string) {
  if (typeof window === "undefined") return;
  const existing = loadLumiReasons();
  const next: LumiReason[] = [
    { matchId: match.id, createdAt: Date.now(), reason },
    ...existing.filter((r) => r.matchId !== match.id),
  ];
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function getReasonFor(matchId: string): string | null {
  const all = loadLumiReasons();
  const found = all.find((r) => r.matchId === matchId);
  return found?.reason ?? null;
}

export function generateLumiReason(match: Match) {
  const tags = match.vibeTags?.slice(0, 3) ?? [];
  const tagLine = tags.length ? `Your vibe sync: ${tags.join(", ")}.` : "";
  const comp =
    typeof match.compatibility === "number"
      ? `Compatibility feels strong at ${match.compatibility}%.`
      : "Compatibility feels quietly promising.";

  const bio = match.bio ? `They come across as: ${match.bio}` : "";
  const location = match.location ? `They’re nearby (${match.location}).` : "";

  // Calm, emotionally intelligent, non-robotic tone.
  return [
    comp,
    tagLine,
    location,
    bio,
    "Lumi thinks this match supports steady connection—not just quick chemistry.",
  ]
    .filter(Boolean)
    .join(" ");
}
