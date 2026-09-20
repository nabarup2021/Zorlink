'use client';

import Link from 'next/link';
import { ArrowRight, Bot, ChevronRight, Crown, Disc3, Headphones, ListMusic, Radio, ShieldCheck, Sparkles, Waves, Zap } from 'lucide-react';
import { azeliaBrand, azeliaCommandCategories, azeliaCommands, azeliaFilters, azeliaProviders } from '../lib/azelia-data';

const stats = [
  { value: azeliaCommands.length, label: 'Loaded command modules', icon: Zap },
  { value: azeliaFilters.length, label: 'Audio filters', icon: Waves },
  { value: azeliaProviders.length, label: 'Resolver providers', icon: Radio },
  { value: '24/7', label: 'Voice mode support', icon: Headphones },
];

const highlights = [
  {
    title: 'Universal Music Resolver',
    description: 'Azelia routes music through its resolver stack with YouTube, Spotify, SoundCloud, Deezer, Tidal, Apple Music, Bandcamp and generic URL handling.',
    icon: Disc3,
  },
  {
    title: 'Discord-Native Player',
    description: 'Queue control, seek, loop, autoplay, previous-track recovery, volume, filters and voice lifecycle are backed by the canonical music player service.',
    icon: Headphones,
  },
  {
    title: 'Server Controls',
    description: 'Prefix, 24/7 mode, DJ role, request channels and other guild controls map to Azelia’s actual settings layer.',
    icon: ShieldCheck,
  },
  {
    title: 'Premium System',
    description: 'User Premium, Guild Premium and No-Prefix are exposed through the same feature model used by the bot.',
    icon: Crown,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-24 py-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#110d1a] shadow-2xl">
        <img src="/azelia-banner.png" alt="Azelia banner" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090d] via-[#09090dcc] to-transparent" />
        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-10 p-8 sm:p-12 lg:p-16 items-end min-h-[540px]">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-azelia-accent/30 bg-azelia-accent/10 px-4 py-2 text-xs font-bold text-purple-200">
              <Sparkles className="h-4 w-4 text-azelia-accent" />
              {azeliaBrand.developer}
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-purple-300">Advanced Discord Music System</p>
              <h1 className="max-w-3xl text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white">
                Meet <span className="text-azelia-accent">Azelia</span>
              </h1>
              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-gray-300">
                A music-first Discord bot built around Lavalink, a universal resolver, rich queue controls, deep audio filters and a production-focused premium system.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/player" className="inline-flex items-center gap-2 rounded-2xl bg-azelia-accent px-5 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-azelia-accent/25 hover:scale-[1.02] transition-transform">
                Open Web Player <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/commands" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors">
                Explore Commands <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl p-5">
                  <Icon className="mb-8 h-5 w-5 text-purple-300" />
                  <div className="text-2xl font-black text-white">{item.value}</div>
                  <div className="mt-1 text-xs leading-relaxed text-gray-400">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-300">Built around the real bot</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Not a generic music template</h2>
          <p className="text-sm sm:text-base leading-relaxed text-gray-400">
            The dashboard vocabulary, command catalog and premium feature model here are generated from the current Azelia source tree instead of inventing a second product by accident.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-3xl border border-white/[0.07] bg-[#121019] p-6 sm:p-7 hover:border-azelia-accent/25 hover:bg-[#171220] transition-all">
                <div className="h-11 w-11 rounded-2xl bg-azelia-accent/10 text-purple-300 flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch">
        <div className="rounded-3xl border border-white/[0.07] bg-[#121019] p-7">
          <div className="flex items-center gap-3">
            <Bot className="h-5 w-5 text-purple-300" />
            <h2 className="text-xl font-black text-white">Resolver stack</h2>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {azeliaProviders.map((provider) => (
              <div key={provider.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
                <div className="text-sm font-bold text-white">{provider.name}</div>
                <div className="mt-1 text-[11px] text-gray-500">{provider.kind}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-azelia-accent/20 bg-gradient-to-br from-azelia-accent/10 via-[#121019] to-[#121019] p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <ListMusic className="h-5 w-5 text-purple-300" />
              <h2 className="text-xl font-black text-white">Command surface</h2>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">
              Music control is only the center of the system. The current source also includes playlists, premium, information, settings, provider-specific tools, Last.fm and a large filter catalog.
            </p>
          </div>
          <Link href="/commands" className="mt-7 inline-flex w-fit items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-xs font-bold text-white hover:bg-white/10">
            Browse all {azeliaCommands.length} command modules <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-[#121019] p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-purple-300">
            <Sparkles className="h-4 w-4" /> ZorveX Development
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">Azelia is the product. The website should behave like it.</h2>
          <p className="mt-2 text-sm text-gray-400">No invented tiers, fake command lists or unrelated product labels.</p>
        </div>
        <Link href="/features" className="inline-flex items-center gap-2 rounded-2xl bg-azelia-accent px-5 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-azelia-accent/20">
          See the feature map <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
