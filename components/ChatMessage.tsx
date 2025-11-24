"use client";

import TypingBubble from "@/components/TypingBubble";

type Props = {
  from: "you" | "them" | "lumi";
  text: string;
};

export default function ChatMessage({ from, text }: Props) {
  if (from === "lumi") {
    return (
      <div className="my-3">
        <TypingBubble label={text} />
      </div>
    );
  }

  const isYou = from === "you";

  return (
    <div className={`flex ${isYou ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${isYou
            ? "bg-white text-black rounded-br-md"
            : "bg-white/10 border border-white/10 text-white rounded-bl-md"
          }`}
      >
        {text}
      </div>
    </div>
  );
}
