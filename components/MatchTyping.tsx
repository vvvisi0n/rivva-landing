"use client";

import TypingBubble from "@/components/TypingBubble";

export default function MatchTyping({ name }: { name: string }) {
  return (
    <TypingBubble
      label={`${name} is typing…`}
      className="mt-2"
    />
  );
}
