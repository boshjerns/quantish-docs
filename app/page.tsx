import Link from 'next/link';
import { Key, Zap, Search, TrendingUp, Wallet, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Discovery API',
    description: 'Search and discover markets across Polymarket, Kalshi, and more platforms.',
    href: '/mcp/discovery',
  },
  {
    icon: TrendingUp,
    title: 'Polymarket Trading',
    description: 'Execute trades on Polymarket with secure wallet management.',
    href: '/mcp/polymarket',
  },
  {
    icon: Wallet,
    title: 'Kalshi Trading',
    description: 'Trade on Kalshi prediction markets via Solana and DFlow.',
    href: '/mcp/kalshi',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 uppercase">
          Quantish<br />Documentation
        </h1>
        <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] mb-10 max-w-2xl mx-auto">
          Build AI-powered prediction market trading agents with our MCP servers.
          Access Polymarket, Kalshi, and cross-platform market discovery.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/get-started" className="btn-primary">
            <Key size={18} strokeWidth={2.5} />
            Get API Key
          </Link>
          <Link href="/quick-start" className="btn-secondary">
            <Zap size={18} strokeWidth={2.5} />
            Quick Start
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              href={feature.href}
              className="card group"
            >
              <div className="w-14 h-14 bg-[hsl(var(--primary))] flex items-center justify-center mb-6 border-2 border-[hsl(var(--border))]">
                <Icon className="text-[hsl(var(--primary-foreground))]" size={28} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-tight group-hover:text-[hsl(var(--primary))] dark:group-hover:text-[hsl(var(--accent))] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[hsl(var(--muted-foreground))] text-sm mb-6">
                {feature.description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                Learn more <ArrowRight size={16} strokeWidth={2.5} />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6 uppercase tracking-tight">Quick Links</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/guides/cursor"
            className="p-4 border-2 border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] transition-colors group"
          >
            <div className="font-bold uppercase tracking-tight group-hover:text-[hsl(var(--primary))] dark:group-hover:text-[hsl(var(--accent))]">
              Cursor IDE Integration
            </div>
            <div className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
              Set up MCP in Cursor in under 2 minutes
            </div>
          </Link>
          <Link
            href="/reference/tools"
            className="p-4 border-2 border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] transition-colors group"
          >
            <div className="font-bold uppercase tracking-tight group-hover:text-[hsl(var(--primary))] dark:group-hover:text-[hsl(var(--accent))]">
              All MCP Tools
            </div>
            <div className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
              Complete reference for all 50+ available tools
            </div>
          </Link>
          <Link
            href="/guides/wallet"
            className="p-4 border-2 border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] transition-colors group"
          >
            <div className="font-bold uppercase tracking-tight group-hover:text-[hsl(var(--primary))] dark:group-hover:text-[hsl(var(--accent))]">
              Wallet Setup
            </div>
            <div className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
              Configure your trading wallet securely
            </div>
          </Link>
          <a
            href="https://quantish.live"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border-2 border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] transition-colors group"
          >
            <div className="font-bold uppercase tracking-tight group-hover:text-[hsl(var(--primary))] dark:group-hover:text-[hsl(var(--accent))]">
              quantish.live
            </div>
            <div className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
              Visit the main Quantish platform
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
