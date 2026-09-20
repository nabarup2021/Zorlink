'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  AlertCircle, ArrowLeft, Check, ChevronDown, Disc3, ListMusic, Pause, Play,
  Radio, RefreshCw, Save, Settings2, ShieldAlert, SkipForward, Square, Volume2
} from 'lucide-react';
import { api } from '../../../lib/api';
import { useAuth } from '../../../lib/auth';
import { SUPERUSER_IDS } from '../../../lib/config';
import { azeliaFilters } from '../../../lib/azelia-data';

const defaultConfig = {
  prefix: '.',
  stay247: false,
  defaultVolume: 100,
  djRoleId: '',
  requestChannelId: '',
  autoplay: false,
  listenAlong: false,
  gameModeDj: false,
  joinGateEnabled: false,
};

export default function ServerDashboardPage() {
  const { guildId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [guildInfo, setGuildInfo] = useState(null);
  const [player, setPlayer] = useState(null);
  const [config, setConfig] = useState(defaultConfig);
  const [activeFilter, setActiveFilter] = useState('clear');
  const [tab, setTab] = useState('settings');
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const load = async () => {
    if (!guildId || !user) return;
    setLoading(true);
    try {
      const owner = SUPERUSER_IDS.includes(user.id);
      const ownGuild = user.guilds?.find((g) => g.id === guildId);
      const authData = ownGuild ? null : await api.authUser(user.id).catch(() => null);
      const guild = ownGuild || authData?.guilds?.find((g) => g.id === guildId) || null;
      const access = Boolean(owner || guild?.isOwner || guild?.isAdmin || guild?.permissions?.manageGuild);
      setGuildInfo(guild);
      setAllowed(access);

      if (!access) return;

      const [playerData, configData] = await Promise.all([
        api.getGuildPlayer(guildId).catch(() => null),
        api.getGuildConfig(guildId).catch(() => null),
      ]);

      if (playerData) {
        setPlayer(playerData);
        setActiveFilter(playerData.filter || 'clear');
      }

      const raw = configData?.config || {};
      setConfig({
        prefix: raw.prefixes?.[0] || raw.prefix || '.',
        stay247: Boolean(raw.stay247 ?? raw.twentyFourSeven),
        defaultVolume: Number(raw.defaultVolume ?? 100),
        djRoleId: raw.djRoleId || raw.dj_role_id || '',
        requestChannelId: raw.requestChannelId || raw.requestChannel || raw.request_channel_id || '',
        autoplay: Boolean(raw.autoplay),
        listenAlong: Boolean(raw.listenAlong),
        gameModeDj: Boolean(raw.gameModeDj),
        joinGateEnabled: Boolean(raw.joinGateEnabled),
      });
    } catch (error) {
      setAllowed(false);
      setMessage({ type: 'error', text: error.message || 'Failed to load server state.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) load();
  }, [guildId, user, authLoading]);

  useEffect(() => {
    if (!guildId || allowed !== true) return;
    const timer = setInterval(async () => {
      const state = await api.getGuildPlayer(guildId).catch(() => null);
      if (state) {
        setPlayer(state);
        setActiveFilter(state.filter || 'clear');
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [guildId, allowed]);

  const saveConfig = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const result = await api.updateGuildConfig(guildId, {
        prefix: config.prefix,
        stay247: config.stay247,
        defaultVolume: Number(config.defaultVolume),
        djRoleId: config.djRoleId || null,
        requestChannelId: config.requestChannelId || null,
        autoplay: config.autoplay,
        listenAlong: config.listenAlong,
        gameModeDj: config.gameModeDj,
        joinGateEnabled: config.joinGateEnabled,
      });
      const raw = result?.config;
      if (raw) {
        setConfig((prev) => ({
          ...prev,
          prefix: raw.prefixes?.[0] || raw.prefix || prev.prefix,
          stay247: Boolean(raw.stay247 ?? raw.twentyFourSeven ?? prev.stay247),
          defaultVolume: Number(raw.defaultVolume ?? prev.defaultVolume),
          djRoleId: raw.djRoleId || raw.dj_role_id || prev.djRoleId,
          requestChannelId: raw.requestChannelId || raw.requestChannel || raw.request_channel_id || prev.requestChannelId,
        }));
      }
      setMessage({ type: 'success', text: 'Azelia server configuration synchronized.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Configuration update failed.' });
    } finally {
      setSaving(false);
    }
  };

  const action = async (fn, successText) => {
    try {
      await fn();
      setMessage({ type: 'success', text: successText });
      const state = await api.getGuildPlayer(guildId).catch(() => null);
      if (state) setPlayer(state);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Player action failed.' });
    }
  };

  const current = player?.currentTrack;
  const queue = player?.queue || [];
  const progress = current?.duration ? Math.min(100, ((player?.position || 0) / current.duration) * 100) : 0;

  const availableFilters = useMemo(
    () => [{ name: 'clear', tier: 'free' }, ...azeliaFilters],
    []
  );

  if (authLoading || loading) {
    return <div className="max-w-5xl mx-auto py-16 text-center text-sm text-gray-500 animate-pulse">Loading Azelia server state...</div>;
  }

  if (allowed === false) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-5">
        <div className="mx-auto h-16 w-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400"><ShieldAlert className="h-7 w-7" /></div>
        <h1 className="text-2xl font-black text-white">Access denied</h1>
        <p className="text-sm text-gray-500">Azelia only exposes server controls to owners or users with the required management permissions.</p>
        <Link href="/servers" className="inline-flex items-center gap-2 rounded-2xl bg-azelia-accent px-5 py-3 text-xs font-bold text-white"><ArrowLeft className="h-4 w-4" /> Back to Servers</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-5 space-y-7">
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <img src={guildInfo?.icon || '/azelia-pfp.gif'} alt="" className="h-14 w-14 rounded-2xl object-cover ring-2 ring-white/10" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{guildInfo?.name || `Server ${guildId}`}</h1>
            <p className="mt-1 text-xs text-gray-500 font-mono">{guildId} · Azelia Control Center</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-gray-300 hover:text-white"><RefreshCw className="h-4 w-4" /> Refresh</button>
          <Link href="/servers" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-gray-300 hover:text-white"><ArrowLeft className="h-4 w-4" /> Servers</Link>
        </div>
      </section>

      {message && (
        <div className={`rounded-2xl border px-4 py-3 text-xs font-semibold flex items-center gap-2 ${message.type === 'error' ? 'border-red-500/20 bg-red-500/10 text-red-300' : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'}`}>
          {message.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}
          {message.text}
        </div>
      )}

      <div className="grid sm:grid-cols-4 gap-3">
        {[
          ['Queue', queue.length, ListMusic],
          ['Volume', `${player?.volume ?? config.defaultVolume}%`, Volume2],
          ['Filter', activeFilter, Settings2],
          ['Voice', player?.voiceChannelId ? 'Connected' : 'Idle', Radio],
        ].map(([label, value, Icon]) => (
          <div key={label} className="rounded-2xl border border-white/[0.06] bg-[#121019] p-4">
            <Icon className="h-4 w-4 text-purple-300" />
            <div className="mt-3 text-[10px] uppercase tracking-wider text-gray-600">{label}</div>
            <div className="mt-1 text-sm font-black text-white truncate">{value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 border-b border-white/[0.06] pb-3">
        <button onClick={() => setTab('settings')} className={`rounded-2xl px-4 py-2.5 text-xs font-bold ${tab === 'settings' ? 'bg-azelia-accent text-white' : 'text-gray-400 hover:bg-white/5'}`}><Settings2 className="inline h-4 w-4 mr-2" />Settings</button>
        <button onClick={() => setTab('player')} className={`rounded-2xl px-4 py-2.5 text-xs font-bold ${tab === 'player' ? 'bg-azelia-accent text-white' : 'text-gray-400 hover:bg-white/5'}`}><Disc3 className="inline h-4 w-4 mr-2" />Player</button>
        <button onClick={() => setTab('queue')} className={`rounded-2xl px-4 py-2.5 text-xs font-bold ${tab === 'queue' ? 'bg-azelia-accent text-white' : 'text-gray-400 hover:bg-white/5'}`}><ListMusic className="inline h-4 w-4 mr-2" />Queue</button>
      </div>

      {tab === 'settings' && (
        <section className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6 sm:p-8 space-y-7">
          <div>
            <h2 className="text-xl font-black text-white">Azelia Guild Settings</h2>
            <p className="mt-1 text-xs text-gray-500">These controls mirror the guild settings represented by the bot store and commands.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              ['Prefix', 'prefix', 'text', 'Command prefix used by this guild'],
              ['DJ Role ID', 'djRoleId', 'text', 'Role allowed to use DJ-restricted audio controls'],
              ['Request Channel ID', 'requestChannelId', 'text', 'Channel that accepts supported audio-file requests'],
            ].map(([label, key, type, hint]) => (
              <label key={key} className="space-y-2">
                <span className="text-xs font-bold text-gray-300">{label}</span>
                <input type={type} value={config[key]} onChange={(e) => setConfig({ ...config, [key]: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white outline-none focus:border-azelia-accent/60" />
                <span className="block text-[10px] text-gray-600">{hint}</span>
              </label>
            ))}

            <label className="space-y-2">
              <span className="flex justify-between text-xs font-bold text-gray-300"><span>Default Volume</span><span className="text-purple-300">{config.defaultVolume}%</span></span>
              <input type="range" min="1" max="100" value={config.defaultVolume} onChange={(e) => setConfig({ ...config, defaultVolume: Number(e.target.value) })} className="w-full accent-[#7F00FF]" />
              <span className="block text-[10px] text-gray-600">Azelia’s guild volume is constrained to 1–100 by the store.</span>
            </label>

            {[
              ['Stay 247', 'stay247', 'Keep Azelia connected to the configured voice channel'],
              ['Autoplay', 'autoplay', 'Allow the autoplay brain to continue after queue exhaustion'],
              ['Listen Along', 'listenAlong', 'Enable the guild listen-along setting'],
              ['Game Mode DJ', 'gameModeDj', 'Enable the guild game-mode DJ setting'],
              ['Join Gate', 'joinGateEnabled', 'Enable the configured join-gate system'],
            ].map(([label, key, hint]) => (
              <button key={key} onClick={() => setConfig({ ...config, [key]: !config[key] })} className={`text-left rounded-2xl border p-4 transition-all ${config[key] ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-white/10 bg-black/10'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{label}</span>
                  <span className={`h-2.5 w-2.5 rounded-full ${config[key] ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                </div>
                <p className="mt-1.5 text-[10px] text-gray-500">{hint}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-2 border-t border-white/[0.06]">
            <button onClick={saveConfig} disabled={saving} className="inline-flex items-center gap-2 rounded-2xl bg-azelia-accent px-5 py-3 text-xs font-bold text-white disabled:opacity-50"><Save className="h-4 w-4" />{saving ? 'Saving...' : 'Save configuration'}</button>
          </div>
        </section>
      )}

      {tab === 'player' && (
        <section className="space-y-5">
          <div className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6">
            {current ? (
              <>
                <div className="flex flex-col sm:flex-row gap-5">
                  <img src={current.artworkUrl || '/azelia-pfp.gif'} alt="" className="h-28 w-28 rounded-2xl object-cover bg-black" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-purple-300">Now Playing</div>
                    <h2 className="mt-2 text-xl font-black text-white truncate">{current.title}</h2>
                    <p className="mt-1 text-sm text-gray-500 truncate">{current.author || current.artist || 'Unknown artist'}</p>
                    <div className="mt-5 h-1.5 rounded-full bg-white/5 overflow-hidden"><div className="h-full bg-azelia-accent" style={{ width: `${progress}%` }} /></div>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-16 text-center text-sm text-gray-600">No active player in this server.</div>
            )}

            <div className="mt-7 flex flex-wrap justify-center gap-2">
              <button onClick={() => action(() => api.play(guildId, {}), 'Playback request sent.')} className="rounded-2xl bg-azelia-accent px-5 py-3 text-xs font-bold"><Play className="inline h-4 w-4 mr-2" />Play</button>
              <button onClick={() => action(() => api.pause(guildId), 'Pause toggled.')} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold"><Pause className="inline h-4 w-4 mr-2" />Pause</button>
              <button onClick={() => action(() => api.skip(guildId), 'Skip requested.')} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold"><SkipForward className="inline h-4 w-4 mr-2" />Skip</button>
              <button onClick={() => action(() => api.stop(guildId), 'Player stop requested.')} className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-xs font-bold text-red-300"><Square className="inline h-4 w-4 mr-2" />Stop</button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/[0.06] bg-[#121019] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-black text-white">Audio Filter</h2>
                <p className="text-xs text-gray-600">Free and Premium filter names from the bot’s current filter tier map.</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {availableFilters.slice(0, 48).map((filter) => (
                <button key={filter.name} onClick={() => action(() => api.setFilter(guildId, filter.name), `Filter ${filter.name} requested.`)} className={`rounded-xl border px-3 py-2 text-[10px] font-mono ${activeFilter === filter.name ? 'border-azelia-accent/40 bg-azelia-accent/10 text-purple-200' : filter.tier === 'premium' ? 'border-azelia-accent/10 text-gray-500' : 'border-white/[0.06] text-gray-400'}`}>
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === 'queue' && (
        <section className="rounded-3xl border border-white/[0.06] bg-[#121019] overflow-hidden">
          <div className="p-6 border-b border-white/[0.06]">
            <h2 className="text-xl font-black text-white">Queue</h2>
            <p className="mt-1 text-xs text-gray-600">{queue.length} queued tracks · player state polled every 3 seconds</p>
          </div>
          <div>
            {queue.length ? queue.map((track, index) => (
              <div key={`${track.id || track.identifier || index}-${index}`} className="flex items-center gap-4 px-6 py-4 border-b border-white/[0.05]">
                <span className="w-6 text-[11px] font-mono text-gray-600">{index + 1}</span>
                <img src={track.artworkUrl || '/azelia-pfp.gif'} alt="" className="h-10 w-10 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate">{track.title || 'Unknown track'}</div>
                  <div className="text-[10px] text-gray-600 truncate">{track.author || track.artist || 'Unknown artist'}</div>
                </div>
                <div className="text-[10px] text-gray-600">{track.sourceName || track.source || 'resolver'}</div>
              </div>
            )) : (
              <div className="py-20 text-center text-sm text-gray-600">Queue is empty.</div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
