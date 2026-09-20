'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Search,
  Heart,
  Music,
  ListMusic,
  Sparkles,
  ChevronDown,
  Globe,
  RadioTower,
  Library,
  Compass,
  ArrowLeft,
  Trash2,
  Menu,
  X,
  Maximize2,
  Minimize2,
  ArrowUpDown,
  History,
  Clock,
  Plus,
  FolderPlus,
  Radio,
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../lib/auth';
import { useMusic } from '../../lib/music';

function getTrackArtwork(track) {
  if (track?.artworkUrl && track.artworkUrl.startsWith('http') && !track.artworkUrl.includes('azelia-avatar')) {
    return track.artworkUrl;
  }
  if (track?.uri) {
    const ytMatch = track.uri.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://i.ytimg.com/vi/${ytMatch[1]}/hqdefault.jpg`;
    }
  }
  return track?.artworkUrl || '/azelia-pfp.gif';
}

const DEFAULT_POPULAR_TRACKS = [
  {
    id: 'p1',
    title: 'Starboy',
    author: 'The Weeknd, Daft Punk',
    duration: 230000,
    source: 'spotify',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/92/bb/b592bb72-52e3-e756-9b26-9f56d08f47ab/16UMGIM67864.rgb.jpg/600x600bb.jpg',
  },
  {
    id: 'p2',
    title: 'Die With A Smile',
    author: 'Lady Gaga, Bruno Mars',
    duration: 251000,
    source: 'spotify',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/11/ae/f2/11aef294-f57c-bab9-c9fc-529162984e62/24UMGIM85348.rgb.jpg/600x600bb.jpg',
  },
  {
    id: 'p3',
    title: 'Khairiyat (Sad Version)',
    author: 'Pritam, Arijit Singh',
    duration: 280000,
    source: 'deezer',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/da/5a/14/da5a1435-fc2a-5ab9-667f-a9bf2daa46f4/8902894360937_cover.jpg/600x600bb.jpg',
  },
  {
    id: 'p4',
    title: 'Kesariya',
    author: 'Arijit Singh, Pritam',
    duration: 268000,
    source: 'deezer',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg',
  },
  {
    id: 'p5',
    title: 'Apna Bana Le',
    author: 'Arijit Singh, Sachin-Jigar',
    duration: 261000,
    source: 'deezer',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/2e/0b/c0/2e0bc070-112f-a827-6ad8-6bc64f7caaff/840214460180.png/600x600bb.jpg',
  },
  {
    id: 'p6',
    title: 'Tauba Tauba',
    author: 'Karan Aujla',
    duration: 207000,
    source: 'youtube',
    artworkUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/79/d2/01/79d201d2-e54d-5604-81fb-313f30db7219/198588533581.jpg/600x600bb.jpg',
  },
];

