"use client";

import { useMemo } from "react";

export type ChipOption = {
  id: string;
  label: string;
  group?: string;
};

type Props = {
  label: string;
  helper?: string;
  options: Array<ChipOption | string>;
  value: string[];
  onChange: (next: string[]) => void;
  max?: number;
};

export default function MultiSelectChips({
  label,
  helper,
  options,
  value,
  onChange,
  max = 10,
}: Props) {
  const normalized: ChipOption[] = useMemo(() => {
    return (options ?? []).map((o) =>
      typeof o === "string" ? { id: o, label: o, group: "Tags" } : o
    );
  }, [options]);

  const groups = useMemo(() => {
    const m = new Map<string, ChipOption[]>();
    for (const o of normalized) {
      const g = (o.group ?? "Tags").toString();
      const list = m.get(g) ?? [];
      list.push(o);
      m.set(g, list);
    }
    return Array.from(m.entries());
  }, [normalized]);

  function toggle(id: string) {
    const active = value.includes(id);
    if (active) {
      onChange(value.filter((x) => x !== id));
      return;
    }
    if (value.length >= max) return;
    onChange([...value, id]);
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white">{label}</h3>
          {helper ? <p className="mt-1 text-xs text-white/60">{helper}</p> : null}
        </div>
        <div className="text-xs text-white/60">
          {value.length}/{max}
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {groups.map(([g, items]) => (
          <div key={g}>
            <p className="text-xs uppercase tracking-widest text-white/45">{g}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {items.map((o) => {
                const active = value.includes(o.id);
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => toggle(o.id)}
                    className={
                      active
                        ? "rounded-full bg-white text-black px-3 py-1 text-xs font-semibold"
                        : "rounded-full bg-white/5 border border-white/10 text-white/75 px-3 py-1 text-xs hover:bg-white/10"
                    }
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
