'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { api } from './api';
import { useAuth } from './auth';

const MusicContext = createContext({
  currentTrack: null,
  hasStartedPlaying: false,
  isPlaying: false,
  isPaused: false,
  currentTime: 0,
  duration: 0,
  volume: 80,
  isMuted: false,
  isShuffle: false,
  isAutoplay: true,
  repeatMode: 'off',
  playbackMode: 'browser',
  selectedGuildId: null,
  activeFilter: 'clear',
  playerState: null,
  queue: [],
  recentSearches: [],
  recentlyPlayed: [],
  likedTracks: [],
  userPlaylists: [],
  playTrack: () => {},
  addToQueue: () => {},
  togglePlayPause: () => {},
  skipTrack: () => {},
  previousTrack: () => {},
  seekTrack: () => {},
  setVolumeLevel: () => {},
  toggleMute: () => {},
  toggleRepeat: () => {},
  toggleShuffle: () => {},
  toggleAutoplay: () => {},
  toggleLikeTrack: () => {},
  createCustomPlaylist: () => {},
  deleteCustomPlaylist: () => {},
  setFilter: () => {},
  setTargetGuild: () => {},
  setPlaybackMode: () => {},
  removeFromQueue: () => {},
  addRecentSearch: () => {},
  clearRecentSearches: () => {},
  syncBrowserPlayerTime: () => {},
  handleBrowserTrackEnd: () => {},
  setIsPlaying: () => {},
});

