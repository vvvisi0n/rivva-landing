export type ChatMsg = {
  id: string;
  from: "me" | "match" | "lumi";
  text: string;
  ts: number;
};

function key(matchId: string) {
  return `rivva_chat_${matchId}`;
}

export function loadChat(matchId: string): ChatMsg[] {
  try {
    const raw = localStorage.getItem(key(matchId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveChat(matchId: string, msgs: ChatMsg[]) {
  localStorage.setItem(key(matchId), JSON.stringify(msgs));
}

export function addMsg(matchId: string, msg: ChatMsg) {
  const msgs = loadChat(matchId);
  const next = [...msgs, msg];
  saveChat(matchId, next);
  return next;
}
