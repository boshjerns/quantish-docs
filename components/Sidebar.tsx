'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Key, 
  Zap, 
  BookOpen, 
  Wallet,
  Search,
  TrendingUp,
  Settings,
  ExternalLink
} from 'lucide-react';

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Introduction', href: '/', icon: Home },
      { name: 'Get API Key', href: '/get-started', icon: Key },
      { name: 'Quick Start', href: '/quick-start', icon: Zap },
    ],
  },
  {
    title: 'MCP Servers',
    items: [
      { name: 'Polymarket', href: '/mcp/polymarket', icon: TrendingUp },
      { name: 'Kalshi', href: '/mcp/kalshi', icon: TrendingUp },
      { name: 'Discovery', href: '/mcp/discovery', icon: Search },
    ],
  },
  {
    title: 'Guides',
    items: [
      { name: 'Wallet Setup', href: '/guides/wallet', icon: Wallet },
      { name: 'Trading', href: '/guides/trading', icon: TrendingUp },
      { name: 'Cursor Integration', href: '/guides/cursor', icon: Settings },
    ],
  },
  {
    title: 'Reference',
    items: [
      { name: 'All Tools', href: '/reference/tools', icon: BookOpen },
      { name: 'Authentication', href: '/reference/auth', icon: Key },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar w-64 h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b-2 border-[hsl(var(--border))]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[hsl(var(--primary))] flex items-center justify-center border-2 border-[hsl(var(--border))] brutalist-shadow">
            <span className="text-[hsl(var(--primary-foreground))] font-bold text-lg">Q</span>
          </div>
          <span className="font-bold text-lg tracking-tight uppercase">Quantish</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 px-3 text-[hsl(var(--muted-foreground))]">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`sidebar-link text-sm ${isActive ? 'active' : ''}`}
                    >
                      <Icon size={16} strokeWidth={2.5} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* External links */}
        <div className="mt-8 pt-6 border-t-2 border-[hsl(var(--border))]">
          <a
            href="https://quantish.live"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-[hsl(var(--muted))] transition-colors"
          >
            <ExternalLink size={14} strokeWidth={2.5} />
            QUANTISH.LIVE
          </a>
          <a
            href="https://github.com/boshjerns/polymarket-mcp-server"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-[hsl(var(--muted))] transition-colors"
          >
            <ExternalLink size={14} strokeWidth={2.5} />
            GITHUB
          </a>
        </div>
      </nav>
    </aside>
  );
}
