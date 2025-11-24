"use client";

import Link from "next/link";
import LumiVoiceButton from "@/components/LumiVoiceButton";

export type MatchPrompt = { q: string; a: string };

export type MatchProfile = {
  id: string;
  name: string;
  age: number;
  city: string;
  distanceMiles?: number;
  photos: string[];
  headline: string;
  vibeTags: string[];
  about: string;
  prompts?: MatchPrompt[];
  compatibility?: number; // 0–100
};

export default function MatchFeedCard({
  profile,
}: {
  profile: MatchProfile;
}) {
  const {
    id,
    name,
    age,
    city,
    distanceMiles,
    photos,
    headline,
    vibeTags,
    about,
    prompts = [],
    compatibility = 0,
  } = profile;

  const topPhoto = photos?.[0];

  const lumiLine = [
    `You and ${name} feel like a strong match.`,
    headline,
    `Your compatibility score is ${compatibility} percent.`,
    `If you want, I can help you start the conversation.`,
  ].join(" ");

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 shadow-xl overflow-hidden hover:bg-white/8 transition">
      {/* Photo */}
      <div className="relative aspect-[4/3] bg-black/40">
        {topPhoto ? (
          // If you don’t have real images yet, this’ll just show a dark block.
          // Replace /mock/* with real uploads later.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={topPhoto}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">
            No photo yet
          </div>
        )}

        {/* Compatibility badge */}
        {compatibility > 0 && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-semibold">
            {compatibility}% match
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Name row */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold">
              {name}, {age}
            </h3>
            <p className="text-white/60 text-sm">
              {city}
              {distanceMiles != null && (
                <span className="text-white/40"> • {distanceMiles} mi</span>
              )}
            </p>
          </div>

          {/* Lumi voice (natural) */}
          <LumiVoiceButton text={lumiLine} />
        </div>

        {/* Headline */}
        <p className="text-white/80 mt-3 font-medium">{headline}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {vibeTags.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* About */}
        <p className="text-white/70 text-sm leading-relaxed mt-4 line-clamp-4">
          {about}
        </p>

        {/* Prompts */}
        {prompts.length > 0 && (
          <div className="mt-4 space-y-3">
            {prompts.slice(0, 2).map((p, i) => (
              <div
                key={i}
                className="rounded-2xl bg-black/30 border border-white/10 p-4"
              >
                <p className="text-xs text-white/50 mb-1">{p.q}</p>
                <p className="text-sm text-white/85">{p.a}</p>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex gap-2">
          <Link
            href={`/matches/${id}`}
            className="flex-1 text-center px-4 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            View profile
          </Link>

          <Link
            href={`/inbox/${id}`}
            className="flex-1 text-center px-4 py-3 rounded-xl bg-white/10 border border-white/10 font-semibold hover:bg-white/15 transition"
          >
            Message
          </Link>
        </div>
      </div>
    </div>
  );
}