export default function FullscreenSpotifyWebPlayer() {
  const { user } = useAuth();
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    isAutoplay,
    repeatMode,
    playbackMode,
    queue,
    recentSearches,
    recentlyPlayed,
    likedTracks,
    userPlaylists,
    playTrack,
    addToQueue,
    togglePlayPause,
    skipTrack,
    previousTrack,
    seekTrack,
    setVolumeLevel,
    toggleMute,
    toggleRepeat,
    toggleShuffle,
    toggleAutoplay,
    toggleLikeTrack,
    createCustomPlaylist,
    deleteCustomPlaylist,
    setTargetGuild,
    setPlaybackMode,
    removeFromQueue,
    addRecentSearch,
    clearRecentSearches,
  } = useMusic();

  const [guilds, setGuilds] = useState([]);
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [isServerDropdownOpen, setIsServerDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [currentNav, setCurrentNav] = useState('discover');
  const [notification, setNotification] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const serverDropdownRef = useRef(null);
  const searchAbortControllerRef = useRef(null);

  const navItems = [
    { id: 'discover', label: 'Discover & Home', icon: Compass },
    { id: 'recommendations', label: 'Made For You', icon: Sparkles },
    { id: 'queue', label: 'Server Queue', icon: ListMusic },
    { id: 'library', label: 'Your Library', icon: Library },
  ];

  // Hotkey controls
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        seekTrack(Math.min(duration, currentTime + 5000));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        seekTrack(Math.max(0, currentTime - 5000));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setVolumeLevel(Math.min(100, volume + 5));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setVolumeLevel(Math.max(0, volume - 5));
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        if (currentTrack) toggleLikeTrack(currentTrack);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setIsZenMode((prev) => !prev);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, duration, volume, currentTrack]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (serverDropdownRef.current && !serverDropdownRef.current.contains(e.target)) {
        setIsServerDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Smart Server Selector: checks URL, active player, or saved selection
  useEffect(() => {
    async function loadGuilds() {
      try {
        let loaded = [];
        if (user?.guilds && Array.isArray(user.guilds) && user.guilds.length > 0) {
          loaded = user.guilds.filter((g) => g.hasBot === true);
        } else if (user?.id) {
          const authData = await api.authUser(user.id).catch(() => null);
          if (authData?.guilds && authData.guilds.length > 0) {
            loaded = authData.guilds.filter((g) => g.hasBot === true);
          }
        }

        if (loaded.length === 0) {
          const data = await api.getGuilds().catch(() => null);
          if (data?.guilds && data.guilds.length > 0) {
            loaded = data.guilds.filter((g) => g.hasBot === true);
          }
        }

        setGuilds(loaded);

        if (loaded.length > 0) {
          const urlParams = new URLSearchParams(window.location.search);
          const urlGuildId = urlParams.get('guild');
          const matchedUrlGuild = loaded.find((g) => g.id === urlGuildId);
          const activePlayingGuild = loaded.find((g) => g.hasActivePlayer === true);

          let savedId = null;
          try {
            savedId = JSON.parse(localStorage.getItem('azelia_selected_guild_id'));
          } catch {
            /* ignore */
          }
          const matchedSavedGuild = loaded.find((g) => g.id === savedId);

          const target = matchedUrlGuild || activePlayingGuild || matchedSavedGuild || loaded[0];
          setSelectedGuild(target);
          setTargetGuild(target.id);
        }
      } catch {
        /* fallback */
      }
    }
    loadGuilds();
  }, [user]);

  const handleServerSelect = (guild) => {
    setSelectedGuild(guild);
    setTargetGuild(guild.id);
    setIsServerDropdownOpen(false);
  };

  // MULTI-TRACK REAL LAVALINK / YOUTUBE SEARCH
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort();
    }
    const controller = new AbortController();
    searchAbortControllerRef.current = controller;

    const timer = setTimeout(async () => {
      setIsSearching(true);
      setSearchError(null);

      try {
        const res = await api.search(searchQuery).catch(() => null);
        if (controller.signal.aborted) return;

        if (res?.tracks && res.tracks.length > 0) {
          setSearchResults(
            res.tracks.map((t) => ({
              ...t,
              source: t.sourceName || 'youtube',
              artworkUrl: getTrackArtwork(t),
            }))
          );
          setCurrentNav('search');
        } else {
          setSearchResults([]);
          setSearchError(`No songs found matching "${searchQuery}".`);
          setCurrentNav('search');
        }
      } catch {
        if (!controller.signal.aborted) {
          setSearchError('Search service temporarily unavailable.');
        }
      } finally {
        if (!controller.signal.aborted) setIsSearching(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim().length >= 3) {
      addRecentSearch(searchQuery.trim());
    }
  };

  const handleTrackAction = (track, forcePlayNow = false) => {
    if (isPlaying && !forcePlayNow) {
      addToQueue(track, user);
      setNotification(`Added "${track.title}" to queue (#${queue.length + 1})`);
    } else {
      playTrack(track, playbackMode, selectedGuild?.id, user?.id);
      setNotification(
        `Now playing "${track.title}" on ${playbackMode === 'browser' ? 'Browser Web Player' : selectedGuild?.name || 'Discord'}`
      );
    }
    setTimeout(() => setNotification(null), 3500);
  };

  const handleCreatePlaylistSubmit = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    await createCustomPlaylist(newPlaylistName.trim());
    setNotification(`Playlist "${newPlaylistName.trim()}" created!`);
    setNewPlaylistName('');
    setIsCreatePlaylistOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const fmtTime = (ms) => {
    if (!ms || ms < 0 || isNaN(ms)) return '0:00';
    const s = Math.floor((ms / 1000) % 60);
    const m = Math.floor((ms / 60000) % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeekRange = (e) => {
    const seekMs = Number(e.target.value);
    seekTrack(seekMs);
  };

  const isCurrentTrackLiked = likedTracks.some((t) => t.title === currentTrack?.title);

  // Personalized Suggestions
  const personalizedSuggestions = useMemo(() => {
    const combined = [...likedTracks, ...recentlyPlayed, ...DEFAULT_POPULAR_TRACKS];
    const seen = new Set();
    return combined.filter((item) => {
      if (seen.has(item.title)) return false;
      seen.add(item.title);
      return true;
    });
  }, [likedTracks, recentlyPlayed]);

  return (
    <div className="flex h-full w-full bg-[#0a0812] text-white select-none overflow-hidden relative font-sans">
      {/* Toast Notification */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-6 right-6 z-50 bg-[#704DED] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300 font-bold text-xs"
        >
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>{notification}</span>
        </div>
      )}

      {/* Create Playlist Modal */}
      {isCreatePlaylistOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreatePlaylistSubmit}
            className="bg-[#181528] border border-white/10 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl"
          >
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-azelia-accent" /> Create New Playlist
            </h3>
            <input
              type="text"
              autoFocus
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist name..."
              className="w-full bg-[#120f22] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-azelia-accent"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatePlaylistOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#704DED] hover:bg-[#805dfb] text-white text-xs font-bold shadow-lg transition-colors cursor-pointer"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[#181528] text-white border border-white/10 shadow-xl"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* 1. CLEAN SPOTIFY LEFT SIDEBAR */}
      {!isZenMode && (
        <aside
          className={`${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } fixed md:static inset-y-0 left-0 z-40 w-64 xl:w-72 bg-[#120f22] border-r border-white/[0.06] flex flex-col justify-between shrink-0 h-full p-4 space-y-4 transition-transform duration-300 shadow-2xl`}
        >
          <div className="space-y-5 overflow-y-auto pr-1">
            {/* Brand Header */}
            <div className="flex items-center justify-between px-2 pt-1">
              <Link href="/" className="flex items-center gap-2.5 group">
                <img
                  src="/azelia-pfp.gif"
                  alt="Azelia"
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-azelia-accent shadow-lg group-hover:scale-105 transition-transform"
                />
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-purple-200 to-azelia-accent bg-clip-text text-transparent">
                  Azelia Web
                </span>
              </Link>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsZenMode(true)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer hidden md:block"
                  title="Zen Fullscreen Mode (Press F)"
                  aria-label="Toggle Fullscreen Zen Mode"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <Link
                  href="/servers"
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="Return to Dashboard"
                  aria-label="Return to Dashboard"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const IconComp = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentNav(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentNav === item.id
                        ? 'bg-[#704DED] text-white shadow-lg shadow-[#704DED]/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <IconComp className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.id === 'queue' && queue?.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-mono">
                        {queue.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Audio Output Switcher */}
            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider px-1">
                Audio Output
              </label>
              <div className="p-1 bg-[#181528] border border-white/10 rounded-2xl flex items-center text-xs font-bold">
                <button
                  onClick={() => setPlaybackMode('browser')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    playbackMode === 'browser'
                      ? 'bg-[#704DED] text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" /> Web
                </button>
                <button
                  onClick={() => setPlaybackMode('discord')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    playbackMode === 'discord'
                      ? 'bg-[#704DED] text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <RadioTower className="w-3.5 h-3.5" /> Discord
                </button>
              </div>
            </div>

            {/* Autoplay Switch */}
            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                  Autoplay Next
                </span>
                <button
                  onClick={toggleAutoplay}
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${
                    isAutoplay
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}
                >
                  {isAutoplay ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Mutual Server Selector */}
            <div className="space-y-2 relative" ref={serverDropdownRef}>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider px-1 flex items-center justify-between">
                <span>Target Server</span>
                <span className="text-[10px] text-[#3ba55c] font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ba55c] animate-pulse"></span>
                  {guilds.length} Connected
                </span>
              </label>

              <button
                onClick={() => setIsServerDropdownOpen(!isServerDropdownOpen)}
                className="w-full bg-[#181528] hover:bg-[#221e38] border border-white/10 text-white rounded-2xl p-2.5 flex items-center justify-between gap-2.5 transition-all text-left shadow-lg cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={selectedGuild?.icon || '/azelia-pfp.gif'}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/azelia-pfp.gif';
                    }}
                    className="w-6 h-6 rounded-lg object-cover ring-1 ring-white/10 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate text-white">
                      {selectedGuild?.name || 'Select Server'}
                    </div>
                    <div className="text-[10px] text-[#3ba55c] truncate font-medium">
                      {selectedGuild?.hasActivePlayer ? '🔥 Stream Active' : 'Azelia Ready'}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform shrink-0 ${
                    isServerDropdownOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {isServerDropdownOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#181528] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 space-y-1 max-h-60 overflow-y-auto">
                  {guilds.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => handleServerSelect(g)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${
                        selectedGuild?.id === g.id
                          ? 'bg-[#704DED] text-white shadow-lg'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={g.icon || '/azelia-pfp.gif'}
                          alt=""
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/azelia-pfp.gif';
                          }}
                          className="w-5 h-5 rounded-md object-cover"
                        />
                        <span className="text-xs font-semibold truncate">{g.name}</span>
                      </div>
                      {g.hasActivePlayer && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">
                          Active
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DYNAMIC USER PLAYLISTS */}
            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Your Playlists
                </span>
                <button
                  onClick={() => setIsCreatePlaylistOpen(true)}
                  className="text-azelia-accent hover:text-purple-300 transition-colors p-1 rounded-lg hover:bg-white/5 cursor-pointer"
                  title="Create New Playlist"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
                {userPlaylists.map((pl) => (
                  <div
                    key={pl.id}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 group transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0 text-left flex-1">
                      <Music className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate text-gray-300 group-hover:text-white font-medium">
                        {pl.name}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteCustomPlaylist(pl.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity p-1 cursor-pointer"
                      title="Delete Playlist"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {userPlaylists.length === 0 && (
                  <div className="text-[11px] text-gray-500 px-3 py-2 italic">
                    No custom playlists yet. Click "+" to create one!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* User Profile Pill */}
          <div className="p-3 bg-[#181528] rounded-2xl border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={user?.avatar || '/azelia-pfp.gif'}
                alt=""
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/azelia-pfp.gif';
                }}
                className="w-7 h-7 rounded-xl object-cover ring-1 ring-white/10"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold truncate text-white">
                  {user?.globalName || user?.username || 'Guest User'}
                </div>
                <div className="text-[10px] text-gray-400 truncate">
                  {user ? 'Database Synced' : 'Local Session'}
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* 2. MAIN SCROLLABLE SPOTIFY VIEWPORT */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto scroll-smooth pb-44 px-6 sm:px-10 lg:px-12 pt-8 space-y-10">
        {/* Top Search Bar */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {isZenMode && (
              <button
                onClick={() => setIsZenMode(false)}
                className="px-4 py-3.5 rounded-2xl bg-[#141026] text-white border border-white/10 flex items-center gap-2 text-xs font-bold hover:bg-[#1f1938] transition-colors cursor-pointer"
                title="Show Sidebar"
                aria-label="Exit Zen Fullscreen Mode"
              >
                <Maximize2 className="w-4 h-4 text-azelia-accent" /> Sidebar
              </button>
            )}

            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-500 absolute left-4 top-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search any song, artist, Punjabi track, or YouTube URL (Press Enter to save)..."
                className="w-full bg-[#141026] border border-white/[0.08] text-white text-xs rounded-2xl pl-12 pr-28 py-3.5 focus:outline-none focus:border-azelia-accent placeholder:text-gray-500 transition-all shadow-xl"
              />
              {isSearching && (
                <span className="absolute right-4 top-3.5 text-xs text-azelia-accent animate-pulse font-medium">
                  Searching...
                </span>
              )}
            </div>

            <div className="relative hidden sm:block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort tracks by"
                className="bg-[#141026] border border-white/[0.08] text-white text-xs rounded-2xl px-4 py-3.5 appearance-none pr-8 focus:outline-none focus:border-azelia-accent cursor-pointer font-bold shadow-xl"
              >
                <option value="default">Sort: Default</option>
                <option value="title">Sort: Title (A-Z)</option>
                <option value="artist">Sort: Artist</option>
                <option value="duration-asc">Duration: Shortest</option>
                <option value="duration-desc">Duration: Longest</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-4 pointer-events-none" />
            </div>
          </div>

          {/* Clean Recent Search Chips */}
          {recentSearches.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1 shrink-0">
                <History className="w-3.5 h-3.5 text-azelia-accent" /> Recent:
              </span>
              {recentSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(item)}
                  className="px-3.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={clearRecentSearches}
                className="text-[10px] text-red-400 hover:text-red-300 font-bold px-2 py-1 cursor-pointer shrink-0"
              >
                Clear History
              </button>
            </div>
          )}
        </div>

        {/* VIEW 1: DISCOVER & HOME */}
        {currentNav === 'discover' && (
          <div className="space-y-12">
            {/* PROMINENT RECENTLY PLAYED SECTION */}
            {recentlyPlayed.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-400" /> Recently Played by You
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">
                    {recentlyPlayed.length} tracks in history
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
                  {recentlyPlayed.map((song, idx) => (
                    <div
                      key={idx}
                      className="bg-[#141026] border border-white/[0.06] rounded-3xl p-4 space-y-3 hover:bg-[#1f1938] transition-all group shadow-xl hover:scale-[1.02] relative"
                    >
                      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-white/5">
                        <img
                          src={getTrackArtwork(song)}
                          alt=""
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/azelia-pfp.gif';
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleTrackAction(song, true)}
                            title="Play Now"
                            className="w-9 h-9 rounded-full bg-[#704DED] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </button>
                          <button
                            onClick={() => handleTrackAction(song, false)}
                            title="Add to Queue"
                            className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer backdrop-blur-md"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs text-white truncate">{song.title}</div>
                        <div className="text-[11px] text-gray-400 truncate">{song.author}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* POPULAR & RECOMMENDED */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-azelia-accent" /> Recommended For You
                </h3>
                <span className="text-xs text-gray-400 font-medium">
                  {personalizedSuggestions.length} tracks
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
                {personalizedSuggestions.map((song, idx) => {
                  const isCurrent = currentTrack?.title === song.title;

                  return (
                    <div
                      key={song.id || idx}
                      className={`border rounded-3xl p-4 space-y-3 transition-all group flex flex-col justify-between shadow-xl hover:scale-[1.02] relative ${
                        isCurrent
                          ? 'bg-[#20173d] border-azelia-accent ring-2 ring-azelia-accent/30'
                          : 'bg-[#141026] border-white/[0.06] hover:bg-[#1f1938]'
                      }`}
                    >
                      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-white/5">
                        <img
                          src={getTrackArtwork(song)}
                          alt=""
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/azelia-pfp.gif';
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white font-mono flex items-center gap-1">
                          #{idx + 1}
                        </div>

                        {isCurrent && isPlaying ? (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="flex items-end gap-1 h-6">
                              <span className="w-1 h-full bg-azelia-accent animate-bounce"></span>
                              <span className="w-1 h-3/5 bg-azelia-accent animate-pulse"></span>
                              <span className="w-1 h-4/5 bg-azelia-accent animate-bounce"></span>
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleTrackAction(song, true)}
                              title="Play Now"
                              className="w-9 h-9 rounded-full bg-[#704DED] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                            >
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </button>
                            <button
                              onClick={() => handleTrackAction(song, false)}
                              title="Add to Queue"
                              className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer backdrop-blur-md"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <div className={`font-bold text-xs truncate ${isCurrent ? 'text-azelia-accent' : 'text-white'}`}>
                          {song.title}
                        </div>
                        <div className="text-[11px] text-gray-400 truncate">{song.author}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: SEARCH RESULTS (Multi-Track) */}
        {currentNav === 'search' && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-azelia-accent" /> Results for &ldquo;{searchQuery}&rdquo;
              </h3>
              <span className="text-xs text-gray-400 font-medium">
                {searchResults.length} matching songs
              </span>
            </div>

            {searchResults.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-[#141026] border border-white/[0.06] rounded-3xl p-4 flex items-center justify-between gap-4 hover:bg-[#1f1938] transition-all shadow-xl group"
                  >
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-lg bg-white/5">
                      <img
                        src={getTrackArtwork(t)}
                        alt=""
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/azelia-pfp.gif';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-white truncate group-hover:text-azelia-accent transition-colors">
                        {t.title}
                      </div>
                      <div className="text-xs text-gray-400 truncate flex items-center gap-2 pt-0.5">
                        <span>{t.author}</span>
                        <span>•</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-300 uppercase font-mono">
                          {t.source || 'YouTube'}
                        </span>
                        <span className="text-xs font-mono text-gray-500">
                          {fmtTime(t.duration)}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 space-y-1 flex items-center gap-2">
                      <button
                        onClick={() => handleTrackAction(t, true)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#704DED] hover:bg-[#805dfb] text-white text-xs font-bold shadow-lg transition-colors cursor-pointer"
                      >
                        Play Now
                      </button>
                      <button
                        onClick={() => handleTrackAction(t, false)}
                        title="Add to Queue"
                        className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchError && (
              <div className="py-16 text-center space-y-3 bg-[#141026] border border-white/[0.06] rounded-3xl p-6">
                <Music className="w-8 h-8 text-purple-400 mx-auto" />
                <p className="text-gray-300 text-sm font-semibold">{searchError}</p>
              </div>
            )}
          </section>
        )}

        {/* VIEW 3: MADE FOR YOU */}
        {currentNav === 'recommendations' && (
          <section className="space-y-6">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-azelia-accent" /> Made For You & Personalized Mixes
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
              {personalizedSuggestions.map((song, idx) => (
                <div
                  key={idx}
                  className="bg-[#141026] border border-white/[0.06] rounded-3xl p-4 space-y-3 hover:bg-[#1f1938] transition-all group shadow-xl"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-white/5">
                    <img
                      src={getTrackArtwork(song)}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/azelia-pfp.gif';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleTrackAction(song, true)}
                        className="w-9 h-9 rounded-full bg-[#704DED] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </button>
                      <button
                        onClick={() => handleTrackAction(song, false)}
                        className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer backdrop-blur-md"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="font-bold text-xs text-white truncate">{song.title}</div>
                  <div className="text-[11px] text-gray-400 truncate">{song.author}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* VIEW 4: LIVE SERVER QUEUE */}
        {currentNav === 'queue' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <ListMusic className="w-5 h-5 text-azelia-accent" /> Upcoming Server Queue
              </h3>
              <span className="text-xs text-gray-400">
                {queue?.length || 0} tracks queued
              </span>
            </div>

            <div className="space-y-2">
              {(queue || []).map((t, idx) => (
                <div
                  key={idx}
                  className="bg-[#141026] border border-white/[0.06] rounded-2xl p-4 flex items-center justify-between gap-4 shadow-lg group"
                >
                  <span className="font-mono text-xs font-bold text-gray-500 w-6">
                    #{idx + 1}
                  </span>
                  <img
                    src={getTrackArtwork(t)}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/azelia-pfp.gif';
                    }}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs text-white truncate">{t.title}</div>
                    <div className="text-[11px] text-gray-400 truncate flex items-center gap-2">
                      <span>{t.author}</span>
                      <span>•</span>
                      <span className="text-purple-300 font-medium">
                        Requested by {t.requester || 'Discord / Web User'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-400">{fmtTime(t.duration)}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTrackAction(t, true)}
                      className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Play Now
                    </button>
                    <button
                      onClick={() => removeFromQueue(idx)}
                      aria-label="Remove track from queue"
                      className="p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Remove from queue"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {(!queue || queue.length === 0) && (
                <div className="text-center py-16 text-gray-500 text-xs bg-[#141026] border border-white/[0.06] rounded-3xl space-y-2">
                  <ListMusic className="w-8 h-8 mx-auto text-gray-600" />
                  <p className="font-semibold text-gray-400">Queue is currently empty</p>
                  <p className="text-gray-500">
                    Click "+" on any track to add it to the queue!
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* VIEW 5: YOUR LIBRARY */}
        {currentNav === 'library' && (
          <section className="space-y-6">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Library className="w-5 h-5 text-azelia-accent" /> Your Music Library
            </h3>

            <div className="space-y-4">
              <div className="font-bold text-sm text-gray-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500 fill-current" /> Liked Songs (Database Synced)
                </div>
                <span className="text-xs text-gray-500">{likedTracks.length} tracks</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
                {likedTracks.map((song, idx) => (
                  <div
                    key={idx}
                    className="bg-[#141026] border border-white/[0.06] rounded-3xl p-4 space-y-3 hover:bg-[#1f1938] transition-all group shadow-lg"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden">
                      <img
                        src={getTrackArtwork(song)}
                        alt=""
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/azelia-pfp.gif';
                        }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleTrackAction(song, true)}
                          className="w-9 h-9 rounded-full bg-[#704DED] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </button>
                        <button
                          onClick={() => handleTrackAction(song, false)}
                          className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer backdrop-blur-md"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="font-bold text-xs text-white truncate">{song.title}</div>
                    <div className="text-[11px] text-gray-400 truncate">{song.author}</div>
                  </div>
                ))}

                {likedTracks.length === 0 && (
                  <div className="col-span-full py-8 text-center text-xs text-gray-500 bg-[#141026] rounded-2xl">
                    No liked songs saved in your profile yet. Click the heart icon on any track to save it here permanently!
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* 3. FLOATING CURVED-CORNER WEB PLAYER CONTROL BAR */}
      {currentTrack && (
        <div className="fixed bottom-6 left-4 right-4 md:left-76 md:right-8 z-50 pointer-events-auto">
          <div className="bg-[#16122c]/95 backdrop-blur-2xl border border-white/10 rounded-3xl sm:rounded-full px-5 py-3 shadow-[0_12px_45px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
            {/* Left: Artwork & Info */}
            <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
              <img
                src={getTrackArtwork(currentTrack)}
                alt=""
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/azelia-pfp.gif';
                }}
                className="w-11 h-11 rounded-2xl object-cover ring-1 ring-white/10 shrink-0"
              />
              <div className="min-w-0 flex-1 sm:max-w-[180px]">
                <div className="font-bold text-xs text-white truncate">
                  {currentTrack.title}
                </div>
                <div className="text-[11px] text-gray-400 truncate flex items-center gap-1.5">
                  <span>{currentTrack.author}</span>
                  {playbackMode === 'discord' && (
                    <span className="text-[9px] text-purple-300 font-mono font-bold px-1.5 py-0.2 bg-purple-500/20 rounded">
                      VC
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => toggleLikeTrack(currentTrack)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isCurrentTrackLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'
                }`}
                title="Like Track"
              >
                <Heart className={`w-4 h-4 ${isCurrentTrackLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Center: Gliding Seeker & Transport */}
            <div className="flex-1 max-w-xl w-full flex flex-col items-center space-y-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleShuffle}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isShuffle ? 'text-azelia-accent' : 'text-gray-400 hover:text-white'
                  }`}
                  title="Shuffle"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={previousTrack}
                  className="p-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Previous"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={togglePlayPause}
                  className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>
                <button
                  onClick={skipTrack}
                  className="p-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Next"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleRepeat}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    repeatMode !== 'off' ? 'text-azelia-accent' : 'text-gray-400 hover:text-white'
                  }`}
                  title={`Repeat: ${repeatMode}`}
                >
                  <Repeat className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress Slider */}
              <div className="w-full flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-400 w-8 text-right">
                  {fmtTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime || 0}
                  onChange={handleSeekRange}
                  className="flex-1 accent-azelia-accent cursor-pointer h-1 bg-white/10 rounded-full"
                />
                <span className="text-[10px] font-mono text-gray-400 w-8">
                  {fmtTime(duration)}
                </span>
              </div>
            </div>

            {/* Right: Master Volume */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                onClick={toggleMute}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolumeLevel(e.target.value)}
                className="w-20 accent-azelia-accent cursor-pointer h-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
