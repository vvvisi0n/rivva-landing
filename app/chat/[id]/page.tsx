"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import OnboardingGate from "@/components/OnboardingGate";
import LumiOrb from "@/components/LumiOrb";
import ChatBubble from "@/components/ChatBubble";
import LumiOpeners from "@/components/LumiOpeners";
import LumiVoiceButton from "@/components/LumiVoiceButton";

import { MOCK_MATCHES, type Match } from "@/lib/matches";
import { addMsg, loadChat, type ChatMsg } from "@/lib/chatStore";

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

function prettyTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPage() {
  const params = useParams<{ id?: string }>();
  const router = useRouter();
  const id = params?.id ?? "";

  const match: Match | undefined = useMemo(
    () => MOCK_MATCHES.find((m) => m.id === id),
    [id]
  );

  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!match) return;
    setMsgs(loadChat(match.id));
  }, [match]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  if (!match) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex items-center justify-center">
        <p className="text-white/70">Chat not found.</p>
      </main>
    );
  }

  function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed) return;

    const myMsg: ChatMsg = {
      id: uid(),
      from: "me",
      text: trimmed,
      ts: Date.now(),
    };

    let next = addMsg(match.id, myMsg);
    setMsgs(next);
    setText("");

    // Lumi gentle coach nudge after your 1st / 3rd message
    const myCount = next.filter((m) => m.from === "me").length;
    if (myCount === 1 || myCount === 3) {
      setTimeout(() => {
        const nudge: ChatMsg = {
          id: uid(),
          from: "lumi",
          text:
            myCount === 1
              ? `Nice opener. Keep it light and curious — don’t over-explain yet.`
              : `You’re doing well. Try a follow-up that invites a story.`,
          ts: Date.now(),
        };
        next = addMsg(match.id, nudge);
        setMsgs(next);
      }, 700);
    }
  }

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-4 py-6 flex flex-col">
        {/* Top bar */}
        <header className="max-w-3xl w-full mx-auto flex items-center justify-between py-2">
          <button
            onClick={() => router.back()}
            className="text-sm text-white/70 hover:text-white"
          >
            ← Back
          </button>

          <div className="flex items-center gap-3">
            <Link href={`/matches/${match.id}`} className="text-sm hover:underline">
              {match.name}
            </Link>
            <div className="scale-75">
              <LumiOrb />
            </div>
          </div>
        </header>

        {/* Openers */}
        {msgs.length === 0 && (
          <section className="max-w-3xl w-full mx-auto mt-3">
            <LumiOpeners match={match} onPick={(o) => sendMessage(o)} />
          </section>
        )}

        {/* Messages */}
        <section className="max-w-3xl w-full mx-auto flex-1 mt-4 space-y-3 overflow-y-auto pb-28">
          {msgs.length === 0 && (
            <p className="text-center text-white/40 text-sm mt-10">
              Say hi to {match.name}.
            </p>
          )}

          {msgs.map((m) => (
            <ChatBubble
              key={m.id}
              from={m.from}
              text={m.text}
              time={prettyTime(m.ts)}
            />
          ))}

          <div ref={bottomRef} />
        </section>

        {/* Input */}
        <footer className="fixed bottom-0 left-0 right-0 bg-[#0b0b14]/95 border-t border-white/10">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/40"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage(text);
                }
              }}
            />

            <div className="shrink-0">
              <LumiVoiceButton
                onTranscript={(t) =>
                  setText((prev) => (prev ? prev + " " + t : t))
                }
              />
            </div>

            <button
              onClick={() => sendMessage(text)}
              className="shrink-0 px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
            >
              Send
            </button>
          </div>
        </footer>
      </main>
    </OnboardingGate>
  );
}
