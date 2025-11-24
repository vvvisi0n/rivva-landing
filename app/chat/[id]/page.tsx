"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LumiOrb from "@/components/LumiOrb";
import ChatMessage from "@/components/ChatMessage";
import LumiChips from "@/components/LumiChips";
import LumiVoiceButton from "@/components/LumiVoiceButton";
import OnboardingGate from "@/components/OnboardingGate";
import CompatibilityMeter from "@/components/CompatibilityMeter";
import LumiMemoryNote from "@/components/LumiMemoryNote";

import { getMatch, getChatSeed, ChatMessage as Msg } from "@/lib/matches";
import { loadProfile } from "@/lib/profile";
import { loadChat, saveChat } from "@/lib/chatStore";

const LUMI_SUGGESTIONS: Record<string, string[]> = {
  maya: [
    "I feel grounded around calm, honest energy. What does that look like for you?",
    "A small thing that makes me feel safe is consistency. What’s yours?",
    "What’s a vibe you want more of in your life lately?",
  ],
  aden: [
    "A good relationship feels like peace + effort on both sides.",
    "I value communication that stays kind even when it’s hard.",
    "What does loyalty mean to you in practice?",
  ],
  zoe: [
    "I’m down for something fun — what’s your perfect spontaneous plan?",
    "Let’s do something simple then chase a vibe after 😄",
    "What’s your ideal mix: chill vs adventure?",
  ],
  samir: [
    "A green flag for me is emotional consistency. What’s yours?",
    "I like when someone is direct but warm.",
    "What’s something you’re excited about right now?",
  ],
};

const LUMI_NUDGES = [
  "That felt real — good energy.",
  "Nice. Clear + warm is your lane.",
  "You’re leading with intention. Keep that.",
  "That line lands. Human, not try-hard.",
  "I like that. It’s you, not a script.",
];

function safeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

function computeCompatibility(matchVibe?: string, userTier?: string) {
  if (!matchVibe || !userTier) return 68;
  if (matchVibe === userTier) return 92;
  return 74;
}

export default function ChatPage() {
  const params = useParams<{ id?: string }>();
  const router = useRouter();
  const id = params?.id;

  const match = useMemo(() => (id ? getMatch(id) : null), [id]);

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [lumiThinking, setLumiThinking] = useState(false);
  const [profileTier, setProfileTier] = useState<string | undefined>(undefined);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Load profile tier on client
  useEffect(() => {
    try {
      const p = loadProfile();
      setProfileTier(p?.quizTier);
    } catch {}
  }, []);

  const compatibility = useMemo(
    () => computeCompatibility(match?.vibe, profileTier),
    [match?.vibe, profileTier]
  );

  // Load chat from storage first, otherwise seed
  useEffect(() => {
    if (!id) return;
    const stored = loadChat(id);
    if (stored.length > 0) {
      setMessages(stored);
    } else {
      const seed = getChatSeed(id);
      setMessages(seed);
      saveChat(id, seed);
    }
  }, [id]);

  // Persist every change to messages
  useEffect(() => {
    if (!id) return;
    saveChat(id, messages);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, id, lumiThinking]);

  if (!match) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex items-center justify-center">
        <p className="text-white/70">Match not found.</p>
      </main>
    );
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || lumiThinking) return;

    const newMsg: Msg = {
      id: safeId(),
      from: "you",
      text: trimmed,
      ts: Date.now(),
    };

    setMessages((m) => [...m, newMsg]);
    setInput("");

    setLumiThinking(true);
    setTimeout(() => {
      const nudge =
        LUMI_NUDGES[Math.floor(Math.random() * LUMI_NUDGES.length)];

      setMessages((m) => [
        ...m,
        {
          id: safeId(),
          from: "lumi",
          text: nudge,
          ts: Date.now(),
        },
      ]);
      setLumiThinking(false);
    }, 850);
  }

  // Safer to key suggestions off match.id, not route id
  const suggestions =
    LUMI_SUGGESTIONS[match.id] ?? [
      "Tell me something you’re genuinely excited about lately.",
      "What does a good connection feel like to you?",
      "What’s a small green flag you notice early?",
    ];

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white flex flex-col">
        <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4">
          <button
            onClick={() => router.push("/matches")}
            className="text-sm text-white/70 hover:text-white"
          >
            ← Back
          </button>

          <div className="text-center flex flex-col items-center">
            <p className="font-semibold">{match.name}</p>
            <p className="text-xs text-white/50">{match.city}</p>
          </div>

          <div className="flex items-center gap-3">
            <CompatibilityMeter score={compatibility} />
            <div className="scale-75">
              <LumiOrb />
            </div>
          </div>
        </header>

        {/* Lumi memory note */}
        <div className="px-6">
          <LumiMemoryNote matchId={match.id} />
        </div>

        <section className="flex-1 px-6 py-5 overflow-y-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} from={msg.from} text={msg.text} />
          ))}

          {lumiThinking && (
            <ChatMessage from="lumi" text="Lumi is thinking…" />
          )}

          <div ref={bottomRef} />
        </section>

        <div className="px-6 pb-3">
          <p className="text-xs text-white/50 mb-2">Lumi suggestions</p>
          <LumiChips
            suggestions={suggestions}
            disabled={lumiThinking}
            onPick={(t) => send(t)}
          />
        </div>

        <footer className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say something real…"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/40"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                send(input);
              }
            }}
          />

          <LumiVoiceButton
            onTranscript={(t) =>
              setInput((prev) => (prev ? prev + " " + t : t))
            }
            disabled={lumiThinking}
            prompt={`Speak your message to ${match.name}.`}
          />

          <button
            onClick={() => send(input)}
            disabled={lumiThinking}
            className={`px-5 py-3 rounded-xl font-semibold transition
              ${
                lumiThinking
                  ? "bg-white/10 text-white/60 cursor-not-allowed"
                  : "bg-white text-black hover:bg-white/90"
              }`}
          >
            Send
          </button>
        </footer>
      </main>
    </OnboardingGate>
  );
}
