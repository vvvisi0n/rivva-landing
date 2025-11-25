export type Match = {
  id: string;
  name: string;
  age?: number;
  location?: string;
  bio?: string;
  images: string[];
  vibeTags?: string[];
  lastMessage?: string;
  lastActive?: string;
};

// Single source of truth mock data
export const MOCK_MATCHES: Match[] = [
  {
    id: "m1",
    name: "Ari",
    age: 27,
    location: "NYC",
    bio: "Low-key foodie. Big on good conversation.",
    images: ["/matches/ari-1.jpg", "/matches/ari-2.jpg"],
    vibeTags: ["Chill", "Curious", "Night walks"],
    lastMessage: "You up for tacos this week?",
    lastActive: "2h ago",
  },
  {
    id: "m2",
    name: "Noah",
    age: 30,
    location: "ATL",
    bio: "Runner, reader, soft life advocate.",
    images: ["/matches/noah-1.jpg"],
    vibeTags: ["Active", "Books", "Coffee"],
    lastMessage: "That playlist was fire lol",
    lastActive: "5h ago",
  },
  {
    id: "m3",
    name: "Zee",
    age: 25,
    location: "LA",
    bio: "Art galleries + rooftop sunsets.",
    images: ["/matches/zee-1.jpg", "/matches/zee-2.jpg"],
    vibeTags: ["Creative", "Sunsets", "Museums"],
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
  // Simple hash -> number
  const str = `${userId}:${matchId}`;
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}
