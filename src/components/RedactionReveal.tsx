'use client';

import React, { useEffect, useState } from 'react';

interface RedactionRevealProps {
  text: string;
  className?: string;
}

export default function RedactionReveal({ text, className = '' }: RedactionRevealProps) {
  const words = text.split(' ');
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Staggered reveal trigger after component mounts
    const timer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`inline-flex flex-wrap items-center ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="relative inline-block mx-1 my-1 overflow-hidden group">
          <span className="relative z-0 px-1 py-0.5 tracking-tight font-display font-black uppercase text-[#1C1A16]">
            {word}
          </span>
          {/* Black redaction bar peeling away */}
          <span
            className={`absolute inset-0 bg-[#0B0B0A] z-10 transition-transform duration-500 ease-out motion-reduce:hidden ${
              revealed ? 'translate-x-full' : 'translate-x-0'
            }`}
            style={{
              transitionDelay: `${index * 260 + 200}ms`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
