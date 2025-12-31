"use client";

import { useMemo } from "react";

type Props = {
  label: string;
  helper?: string;
  options: readonly string[];
  value: string[];
  onChange: (next: string[]) => void;
  max?: number;
};

export default function MultiSelectChips({ label, helper, options, value, onChange, max = 8 }: Props) {
  const selected = useMemo(() => new Set(value), [value]);

  function toggle(opt: string) {
    const isOn = selected.has(opt);
    if (isOn) {
      onChange(value.filter((v) => v !== opt));
      return;
    }
    if (value.length >= max) return;
    onChange([...value, opt]);
  }

  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-medium text-white/80">{label}</p>
        {!!helper && <p className="text-xs text-white/55 mt-1">{helper}</p>}
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const on = selected.has(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={[
                "px-3 py-2 rounded-2xl text-xs font-semibold border transition",
                on
                  ? "bg-white text-black border-white/10"
                  : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-white/40">
        {value.length}/{max} selected
      </p>
    </div>
  );
}
