"use client";

import { useEffect } from "react";
import WhyThisMatch from "@/components/WhyThisMatch";
import type { Match } from "@/lib/matches";
import { getLumiAutoSpeak, getLumiEnabled } from "@/lib/lumiSettings";
import useLumiVoice from "@/components/useLumiVoice";

export default function WhyThisMatchModal({
  open,
  onClose,
  match,
}: {
  open: boolean;
  onClose: () => void;
  match: Match;
}) {
  const lumi = useLumiVoice();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function onShow() {
    // The WhyThisMatch component already renders the reasons UI.
    // Here we optionally trigger auto-speak at the moment the user taps “Show”.
    if (!lumi.supported) return;
    if (!getLumiEnabled()) return;
    if (!getLumiAutoSpeak()) return;

    const text =
      `Here’s why you’re seeing ${match.name}. ` +
      `I’ll explain the match reasons on this screen.`;

    lumi.speak(text);
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-3xl bg-[#0b0b14] border border-white/10 shadow-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Why this match</p>
              <p className="text-xs text-white/60 mt-1">
                Tap Show to reveal the reasons. (Voice respects your Settings.)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onShow}
                className="px-3 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition"
              >
                Show
              </button>

              <button
                type="button"
                onClick={() => {
                  if (lumi.status === "speaking") lumi.stop();
                  onClose();
                }}
                className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-white hover:bg-white/15 transition"
              >
                Close
              </button>
            </div>
          </div>

          <div className="p-5">
            <WhyThisMatch match={match} />
          </div>
        </div>
      </div>
    </div>
  );
}
