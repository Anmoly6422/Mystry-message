"use client";

import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <header className="sticky top-0 z-40 bg-[#EDE6D6]/95 backdrop-blur-sm border-b border-[#C9B896] shadow-xs">
      {/* Top Slim Credibility Bar */}
      <div className="bg-[#1C1A16] text-[#EDE6D6] text-xs font-mono py-1.5 px-4 sm:px-8 border-b border-[#C9B896]/20">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#A8332B]" aria-hidden="true" />
            <span className="text-[#C9B896]">
              Portfolio project — built by <strong className="text-white font-semibold">Anmol Yadav</strong>
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-[#C9B896]">
            <a
              href="https://github.com/Anmoly6422"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Anmol Yadav GitHub Profile"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              LinkedIn ↗
            </a>
            <a
              href="#about"
              className="hover:text-white transition-colors underline decoration-[#A8332B] underline-offset-2"
            >
              Case Study / About
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 md:px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Branding Wordmark */}
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-extrabold tracking-wider font-display text-[#1C1A16] uppercase hover:text-[#A8332B] transition-colors"
            aria-label="Mystery Messages Home"
          >
            <span>MYSTERY MESSAGES</span>
          </Link>
        </div>

        {/* Right Navigation & Action CTAs */}
        <nav className="flex items-center space-x-4 text-sm font-sans tracking-normal" aria-label="Main Navigation">
          <a
            href="#how-it-works"
            className="relative group px-2 py-1 text-[#1C1A16] font-semibold uppercase tracking-wider font-mono text-xs overflow-hidden transition-colors"
          >
            <span className="relative z-10 group-hover:text-[#EDE6D6] transition-colors duration-200">
              How It Works
            </span>
            <span className="absolute inset-0 bg-[#0B0B0A] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
          </a>

          <a
            href="#about"
            className="relative group px-2 py-1 text-[#1C1A16] font-semibold uppercase tracking-wider font-mono text-xs overflow-hidden transition-colors"
          >
            <span className="relative z-10 group-hover:text-[#EDE6D6] transition-colors duration-200">
              About
            </span>
            <span className="absolute inset-0 bg-[#0B0B0A] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
          </a>

          {session ? (
            <>
              <Link
                href="/dashboard"
                className="relative group px-2 py-1 text-[#1C1A16] font-semibold uppercase tracking-wider font-mono text-xs overflow-hidden transition-colors"
              >
                <span className="relative z-10 group-hover:text-[#EDE6D6] transition-colors duration-200">
                  Dashboard
                </span>
                <span className="absolute inset-0 bg-[#0B0B0A] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
              </Link>

              <div className="flex items-center space-x-3 border-l border-[#C9B896] pl-4">
                <span className="text-xs text-[#45566E] truncate max-w-[140px]">
                  User: <strong className="text-[#1C1A16]">{user?.username || user?.email}</strong>
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#A8332B] border border-[#A8332B] rounded-xs hover:bg-[#A8332B] hover:text-[#EDE6D6] transition-all transform hover:-rotate-1 active:scale-95 cursor-pointer"
                  aria-label="Sign out of account"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="relative group px-3 py-1.5 text-[#1C1A16] font-semibold uppercase tracking-wider font-mono text-xs overflow-hidden rounded-xs border border-[#1C1A16]/30 hover:border-[#1C1A16] transition-all"
              >
                <span className="relative z-10 group-hover:text-[#EDE6D6] transition-colors duration-200">
                  Login
                </span>
                <span className="absolute inset-0 bg-[#0B0B0A] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
              </Link>

              <Link href="/sign-up">
                <button
                  className="stamp-filled px-4 py-2 text-xs font-display font-bold uppercase tracking-wider text-[#EDE6D6] bg-[#A8332B] hover:bg-[#0B0B0A] rounded-xs transition-all transform hover:-rotate-1 active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Get your anonymous message link"
                >
                  Get Your Link
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
