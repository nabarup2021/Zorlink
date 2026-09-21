'use client';

import Link from 'next/link';
import { Heart, Sparkles, MessageSquare, ExternalLink, ShieldCheck, Music, Terminal, Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0e0c15] text-gray-400 text-xs py-14 px-6 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <img src="/azelia-pfp.png" alt="Azelia" className="w-9 h-9 rounded-full object-cover ring-2 ring-azelia-accent/40" />
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-0.5">
                Azelia
              </span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              The premier high-fidelity Discord music bot. Uninterrupted 24/7 playback, Spotify & YouTube integration, real-time web controller, and lossless Lavalink audio streaming.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3ba55c]/10 text-[#3ba55c] border border-[#3ba55c]/20 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3ba55c] animate-pulse"></span>
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/commands" className="hover:text-white transition-colors">Commands</Link></li>
              <li><Link href="/top-songs" className="hover:text-white transition-colors">Top Songs</Link></li>
              <li><Link href="/status" className="hover:text-white transition-colors">System Status</Link></li>
              <li><Link href="/premium" className="text-azelia-gold hover:brightness-110 transition-colors flex items-center gap-1">Premium Perks <Sparkles className="w-3 h-3 text-azelia-gold" /></Link></li>
            </ul>
          </div>

          {/* Community & Team */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Community</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/team" className="hover:text-white transition-colors">Meet the Team</Link></li>
              <li>
                <a href="https://discord.gg/BD4zjEh9Qr" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Support Server <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://discordbotlist.com/bots/azelia/upvote" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Vote on DiscordBotList <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ & Guides</Link></li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Overview</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-medium">
          <div>
            © {new Date().getFullYear()} Azelia. All rights reserved. Not affiliated with Discord Inc.
          </div>
          <div className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-current mx-0.5" /> by <Link href="/team" className="text-white hover:text-azelia-accent font-semibold ml-0.5">LO & Team</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
