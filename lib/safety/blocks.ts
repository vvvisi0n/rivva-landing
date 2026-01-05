/**
 * Local-only blocks (MVP)
 * Accepts extra args for back-compat with older call sites.
 */

function normalizeBlockRecord(r: any): BlockRecord {
  const matchId = String(r?.matchId ?? r?.id ?? r?.blockedId ?? "");
  const createdAt = String(r?.createdAt ?? new Date().toISOString());
  const id = String(r?.id ?? matchId);
  const blockedAt = String(r?.blockedAt ?? createdAt);
  return { id, matchId, blockedAt, createdAt };
}

const KEY = "rivva_blocked_users";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function write(next: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("storage"));
}

export function getBlockedIds(): string[] {
  return read();
}

export function isBlocked(id: string): boolean {
  return new Set(read()).has(id);
}

/**
 * Back-compat: some parts of the app previously called blockUser(id, reason?, meta?)
 * We ignore extras and only block by id (local MVP).
 */
export function blockUser(id: string, _arg2?: unknown, _arg3?: unknown): boolean {
  const s = new Set(read());
  s.add(id);
  write(Array.from(s));
  return true;
}

export function unblockUser(id: string): boolean {
  const next = read().filter((x) => x !== id);
  write(next);
  return true;
}

export function clearBlocked(): boolean {
  write([]);
  return true;
}

/** -------------------------------------------------
 * Back-compat exports for settings pages
 * ------------------------------------------------- */

export type BlockRecord = {
  matchId: string;
    createdAt?: string;
id: string;
  blockedAt: string;
};

export function getBlockedList(): BlockRecord[] {
  const ids = getBlockedIds();
  return ids.map((id) => ({
    id,
    matchId: id,
    blockedAt: new Date(0).toISOString(),
  }));
}
