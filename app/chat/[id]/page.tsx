"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import LumiVoiceButton from "@/components/LumiVoiceButton";
import { FEED, type Match } from "@/lib/matches";

type ChatMsg = {
  id: string;
  from: "lumi" | "you";
  text: string;
  ts: number;
};

function makeId() {
  return Math.random().toString(36).slice(2);
}

export default function ChatPage() {
  const params = useParams<{ id: string }>();
  const matchId = params?.id;

  const match = useMemo<Match | undefined>(
    () => FEED.find((m) => m.id === matchId),
    [matchId]
  );

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Natural Lumi opener
  useEffect(() => {
    if (!match) return;

    const opener = [
      `Okay, I’m seeing a solid vibe between you and ${match.name}.`,
      `They feel like someone who matches your emotional pace — calm, but still exciting.`,
      `Want me to break down why this match looks promising, or would you rather just jump in and say hi?`,
    ];

    setIsTyping(true);
    const t1 = setTimeout(() => {
      setMessages([
        {
          id: makeId(),
          from: "lumi",
          text: opener[0],
          ts: Date.now(),
        },
      ]);
    }, 700);

    const t2 = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          from: "lumi",
          text: opener[1],
          ts: Date.now(),
        },
      ]);
    }, 1500);

    const t3 = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          from: "lumi",
          text: opener[2],
          ts: Date.now(),
        },
      ]);
      setIsTyping(false);
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [match]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;

    const youMsg: ChatMsg = {
      id: makeId(),
      from: "you",
      text: val,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, youMsg]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      const reply: ChatMsg = {
        id: makeId(),
        from: "lumi",
        text:
          val.toLowerCase().includes("why") || val.toLowerCase().includes("break down")
            ? `Totally. You two align most on communication tone and relationship pacing. ${match?.name} likes consistency, and you tend to value emotional clarity — that’s a strong combo.`
            : `Nice. If you want, I can help you craft a first message that fits your vibe.`,
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1100);
  }

  if (!match) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center justify-center px-6 py-16">
        <div className="mb-6">
          <LumiOrb />
        </div>
        <div className="w-full max-w-xl rounded-3xl bg-white/5 border border-white/10 p-8 text-center shadow-xl">
          <h1 className="text-2xl font-bold mb-2">Chat not found</h1>
          <p className="text-white/70 mb-6">
            This match may have moved or expired.
          </p>
          <Link
            href="/matches"
            className="inline-flex px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Back to Matches
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center px-4 py-8">
      <header className="w-full max-w-3xl flex items-center justify-between gap-3 mb-4">
        <Link href="/matches" className="text-sm text-white/70 hover:text-white transition">
          ← Matches
        </Link>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-white/50">chatting with</p>
            <p className="font-semibold">{match.name}</p>
          </div>
          <div className="scale-75 origin-right">
            <LumiOrb />
          </div>
        </div>

        <LumiVoiceButton />
      </header>

      <section className="w-full max-w-3xl rounded-3xl bg-white/5 border border-white/10 shadow-xl p-5 md:p-7 flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto pr-1 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border
                  ${
                    m.from === "you"
                      ? "bg-white text-black border-white/10"
                      : "bg-white/10 text-white border-white/10"
                  }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <TypingBubble label="Lumi is typing…" />
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={sendMessage} className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Say hi to ${match.name} (or ask Lumi for help)…`}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Send
          </button>
        </form>

        <p className="text-[11px] text-white/40 mt-2">
          Phase 4 will add real-time messaging + match replies.
        </p>
      </section>
    </main>
  );
}
