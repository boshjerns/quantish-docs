import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MCP Servers - Quantish Docs',
  description: 'Model Context Protocol servers for prediction market trading.',
};

export default function MCPOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--pn-text)' }}>
        MCP Servers
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Quantish provides four MCP servers for AI agents to interact with prediction markets.
        Each server focuses on a specific platform or function.
      </p>

      <section className="space-y-4 mb-10">
        <Link href="/mcp/discovery" className="card block hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <h3 className="font-semibold" style={{ color: 'var(--pn-text)' }}>Discovery MCP</h3>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}
            >
              Free
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
            Search and explore 39,000+ markets across Polymarket and Kalshi. Read-only, no wallet required.
            21 tools for market search, trending, arbitrage, wallet analysis.
          </p>
        </Link>

        <Link href="/mcp/polymarket" className="card block hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h3 className="font-semibold" style={{ color: 'var(--pn-text)' }}>Polymarket MCP</h3>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}
            >
              Polygon
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
            Full trading on Polymarket. Wallet management, order placement, position tracking,
            token swaps, transfers. Creates a Safe smart wallet automatically.
          </p>
        </Link>

        <Link href="/mcp/kalshi" className="card block hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <h3 className="font-semibold" style={{ color: 'var(--pn-text)' }}>Kalshi MCP</h3>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}
            >
              Solana
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
            Full trading on Kalshi via DFlow. CFTC-regulated markets, Solana wallet,
            market search, order placement. Supports BYOW (bring your own wallet).
          </p>
        </Link>

        <Link href="/mcp/limitless" className="card block hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded bg-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <h3 className="font-semibold" style={{ color: 'var(--pn-text)' }}>Limitless MCP</h3>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}
            >
              Base
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
            Trade prediction markets on Base chain. Full trading capabilities with automatic
            wallet creation. Cross-chain bridging support.
          </p>
        </Link>
      </section>

      <section className="card" style={{ background: 'var(--pn-accent-muted)' }}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--pn-accent)' }}>
          Which Server Should I Use?
        </h3>
        <ul className="space-y-1 text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
          <li><strong>Discovery</strong> — Just want to search markets? Start here.</li>
          <li><strong>Polymarket</strong> — Largest market volume, Polygon-based.</li>
          <li><strong>Kalshi</strong> — CFTC-regulated US markets, Solana-based.</li>
          <li><strong>Limitless</strong> — Base chain markets, low fees.</li>
        </ul>
      </section>
    </div>
  );
}
