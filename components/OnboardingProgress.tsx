"use client";

type Props = {
  step: number; // 1-based
  total: number;
};

export default function OnboardingProgress({ step, total }: Props) {
  const pct = Math.round(((step - 1) / total) * 100);

  return (
    <div className="w-full max-w-2xl mb-6">
      <div className="flex items-center justify-between text-sm text-white/70 mb-2">
        <span>Step {step} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
