"use client";

import Link from "next/link";
import LumiOrb from "@/components/LumiOrb";
import { MATCHES } from "@/lib/matches";

export default function InboxPage() {
  return (
    <main className="min-h-screen bg-[#0b0b14] text-white px-5 py-8">
      <header className="max-w-3xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <LumiOrb />
      </header>

      <section className="max-w-3xl mx-auto space-y-3">
        {MATCHES.map((m) => (
          <Link
            key={m.id}
            href={`/chat/${m.id}`}
            className="block rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-white/60">
                  {m.lastMessage ?? "Start a conversation"}
                </p>
              </div>
              <p className="text-xs text-white/50">{m.lastActive ?? ""}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}