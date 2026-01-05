"use client";

import { useState } from "react";
import { submitReport, type ReportReason } from "@/lib/safety/reports";
import { getSafetySettings } from "@/lib/safety/safetySettings";

export default function ReportUserButton({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason | null>(null);
  const reasonValue = (reason ?? ("" as any)) as ReportReason;
const [detail, setDetail] = useState("");
  const [done, setDone] = useState(false);

  function send() {
    submitReport({ reportedUserId: userId, reason: reasonValue, detail });
    setDone(true);
  }

  const s = getSafetySettings();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setDone(false);
        }}
        className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 text-sm font-semibold hover:bg-white/15 transition"
      >
        Report
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="w-full max-w-lg rounded-3xl bg-[#0b0b14] border border-white/10 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold">Report this user</p>
                <p className="text-xs text-white/60 mt-1">
                  {s.blockImmediatelyWhenReporting
                    ? "Submitting a report will also block them for you immediately (private protection)."
                    : "This report will be logged. You can still block them separately."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-white/70 hover:text-white"
              >
                Close
              </button>
            </div>

            {done ? (
              <div className="mt-6 rounded-3xl bg-white/5 border border-white/10 p-5">
                <p className="font-semibold">Report submitted ✓</p>
                <p className="text-xs text-white/60 mt-1">
                  Thanks. Rivva escalates only after multiple credible signals or high-severity evidence.
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2.5 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-6 grid gap-3">
                  <label className="text-sm text-white/80">
                    Reason
                    <select
                      value={reasonValue}
                      onChange={(e) => setReason(e.target.value as ReportReason)}
                      className="mt-1 w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none"
                    >
                      <option value="spam_scam">Spam / scam</option>
                      <option value="harassment">Harassment / threats</option>
                      <option value="impersonation">Impersonation</option>
                      <option value="explicit">Explicit / sexual content</option>
                      <option value="other">Other</option>
                    </select>
                  </label>

                  <label className="text-sm text-white/80">
                    Optional details
                    <textarea
                      value={detail}
                      onChange={(e) => setDetail(e.target.value)}
                      rows={3}
                      placeholder="What happened? (Optional)"
                      className="mt-1 w-full rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none resize-none"
                    />
                  </label>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/10 text-sm font-semibold hover:bg-white/15 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={send}
                    className="px-4 py-2.5 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
                  >
                    Submit report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
