"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import OnboardingGate from "@/components/OnboardingGate";
import RivvaOrb from "@/components/RivvaOrb";
import { MOCK_MATCHES } from "@/lib/matches";

type ThreadMeta = {
  id: string;
  matchId: string;
  name: string;
  lastMessage?: string;
  lastActive?: string;
  avatar?: string;
  unread?: boolean;
};

function loadThreads(fallback: ThreadMeta[]) {
  try {
    const raw = localStorage.getItem("rivva_inbox_threads");
    if (raw) return JSON.parse(raw) as ThreadMeta[];
  } catch {}
  return fallback;
}

export default function InboxPage() {
  const fallback = useMemo<ThreadMeta[]>(() => {
    return MOCK_MATCHES.map((m) => ({
      id: `t_${m.id}`,
      matchId: m.id,
      name: m.name,
      lastMessage: "",
      lastActive: "",
      avatar: m.images?.[0],
      unread: false,
    }));
  }, []);

  const [threads, setThreads] = useState<ThreadMeta[]>(fallback);

  useEffect(() => {
    function refresh() {
      setThreads(loadThreads(fallback));
    }

    refresh();

    // other tabs
    const onStorage = () => refresh();
    window.addEventListener("storage", onStorage);

    // same tab (navigation back, etc.)
    const onFocus = () => refresh();
    window.addEventListener("focus", onFocus);

    // light polling (keeps it feeling live during dev)
    const t = setInterval(refresh, 800);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
      clearInterval(t);
    };
  }, [fallback]);

  return (
    <OnboardingGate>
      <main className="min-h-screen text-white px-6 py-12">
        <section className="max-w-3xl mx-auto">

          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Inbox</h1>
              <p className="text-white/60 text-sm mt-1">Your chats (local only for now).</p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/discover" className="text-sm text-white/70 hover:text-white">
                Discover
              </Link>
              <div className="scale-75 rivva-orb">
                <RivvaOrb />
              </div>
            </div>
          </header>

          <div className="space-y-3">
            {threads.map((t) => (
              <Link
                key={t.id}
                href={`/chat/${t.matchId}`}
                className="block rounded-3xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/10 overflow-hidden shrink-0">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                    ) : null}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold truncate">{t.name}</p>
                      <p className="text-xs text-white/50 shrink-0">{t.lastActive ?? ""}</p>
                    </div>

                    <p className="text-sm text-white/60 truncate mt-1">
                      {t.lastMessage ? t.lastMessage : "Say hi…"}
                    </p>
                  </div>

                  {t.unread ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-400/30">
                      New
                    </span>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </OnboardingGate>
  );
}
