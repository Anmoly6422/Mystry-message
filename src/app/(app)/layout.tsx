import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";


const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mystery Messages — Anonymous Feedback & Inboxes",
  description: "Get honest, anonymous messages from friends, coworkers, or followers. Create your free inbox link and start receiving private feedback in 30 seconds.",
  openGraph: {
    title: "Mystery Messages — Anonymous Feedback & Inboxes",
    description: "Get honest, anonymous messages from friends, coworkers, or followers — no account needed to send, just a link to share.",
    type: "website",
    url: "https://mystry-messages-drab.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mystery Messages — Anonymous Feedback & Inboxes",
    description: "Get honest, anonymous messages from friends, coworkers, or followers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <
    >
      
        < >
          <Navbar/>
          {children}
        </>
   
      
    </>
  );
}
