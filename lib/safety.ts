/**
 * Rivva Safety (client-only, local MVP)
 * This file is a stable public surface (barrel) for app imports: "@/lib/safety"
 */

export type ReportReason =
  | "harassment"
  | "hate_speech"
  | "sexual_harassment"
  | "threatening"
  | "stalking"
  | "pressure_personal_info"
  | "unwanted_sexual_messages"
  | "explicit_images"
  | "inappropriate_language"
  | "spam"
  | "scam"
  | "other";

export type SafetyScan = {
  severity: "allow" | "warn" | "block";
  message?: string;
  tags?: string[];
};

/** Basic anti-discrimination / exclusionary language guardrails */
export function analyzeMessage(text: string): SafetyScan {
  const raw = text || "";
  const t = raw.toLowerCase();

  const hardBlock = [
    /no\s+(black|white|asian|latino|arab|indian|mixed)\s+people/i,
    /not\s+into\s+(black|white|asian|latino|arab|indian|mixed)\s+people/i,
    /(whites?\s+only|black\s+only|asians?\s+only|latinos?\s+only)/i,
    /(no\s+muslims?|no\s+christians?|no\s+jews?|no\s+hindu|no\s+sikhs?)/i,
    /(no\s+disabled\s+people|no\s+wheelchairs?|no\s+autistic\s+people)/i,
    /(go\s+back\s+to\s+your\s+country)/i,
  ];

  if (hardBlock.some((rx) => rx.test(raw))) {
    return {
      severity: "block",
      message:
        "That message includes discriminatory or exclusionary language. Rivva doesn’t allow that.",
      tags: ["anti_discrimination"],
    };
  }

  const warn = [
    /telegram|whatsapp|signal|snapchat|ig|instagram|kik|cashapp|venmo|paypal/i,
    /send\s+money|wire\s+me|gift\s+card|crypto|bitcoin|usdt/i,
    /click\s+this\s+link|http:\/\/|https:\/\//i,
  ];

  if (warn.some((rx) => rx.test(t))) {
    return {
      severity: "warn",
      message:
        "Lumi check: this looks like off-platform or money/link pressure. Be cautious.",
      tags: ["scam_risk"],
    };
  }

  return { severity: "allow" };
}

/** Blocks */
export { blockUser, unblockUser, clearBlocked, getBlockedIds, isBlocked } from "@/lib/safety/blocks";

/** Reports (wrap to match older call sites) */
import { submitReport } from "@/lib/safety/reports";

export function reportUser(
  reportedUserId: string,
  reason: ReportReason,
  meta?: { note?: string; contextText?: string }
) {
  const detail =
    meta?.note?.trim() ||
    meta?.contextText?.trim() ||
    undefined;

  return submitReport({
    reportedUserId,
    reason,
    detail,
  });
}

/** MVP heuristic (keep stable for imports) */
export function shouldEscalate() {
  return false;
}
