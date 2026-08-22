'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number; // initial horizontal % (0 to 100)
  size: number; // px (1.5 to 3.5)
  duration: number; // seconds for vertical drift (12 to 24)
  delay: number; // delay in seconds
  opacity: number; // 0.15 to 0.45
  swayAmplitude: number; // horizontal sway distance in px
}

export default function DustParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 50 ambient paper-fleck particles
    const generated: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 2.2 + 1.2,
      duration: Math.random() * 14 + 12,
      delay: Math.random() * -20, // negative delay so they fill screen immediately
      opacity: Math.random() * 0.35 + 0.15,
      swayAmplitude: Math.random() * 20 + 10,
    }));
    setParticles(generated);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden motion-reduce:hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#1C1A16] animate-dust-drift"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--sway-amp' as string]: `${p.swayAmplitude}px`,
          }}
        />
      ))}
    </div>
  );
}
