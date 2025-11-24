"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import LumiOrb from "@/components/LumiOrb";
import TypingBubble from "@/components/TypingBubble";
import LumiVoiceButton from "@/components/LumiVoiceButton";
import ChatMessage from "@/components/ChatMessage";
import SuggestedOpeners from "@/components/SuggestedOpeners";

import { FEED } from "@/lib/matches";
import { ChatMsg, generateReply, lumiNudge } from "@/lib/chatSim";

const CHAT_KEY_PREFIX = "rivva_chat_";

function safeId() {
  // crypto.randomUUID is great, but guard for older environments
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

export default function ChatPage() {
  const params = useParams<{ id?: string }>();
  const id = params?.id;

  const match = useMemo(() => FEED.find((m) => m.id === id), [id]);

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [isMatchTyping, setIsMatchTyping] = useState(false);
  const [lumiHint, setLumiHint] = useState<string>("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // load chat
  useEffect(() => {
    if (!match || !id) return;
    const key = CHAT_KEY_PREFIX + id;

    try {
      const cached = JSON.parse(sessionStorage.getItem(key) || "[]") as ChatMsg[];
      if (cached.length) {
        setMessages(cached);
      } else {
        const starter: ChatMsg[] = [
          {
            id: "lumi-hello",
            role: "lumi",
            text: `I’m here with you. Keep it light, curious, and real.`,
            ts: Date.now(),
          },
        ];
        setMessages(starter);
        sessionStorage.setItem(key, JSON.stringify(starter));
      }
    } catch {
      setMessages([]);
    }

    setLumiHint(lumiNudge(match.name));
  }, [id, match]);

  // persist chat + scroll
  useEffect(() => {
    if (!id) return;
    const key = CHAT_KEY_PREFIX + id;
    try {
      sessionStorage.setItem(key, JSON.stringify(messages));
    } catch {}
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, id]);

  function send(text: string) {
    const clean = text.trim();
    if (!clean || isMatchTyping || !match || !id) return;

    const userMsg: ChatMsg = {
      id: safeId(),
      role: "you",
      text: clean,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // simulate match typing + reply
    setIsMatchTyping(true);

    setTimeout(() => {
      const replyText = generateReply(userMsg.text);

      const matchMsg: ChatMsg = {
        id: safeId(),
        role: "match",
        text: replyText,
        ts: Date.now(),
      };

      setMessages((prev) => [...prev, matchMsg]);
      setIsMatchTyping(false);
      setLumiHint(lumiNudge(match.name));
    }, 1100);
  }

  if (!match) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col items-center justify-center p-10">
        <p className="text-white/70">Match not found.</p>
        <Link href="/matches" className="mt-4 text-cyan-200 underline">
          Back to matches
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#0b0b14]/90 backdrop-blur border-b border-white/10">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="scale-75 origin-left">
              <LumiOrb />
            </div>
            <div>
              <h1 className="font-semibold text-lg">
                {match.name}, {match.age}
              </h1>
              <p className="text-xs text-white/50">{match.city}</p>
            </div>
          </div>

          <Link
            href={`/matches/${match.id}`}
            className="text-sm text-white/70 hover:text-white"
          >
            View profile →
          </Link>
        </div>
      </header>

      {/* Messages */}
      <section className="flex-1 max-w-4xl w-full mx-auto px-5 py-6">
        {messages.map((m) => (
          <ChatMessage key={m.id} msg={m} />
        ))}

        {isMatchTyping && (
          <TypingBubble label={`${match.name} is typing…`} className="mt-2" />
        )}

        <div ref={bottomRef} />
      </section>

      {/* Composer */}
      <footer className="border-t border-white/10 bg-[#0b0b14]">
        <div className="max-w-4xl mx-auto px-5 py-4 space-y-3">
          {/* Lumi hint */}
          {lumiHint && (
            <div className="rounded-2xl bg-purple-500/10 border border-purple-400/20 p-3 text-sm text-white/85">
              <span className="text-purple-200 font-semibold">Lumi tip:</span>{" "}
              {lumiHint}
            </div>
          )}

          {/* Suggested openers */}
          <SuggestedOpeners
            disabled={isMatchTyping}
            onPick={(t) => send(t)}
          />

          {/* Input row */}
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${match.name}...`}
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500/60"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
            />

            {/* Voice button */}
            <LumiVoiceButton
              onTranscript={(t) =>
                setInput((prev) => (prev ? prev + " " + t : t))
              }
              disabled={isMatchTyping}
              prompt={`Speak your message to ${match.name}. Keep it natural, like you're texting someone you actually like.`}
            />

            <button
              onClick={() => send(input)}
              disabled={isMatchTyping}
              className={`px-5 py-3 rounded-2xl font-semibold transition
                ${
                  isMatchTyping
                    ? "bg-white/10 text-white/50 cursor-not-allowed"
                    : "bg-white text-black hover:bg-white/90"
                }`}
            >
              Send
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
