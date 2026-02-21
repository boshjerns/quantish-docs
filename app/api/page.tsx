import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'API Reference - Quantish Docs',
  description: 'REST API reference for Quantish.',
};

export default function APIOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--pn-text)' }}>
        API Reference
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Quantish provides REST APIs for direct integration without MCP. All endpoints use
        API key authentication via the <code className="text-xs bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">x-api-key</code> header.
      </p>

      <section className="space-y-4 mb-10">
        <Link href="/api/markets" className="card block hover:shadow-md transition-shadow">
          <h3 className="font-semibold mb-1" style={{ color: 'var(--pn-text)' }}>Markets API →</h3>
          <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
            Search, filter, and explore prediction markets across platforms.
          </p>
        </Link>

        <Link href="/api/trading" className="card block hover:shadow-md transition-shadow">
          <h3 className="font-semibold mb-1" style={{ color: 'var(--pn-text)' }}>Trading API →</h3>
          <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
            Place orders, manage positions, redeem winnings.
          </p>
        </Link>

        <Link href="/api/wallets" className="card block hover:shadow-md transition-shadow">
          <h3 className="font-semibold mb-1" style={{ color: 'var(--pn-text)' }}>Wallets API →</h3>
          <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
            Wallet management, balances, transfers, swaps.
          </p>
        </Link>

        <Link href="/api/analytics" className="card block hover:shadow-md transition-shadow">
          <h3 className="font-semibold mb-1" style={{ color: 'var(--pn-text)' }}>Analytics API →</h3>
          <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
            Trader profiles, whale tracking, social discovery.
          </p>
        </Link>
      </section>

      <section className="card" style={{ background: 'var(--pn-accent-muted)' }}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--pn-accent)' }}>
          MCP Recommended
        </h3>
        <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
          For AI agents, we recommend using the <a href="/mcp" className="text-[var(--pn-accent)] hover:underline">MCP servers</a> instead
          of the REST API directly. MCP provides a more natural interface for AI with structured tool definitions.
        </p>
      </section>
    </div>
  );
}
