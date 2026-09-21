'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Search,
  X,
  Clock,
  TrendingUp,
  Play,
  Plus,
  Music,
  Sparkles,
  Loader2,
  ArrowRight,
  Disc3,
} from 'lucide-react';
import { api } from '../lib/api';

function getTrackArtwork(track) {
  if (track?.artworkUrl && track.artworkUrl.startsWith('http') && !track.artworkUrl.includes('azelia-avatar')) {
    return track.artworkUrl;
  }
  if (track?.uri) {
    const ytMatch = track.uri.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
    );
    if (ytMatch?.[1]) {
      return `https://i.ytimg.com/vi/${ytMatch[1]}/hqdefault.jpg`;
    }
  }
  return track?.artworkUrl || '/azelia-pfp.png';
}

function fmtTime(ms) {
  if (!ms || ms < 0 || isNaN(ms)) return '0:00';
  const s = Math.floor((ms / 1000) % 60);
  const m = Math.floor((ms / 60000) % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const TRENDING_SUGGESTIONS = [
  { title: 'Starboy', author: 'The Weeknd' },
  { title: 'Blinding Lights', author: 'The Weeknd' },
  { title: 'Die With A Smile', author: 'Lady Gaga' },
  { title: 'Kesariya', author: 'Arijit Singh' },
  { title: 'Espresso', author: 'Sabrina Carpenter' },
  { title: 'Apna Bana Le', author: 'Arijit Singh' },
];

function SearchSkeleton() {
  return (
    <div className="space-y-3 p-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className="flex items-center gap-3 px-3 py-2.5 rounded-xl animate-pulse">
          <div className="w-10 h-10 rounded-lg bg-white/[0.06] shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-white/[0.06] rounded-full w-3/4" />
            <div className="h-2.5 bg-white/[0.04] rounded-full w-1/2" />
          </div>
          <div className="h-2 bg-white/[0.04] rounded-full w-8" />
        </div>
      ))}
    </div>
  );
}

