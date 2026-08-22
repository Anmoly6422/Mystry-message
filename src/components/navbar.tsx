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
    <header className="sticky top-0 z-40 bg-[#EDE6D6]/95 backdrop-blur-sm border-b border-[#C9B896] shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left Branding: Red Dot + Folder Tab Wordmark */}
        <div className="flex items-center space-x-3">
          <span className="w-3 h-3 rounded-full bg-[#A8332B] shadow-[0_0_8px_rgba(168,51,43,0.6)] animate-pulse" />
          <Link
            href="/"
            className="flex items-baseline space-x-2 text-xl font-extrabold tracking-wider font-display text-[#1C1A16] uppercase hover:text-[#A8332B] transition-colors"
          >
            <span>MYSTERY_MESSAGES</span>
            <span className="text-xs font-mono text-[#A8332B] border border-[#A8332B] px-1 py-0.5 rounded-xs">
              DOSSIER #884
            </span>
          </Link>
        </div>

        {/* Right Navigation & Session Actions */}
        <nav className="flex items-center space-x-6 text-sm font-mono tracking-tight">
          <Link
            href="/"
            className="relative group py-1 text-[#1C1A16] font-semibold uppercase"
          >
            <span className="relative z-10 px-1 group-hover:text-[#EDE6D6] transition-colors duration-200">
              [EXHIBITS]
            </span>
            <span className="absolute inset-0 bg-[#0B0B0A] translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-0" />
          </Link>

          {session ? (
            <>
              <Link
                href="/dashboard"
                className="relative group py-1 text-[#1C1A16] font-semibold uppercase"
              >
                <span className="relative z-10 px-1 group-hover:text-[#EDE6D6] transition-colors duration-200">
                  [DASHBOARD]
                </span>
                <span className="absolute inset-0 bg-[#0B0B0A] translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-0" />
              </Link>

              <div className="flex items-center space-x-3 border-l border-[#C9B896] pl-4">
                <span className="text-xs text-[#45566E] uppercase truncate max-w-[140px]">
                  AGENT: <strong className="text-[#1C1A16]">{user?.username || user?.email}</strong>
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-1 text-xs font-display font-bold uppercase tracking-wider text-[#A8332B] border border-[#A8332B] rounded-xs hover:bg-[#A8332B] hover:text-[#EDE6D6] transition-all transform hover:-rotate-1 active:scale-95 cursor-pointer"
                >
                  LOGOUT
                </button>
              </div>
            </>
          ) : (
            <Link href="/sign-in">
              <button className="px-4 py-1.5 text-xs font-display font-bold uppercase tracking-wider text-[#EDE6D6] bg-[#A8332B] rounded-xs hover:bg-[#1C1A16] transition-all transform hover:-rotate-1 active:scale-95 cursor-pointer shadow-sm">
                STAMP & LOGIN
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
