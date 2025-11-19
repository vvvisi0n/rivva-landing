"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Hi, I’m Lumi 👋",
  "I learn your emotional patterns…",
  "I help you communicate better…",
  "And match you with people who truly fit your energy.",
];

export default function LumiTyping() {
  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const currentMessage = MESSAGES[messageIndex];

    let timeout: NodeJS.Timeout;

    if (typing) {
      // Typing
      if (charIndex < currentMessage.length) {
        timeout = setTimeout(() => {
          setText(currentMessage.slice(0, charIndex + 1));
          setCharIndex((i) => i + 1);
        }, 55);
      } else {
        // Pause at end of message
        timeout = setTimeout(() => {
          setTyping(false);
        }, 1500);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setText(currentMessage.slice(0, charIndex - 1));
          setCharIndex((i) => i - 1);
        }, 40);
      } else {
        // Move to next message
        timeout = setTimeout(() => {
          setMessageIndex((i) => (i + 1) % MESSAGES.length);
          setTyping(true);
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [typing, charIndex, messageIndex]);

  return (
    <div className="text-xl text-purple-700 font-medium mt-6 h-8">
      {text}
      <span className="animate-pulse">|</span>
    </div>
  );
}
