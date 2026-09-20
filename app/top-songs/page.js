'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { api } from '../../lib/api';

export default function TopSongsPage() {
  const [topSongs, setTopSongs] = useState({ daily: [], weekly: [], monthly: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSongs() {
      try {
        const data = await api.getTopSongs().catch(() => null);
        if (data?.topSongs) {
          setTopSongs(data.topSongs);
        }
      } catch {
        /* fallback */
      } finally {
        setLoading(false);
      }
    }
    loadSongs();
  }, []);

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
          Top Songs
        </h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Top 10 songs listened on Azelia.<br />
          <span className="text-azelia-accent font-medium">Discover the most popular tracks that users are enjoying daily, weekly, and monthly.</span>
        </p>
      </div>

      {/* 3 Columns: DAILY | WEEKLY | MONTHLY */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* 1. DAILY */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Daily</h3>
          <div className="space-y-2.5">
            {topSongs.daily.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#181524] border border-white/[0.06] rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:bg-[#1e1a2e] transition-colors"
              >
                <img src={t.artworkUrl} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-white truncate">{t.title}</div>
                  <div className="text-[11px] text-gray-400 truncate">{t.author}</div>
                </div>
                {t.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-[#3ba55c] shrink-0" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-[#ed4245] shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. WEEKLY */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Weekly</h3>
          <div className="space-y-2.5">
            {topSongs.weekly.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#181524] border border-white/[0.06] rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:bg-[#1e1a2e] transition-colors"
              >
                <img src={t.artworkUrl} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-white truncate">{t.title}</div>
                  <div className="text-[11px] text-gray-400 truncate">{t.author}</div>
                </div>
                {t.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-[#3ba55c] shrink-0" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-[#ed4245] shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. MONTHLY */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Monthly</h3>
          <div className="space-y-2.5">
            {topSongs.monthly.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#181524] border border-white/[0.06] rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:bg-[#1e1a2e] transition-colors"
              >
                <img src={t.artworkUrl} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-white truncate">{t.title}</div>
                  <div className="text-[11px] text-gray-400 truncate">{t.author}</div>
                </div>
                {t.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-[#3ba55c] shrink-0" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-[#ed4245] shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
