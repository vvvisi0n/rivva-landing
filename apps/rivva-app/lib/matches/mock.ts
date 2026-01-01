export type Match = {
  id: string;
  name: string;
  age: number;
  headline: string;
  about: string;
  highlights: string[];
};

export const FIRST_MATCH: Match = {
  id: "m_001",
  name: "Amina",
  age: 29,
  headline: "Calm. Direct. Emotionally consistent.",
  about:
    "I like steady connection. I do not like mixed signals. I value kindness and accountability. I prefer simple dates with real conversation.",
  highlights: [
    "Clear communication",
    "Slow build. Strong foundation",
    "Respectful boundaries",
    "Warm energy",
  ],
};
