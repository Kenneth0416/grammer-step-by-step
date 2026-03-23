"use client";

import Link from "next/link";

interface NavigationProps {
  activeRoute?: '/' | '/grammar' | '/practice' | '/game';
}

export function Navigation({ activeRoute = '/' }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card-elevated border-b border-academic-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-academic-blue to-academic-blue-dark flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="font-display text-lg text-white">GQ</span>
            </div>
            <span className="font-display text-lg font-semibold text-text-primary hidden sm:block group-hover:text-academic-blue transition-colors">
              Grammar Quest
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className={`nav-link ${activeRoute === '/' ? 'active' : ''}`}>Home</Link>
            <Link href="/grammar" className={`nav-link ${activeRoute === '/grammar' ? 'active' : ''}`}>Grammar</Link>
            <Link href="/practice" className={`nav-link ${activeRoute === '/practice' ? 'active' : ''}`}>Practice</Link>
            <Link href="/game" className={`nav-link ${activeRoute === '/game' ? 'active' : ''}`}>Game</Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="points-display hover-glow cursor-pointer">
              <span className="text-white">★</span>
              <span>1,250</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-academic-blue to-sky-light flex items-center justify-center text-white font-display text-sm cursor-pointer hover:scale-105 transition-transform shadow-md">
              JK
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
