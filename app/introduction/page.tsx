import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Overview - Quantish Docs',
  description: 'Unified prediction market infrastructure for Polymarket, Kalshi, and Limitless.',
};

export default function OverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--pn-text)' }}>
        What is Quantish?
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Quantish provides unified infrastructure for prediction markets. One API to search,
        trade, and manage wallets across multiple platforms.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Three MCP Servers
        </h2>
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-2">Discovery MCP</h3>
            <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
              Search and explore markets across Polymarket and Kalshi. Read-only, no wallet required.
              Free API key, instant access.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Polymarket MCP</h3>
            <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
              Full trading on Polymarket (Polygon). Wallet management, order placement, position tracking,
              token swaps and transfers. Creates a Safe smart wallet automatically.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Kalshi MCP</h3>
            <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
              Full trading on Kalshi via DFlow (Solana). Wallet management, market search, order placement,
              token swaps. Creates a Solana wallet or import your own.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Limitless MCP</h3>
            <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
              Trade prediction markets on Base chain. Full trading capabilities with automatic wallet creation.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Key Features
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--pn-accent)' }}>•</span>
            <span style={{ color: 'var(--pn-text-secondary)' }}>
              <strong>Cross-Platform Search</strong> — 39,000+ markets, filter by probability, find arbitrage
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--pn-accent)' }}>•</span>
            <span style={{ color: 'var(--pn-text-secondary)' }}>
              <strong>Unified Trading</strong> — Place orders, manage positions, redeem winnings
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--pn-accent)' }}>•</span>
            <span style={{ color: 'var(--pn-text-secondary)' }}>
              <strong>Wallet Analytics</strong> — Trader profiles, whale tracking, social discovery
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--pn-accent)' }}>•</span>
            <span style={{ color: 'var(--pn-text-secondary)' }}>
              <strong>AI Agent Ready</strong> — MCP protocol for Claude Desktop, Cursor, Windsurf
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Next Steps
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <a href="/introduction/quickstart" className="card block hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-1" style={{ color: 'var(--pn-text)' }}>Quick Start →</h3>
            <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
              Get connected in 3 steps
            </p>
          </a>
          <a href="/mcp" className="card block hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-1" style={{ color: 'var(--pn-text)' }}>MCP Servers →</h3>
            <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
              Explore all available tools
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}
