"use client";

import { useEffect, useMemo, useState } from "react";

export type VoiceStatus = "idle" | "speaking" | "paused";

export default function useLumiVoice() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    function load() {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
    }

    load();
    window.speechSynthesis.onvoiceschanged = load;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const bestVoice = useMemo(() => {
    if (!voices.length) return null;

    const preferred = [
      // macOS / iOS Safari
      "Samantha",
      "Ava",
      "Allison",
      // Chrome / Edge
      "Google US English",
      "Google UK English Female",
      "Microsoft Aria Online",
      "Microsoft Jenny Online",
    ];

    // first try exact name match
    for (const name of preferred) {
      const found = voices.find((v) => v.name === name);
      if (found) return found;
    }

    // then try any high-quality en voices
    const en = voices.filter((v) => v.lang.startsWith("en"));
    const femaleHint = en.find((v) =>
      /female|woman|girl|samantha|ava|aria|jenny/i.test(v.name)
    );
    return femaleHint || en[0] || voices[0];
  }, [voices]);

  function speak(text: string) {
    if (!enabled) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const t = text.trim();
    if (!t) return;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(t);
    if (bestVoice) utter.voice = bestVoice;

    // softer + more natural pacing
    utter.rate = 0.95;  // slightly slower than default
    utter.pitch = 1.05; // tiny lift for warmth
    utter.volume = 1;

    utter.onstart = () => setStatus("speaking");
    utter.onend = () => setStatus("idle");
    utter.onerror = () => setStatus("idle");

    window.speechSynthesis.speak(utter);
  }

  function stop() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setStatus("idle");
  }

  function pause() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.pause();
    setStatus("paused");
  }

  function resume() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.resume();
    setStatus("speaking");
  }

  return {
    supported:
      typeof window !== "undefined" && "speechSynthesis" in window,
    status,
    enabled,
    setEnabled,
    speak,
    stop,
    pause,
    resume,
    voiceName: bestVoice?.name ?? null,
  };
}