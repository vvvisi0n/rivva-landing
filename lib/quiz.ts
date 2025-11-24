export type QuizTierKey = "spark" | "anchor" | "empath" | "magnetic";

export type QuizTier = {
  key: QuizTierKey;
  name: string;
  range: [number, number];
  oneLiner: string;
  recap: string[];
  strengths: string[];
  growth: string[];
  matchesWith: string[];
};

export const TIERS: QuizTier[] = [
  {
    key: "spark",
    name: "The Spark Seeker",
    range: [0, 4],
    oneLiner: "You lead with curiosity and chemistry — you want to feel it fast.",
    recap: [
      "You’re drawn to energy and excitement first.",
      "You like momentum and lightness early on.",
      "When it’s right, it feels easy and fun."
    ],
    strengths: [
      "Playful, open, emotionally present",
      "Great at creating a vibe",
      "Brings adventure into connection"
    ],
    growth: [
      "Pause before deciding too quickly",
      "Ask for clarity when feelings spike",
      "Notice consistency vs intensity"
    ],
    matchesWith: [
      "Grounded communicators",
      "Emotionally steady partners",
      "People who enjoy spontaneity"
    ]
  },
  {
    key: "anchor",
    name: "The Steady Builder",
    range: [5, 7],
    oneLiner: "You value safety, loyalty, and slow-burn connection.",
    recap: [
      "You trust emotional steadiness over flash.",
      "You want alignment in values and pace.",
      "Consistency makes you feel secure."
    ],
    strengths: [
      "Reliable, thoughtful, emotionally safe",
      "Builds trust naturally",
      "Finds depth in the everyday"
    ],
    growth: [
      "Let yourself be surprised sometimes",
      "Say what you want earlier",
      "Don’t over-carry the relationship alone"
    ],
    matchesWith: [
      "Intentional partners",
      "Clear communicators",
      "People who respect pace"
    ]
  },
  {
    key: "empath",
    name: "The Emotional Intuitive",
    range: [8, 10],
    oneLiner: "You’re tuned in — you read energy and emotional patterns fast.",
    recap: [
      "You feel under the surface quickly.",
      "You care about real understanding.",
      "You’re at your best with emotional honesty."
    ],
    strengths: [
      "Deep empathy, strong intuition",
      "Creates emotional safety",
      "Notices what others miss"
    ],
    growth: [
      "Don’t over-explain to be understood",
      "Ask for what you need directly",
      "Let people earn your depth"
    ],
    matchesWith: [
      "Emotionally open partners",
      "Growth-minded people",
      "Those who value honesty"
    ]
  },
  {
    key: "magnetic",
    name: "The Magnet",
    range: [11, 12],
    oneLiner: "You blend depth + spark — people feel seen and lit up around you.",
    recap: [
      "You crave emotional closeness and excitement.",
      "You want both safety and passion.",
      "You bring presence that pulls people in."
    ],
    strengths: [
      "Balanced heart + heat",
      "Strong communicator",
      "Naturally inspiring partner"
    ],
    growth: [
      "Make sure they match your effort",
      "Protect your energy",
      "Don’t settle for half-available love"
    ],
    matchesWith: [
      "High EQ partners",
      "People who meet you fully",
      "Those who love both fun and depth"
    ]
  }
];

export function getTier(score: number): QuizTier {
  const s = Math.max(0, Math.min(score, 12));
  return TIERS.find(t => s >= t.range[0] && s <= t.range[1]) ?? TIERS[0];
}

export function buildShareText(tier: QuizTier) {
  return [
    `My Rivva vibe is: ${tier.name}`,
    tier.oneLiner,
    "",
    "Take the Lumi Compatibility Quiz:",
    "getrivva.com/quiz"
  ].join("\n");
}
