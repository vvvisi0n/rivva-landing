"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ChatSafetyButton from "@/components/ChatSafetyButton";

import OnboardingGate from "@/components/OnboardingGate";
import RivvaOrb from "@/components/RivvaOrb";
import SafeSendBar from "@/components/SafeSendBar";

import { MOCK_MATCHES, type Match } from "@/lib/matches";
import { isBlocked, blockUser, reportUser, type ReportReason } from "@/lib/safety";

type Msg = {
  id: string;
  from: "me" | "them";
  text: string;
  ts: number;
};

function storageKey(matchId: string) {
  return `rivva_chat_${matchId}`;
}

const REPORT_OPTIONS: { value: ReportReason; label: string }[] = [
  { value: "harassment", label: "Harassment or bullying" },
  { value: "hate_speech", label: "Hate speech or discrimination" },
  { value: "sexual_harassment", label: "Sexual harassment" },
  { value: "threatening", label: "Threatening or intimidating behavior" },
  { value: "stalking", label: "Stalking or obsessive behavior" },
  { value: "pressure_personal_info", label: "Pressuring for personal information" },
  { value: "unwanted_sexual_messages", label: "Unwanted sexual messages" },
  { value: "explicit_images", label: "Explicit images without consent" },
  { value: "inappropriate_language", label: "Inappropriate language" },
  { value: "spam", label: "Spam or repeated unwanted messages" },
  { value: "scam", label: "Scam / asking for money or off-app" },
  { value: "other", label: "Other" },
];

export default function ChatPage() {
  const params = useParams<{ id?: string }>();
  const router = useRouter();
  const id = params?.id ?? "";

  const match: Match | undefined = useMemo(
    () => MOCK_MATCHES.find((m) => m.id === id),
    [id]
  );

  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);

  const contextText = msgs
    .slice(-10)
    .map((m) => `${m.from}: ${m.text}`)
    .join("\n");

  const [blocked, setBlocked] = useState(false);

  const [reportReason, setReportReason] = useState<ReportReason>("harassment");
  const [reportNote, setReportNote] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!id) return;
    setBlocked(isBlocked(id));

    try {
      const raw = localStorage.getItem(storageKey(id));
      if (raw) {
        setMsgs(JSON.parse(raw));
        return;
      }
    } catch {}

    // seed
    setMsgs([
      {
        id: `seed_${Date.now()}`,
        from: "them",
        text: "Hey :) what’s a small thing that makes your day better?",
        ts: Date.now() - 1000 * 60 * 6,
      },
    ]);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    try {
      localStorage.setItem(storageKey(id), JSON.stringify(msgs));
    } catch {}
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, id]);

  if (!match) {
    return (
      <main className="min-h-screen bg-[#0b0b14] text-white flex items-center justify-center">
        <p className="text-white/70">Chat not found.</p>
      </main>
    );
  }

  function send() {
    const text = draft.trim();
    if (!text) return;

    setMsgs((prev) => [
      ...prev,
      { id: `m_${Date.now()}`, from: "me", text, ts: Date.now() },
    ]);
    setDraft("");

    // mock reply
    setTimeout(() => {
      setMsgs((prev) => [
        ...prev,
        {
          id: `t_${Date.now()}`,
          from: "them",
          text: "I like that. Tell me more 👀",
          ts: Date.now(),
        },
      ]);
    }, 650);
  }

  function doBlock() {
    if (!match) return;
    blockUser(match.id);
    setBlocked(true);
    router.replace("/inbox");
  }

  function doReport() {
    if (!match) return;
    reportUser(match.id, reportReason, reportNote.trim() ? { note: reportNote.trim() } : undefined);
    setBlocked(true);
    router.replace("/inbox");
  }

  return (
    <OnboardingGate>
      <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-10">
        <section className="max-w-3xl mx-auto">
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-sm text-white/70 hover:text-white"
              >
                ← Back
              </button>

              <Link
                href={`/matches/${match.id}`}
                className="text-sm text-white/70 hover:text-white hover:underline"
              >
                {match.name}
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <ChatSafetyButton matchId={match?.id ?? ""} matchName={match?.name ?? "User"} contextText={contextText} />

              <div className="scale-75 rivva-orb">
                <RivvaOrb />
              </div>
            </div>
          </header>

          {blocked ? (
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
              <p className="text-sm font-semibold">This chat is hidden.</p>
              <p className="text-xs text-white/60 mt-1">
                You blocked or reported this user. You can continue browsing safely.
              </p>

              <div className="mt-4 flex gap-3">
                <Link
                  href="/inbox"
                  className="px-4 py-2.5 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
                >
                  Back to inbox
                </Link>
                <Link
                  href="/matches"
                  className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/10 text-sm font-semibold hover:bg-white/15 transition"
                >
                  Matches
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
                <div className="space-y-3">
                  {msgs.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm border
                          ${
                            m.from === "me"
                              ? "bg-white text-black border-white"
                              : "bg-black/30 text-white border-white/10"
                          }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>
              </div>

              <div className="mt-4 rounded-3xl bg-white/5 border border-white/10 p-4 shadow-xl space-y-3">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                  placeholder="Type a message…"
                  className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-400/60 placeholder:text-white/40 resize-none"
                />

                <SafeSendBar text={draft} onSend={send} />
              </div>
            </>
          )}

        </section>
      </main>
    </OnboardingGate>
  );
}
