'use client';

import Link from 'next/link';
import { Disc, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-400 shadow-2xl">
        <Disc className="w-10 h-10 animate-spin" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
          404 Page Not Found
        </span>
        <h1 className="text-4xl font-black text-white">Track Off-Track!</h1>
        <p className="text-slate-400 text-xs leading-relaxed">
          The page or server route you are looking for does not exist or has been moved.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold text-xs shadow-lg shadow-brand-500/20 transition-all flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Return to Home
        </Link>
        <Link
          href="/player"
          className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white font-semibold text-xs transition-all flex items-center gap-2"
        >
          <Disc className="w-4 h-4 text-brand-400" /> Open Web Player
        </Link>
      </div>
    </div>
  );
}
