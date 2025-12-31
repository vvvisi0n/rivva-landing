"use client";

import { useState } from "react";
import type { Match } from "@/lib/matches";

function pill(text: string) {
  return (
    <span
      key={text}
      className="text-xs px-2 py-1 rounded-full bg-black/40 border border-white/10 text-white/80"
    >
      {text}
    </span>
  );
}

export default function WhyThisMatchMini({ match }: { match: Match }) {
  const [open, setOpen] = useState(false);

  const tags = match.vibeTags ?? [];
  const score = match.compatibility;

  const reasons: string[] = [];

  if (typeof score === "number") {
    if (score >= 85) reasons.push("Strong emotional alignment");
    else if (score >= 70) reasons.push("Good compatibility signals");
    else if (score >= 55) reasons.push("Promising early fit");
    else reasons.push("Low signal, still possible");
  } else {
    reasons.push("Early vibe read");
  }

  if (tags.length) reasons.push(`Shared vibe: ${tags.slice(0, 2).join(" + ")}`);

  if (match.vibe === "grounded") reasons.push("You both prefer steady pacing");
  if (match.vibe === "spark") reasons.push("High chemistry + curiosity");
  if (match.vibe === "deep") reasons.push("Depth-first connection");

  const trimmed = reasons.slice(0, 3);

  return (
    <div className="mt-5 rounded-3xl bg-black/30 border border-white/10 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Why we matched</p>
          <p className="text-xs text-white/60 mt-1">
            Rivva explains the “why”, not just a number.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            {open ? "Hide" : "Show"}
          </button>

          <a
            href={`/matches/${match.id}#why-match`}
            className="text-xs text-white/60 hover:text-white hover:underline"
          >
            Full →
          </a>
        </div>
      </div>

      {open && (
        <>
          <div className="mt-3 space-y-2">
            {trimmed.map((r) => (
              <p key={r} className="text-sm text-white/80">
                • {r}
              </p>
            ))}
          </div>

          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.slice(0, 5).map((t) => pill(t))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
