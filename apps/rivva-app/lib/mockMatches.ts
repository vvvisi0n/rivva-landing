import type { UserProfile } from "@/lib/profile";

export const MOCK_MATCHES: UserProfile[] = [
  {
    id: "m1",
    name: "Ava",
    age: 29,
    city: "New York",
    intent: "serious",
    aboutMeTags: ["calm", "intentional", "emotionally intelligent", "low drama"],
    lookingForTags: ["consistency", "respect", "clear communication"],
    boundaries: ["no rushed intimacy", "no off platform pressure"],
  },
  {
    id: "m2",
    name: "Maya",
    age: 31,
    city: "Brooklyn",
    intent: "serious",
    aboutMeTags: ["thoughtful", "warm", "private", "steady"],
    lookingForTags: ["emotional safety", "clarity", "healthy pace"],
    boundaries: ["no love bombing", "no chaos"],
  },
  {
    id: "m3",
    name: "Nina",
    age: 28,
    city: "Queens",
    intent: "dating",
    aboutMeTags: ["playful", "honest", "direct", "curious"],
    lookingForTags: ["good conversation", "respect", "fun dates"],
    boundaries: ["no disrespect", "no games"],
  },
];
