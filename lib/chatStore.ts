import type { ChatMessage } from "@/lib/matches";

const chatKey = (matchId: string) => `rivva_chat_${matchId}`;

export function loadChat(matchId: string): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(chatKey(matchId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveChat(matchId: string, messages: ChatMessage[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(chatKey(matchId), JSON.stringify(messages));
  } catch {
    // ignore quota errors
  }
}

export function clearChat(matchId: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(chatKey(matchId));
}
