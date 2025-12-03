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
    <aside className="w-64 border-r border-gray-200 bg-white/80 backdrop-blur-sm h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="font-semibold text-lg">Quantish Docs</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={16} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* External links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <a
            href="https://quantish.live"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-black transition-colors"
          >
            <ExternalLink size={14} />
            quantish.live
          </a>
          <a
            href="https://github.com/boshjerns/polymarket-mcp-server"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-black transition-colors"
          >
            <ExternalLink size={14} />
            GitHub
          </a>
        </div>
      </nav>
    </aside>
  );
}

