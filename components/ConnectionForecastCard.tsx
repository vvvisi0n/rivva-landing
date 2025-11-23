"use client";

type Forecast = {
  headline: string;
  energy: string;
  focus: string[];
  greenFlags: string[];
  redFlags: string[];
  lumiNote: string;
};

export default function ConnectionForecastCard({
  forecast,
}: {
  forecast: Forecast;
}) {
  return (
    <section className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-7 shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl md:text-2xl font-bold text-white">
          Connection Forecast
        </h3>
        <span className="text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
          Lumi read
        </span>
      </div>

      <p className="text-white/85 text-lg mt-3">{forecast.headline}</p>
      <p className="text-white/70 mt-2 leading-relaxed">{forecast.energy}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <p className="text-sm font-semibold mb-2">Your focus right now</p>
          <ul className="text-sm text-white/75 list-disc pl-5 space-y-1">
            {forecast.focus.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <p className="text-sm font-semibold mb-2">Green flags to lean into</p>
          <ul className="text-sm text-white/75 list-disc pl-5 space-y-1">
            {forecast.greenFlags.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <p className="text-sm font-semibold mb-2">Red flags to notice early</p>
          <ul className="text-sm text-white/75 list-disc pl-5 space-y-1">
            {forecast.redFlags.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-purple-500/15 to-cyan-400/10 border border-white/10 p-4">
          <p className="text-sm text-white/85">
            <span className="font-semibold">Lumi says:</span> {forecast.lumiNote}
          </p>
        </div>
      </div>
    </section>
  );
}
