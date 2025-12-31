import { blockUser } from "@/lib/safety/blocks";
import { getSafetySettings } from "@/lib/safety/safetySettings";

export type ReportReason =
  "harassment"
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
export type ReportEvent = {
  id: string;
  reportedUserId: string;
  reason: ReportReason;
  detail?: string;
  createdAt: string;
};

const KEY = "rivva_reports_v1";

function read(): ReportEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? (JSON.parse(raw) as ReportEvent[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function write(next: ReportEvent[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("storage"));
}

export function getReports(): ReportEvent[] {
  return read();
}

export function submitReport(input: {
  reportedUserId: string;
  reason: ReportReason;
  detail?: string;
}) {
  if (typeof window === "undefined") return;

  const evt: ReportEvent = {
    id: `r_${Math.random().toString(16).slice(2)}`,
    reportedUserId: input.reportedUserId,
    reason: input.reason,
    detail: input.detail?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  const curr = read();
  write([evt, ...curr]);

  const s = getSafetySettings();
  if (s.blockImmediatelyWhenReporting) {
    blockUser(input.reportedUserId);
  }

  // Escalation is server-side later. For now, we only log.
  return evt;
}
