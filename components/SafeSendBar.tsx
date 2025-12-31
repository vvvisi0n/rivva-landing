"use client";

import { useEffect, useMemo, useState } from "react";
import { analyzeMessage } from "@/lib/safety";
import { getPrivacySettings } from "@/lib/privacySettings";
import { loadPrivacySettings } from "@/lib/privacySettings";

type Props = {
  text: string;
  onSend: () => void;
};

function findKeywordHit(text: string, keywords: string[]) {
  const t = (text || "").toLowerCase();
  for (const raw of keywords || []) {
    const k = (raw || "").trim().toLowerCase();
    if (!k) continue;
    if (t.includes(k)) return k;
  }
  return null;
}

export default function SafeSendBar({ text, onSend }: Props) {
  const [privacy, setPrivacy] = useState(() => loadPrivacySettings());

  // keep settings fresh (storage changes + focus)
  useEffect(() => {
    const refresh = () => setPrivacy(loadPrivacySettings());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const scan = useMemo(() => analyzeMessage(text), [text]);

  // ALWAYS enforce hard blocks (anti-discrimination, etc.)
  const blocked = scan.severity === "block";

  // Optional “privacy keyword filter” adds extra warnings based on user keyword list
  const keywordHit = useMemo(() => {
    if (!privacy.messageKeywordFilter) return null;
    return findKeywordHit(text, privacy.filteredKeywords ?? []);
  }, [text, privacy.messageKeywordFilter, privacy.filteredKeywords]);

  const warned =
    privacy.messageKeywordFilter &&
    (scan.severity === "warn" || Boolean(keywordHit));

  const [override, setOverride] = useState(false);

  // Reset confirm state when the message changes
  useEffect(() => {
    setOverride(false);
  }, [text]);

  function handleSend() {
    // Never allow blocked messages
    if (blocked) return;

    // If keyword filter is off, send normally
    if (!privacy.messageKeywordFilter) {
      onSend();
      return;
    }

    // Warn flow: require a second click to confirm
    if (warned && !override) {
      setOverride(true);
      return;
    }

    setOverride(false);
    onSend();
  }

  const bannerMessage =
    scan.message ??
    (blocked
      ? "This message violates Rivva’s safety rules."
      : scan.severity === "warn"
      ? "This message may include off-platform or money/link pressure."
      : keywordHit
      ? `Heads up: your keyword filter matched “${keywordHit}”.`
      : "Lumi safety check.");

  return (
    <div className="space-y-2" data-coach-nudge>
      {privacy.messageKeywordFilter && (blocked || warned) && (
        <div
          className={
            "rounded-2xl border p-3 " +
            (blocked
              ? "bg-rose-500/10 border-rose-400/20"
              : "bg-amber-500/10 border-amber-400/20")
          }
        >
          <p className="text-sm font-semibold">
            {blocked ? "Message blocked" : "Lumi safety check"}
          </p>

          <p className="text-xs text-white/70 mt-1">{bannerMessage}</p>

          {warned && (
            <p className="text-[11px] text-white/60 mt-2">
              Tap Send again to confirm.
            </p>
          )}
        </div>
      )}

      <div className="flex justify-end gap-2">
        {override && (
          <button
            type="button"
            onClick={() => setOverride(false)}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold hover:bg-white/15 transition"
          >
            Cancel
          </button>
        )}

        <button
          type="button"
          onClick={handleSend}
          disabled={blocked || !text.trim()}
          className={
            "px-4 py-2 rounded-xl text-xs font-semibold transition border " +
            (blocked || !text.trim()
              ? "bg-white/10 text-white/40 border-white/10 cursor-not-allowed"
              : warned && !override
              ? "bg-amber-300 text-black border-amber-200 hover:bg-amber-200"
              : "bg-white text-black border-white hover:bg-white/90")
          }
        >
          {blocked ? "Blocked" : warned && !override ? "Send (confirm)" : "Send"}
        </button>
      </div>
    </div>
  );
}
