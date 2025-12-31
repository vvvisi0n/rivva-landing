"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveProfile } from "@/lib/profile";

export default function DevSeedPage() {
  const router = useRouter();

  useEffect(() => {
    // Seed a minimal profile so onboarding gate passes
    saveProfile({
      name: "Victor",
      lookingFor: "open",
      pace: "balanced",
    });

    // Go straight to Discover
    router.replace("/discover");
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <p className="text-sm text-white/70">
        Seeding demo profile… sending you to Discover.
      </p>
    </div>
  );
}
