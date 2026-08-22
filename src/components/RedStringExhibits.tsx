'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function RedStringExhibits() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDrawn(true);
          observer.disconnect(); // Draw only once when scrolled into view
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const exhibits = [
    {
      tag: "EXHIBIT A",
      title: "CLASSIFIED ANONYMITY",
      fileNo: "EVD-2026-01",
      desc: "Every statement filed is stripped of IP traces, browser signatures, and identity data before entering the dossier locker.",
      stampText: "VERIFIED SECURE",
    },
    {
      tag: "EXHIBIT B",
      title: "ENCRYPTED EVIDENCE",
      fileNo: "EVD-2026-02",
      desc: "Messages are sealed inside immutable database lockers accessible solely by the recipient's secure security clearance key.",
      stampText: "SEALED CASE",
      offset: true, // vertically offset middle card
    },
    {
      tag: "EXHIBIT C",
      title: "AI SUGGESTION ENGINE",
      fileNo: "EVD-2026-03",
      desc: "Investigative prompt engine generates contextually rich witness questions when interrogation inspiration runs low.",
      stampText: "ANALYSIS READY",
    },
  ];

  return (
    <div ref={sectionRef} className="relative w-full max-w-6xl mx-auto py-12 px-4">
      {/* Animated Red Evidence String SVG (Desktop Only) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block z-0" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
          {/* Curved red string path connecting Card 1 -> Card 2 -> Card 3 */}
          <path
            d="M 170,120 Q 340,240 500,180 T 830,120"
            fill="none"
            stroke="#A8332B"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset={isDrawn ? '0' : '1000'}
            className="transition-[stroke-dashoffset] duration-1000 ease-in-out"
          />
          {/* Red Pin Dots at connection points */}
          <circle cx="170" cy="120" r="7" fill="#0B0B0A" stroke="#A8332B" strokeWidth="3" />
          <circle cx="500" cy="180" r="7" fill="#0B0B0A" stroke="#A8332B" strokeWidth="3" />
          <circle cx="830" cy="120" r="7" fill="#0B0B0A" stroke="#A8332B" strokeWidth="3" />
        </svg>
      </div>

      {/* 3 Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {exhibits.map((item, idx) => (
          <div
            key={idx}
            className={`bg-[#EDE6D6] p-6 rounded-xs border-2 border-[#1C1A16] shadow-[6px_6px_0px_#1C1A16] transition-all duration-300 hover:-translate-y-2 hover:shadow-[10px_10px_0px_#A8332B] paperclip-clip relative group ${
              item.offset ? 'md:translate-y-10' : ''
            }`}
          >
            {/* Stamp Tag */}
            <div className="flex justify-between items-start mb-4">
              <span className="font-display font-black text-sm uppercase px-2 py-0.5 border border-[#A8332B] text-[#A8332B] tracking-wider rounded-xs">
                {item.tag}
              </span>
              <span className="font-mono text-xs text-[#45566E] font-semibold">
                {item.fileNo}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display font-extrabold text-2xl text-[#1C1A16] mb-3 uppercase tracking-wide">
              {item.title}
            </h3>

            {/* Description */}
            <p className="font-serif text-sm text-[#1C1A16]/90 leading-relaxed mb-6">
              {item.desc}
            </p>

            {/* Bottom Rubber Stamp */}
            <div className="pt-4 border-t border-dashed border-[#C9B896] flex justify-between items-center">
              <span className="font-mono text-[11px] text-[#A8332B] font-bold tracking-widest uppercase transform -rotate-2 inline-block border border-dashed border-[#A8332B] px-1.5 py-0.5">
                {item.stampText}
              </span>
              <span className="font-mono text-[10px] text-[#45566E]">FILE REF #00{idx + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
