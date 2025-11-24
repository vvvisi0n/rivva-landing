export type ReactionKey = "heart" | "laugh" | "like";

export type ChatMsg = {
  id: string;
  from: "me" | "match" | "lumi";
  text: string;
  ts: number;
  reactions?: Partial<Record<ReactionKey, number>>;
};

const KEY = "rivva_chat_store_v1";

type Store = Record<string, ChatMsg[]>;

function readStore(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(store));
}

export function loadChat(matchId: string): ChatMsg[] {
  const store = readStore();
  return store[matchId] || [];
}

export function addMsg(matchId: string, msg: ChatMsg): ChatMsg[] {
  const store = readStore();
  const list = store[matchId] || [];
  const next = [...list, msg];
  store[matchId] = next;
  writeStore(store);
  return next;
}

export function updateMsg(matchId: string, msgId: string, patch: Partial<ChatMsg>): ChatMsg[] {
  const store = readStore();
  const list = store[matchId] || [];
  const next = list.map((m) => (m.id === msgId ? { ...m, ...patch } : m));
  store[matchId] = next;
  writeStore(store);
  return next;
}
