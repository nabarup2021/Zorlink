'use client';

import './globals.css';
import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalMusicBar from '../components/GlobalMusicBar';
import WebAudioEngine from '../components/WebAudioEngine';
import ScrollReveal from '../components/ScrollReveal';
import { AuthProvider } from '../lib/auth';
import { MusicProvider } from '../lib/music';

function LayoutContent({ children }) {
  const pathname = usePathname();
  const isPlayerPage = pathname === '/player';

  if (isPlayerPage) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-[#0a0812] text-white flex flex-col font-sans antialiased">
        <main className="flex-1 overflow-hidden">{children}</main>
        <WebAudioEngine />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0e0c15] text-white font-sans antialiased selection:bg-azelia-accent selection:text-white">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 pb-32">
        {children}
      </main>
      <Footer />
      <GlobalMusicBar />
      <WebAudioEngine />
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/azelia-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/azelia-pfp.png" />
        <title>Azelia — Next-Gen Discord Music Bot & Web Player</title>
        <meta
          name="description"
          content="Ultra-high quality 24/7 lossless music streaming, Spotify & Apple Music web player, and Discord dashboard for Azelia"
        />
      </head>
      <body className="bg-[#0a0812] text-white antialiased overflow-x-hidden">
        <ScrollReveal />
        <AuthProvider>
          <MusicProvider>
            <LayoutContent>{children}</LayoutContent>
          </MusicProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
