"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LumiOrb from "@/components/LumiOrb";

type Message = {
  sender: "user" | "lumi";
  text: string;
};

export default function LumiChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Lumi intro message
  useEffect(() => {
    setTimeout(() => {
      addLumiMessage(
        "I’ve analyzed your emotional rhythm. Ask me anything — from relationship patterns to compatibility. I’m here to help you connect better."
      );
    }, 600);
  }, []);

  function addUserMessage(text: string) {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  }

  function addLumiMessage(text: string) {
    setMessages((prev) => [...prev, { sender: "lumi", text }]);
  }

  async function handleSend() {
    if (!input.trim()) return;

    const text = input.trim();
    addUserMessage(text);
    setInput("");

    // Fake Lumi delay + typing animation
    setTimeout(() => {
      addLumiMessage(generateLumiResponse(text));
    }, 900);
  }

  // Very simple placeholder logic (we can replace with real AI later)
  function generateLumiResponse(question: string) {
    if (question.toLowerCase().includes("compat")) {
      return "Compatibility isn’t about similarity — it’s about emotional pacing. People who match your rhythm feel effortless.";
    }

    if (question.toLowerCase().includes("love")) {
      return "Love grows from emotional consistency. The nervous system trusts what it can predict.";
    }

    if (question.toLowerCase().includes("why")) {
      return "Because emotional patterns tend to repeat until someone learns a new rhythm.";
    }

    return "I hear you. Tell me more — I’m following the emotional thread beneath your words.";
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#f6f3ff] relative">
      <LumiOrb active />

      {/* Header */}
      <div className="p-5 border-b border-purple-200 bg-white z-10">
        <h1 className="text-xl font-bold text-purple-700">Chat with Lumi</h1>
        <p className="text-sm text-slate-500">Your personal AI dating companion</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-sm ${
                  msg.sender === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-white text-slate-700 border border-purple-100 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-purple-200 flex gap-3">
        <input
          type="text"
          placeholder="Ask Lumi anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleSend}
          className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold"
        >
          Send
        </button>
      </div>
    </main>
  );
}
