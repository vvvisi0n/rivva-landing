export type Match = {
  id: string;
  name: string;
  age: number;
  city: string;
  bio: string;
  tags: string[];
  compatibility: number;
};

// Phase 3 mock feed (replace with DB later)
export const FEED: Match[] = [
  {
    id: "m1",
    name: "Ari",
    age: 28,
    city: "Brooklyn, NY",
    bio: "Warm, playful, emotionally steady. Loves live music and deep laughs. Wants a connection that grows naturally.",
    tags: ["emotionally steady", "fun energy", "intentional"],
    compatibility: 88,
  },
  {
    id: "m2",
    name: "Sam",
    age: 31,
    city: "Atlanta, GA",
    bio: "Low ego, high curiosity. Into fitness, travel, and building something real with someone who communicates clearly.",
    tags: ["great communicator", "secure vibe", "values-led"],
    compatibility: 82,
  },
  {
    id: "m3",
    name: "Jo",
    age: 27,
    city: "Toronto, CA",
    bio: "Quiet confidence. Bookstore dates, cooking nights, and thoughtful conversation. Big on loyalty.",
    tags: ["slow-burn", "loyal", "gentle energy"],
    compatibility: 79,
  },
  {
    id: "m4",
    name: "Nia",
    age: 29,
    city: "London, UK",
    bio: "Creative, bold, and soft at the core. Wants someone who’s emotionally present and playful.",
    tags: ["creative", "romantic", "fun energy"],
    compatibility: 91,
  },
  {
    id: "m5",
    name: "Kofi",
    age: 33,
    city: "Accra, GH",
    bio: "Grounded, family-first, ambitious. Wants peace, laughter, and a partner who’s serious about love.",
    tags: ["values-led", "secure vibe", "provider energy"],
    compatibility: 84,
  },
];
