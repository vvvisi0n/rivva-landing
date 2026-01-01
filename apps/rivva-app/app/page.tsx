import Link from "next/link";

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rivva-pill">{children}</span>;
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="rivva-card p-6">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-white/65 leading-relaxed">{text}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-16 pb-20">
      <section className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <Pill>Rivva</Pill>
            <Pill>beta</Pill>
            <Pill>invite only</Pill>
          </div>

          <h1 className="mt-6 text-5xl sm:text-6xl font-semibold leading-[1.03] tracking-tight">
            Dating, with intention.
          </h1>

          <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-xl">
            Rivva applies intelligence quietly. So connection feels clearer, calmer, and more human.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/invite" className="rivva-btn rivva-btn-primary">
              Request an invite →
            </Link>
            <Link href="/how-it-works" className="rivva-btn rivva-btn-ghost">
              How it works
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/55 max-w-xl">
            Small waves. Thoughtful people. No theatrics. No noise.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="rivva-card p-6">
            <p className="text-sm text-white/65">What Rivva does differently</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Built for people who prefer clarity over chaos.
            </h2>

            <div className="mt-6 grid gap-4">
              <Feature title="Alignment first" text="Understand fit before conversation begins." />
              <Feature title="Calm communication" text="Boundaries. Pace. Tone. Less guessing." />
              <Feature title="Privacy as a standard" text="When you’re visible. When you’re reachable. When the app stays quiet." />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-3">
        <div className="rivva-card p-6">
          <p className="text-sm font-semibold">Curated pace</p>
          <p className="mt-2 text-sm text-white/65">Fewer decisions. Better ones.</p>
        </div>
        <div className="rivva-card p-6">
          <p className="text-sm font-semibold">Signal over volume</p>
          <p className="mt-2 text-sm text-white/65">Compatibility before attention.</p>
        </div>
        <div className="rivva-card p-6">
          <p className="text-sm font-semibold">Quiet by default</p>
          <p className="mt-2 text-sm text-white/65">No manufactured urgency. No noise pretending to be value.</p>
        </div>
      </section>

      <section className="mt-14 rivva-card p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-sm text-white/65">Rivva opens quietly.</p>
          <p className="mt-2 text-xl font-semibold">We invite people in small waves to preserve the experience.</p>
        </div>
        <Link href="/invite" className="rivva-btn rivva-btn-primary">
          Request invite →
        </Link>
      </section>
    </main>
  );
}
