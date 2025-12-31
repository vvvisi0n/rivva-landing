import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#0b0b14] text-white px-6 py-16">
      <section className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-white/60 hover:text-white">
          ← Back
        </Link>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight">
          How Rivva works
        </h1>

        <p className="mt-3 text-white/70 leading-relaxed">
          Rivva is curated. The goal is not more matches.
          <br />
          It’s better understanding, before things get loud.
        </p>

        <div className="mt-10 grid gap-4">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <p className="text-sm font-semibold">1. Start with your signal</p>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              A short quiz that prioritizes pace, boundaries, and alignment.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <p className="text-sm font-semibold">2. Curated discovery</p>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Fewer options. Higher relevance. A calmer way to explore.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <p className="text-sm font-semibold">3. Quiet guidance</p>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Rivva applies intelligence quietly. It supports clarity without performing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
