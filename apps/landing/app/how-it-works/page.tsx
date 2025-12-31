import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-white">
      <Link href="/" className="text-sm text-white/70 hover:text-white">Back</Link>

      <h1 className="mt-8 text-4xl font-semibold tracking-tight">How Rivva Works</h1>
      <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">
        Rivva is built for clarity. It is invite only. It is paced. It favors signal over volume.
      </p>

      <div className="mt-10 grid gap-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold">Step one. Request an invite.</p>
          <p className="mt-2 text-sm text-white/70">We start small so the experience stays calm and high quality.</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold">Step two. A short quiz.</p>
          <p className="mt-2 text-sm text-white/70">We learn how you connect. Not how you perform.</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold">Step three. Fewer matches. Better ones.</p>
          <p className="mt-2 text-sm text-white/70">Rivva optimizes for compatibility and emotional safety.</p>
        </div>
      </div>
    </main>
  );
}
