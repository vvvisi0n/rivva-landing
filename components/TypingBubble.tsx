"use client";

type Props = {
  label?: string;
  className?: string;
};

export default function TypingBubble({
  label = "Lumi is thinking…",
  className = "",
}: Props) {
  return (
    <div className={`flex items-center gap-3 text-white/80 ${className}`}>
      <div className="bg-white/10 border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-2">
        <span className="text-sm">{label}</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  );
}
