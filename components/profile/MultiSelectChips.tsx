"use client";

import { useMemo } from "react";
type ChipOption = { value: string; label: string; group?: string };

type Props = {
  title: string;
  desc?: string;
  options: ChipOption[];
  value: string[];
  onChange: (next: string[]) => void;
  max?: number;
};

export default function MultiSelectChips({
  title,
  desc,
  options,
  value,
  onChange,
  max = 10,
}: Props) {
  const groups = useMemo(() => {
    const m = new Map<string, ChipOption[]>();
    for (const o of options) {
      const list = m.get(o.group ?? "Other") ?? [];
      list.push(o);
      m.set(o.group ?? "Other", list);
    }
    return Array.from(m.entries());
  }, [options]);

  function toggle(id: string) {
    const has = value.includes(id);
    if (has) {
      onChange(value.filter((x) => x !== id));
      return;
    }
    if (value.length >= max) return;
    onChange([...value, id]);
  }

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          {desc && <p className="text-xs text-white/60 mt-1">{desc}</p>}
        </div>
        <div className="text-xs text-white/50">
          {value.length}/{max}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {groups.map(([group, items]) => (
          <div key={group}>
            <p className="text-xs text-white/50 mb-2">{group}</p>

            <div className="flex flex-wrap gap-2">
              {items.map((o) => {
                const active = value.includes(((o as any).value ?? (o as any).id ?? (o as any).label) as string);
                return (
                  <button
                    key={((o as any).value ?? (o as any).id ?? (o as any).label) as string}
                    type="button"
                    onClick={() => toggle((((o as any).value ?? (o as any).id ?? (o as any).label) as string))}
                    className={
                      "px-3 py-1.5 rounded-full text-xs font-semibold border transition " +
                      (active
                        ? "bg-violet-500/20 text-violet-200 border-violet-400/30 hover:bg-violet-500/30"
                        : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10")
                    }
                    aria-pressed={active}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {value.length >= max && (
        <p className="text-[11px] text-amber-200 mt-4">
          You hit the max. Remove one to add another.
        </p>
      )}
    </div>
  );
}
