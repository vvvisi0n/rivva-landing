"use client";

import { useEffect, useMemo, useState } from "react";
import { getPrivacySettings } from "@/lib/privacySettings";

type Props = {
  className?: string;
  label?: string;
  speaking?: boolean;
};

function cx(...xs: Array<string | undefined | false>) {
  return xs.filter(Boolean).join(" ");
}

export default function LumiPresence({ className, label = "Lumi", speaking = false }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const privacy = useMemo(() => {
    // Safe on client only
    if (!mounted) return null;
    return getPrivacySettings();
  }, [mounted]);

  const lowStim = privacy?.lowStimulationMode ?? false;

  return (
    <div
      aria-hidden="true"
      title={label}
      className={cx(
        "lumi-presence",
        speaking && !lowStim && "lumi-presence--speaking",
        lowStim && "lumi-presence--still",
        className
      )}
    >
      <div className="lumi-presence__grain" />
      <div className="lumi-presence__sheen" />
      <div className="lumi-presence__core" />
    </div>
  );
}
