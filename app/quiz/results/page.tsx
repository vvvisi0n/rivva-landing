"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import LumiVoiceButton from "@/components/LumiVoiceButton";

type Traits = {
  emotional: number;
  playful: number;
  adventurous: number;
  grounded: number;
};

const PROFILES: Record<
  keyof Traits,
  {
    title: string;
    oneLiner: string;
    description: string;
    strengths: string[];
    growth: string[];
    matchTips: string[];
    voice: string;
  }
> = {
  emotional: {
    title: "The Deep Connector",
    oneLiner: "You fall in love through feeling, safety, and emotional truth.",
    description:
      "You’re tuned into energy, intention, and what’s underneath the words. You want a relationship that feels emotionally secure and real — not performative.",
    strengths: ["Emotionally aware", "Loyal when safe", "Highly intuitive"],
    growth: ["Don’t over-give early", "Ask directly for clarity", "Protect your softness"],
    matchTips: [
      "You pair best with someone communicative and steady.",
      "Avoid inconsistency masked as charm.",
      "Choose people who match your emotional rhythm."
    ],
    voice: "Your emotional depth is your superpower. Rivva will help you find someone who can hold it — not fear it."
  },
  playful: {
    title: "The Spark Builder",
    oneLiner: "You connect through laughter, chemistry, and fun.",
    description:
      "You thrive when dating feels light, flirty, and alive. You want someone who brings curiosity and joy — not heaviness without meaning.",
    strengths: ["Magnetic energy", "Great communicator in highs", "Playful intimacy"],
    growth: ["Don’t ignore red flags for vibes", "Let depth follow the spark"],
    matchTips: [
      "Pick people who can laugh *and* be real.",
      "Avoid emotional flatlines.",
      "Let Rivva steer you toward stable fun."
    ],
    voice: "Your spark is rare. Rivva makes sure it lands in the right hands."
  },
  adventurous: {
    title: "The Voltage Seeker",
    oneLiner: "You want passion, motion, and moments that feel alive.",
    description:
      "You’re built for excitement and bold love. You need someone who’s open to new experiences and not afraid of intensity.",
    strengths: ["Fearless chemistry", "Bold in attraction", "Creates unforgettable moments"],
    growth: ["Watch for chaos disguised as passion", "Choose emotional maturity too"],
    matchTips: [
      "Best matches are grounded but open-minded.",
      "Avoid people addicted to drama.",
      "Pick partners who build thrills *with* trust."
    ],
    voice: "You’re not too much. You just need someone who can match your pace."
  },
  grounded: {
    title: "The Steady Realist",
    oneLiner: "You trust consistency, effort, and real alignment.",
    description:
      "You move with intention. You want loyalty, emotional safety, and someone who shows up — not just talks.",
    strengths: ["Reliable lover", "Clear boundaries", "Builds long-term love"],
    growth: ["Let people surprise you", "Don’t confuse slow with safe"],
    matchTips: [
      "You pair best with emotionally open people.",
      "Avoid flaky charmers.",
      "Rivva will filter for effort + alignment."
    ],
    voice: "Your standards are healthy. Rivva helps you find people who meet them."
  },
};

export default function ResultsPage() {
  const router = useRouter();
  const [profileKey, setProfileKey] = useState<keyof Traits | null>(null);
  const [totals, setTotals] = useState<Traits | null>(null);

  useEffect(() => {
    const profile = sessionStorage.getItem("rivva_quiz_profile") as keyof Traits | null;
    const totalsRaw = sessionStorage.getItem("rivva_quiz_totals");

    if (!profile || !totalsRaw) {
      router.push("/quiz");
      return;
    }

    setProfileKey(profile);
    setTotals(JSON.parse(totalsRaw));
  }, [router]);

  const profile = useMemo(() => {
    if (!profileKey) return null;
    return PROFILES[profileKey];
  }, [profileKey]);

  if (!profile || !totals) return null;

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-6 py-16">
      <div className="mb-10">
        <LumiOrb />
      </div>

      <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-xl">
        <p className="text-sm text-white/60 mb-2">Your Lumi Profile</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{profile.title}</h1>
        <p className="text-lg text-white/80 mb-6">{profile.oneLiner}</p>

        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-6">
          <p className="text-white/80 leading-relaxed">{profile.description}</p>
        </div>

        {/* Trait bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {(
            Object.entries(totals) as [keyof Traits, number][]
          ).map(([k, v]) => (
            <div key={k} className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex justify-between text-sm text-white/70 mb-2">
                <span className="capitalize">{k}</span>
                <span>{v}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
                  style={{ width: `${Math.min(100, v * 12)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Strengths / Growth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <h2 className="font-semibold text-lg mb-3">Your strengths</h2>
            <ul className="list-disc list-inside space-y-1 text-white/80">
              {profile.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <h2 className="font-semibold text-lg mb-3">Your growth edge</h2>
            <ul className="list-disc list-inside space-y-1 text-white/80">
              {profile.growth.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Match Tips */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-8">
          <h2 className="font-semibold text-lg mb-3">How Rivva matches for you</h2>
          <ul className="space-y-2 text-white/80">
            {profile.matchTips.map((m, i) => (
              <li key={i}>• {m}</li>
            ))}
          </ul>
        </div>

        {/* Lumi voice + CTA */}
        <div className="flex items-center gap-3 mb-6">
          <LumiVoiceButton textToSpeak={profile.voice} />
          <span className="text-sm text-white/70">Hear Lumi explain your result</span>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex-1 px-6 py-4 rounded-2xl bg-white text-black font-semibold hover:opacity-90 transition"
          >
            Back to Home
          </button>

          <button
            onClick={() => router.push("/#waitlist")}
            className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-semibold hover:opacity-90 transition"
          >
            Join Rivva Early Access
          </button>
        </div>
      </div>
    </main>
  );
}
