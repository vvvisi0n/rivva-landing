export type Announcement = {
  id: string;
  ts: number;
  title: string;
  body?: string;
};

const KEY = "rivva_announcements";
const SEEN_KEY = "rivva_announcements_seen";

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, val: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

export function addAnnouncement(a: Announcement) {
  const list = readJSON<Announcement[]>(KEY, []);
  const next = [a, ...list].slice(0, 50);
  writeJSON(KEY, next);
  return next;
}

export function getAnnouncements() {
  return readJSON<Announcement[]>(KEY, []);
}

export function markSeen(id: string) {
  const seen = new Set(readJSON<string[]>(SEEN_KEY, []));
  seen.add(id);
  writeJSON(SEEN_KEY, Array.from(seen));
}

export function isSeen(id: string) {
  const seen = new Set(readJSON<string[]>(SEEN_KEY, []));
  return seen.has(id);
}
