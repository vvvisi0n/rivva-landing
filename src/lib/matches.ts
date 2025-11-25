export type Match = {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  photos: string[];
  tags: string[];
  lastActive: string;
};

export const MOCK_MATCHES: Match[] = [
  {
    id: "m1",
    name: "Ari",
    age: 27,
    location: "Brooklyn, NY",
    bio: "Soft heart, sharp mind. Into bookstores, late-night noodles, and people who communicate clearly.",
    photos: ["/matches/ari-1.jpg", "/matches/ari-2.jpg"],
    tags: ["curious", "emotionally aware", "playful"],
    lastActive: "2h ago",
  },
  {
    id: "m2",
    name: "Jules",
    age: 29,
    location: "Atlanta, GA",
    bio: "Warm, straightforward, and a little chaotic-good. Looking for something real.",
    photos: ["/matches/jules-1.jpg", "/matches/jules-2.jpg"],
    tags: ["direct", "affectionate", "grounded"],
    lastActive: "today",
  },
  {
    id: "m3",
    name: "Sam",
    age: 31,
    location: "Los Angeles, CA",
    bio: "I love depth with levity. If we can laugh and be honest, we’re good.",
    photos: ["/matches/sam-1.jpg", "/matches/sam-2.jpg"],
    tags: ["humor", "intentional", "romantic"],
    lastActive: "online",
  },
  {
    id: "m4",
    name: "Noa",
    age: 26,
    location: "Chicago, IL",
    bio: "Slow burn > fireworks. Big on loyalty, peace, and intentional love.",
    photos: ["/matches/noa-1.jpg", "/matches/noa-2.jpg"],
    tags: ["steady", "empathetic", "low-ego"],
    lastActive: "yesterday",
  },
];

// aliases your pages are importing
export const FEED = MOCK_MATCHES;
export const MATCHES = MOCK_MATCHES;

export function getChatSeed(matchId: string) {
  const map: Record<string, string[]> = {
    m1: [
      "Okay but your quiz answers were… kinda adorable.",
      "You seem like someone who actually means what you say.",
      "What’s your perfect ‘no pressure’ first date?",
    ],
    m2: [
      "I feel like we’d vibe in real life.",
      "What’s something you’re unlearning in dating?",
      "Tell me your most ‘you’ weekend.",
    ],
    m3: [
      "You give intentional energy. I like that.",
      "What’s a green flag people overlook?",
      "Let’s trade weird hobbies.",
    ],
    m4: [
      "Your vibe feels calm in a good way.",
      "What does ‘safe love’ look like to you?",
      "What’s your comfort show?",
    ],
  };

  return map[matchId] ?? [
    "Hey you — what made you smile today?",
    "What kind of connection are you looking for right now?",
  ];
}
