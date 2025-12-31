"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadProfile } from "@/lib/profile";

export default function OnboardingGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const p = loadProfile();
    if (!p || !p.name) {
      router.replace("/onboarding");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;
  return <>{children}</>;
}
