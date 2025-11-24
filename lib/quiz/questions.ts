export type TraitKey = "secure" | "growth" | "spark" | "communication";

export type Option = {
  id: string;
  text: string;
  traits: Partial<Record<TraitKey, number>>;
};

export type Question = {
  id: string;
  prompt: string;
  options: Option[];
};

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    prompt: "When you meet someone new, what matters most first?",
    options: [
      { id: "a", text: "Their energy / vibe", traits: { spark: 3 } },
      { id: "b", text: "Shared values", traits: { growth: 3 } },
      { id: "c", text: "Physical attraction", traits: { spark: 2 } },
      { id: "d", text: "Conversation flow", traits: { communication: 3 } },
    ],
  },
  {
    id: "q2",
    prompt: "Your ideal first date is…",
    options: [
      { id: "a", text: "Something thoughtful + personal", traits: { secure: 2, growth: 2 } },
      { id: "b", text: "Fun + spontaneous", traits: { spark: 3 } },
      { id: "c", text: "A chill low-pressure hang", traits: { secure: 2 } },
      { id: "d", text: "A deep talk over coffee", traits: { communication: 3, growth: 1 } },
    ],
  },
  {
    id: "q3",
    prompt: "When conflict shows up, your instinct is to…",
    options: [
      { id: "a", text: "Talk it out ASAP", traits: { communication: 3, secure: 1 } },
      { id: "b", text: "Take space then return calm", traits: { secure: 3 } },
      { id: "c", text: "Avoid it if possible", traits: { spark: 0 } },
      { id: "d", text: "Use humor to soften it", traits: { spark: 2, communication: 1 } },
    ],
  },
  {
    id: "q4",
    prompt: "A relationship feels right when…",
    options: [
      { id: "a", text: "You feel emotionally safe", traits: { secure: 3 } },
      { id: "b", text: "You grow together", traits: { growth: 3 } },
      { id: "c", text: "It’s exciting + passionate", traits: { spark: 3 } },
      { id: "d", text: "You feel understood", traits: { communication: 3, secure: 1 } },
    ],
  },
  {
    id: "q5",
    prompt: "What keeps you interested long-term?",
    options: [
      { id: "a", text: "Emotional consistency", traits: { secure: 3 } },
      { id: "b", text: "Shared ambition + growth", traits: { growth: 3 } },
      { id: "c", text: "Chemistry that stays alive", traits: { spark: 3 } },
      { id: "d", text: "Being able to talk about anything", traits: { communication: 3 } },
    ],
  },
  {
    id: "q6",
    prompt: "You feel most loved when someone…",
    options: [
      { id: "a", text: "Checks in and stays emotionally present", traits: { secure: 3 } },
      { id: "b", text: "Builds a future with you", traits: { growth: 3 } },
      { id: "c", text: "Flirts and keeps things playful", traits: { spark: 3 } },
      { id: "d", text: "Understands your inner world", traits: { communication: 3 } },
    ],
  },
];
