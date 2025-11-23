"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type VoiceStatus = "idle" | "speaking" | "paused" | "error" | "unsupported";

export function useLumiVoice() {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [enabled, setEnabled] = useState(true);
  const [voiceName, setVoiceName] = useState<string | null>(null);

  // Detect support
  const supported = useMemo(
    () => typeof window !== "undefined" && "speechSynthesis" in window,
    []
  );

  useEffect(() => {
    if (!supported) {
      setStatus("unsupported");
      return;
    }
    synthRef.current = window.speechSynthesis;

    const pickVoice = () => {
      const voices = synthRef.current?.getVoices() ?? [];
      if (!voices.length) return;

      // Prefer a friendly US/UK English voice
      const preferred =
        voices.find(v => /en-US/i.test(v.lang) && /female|woman|zira|susan|amy|samantha/i.test(v.name)) ||
        voices.find(v => /en-US/i.test(v.lang)) ||
        voices.find(v => /en/i.test(v.lang)) ||
        voices[0];

      if (preferred) setVoiceName(preferred.name);
    };

    pickVoice();
    synthRef.current.onvoiceschanged = pickVoice;

    return () => {
      if (synthRef.current) synthRef.current.onvoiceschanged = null;
    };
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported || !synthRef.current) return;
    synthRef.current.cancel();
    utterRef.current = null;
    setStatus("idle");
  }, [supported]);

  const speak = useCallback(
    (text: string) => {
      if (!supported) {
        setStatus("unsupported");
        return;
      }
      if (!enabled) return;
      if (!synthRef.current) synthRef.current = window.speechSynthesis;

      // Cancel any current speech
      synthRef.current.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      utterRef.current = utter;

      const voices = synthRef.current.getVoices();
      const voice =
        voices.find(v => v.name === voiceName) ||
        voices.find(v => /en-US/i.test(v.lang)) ||
        voices.find(v => /en/i.test(v.lang));

      if (voice) utter.voice = voice;

      utter.rate = 1.0;
      utter.pitch = 1.05;
      utter.volume = 1.0;

      utter.onstart = () => setStatus("speaking");
      utter.onend = () => setStatus("idle");
      utter.onerror = () => setStatus("error");
      utter.onpause = () => setStatus("paused");
      utter.onresume = () => setStatus("speaking");

      synthRef.current.speak(utter);
    },
    [supported, enabled, voiceName]
  );

  const pause = useCallback(() => {
    if (!supported || !synthRef.current) return;
    synthRef.current.pause();
    setStatus("paused");
  }, [supported]);

  const resume = useCallback(() => {
    if (!supported || !synthRef.current) return;
    synthRef.current.resume();
    setStatus("speaking");
  }, [supported]);

  return {
    supported,
    status,
    enabled,
    setEnabled,
    speak,
    stop,
    pause,
    resume,
    voiceName,
  };
}
