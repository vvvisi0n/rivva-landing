"use client";

import { ChatMsg } from "@/lib/chatSim";

function formatTime(ts: number) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function ChatMessage({ msg }: { msg: ChatMsg }) {
  const isYou = msg.role === "you";
  const isLumi = msg.role === "lumi";

  return (
    <div className={`flex w-full ${isYou ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={[
          "max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow",
          isYou
            ? "bg-white text-black rounded-br-md"
            : isLumi
            ? "bg-purple-500/15 border border-purple-400/20 text-purple-50 rounded-bl-md"
            : "bg-white/10 border border-white/10 text-white rounded-bl-md",
        ].join(" ")}
      >
        {isLumi && (
          <div className="text-[10px] uppercase tracking-wider text-purple-200 mb-1">
            Lumi
          </div>
        )}

        <p>{msg.text}</p>

        <div className={`text-[10px] mt-1 ${isYou ? "text-black/50" : "text-white/50"}`}>
          {formatTime(msg.ts)}
        </div>
      </div>
    </div>
  );
}
