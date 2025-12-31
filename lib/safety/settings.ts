export type MessagingRule = "matches_only" | "anyone";

const KEY_RULE = "rivva_msg_rule";
const KEY_AUTOBLOCK = "rivva_autoblock_on_report";

export function getMessagingRule(): MessagingRule {
  if (typeof window === "undefined") return "matches_only";
  const raw = localStorage.getItem(KEY_RULE);
  if (raw === "anyone" || raw === "matches_only") return raw;
  return "matches_only";
}

export function setMessagingRule(rule: MessagingRule) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_RULE, rule);
}

export function getAutoBlockOnReport(): boolean {
  if (typeof window === "undefined") return true;
  const raw = localStorage.getItem(KEY_AUTOBLOCK);
  if (raw === "true") return true;
  if (raw === "false") return false;
  return true;
}

export function setAutoBlockOnReport(val: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_AUTOBLOCK, val ? "true" : "false");
}
