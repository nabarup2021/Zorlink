'use client';

import { useEffect, useState } from 'react';
import { Activity, CheckCircle2, Database, Gauge, Globe2, HardDrive, Radio, RefreshCw, Server, Users, Wifi } from 'lucide-react';
import { api } from '../../lib/api';

function value(data, path, fallback = '—') {
  let current = data;
  for (const part of path.split('.')) current = current?.[part];
  return current ?? fallback;
}

function formatUptime(seconds) {
  if (!seconds) return '—';
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${d ? `${d}d ` : ''}${h ? `${h}h ` : ''}${m}m`.trim();
}

export default function StatusPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bridgeError, setBridgeError] = useState(null);
  const [updated, setUpdated] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminStats();
      setStats(data);
      setBridgeError(null);
      setUpdated(new Date());
    } catch (error) {
      setStats(null);
      setBridgeError(error.message || 'Azelia telemetry bridge unavailable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const timer = setInterval(load, 30000);
    return () => clearInterval(timer);
  }, []);

  const nodes = stats?.nodes || stats?.lavalink?.nodes || [];
  const shards = stats?.shards || [];

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-12">
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-300">Azelia operations</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white">System Status</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">
            This page consumes the optional Azelia telemetry bridge. It does not invent live values when the bot backend is not connected.
          </p>
        </div>
        <button onClick={load} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-gray-300 hover:text-white">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </section>

      {bridgeError && (
        <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6">
          <div className="flex items-center gap-3 text-amber-300">
            <Activity className="h-5 w-5" />
            <span className="text-sm font-black">Telemetry bridge not connected</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-gray-500">{bridgeError}. Configure AZELIA_API_HOST for live metrics.</p>
        </div>
      )}

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ['Guilds', value(stats, 'bot.guilds', value(stats, 'guilds')), Globe2],
          ['Users', value(stats, 'bot.users', value(stats, 'users')), Users],
          ['Active Players', value(stats, 'bot.activePlayers', value(stats, 'players', 0)), Radio],
          ['Gateway Ping', value(stats, 'bot.wsPing', value(stats, 'ping')), Wifi],
        ].map(([label, val, Icon]) => (
          <div key={label} className="rounded-3xl border border-white/[0.06] bg-[#121019] p-5">
            <Icon className="h-5 w-5 text-purple-300" />
            <div className="mt-6 text-[10px] uppercase tracking-wider text-gray-600">{label}</div>
            <div className="mt-1 text-2xl font-black text-white">{typeof val === 'number' ? val.toLocaleString() : val}{label === 'Gateway Ping' && typeof val === 'number' ? 'ms' : ''}</div>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6">
          <div className="flex items-center gap-3">
            <Server className="h-5 w-5 text-purple-300" />
            <div>
              <h2 className="text-lg font-black text-white">Azelia runtime</h2>
              <p className="text-xs text-gray-600">Discord.js + Lavalink architecture</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {[
              ['Uptime', formatUptime(value(stats, 'system.uptimeSeconds', value(stats, 'uptimeSeconds', 0)))],
              ['Shards', value(stats, 'bot.shards', value(stats, 'shards'))],
              ['Memory RSS', value(stats, 'system.memory.rss', value(stats, 'rss'))],
              ['Heap', value(stats, 'system.memory.heap', value(stats, 'heap'))],
              ['Commands', value(stats, 'bot.commandsCount', value(stats, 'totalCmds'))],
              ['Songs', value(stats, 'bot.totalSongs', value(stats, 'totalSongs'))],
            ].map(([label, val]) => (
              <div key={label} className="flex items-center justify-between gap-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] px-4 py-3">
                <span className="text-xs text-gray-500">{label}</span>
                <span className="text-xs font-bold text-white">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6">
          <div className="flex items-center gap-3">
            <HardDrive className="h-5 w-5 text-purple-300" />
            <div>
              <h2 className="text-lg font-black text-white">Data & telemetry</h2>
              <p className="text-xs text-gray-600">Runtime signals exposed by the live dashboard model</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {[
              ['Queue backlog', value(stats, 'bot.totalQueued', value(stats, 'totalQueued'))],
              ['Songs today', value(stats, 'bot.songsToday', value(stats, 'songsToday'))],
              ['Commands today', value(stats, 'bot.cmdsToday', value(stats, 'cmdsToday'))],
              ['Resolver requests', value(stats, 'bot.resolverReqs', value(stats, 'resolverReqs'))],
              ['API calls', value(stats, 'bot.apiCalls', value(stats, 'apiCalls'))],
              ['Cache hit rate', value(stats, 'bot.cacheRate', value(stats, 'cacheRate'))],
            ].map(([label, val]) => (
              <div key={label} className="flex items-center justify-between gap-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] px-4 py-3">
                <span className="text-xs text-gray-500">{label}</span>
                <span className="text-xs font-bold text-white">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6">
        <div className="flex items-center gap-3">
          <Database className="h-5 w-5 text-purple-300" />
          <div>
            <h2 className="text-lg font-black text-white">Lavalink nodes</h2>
            <p className="text-xs text-gray-600">{nodes.length ? `${nodes.filter((n) => n.connected !== false).length}/${nodes.length} currently reported online` : 'No live node telemetry reported'}</p>
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {nodes.map((node, index) => (
            <div key={node.id || index} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`h-4 w-4 ${node.connected === false ? 'text-red-400' : 'text-emerald-400'}`} />
                <span className="text-sm font-bold text-white truncate">{node.id || `Node ${index + 1}`}</span>
              </div>
              <div className="mt-3 text-[11px] text-gray-600">Players {node.players ?? '—'} · Ping {node.ping ?? node.ws?.ping ?? '—'}ms</div>
            </div>
          ))}
          {!nodes.length && <div className="col-span-full rounded-2xl border border-dashed border-white/10 p-10 text-center text-xs text-gray-600">Connect the Azelia telemetry bridge to populate live Lavalink node state.</div>}
        </div>
      </section>

      {updated && <div className="text-center text-[10px] text-gray-700">Last refreshed {updated.toLocaleTimeString()}</div>}

      <section className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6">
        <div className="flex items-center gap-3">
          <Gauge className="h-5 w-5 text-purple-300" />
          <div>
            <h2 className="text-lg font-black text-white">Discord shards</h2>
            <p className="text-xs text-gray-600">{shards.length ? `${shards.length} telemetry entries` : 'Shard telemetry will appear when the bridge exposes shard data.'}</p>
          </div>
        </div>
        {shards.length > 0 && (
          <div className="mt-5 grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-2">
            {shards.map((shard) => (
              <div key={shard.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                <div className="text-[10px] font-mono text-white">#{shard.id}</div>
                <div className={`mx-auto mt-2 h-1.5 w-1.5 rounded-full ${shard.status === 'operational' || shard.status === undefined ? 'bg-emerald-400' : 'bg-red-400'}`} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
