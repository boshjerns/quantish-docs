import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discovery MCP - Quantish Docs',
  description: 'Search and explore prediction markets across all platforms.',
};

const ToolRow = ({ name, desc, params }: { name: string; desc: string; params: string }) => (
  <tr className="border-b last:border-0" style={{ borderColor: 'var(--pn-border)' }}>
    <td className="py-2 pr-4">
      <code className="text-xs font-mono bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">{name}</code>
    </td>
    <td className="py-2 pr-4 text-sm" style={{ color: 'var(--pn-text-secondary)' }}>{desc}</td>
    <td className="py-2 text-xs font-mono" style={{ color: 'var(--pn-text-muted)' }}>{params}</td>
  </tr>
);

export default function DiscoveryPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
          <span className="text-white font-bold">D</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--pn-text)' }}>Discovery MCP</h1>
          <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>
            https://quantish.live/mcp • Read-only • Free
          </p>
        </div>
      </div>

      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Search and explore markets across Polymarket and Kalshi. Read-only access — no wallet required.
        21 tools for comprehensive market discovery and analysis.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Market Search Tools
        </h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Tool</th>
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Description</th>
                <th className="py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Params</th>
              </tr>
            </thead>
            <tbody>
              <ToolRow name="search_markets" desc="Semantic AI-powered search across platforms. Returns prices." params="query, platform?, limit?, sortBy?" />
              <ToolRow name="get_market_details" desc="Get full market details with prices and resolution criteria" params="platform, marketId" />
              <ToolRow name="get_trending_markets" desc="Trending markets by 24h volume" params="platform?, category?, limit?" />
              <ToolRow name="get_categories" desc="List available market categories" params="-" />
              <ToolRow name="keyword_search" desc="Fast keyword-based search (PostgreSQL FTS)" params="keywords, platform?, limit?" />
              <ToolRow name="find_markets_by_probability" desc="Filter by probability range (high confidence, toss-ups, underdogs)" params="minProbability, maxProbability, platform?" />
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Arbitrage & Analysis
        </h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Tool</th>
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Description</th>
                <th className="py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Params</th>
              </tr>
            </thead>
            <tbody>
              <ToolRow name="find_arbitrage" desc="Scan for arbitrage opportunities (spread, multi-outcome, cross-market)" params="type?, minProfitPercent?, category?" />
              <ToolRow name="find_related_markets" desc="Find semantically similar markets across platforms" params="markets, platform?, limit?" />
              <ToolRow name="get_whale_activity" desc="Get largest traders and recent large trades on a market" params="conditionId, limit?" />
              <ToolRow name="get_contrarian_traders" desc="Find wallets betting against market consensus" params="conditionId, limit?" />
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Wallet Analytics
        </h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Tool</th>
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Description</th>
                <th className="py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Params</th>
              </tr>
            </thead>
            <tbody>
              <ToolRow name="get_wallet_profile" desc="Detailed profile with PNL, ROI, trading patterns" params="wallet" />
              <ToolRow name="get_wallet_momentum" desc="Current winning/losing positions with unrealized PNL" params="wallet, direction?, limit?" />
              <ToolRow name="get_wallet_interests" desc="Recommend markets based on wallet's trading history" params="wallet, platform?, limit?" />
              <ToolRow name="get_social_discovery" desc="Find markets via collaborative filtering from similar traders" params="wallet, limit?" />
              <ToolRow name="get_portfolio_overlap" desc="Compare two wallets' trading activity and agreement rate" params="walletA, walletB, limit?" />
              <ToolRow name="get_top_traders" desc="Leaderboard rankings by PNL or volume" params="category?, timePeriod?, orderBy?, limit?" />
            </tbody>
          </table>
        </div>
      </section>

      <section className="card" style={{ background: 'var(--pn-elevated)' }}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--pn-text)' }}>Quick Example</h3>
        <pre className="text-xs font-mono overflow-x-auto" style={{ color: 'var(--pn-text-secondary)' }}>
{`# Search for bitcoin markets
search_markets(query="bitcoin price 2024", limit=5)

# Find arbitrage opportunities
find_arbitrage(minProfitPercent=3.0)

# Get wallet profile
get_wallet_profile(wallet="0x1234...")`}
        </pre>
      </section>
    </div>
  );
}
