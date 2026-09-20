'use client';

import Link from 'next/link';
import { Check, Crown, Gift, Sparkles, Vote } from 'lucide-react';
import { azeliaFeatureMatrix, azeliaPremiumPlans } from '../../lib/azelia-data';

export default function PremiumPage() {
  return (
    <div className="space-y-14 max-w-6xl mx-auto py-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-azelia-accent/20 bg-[#120d1c] p-8 sm:p-12">
        <img src="/azelia-premium-banner.gif" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120d1c] via-[#120d1ccc] to-transparent" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-azelia-accent/25 bg-azelia-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-200">
            <Crown className="h-3.5 w-3.5" /> Azelia Premium
          </div>
          <h1 className="mt-5 max-w-2xl text-4xl sm:text-5xl font-black text-white">Premium without fictional tiers.</h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-300">
            The website pricing and capability map are synced to the current bot’s premium commands and PremiumTiers matrix.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {azeliaPremiumPlans.map((plan) => (
          <article key={plan.name} className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6 flex flex-col">
            <div className="flex items-center gap-2 text-purple-300">
              {plan.name === 'Vote Premium' ? <Vote className="h-5 w-5" /> : plan.name === 'No-Prefix' ? <Gift className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
              <span className="text-[10px] font-bold uppercase tracking-wider">{plan.scope}</span>
            </div>
            <h2 className="mt-5 text-xl font-black text-white">{plan.name}</h2>
            <div className="mt-2 text-2xl font-black text-purple-200">{plan.price}</div>
            <p className="mt-3 text-xs leading-relaxed text-gray-500 flex-1">{plan.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-white/[0.06] bg-[#121019] overflow-hidden">
        <div className="p-6 border-b border-white/[0.06]">
          <h2 className="text-xl font-black text-white">Free vs Premium</h2>
          <p className="mt-1 text-xs text-gray-500">Exact current limits from the bot feature matrix.</p>
        </div>
        <div className="grid md:grid-cols-2">
          {Object.entries(azeliaFeatureMatrix).map(([tier, values]) => (
            <div key={tier} className="p-6 border-b md:border-b-0 border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${tier === 'Premium' ? 'bg-azelia-accent/10 text-purple-300' : 'bg-white/5 text-gray-400'}`}>
                  {tier === 'Premium' ? <Crown className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                </div>
                <h3 className="text-lg font-black text-white">{tier}</h3>
              </div>
              <div className="mt-5 space-y-2.5">
                {Object.entries(values).map(([name, value]) => (
                  <div key={name} className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.02] px-3 py-2.5">
                    <span className="text-xs text-gray-400">{name}</span>
                    <span className="text-xs font-bold text-white">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-azelia-accent/20 bg-azelia-accent/5 p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-purple-300 text-sm font-bold">
            <Sparkles className="h-4 w-4" /> Premium controls
          </div>
          <h2 className="mt-2 text-2xl font-black text-white">Manage server settings from the dashboard</h2>
          <p className="mt-2 text-sm text-gray-400">Use the server dashboard for prefix, 24/7, volume, DJ role and request-channel controls.</p>
        </div>
        <Link href="/servers" className="inline-flex items-center justify-center rounded-2xl bg-azelia-accent px-5 py-3 text-sm font-extrabold text-white shadow-xl shadow-azelia-accent/20">
          Open Servers
        </Link>
      </section>
    </div>
  );
}
