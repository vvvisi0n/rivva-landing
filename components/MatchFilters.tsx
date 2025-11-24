"use client";

type Filters = {
  minCompat: number;
  city: string;
  tag: string;
};

export default function MatchFilters({
  filters,
  setFilters,
  availableCities,
  availableTags,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  availableCities: string[];
  availableTags: string[];
}) {
  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-5 md:p-6 shadow-xl">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Compatibility */}
        <label className="text-sm text-white/80">
          Min compatibility: <span className="font-semibold">{filters.minCompat}%</span>
          <input
            type="range"
            min={50}
            max={100}
            step={1}
            value={filters.minCompat}
            onChange={(e) =>
              setFilters({ ...filters, minCompat: Number(e.target.value) })
            }
            className="w-full mt-2"
          />
        </label>

        {/* City */}
        <label className="text-sm text-white/80">
          City
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm"
          >
            <option value="">Anywhere</option>
            {availableCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        {/* Tag */}
        <label className="text-sm text-white/80">
          Vibe tag
          <select
            value={filters.tag}
            onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
            className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm"
          >
            <option value="">Any vibe</option>
            {availableTags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        onClick={() => setFilters({ minCompat: 70, city: "", tag: "" })}
        className="mt-4 text-xs text-white/70 underline hover:text-white"
      >
        Reset filters
      </button>
    </div>
  );
}
