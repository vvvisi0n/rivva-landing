"use client";

import { useMemo, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { Match } from "@/lib/matches";

type Props = {
  initialMatches: Match[];
  onLike?: (m: Match) => void;
  onPass?: (m: Match) => void;
};

const SWIPE_THRESHOLD = 120;

export default function DiscoverDeck({ initialMatches, onLike, onPass }: Props) {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<Match[]>([]);
  const [passed, setPassed] = useState<Match[]>([]);

  const matches = useMemo(() => initialMatches, [initialMatches]);
  const active = matches[index];
  const next = matches[index + 1];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  function advance() {
    x.set(0);
    setIndex((i) => i + 1);
  }

  function likeCurrent() {
    if (!active) return;
    setLiked((prev) => [...prev, active]);
    onLike?.(active);
    advance();
  }

  function passCurrent() {
    if (!active) return;
    setPassed((prev) => [...prev, active]);
    onPass?.(active);
    advance();
  }

  if (!active) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-semibold">You’re all caught up 🎉</h2>
        <p className="mt-2 text-neutral-500">
          Liked: {liked.length} • Passed: {passed.length}
        </p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto mt-6 h-[72vh] w-full max-w-md">
      {/* Next card (stack) */}
      {next && (
        <div className="absolute inset-0 scale-[0.97] translate-y-2 rounded-3xl bg-white/70 shadow-sm ring-1 ring-black/5" />
      )}

      {/* Active swipe card */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5"
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragEnd={(_, info) => {
          if (info.offset.x > SWIPE_THRESHOLD) likeCurrent();
          else if (info.offset.x < -SWIPE_THRESHOLD) passCurrent();
          else x.set(0);
        }}
      >
        <div className="relative h-full w-full">
          <img
            src={active.images?.[0] ?? "/placeholder.jpg"}
            alt={active.name}
            className="h-full w-full object-cover"
          />

          {/* Gradient + info */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 text-white">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-2xl font-semibold">
                  {active.name}
                  {active.age ? `, ${active.age}` : ""}
                </h3>
                <p className="mt-1 text-sm opacity-90">
                  {active.location ?? "Somewhere beautiful"}
                </p>
              </div>
            </div>

            {!!active.vibeTags?.length && (
              <div className="mt-3 flex flex-wrap gap-2">
                {active.vibeTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Buttons */}
      <div className="absolute inset-x-0 -bottom-14 flex items-center justify-center gap-6">
        <button
          onClick={passCurrent}
          className="h-14 w-14 rounded-full bg-white shadow-md ring-1 ring-black/5 hover:scale-105 active:scale-95"
          aria-label="Pass"
        >
          ✕
        </button>

        <button
          onClick={likeCurrent}
          className="h-16 w-16 rounded-full bg-white shadow-md ring-1 ring-black/5 hover:scale-105 active:scale-95"
          aria-label="Like"
        >
          ❤
        </button>
      </div>
    </div>
  );
}
