export type Match = {
  id: string;
  name: string;

  // current / new fields
  age?: number;
  location?: string;
  bio?: string;
  images: string[];
  vibeTags?: string[];
  lastMessage?: string;
  lastActive?: string;

  // backwards-compat fields for older pages
  city?: string;
  vibe?: string;
  tags?: string[];
  compatibility?: number;
};

// Single source of truth mock data
export const MOCK_MATCHES: Match[] = [
  {
    id: "m1",
    name: "Ari",
    age: 27,
    location: "NYC",
    city: "NYC",
    bio: "Low-key foodie. Big on good conversation.",
    images: ["/matches/ari-1.jpg", "/matches/ari-2.jpg"],
    vibeTags: ["Chill", "Curious", "Night walks"],
    vibe: "Warm, playful, and emotionally present.",
    tags: ["emotionally steady", "fun energy", "intentional"],
    compatibility: 88,
    lastMessage: "You up for tacos this week?",
    lastActive: "2h ago",
  },
  {
    id: "m2",
    name: "Noah",
    age: 30,
    location: "ATL",
    city: "ATL",
    bio: "Runner, reader, soft life advocate.",
    images: ["/matches/noah-1.jpg"],
    vibeTags: ["Active", "Books", "Coffee"],
    vibe: "Low ego, high curiosity. Communicates clearly.",
    tags: ["great communicator", "secure vibe", "values-led"],
    compatibility: 82,
    lastMessage: "That playlist was fire lol",
    lastActive: "5h ago",
  },
  {
    id: "m3",
    name: "Zee",
    age: 25,
    location: "LA",
    city: "LA",
    bio: "Art galleries + rooftop sunsets.",
    images: ["/matches/zee-1.jpg", "/matches/zee-2.jpg"],
    vibeTags: ["Creative", "Sunsets", "Museums"],
    vibe: "Quiet confidence. Shows love through consistency.",
    tags: ["slow-burn", "loyal", "gentle energy"],
    compatibility: 79,
    lastMessage: "Send me your favorite song rn",
    lastActive: "1d ago",
  },
];

// Backwards-compatible exports (your pages expect these)
export const FEED = MOCK_MATCHES;
export const MATCHES = MOCK_MATCHES;

/**
 * Deterministic seed for chat UI quirks (typing speed, delays, etc.)
 * Keeps things stable per user+match.
 */
export function getChatSeed(matchId: string, userId = "local_user") {
  const str = `${userId}:${matchId}`;
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}