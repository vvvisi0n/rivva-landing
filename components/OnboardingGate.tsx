"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { loadProfile } from "@/lib/profile";

const ALLOWLIST_PREFIXES = [
  "/", // allow landing
  "/discover",
  "/liked",
  "/matches",
  "/quiz",
  "/inbox",
  "/settings",
];

function isAllowedPath(pathname: string) {
  return ALLOWLIST_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export default function OnboardingGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // If route is allowlisted, skip the gate.
    if (pathname && isAllowedPath(pathname)) {
      setReady(true);
      return;
    }

    const p = loadProfile();
    if (!p || !p.name) {
      router.replace("/onboarding");
      return;
    }

    setReady(true);
  }, [router, pathname]);

  if (!ready) return null;
  return <>{children}</>;
}
