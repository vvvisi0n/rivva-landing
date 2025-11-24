"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import LumiOrb from "@/components/LumiOrb";
import OnboardingGate from "@/components/OnboardingGate";
import CoachNudge from "@/components/CoachNudge";

import { MOCK_MATCHES, type Match } from "@/lib/matches";
import { isLiked, toggleLike } from "@/lib/likes";

export default function MatchProfilePage() {
  const params = useParams<{ id?: string }>();
  const router = useRouter();
  const id = params?.id ?? "";

  const match: Match | undefined = useMemo(
    () => MOCK_MATCHES.find((m) => m.id === id),
    [id]
  );

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (match) setLiked(isLiked(match.id));
  }, [match]);

  if (!match) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex items-center justify-center">
        <p className="text-white/70">Match not found.</p>
      </main>
    );
  }

  function onLike() {
    setLiked(toggleLike(match.id));
  }

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-3xl mx-auto">
          {/* header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.back()}
              className="text-sm text-white/70 hover:text-white"
            >
              ← Back
            </button>
            <div className="scale-75">
              <LumiOrb />
            </div>
          </div>

          {/* top card */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
            <div className="flex items-start gap-5">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-purple-500/40 to-cyan-400/40 border border-white/10" />

              <div className="flex-1">
                <h1 className="text-2xl font-bold">
                  {match.name}, {match.age}
                </h1>
                <p className="text-white/60 text-sm">{match.city}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {match.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full bg-black/40 border border-white/10 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={onLike}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition
                  ${
                    liked
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                  }`}
              >
                {liked ? "Liked ✓" : "Like"}
              </button>
            </div>

            <p className="text-white/80 leading-relaxed mt-5">
              {match.bio}
            </p>
          </div>

          {/* nudge */}
          <div className="mt-5">
            <CoachNudge match={match} />
          </div>

          {/* prompts */}
          <div className="mt-6 grid grid-cols-1 gap-4">
            {match.prompts.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 p-5"
              >
                <p className="text-sm text-white/60 mb-2">{p.q}</p>
                <p className="text-white/90">{p.a}</p>
              </div>
            ))}
          </div>

          {/* actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/chat/${match.id}`}
              className="flex-1 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition text-center"
            >
              Start chat
            </Link>

            <Link
              href="/matches"
              className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/15 font-semibold hover:bg-white/15 transition text-center"
            >
              More matches
            </Link>
          </div>
        </section>
      </main>
    </OnboardingGate>
  );
}
