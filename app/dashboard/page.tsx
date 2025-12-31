"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import RivvaOrb from "@/components/RivvaOrb";
import TypingBubble from "@/components/TypingBubble";
import BlueprintCard from "@/components/BlueprintCard";
import ConnectionForecastCard from "@/components/ConnectionForecastCard";
import MatchCard from "@/components/MatchCard";

import { type Match } from "@/lib/matches";

type Profile = {
  name: string;
  age: string;
  gender: string;
  lookingFor: string;
  intent: string;
  ageMin: string;
  ageMax: string;
};

type AnswerOption = { id: string; text: string; score: number };
type Answers = Record<string, AnswerOption>;

const MAX_SCORE = 12; // 4 questions * 3

const TIERS = [
  {
    min: 0,
    max: 5,
    title: "Spark Seeker",
    subtitle: "You lead with vibe, excitement, and instant chemistry.",
    description:
      "You’re drawn to connection that feels alive right away. When someone matches your energy, you open up fast. Your best relationships keep things emotionally engaging and light enough to breathe.",
    strengths: [
      "You spot chemistry quickly",
      "You bring warmth and momentum",
      "You keep dating fun, not forced",
    ],
    watchouts: [
      "You can lose interest if it gets too slow",
      "Sometimes passion hides misalignment",
      "You may ignore red flags early on",
    ],
    lumiTip:
      "Don’t just ask 'Do I feel it?' — ask 'Do I feel safe growing here?'",
  },
  {
    min: 6,
    max: 9,
    title: "Grounded Connector",
    subtitle: "You balance emotion with logic and real-life fit.",
    description:
      "You care about values, consistency, and the *way someone shows up*. You don't need fireworks on day one — you need alignment and stability that builds naturally.",
    strengths: [
      "You prioritize real compatibility",
      "You communicate clearly",
      "You build trust over time",
    ],
    watchouts: [
      "You may overthink early signals",
      "You can be slow to risk vulnerability",
      "Sometimes you settle for 'fine'",
    ],
    lumiTip:
      "Let yourself feel the moment — not everything needs a conclusion on date one.",
  },
  {
    min: 10,
    max: 12,
    title: "Deep Bond Builder",
    subtitle: "You lead with safety, depth, and emotional closeness.",
    description:
      "You want intimacy that feels honest, emotionally intelligent, and secure. You’re naturally tuned into pacing, boundaries, and meaning. When you love, you *really* love.",
    strengths: [
      "You create emotional safety",
      "You value depth over surface",
      "You’re loyal and intentional",
    ],
    watchouts: [
      "You may expect depth too early",
      "You can over-give emotionally",
      "Slow chemistry may feel like rejection",
    ],
    lumiTip:
      "Depth is your gift — just make sure it’s earned, not rushed.",
  },
];

function getTier(score: number) {
  return TIERS.find((t) => score >= t.min && score <= t.max) ?? TIERS[0];
}

function buildForecast(tierTitle: string, intent?: string) {
  const base = {
    headline: "",
    energy: "",
    focus: [] as string[],
    greenFlags: [] as string[],
    redFlags: [] as string[],
    lumiNote: "",
  };

  if (tierTitle === "Spark Seeker") {
    base.headline =
      "You’re magnetic right now — but you need someone who can *stay steady*.";
    base.energy =
      "Your vibe thrives on momentum and chemistry. The right match won’t just excite you — they’ll also ground you when the high fades.";
    base.focus = [
      "Fast emotional resonance",
      "Playful banter + depth balance",
      "Strong personality alignment",
    ];
    base.greenFlags = [
      "Consistent effort without pressure",
      "Curiosity about your mind, not just looks",
      "Matches your pace naturally",
    ];
    base.redFlags = [
      "Love-bombing early",
      "Inconsistent communication",
      "Only surface-level flirting",
    ];
    base.lumiNote =
      "You don’t need a spark that burns out — you need a flame that *holds*.";
  }

  if (tierTitle === "Grounded Connector") {
    base.headline =
      "You’re in a season of clarity — your best matches will feel naturally ‘right’.";
    base.energy =
      "You’re tuned into alignment and emotional maturity. The right person won’t feel like a puzzle — they’ll feel like peace *plus* attraction.";
    base.focus = [
      "Values alignment",
      "Stable communication patterns",
      "Effort that feels mutual",
    ];
    base.greenFlags = [
      "Direct, calm communication",
      "Emotional accountability",
      "Respects your boundaries",
    ];
    base.redFlags = [
      "Hot/cold behavior",
      "Avoiding feelings",
      "Making you carry the connection",
    ];
    base.lumiNote =
      "Keep trusting your internal ‘fit’ radar — it’s sharp.";
  }

  if (tierTitle === "Deep Bond Builder") {
    base.headline =
      "You’re wired for real intimacy — and your next match should *earn* your depth.";
    base.energy =
      "You’re looking for emotional safety + meaning. The right match won’t rush you or drain you — they’ll meet you where you are and grow with you.";
    base.focus = [
      "Emotional safety",
      "Consistency over intensity",
      "Depth + mutual healing",
    ];
    base.greenFlags = [
      "Warm, steady presence",
      "Doesn’t fear emotional talks",
      "Shows care in small ways",
    ];
    base.redFlags = [
      "Emotional unavailability",
      "Overly guarded or dismissive",
      "Pushes intimacy too fast",
    ];
    base.lumiNote =
      "Your depth is rare. Don’t offer it to someone who only wants the surface.";
  }

  if (intent?.toLowerCase().includes("casual")) {
    base.lumiNote +=
      " Since you’re leaning casual, keep it light but still respect your standards.";
  }
  if (intent?.toLowerCase().includes("serious")) {
    base.lumiNote +=
      " Because you want something real, prioritize consistency over charm.";
  }

  return base;
}

