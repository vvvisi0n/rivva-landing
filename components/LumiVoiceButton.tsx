"use client";

import { useCallback } from "react";
import { useLumiVoice } from "@/components/useLumiVoice";

type Props = {
  /** Text-to-speech */
  textToSpeak?: string;
  /** Back-compat alias some pages use */
  text?: string;

  /** Speech-to-text (NOT supported yet by hook, so we no-op) */
  onTranscript?: (text: string) => void;
  prompt?: string;

  disabled?: boolean;
  className?: string;
  label?: string;
};

export default function LumiVoiceButton({
  textToSpeak,
  text,
  onTranscript,
  prompt,
  disabled,
  className = "",
  label = "Voice",
}: Props) {
  const voice = useLumiVoice();

  const speakText = textToSpeak ?? text ?? "";

  const onClick = useCallback(async () => {
    if (!voice?.supported) return;

    // If a page tries to use speech-to-text, the hook doesn't support it yet.
    if (onTranscript) {
      console.warn(
        "LumiVoiceButton: speech-to-text requested, but useLumiVoice currently only supports text-to-speech.",
        { prompt }
      );
      return;
    }

    if (!speakText.trim()) return;

    voice.speak(speakText);
  }, [voice, onTranscript, speakText, prompt]);

  const isDisabled =
    disabled ||
    !voice?.supported ||
    (onTranscript ? true : !speakText.trim());

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label={label}
      title={
        onTranscript
          ? "Voice input coming soon"
          : speakText
          ? "Speak this out loud"
          : "Nothing to speak"
      }
      className={`shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border transition
        ${
          isDisabled
            ? "bg-white/5 text-white/40 border-white/10 cursor-not-allowed"
            : "bg-white/10 text-white border-white/15 hover:bg-white/15"
        }
        ${className}
      `}
    >
      {label}
    </button>
  );
}