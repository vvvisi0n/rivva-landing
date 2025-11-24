"use client";

type Props = {
  draft: string;
  onRewrite: (newText: string) => void;
};

function rewriteLight(text: string) {
  const t = text.trim();
  if (!t) return t;

  // very simple confidence polish
  let out = t;

  out = out.replace(/\bhey\b/i, "Hey");
  out = out.replace(/\bokay\b/gi, "Okay");
  out = out.replace(/\bi think\b/gi, "I feel");
  out = out.replace(/\bmaybe\b/gi, "Honestly");
  out = out.replace(/\bjust\b/gi, "");
  out = out.replace(/\s{2,}/g, " ").trim();

  // add curiosity if no question
  if (!out.includes("?") && out.length > 20) {
    out = out + " What about you?";
  }

  return out;
}

export default function LumiRewriteButton({ draft, onRewrite }: Props) {
  return (
    <button
      type="button"
      onClick={() => onRewrite(rewriteLight(draft))}
      disabled={!draft.trim()}
      className={`px-3 py-2 rounded-xl border text-xs font-semibold transition
        ${
          draft.trim()
            ? "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
            : "bg-white/5 border-white/10 text-white/30 cursor-not-allowed"
        }`}
      title="Let Lumi polish your message"
    >
      Lumi Rewrite ✨
    </button>
  );
}
