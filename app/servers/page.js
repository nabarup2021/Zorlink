'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  Sliders,
  Sparkles,
  Music,
  Users,
  ShieldAlert,
  LogIn,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  Radio,
  Server,
} from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { BOT_INVITE_URL } from '../../lib/config';

export default function ServersPage() {
  const { user, loginWithDiscord, loading: authLoading } = useAuth();
  const [allGuilds, setAllGuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'withBot' | 'withoutBot'
  const [sortBy, setSortBy] = useState('members-desc'); // 'members-desc' | 'name-asc' | 'bot-first'

  useEffect(() => {
    async function loadGuilds() {
      // 1. Privacy Protection: If user is NOT logged in, NEVER load bot guilds
      if (!user) {
        setAllGuilds([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const guilds = Array.isArray(user.guilds) ? user.guilds : [];
        setAllGuilds(guilds);
      } catch {
        setAllGuilds([]);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      loadGuilds();
    }
  }, [user, authLoading]);

  // Filter & Sort Guilds
  const processedGuilds = useMemo(() => {
    let list = [...allGuilds];

    // Filter by search query (Search by name)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((g) => g.name?.toLowerCase().includes(q));
    }

    // Filter by Bot presence
    if (filterMode === 'withBot') {
      list = list.filter((g) => g.hasBot === true);
    } else if (filterMode === 'withoutBot') {
      list = list.filter((g) => !g.hasBot);
    }

    // Sort
    if (sortBy === 'name-asc') {
      list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'members-desc') {
      list.sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0));
    } else if (sortBy === 'bot-first') {
      list.sort((a, b) => (b.hasBot ? 1 : 0) - (a.hasBot ? 1 : 0));
    }

    return list;
  }, [allGuilds, searchQuery, filterMode, sortBy]);

  // Metrics (Item 9)
  const totalServersCount = allGuilds.length;
  const serversWithBotCount = allGuilds.filter((g) => g.hasBot).length;
  const totalMembersCount = allGuilds.reduce((acc, g) => acc + (g.memberCount || 0), 0);

  // 1. SKELETON LOADING VIEW
  if (authLoading || loading) {
    return (
      <div className="space-y-10 max-w-5xl mx-auto py-6">
        <div className="text-center space-y-2">
          <div className="h-8 bg-white/10 rounded-md w-64 mx-auto animate-pulse"></div>
          <div className="h-4 bg-white/5 rounded-md w-96 mx-auto animate-pulse"></div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="h-20 bg-[#181524]/60 rounded-2xl animate-pulse"></div>
          <div className="h-20 bg-[#181524]/60 rounded-2xl animate-pulse"></div>
          <div className="h-20 bg-[#181524]/60 rounded-2xl animate-pulse"></div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-[#181524]/60 border border-white/[0.04] rounded-3xl p-7 flex flex-col items-center justify-between text-center space-y-5 shadow-xl animate-pulse"
            >
              <div className="w-20 h-20 rounded-full bg-white/10"></div>
              <div className="space-y-2 w-full flex flex-col items-center">
                <div className="h-4 bg-white/10 rounded-md w-3/4"></div>
                <div className="h-3 bg-white/5 rounded-md w-1/2"></div>
              </div>
              <div className="w-full h-10 bg-white/10 rounded-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. GUEST LOGIN PROMPT VIEW (Privacy Protection: Item 1 & 7)
  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-azelia-accent mx-auto flex items-center justify-center shadow-2xl">
          <LogIn className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Log in to Select a Server</h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
            To view and manage your Discord servers, authenticate with Discord. We only display servers where you have Administrator or Manage Server permissions.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={loginWithDiscord}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm shadow-xl shadow-[#5865F2]/25 transition-all cursor-pointer"
          >
            <LogIn className="w-4 h-4" /> Login with Discord
          </button>
        </div>
      </div>
    );
  }

  // 3. AUTHENTICATED SERVER SELECTION VIEW
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6 font-sans">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
          Select a Server
        </h1>
        <p className="text-gray-400 text-sm">
          Manage Azelia music settings or invite the bot to your Discord servers
        </p>
      </div>

      {/* Metrics Banner (Item 9) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#181524] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-azelia-accent flex items-center justify-center shrink-0">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-bold uppercase">Managed Servers</div>
            <div className="text-xl font-extrabold text-white">{totalServersCount}</div>
          </div>
        </div>

        <div className="bg-[#181524] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-bold uppercase">Azelia Active</div>
            <div className="text-xl font-extrabold text-emerald-400">{serversWithBotCount} Servers</div>
          </div>
        </div>

        <div className="bg-[#181524] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-bold uppercase">Total Audience</div>
            <div className="text-xl font-extrabold text-white">{totalMembersCount.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search + Filter Pills + Sort Dropdown (Items 4, 5, 6) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search by Server Name */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search servers by name..."
            className="w-full bg-[#181524] border border-white/[0.08] text-white text-xs rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:border-azelia-accent transition-all placeholder:text-gray-500 shadow-xl"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 p-1 bg-[#181524] border border-white/10 rounded-2xl text-xs font-bold w-full md:w-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-[#704DED] text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All ({allGuilds.length})
          </button>
          <button
            onClick={() => setFilterMode('withBot')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl transition-all cursor-pointer ${
              filterMode === 'withBot'
                ? 'bg-[#704DED] text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            With Azelia ({serversWithBotCount})
          </button>
          <button
            onClick={() => setFilterMode('withoutBot')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl transition-all cursor-pointer ${
              filterMode === 'withoutBot'
                ? 'bg-[#704DED] text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Invite ({allGuilds.length - serversWithBotCount})
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort servers by"
            className="w-full md:w-auto bg-[#181524] border border-white/[0.08] text-white text-xs rounded-2xl px-4 py-3 appearance-none pr-9 focus:outline-none focus:border-azelia-accent cursor-pointer font-bold shadow-xl"
          >
            <option value="members-desc">Sort: Most Members</option>
            <option value="name-asc">Sort: Server Name (A-Z)</option>
            <option value="bot-first">Sort: Azelia Added First</option>
          </select>
          <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
        </div>
      </div>

      {/* Servers Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
        {processedGuilds.map((g) => {
          const inviteUrl = BOT_INVITE_URL(g.id);

          return (
            <div
              key={g.id}
              className="bg-[#181524] border border-white/[0.06] rounded-3xl p-7 flex flex-col items-center justify-between text-center space-y-5 hover:bg-[#1d192c] transition-all shadow-xl group"
            >
              {/* Server Avatar with Status Indicator */}
              <div className="relative">
                <img
                  src={g.icon || 'https://cdn.discordapp.com/embed/avatars/0.png'}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/azelia-pfp.gif';
                  }}
                  className="w-20 h-20 rounded-full object-cover shadow-2xl ring-2 ring-white/10"
                />
                <span
                  className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ring-4 ring-[#181524] ${
                    g.hasBot ? 'bg-[#3ba55c]' : 'bg-gray-600'
                  }`}
                  title={g.hasBot ? 'Azelia is present' : 'Azelia not added yet'}
                ></span>
              </div>

              {/* Server Name, Members & Status (Items 2 & 3) */}
              <div className="space-y-1.5 w-full min-w-0">
                <h3 className="font-bold text-base text-white truncate px-2">{g.name}</h3>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1 font-medium">
                    <Users className="w-3.5 h-3.5 text-gray-500" />
                    {(g.memberCount || 0).toLocaleString()} members
                  </span>
                  <span>•</span>
                  <span className="text-[11px] font-mono text-gray-500">
                    {g.isOwner ? 'Owner' : 'Admin'}
                  </span>
                </div>

                {/* Live audio indicator (Subtle, non-annoying animation: Item 2) */}
                {g.hasActivePlayer && (
                  <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-azelia-accent font-bold">
                    <span className="w-2 h-2 rounded-full bg-azelia-accent animate-pulse"></span>
                    <span>Streaming Live Audio</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="w-full pt-1">
                {g.hasBot ? (
                  <Link
                    href={`/dashboard/${g.id}`}
                    className="w-full py-3 rounded-2xl bg-[#704DED] hover:bg-[#805dfb] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#704DED]/25"
                  >
                    <Sliders className="w-3.5 h-3.5" /> Manage Server
                  </Link>
                ) : (
                  <a
                    href={inviteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-2xl bg-[#231f3a] hover:bg-[#2e294c] border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Plus className="w-4 h-4 text-azelia-accent" /> Add Bot
                  </a>
                )}
              </div>
            </div>
          );
        })}

        {/* Differentiated Empty State (Item 8) */}
        {processedGuilds.length === 0 && (
          <div className="col-span-full text-center py-16 space-y-3 bg-[#181524] border border-white/[0.06] rounded-3xl p-6">
            <Server className="w-10 h-10 mx-auto text-gray-600" />
            <h3 className="text-base font-bold text-white">No servers found</h3>
            <p className="text-gray-400 text-xs max-w-sm mx-auto">
              {searchQuery.trim()
                ? `No servers matching "${searchQuery}". Try clearing your search filter.`
                : 'You do not have Administrator or Manage Server permissions in any mutual servers.'}
            </p>
            {searchQuery.trim() && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
