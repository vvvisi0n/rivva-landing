export type Match = {
  id: string;
  name: string;
  age: number;
  city: string;
  bio: string;
  prompts: { q: string; a: string }[];
  tags: string[];
  vibe: "spark" | "steady" | "deep" | "grounded";
  photos: string[]; // for now can be placeholders
};

export const MOCK_MATCHES: Match[] = [
  {
    id: "m1",
    name: "Amina",
    age: 28,
    city: "Brooklyn, NY",
    bio: "Soft life energy with a sharp mind. I love long walks, jazz, and people who communicate clearly.",
    prompts: [
      { q: "Ideal Sunday", a: "Coffee, farmer’s market, then a movie I’ll over-analyze." },
      { q: "Green flag", a: "Consistency without games." },
      { q: "I value", a: "Emotional honesty + laughter." },
    ],
    tags: ["Warm", "Curious", "Grounded"],
    vibe: "grounded",
    photos: ["/placeholders/1.jpg", "/placeholders/2.jpg"],
  },
  {
    id: "m2",
    name: "Kwame",
    age: 31,
    city: "Atlanta, GA",
    bio: "Big on family, big on future. I build things, love Afrobeats, and don’t do chaos.",
    prompts: [
      { q: "I’m known for", a: "Showing up when it matters." },
      { q: "Best date", a: "Trying something new together." },
    ],
    tags: ["Steady", "Playful", "Builder"],
    vibe: "steady",
    photos: ["/placeholders/3.jpg"],
  },
  {
    id: "m3",
    name: "Zara",
    age: 26,
    city: "Chicago, IL",
    bio: "If we can talk for hours and still want more time, we’re good.",
    prompts: [
      { q: "My edge", a: "I read energy fast." },
      { q: "Love looks like", a: "Safety + passion in the same room." },
    ],
    tags: ["Deep", "Romantic", "Intense"],
    vibe: "deep",
    photos: ["/placeholders/4.jpg"],
  },
  {
    id: "m4",
    name: "Tobi",
    age: 29,
    city: "Dallas, TX",
    bio: "Flirty but intentional. I want a best friend with chemistry.",
    prompts: [
      { q: "The way to my heart", a: "Make me laugh, then be real." },
      { q: "Non-negotiable", a: "Respect." },
    ],
    tags: ["Spark", "Funny", "Bold"],
    vibe: "spark",
    photos: ["/placeholders/5.jpg"],
  },
];
