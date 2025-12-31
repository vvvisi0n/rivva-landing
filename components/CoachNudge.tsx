"use client";

import { useEffect, useMemo, useRef } from "react";
import useLumiVoice from "@/components/useLumiVoice";
import LumiVoiceButton from "@/components/LumiVoiceButton";
import { shouldLumiAutoSpeak } from "@/lib/lumiAutoSpeak";
import type { Match } from "@/lib/matches";

function buildNudge(match: Match) {
  const tags = match.vibeTags ?? [];
  const firstTag = tags[0] ? `(${tags[0]}) ` : "";

  if (match.compatibility != null) {
    if (match.compatibility >= 85) {
      return `${firstTag}This is a strong fit. Start with something specific from their bio, then ask a simple “either/or” question to keep it light.`;
    }
    if (match.compatibility >= 75) {
      return `${firstTag}Good potential. Lead with a warm opener + one curious question. Keep it short and real.`;
    }
  }

  if (match.bio) {
    return `${firstTag}Try a mirror opener: pick one detail from their bio and ask a calm follow-up. People respond to specifics.`;
  }

  return `${firstTag}Keep it easy: one compliment, one question. No interview energy.`;
}

export default function CoachNudge({ match }: { match: Match }) {
  const voice = useLumiVoice();
  const text = useMemo(() => buildNudge(match), [match]);
  const lastSpokenRef = useRef<string>("");

  useEffect(() => {
    if (!shouldLumiAutoSpeak("coach")) return;
    if (!voice.supported) return;

    // prevent repeating the same nudge over and over
    if (lastSpokenRef.current === text) return;
    lastSpokenRef.current = text;

    voice.speak(`Coach nudge. ${text}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <div
      data-coach-nudge
      className="rounded-3xl bg-black/30 border border-white/10 p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">Lumi’s nudge</p>
          <p className="text-xs text-white/60 mt-1">
            Opt-in voice. Go to Settings → Accessibility → Auto-speak.
          </p>
        </div>

        <LumiVoiceButton textToSpeak={`Coach nudge. ${text}`} />
      </div>

      <p className="text-white/80 text-sm leading-relaxed mt-4">{text}</p>
    </div>
  );
}
