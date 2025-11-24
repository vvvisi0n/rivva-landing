export type ChatRole = "you" | "match" | "lumi";

export type ChatMsg = {
  id: string;
  role: ChatRole;
  text: string;
  ts: number;
};

const REPLIES = [
  "Haha I like that 😄",
  "Wait that’s actually really cute.",
  "Okay, I’m listening… what’s the story?",
  "That’s a green flag answer.",
  "I’m not gonna lie, that made me smile.",
  "You seem like trouble… in a good way 😏",
  "That’s interesting—tell me more.",
  "I feel like we’d vibe in real life.",
  "What’s something you’re really into lately?",
  "I respect that. What made you feel that way?",
];

const FOLLOWUPS = [
  "What are you doing this weekend?",
  "What’s your ideal first date?",
  "What’s your love language?",
  "What’s a small thing that always makes you happy?",
  "What’s something you want more of in your life?",
];

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateReply(userText: string): string {
  const t = userText.toLowerCase();

  if (t.includes("hi") || t.includes("hey") || t.includes("hello")) {
    return pick([
      "Heyyy 😊 what’s your vibe today?",
      "Hi! I’m glad you messaged. How’s your day going?",
      "Hey stranger 😄 what’s up?",
    ]);
  }

  if (t.includes("?")) {
    return pick([
      "Ooo good question… I’d say " + pick(["yes", "maybe", "absolutely", "sometimes"]) + ". You?",
      pick(REPLIES),
    ]);
  }

  if (t.includes("music") || t.includes("song") || t.includes("artist")) {
    return pick([
      "Music is a big deal to me. What have you been looping lately?",
      "Okay taste check: what’s your top 3 right now?",
    ]);
  }

  if (t.includes("food") || t.includes("restaurant") || t.includes("eat")) {
    return pick([
      "I’m a foodie lowkey. What’s your go-to comfort meal?",
      "Okay but what cuisine could you eat forever?",
    ]);
  }

  // default: warm + curious
  return pick([
    pick(REPLIES),
    pick(REPLIES) + " " + pick(FOLLOWUPS),
  ]);
}

export function lumiNudge(matchName: string): string {
  return pick([
    `Try something warm + specific. Ask ${matchName} about a moment they felt most alive.`,
    `Lean playful: “You seem like someone with a secret talent… what is it?”`,
    `Ask a soft opener: “What kind of connection are you craving right now?”`,
  ]);
}
