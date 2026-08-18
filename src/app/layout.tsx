import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marvel Watch Tracker",
  description: "Acompanhe sua jornada pelo MCU",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#040714",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

import { auth } from "@/auth";
import { AudioPlayer } from "@/components/audio-player";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#040714] text-zinc-200 font-sans" suppressHydrationWarning>
        <Navbar user={session?.user} />
        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}
