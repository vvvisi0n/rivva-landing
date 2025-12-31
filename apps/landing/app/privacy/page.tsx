import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-white">
      <Link href="/" className="text-sm text-white/70 hover:text-white">Back</Link>

      <h1 className="mt-8 text-4xl font-semibold tracking-tight">Privacy</h1>
      <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">
        Privacy is a standard. Not a feature.
      </p>

      <div className="mt-10 grid gap-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold">Quiet by default.</p>
          <p className="mt-2 text-sm text-white/70">No unnecessary alerts. No manufactured urgency.</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold">Control the experience.</p>
          <p className="mt-2 text-sm text-white/70">Visibility, pacing, and reachability are intentional.</p>
        </div>
      </div>
    </main>
  );
}
