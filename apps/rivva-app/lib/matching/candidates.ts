export type Candidate = {
  id: string;
  name: string;
  age: number;

  city?: string;
  vibeTags: string[];

  tone: "calm" | "playful" | "direct" | "soft";
  pace: "slow" | "medium" | "fast";
  values: ("family" | "faith" | "ambition" | "stability" | "creativity" | "service")[];

  headline: string;
  about: string;
};

export const CANDIDATES: Candidate[] = [
  {
    id: "m_001",
    name: "Amina",
    age: 29,
    city: "New York",
    vibeTags: ["steady", "clear", "warm"],
    tone: "calm",
    pace: "slow",
    values: ["stability", "family", "service"],
    headline: "Calm. Direct. Emotionally consistent.",
    about:
      "I like steady connection. I do not like mixed signals. I value kindness and accountability. I prefer simple dates with real conversation.",
  },
  {
    id: "m_002",
    name: "Nia",
    age: 27,
    city: "Brooklyn",
    vibeTags: ["playful", "curious", "intentional"],
    tone: "playful",
    pace: "medium",
    values: ["creativity", "family"],
    headline: "Soft humor. Serious intentions.",
    about:
      "I am lighthearted but I do not play with people. I like effort that feels natural. I value emotional safety.",
  },
  {
    id: "m_003",
    name: "Sam",
    age: 31,
    city: "Jersey City",
    vibeTags: ["direct", "stable", "grounded"],
    tone: "direct",
    pace: "slow",
    values: ["stability", "ambition"],
    headline: "Clear mind. Calm nervous system.",
    about:
      "I like clarity. I value steady plans and honest communication. I do not chase. I build.",
  },
];
