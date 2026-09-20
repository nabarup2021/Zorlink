'use client';

import { Copy, Crown, Users } from 'lucide-react';
import { azeliaTeam } from '../../lib/azelia-data';
import { useState } from 'react';

export default function TeamPage() {
  const [copied, setCopied] = useState(null);

  const copyId = async (id) => {
    await navigator.clipboard?.writeText(id);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-6">
      <section className="text-center space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-300">ZorveX Development</p>
        <h1 className="text-4xl sm:text-5xl font-black text-white">Azelia Team</h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-400">Team records synchronized from the current Azelia team configuration.</p>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {azeliaTeam.map((member) => (
          <article key={member.id} className="rounded-3xl border border-white/[0.06] bg-[#121019] overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-azelia-accent/30 via-purple-500/10 to-transparent" />
            <div className="p-6 -mt-10">
              <img src="/azelia-pfp.gif" alt="" className="h-20 w-20 rounded-2xl object-cover ring-4 ring-[#121019] shadow-2xl" />
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black text-white">{member.name}</h2>
                  <p className="mt-1 text-xs font-bold text-purple-300">{member.role}</p>
                </div>
                <Crown className="h-4 w-4 text-purple-300" />
              </div>
              <p className="mt-4 text-xs leading-relaxed text-gray-500">Discord identity synchronized from Azelia team configuration.</p>
              <button onClick={() => copyId(member.id)} className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-[11px] font-mono text-gray-400 hover:text-white">
                {copied === member.id ? 'Copied' : `${member.id} · Copy ID`}
                <Copy className="inline-block ml-2 h-3.5 w-3.5" />
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6 flex items-center gap-4">
        <Users className="h-5 w-5 text-purple-300" />
        <div>
          <div className="text-sm font-black text-white">{azeliaTeam.length} configured team members</div>
          <div className="text-xs text-gray-500">Source: src/config/team.json</div>
        </div>
      </section>
    </div>
  );
}
