'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Sparkles, ChevronDown, Server, Disc } from 'lucide-react';
import { useAuth } from '../lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, loginWithDiscord } = useAuth();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Commands', href: '/commands' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Status', href: '/status' },
    { label: 'Top Songs', href: '/top-songs' },
    { label: 'Team', href: '/team' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0e0c15]/85 border-b border-white/[0.06] px-6 lg:px-12 py-4 flex items-center justify-between">
      {/* Left Brand Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <img
          src="/azelia-pfp.png"
          alt="Azelia"
          className="w-8 h-8 rounded-full object-cover ring-2 ring-azelia-accent/40 group-hover:scale-105 transition-transform"
        />
        <span className="text-2xl font-black tracking-tight text-white flex items-center gap-0.5">
          Azelia
        </span>
      </Link>

      {/* Center Nav Links */}
      <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
        <div className="relative group">
          <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 py-1">
            Features <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>
          <div className="absolute top-full left-0 mt-2 w-48 bg-[#161324] border border-white/10 rounded-2xl p-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <Link href="/features" className="block px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/5">
              Features Overview
            </Link>
            <Link href="/top-songs" className="block px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/5">
              Top Songs Charts
            </Link>
          </div>
        </div>

        {navLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-colors ${
              pathname === item.href ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        ))}

        <Link
          href="/premium"
          className="text-azelia-gold font-semibold flex items-center gap-1 hover:brightness-110 transition-all"
        >
          Premium <Sparkles className="w-3.5 h-3.5 text-azelia-gold" />
        </Link>
      </nav>

      {/* Right Login / User Section */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2.5 bg-[#181524] hover:bg-[#201c30] border border-white/10 px-3.5 py-2 rounded-2xl transition-all shadow-lg cursor-pointer"
            >
              <img
                src={user.avatar || '/azelia-pfp.png'}
                alt=""
                className="w-6 h-6 rounded-full object-cover ring-1 ring-azelia-accent/50"
              />
              <span className="text-xs font-bold text-white">{user.globalName || user.username}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isUserDropdownOpen ? 'rotate-180 text-white' : ''}`} />
            </button>

            {/* Dropdown Menu (Dashboard & Web Player) */}
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#161324] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 space-y-1 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                  <div className="font-bold text-xs text-white truncate">{user.globalName || user.username}</div>
                  <div className="text-[10px] text-gray-500 font-mono truncate">ID: {user.id}</div>
                </div>

                <Link
                  href="/servers"
                  onClick={() => setIsUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                >
                  <Server className="w-4 h-4 text-azelia-accent" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  href="/player"
                  onClick={() => setIsUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                >
                  <Disc className="w-4 h-4 text-emerald-400" />
                  <span>Web Player</span>
                </Link>

                <Link
                  href="/premium"
                  onClick={() => setIsUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-azelia-gold hover:bg-white/5 transition-colors font-medium"
                >
                  <Sparkles className="w-4 h-4 text-azelia-gold" />
                  <span>Premium Perks</span>
                </Link>

                <div className="pt-1 border-t border-white/[0.06]">
                  <button
                    onClick={() => { logout(); setIsUserDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors font-medium text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={loginWithDiscord}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-semibold transition-all shadow-lg shadow-[#5865F2]/25 cursor-pointer hover:scale-105 active:scale-95"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.3 18.3 0 0 0-5.487 0a13 13 0 0 0-.617-1.25a.08.08 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.1.1 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.08.08 0 0 0 .084-.028a14 14 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13 13 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10 10 0 0 0 .372-.292a.07.07 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.07.07 0 0 1 .078.01q.181.149.373.292a.077.077 0 0 1-.006.127a12.3 12.3 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.08.08 0 0 0 .084.028a19.8 19.8 0 0 0 6.002-3.03a.08.08 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03M8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418m7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418"/>
            </svg>
            Login with Discord
          </button>
        )}
      </div>
    </header>
  );
}
