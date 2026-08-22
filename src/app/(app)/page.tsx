'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RedactionReveal from '@/components/RedactionReveal';
import TornEdgeDivider from '@/components/TornEdgeDivider';
import RedStringExhibits from '@/components/RedStringExhibits';
import InfiniteMarquee from '@/components/InfiniteMarquee';
import messages from '@/messages.json';

export default function Home() {
  // Mouse Parallax for Tape Elements
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 35;
      const y = (e.clientY - innerHeight / 2) / 35;
      setParallax({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative px-4 sm:px-8 py-16 md:py-24 max-w-6xl mx-auto w-full z-10">
        {/* Parallax Tape Decorations */}
        <div
          className="absolute top-8 left-6 sm:left-16 w-28 sm:w-36 h-8 bg-[#C9B896]/40 backdrop-blur-[1px] rotate-[-12deg] shadow-xs pointer-events-none z-20 border-x border-[#1C1A16]/20 transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${parallax.x}px, ${parallax.y}px) rotate(-12deg)`,
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-12 right-6 sm:right-20 w-32 sm:w-40 h-8 bg-[#C9B896]/40 backdrop-blur-[1px] rotate-[8deg] shadow-xs pointer-events-none z-20 border-x border-[#1C1A16]/20 transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${-parallax.x}px, ${-parallax.y}px) rotate(8deg)`,
          }}
          aria-hidden="true"
        />

        {/* Case File Header Meta Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-[#1C1A16] pb-4 mb-10 font-mono text-xs sm:text-sm text-[#45566E]">
          <div className="flex items-center space-x-3">
            <span className="bg-[#1C1A16] text-[#EDE6D6] px-2 py-0.5 font-bold uppercase">
              CASE FILE NO. #MM-884-X
            </span>
            <span>DATE OPENED: AUG 2026</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-bold text-[#A8332B]">STATUS: UNRESOLVED</span>
            {/* Rotated Stamp Badge */}
            <span className="font-display font-black text-sm uppercase px-3 py-1 border-2 border-[#A8332B] text-[#A8332B] transform rotate-[6deg] tracking-widest inline-block shadow-xs">
              [ EYES ONLY ]
            </span>
          </div>
        </div>

        {/* Main Redaction Reveal Headline */}
        <div className="mb-8">
          <RedactionReveal
            text="UNCOVER TRUTH THROUGH CONFIDENTIAL ANONYMOUS MESSAGES"
            className="text-4xl sm:text-6xl md:text-7xl leading-none"
          />
        </div>

        {/* Case Notes Subhead */}
        <p className="max-w-2xl font-serif text-lg sm:text-xl text-[#1C1A16]/90 leading-relaxed mb-10 border-l-2 border-[#A8332B] pl-4 italic">
          "Case Notes: Standard feedback channels are compromised by social etiquette. This portal facilitates raw, unvarnished accounts with absolute, mathematical anonymity."
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
          <Link
            href="/sign-up"
            className="stamp-filled px-8 py-4 text-lg font-bold text-center transition-all duration-200 hover:bg-[#0B0B0A] hover:-rotate-1 active:scale-95 cursor-pointer shadow-md inline-block"
          >
            OPEN YOUR CASE FILE
          </Link>
          <a
            href="#exhibits"
            className="stamp-border px-8 py-4 text-lg font-bold text-center transition-all duration-200 hover:bg-[#A8332B] hover:text-[#EDE6D6] hover:-rotate-1 active:scale-95 cursor-pointer shadow-md inline-block"
          >
            EXPLORE EXHIBITS
          </a>
        </div>
      </section>

      {/* SECTION 2: EXHIBITS & EVIDENCE SECTION */}
      <section id="exhibits" className="bg-[#E3D9C2] relative z-20 pb-20 overflow-hidden">
        <TornEdgeDivider fillColor="#E3D9C2" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#A8332B] font-bold block mb-1">
              [ CONFIDENTIAL EVIDENCE ARCHIVE ]
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#1C1A16] uppercase tracking-wide">
              INVESTIGATIVE EXHIBITS
            </h2>
            <p className="font-serif text-base text-[#45566E] max-w-xl mx-auto mt-2">
              Three pillars engineered to preserve source anonymity while delivering high-signal feedback.
            </p>
          </div>

          {/* Interactive Red String Exhibits Component */}
          <RedStringExhibits />
        </div>

        {/* Continuous Gliding Marquee Ticker Feed for Recent Anonymous Messages */}
        <div className="mt-20 border-t-2 border-dashed border-[#C9B896] pt-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-6 flex justify-between items-center">
            <h3 className="font-display font-black text-2xl uppercase tracking-wider text-[#1C1A16]">
              RECENT ANONYMOUS MESSAGES ({messages.length})
            </h3>
            <span className="font-mono text-xs text-[#A8332B] font-bold border border-[#A8332B] px-2 py-0.5 animate-pulse">
              LIVE CONTINUOUS STREAM
            </span>
          </div>

          {/* Infinite Smooth Marquee Slider */}
          <InfiniteMarquee items={messages} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B0B0A] text-[#EDE6D6] pt-16 pb-12 px-4 sm:px-8 border-t-4 border-[#A8332B] relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left branding */}
          <div className="space-y-2 text-center md:text-left">
            <div className="font-display font-black text-3xl uppercase tracking-widest text-[#EDE6D6]">
              MYSTERY_MESSAGES
            </div>
            <p className="font-mono text-xs text-[#C9B896]">
              CONFIDENTIAL CASE FILE DOSSIER SYSTEM v2.0
            </p>
          </div>

          {/* Center Rotated Red Stamp Graphic */}
          <div className="font-display font-black text-lg text-[#A8332B] border-4 border-[#A8332B] px-6 py-2 transform -rotate-6 tracking-widest uppercase shadow-[0_0_12px_rgba(168,51,43,0.4)]">
            CASE STAYS OPEN
          </div>

          {/* Right Utility Monospace Links */}
          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-[#C9B896]">
            <Link href="/" className="hover:text-[#A8332B] uppercase">
              [TERMS OF EVIDENCE]
            </Link>
            <Link href="/" className="hover:text-[#A8332B] uppercase">
              [PRIVACY DOSSIER]
            </Link>
            <Link href="/sign-in" className="hover:text-[#A8332B] uppercase">
              [AGENT CLEARANCE]
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[#1C1A16] text-center font-mono text-[11px] text-[#45566E]">
          © 2026 MYSTERY_MESSAGES. ALL MESSAGES PROTECTED UNDER STRICT ANONYMITY PROTOCOL.
        </div>
      </footer>
    </div>
  );
}