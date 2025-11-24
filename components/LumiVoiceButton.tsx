"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
};

export default function LumiVoiceButton({ text, className = "" }: Props) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(
      typeof window !== "undefined" &&
        "speechSynthesis" in window &&
        "SpeechSynthesisUtterance" in window
    );
  }, []);

  const intros = useMemo(
    () => [
      "Okay, here’s what I’m noticing.",
      "Let me give you a quick read.",
      "Alright… here’s the vibe I’m getting.",
      "Here’s the simple truth.",
      "Wanna hear my take?",
    ],
    []
  );

  function pickIntro() {
    return intros[Math.floor(Math.random() * intros.length)];
  }

  function speak() {
    if (!supported) return;

    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    synth.cancel();

    const intro = pickIntro();
    const full = `${intro} ${text}`;

    const utter = new SpeechSynthesisUtterance(full);

    // softer, more human pacing
    utter.rate = 0.95;
    utter.pitch = 1.08;
    utter.volume = 1;

    // try to prefer a natural female voice if present
    const voices = synth.getVoices();
    const preferred =
      voices.find((v) =>
        /female|woman|samantha|aria|jenny|zira|serena/i.test(v.name)
      ) || voices.find((v) => /en-US|en-GB/i.test(v.lang));

    if (preferred) utter.voice = preferred;

    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);

    utterRef.current = utter;
    synth.speak(utter);
  }

  if (!supported) return null;

  return (
    <button
      onClick={speak}
      className={`inline-flex items-center gap-2 text-xs px-3 py-2 rounded-full border transition
      ${
        speaking
          ? "bg-white text-black border-white"
          : "bg-white/5 text-white border-white/10 hover:bg-white/10"
      } ${className}`}
      aria-label="Play Lumi voice"
      title={speaking ? "Stop Lumi" : "Play Lumi voice"}
    >
      <span className="text-base leading-none">{speaking ? "■" : "▶︎"}</span>
      <span>{speaking ? "Stop Lumi" : "Lumi voice"}</span>
    </button>
  );
}
