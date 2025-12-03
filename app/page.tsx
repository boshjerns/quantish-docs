import Link from 'next/link';
import { Key, Zap, Search, TrendingUp, Wallet, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Discovery API',
    description: 'Search and discover markets across Polymarket, Kalshi, and more platforms.',
    href: '/mcp/discovery',
    color: 'bg-purple-500',
  },
  {
    icon: TrendingUp,
    title: 'Polymarket Trading',
    description: 'Execute trades on Polymarket with secure wallet management.',
    href: '/mcp/polymarket',
    color: 'bg-blue-500',
  },
  {
    icon: Wallet,
    title: 'Kalshi Trading',
    description: 'Trade on Kalshi prediction markets via Solana and DFlow.',
    href: '/mcp/kalshi',
    color: 'bg-green-500',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quantish Documentation
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Build AI-powered prediction market trading agents with our MCP servers.
            Access Polymarket, Kalshi, and cross-platform market discovery.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/get-started"
              className="pill-btn pill-btn-primary flex items-center gap-2 px-6 py-3"
            >
              <Key size={18} />
              Get API Key
            </Link>
            <Link
              href="/quick-start"
              className="pill-btn pill-btn-outline flex items-center gap-2 px-6 py-3"
            >
              <Zap size={18} />
              Quick Start
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              href={feature.href}
              className="card hover:shadow-md transition-shadow group"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-quantish-blue transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {feature.description}
              </p>
              <span className="text-quantish-blue text-sm font-medium flex items-center gap-1">
                Learn more <ArrowRight size={14} />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/guides/cursor"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="font-medium text-gray-900">Cursor IDE Integration</div>
            <div className="text-sm text-gray-500">
              Set up MCP in Cursor in under 2 minutes
            </div>
          </Link>
          <Link
            href="/reference/tools"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="font-medium text-gray-900">All MCP Tools</div>
            <div className="text-sm text-gray-500">
              Complete reference for all 50+ available tools
            </div>
          </Link>
          <Link
            href="/guides/wallet"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="font-medium text-gray-900">Wallet Setup</div>
            <div className="text-sm text-gray-500">
              Configure your trading wallet securely
            </div>
          </Link>
          <a
            href="https://quantish.live"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="font-medium text-gray-900">quantish.live</div>
            <div className="text-sm text-gray-500">
              Visit the main Quantish platform
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
