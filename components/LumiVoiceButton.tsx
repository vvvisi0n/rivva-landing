"use client";

import { useEffect, useMemo, useState } from "react";

export default function LumiVoiceButton({
  text,
  className = "",
  disabled = false,
}: {
  text: string;
  className?: string;
  disabled?: boolean;
}) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // check support
  useEffect(() => {
    setSupported(
      typeof window !== "undefined" &&
        "speechSynthesis" in window &&
        typeof SpeechSynthesisUtterance !== "undefined"
    );
  }, []);

  // stop speaking if question changes
  useEffect(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [text, supported]);

  const canSpeak = useMemo(
    () => supported && !disabled && text?.trim().length > 0,
    [supported, disabled, text]
  );

  function toggleSpeak() {
    if (!canSpeak) return;

    const synth = window.speechSynthesis;

    // if currently speaking, stop
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    // otherwise speak text
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.0;
    utter.pitch = 1.05;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);

    setSpeaking(true);
    synth.speak(utter);
  }

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggleSpeak}
      disabled={!canSpeak}
      aria-label={speaking ? "Stop Lumi voice" : "Play Lumi voice"}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm ${
        !canSpeak ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <span className="text-white/90">
        {speaking ? "Stop Voice" : "Lumi Voice"}
      </span>
      <span
        className={`w-2 h-2 rounded-full ${
          speaking ? "bg-cyan-300 animate-pulse" : "bg-white/50"
        }`}
      />
    </button>
  );
}
