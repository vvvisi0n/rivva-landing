"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onTranscript: (text: string) => void;
  className?: string;
};

export default function LumiVoiceButton({ onTranscript, className = "" }: Props) {
  const recRef = useRef<SpeechRecognition | null>(null);
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const rec: SpeechRecognition = new SpeechRecognition();
    recRef.current = rec;

    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onstart = () => {
      setListening(true);
      setInterim("");
    };

    rec.onend = () => {
      setListening(false);
      setInterim("");
    };

    rec.onerror = () => {
      setListening(false);
      setInterim("");
    };

    rec.onresult = (e: SpeechRecognitionEvent) => {
      let finalText = "";
      let interimText = "";

      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interimText += r[0].transcript;
      }

      if (interimText) setInterim(interimText.trim());

      if (finalText.trim()) {
        onTranscript(finalText.trim());
        setInterim("");
      }
    };
  }, [onTranscript]);

  function toggle() {
    if (!recRef.current) return;
    if (listening) {
      recRef.current.stop();
    } else {
      try {
        recRef.current.start();
      } catch {
        // ignore double-start edge case
      }
    }
  }

  if (!supported) {
    return (
      <button
        disabled
        className={`px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/50 ${className}`}
        title="Voice not supported in this browser"
      >
        Voice N/A
      </button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggle}
        className={`px-3 py-2 rounded-xl border text-xs font-semibold transition flex items-center gap-2
          ${
            listening
              ? "bg-purple-500/20 border-purple-400/40 text-white"
              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
          }`}
        aria-pressed={listening}
      >
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            listening ? "bg-cyan-300 animate-pulse" : "bg-white/40"
          }`}
        />
        {listening ? "Listening…" : "Lumi Voice"}
      </button>

      {listening && interim && (
        <div className="absolute -top-10 left-0 right-0 mx-auto w-max max-w-[240px] px-3 py-1 text-[11px] rounded-full bg-white/10 border border-white/10 text-white/80 backdrop-blur">
          {interim}
        </div>
      )}
    </div>
  );
}
