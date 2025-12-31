export type Match = {
  id: string;
  name: string;

  age?: number;
  location?: string;
  bio?: string;

  images: string[];

  vibe?: "spark" | "grounded" | "deep";
  vibeTags?: string[];

  compatibility?: number;

  lastMessage?: string;
  lastActive?: string;

  prompts?: { q: string; a: string }[];

  // Used by "Why we matched"
  aboutMeTags?: string[];
  lookingForTags?: string[];
};

export const MOCK_MATCHES: Match[] = [
  {
    id: "m1",
    name: "Ari",
    age: 27,
    location: "NYC",
    bio: "Low-key foodie. Big on good conversation.",
    images: ["/matches/ari-1.jpg", "/matches/ari-2.jpg"],
    vibe: "spark",
    vibeTags: ["Chill", "Curious", "Night walks"],
    compatibility: 88,
    lastMessage: "You up for tacos this week?",
    lastActive: "2h ago",
    prompts: [
      { q: "My perfect weekend is…", a: "Tacos, a long walk, and a movie night." },
      { q: "A green flag I love is…", a: "Someone who communicates clearly." },
    ],
    aboutMeTags: ["about.playful_witty", "about.curiosity", "about.foodie", "about.deep_convos"].filter(Boolean),
    lookingForTags: ["look.communication", "look.chemistry_alignment", "look.real_connection"].filter(Boolean),
  },
  {
    id: "m2",
    name: "Noah",
    age: 30,
    location: "ATL",
    bio: "Runner, reader, soft life advocate.",
    images: ["/matches/noah-1.jpg"],
    vibe: "grounded",
    vibeTags: ["Active", "Books", "Coffee"],
    compatibility: 82,
    lastMessage: "That playlist was fire lol",
    lastActive: "5h ago",
    prompts: [
      { q: "I’m known for…", a: "Being consistent and easy to talk to." },
      { q: "My love language is…", a: "Quality time, always." },
    ],
    aboutMeTags: ["about.calm_grounded", "about.active_fitness", "about.reader", "about.soft_life"].filter(Boolean),
    lookingForTags: ["look.consistency", "look.emotional_safety", "look.intentional_dating", "look.long_term"].filter(Boolean),
  },
  {
    id: "m3",
    name: "Zee",
    age: 25,
    location: "LA",
    bio: "Art galleries + rooftop sunsets.",
    images: ["/matches/zee-1.jpg", "/matches/zee-2.jpg"],
    vibe: "deep",
    vibeTags: ["Creative", "Sunsets", "Museums"],
    compatibility: 79,
    lastMessage: "Send me your favorite song rn",
    lastActive: "1d ago",
    prompts: [
      { q: "Something I’m proud of…", a: "I’ve rebuilt my life twice." },
      { q: "A lesson I learned about love…", a: "Slow is better than rushed." },
    ],
    aboutMeTags: ["about.creative", "about.deep_convos", "about.warm_affectionate", "about.museums"].filter(Boolean),
    lookingForTags: ["look.slow_burn", "look.teammate", "look.emotional_maturity"].filter(Boolean),
  },
];

export const FEED = MOCK_MATCHES;
export const MATCHES = MOCK_MATCHES;

export function getChatSeed(matchId: string, userId = "local_user") {
  const str = `${userId}:${matchId}`;
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}
