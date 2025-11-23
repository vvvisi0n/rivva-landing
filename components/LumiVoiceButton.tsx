"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
};

export default function LumiVoiceButton({ text, className }: Props) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const ok =
      typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      "SpeechSynthesisUtterance" in window;

    setSupported(ok);
    if (!ok) return;

    function loadVoices() {
      voicesRef.current = window.speechSynthesis.getVoices();
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, []);

  const lumiVoice = useMemo(() => {
    const voices = voicesRef.current || [];
    if (!voices.length) return null;

    // Prefer natural English female voices when available
    const preferred = [
      "Google US English",
      "Microsoft Aria Online",
      "Microsoft Jenny Online",
      "Samantha",
      "Ava",
      "Serena",
      "Victoria",
    ];

    // 1) Exact preferred match
    for (const name of preferred) {
      const v = voices.find(
        (vv) =>
          vv.name.toLowerCase().includes(name.toLowerCase()) &&
          vv.lang.toLowerCase().startsWith("en")
      );
      if (v) return v;
    }

    // 2) Any English female-ish voice by heuristic
    const femaleHint = voices.find(
      (vv) =>
        vv.lang.toLowerCase().startsWith("en") &&
        /female|woman|girl|aria|jenny|samantha|ava|victoria|serena/i.test(vv.name)
    );
    if (femaleHint) return femaleHint;

    // 3) Fallback: first English
    return voices.find((vv) => vv.lang.toLowerCase().startsWith("en")) || null;
  }, [supported, speaking]);

  function stop() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    utterRef.current = null;
  }

  function speak() {
    if (!supported) return;

    // If already speaking, toggle off
    if (speaking) {
      stop();
      return;
    }

    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);

    if (lumiVoice) u.voice = lumiVoice;

    // Natural cadence
    u.rate = 0.98;   // slightly slower than default
    u.pitch = 1.05;  // gentle brightness
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
      onClick={speak}
      aria-label="Toggle Lumi voice"
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium
        border border-white/15 bg-white/5 hover:bg-white/10 active:scale-[0.98] transition
        ${className || ""}`}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          speaking ? "bg-cyan-300 animate-pulse" : "bg-white/50"
        }`}
      />
      {speaking ? "Lumi speaking…" : "Hear Lumi"}
    </button>
  );
}
