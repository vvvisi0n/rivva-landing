export type ChatFrom = "you" | "them" | "lumi";

export type ChatMessage = {
  id: string;
  from: ChatFrom;
  text: string;
  ts: number;
};

export type Match = {
  id: string;
  name: string;
  city: string;
  vibe: string; // "grounded" | "spark" | "deep" | etc
  lumiWhy: string;
};

const MATCHES: Match[] = [
  {
    id: "maya",
    name: "Maya",
    city: "Brooklyn, NY",
    vibe: "grounded",
    lumiWhy:
      "You both lead with calm clarity. Her pace + affection style matches your need for consistency, which usually creates emotional safety early.",
  },
  {
    id: "aden",
    name: "Aden",
    city: "Washington, DC",
    vibe: "deep",
    lumiWhy:
      "High alignment on values-first connection. You tend to open through conversation, and he stays present in talk-heavy intimacy.",
  },
  {
    id: "zoe",
    name: "Zoe",
    city: "Austin, TX",
    vibe: "spark",
    lumiWhy:
      "Your profile shows warmth + playful curiosity. She brings lightness without being shallow — good for keeping momentum alive.",
  },
  {
    id: "samir",
    name: "Samir",
    city: "Atlanta, GA",
    vibe: "steady",
    lumiWhy:
      "You respond best to emotionally consistent people. His steady style reduces friction and supports long-term trust building.",
  },
];

export function getMatches() {
  return MATCHES;
}

export function getMatch(id: string) {
  return MATCHES.find((m) => m.id === id) ?? null;
}

export function getChatSeed(id: string): ChatMessage[] {
  const match = getMatch(id);
  if (!match) return [];

  const now = Date.now();

  return [
    {
      id: crypto.randomUUID(),
      from: "lumi",
      text: `Quick read: ${match.lumiWhy}`,
      ts: now - 3000,
    },
    {
      id: crypto.randomUUID(),
      from: "them",
      text: "Hey 🙂 glad we matched. What kinda connection are you looking for?",
      ts: now - 2000,
    },
  ];
}
