import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalshi MCP - Quantish Docs',
  description: 'Full trading on Kalshi via DFlow on Solana.',
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

export default function KalshiPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
          <span className="text-white font-bold">K</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--pn-text)' }}>Kalshi MCP</h1>
          <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>
            https://kalshi-mcp-production-7c2c.up.railway.app/mcp • Solana • Trading
          </p>
        </div>
      </div>

      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Full trading on Kalshi via DFlow on Solana. CFTC-regulated US prediction markets.
        Create a new Solana wallet or import your own.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Authentication & Setup
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
              <ToolRow name="kalshi_signup" desc="Create account with fresh Solana wallet" params="externalId" />
              <ToolRow name="kalshi_setup_wallet" desc="Generate new Solana wallet" params="-" />
              <ToolRow name="kalshi_get_wallet_info" desc="Get wallet address and type (generated/imported)" params="-" />
              <ToolRow name="kalshi_get_balances" desc="Get SOL and USDC balances" params="-" />
              <ToolRow name="kalshi_get_deposit_address" desc="Get address for deposits" params="-" />
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Market Operations
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
              <ToolRow name="kalshi_search_markets" desc="Search markets by keyword" params="query, limit?, marketStatus?" />
              <ToolRow name="kalshi_get_market" desc="Get market details including outcome mints" params="ticker" />
              <ToolRow name="kalshi_get_live_data" desc="Get live pricing for a market" params="marketTicker" />
              <ToolRow name="kalshi_get_events" desc="List events with optional filters" params="category?, cursor?, limit?" />
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Trading
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
              <ToolRow name="kalshi_buy_yes" desc="Buy YES outcome tokens" params="marketTicker, yesOutcomeMint, usdcAmount, slippageBps?" />
              <ToolRow name="kalshi_buy_no" desc="Buy NO outcome tokens" params="marketTicker, noOutcomeMint, usdcAmount, slippageBps?" />
              <ToolRow name="kalshi_sell_position" desc="Sell outcome tokens back to USDC" params="outcomeMint, tokenAmount, slippageBps?" />
              <ToolRow name="kalshi_get_positions" desc="Get current positions" params="-" />
              <ToolRow name="kalshi_get_orders" desc="Get order history" params="status?, limit?" />
            </tbody>
          </table>
        </div>
      </section>

      <section className="card" style={{ background: 'var(--pn-elevated)' }}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--pn-text)' }}>Note on KYC</h3>
        <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
          After Feb 27, 2026, unverified wallets cannot buy prediction market outcomes (selling and redemption still work).
          Use <code className="text-xs bg-[var(--pn-accent-muted)] px-1 py-0.5 rounded">kalshi_check_kyc_status</code> and
          <code className="text-xs bg-[var(--pn-accent-muted)] px-1 py-0.5 rounded">kalshi_get_kyc_link</code> for DFlow Proof verification.
        </p>
      </section>
    </div>
  );
}
