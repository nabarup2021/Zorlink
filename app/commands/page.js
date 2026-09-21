'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, Grid2X2, Search } from 'lucide-react';
import { azeliaBrand, azeliaCommandCategories, azeliaCommands } from '../../lib/azelia-data';

const categoryLabels = {
  all: 'All',
  'music/core': 'Music Core',
  'music/queue': 'Queue',
  'music/extra': 'Music Extra',
  settings: 'Server Settings',
  playlists: 'Playlists',
  premium: 'Premium',
  information: 'Information',
  utility: 'Utility',
  soundcloud: 'SoundCloud',
  deezer: 'Deezer',
  Spotify: 'Spotify',
  genius: 'Genius',
  discogs: 'Discogs',
  musicbrainz: 'MusicBrainz',
  lastfm: 'Last.fm',
  'filters/free': 'Free Filters',
  'filters/premium': 'Premium Filters',
  fun: 'Fun',
  developer: 'Developer',
};

export default function CommandsPage() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(null);

  const filtered = useMemo(() => azeliaCommands.filter((command) => {
    const byCategory = category === 'all' || command.category === category;
    const q = query.trim().toLowerCase();
    const bySearch = !q || command.name.toLowerCase().includes(q) || command.description.toLowerCase().includes(q) || command.category.toLowerCase().includes(q);
    return byCategory && bySearch;
  }), [category, query]);

  const copy = async (name) => {
    await navigator.clipboard?.writeText(`${azeliaBrand.defaultPrefix}${name}`);
    setCopied(name);
    setTimeout(() => setCopied(null), 1600);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto py-6">
      <section className="text-center space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-300">Source-synced command catalog</p>
        <h1 className="text-4xl sm:text-5xl font-black text-white">Azelia Commands</h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-400">
          {azeliaCommands.length} command modules parsed from the current bot source tree, including prefix and slash capability metadata.
        </p>
      </section>

      <div className="grid lg:grid-cols-[230px_1fr] gap-6 items-start">
        <aside className="rounded-3xl border border-white/[0.06] bg-[#121019] p-4 space-y-2 lg:sticky lg:top-24">
          <div className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">Categories</div>
          <button onClick={() => setCategory('all')} className={`w-full rounded-2xl px-3 py-2.5 text-left text-xs font-bold ${category === 'all' ? 'bg-azelia-accent text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>All · {azeliaCommands.length}</button>
          {azeliaCommandCategories.map((item) => {
            const count = azeliaCommands.filter((c) => c.category === item).length;
            return (
              <button key={item} onClick={() => setCategory(item)} className={`w-full rounded-2xl px-3 py-2.5 text-left text-xs font-bold flex items-center justify-between gap-2 ${category === item ? 'bg-azelia-accent text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <span>{categoryLabels[item] || item}</span>
                <span className="text-[10px] opacity-70">{count}</span>
              </button>
            );
          })}
        </aside>

        <section className="space-y-5">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-500" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search commands, descriptions or categories..." className="w-full rounded-2xl border border-white/10 bg-[#121019] py-3.5 pl-11 pr-4 text-xs text-white outline-none focus:border-azelia-accent/60 placeholder:text-gray-600" />
          </div>

          <div className="text-xs text-gray-500">
            Showing <span className="text-gray-300 font-bold">{filtered.length}</span> of {azeliaCommands.length}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((command) => (
              <article key={`${command.category}-${command.name}`} className="rounded-3xl border border-white/[0.06] bg-[#121019] p-5 hover:border-azelia-accent/25 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-sm font-bold text-purple-300">{azeliaBrand.defaultPrefix}{command.name}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">{categoryLabels[command.category] || command.category}</div>
                  </div>
                  <button onClick={() => copy(command.name)} className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-500 hover:text-white">
                    {copied === command.name ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-gray-400">{command.description || 'No description provided by the command module.'}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-white/5 px-2 py-1 text-[10px] font-mono text-gray-500">{command.usage || command.name}</span>
                  {command.slash && <span className="rounded-lg bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-300">Slash enabled</span>}
                </div>
              </article>
            ))}
          </div>

          {!filtered.length && (
            <div className="rounded-3xl border border-dashed border-white/10 bg-[#121019] py-20 text-center text-sm text-gray-500">
              No command matched that search.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
