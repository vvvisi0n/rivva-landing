import type { BlockReason } from "@/lib/safety/blockReasons";

const BLOCK_KEY = "rivva_blocked_v1";

export type BlockRecord = {
  matchId: string;
  reason: BlockReason;
  notes?: string;
  createdAt: number;
};

function readAll(): BlockRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BLOCK_KEY);
    return raw ? (JSON.parse(raw) as BlockRecord[]) : [];
  } catch {
    return [];
  }
}

function writeAll(list: BlockRecord[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BLOCK_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event("storage"));
  } catch {}
}

export function isBlocked(matchId: string) {
  return readAll().some((r) => r.matchId === matchId);
}

export function getBlockedList() {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function blockUser(matchId: string, reason: BlockReason, notes?: string) {
  const list = readAll();
  if (list.some((r) => r.matchId === matchId)) return;

  list.push({
    matchId,
    reason,
    notes: notes?.trim() ? notes.trim() : undefined,
    createdAt: Date.now(),
  });

  writeAll(list);
}

export function unblockUser(matchId: string) {
  const list = readAll().filter((r) => r.matchId !== matchId);
  writeAll(list);
}

export function clearBlocked() {
  writeAll([]);
}

/** Back-compat export (some pages import this name) */
export function getBlockedIds() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("rivva_blocked_ids");
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
