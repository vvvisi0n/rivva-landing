export type LumiVoiceStyle = "calm" | "playful" | "intimate";

type LumiVoiceTuning = {
  rateMul: number;   // 0.80 - 1.20
  pitchMul: number;  // 0.90 - 1.20
  pauseMul: number;  // 0.70 - 1.50
};

const KEY_ENABLED = "rivva_lumi_enabled";
const KEY_AUTOSPEAK = "rivva_lumi_autospeak";
const KEY_COACH_AUTOSPEAK = "rivva_lumi_coach_autospeak";
const KEY_QUIZ_AUTOSPEAK = "rivva_lumi_quiz_autospeak";
const KEY_STYLE = "rivva_lumi_voice_style";
const KEY_BREATH = "rivva_lumi_breath_mode";
const KEY_TUNING = "rivva_lumi_voice_tuning";

function getBool(key: string, fallback: boolean) {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (raw == null) return fallback;
  return raw === "1";
}

function setBool(key: string, val: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, val ? "1" : "0");
}

export function getLumiEnabled(): boolean {
  return getBool(KEY_ENABLED, true);
}

export function setLumiEnabled(val: boolean) {
  setBool(KEY_ENABLED, val);
}

export function getLumiAutoSpeak(): boolean {
  return getBool(KEY_AUTOSPEAK, false);
}

export function setLumiAutoSpeak(val: boolean) {
  setBool(KEY_AUTOSPEAK, val);
}

export function getLumiCoachAutoSpeak(): boolean {
  return getBool(KEY_COACH_AUTOSPEAK, true);
}

export function setLumiCoachAutoSpeak(val: boolean) {
  setBool(KEY_COACH_AUTOSPEAK, val);
}

export function getLumiQuizAutoSpeak(): boolean {
  return getBool(KEY_QUIZ_AUTOSPEAK, true);
}

export function setLumiQuizAutoSpeak(val: boolean) {
  setBool(KEY_QUIZ_AUTOSPEAK, val);
}

export function getLumiVoiceStyle(): LumiVoiceStyle {
  if (typeof window === "undefined") return "calm";
  const raw = localStorage.getItem(KEY_STYLE);
  if (raw === "calm" || raw === "playful" || raw === "intimate") return raw;
  return "calm";
}

export function setLumiVoiceStyle(val: LumiVoiceStyle) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_STYLE, val);
}

export function getLumiBreathMode(): boolean {
  return getBool(KEY_BREATH, true);
}

export function setLumiBreathMode(val: boolean) {
  setBool(KEY_BREATH, val);
}

export function getLumiVoiceTuning(): LumiVoiceTuning {
  if (typeof window === "undefined") return { rateMul: 1, pitchMul: 1, pauseMul: 1 };

  try {
    const raw = localStorage.getItem(KEY_TUNING);
    if (!raw) return { rateMul: 1, pitchMul: 1, pauseMul: 1 };

    const v = JSON.parse(raw) as Partial<LumiVoiceTuning>;
    const rateMul = typeof v.rateMul === "number" ? v.rateMul : 1;
    const pitchMul = typeof v.pitchMul === "number" ? v.pitchMul : 1;
    const pauseMul = typeof v.pauseMul === "number" ? v.pauseMul : 1;

    return { rateMul, pitchMul, pauseMul };
  } catch {
    return { rateMul: 1, pitchMul: 1, pauseMul: 1 };
  }
}

export function setLumiVoiceTuning(next: LumiVoiceTuning) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_TUNING, JSON.stringify(next));
}

export function resetLumiSettings() {
  setLumiEnabled(true);
  setLumiAutoSpeak(false);
  setLumiCoachAutoSpeak(true);
  setLumiQuizAutoSpeak(true);
  setLumiVoiceStyle("calm");
  setLumiBreathMode(true);
  setLumiVoiceTuning({ rateMul: 1, pitchMul: 1, pauseMul: 1 });
}
