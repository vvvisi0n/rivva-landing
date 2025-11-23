"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function pickBestVoice(voices: SpeechSynthesisVoice[]) {
  const english = voices.filter((v) => /en/i.test(v.lang));

  // Prefer more natural / female / neural-ish voices when present
  const preferredNames = [
    "Samantha",
    "Google US English",
    "Google UK English Female",
    "Microsoft Aria",
    "Microsoft Jenny",
    "Microsoft Zira",
    "Karen",
    "Moira",
    "Tessa",
    "Serena",
  ];

  for (const name of preferredNames) {
    const found = english.find((v) => v.name.includes(name));
    if (found) return found;
  }

  // Otherwise pick first English voice
  return english[0] || voices[0];
}

export default function LumiVoiceButton({
  text,
  className = "",
  disabled = false,
  preface = "Alright, here’s your question.",
}: {
  text: string;
  className?: string;
  disabled?: boolean;
  preface?: string;
}) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  // check support
  useEffect(() => {
    setSupported(
      typeof window !== "undefined" &&
        "speechSynthesis" in window &&
        typeof SpeechSynthesisUtterance !== "undefined"
    );
  }, []);

  // load voices (some browsers load async)
  useEffect(() => {
    if (!supported) return;

    const synth = window.speechSynthesis;

    function load() {
      const voices = synth.getVoices();
      if (voices?.length) setVoice(pickBestVoice(voices));
    }

    load();
    synth.addEventListener("voiceschanged", load);

    return () => synth.removeEventListener("voiceschanged", load);
  }, [supported]);

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

    // stop if already speaking
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    synth.cancel();

    const spokenText = `${preface} ${text}`;
    const utter = new SpeechSynthesisUtterance(spokenText);

    if (voice) utter.voice = voice;

    // warmer pacing
    utter.rate = 0.95;  // slightly slower
    utter.pitch = 1.05; // friendly lift
    utter.volume = 1;

    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);

    utterRef.current = utter;
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
