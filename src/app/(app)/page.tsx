'use client';

import React from 'react';
import Link from 'next/link';
import RedactionReveal from '@/components/RedactionReveal';
import TornEdgeDivider from '@/components/TornEdgeDivider';
import RedStringExhibits from '@/components/RedStringExhibits';
import InfiniteMarquee from '@/components/InfiniteMarquee';
import SenderPreviewMockup from '@/components/SenderPreviewMockup';
import messages from '@/messages.json';

export default function Home() {
  // Mouse Parallax & Cursor Flow tracking for Hero elements
  const [parallax, setParallax] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 30;
      const y = (e.clientY - innerHeight / 2) / 30;
      setParallax({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Dynamic Ambient Cursor Glow Layer */}
      <div
        className="pointer-events-none fixed -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(168,51,43,0.12)_0%,_transparent_70%)] transition-transform duration-200 ease-out z-0 mix-blend-multiply motion-reduce:hidden"
        style={{
          transform: `translate(${parallax.x * 12}px, ${parallax.y * 12}px)`,
        }}
        aria-hidden="true"
      />

      {/* SECTION 1: HERO SECTION */}
      <section className="relative px-4 sm:px-8 py-16 md:py-24 max-w-5xl mx-auto w-full z-10 text-center sm:text-left">
        {/* Parallax Tape Accents */}
        <div
          className="absolute top-10 left-2 sm:left-8 w-28 sm:w-36 h-7 bg-[#C9B896]/40 backdrop-blur-[1px] rotate-[-12deg] shadow-xs pointer-events-none z-20 border-x border-[#1C1A16]/20 transition-transform duration-100 ease-out hidden sm:block"
          style={{
            transform: `translate(${parallax.x}px, ${parallax.y}px) rotate(-12deg)`,
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-16 right-2 sm:right-10 w-32 sm:w-40 h-7 bg-[#C9B896]/40 backdrop-blur-[1px] rotate-[8deg] shadow-xs pointer-events-none z-20 border-x border-[#1C1A16]/20 transition-transform duration-100 ease-out hidden sm:block"
          style={{
            transform: `translate(${-parallax.x}px, ${-parallax.y}px) rotate(8deg)`,
          }}
          aria-hidden="true"
        />

        {/* Category Badge */}
        <div className="inline-flex items-center space-x-2 bg-[#E3D9C2] border border-[#C9B896] px-3.5 py-1 rounded-full mb-6 font-mono text-xs text-[#A8332B] font-semibold shadow-xs">
          <span className="animate-pulse">✨</span>
          <span>Anonymous Feedback Platform</span>
        </div>

        {/* Main Redaction Reveal Headline (Signature Moment) */}
        <div className="mb-6">
          <RedactionReveal
            text="Honest feedback, no name attached."
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight"
          />
        </div>

        {/* Plain Language Subtitle */}
        <p className="max-w-2xl text-lg sm:text-xl text-[#45566E] font-sans leading-relaxed mb-8">
          Get honest, anonymous messages from friends, coworkers, or followers — no account needed to send, just a link to share.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-4">
          <Link
            href="/sign-up"
            className="stamp-filled w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-bold text-center transition-all duration-200 hover:bg-[#0B0B0A] hover:-rotate-1 active:scale-95 cursor-pointer shadow-md inline-block"
            aria-label="Get your anonymous message link"
          >
            Get Your Link
          </Link>
          <a
            href="#how-it-works"
            className="stamp-border w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-bold text-center transition-all duration-200 hover:bg-[#A8332B] hover:text-[#EDE6D6] hover:-rotate-1 active:scale-95 cursor-pointer shadow-md inline-block"
          >
            See How It Works
          </a>
        </div>

        {/* Reassurance Micro-Copy */}
        <p className="text-xs text-[#45566E] font-mono mt-3">
          Free · Takes 30 seconds · No credit card
        </p>
      </section>

      {/* SECTION 2: HOW IT WORKS & SENDER PREVIEW */}
      <section id="how-it-works" className="bg-[#E3D9C2] relative z-20 py-16 overflow-hidden">
        <TornEdgeDivider fillColor="#E3D9C2" />

        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-[#A8332B] font-bold block mb-1">
              Simple 3-Step Flow
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1C1A16] uppercase tracking-wide">
              How Mystery Messages Works
            </h2>
            <p className="font-sans text-base text-[#45566E] max-w-xl mx-auto mt-2">
              Start receiving anonymous feedback in less than a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* 3 Numbered Steps */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-start space-x-4 bg-[#EDE6D6] p-5 rounded-xs border border-[#C9B896] shadow-xs">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#A8332B] text-[#EDE6D6] font-display font-bold text-lg flex items-center justify-center">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1C1A16] mb-1 font-sans">
                    Create your inbox
                  </h3>
                  <p className="text-sm text-[#45566E] font-sans leading-relaxed">
                    Sign up in seconds and get your unique anonymous message link.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-[#EDE6D6] p-5 rounded-xs border border-[#C9B896] shadow-xs">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#A8332B] text-[#EDE6D6] font-display font-bold text-lg flex items-center justify-center">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1C1A16] mb-1 font-sans">
                    Share your link
                  </h3>
                  <p className="text-sm text-[#45566E] font-sans leading-relaxed">
                    Post your link on Instagram, Twitter, LinkedIn, or anywhere your audience is.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-[#EDE6D6] p-5 rounded-xs border border-[#C9B896] shadow-xs">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#A8332B] text-[#EDE6D6] font-display font-bold text-lg flex items-center justify-center">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1C1A16] mb-1 font-sans">
                    Receive honest messages
                  </h3>
                  <p className="text-sm text-[#45566E] font-sans leading-relaxed">
                    Read unvarnished, anonymous messages privately inside your personal dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Sender Interactive Mockup Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <SenderPreviewMockup />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EXHIBITS & FEATURES */}
      <section id="exhibits" className="py-16 relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#A8332B] font-bold block mb-1">
              Core Architecture
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1C1A16] uppercase tracking-wide">
              Built For Absolute Privacy
            </h2>
            <p className="font-sans text-base text-[#45566E] max-w-xl mx-auto mt-2">
              Three architectural pillars that ensure source anonymity while delivering high-signal feedback.
            </p>
          </div>

          <RedStringExhibits />
        </div>

        {/* Continuous Gliding Marquee Ticker Feed */}
        <div className="mt-16 border-t border-dashed border-[#C9B896] pt-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-6 flex justify-between items-center">
            <h3 className="font-display font-bold text-xl uppercase tracking-wider text-[#1C1A16]">
              Recent Anonymous Messages ({messages.length})
            </h3>
            <span className="font-mono text-xs text-[#A8332B] font-semibold border border-[#A8332B] px-2 py-0.5 rounded-xs">
              Live Feed
            </span>
          </div>

          <InfiniteMarquee items={messages} />
        </div>
      </section>

      {/* SECTION 4: ABOUT THIS PROJECT */}
      <section id="about" className="bg-[#E3D9C2] py-16 border-t border-[#C9B896] relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="bg-[#EDE6D6] p-8 rounded-xs border-2 border-[#1C1A16] shadow-md space-y-6">
            <div className="flex items-center space-x-3 border-b border-[#C9B896] pb-4">
              <span className="w-3 h-3 rounded-full bg-[#A8332B]" />
              <h2 className="font-display font-black text-2xl uppercase tracking-wider text-[#1C1A16]">
                About This Project
              </h2>
            </div>

            <p className="font-sans text-base text-[#1C1A16]/90 leading-relaxed">
              Mystery Messages is a full-stack web application designed to allow users to receive candid, constructive feedback with complete anonymity. Built as a portfolio project by <strong>Anmol Yadav</strong>, it demonstrates modern React patterns, server-decoupled message architectures, and accessible UI design.
            </p>

            {/* Tech Stack Chips */}
            <div>
              <h3 className="text-xs font-mono font-bold text-[#45566E] uppercase tracking-wider mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Next.js 15', 'TypeScript', 'MongoDB', 'NextAuth.js', 'Tailwind CSS', 'Zod', 'Vercel'].map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-[#E3D9C2] text-[#1C1A16] border border-[#C9B896] px-3 py-1 rounded-xs font-mono text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Detail Callout Box */}
            <div className="bg-[#1C1A16] text-[#EDE6D6] p-4 rounded-xs border-l-4 border-[#A8332B] font-mono text-xs leading-relaxed space-y-1">
              <span className="text-[#A8332B] font-bold block uppercase">
                Architecture Detail:
              </span>
              <p>
                Messages are decoupled from sender identity at the database layer — no IP addresses, browser user-agents, or session tokens are ever linked to a submitted message payload.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B0B0A] text-[#EDE6D6] pt-12 pb-8 px-4 sm:px-8 border-t-4 border-[#A8332B] relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Branding & Creator Attribution */}
          <div className="space-y-1 text-center md:text-left">
            <div className="font-display font-extrabold text-2xl tracking-widest text-[#EDE6D6] uppercase">
              MYSTERY MESSAGES
            </div>
            <p className="font-mono text-xs text-[#C9B896]">
              Portfolio project built by <strong className="text-white">Anmol Yadav</strong>
            </p>
          </div>

          {/* Nav & Social Links */}
          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-[#C9B896]">
            <a
              href="https://github.com/Anmoly6422"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A8332B] transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A8332B] transition-colors"
            >
              LinkedIn ↗
            </a>
            <a href="#about" className="hover:text-[#A8332B] transition-colors">
              About Project
            </a>
            <Link href="/sign-in" className="hover:text-[#A8332B] transition-colors">
              Login
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-[#1C1A16] text-center font-mono text-[11px] text-[#45566E]">
          Portfolio project — not a production consumer app. © 2026 Anmol Yadav.
        </div>
      </footer>
    </div>
  );
}