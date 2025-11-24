"use client";

import Link from "next/link";
import { MATCHES, getChatSeed } from "@/lib/matches";

export default function InboxPage() {
  return (
    <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-14">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Inbox</h1>
          <p className="text-white/70 mt-1">
            Your active conversations.
          </p>
        </header>

        <div className="space-y-3">
          {MATCHES.map((m) => {
            const seed = getChatSeed(m.id);
            const last = seed[seed.length - 1];
            return (
              <Link
                key={m.id}
                href={`/chat/${m.id}`}
                className="block rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-sm text-white/60">
                      {last?.text ?? "Start a conversation"}
                    </p>
                  </div>
                  <p className="text-xs text-white/50">{m.lastActive}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
