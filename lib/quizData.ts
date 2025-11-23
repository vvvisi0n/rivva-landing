export type Traits = {
  emotional: number;
  playful: number;
  adventurous: number;
  grounded: number;
};

export type Option = {
  id: string;
  text: string;
  traits: Partial<Traits>;
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
      {
        id: "a",
        text: "Their energy / vibe",
        traits: { emotional: 2, playful: 1 },
      },
      {
        id: "b",
        text: "Shared values",
        traits: { grounded: 2, emotional: 1 },
      },
      {
        id: "c",
        text: "Physical attraction",
        traits: { adventurous: 2 },
      },
      {
        id: "d",
        text: "Conversation flow",
        traits: { emotional: 2, grounded: 1 },
      },
    ],
  },
  {
    id: "q2",
    prompt: "Your ideal first date is…",
    options: [
      {
        id: "a",
        text: "Something thoughtful + personal",
        traits: { emotional: 2, grounded: 1 },
      },
      {
        id: "b",
        text: "Fun + spontaneous",
        traits: { playful: 2, adventurous: 1 },
      },
      {
        id: "c",
        text: "A chill low-pressure hang",
        traits: { grounded: 2, emotional: 1 },
      },
      {
        id: "d",
        text: "A deep talk over coffee",
        traits: { emotional: 2, grounded: 1 },
      },
    ],
  },
  {
    id: "q3",
    prompt: "When conflict shows up, your instinct is to…",
    options: [
      {
        id: "a",
        text: "Talk it out ASAP",
        traits: { emotional: 2, grounded: 1 },
      },
      {
        id: "b",
        text: "Take space then return calm",
        traits: { grounded: 2 },
      },
      {
        id: "c",
        text: "Avoid it if possible",
        traits: { playful: 0, emotional: 0, grounded: 0, adventurous: 0 },
      },
      {
        id: "d",
        text: "Use humor to soften it",
        traits: { playful: 2, emotional: 1 },
      },
    ],
  },
  {
    id: "q4",
    prompt: "A relationship feels right when…",
    options: [
      {
        id: "a",
        text: "You feel emotionally safe",
        traits: { emotional: 2, grounded: 1 },
      },
      {
        id: "b",
        text: "You grow together",
        traits: { grounded: 2, adventurous: 1 },
      },
      {
        id: "c",
        text: "It’s exciting + passionate",
        traits: { adventurous: 2, playful: 1 },
      },
      {
        id: "d",
        text: "You feel understood",
        traits: { emotional: 2 },
      },
    ],
  },
];
