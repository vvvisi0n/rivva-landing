"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import OnboardingGate from "@/components/OnboardingGate";
import RivvaOrb from "@/components/RivvaOrb";

import { getBlockedIds, unblockUser, clearBlocked } from "@/lib/safety/blocks";
import { MOCK_MATCHES } from "@/lib/matches";

export default function BlockedPage() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setIds(getBlockedIds());
    sync();

    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const blockedProfiles = useMemo(() => {
    const map = new Map(MOCK_MATCHES.map((m) => [m.id, m]));
    return ids.map((id) => map.get(id)).filter(Boolean);
  }, [ids]);

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-12">
        <section className="max-w-3xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <Link href="/settings/privacy-safety" className="text-sm text-white/70 hover:text-white">
              ← Back to Privacy & Safety
            </Link>
            <div className="scale-75 rivva-orb">
              <RivvaOrb />
            </div>
          </header>

          <h1 className="text-3xl font-bold mb-2">Blocked users</h1>
          <p className="text-white/60 text-sm mb-8">
            Blocking is private protection. They won’t know, and it doesn’t auto-punish them globally.
          </p>

          {ids.length === 0 ? (
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-xl">
              <p className="text-white/80">No one is blocked yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {blockedProfiles.map((m) => (
                <div
                  key={m!.id}
                  className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold">{m!.name}</p>
                    <p className="text-xs text-white/60 mt-1">
                      {m!.location ? m!.location : "—"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => unblockUser(m!.id)}
                    className="px-4 py-2 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
                  >
                    Unblock
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => clearBlocked()}
                className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/10 text-sm font-semibold hover:bg-white/15 transition"
              >
                Clear all (dev)
              </button>
            </div>
          )}
        </section>
      </main>
    </OnboardingGate>
  );
}
