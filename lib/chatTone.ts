export type ChatTone = "calm" | "playful" | "serious";

const KEY = "rivva_chat_tone";

export function getChatTone(): ChatTone {
  if (typeof window === "undefined") return "calm";
  const raw = localStorage.getItem(KEY);
  if (raw === "playful" || raw === "serious" || raw === "calm") return raw;
  return "calm";
}

export function setChatTone(tone: ChatTone) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, tone);
}
