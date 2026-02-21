'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { searchIndex, SearchItem } from '@/lib/search-index';

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Initialize Fuse.js
  const fuse = useRef(
    new Fuse(searchIndex, {
      keys: ['title', 'description', 'keywords', 'category'],
      threshold: 0.4,
      includeScore: true,
    })
  ).current;

  // Search as user types
  useEffect(() => {
    if (query.trim().length > 0) {
      const searchResults = fuse.search(query, { limit: 5 });
      setResults(searchResults.map((r) => r.item));
      setSelectedIndex(0);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, fuse]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Keyboard navigation in results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) {
        router.push(selected.href);
        setQuery('');
        setIsOpen(false);
      }
    }
  };

  const handleSelect = (item: SearchItem) => {
    router.push(item.href);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Search Input */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-text"
        style={{ background: 'var(--pn-elevated)', color: 'var(--pn-text-muted)' }}
        onClick={() => inputRef.current?.focus()}
      >
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="Search docs..."
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: 'var(--pn-text)' }}
        />
        <span className="text-xs opacity-50 hidden sm:inline">⌘K</span>
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-1 rounded-md shadow-lg overflow-hidden z-50"
          style={{
            background: 'var(--pn-surface)',
            border: '1px solid var(--pn-border)',
          }}
        >
          {results.map((item, index) => (
            <button
              key={item.href}
              onClick={() => handleSelect(item)}
              className="w-full px-3 py-2 text-left transition-colors"
              style={{
                background: index === selectedIndex ? 'var(--pn-accent-muted)' : 'transparent',
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className="text-sm font-medium truncate"
                  style={{ color: index === selectedIndex ? 'var(--pn-accent)' : 'var(--pn-text)' }}
                >
                  {item.title}
                </span>
                <span
                  className="text-xs shrink-0 px-1.5 py-0.5 rounded"
                  style={{ background: 'var(--pn-elevated)', color: 'var(--pn-text-muted)' }}
                >
                  {item.category}
                </span>
              </div>
              <p
                className="text-xs mt-0.5 truncate"
                style={{ color: 'var(--pn-text-secondary)' }}
              >
                {item.description}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {isOpen && query.trim() && results.length === 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-1 rounded-md shadow-lg p-3 text-sm z-50"
          style={{
            background: 'var(--pn-surface)',
            border: '1px solid var(--pn-border)',
            color: 'var(--pn-text-muted)',
          }}
        >
          No results found for &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
