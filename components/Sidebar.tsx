'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { Search } from '@/components/Search';
import { navigation, type NavItem } from '@/lib/navigation';

// Recursively check if any descendant href matches the pathname
function hasActiveDescendant(item: NavItem, pathname: string): boolean {
  if (item.href === pathname) return true;
  if (item.href && pathname.startsWith(item.href + '/')) return true;
  return item.items?.some(child => hasActiveDescendant(child, pathname)) || false;
}

// Get all titles that should be expanded to show the active page
function getExpandedTitles(items: NavItem[], pathname: string): string[] {
  const expanded: string[] = [];
  for (const item of items) {
    if (item.items && hasActiveDescendant(item, pathname)) {
      expanded.push(item.title);
      expanded.push(...getExpandedTitles(item.items, pathname));
    }
  }
  return expanded;
}

// Recursive nav node component
function NavNode({ item, depth, expandedKeys, toggleExpand, pathname }: {
  item: NavItem;
  depth: number;
  expandedKeys: Set<string>;
  toggleExpand: (key: string) => void;
  pathname: string;
}) {
  const hasItems = item.items && item.items.length > 0;
  const isLink = !!item.href && !hasItems;
  const isExpandable = hasItems;
  // Use a unique key combining depth and title to avoid collisions
  const expandKey = `${depth}:${item.title}`;
  const isExpanded = expandedKeys.has(expandKey);
  const isActive = item.href === pathname || (item.href && pathname.startsWith(item.href + '/'));

  // Level 0: Top section headers (Introduction, API Reference, etc.)
  if (depth === 0) {
    return (
      <div className="mb-3">
        {isExpandable ? (
          <button
            onClick={() => toggleExpand(expandKey)}
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-[var(--pn-elevated)] rounded-md transition-colors"
            style={{ color: hasActiveDescendant(item, pathname) ? 'var(--pn-accent)' : 'var(--pn-text-secondary)' }}
          >
            <span>{item.title}</span>
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        ) : isLink ? (
          <Link href={item.href!} className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
            style={{ color: isActive ? 'var(--pn-accent)' : 'var(--pn-text-secondary)' }}>
            {item.title}
          </Link>
        ) : null}
        {isExpandable && isExpanded && (
          <div className="mt-1 ml-2 space-y-0.5 border-l border-[var(--pn-border)] pl-2">
            {item.items!.map(child => (
              <NavNode key={child.title} item={child} depth={1} expandedKeys={expandedKeys} toggleExpand={toggleExpand} pathname={pathname} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Level 1: Platform links or collapsible platform groups
  if (depth === 1) {
    // Simple link (e.g., "Overview")
    if (isLink) {
      return (
        <Link href={item.href!}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors"
          style={{
            color: isActive ? 'var(--pn-accent)' : 'var(--pn-text-secondary)',
            background: isActive ? 'var(--pn-accent-muted)' : 'transparent',
          }}>
          {item.logo && <Image src={item.logo} alt="" width={14} height={14} className="rounded-sm opacity-70" />}
          {item.title}
        </Link>
      );
    }

    // Collapsible platform group
    if (isExpandable) {
      return (
        <div className="mt-0.5">
          <button
            onClick={() => toggleExpand(expandKey)}
            className="flex items-center gap-2 w-full px-3 py-1.5 text-sm rounded-md hover:bg-[var(--pn-elevated)] transition-colors text-left"
            style={{ color: hasActiveDescendant(item, pathname) ? 'var(--pn-accent)' : 'var(--pn-text-secondary)' }}
          >
            {item.logo && <Image src={item.logo} alt="" width={14} height={14} className="rounded-sm opacity-70" />}
            <span className="flex-1">{item.title}</span>
            {isExpanded ? <ChevronDown className="w-3 h-3 shrink-0" /> : <ChevronRight className="w-3 h-3 shrink-0" />}
          </button>
          {isExpanded && (
            <div className="ml-3 mt-0.5 space-y-0.5 border-l border-[var(--pn-border)] pl-2">
              {/* Platform landing page link */}
              {item.href && (
                <Link href={item.href}
                  className="flex items-center px-3 py-1 text-xs rounded-md transition-colors"
                  style={{
                    color: pathname === item.href ? 'var(--pn-accent)' : 'var(--pn-text-muted)',
                    background: pathname === item.href ? 'var(--pn-accent-muted)' : 'transparent',
                  }}>
                  Overview
                </Link>
              )}
              {item.items!.map(child => (
                <NavNode key={child.title} item={child} depth={2} expandedKeys={expandedKeys} toggleExpand={toggleExpand} pathname={pathname} />
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  }

  // Level 2: Subcategory group or direct endpoint link
  if (depth === 2) {
    // Direct endpoint link (flat platforms with < 8 endpoints)
    if (isLink) {
      return (
        <Link href={item.href!}
          className="flex items-center px-3 py-1 text-xs rounded-md transition-colors"
          style={{
            color: isActive ? 'var(--pn-accent)' : 'var(--pn-text-muted)',
            background: isActive ? 'var(--pn-accent-muted)' : 'transparent',
          }}>
          {item.title}
        </Link>
      );
    }

    // Subcategory group
    if (isExpandable) {
      return (
        <div className="mt-1">
          <button
            onClick={() => toggleExpand(expandKey)}
            className="flex items-center gap-1 w-full px-3 py-1 text-xs font-medium rounded-md hover:bg-[var(--pn-elevated)] transition-colors text-left"
            style={{ color: hasActiveDescendant(item, pathname) ? 'var(--pn-accent)' : 'var(--pn-text-muted)' }}
          >
            <span className="flex-1">{item.title}</span>
            {isExpanded ? <ChevronDown className="w-2.5 h-2.5 shrink-0" /> : <ChevronRight className="w-2.5 h-2.5 shrink-0" />}
          </button>
          {isExpanded && (
            <div className="ml-2 mt-0.5 space-y-0.5">
              {item.items!.map(child => (
                <NavNode key={child.title} item={child} depth={3} expandedKeys={expandedKeys} toggleExpand={toggleExpand} pathname={pathname} />
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  }

  // Level 3+: Endpoint links
  if (isLink) {
    return (
      <Link href={item.href!}
        className="block px-3 py-1 text-xs rounded-md transition-colors truncate"
        style={{
          color: isActive ? 'var(--pn-accent)' : 'var(--pn-text-muted)',
          background: isActive ? 'var(--pn-accent-muted)' : 'transparent',
        }}
        title={item.title}>
        {item.title}
      </Link>
    );
  }

  return null;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Calculate initially expanded sections based on current path
  const initialExpanded = useMemo(() => {
    const titles = getExpandedTitles(navigation, pathname);
    // Build the expandKey format: "depth:title"
    const keys = new Set<string>();
    // We need to walk the tree with depth tracking
    function walk(items: NavItem[], depth: number) {
      for (const item of items) {
        if (item.items && hasActiveDescendant(item, pathname)) {
          keys.add(`${depth}:${item.title}`);
          walk(item.items, depth + 1);
        }
      }
    }
    walk(navigation, 0);
    return keys;
  }, [pathname]);

  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(initialExpanded);

  const toggleExpand = (key: string) => {
    setExpandedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-3 left-3 z-50 p-2.5 rounded-xl md:hidden shadow-lg"
        style={{
          background: 'var(--pn-surface)',
          border: '1px solid var(--pn-border)',
          boxShadow: 'var(--shadow)',
        }}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-[280px] z-40
          overflow-y-auto overflow-x-hidden
          transition-transform duration-300 ease-out
          md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          background: 'var(--pn-surface)',
          borderRight: '1px solid var(--pn-border)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Logo */}
        <div className="sticky top-0 z-10 p-4 border-b" style={{ borderColor: 'var(--pn-border)', background: 'var(--pn-surface)' }}>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/quantish-logo.svg"
              alt="Quantish"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <div>
              <span className="font-bold text-base" style={{ color: 'var(--pn-text)' }}>Quantish</span>
              <span
                className="ml-2 text-xs px-1.5 py-0.5 rounded"
                style={{ background: 'var(--pn-elevated)', color: 'var(--pn-text-muted)' }}
              >
                Docs
              </span>
            </div>
          </Link>
        </div>

        {/* Search */}
        <div className="p-4 border-b" style={{ borderColor: 'var(--pn-border)' }}>
          <Search />
        </div>

        {/* Navigation */}
        <nav className="p-4 pb-24">
          {navigation.map((item) => (
            <NavNode
              key={item.title}
              item={item}
              depth={0}
              expandedKeys={expandedKeys}
              toggleExpand={toggleExpand}
              pathname={pathname}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t" style={{ borderColor: 'var(--pn-border)', background: 'var(--pn-surface)' }}>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/joinQuantish"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-[var(--pn-elevated)] transition-colors"
              style={{ color: 'var(--pn-text-muted)' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://x.com/joinQuantish"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-[var(--pn-elevated)] transition-colors"
              style={{ color: 'var(--pn-text-muted)' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://quantish.live"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs font-medium"
              style={{ color: 'var(--pn-accent)' }}
            >
              quantish.live →
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
