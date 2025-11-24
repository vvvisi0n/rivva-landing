"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  delay: number;
}

export default function LumiParticles({ colorClass }: { colorClass: string }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];

    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100, // position in %
        size: Math.random() * 6 + 4, // 4px–10px
        delay: Math.random() * 5,
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`
            absolute rounded-full opacity-60 animate-float
            ${colorClass}
          `}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
