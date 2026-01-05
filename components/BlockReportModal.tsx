"use client";

import { useMemo, useState } from "react";
import { blockUser, reportUser, type ReportReason, shouldEscalate } from "@/lib/safety";

type Props = {
  open: boolean;
  onClose: () => void;
  matchId: string;
  matchName: string;
  contextText?: string;
};

const REPORT_OPTIONS: { value: ReportReason; label: string; group: string }[] = [
  { group: "Safety & Harassment", value: "harassment", label: "Harassment or bullying" },
  { group: "Safety & Harassment", value: "hate_speech", label: "Hate speech or discrimination" },
  { group: "Safety & Harassment", value: "sexual_harassment", label: "Sexual harassment" },
  { group: "Safety & Harassment", value: "threatening", label: "Threatening or intimidating behavior" },
  { group: "Safety & Harassment", value: "stalking", label: "Stalking or obsessive behavior" },
  { group: "Safety & Harassment", value: "pressure_personal_info", label: "Pressuring for personal information" },

  { group: "Inappropriate or Unwanted Content", value: "unwanted_sexual_messages", label: "Unwanted sexual messages" },
  { group: "Inappropriate or Unwanted Content", value: "explicit_images", label: "Explicit images without consent" },
  { group: "Inappropriate or Unwanted Content", value: "inappropriate_language", label: "Inappropriate language" },
  { group: "Inappropriate or Unwanted Content", value: "spam", label: "Spam or repeated unwanted messages" },
];

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "warn" | "bad";
}) {
  const cls =
    tone === "good"
      ? "bg-emerald-500/15 text-emerald-200 border-emerald-400/25"
      : tone === "warn"
      ? "bg-amber-500/15 text-amber-200 border-amber-400/25"
      : tone === "bad"
      ? "bg-rose-500/15 text-rose-200 border-rose-400/25"
      : "bg-white/5 text-white/70 border-white/10";

  return (
    <span className={`text-[11px] px-2 py-1 rounded-full border ${cls}`}>
      {children}
    </span>
  );
}

export default function BlockReportModal({
  open,
  onClose,
  matchId,
  matchName,
  contextText,
}: Props) {
  const [reason, setReason] = useState<ReportReason>("harassment");
  const [note, setNote] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, { value: ReportReason; label: string }[]>();
    for (const o of REPORT_OPTIONS) {
      const list = map.get(o.group) ?? [];
      list.push({ value: o.value, label: o.label });
      map.set(o.group, list);
    }
    return Array.from(map.entries());
  }, []);

  if (!open) return null;

  function closeSoon(ms = 1100) {
    setTimeout(() => {
      setToast(null);
      onClose();
    }, ms);
  }

  function doBlock() {
    blockUser(matchId);
    setToast(`${matchName} is now blocked for you.`);
    closeSoon(900);
  }

  function doReport() {
    const res = reportUser(matchId, reason, { note, contextText });
    const safeRes = (res ?? null) as any;

    // Always true in our MVP: reporting hides them for the reporter immediately (local block)
    // The anti-misuse piece is in the "countsTowardAction / needsReview" returned from reportUser.
    if ((res as any)?.needsReview) {
      setToast(
        "Saved. This report won’t count toward action yet because it needs evidence review (anti-misuse)."
      );
      closeSoon(1400);
      return;
    }

    if (!(res as any)?.countsTowardAction) {
      setToast("Saved. This report was recorded but does not count toward action (anti-misuse).");
      closeSoon(1400);
      return;
    }

    if (safeRes?.shouldEscalate) {
      setToast("Thanks. Rivva flagged a pattern here. Escalation threshold reached (MVP).");
      closeSoon(1400);
      return;
    }

    const left = Math.max(0, 3 - (((safeRes as any)?.escalationCount ?? 0) as number));
    setToast(`Reported. Escalation happens only after evidence-backed patterns. Remaining: ${left}.`);
    closeSoon(1400);
  }

  // Local MVP state (already computed from stored reports)
  const escalatesNow = shouldEscalate();

  // UI helper text for the chosen reason
  const reasonNote =
    reason === "hate_speech"
      ? "Anti-discrimination reports are checked against recent message context when available to reduce false reporting."
      : "Reports are recorded and pattern-thresholded to reduce misuse. You’re protected immediately either way.";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-4 py-6">
      <div className="w-full max-w-lg rounded-3xl bg-[#0b0b14] border border-white/10 p-6 shadow-2xl text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Safety</h2>
            <p className="text-xs text-white/60 mt-1">
              You’re protected immediately. Rivva escalates action only after evidence-backed patterns.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-sm text-white/70 hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Report {matchName}</p>
                <p className="text-xs text-white/60 mt-1">{reasonNote}</p>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2">
                {contextText ? <Pill tone="good">Evidence: chat context</Pill> : <Pill>Evidence: none</Pill>}
                <Pill tone={escalatesNow ? "warn" : "neutral"}>
                  Escalation: {escalatesNow ? "Reached" : "0/3 → 3/3"}
                </Pill>
              </div>
            </div>

            <label className="block text-sm text-white/80 mt-4">
              Reason
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as ReportReason)}
                className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400/60"
              >
                {grouped.map(([group, items]) => (
                  <optgroup key={group} label={group}>
                    {items.map((it) => (
                      <option key={it.value} value={it.value}>
                        {it.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>

            <label className="block text-sm text-white/80 mt-4">
              Notes (optional)
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Add context (optional)…"
                className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400/60 placeholder:text-white/40 resize-none"
              />
            </label>

            <div className="mt-3 rounded-2xl bg-black/30 border border-white/10 p-3">
              <p className="text-[11px] text-white/60">
                Immediate action: <span className="text-white/80 font-semibold">this person is hidden for you</span>.
              </p>
              <p className="text-[11px] text-white/50 mt-1">
                Platform action (MVP): escalation happens only after <span className="text-white/70">3 evidence-backed</span> reports.
                For discrimination, reports may be saved as <span className="text-white/70">Needs review</span> if evidence isn’t detected in context.
              </p>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={doReport}
                className="flex-1 px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Submit report
              </button>

              <button
                type="button"
                onClick={doBlock}
                className="px-5 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition font-semibold"
              >
                Block
              </button>
            </div>

            {escalatesNow && (
              <p className="text-xs text-amber-200 mt-3">
                Note: escalation threshold already reached for this user in local MVP data.
              </p>
            )}
          </div>
        </div>

        {toast && (
          <div className="mt-4 rounded-2xl bg-black/30 border border-white/10 p-3">
            <p className="text-sm text-white/80">{toast}</p>
          </div>
        )}
      </div>
    </div>
  );
}
