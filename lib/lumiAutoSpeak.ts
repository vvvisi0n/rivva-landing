import {
  getLumiEnabled,
  getLumiAutoSpeak,
  getLumiCoachAutoSpeak,
  getLumiQuizAutoSpeak,
} from "@/lib/lumiSettings";

export type LumiAutoSpeakKind = "coach" | "quiz";

export function shouldLumiAutoSpeak(kind: LumiAutoSpeakKind) {
  if (typeof window === "undefined") return false;

  if (!getLumiEnabled()) return false;
  if (!getLumiAutoSpeak()) return false;

  if (kind === "coach") return getLumiCoachAutoSpeak();
  if (kind === "quiz") return getLumiQuizAutoSpeak();

  return false;
}