export function MusicProvider({ children }) {
  const { user } = useAuth();

  const [currentTrack, setCurrentTrack] = useState(null);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [repeatMode, setRepeatMode] = useState('off');
  const [playbackMode, setPlaybackMode] = useState('browser');
  const [selectedGuildId, setSelectedGuildId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('clear');
  const [playerState, setPlayerState] = useState(null);
  const [queue, setQueue] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [likedTracks, setLikedTracks] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);

  const safeStorage = {
    get: (key) => {
      if (typeof window === 'undefined') return null;
      try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : null;
      } catch {
        return null;
      }
    },
    set: (key, value) => {
      if (typeof window === 'undefined') return;
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* ignore */
      }
    },
    remove: (key) => {
      if (typeof window === 'undefined') return;
      try {
        localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
    },
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedGuild = safeStorage.get('azelia_selected_guild_id');
    if (savedGuild) setSelectedGuildId(savedGuild);

    const savedAutoplay = safeStorage.get('azelia_autoplay_enabled');
    if (savedAutoplay !== null) setIsAutoplay(Boolean(savedAutoplay));
  }, []);

  const handleSetTargetGuild = (guildId) => {
    setSelectedGuildId(guildId);
    safeStorage.set('azelia_selected_guild_id', guildId);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (currentTrack?.title) {
      document.title = `${isPlaying ? '▶ ' : '⏸ '}${currentTrack.title} • Azelia Web Player`;
    } else {
      document.title = 'Azelia Web Player — Lossless Music Experience';
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedSearches = safeStorage.get('azelia_recent_searches');
    if (savedSearches && Array.isArray(savedSearches)) {
      const cleaned = savedSearches.filter((s) => typeof s === 'string' && s.trim().length >= 3);
      setRecentSearches(cleaned);
      safeStorage.set('azelia_recent_searches', cleaned);
    }

    const savedRecents = safeStorage.get('azelia_recently_played');
    if (savedRecents) setRecentlyPlayed(savedRecents);

    const savedLikes = safeStorage.get('azelia_liked_tracks');
    if (savedLikes) setLikedTracks(savedLikes);

    const savedPlaylists = safeStorage.get('azelia_user_playlists');
    if (savedPlaylists) setUserPlaylists(savedPlaylists);

    if (user?.id) {
      api.getUserLikes(user.id)
        .then((res) => {
          if (res?.likes && Array.isArray(res.likes)) {
            setLikedTracks(res.likes);
            safeStorage.set('azelia_liked_tracks', res.likes);
          }
        })
        .catch(() => {});

      api.getUserPlaylists(user.id)
        .then((res) => {
          if (res?.playlists && Array.isArray(res.playlists)) {
            setUserPlaylists(res.playlists);
            safeStorage.set('azelia_user_playlists', res.playlists);
          }
        })
        .catch(() => {});
    }
  }, [user]);

  // Discord State Poller
  useEffect(() => {
    if (!selectedGuildId) return;

    let isMounted = true;
    async function poll() {
      if (!isMounted) return;
      try {
        const state = await api.getGuildPlayer(selectedGuildId).catch(() => null);
        if (state && isMounted) {
          setPlayerState(state);
          if (state.queue) setQueue(state.queue);
          if (state.filter) setActiveFilter(state.filter);
          if (state.autoplay !== undefined) setIsAutoplay(Boolean(state.autoplay));

          if (state.currentTrack) {
            if (playbackMode === 'discord' || !currentTrack) {
              setCurrentTrack({
                ...state.currentTrack,
                artworkUrl: state.currentTrack.artworkUrl || '/azelia-pfp.gif',
                requester: state.currentTrack.requester?.username || state.currentTrack.requester || 'Discord User',
              });
              setHasStartedPlaying(true);
            }
          }

          if (playbackMode === 'discord') {
            setIsPlaying(Boolean(state.playing));
            if (state.currentTrack?.duration) {
              setDuration(state.currentTrack.duration);
            }
            if (state.position != null) {
              setCurrentTime((current) => {
                const diff = Math.abs(current - state.position);
                return diff > 2500 ? state.position : current;
              });
            }
          }
        }
      } catch {
        /* ignore */
      }
    }

    poll();
    const interval = setInterval(poll, 2500);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedGuildId, playbackMode, currentTrack]);

  const syncBrowserPlayerTime = (curMs, durMs) => {
    if (playbackMode === 'browser') {
      setCurrentTime(curMs);
      if (durMs > 0 && durMs !== duration) {
        setDuration(durMs);
      }
    }
  };

  const handleBrowserTrackEnd = () => {
    if (playbackMode === 'browser') {
      setIsPlaying(false);
      skipTrack();
    }
  };

  const toggleAutoplay = async () => {
    const nextVal = !isAutoplay;
    setIsAutoplay(nextVal);
    safeStorage.set('azelia_autoplay_enabled', nextVal);

    if (playbackMode === 'discord' && selectedGuildId) {
      try {
        await api.toggleAutoplay(selectedGuildId, nextVal);
      } catch {
        /* ignore */
      }
    }
  };

  const addRecentSearch = (query) => {
    if (!query || typeof query !== 'string') return;
    const clean = query.trim();
    if (clean.length < 3) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 8);
      safeStorage.set('azelia_recent_searches', updated);
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    safeStorage.remove('azelia_recent_searches');
  };

  const toggleLikeTrack = async (track) => {
    if (!track) return;

    setLikedTracks((prev) => {
      const isAlreadyLiked = prev.some((t) => t.title === track.title);
      const updated = isAlreadyLiked
        ? prev.filter((t) => t.title !== track.title)
        : [track, ...prev];
      safeStorage.set('azelia_liked_tracks', updated);
      return updated;
    });

    if (user?.id) {
      try {
        await api.toggleUserLike(user.id, track);
      } catch {
        /* ignore */
      }
    }
  };

  const createCustomPlaylist = async (name, description = '') => {
    if (!name || !name.trim()) return null;

    const newPl = {
      id: `pl_${Date.now()}`,
      name: name.trim(),
      description: description.trim() || 'My Custom Playlist',
      tracks: [],
      createdAt: Date.now(),
    };

    setUserPlaylists((prev) => {
      const updated = [newPl, ...prev];
      safeStorage.set('azelia_user_playlists', updated);
      return updated;
    });

    if (user?.id) {
      try {
        const res = await api.createPlaylist(user.id, newPl);
        if (res?.playlist) {
          return res.playlist;
        }
      } catch {
        /* ignore */
      }
    }
    return newPl;
  };

  const deleteCustomPlaylist = async (playlistId) => {
    if (!playlistId) return;

    setUserPlaylists((prev) => {
      const updated = prev.filter((p) => p.id !== playlistId);
      safeStorage.set('azelia_user_playlists', updated);
      return updated;
    });

    if (user?.id) {
      try {
        await api.deletePlaylist(user.id, playlistId);
      } catch {
        /* ignore */
      }
    }
  };

  const addToQueue = async (track, authUser = null) => {
    const formattedTrack = {
      ...track,
      artworkUrl: track.artworkUrl || '/azelia-pfp.gif',
      requester: authUser?.globalName || authUser?.username || 'Web User',
      requestedAt: Date.now(),
    };

    setQueue((prev) => [...prev, formattedTrack]);

    if (playbackMode === 'discord' && selectedGuildId) {
      try {
        await api.play(selectedGuildId, {
          query: track.uri || track.title,
          requesterId: authUser?.id,
        });
      } catch (err) {
        console.error('Discord Queue Error:', err);
      }
    }
  };

  const playTrack = async (track, modeOverride = null, targetGuildId = null, userId = null) => {
    const activeMode = modeOverride || playbackMode;
    const guildToUse = targetGuildId || selectedGuildId;

    const formattedTrack = {
      ...track,
      duration: track.duration || 215000,
      artworkUrl: track.artworkUrl || '/azelia-pfp.gif',
      explicit: Boolean(track.explicit),
      source: track.source || 'youtube',
      requester: userId ? 'You (Web Player)' : 'Local Player',
    };

    setCurrentTrack(formattedTrack);
    setHasStartedPlaying(true);
    setCurrentTime(0);
    setDuration(formattedTrack.duration);
    setIsPlaying(true);

    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((item) => item.title !== formattedTrack.title);
      const updated = [formattedTrack, ...filtered].slice(0, 20);
      safeStorage.set('azelia_recently_played', updated);
      return updated;
    });

    if (activeMode === 'discord' && guildToUse) {
      try {
        await api.play(guildToUse, {
          query: track.uri || track.title,
          requesterId: userId,
        });
        const updated = await api.getGuildPlayer(guildToUse).catch(() => null);
        if (updated) setPlayerState(updated);
      } catch (err) {
        console.error('Discord Play Error:', err);
      }
    }
  };

  const togglePlayPause = async () => {
    if (playbackMode === 'browser') {
      setIsPlaying(!isPlaying);
    } else if (selectedGuildId) {
      try {
        await api.pause(selectedGuildId);
        setIsPlaying(!isPlaying);
      } catch {
        /* ignore */
      }
    }
  };

  const skipTrack = async () => {
    if (playbackMode === 'browser') {
      if (queue.length > 0) {
        const next = queue[0];
        setQueue((prev) => prev.slice(1));
        playTrack(next, 'browser');
      } else if (isAutoplay && recentlyPlayed.length > 0) {
        const nextTrack = recentlyPlayed[Math.floor(Math.random() * recentlyPlayed.length)];
        playTrack(nextTrack, 'browser');
      }
    } else if (selectedGuildId) {
      try {
        await api.skip(selectedGuildId);
      } catch {
        /* ignore */
      }
    }
  };

  const previousTrack = () => {
    if (playbackMode === 'browser') {
      seekTrack(0);
    }
  };

  const seekTrack = (posMs) => {
    setCurrentTime(posMs);
    if (playbackMode === 'browser') {
      // Seek YT player iframe
      const ytContainer = document.getElementById('azelia-yt-player-container');
      if (window.YT && ytContainer) {
        try {
          const players = window.YT?.get?.('azelia-yt-player-container') || window.YT?.Player?.instances?.[0];
          if (players && typeof players.seekTo === 'function') {
            players.seekTo(posMs / 1000, true);
          }
        } catch {
          /* ignore */
        }
      }
    } else if (selectedGuildId) {
      api.seek(selectedGuildId, posMs).catch(() => {});
    }
  };

  const setVolumeLevel = (val) => {
    const num = Math.max(0, Math.min(100, Number(val)));
    setVolume(num);
    if (isMuted) setIsMuted(false);

    if (playbackMode === 'discord' && selectedGuildId) {
      api.setVolume(selectedGuildId, num).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolumeLevel(volume || 80);
    } else {
      setIsMuted(true);
      if (playbackMode === 'discord' && selectedGuildId) {
        api.setVolume(selectedGuildId, 0).catch(() => {});
      }
    }
  };

  const toggleRepeat = () => {
    const nextMode = repeatMode === 'off' ? 'track' : repeatMode === 'track' ? 'queue' : 'off';
    setRepeatMode(nextMode);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const removeFromQueue = (index) => {
    setQueue((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        hasStartedPlaying,
        isPlaying,
        isPaused: !isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        isAutoplay,
        repeatMode,
        playbackMode,
        selectedGuildId,
        activeFilter,
        playerState,
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
        setFilter: setActiveFilter,
        setTargetGuild: handleSetTargetGuild,
        setPlaybackMode,
        removeFromQueue,
        addRecentSearch,
        clearRecentSearches,
        syncBrowserPlayerTime,
        handleBrowserTrackEnd,
        setIsPlaying,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
