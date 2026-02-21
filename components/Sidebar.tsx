'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Menu, X, Search } from 'lucide-react';
import Image from 'next/image';

interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: 'Introduction',
    items: [
      { title: 'Overview', href: '/introduction' },
      { title: 'Quick Start', href: '/introduction/quickstart' },
      { title: 'Authentication', href: '/introduction/authentication' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Overview', href: '/api' },
      { title: 'Authentication', href: '/api/auth' },
      { title: 'Markets', href: '/api/markets' },
      { title: 'Wallet Analytics', href: '/api/wallets' },
      { title: 'Account', href: '/api/account' },
      { title: 'Polymarket', href: '/api/polymarket' },
      { title: 'Kalshi', href: '/api/kalshi' },
      { title: 'Limitless', href: '/api/limitless' },
    ],
  },
  {
    title: 'MCP Servers',
    items: [
      { title: 'Overview', href: '/mcp' },
      { title: 'Discovery', href: '/mcp/discovery' },
      { title: 'Polymarket', href: '/mcp/polymarket' },
      { title: 'Kalshi', href: '/mcp/kalshi' },
      { title: 'Limitless', href: '/mcp/limitless' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'Wallet Setup', href: '/guides/wallet-setup' },
      { title: 'Trading Flow', href: '/guides/trading-flow' },
    ],
  },
];

function Section({ item, expandedSections, toggleSection }: {
  item: NavItem;
  expandedSections: string[];
  toggleSection: (title: string) => void;
}) {
  const pathname = usePathname();
  const isExpanded = expandedSections.includes(item.title);
  const hasItems = item.items && item.items.length > 0;

  // Check if any child is active
  const hasActiveChild = item.items?.some(sub => sub.href === pathname);

  return (
    <div className="mb-4">
      {hasItems ? (
        <button
          onClick={() => toggleSection(item.title)}
          className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-[var(--pn-elevated)] rounded-md transition-colors"
          style={{ color: hasActiveChild ? 'var(--pn-accent)' : 'var(--pn-text-secondary)' }}
        >
          <span>{item.title}</span>
          {isExpanded ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
        </button>
      ) : (
        <Link
          href={item.href || '#'}
          className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
          style={{ color: pathname === item.href ? 'var(--pn-accent)' : 'var(--pn-text-secondary)' }}
        >
          {item.title}
        </Link>
      )}
      {(hasItems && isExpanded) && (
        <div className="mt-1 ml-2 space-y-0.5 border-l border-[var(--pn-border)] pl-3">
          {item.items!.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href || '#'}
              className="block px-3 py-1.5 text-sm rounded-md transition-colors"
              style={{
                color: pathname === sub.href ? 'var(--pn-accent)' : 'var(--pn-text-secondary)',
                background: pathname === sub.href ? 'var(--pn-accent-muted)' : 'transparent',
              }}
            >
              {sub.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Auto-expand sections based on current path
  const getInitialExpanded = () => {
    const expanded: string[] = [];
    navigation.forEach(section => {
      if (section.items?.some(item => item.href === pathname)) {
        expanded.push(section.title);
      }
    });
    return expanded;
  };

  const [expandedSections, setExpandedSections] = useState<string[]>(getInitialExpanded);

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
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

        {/* Search placeholder */}
        <div className="p-4 border-b" style={{ borderColor: 'var(--pn-border)' }}>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm"
            style={{ background: 'var(--pn-elevated)', color: 'var(--pn-text-muted)' }}
          >
            <Search className="w-4 h-4" />
            <span>Search...</span>
            <span className="ml-auto text-xs opacity-50">⌘K</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {navigation.map((item) => (
            <Section
              key={item.title}
              item={item}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
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
