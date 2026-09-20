import Link from 'next/link';
import { ChevronRight, CircleHelp, Headphones, ShieldCheck } from 'lucide-react';

const faq = [
  {
    q: 'What is Azelia?',
    a: 'Azelia is an advanced Discord music system built around Discord.js, Lavalink and a universal resolver. The current source includes music playback, queue controls, filters, playlists, premium features and provider-specific commands.',
  },
  {
    q: 'Which music sources does Azelia support?',
    a: 'The resolver stack contains YouTube, Spotify, SoundCloud, Deezer, Tidal, Apple Music, Bandcamp and a generic provider path. Provider-specific commands also exist for SoundCloud, Deezer and Spotify workflows.',
  },
  {
    q: 'Does Azelia support 24/7 mode?',
    a: 'Yes. The guild store includes stay_247 settings and the bot provides a stay247 command for persistent voice sessions.',
  },
  {
    q: 'Can I control Azelia from the dashboard?',
    a: 'The dashboard can expose guild settings and player controls when an Azelia HTTP telemetry/control bridge is configured. The website does not fabricate live bot state when that bridge is unavailable.',
  },
  {
    q: 'What is included in Premium?',
    a: 'The current PremiumTiers matrix adds unlimited queue and playlist capacity, higher volume limits, lyrics, autoplay, premium filters, custom profiles, premium cards, reduced cooldowns and priority support.',
  },
  {
    q: 'How does Premium pricing work?',
    a: 'The current premium pricing command lists No-Prefix at ₹19/month, User Premium at ₹49/month, Guild Premium at ₹99/month and a two-hour vote-based User Premium option.',
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-12">
      <section className="text-center space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-300">Azelia knowledge base</p>
        <h1 className="text-4xl sm:text-5xl font-black text-white">Frequently Asked Questions</h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-400">Answers are aligned to the current source archive rather than old dashboard marketing copy.</p>
      </section>

      <section className="space-y-3">
        {faq.map((item) => (
          <details key={item.q} className="group rounded-3xl border border-white/[0.06] bg-[#121019] overflow-hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 text-sm font-bold text-white">
              <span className="flex items-center gap-3"><CircleHelp className="h-4 w-4 text-purple-300" />{item.q}</span>
              <ChevronRight className="h-4 w-4 text-gray-600 transition-transform group-open:rotate-90" />
            </summary>
            <div className="border-t border-white/[0.05] px-6 py-5 text-sm leading-relaxed text-gray-400">{item.a}</div>
          </details>
        ))}
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <Link href="/features" className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6 hover:border-azelia-accent/25">
          <Headphones className="h-5 w-5 text-purple-300" />
          <h2 className="mt-4 text-base font-black text-white">Feature map</h2>
          <p className="mt-2 text-xs leading-relaxed text-gray-500">Inspect the resolver, Lavalink, filters and PremiumTiers model.</p>
        </Link>
        <Link href="/servers" className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6 hover:border-azelia-accent/25">
          <ShieldCheck className="h-5 w-5 text-purple-300" />
          <h2 className="mt-4 text-base font-black text-white">Server dashboard</h2>
          <p className="mt-2 text-xs leading-relaxed text-gray-500">Manage eligible guild settings and player state through the configured bridge.</p>
        </Link>
      </section>
    </div>
  );
}
