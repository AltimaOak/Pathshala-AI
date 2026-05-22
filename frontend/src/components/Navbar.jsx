import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sparkles, Bell, Search } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [initials, setInitials] = useState('AY');

  // Load initials dynamically from localStorage on mount and when storage changes
  useEffect(() => {
    const fetchProfileName = () => {
      const savedName = localStorage.getItem('profileName') || 'Aditya Yadav';
      const parts = savedName.trim().split(/\s+/);
      const userInitials = parts.map(p => p[0]).join('').slice(0, 2).toUpperCase();
      setInitials(userInitials || 'AY');
    };

    fetchProfileName();

    // Listen to local profile updates
    window.addEventListener('storage', fetchProfileName);
    const interval = setInterval(fetchProfileName, 1000); // Polling for fast cross-page transitions
    return () => {
      window.removeEventListener('storage', fetchProfileName);
      clearInterval(interval);
    };
  }, []);

  // Get dynamic title based on path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/chat':
        return 'AI Study Buddy';
      case '/quiz':
        return 'Quiz Generator';
      case '/upload':
        return 'Study Materials';
      case '/settings':
        return 'Settings';
      default:
        return 'Workspace';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-brand-beige/55 bg-brand-cream/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {/* Page Title */}
        <h1 className="text-xl font-semibold tracking-tight text-brand-charcoal font-display">
          {getPageTitle()}
        </h1>
        <span className="hidden rounded-full bg-brand-beige/40 px-2.5 py-0.5 text-xs font-medium text-brand-charcoal/70 sm:inline-block">
          SaaS Beta
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar Placeholder */}
        <div className="relative hidden max-w-xs items-center sm:flex">
          <Search className="absolute left-3 h-4 w-4 text-brand-charcoal/40" />
          <input
            id="workspace-search"
            type="text"
            placeholder="Search notes, concepts..."
            className="h-9 w-60 rounded-lg border border-brand-beige bg-white/50 pl-9 pr-4 text-sm text-brand-charcoal placeholder-brand-charcoal/40 transition-colors focus:border-brand-brown focus:bg-white focus:outline-none"
          />
          <kbd className="absolute right-3 hidden rounded border border-brand-beige bg-brand-cream px-1.5 text-[10px] font-medium text-brand-charcoal/50 sm:block">
            ⌘K
          </kbd>
        </div>

        {/* Beta Sandbox Badge */}
        <div className="flex items-center gap-1.5 rounded-lg bg-brand-brown/10 border border-brand-brown/25 px-3 py-1.5 text-xs font-bold text-brand-brown select-none">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          Beta Sandbox Mode
        </div>

        {/* Notifications Icon */}
        <button className="relative rounded-lg p-2 text-brand-charcoal/60 hover:bg-brand-beige/40 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-brown"></span>
        </button>

        {/* User Profile Avatar */}
        <Link
          to="/settings"
          className="h-8 w-8 rounded-full border border-brand-brown/30 bg-brand-beige hover:border-brand-brown/70 flex items-center justify-center text-brand-charcoal font-bold text-xs transition-colors"
          title="Go to Settings"
        >
          {initials}
        </Link>
      </div>
    </header>
  );
}
