import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Limitless MCP - Quantish Docs',
  description: 'Trade prediction markets on Base chain.',
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

export default function LimitlessPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
          <span className="text-white font-bold">L</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--pn-text)' }}>Limitless MCP</h1>
          <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>
            https://limitless-mcp-server-production.up.railway.app/mcp • Base • Trading
          </p>
        </div>
      </div>

      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Trade prediction markets on Base chain. Full trading capabilities with automatic
        wallet creation. Low fees and fast transactions.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Wallet & Authentication
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
              <ToolRow name="limitless_signup" desc="Create account with fresh wallet" params="externalId" />
              <ToolRow name="limitless_get_wallet_info" desc="Get wallet address and status" params="-" />
              <ToolRow name="limitless_get_balances" desc="Get ETH and USDC balances" params="-" />
              <ToolRow name="limitless_get_deposit_address" desc="Get address for deposits" params="-" />
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
              <ToolRow name="limitless_search_markets" desc="Search markets by query" params="query, limit?, status?" />
              <ToolRow name="limitless_get_market" desc="Get market details and tokens" params="marketId" />
              <ToolRow name="limitless_get_orderbook" desc="Get orderbook for a token" params="tokenId" />
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
              <ToolRow name="limitless_place_order" desc="Place buy/sell order" params="tokenId, side, price, size, orderType?" />
              <ToolRow name="limitless_cancel_order" desc="Cancel existing order" params="orderId" />
              <ToolRow name="limitless_get_orders" desc="List orders" params="status?" />
              <ToolRow name="limitless_get_positions" desc="Get current positions" params="-" />
              <ToolRow name="limitless_claim_winnings" desc="Claim from resolved markets" params="-" />
            </tbody>
          </table>
        </div>
      </section>

      <section className="card" style={{ background: 'var(--pn-elevated)' }}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--pn-text)' }}>Cross-Chain Bridge</h3>
        <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
          Use <code className="text-xs bg-[var(--pn-accent-muted)] px-1 py-0.5 rounded">limitless_bridge_quote</code> and
          <code className="text-xs bg-[var(--pn-accent-muted)] px-1 py-0.5 rounded">limitless_bridge_execute</code> to bridge
          USDC from Polygon (Polymarket) to Base.
        </p>
      </section>
    </div>
  );
}