const MOCK_MATCHES: Match[] = [
  {
    id: "m1",
    name: "Ari",
    age: 28,
    location: "Brooklyn, NY",
    bio:
      "Warm, playful, and emotionally present. Loves deep talks but keeps things fun.",
    images: ["/matches/ari-1.jpg", "/matches/ari-2.jpg"],
    vibeTags: ["emotionally steady", "fun energy", "intentional"],
    lastMessage: "You up for tacos this week?",
    lastActive: "2h ago",
  },
  {
    id: "m2",
    name: "Sam",
    age: 31,
    location: "Atlanta, GA",
    bio:
      "Low ego, high curiosity. Communicates clearly and makes things feel easy.",
    images: ["/matches/noah-1.jpg"],
    vibeTags: ["great communicator", "secure vibe", "values-led"],
    lastMessage: "That playlist was fire lol",
    lastActive: "5h ago",
  },
  {
    id: "m3",
    name: "Jo",
    age: 27,
    location: "Toronto, CA",
    bio:
      "Quiet confidence. Shows love through consistency and small thoughtful gestures.",
    images: ["/matches/zee-1.jpg", "/matches/zee-2.jpg"],
    vibeTags: ["slow-burn", "loyal", "gentle energy"],
    lastMessage: "Send me your favorite song rn",
    lastActive: "1d ago",
  },
];

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answers | null>(null);

  useEffect(() => {
    const rawProfile = sessionStorage.getItem("rivva_profile");
    if (rawProfile) setProfile(JSON.parse(rawProfile));

    const rawScore = sessionStorage.getItem("rivva_quiz_score");
    if (rawScore) setScore(Number(rawScore));

    const rawAnswers = sessionStorage.getItem("rivva_quiz_answers");
    if (rawAnswers) setAnswers(JSON.parse(rawAnswers));
  }, []);

  const tier = useMemo(() => {
    if (score == null) return null;
    return getTier(score);
  }, [score]);

  const forecast = useMemo(() => {
    if (!tier) return null;
    return buildForecast(tier.title, profile?.intent);
  }, [tier, profile?.intent]);

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-14">
      <div className="mb-6">
        <RivvaOrb />
      </div>

      <div className="w-full max-w-4xl grid gap-6">
        <div className="rounded-3xl bg-white/5 border border-white/10 p-7 shadow-xl">
          <h1 className="text-3xl font-bold mb-2">Lumi Dashboard</h1>

          {!profile ? (
            <TypingBubble label="Loading your vibe profile…" />
          ) : (
            <p className="text-white/80">
              Welcome back,{" "}
              <span className="font-semibold">{profile.name}</span>. Here’s what
              I’m learning about your relationship energy.
            </p>
          )}
        </div>

        {score == null || !tier ? (
          <div className="rounded-3xl bg-white/5 border border-white/10 p-7 shadow-xl">
            <h2 className="text-2xl font-bold mb-2">
              Your Compatibility Blueprint
            </h2>
            <p className="text-white/75 mb-5">
              I don’t have your quiz vibe yet. Take the Lumi Compatibility Quiz
              so I can generate your blueprint.
            </p>

            <Link
              href="/quiz"
              className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-semibold hover:opacity-90 transition active:scale-[0.98]"
            >
              Take the Quiz
            </Link>
          </div>
        ) : (
          <BlueprintCard tier={tier} score={score} maxScore={MAX_SCORE} />
        )}

        {forecast && <ConnectionForecastCard forecast={forecast} />}

        {tier && (
          <section className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-7 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-bold">
                Your first Rivva matches
              </h3>
              <span className="text-xs text-white/50">
                Mock data (Phase 3 = real)
              </span>
            </div>

            <p className="text-white/70 mt-2 mb-5">
              Based on your blueprint, here are the kinds of people you’ll click
              with.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_MATCHES.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </section>
        )}

        {answers && (
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-3">
              Quick vibe snapshot
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white/80">
              {Object.entries(answers).map(([qid, opt]) => (
                <div
                  key={qid}
                  className="rounded-2xl bg-white/5 border border-white/10 p-4"
                >
                  <p className="text-xs text-white/50 mb-1">
                    {qid.toUpperCase()}
                  </p>
                  <p>{opt.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <Link
                href="/quiz"
                className="px-5 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition active:scale-[0.98]"
              >
                Retake Quiz
              </Link>

              <Link
                href="/"
                className="px-5 py-2 rounded-xl bg-white/10 border border-white/10 text-sm hover:bg-white/15 transition active:scale-[0.98]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}

        <div className="rounded-3xl bg-gradient-to-r from-purple-500/10 to-cyan-400/5 border border-white/10 p-6">
          <p className="text-white/80 text-sm">
            Next up: turn these mock matches into real swipable profiles with
            filters + chat.
          </p>
        </div>
      </div>
    </main>
  );
}
