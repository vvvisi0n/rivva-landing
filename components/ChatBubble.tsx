"use client";

type Props = {
  from: "me" | "lumi" | "match";
  text: string;
  time?: string;
};

export default function ChatBubble({ from, text, time }: Props) {
  const isMe = from === "me";

  return (
    <div className={`w-full flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow
          ${
            isMe
              ? "bg-white text-black rounded-br-md"
              : from === "lumi"
              ? "bg-purple-600/20 border border-purple-400/30 text-white rounded-bl-md"
              : "bg-white/10 border border-white/10 text-white rounded-bl-md"
          }`}
      >
        <p>{text}</p>
        {time && (
          <p className={`mt-1 text-[10px] ${isMe ? "text-black/50" : "text-white/50"}`}>
            {time}
          </p>
        )}
      </div>
    </div>
  );
}
