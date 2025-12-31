export type ScamSignal = {
  level: "ok" | "warn" | "high";
  reasons: string[];
};

function hasLink(text: string) {
  return /(https?:\/\/|www\.)\S+/i.test(text);
}

function hasPhone(text: string) {
  // loose phone detection: (123) 456-7890, 123-456-7890, +1 123 456 7890, etc
  return /(\+?\d[\d\s().-]{7,}\d)/.test(text);
}

function hasMoveOffApp(text: string) {
  return /\b(whatsapp|telegram|signal|snap|instagram|ig|wechat|line|kik)\b/i.test(text);
}

function hasMoneyOrCrypto(text: string) {
  return /\b(cashapp|venmo|zelle|paypal|crypto|bitcoin|btc|eth|investment|forex)\b/i.test(text);
}

function hasUrgency(text: string) {
  return /\b(urgent|asap|right now|immediately|today only|limited time)\b/i.test(text);
}

function hasGiftCard(text: string) {
  return /\b(gift\s*card|itunes|apple\s*card|google\s*play\s*card|steam\s*card)\b/i.test(text);
}

function hasNudesOrExtortion(text: string) {
  return /\b(nudes|explicit|send a pic|sext|private pics|video call now)\b/i.test(text);
}

export function analyzeConversation(text: string): ScamSignal {
  const t = (text || "").toLowerCase();
  const reasons: string[] = [];

  if (hasMoveOffApp(t)) reasons.push("Trying to move the chat off Rivva");
  if (hasLink(t)) reasons.push("Links detected");
  if (hasPhone(t)) reasons.push("Phone number detected");
  if (hasMoneyOrCrypto(t)) reasons.push("Money/crypto/payment language detected");
  if (hasGiftCard(t)) reasons.push("Gift card language detected");
  if (hasUrgency(t)) reasons.push("High-pressure / urgency language");
  if (hasNudesOrExtortion(t)) reasons.push("Sexual/extortion risk language");

  if (reasons.length === 0) return { level: "ok", reasons: [] };

  // High risk if money/gift card OR nudes/extortion appear
  const high =
    reasons.some((r) => /money|gift|Sexual/i.test(r)) ||
    (reasons.includes("Trying to move the chat off Rivva") && reasons.includes("Links detected"));

  return { level: high ? "high" : "warn", reasons };
}
