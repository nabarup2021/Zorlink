'use client';

export function SkeletonCard() {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden animate-pulse">
      <div className="h-28 bg-slate-800/50 relative">
        <div className="absolute top-3 right-3 w-16 h-5 rounded-lg bg-slate-700/50" />
      </div>
      <div className="px-5 -mt-10 pb-5 space-y-3">
        <div className="relative inline-block">
          <div className="w-[72px] h-[72px] rounded-2xl bg-slate-800 ring-[3px] ring-slate-900" />
          <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg bg-slate-700 ring-2 ring-slate-900" />
        </div>
        <div className="space-y-1.5">
          <div className="h-4 bg-slate-800 rounded w-2/3" />
          <div className="h-3 bg-slate-800/60 rounded w-1/2" />
        </div>
        <div className="h-6 bg-slate-800/40 rounded-lg w-1/3" />
        <div className="border-t border-slate-800/60" />
        <div className="flex justify-between">
          <div className="h-3 bg-slate-800/40 rounded w-1/4" />
          <div className="h-3 bg-slate-800/40 rounded w-1/6" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTrack() {
  return (
    <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center gap-3 animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-slate-800"></div>
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-slate-800 rounded w-2/3"></div>
        <div className="h-2.5 bg-slate-800/60 rounded w-1/3"></div>
      </div>
      <div className="w-12 h-6 rounded-lg bg-slate-800/60"></div>
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 animate-pulse">
      <div className="h-3 bg-slate-800 rounded w-1/3"></div>
      <div className="h-8 bg-slate-800 rounded w-1/2"></div>
    </div>
  );
}
