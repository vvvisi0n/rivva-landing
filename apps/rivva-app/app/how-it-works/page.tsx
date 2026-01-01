import Link from "next/link";

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 pt-16 pb-20">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">Rivva</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">How it works</h1>
          <p className="mt-3 text-sm text-white/70 max-w-2xl">
            Rivva is built for clarity. Fewer inputs. Better matches. Calm by default.
          </p>
        </div>
        <Link href="/invite" className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 transition">
          Request invite
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Card title="1. Intent first" text="We start with a short signal-building quiz. Not a personality circus. Just what matters." />
        <Card title="2. Curated introductions" text="We release matches in small waves so attention stays real and manageable." />
        <Card title="3. Calm communication" text="Less guessing. More tone. Boundaries and pacing are treated as normal." />
        <Card title="4. Privacy by default" text="Visibility, reachability, and notifications are designed to stay quiet unless you choose otherwise." />
      </div>
    </main>
  );
}
