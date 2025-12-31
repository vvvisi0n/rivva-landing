"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useLumiVoice from "@/components/useLumiVoice";
import { getLumiEnabled, getLumiAutoSpeak } from "@/lib/lumiSettings";

type Props = {
  textToSpeak?: string;
  text?: string;

  onTranscript?: (text: string) => void;
  prompt?: string;

  disabled?: boolean;
  className?: string;
};

export default function LumiVoiceButton({
  textToSpeak,
  text,
  onTranscript,
  prompt,
  disabled,
  className,
}: Props) {
  const voice = useLumiVoice();

  const [lumiEnabled, setLumiEnabledState] = useState(true);
  const [autoSpeak, setAutoSpeakState] = useState(false);

  useEffect(() => {
    setLumiEnabledState(getLumiEnabled());
    setAutoSpeakState(getLumiAutoSpeak());

    const onStorage = () => {
      setLumiEnabledState(getLumiEnabled());
      setAutoSpeakState(getLumiAutoSpeak());
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const canUseVoice = voice.supported && lumiEnabled;
  const isBusy = voice.status === "speaking";

  const title = useMemo(() => {
    if (!voice.supported) return "Speech not supported in this browser";
    if (!lumiEnabled) return "Enable Lumi voice in Settings → Accessibility";
    if (!autoSpeak) return voice.voiceName ?? "Voice";
    return voice.voiceName ?? "Voice";
  }, [voice.supported, voice.voiceName, lumiEnabled, autoSpeak]);

  const handleClick = useCallback(async () => {
    if (disabled) return;
    if (!canUseVoice) return;

    if (isBusy) {
      voice.stop();
      return;
    }

    const ttsText = (textToSpeak ?? text ?? "").trim();

    if (ttsText) {
      voice.speak(ttsText);
      return;
    }

    if (onTranscript) {
      console.warn("Speech-to-text not implemented in useLumiVoice yet.");
    }
  }, [disabled, canUseVoice, isBusy, textToSpeak, text, onTranscript, prompt, voice]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || !canUseVoice}
      aria-label="Lumi voice"
      title={title}
      className={
        className ??
        `px-3 py-2 rounded-xl text-xs font-semibold transition border
         ${disabled || !canUseVoice
           ? "bg-white/10 text-white/50 border-white/10 cursor-not-allowed"
           : "bg-white/10 text-white border-white/20 hover:bg-white/15"}`
      }
    >
      {isBusy ? "Stop" : "Listen"}
    </button>
  );
}
