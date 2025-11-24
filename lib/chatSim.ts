import type { ChatMsg } from "@/lib/chatStore";
import type { Match } from "@/lib/matches";

const REPLIES: Record<Match["vibe"], string[]> = {
  spark: [
    "Haha I love that. Tell me more 👀",
    "Okay wait that’s actually adorable.",
    "You’re fun. I’m into this already.",
    "That’s a good question — I’d say…",
  ],
  steady: [
    "That makes sense. I appreciate that.",
    "I like how you think about it.",
    "That’s honestly refreshing to hear.",
    "I’m with you on that. What led you there?",
  ],
  deep: [
    "Oof, that’s real. I respect the honesty.",
    "I’ve thought about that too. Here’s my take…",
    "That’s deep — I feel that.",
    "I’d love to unpack that more with you.",
  ],
  grounded: [
    "I’m into calm energy like that.",
    "That sounds like a good life.",
    "I like your perspective.",
    "Yeah, that’s a green flag for me too.",
  ],
};

function pickOne(arr: string[], seed: number) {
  return arr[seed % arr.length];
}

export function simulateMatchReply(match: Match, msgs: ChatMsg[]) {
  const myMsgs = msgs.filter((m) => m.from === "me");
  const lastMy = myMsgs[myMsgs.length - 1];

  const seed = lastMy.text.length + myMsgs.length;
  const base = pickOne(REPLIES[match.vibe], seed);

  // light personalization
  if (lastMy.text.includes("?")) {
    return base + " What about you?";
  }
  if (lastMy.text.length < 24) {
    return base + " 😄";
  }
  return base;
}

export function computeChemistry(msgs: ChatMsg[]) {
  // simple momentum heuristic
  const me = msgs.filter((m) => m.from === "me").length;
  const match = msgs.filter((m) => m.from === "match").length;

  const questionMarks = msgs.reduce(
    (n, m) => n + (m.text.includes("?") ? 1 : 0),
    0
  );
  const longMsgs = msgs.reduce((n, m) => n + (m.text.length > 80 ? 1 : 0), 0);

  let score = 8 * me + 6 * match + 4 * questionMarks + 3 * longMsgs;

  // cap and smooth
  if (me + match > 10) score += 10;
  return Math.max(0, Math.min(100, score));
}
