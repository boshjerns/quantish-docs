'use client';

import { useState, useEffect } from 'react';
import { Search, Moon, Sun, Menu, X } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if dark mode is already set
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="header sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 border-2 border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] transition-colors"
        >
          {mobileMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
        </button>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" size={18} strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-10 pr-16 py-3 text-sm font-medium placeholder:text-[hsl(var(--muted-foreground))]"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-bold border-2 border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Version badge */}
          <span className="hidden sm:inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider border-2 border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
            v1.0.0
          </span>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="dark-mode-toggle p-3 border-2 border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] transition-all brutalist-shadow"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
          </button>
        </div>
      </div>
    </header>
  );
}