function TrackSuggestionItem({ track, index, isActive, onSelect, onPlay, onAddQueue }) {
  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
        onSelect(track);
      }}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 group ${
        isActive
          ? 'bg-[#704DED]/20 border border-[#704DED]/30'
          : 'hover:bg-white/[0.04] border border-transparent'
      }`}
    >
      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
        <img
          src={getTrackArtwork(track)}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/azelia-pfp.png';
          }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-3.5 h-3.5 text-white fill-current" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-white truncate group-hover:text-azelia-accent transition-colors">
          {track.title}
        </div>
        <div className="text-[11px] text-gray-400 truncate">{track.author}</div>
      </div>

      {track.duration > 0 && (
        <span className="text-[10px] font-mono text-gray-500 shrink-0">{fmtTime(track.duration)}</span>
      )}

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddQueue(track);
          }}
          className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          title="Add to Queue"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onPlay(track);
          }}
          className="p-1.5 rounded-lg bg-azelia-accent/20 hover:bg-azelia-accent/30 text-azelia-accent transition-colors cursor-pointer"
          title="Play Now"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
        </button>
      </div>
    </div>
  );
}

export default function SearchOverlay({
  recentSearches = [],
  recentlyPlayed = [],
  onPlayTrack,
  onAddToQueue,
  onSearch,
  onClearRecents,
}) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [liveResults, setLiveResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const abortRef = useRef(null);

  const showDropdown = isFocused && !hasSubmitted;

  const allItems = useMemo(() => {
    if (query.trim().length > 0) {
      return liveResults;
    }
    const items = [];
    if (recentSearches.length > 0) {
      items.push({ type: 'header', label: 'Recent Searches', id: 'recent-header' });
      recentSearches.slice(0, 5).forEach((q) => {
        items.push({ type: 'recent', query: q, id: `recent-${q}` });
      });
    }
    items.push({ type: 'header', label: 'Trending Now', id: 'trending-header' });
    TRENDING_SUGGESTIONS.forEach((t) => {
      items.push({ type: 'track', track: t, id: `trending-${t.title}` });
    });
    if (recentlyPlayed.length > 0) {
      items.push({ type: 'header', label: 'Continue Listening', id: 'history-header' });
      recentlyPlayed.slice(0, 3).forEach((t) => {
        items.push({ type: 'track', track: t, id: `history-${t.title}` });
      });
    }
    return items;
  }, [query, liveResults, recentSearches, recentlyPlayed]);

  const selectableItems = useMemo(() => {
    return allItems.filter((item) => item.type === 'track' || item.type === 'recent');
  }, [allItems]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    if (!query.trim()) {
      setLiveResults([]);
      setSuggestions([]);
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await api.search(query).catch(() => null);
        if (controller.signal.aborted) return;
        if (res?.tracks && res.tracks.length > 0) {
          const mapped = res.tracks.map((t) => ({
            ...t,
            source: t.sourceName || 'youtube',
            artworkUrl: getTrackArtwork(t),
          }));
          setLiveResults(mapped);
          setSuggestions(mapped.slice(0, 5));
        } else {
          setLiveResults([]);
          setSuggestions([]);
        }
      } catch {
        if (!controller.signal.aborted) {
          setLiveResults([]);
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) setIsSearching(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current?.contains(e.target)
      ) {
        setIsFocused(false);
        setHasSubmitted(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = useCallback(
    (searchQuery) => {
      const q = searchQuery || query;
      if (!q.trim()) return;
      setHasSubmitted(true);
      setIsFocused(false);
      onSearch?.(q.trim());
    },
    [query, onSearch]
  );

  const handleSelectItem = useCallback(
    (item) => {
      if (item.type === 'recent') {
        setQuery(item.query);
        handleSubmit(item.query);
      } else if (item.type === 'track') {
        onPlayTrack?.(item.track, true);
        setHasSubmitted(true);
        setIsFocused(false);
      }
    },
    [handleSubmit, onPlayTrack]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        setIsFocused(false);
        setHasSubmitted(false);
        inputRef.current?.blur();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, selectableItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, -1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && selectableItems[activeIndex]) {
          handleSelectItem(selectableItems[activeIndex]);
        } else {
          handleSubmit();
        }
      }
    },
    [activeIndex, selectableItems, handleSelectItem, handleSubmit]
  );

  const clearSearch = () => {
    setQuery('');
    setLiveResults([]);
    setSuggestions([]);
    setHasSubmitted(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative group">
        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
            isFocused
              ? 'bg-[#704DED]/10 blur-xl scale-105 opacity-60'
              : 'opacity-0'
          }`}
        />
        <div
          className={`relative flex items-center gap-3 bg-[#141026] border rounded-2xl pl-4 pr-3 py-3 transition-all duration-200 shadow-xl ${
            isFocused
              ? 'border-[#704DED]/50 shadow-[#704DED]/10 ring-1 ring-[#704DED]/20'
              : 'border-white/[0.08] hover:border-white/[0.12]'
          }`}
        >
          {isSearching ? (
            <Loader2 className="w-4 h-4 text-azelia-accent animate-spin shrink-0" />
          ) : (
            <Search
              className={`w-4 h-4 shrink-0 transition-colors ${
                isFocused ? 'text-azelia-accent' : 'text-gray-500'
              }`}
            />
          )}

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHasSubmitted(false);
            }}
            onFocus={() => {
              setIsFocused(true);
              setHasSubmitted(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search songs, artists, playlists..."
            className="flex-1 bg-transparent text-white text-xs placeholder:text-gray-500 focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />

          {query.length > 0 && (
            <button
              onClick={clearSearch}
              className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono text-gray-500 shrink-0">
            {query.length > 0 ? 'ESC' : '⌘K'}
          </kbd>
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#16122c]/98 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-50 max-h-[420px] overflow-y-auto scrollbar-thin">
          {/* Loading State */}
          {isSearching && query.trim().length > 0 && (
            <div className="p-2">
              <SearchSkeleton />
            </div>
          )}

          {/* Empty Query - Recent + Trending */}
          {!isSearching && query.trim().length === 0 && (
            <div className="p-2">
              {allItems.map((item, idx) => {
                if (item.type === 'header') {
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-3 pt-3 pb-1.5"
                    >
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                        {item.label === 'Recent Searches' && (
                          <Clock className="w-3 h-3 text-azelia-accent" />
                        )}
                        {item.label === 'Trending Now' && (
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                        )}
                        {item.label === 'Continue Listening' && (
                          <Disc3 className="w-3 h-3 text-purple-400" />
                        )}
                        {item.label}
                      </span>
                      {item.label === 'Recent Searches' && recentSearches.length > 0 && (
                        <button
                          onMouseDown={(e) => {
                            e.preventDefault();
                            onClearRecents?.();
                          }}
                          className="text-[10px] text-gray-500 hover:text-red-400 font-medium transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  );
                }

                if (item.type === 'recent') {
                  const globalIdx = selectableItems.findIndex(
                    (s) => s.type === 'recent' && s.query === item.query
                  );
                  return (
                    <div
                      key={item.id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setQuery(item.query);
                        handleSubmit(item.query);
                      }}
                      onMouseEnter={() => setActiveIndex(globalIdx)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                        activeIndex === globalIdx
                          ? 'bg-[#704DED]/20'
                          : 'hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <span className="text-xs text-gray-300 font-medium truncate flex-1">
                        {item.query}
                      </span>
                      <ArrowRight className="w-3 h-3 text-gray-500 shrink-0" />
                    </div>
                  );
                }

                if (item.type === 'track') {
                  const globalIdx = selectableItems.findIndex(
                    (s) => s.type === 'track' && s.track.title === item.track.title
                  );
                  return (
                    <div key={item.id} onMouseEnter={() => setActiveIndex(globalIdx)}>
                      <TrackSuggestionItem
                        track={item.track}
                        index={idx}
                        isActive={activeIndex === globalIdx}
                        onSelect={() => handleSelectItem(item)}
                        onPlay={(t) => {
                          onPlayTrack?.(t, true);
                          setHasSubmitted(true);
                          setIsFocused(false);
                        }}
                        onAddQueue={(t) => {
                          onAddToQueue?.(t);
                        }}
                      />
                    </div>
                  );
                }

                return null;
              })}

              {/* Keyboard hint */}
              <div className="flex items-center justify-center gap-4 py-2.5 mt-1 border-t border-white/[0.04]">
                <span className="text-[9px] text-gray-500 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-white/[0.06] border border-white/10 font-mono">↑↓</kbd>
                  Navigate
                </span>
                <span className="text-[9px] text-gray-500 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-white/[0.06] border border-white/10 font-mono">↵</kbd>
                  Select
                </span>
                <span className="text-[9px] text-gray-500 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-white/[0.06] border border-white/10 font-mono">esc</kbd>
                  Close
                </span>
              </div>
            </div>
          )}

          {/* Live Search Results */}
          {!isSearching && query.trim().length > 0 && liveResults.length > 0 && (
            <div className="p-2">
              <div className="flex items-center justify-between px-3 pt-2 pb-1.5">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-azelia-accent" />
                  Results for &ldquo;{query}&rdquo;
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  {liveResults.length} found
                </span>
              </div>

              {liveResults.slice(0, 8).map((track, idx) => (
                <div key={track.id || idx} onMouseEnter={() => setActiveIndex(idx)}>
                  <TrackSuggestionItem
                    track={track}
                    index={idx}
                    isActive={activeIndex === idx}
                    onSelect={() => handleSelectItem({ type: 'track', track })}
                    onPlay={(t) => {
                      onPlayTrack?.(t, true);
                      setHasSubmitted(true);
                      setIsFocused(false);
                    }}
                    onAddQueue={(t) => {
                      onAddToQueue?.(t);
                    }}
                  />
                </div>
              ))}

              {liveResults.length > 8 && (
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 mt-1 text-[11px] font-bold text-azelia-accent hover:text-white bg-azelia-accent/5 hover:bg-azelia-accent/10 rounded-xl transition-colors cursor-pointer"
                >
                  View all {liveResults.length} results
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}

              <div className="flex items-center justify-center gap-4 py-2.5 mt-1 border-t border-white/[0.04]">
                <span className="text-[9px] text-gray-500 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-white/[0.06] border border-white/10 font-mono">↑↓</kbd>
                  Navigate
                </span>
                <span className="text-[9px] text-gray-500 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-white/[0.06] border border-white/10 font-mono">↵</kbd>
                  Play
                </span>
                <span className="text-[9px] text-gray-500 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-white/[0.06] border border-white/10 font-mono">⇧↵</kbd>
                  Full results
                </span>
              </div>
            </div>
          )}

          {/* No Results */}
          {!isSearching && query.trim().length > 0 && liveResults.length === 0 && (
            <div className="py-10 px-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/[0.04] flex items-center justify-center">
                <Music className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-sm font-bold text-gray-300 mb-1">No results found</p>
              <p className="text-[11px] text-gray-500 max-w-[240px] mx-auto">
                Try searching for a different song, artist, or paste a YouTube URL
              </p>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#704DED]/10 hover:bg-[#704DED]/20 text-azelia-accent text-[11px] font-bold transition-colors cursor-pointer"
              >
                Search anyway
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
