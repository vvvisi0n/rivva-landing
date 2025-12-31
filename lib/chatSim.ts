// lib/chatSim.ts
import type { Match } from "@/lib/matches";
import type { ChatMsg } from "@/lib/chatStore";

// Keep vibes local + strict so optional Match props don't break TS
type OpenerVibe = "spark" | "grounded" | "deep";

const REPLIES: Record<OpenerVibe, string[]> = {
  spark: [
    "Haha I love that. Tell me more 👀",
    "Okay wait that’s actually adorable.",
    "You might be trouble... in a good way 😂",
  ],
  grounded: [
    "That makes sense. What got you into that?",
    "I respect that. What’s your ideal weekend like?",
    "Love that. What are you looking forward to lately?",
  ],
  deep: [
    "Wow. That’s real. I appreciate you sharing that.",
    "That’s beautiful. What did that teach you?",
    "I feel that. What kind of connection are you hoping for?",
  ],
};

function pick<T>(arr: T[], seed: number) {
  if (arr.length === 0) return arr[0];
  return arr[seed % arr.length];
}

function safeVibe(match: Match): OpenerVibe {
  // Match.vibe might not exist yet -> default to grounded
  const v = (match as any).vibe as OpenerVibe | undefined;
  return v ?? "grounded";
}

export function computeChemistry(msgs: ChatMsg[]) {
  // basic placeholder chemistry logic
  const me = msgs.filter((m) => m.from === "me").length;
  const them = msgs.filter((m) => m.from === "match").length;
  const total = me + them;
  if (total === 0) return 0;
  return Math.min(100, Math.round((them / total) * 100));
}

export function simulateMatchReply(match: Match, msgs: ChatMsg[]) {
  const vibe = safeVibe(match);

  // simple deterministic seed based on convo length + match id
  const seed =
    msgs.length +
    match.id
      .split("")
      .reduce((acc, c) => acc + c.charCodeAt(0), 0);

  return pick(REPLIES[vibe], seed);
}