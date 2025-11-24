"use client";

import type { ChatMsg, ReactionKey } from "@/lib/chatStore";

type Props = {
  msg: ChatMsg;
  time: string;
  onReact?: (msg: ChatMsg, key: ReactionKey) => void;
};

const REACTIONS: { key: ReactionKey; label: string; emoji: string }[] = [
  { key: "heart", label: "Love", emoji: "❤️" },
  { key: "laugh", label: "Laugh", emoji: "😂" },
  { key: "like", label: "Like", emoji: "👍" },
];

export default function ChatBubble({ msg, time, onReact }: Props) {
  const isMe = msg.from === "me";
  const isLumi = msg.from === "lumi";

  const wrap =
    isMe ? "items-end" : "items-start";
  const bubble =
    isMe
      ? "bg-white text-black"
      : isLumi
      ? "bg-purple-500/15 border border-purple-300/20 text-white"
      : "bg-white/10 text-white border border-white/10";

  return (
    <div className={`flex flex-col ${wrap}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${bubble}`}>
        {isLumi && (
          <div className="text-[10px] uppercase tracking-widest text-white/60 mb-1">
            Lumi
          </div>
        )}
        <p>{msg.text}</p>
        <div className={`mt-1 text-[10px] ${isMe ? "text-black/60" : "text-white/50"}`}>
          {time}
        </div>
      </div>

      {/* Reaction row */}
      <div className="flex items-center gap-1 mt-1">
        {REACTIONS.map((r) => {
          const count = msg.reactions?.[r.key] || 0;
          return (
            <button
              key={r.key}
              onClick={() => onReact?.(msg, r.key)}
              className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center gap-1"
              title={r.label}
            >
              <span>{r.emoji}</span>
              {count > 0 && <span className="text-[10px] text-white/70">{count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
