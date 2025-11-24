export type MatchProfile = {
  id: string;
  name: string;
  age: number;
  city: string;
  headline: string;
  bio: string;
  tags: string[];
  vibe: "spark" | "anchor" | "empath" | "magnetic";
  avatarUrl?: string;
  lastActive: string;
};

export type ChatMessage = {
  id: string;
  from: "you" | "them" | "lumi";
  text: string;
  ts: number;
};

export const MATCHES: MatchProfile[] = [
  {
    id: "maya",
    name: "Maya",
    age: 28,
    city: "Brooklyn, NY",
    headline: "Soft heart, sharp mind.",
    bio: "Big on emotionally honest people. I love late-night walks, poetry that hurts a bit, and partners who are actually curious.",
    tags: ["Emotional depth", "Slow burns", "Playful energy"],
    vibe: "empath",
    lastActive: "Active today"
  },
  {
    id: "aden",
    name: "Aden",
    age: 31,
    city: "Atlanta, GA",
    headline: "Stable, funny, intentional.",
    bio: "I’m done with surface-level. I want a teammate. Museum dates, Sunday cooking, and real conversation.",
    tags: ["Intentional dating", "Consistency", "Family-oriented"],
    vibe: "anchor",
    lastActive: "Active 2h ago"
  },
  {
    id: "zoe",
    name: "Zoë",
    age: 26,
    city: "Los Angeles, CA",
    headline: "Let’s make life a little louder.",
    bio: "I’m the ‘text you a meme then a deep thought’ type. I like adventurous dates and cozy mornings.",
    tags: ["Spontaneous", "Creative", "Flirty"],
    vibe: "spark",
    lastActive: "Active yesterday"
  },
  {
    id: "samir",
    name: "Samir",
    age: 29,
    city: "Chicago, IL",
    headline: "Warm energy only.",
    bio: "I’m into people who know how to communicate without ego. Comedy shows, bookstores, and long talks.",
    tags: ["High EQ", "Funny", "Grounded"],
    vibe: "magnetic",
    lastActive: "Active now"
  }
];

export const SEEDED_CHATS: Record<string, ChatMessage[]> = {
  maya: [
    {
      id: "m1",
      from: "them",
      text: "Hey 🙂 I liked your vibe from your quiz result. What’s something that always makes you feel grounded?",
      ts: Date.now() - 1000 * 60 * 60 * 20
    }
  ],
  aden: [
    {
      id: "a1",
      from: "them",
      text: "You seem like someone who values real connection. What does a good relationship feel like to you?",
      ts: Date.now() - 1000 * 60 * 60 * 6
    }
  ],
  zoe: [
    {
      id: "z1",
      from: "them",
      text: "Ok hi 😄 If we had a free Saturday, what would you want to do first?",
      ts: Date.now() - 1000 * 60 * 60 * 30
    }
  ],
  samir: [
    {
      id: "s1",
      from: "them",
      text: "Heyyy. I’m Samir. Quick question: what’s a green flag you wish more people had?",
      ts: Date.now() - 1000 * 60 * 60 * 1
    }
  ]
};

export function getMatch(id: string) {
  return MATCHES.find(m => m.id === id);
}

export function getChatSeed(id: string) {
  return SEEDED_CHATS[id] ?? [];
}
