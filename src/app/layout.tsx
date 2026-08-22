import type { Metadata } from "next";
import AuthProvider from "@/context/AuthProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import DustParticles from "@/components/DustParticles";
import './globals.css';

export const metadata: Metadata = {
  title: "Mystery_Messages — Classified Case File & Anonymous Feedback",
  description: "Investigate, file, and analyze confidential witness statements with complete anonymity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased")}
    >
      <AuthProvider>
        <body className="min-h-full bg-[#EDE6D6] text-[#1C1A16] font-serif relative selection:bg-[#A8332B] selection:text-[#EDE6D6]">
          {/* Full-page Paper Grain Texture Overlay */}
          <div
            className="fixed inset-0 pointer-events-none z-50 bg-paper-grain opacity-60 mix-blend-multiply"
            aria-hidden="true"
          />

          {/* Ambient Desk Lamp Spotlight Layer */}
          <div
            className="fixed -top-40 -left-40 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-[radial-gradient(circle,_rgba(255,245,215,0.45)_0%,_rgba(201,184,150,0.15)_50%,_transparent_75%)] pointer-events-none z-0 mix-blend-soft-light animate-spotlight motion-reduce:hidden"
            aria-hidden="true"
          />

          {/* Drifting Paper-Fleck Dust Particles */}
          <DustParticles />

          {/* Application Main Wrapper */}
          <div className="relative z-20 flex flex-col min-h-screen">
            {children}
          </div>

          <Toaster toastOptions={{
            style: {
              backgroundColor: '#0B0B0A',
              color: '#EDE6D6',
              border: '1px solid #A8332B',
              fontFamily: 'var(--font-mono), monospace',
            }
          }} />
        </body>
      </AuthProvider>
    </html>
  );
}
