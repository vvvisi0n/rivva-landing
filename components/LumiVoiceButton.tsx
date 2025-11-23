"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  text: string;
  className?: string;
  autoPlay?: boolean;
};

export default function LumiVoiceButton({ text, className = "", autoPlay = false }: Props) {
  const [speaking, setSpeaking] = useState(false);
  const supported = useMemo(() => {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }, []);

  function speak() {
    if (!supported || !text) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.pitch = 1.05;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);

    synth.speak(utter);
  }

  function stop() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  useEffect(() => {
    if (autoPlay) speak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  return (
    <button
      type="button"
      onClick={speaking ? stop : speak}
      disabled={!supported}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-xl
        border border-white/15 bg-white/5 hover:bg-white/10
        text-sm font-medium text-white transition
        disabled:opacity-40 disabled:cursor-not-allowed
        ${className}
      `}
      aria-label="Play Lumi voice"
    >
      <span
        className={`h-2 w-2 rounded-full ${speaking ? "bg-cyan-300 animate-pulse" : "bg-white/60"}`}
      />
      {speaking ? "Stop Lumi" : "Hear Lumi"}
    </button>
  );
}
