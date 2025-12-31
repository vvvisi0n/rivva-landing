export type Option = { id: string; label: string };
export type OptionGroup = { group: string; options: Option[] };

export const ABOUT_ME_GROUPS: OptionGroup[] = [
  {
    group: "Vibe",
    options: [
      { id: "Playful + witty", label: "Playful + witty" },
      { id: "Calm + grounded", label: "Calm + grounded" },
      { id: "Warm + affectionate", label: "Warm + affectionate" },
      { id: "Quiet but deep", label: "Quiet but deep" },
      { id: "Bold + confident", label: "Bold + confident" },
      { id: "Soft life enjoyer", label: "Soft life enjoyer" },
    ],
  },
  {
    group: "Personality",
    options: [
      { id: "Curious learner", label: "Curious learner" },
      { id: "Emotionally aware", label: "Emotionally aware" },
      { id: "Consistent", label: "Consistent" },
      { id: "Ambitious", label: "Ambitious" },
      { id: "Creative", label: "Creative" },
      { id: "Funny", label: "Funny" },
      { id: "Introvert-friendly", label: "Introvert-friendly" },
      { id: "Extrovert energy", label: "Extrovert energy" },
    ],
  },
  {
    group: "Lifestyle",
    options: [
      { id: "Active / fitness", label: "Active / fitness" },
      { id: "Foodie", label: "Foodie" },
      { id: "Bookish", label: "Bookish" },
      { id: "Music lover", label: "Music lover" },
      { id: "Outdoorsy", label: "Outdoorsy" },
      { id: "Homebody", label: "Homebody" },
      { id: "Traveler", label: "Traveler" },
      { id: "Faith-centered", label: "Faith-centered" },
    ],
  },
  {
    group: "Communication",
    options: [
      { id: "Direct communicator", label: "Direct communicator" },
      { id: "Deep conversations", label: "Deep conversations" },
      { id: "Gentle honesty", label: "Gentle honesty" },
      { id: "Conflict-safe", label: "Conflict-safe" },
      { id: "Boundaries-first", label: "Boundaries-first" },
    ],
  },
];

export const LOOKING_FOR_GROUPS: OptionGroup[] = [
  {
    group: "Intent",
    options: [
      { id: "Intentional dating", label: "Intentional dating" },
      { id: "Long-term partnership", label: "Long-term partnership" },
      { id: "Marriage-minded", label: "Marriage-minded" },
      { id: "Open to explore", label: "Open to explore" },
      { id: "Friends first", label: "Friends first" },
    ],
  },
  {
    group: "Connection",
    options: [
      { id: "Strong communication", label: "Strong communication" },
      { id: "Emotional safety", label: "Emotional safety" },
      { id: "Chemistry + alignment", label: "Chemistry + alignment" },
      { id: "A real connection (not small talk)", label: "A real connection (not small talk)" },
      { id: "Playful banter", label: "Playful banter" },
    ],
  },
  {
    group: "Relationship style",
    options: [
      { id: "Slow-burn love", label: "Slow-burn love" },
      { id: "Consistency", label: "Consistency" },
      { id: "Affection", label: "Affection" },
      { id: "Quality time", label: "Quality time" },
      { id: "A teammate mindset", label: "A teammate mindset" },
    ],
  },
  {
    group: "Values",
    options: [
      { id: "Respect + kindness", label: "Respect + kindness" },
      { id: "Growth-minded", label: "Growth-minded" },
      { id: "Family-oriented", label: "Family-oriented" },
      { id: "Healthy boundaries", label: "Healthy boundaries" },
    ],
  },
];

export function flattenGroups(groups: OptionGroup[]) {
  return groups.flatMap((g) => g.options.map((o) => ({ ...o, group: g.group })));
}


/** Back-compat exports (some pages import these names) */
export const ABOUT_ME_OPTIONS = ABOUT_ME_GROUPS.flatMap((g) => g.options);
export const LOOKING_FOR_OPTIONS = LOOKING_FOR_GROUPS.flatMap((g) => g.options);
