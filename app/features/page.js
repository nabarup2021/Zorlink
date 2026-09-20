import { AudioLines, Database, Disc3, Filter, Gauge, GitBranch, ListMusic, Radio, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { azeliaFeatureMatrix, azeliaFilters, azeliaMetadataIntegrations, azeliaProviders } from '../../lib/azelia-data';

const systems = [
  { title: 'Universal Resolver', icon: GitBranch, text: 'Multi-stage metadata and provider resolution across direct URLs, search fallback and metadata extraction.' },
  { title: 'Lavalink Audio Core', icon: AudioLines, text: 'Canonical music player service with node balancing, voice connection lifecycle, queue operations and playback controls.' },
  { title: 'Queue Engine', icon: ListMusic, text: 'Add, remove, move, shuffle, bump, previous-track history, loop modes and autoplay-aware skip behavior.' },
  { title: 'PremiumTiers', icon: Sparkles, text: 'The same free/premium feature matrix used by the bot for limits, filters, autoplay, lyrics and premium UI features.' },
  { title: 'Local Data Layer', icon: Database, text: 'Persistent guild, user, premium, playlists, liked songs, profile and credit stores backed by the bot’s .bread database layer.' },
  { title: 'Operational Monitoring', icon: Gauge, text: 'Live dashboard and log health components track nodes, players, gateway health, API calls, cache behavior and operational events.' },
];

export default function FeaturesPage() {
  return (
    <div className="space-y-16 max-w-6xl mx-auto py-6">
      <section className="text-center space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-300">Azelia architecture</p>
        <h1 className="text-4xl sm:text-5xl font-black text-white">Everything actually in the bot</h1>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-400">
          This feature map follows the current source archive instead of borrowing generic claims from a random music-bot landing page.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {systems.map((system) => {
          const Icon = system.icon;
          return (
            <article key={system.title} className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6">
              <div className="h-11 w-11 rounded-2xl bg-azelia-accent/10 text-purple-300 flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-base font-extrabold text-white">{system.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{system.text}</p>
            </article>
          );
        })}
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6">
          <div className="flex items-center gap-3">
            <Radio className="h-5 w-5 text-purple-300" />
            <h2 className="text-xl font-black text-white">Music sources</h2>
          </div>
          <div className="mt-5 space-y-3">
            {azeliaProviders.map((provider) => (
              <div key={provider.id} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-white">{provider.name}</span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-600">{provider.kind}</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{provider.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6">
          <div className="flex items-center gap-3">
            <Disc3 className="h-5 w-5 text-purple-300" />
            <h2 className="text-xl font-black text-white">Metadata & discovery</h2>
          </div>
          <div className="mt-5 space-y-3">
            {azeliaMetadataIntegrations.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                <div className="text-sm font-bold text-white">{item.name}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/[0.06] bg-[#121019] overflow-hidden">
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-purple-300" />
            <div>
              <h2 className="text-xl font-black text-white">PremiumTiers feature matrix</h2>
              <p className="mt-1 text-xs text-gray-500">Values below are taken from the current PremiumTiers source.</p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2">
          {Object.entries(azeliaFeatureMatrix).map(([tier, values]) => (
            <div key={tier} className="p-6 border-b md:border-b-0 border-white/[0.06]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">{tier}</h3>
                <span className="rounded-full bg-azelia-accent/10 px-3 py-1 text-[10px] font-bold text-purple-300">{tier === 'Free' ? 'Base' : 'Premium'}</span>
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

      <section className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-purple-300" />
          <h2 className="text-xl font-black text-white">Audio filter catalog</h2>
          <span className="text-xs text-gray-500">{azeliaFilters.length} named filters</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {azeliaFilters.map((filter) => (
            <span key={filter.name} className={`rounded-xl border px-3 py-2 text-[11px] font-mono ${filter.tier === 'premium' ? 'border-azelia-accent/20 bg-azelia-accent/10 text-purple-200' : 'border-white/[0.06] bg-white/[0.02] text-gray-400'}`}>
              {filter.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
