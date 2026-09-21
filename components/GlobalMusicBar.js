'use client';

import { useState } from 'react';
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
  Heart,
  Sliders,
  Sparkles,
  RadioTower,
  Globe,
  Disc,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMusic } from '../lib/music';

export default function GlobalMusicBar() {
  const pathname = usePathname();
  const {
    currentTrack,
    hasStartedPlaying,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    playbackMode,
    activeFilter,
    togglePlayPause,
    skipTrack,
    previousTrack,
    seekTrack,
    setVolumeLevel,
    toggleMute,
    toggleRepeat,
    toggleShuffle,
    setFilter,
  } = useMusic();

  const [isLiked, setIsLiked] = useState(false);

  if (pathname === '/player' || !hasStartedPlaying || !currentTrack) return null;

  const fmtTime = (ms) => {
    if (!ms || ms < 0 || isNaN(ms)) return '0:00';
    const s = Math.floor((ms / 1000) % 60);
    const m = Math.floor((ms / 60000) % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressRatio =
    duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  const handleSeekClick = (e) => {
    const clickX = e.nativeEvent.offsetX;
    const totalWidth = e.currentTarget.offsetWidth;
    const ratio = Math.max(0, Math.min(1, clickX / totalWidth));
    const seekMs = Math.round(ratio * duration);
    seekTrack(seekMs);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0a17]/95 backdrop-blur-3xl border-t border-white/[0.08] px-4 sm:px-8 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Track Info & Quick Web Player Link */}
        <div className="flex items-center gap-3.5 w-1/4 min-w-0">
          <Link href="/player" className="relative group shrink-0">
            <img
              src={currentTrack?.artworkUrl || '/azelia-pfp.png'}
              alt=""
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/azelia-pfp.png';
              }}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/10 shadow-lg group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Disc className="w-5 h-5 text-white animate-spin" />
            </div>
          </Link>

          <div className="min-w-0 hidden sm:block">
            <Link
              href="/player"
              className="font-bold text-xs text-white truncate hover:text-azelia-accent transition-colors block"
            >
              {currentTrack?.title || 'Discover Music'}
            </Link>
            <div className="text-[11px] text-gray-400 truncate flex items-center gap-1.5">
              <span className="truncate">{currentTrack?.author || 'Azelia 24/7 Engine'}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-gray-300 font-mono shrink-0 font-bold">
                {playbackMode === 'browser' ? '🌐 Web' : '📡 VC'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer hidden md:block ${
              isLiked ? 'text-[#ed4245]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Center: Remote Controls & Seeker Slider */}
        <div className="flex flex-col items-center gap-1.5 flex-1 max-w-md">
          <div className="flex items-center gap-5">
            <button
              onClick={toggleShuffle}
              className={`transition-colors cursor-pointer ${
                isShuffle ? 'text-azelia-accent' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
            <button onClick={previousTrack} className="text-gray-400 hover:text-white cursor-pointer">
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
            <button onClick={skipTrack} className="text-gray-400 hover:text-white cursor-pointer">
              <SkipForward className="w-4 h-4" />
            </button>
            <button
              onClick={toggleRepeat}
              className={`transition-colors cursor-pointer ${
                repeatMode !== 'off' ? 'text-azelia-accent' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Draggable Seeker Slider */}
          <div className="w-full flex items-center gap-2 text-[10px] font-mono text-gray-400">
            <span>{fmtTime(currentTime)}</span>
            <div
              onClick={handleSeekClick}
              className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden cursor-pointer relative group"
            >
              <div
                className="bg-gradient-to-r from-azelia-accent to-purple-400 h-full transition-all group-hover:brightness-125"
                style={{ width: `${progressRatio}%` }}
              ></div>
            </div>
            <span>{fmtTime(duration)}</span>
          </div>
        </div>

        {/* Right: Equalizer Filter & Volume */}
        <div className="flex items-center justify-end gap-3 w-1/4">
          <div className="relative hidden lg:block">
            <select
              value={activeFilter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#181524] border border-white/[0.08] text-white text-[11px] rounded-xl px-2.5 py-1.5 appearance-none pr-6 focus:outline-none focus:border-azelia-accent cursor-pointer font-semibold shadow-md"
            >
              <option value="clear">Filter: Normal</option>
              <option value="bassboost">BassBoost Ultra</option>
              <option value="nightcore">Nightcore</option>
              <option value="vaporwave">Vaporwave</option>
              <option value="8d">8D Audio</option>
            </select>
            <Sliders className="w-3 h-3 text-gray-400 absolute right-2 top-2 pointer-events-none" />
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white cursor-pointer">
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
              onChange={(e) => setVolumeLevel(Number(e.target.value))}
              className="w-16 sm:w-20 accent-azelia-accent cursor-pointer h-1.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
