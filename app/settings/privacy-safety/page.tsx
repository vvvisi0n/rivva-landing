"use client";

function getBlockId(b: any): string {
  return String(b?.matchId ?? b?.id ?? b?.blockedId ?? "");
}
function getBlockTs(b: any): number {
  const v = b?.createdAt ?? b?.ts ?? b?.timestamp ?? b?.date;
  if (!v) return Date.now();
  if (typeof v === "number") return v;
  const t = Date.parse(String(v));
  return Number.isFinite(t) ? t : Date.now();
}


import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import OnboardingGate from "@/components/OnboardingGate";
import RivvaOrb from "@/components/RivvaOrb";

import { MOCK_MATCHES } from "@/lib/matches";
import { getBlockedList, unblockUser, type BlockRecord } from "@/lib/safety/blocks";

export default function PrivacySafetySettingsPage() {
  const [blocked, setBlocked] = useState<BlockRecord[]>([]);

  useEffect(() => {
    const load = () => setBlocked(getBlockedList());
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const matchNameById = useMemo(() => {
    const map = new Map<string, string>();
    for (const m of MOCK_MATCHES) map.set(m.id, m.name);
    return map;
  }, []);

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-3xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <Link href="/settings" className="text-sm text-white/70 hover:text-white">
              ← Back to Settings
            </Link>
            <div className="scale-75 rivva-orb">
              <RivvaOrb />
            </div>
          </header>

          <h1 className="text-3xl font-bold mb-2">Privacy & Safety</h1>
          <p className="text-white/60 text-sm mb-8">
            Blocking is private and immediate.
          </p>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
            <h2 className="text-lg font-semibold">Blocked users</h2>
            <p className="text-sm text-white/60 mt-1">
              Blocked profiles are removed from Discover, Matches, Liked, and Inbox.
            </p>

            {blocked.length === 0 ? (
              <div className="mt-5 rounded-2xl bg-black/30 border border-white/10 p-4">
                <p className="text-sm text-white/80 font-semibold">No blocked users</p>
                <p className="text-xs text-white/60 mt-1">
                  If you block someone, they’ll appear here so you can review or unblock.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {blocked.map((b) => {
                  const name = matchNameById.get(getBlockId(b)) ?? getBlockId(b);
                  const dt = new Date(getBlockTs(b));

                  return (
                    <div
                      key={`${getBlockId(b)}-${b.createdAt}`}
                      className="rounded-2xl bg-black/30 border border-white/10 p-4 flex items-start justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{name}</p>
                        <p className="text-xs text-white/60 mt-1">
                          Reason: <span className="text-white/80">{b.reason}</span>
                        </p>
                        {b.notes && (
                          <p className="text-xs text-white/60 mt-1">
                            Notes: <span className="text-white/80">{b.notes}</span>
                          </p>
                        )}
                        <p className="text-[11px] text-white/40 mt-2">
                          Blocked on {dt.toLocaleString()}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          unblockUser(getBlockId(b));
                          setBlocked(getBlockedList());
                        }}
                        className="shrink-0 px-3 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition"
                      >
                        Unblock
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-6 rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
            <h2 className="text-lg font-semibold">Reporting (anti-abuse stance)</h2>
            <p className="text-sm text-white/60 mt-1">
              Reporting blocks someone for you immediately. Platform-wide action requires multiple unique reports + signals.
            </p>
          </div>
        </section>
      </main>
    </OnboardingGate>
  );
}
