"use client";

import { useEffect, useMemo, useState } from "react";

type LumiVoiceButtonProps = {
  text: string;
  className?: string;
};

export default function LumiVoiceButton({
  text,
  className = "",
}: LumiVoiceButtonProps) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
    }
  }, []);

  const utterance = useMemo(() => {
    if (!supported) return null;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1;
    u.pitch = 1.05;
    u.volume = 1;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    return u;
  }, [text, supported]);

  function toggleSpeak() {
    if (!supported || !utterance) return;

    const synth = window.speechSynthesis;

    // If already speaking, stop
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    // Cancel any queued speech then speak fresh
    synth.cancel();
    synth.speak(utterance);
  }

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggleSpeak}
      className={`px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition ${className}`}
      aria-pressed={speaking}
      aria-label={speaking ? "Stop Lumi voice" : "Play Lumi voice"}
    >
      {speaking ? "Stop Lumi Voice" : "Lumi Voice"}
    </button>
  );
}
