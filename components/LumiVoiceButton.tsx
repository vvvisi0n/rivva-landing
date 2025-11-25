"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  labelPlay?: string;
  labelStop?: string;
};

export default function LumiVoiceButton({
  text,
  className,
  labelPlay = "Hear Lumi read this",
  labelStop = "Stop",
}: Props) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ok = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    setSupported(ok);

    if (!ok) return;

    function loadVoices() {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
    }

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const preferredVoice = useMemo(() => {
    if (!voices.length) return null;

    // Prefer soft/natural English voices
    const preferred = voices.find((v) =>
      /en(-|_)us|en(-|_)gb|english/i.test(v.lang) &&
      /natural|premium|enhanced|neural|siri|google|microsoft/i.test(v.name)
    );

    return preferred || voices.find((v) => /en/i.test(v.lang)) || voices[0];
  }, [voices]);

  function stop() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    utterRef.current = null;
  }

  function speak() {
    if (!supported || !text.trim()) return;

    stop();

    const u = new SpeechSynthesisUtterance(text);

    if (preferredVoice) {
      u.voice = preferredVoice;
    }

    // Natural pacing
    u.rate = 0.98;
    u.pitch = 1.05;
    u.volume = 1;

    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);

    utterRef.current = u;
    window.speechSynthesis.speak(u);
  }

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={speaking ? stop : speak}
      className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition shadow-md
        ${speaking
          ? "bg-white/10 border border-white/20 text-white hover:bg-white/15"
          : "bg-gradient-to-r from-purple-500 to-cyan-400 text-black hover:opacity-90"
        }
        ${className || ""}`}
      aria-pressed={speaking}
    >
      {speaking ? labelStop : labelPlay}
      <span aria-hidden className="text-lg">
        {speaking ? "■" : "▶"}
      </span>
    </button>
  );
}
