"use client";

import { useEffect } from "react";
import { loadPrivacySettings } from "@/lib/privacySettings";

export default function PrivacyApplier() {
  useEffect(() => {
    const apply = () => {
      const p = loadPrivacySettings();

      // Low-stimulation mode: global CSS hook
      document.documentElement.dataset.lowStimulation = p.lowStimulationMode ? "1" : "0";

      // Presence hooks (placeholders for later)
      document.documentElement.dataset.hideOnline = p.hideOnlineStatus ? "1" : "0";
      document.documentElement.dataset.hideReadReceipts = p.hideReadReceipts ? "1" : "0";

      // Orb visibility hook
      document.documentElement.dataset.showOrb = p.showRivvaOrb ? "1" : "0";
    };

    apply();
    window.addEventListener("storage", apply);
    window.addEventListener("focus", apply);

    return () => {
      window.removeEventListener("storage", apply);
      window.removeEventListener("focus", apply);
    };
  }, []);

  return null;
}
