import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Limitless MCP - Quantish Docs',
  description: 'Trade prediction markets on Base chain.',
};

const ToolRow = ({ name, desc, params }: { name: string; desc: string; params: string }) => (
  <tr style={{ borderBottom: '1px solid var(--pn-border)' }}>
    <td className="py-3 pr-4">
      <div className="flex items-center gap-2">
        <Image src="/limitless-logo.svg" alt="" width={16} height={16} className="rounded-sm opacity-60" />
        <code
          className="text-xs font-mono px-1.5 py-0.5 rounded"
          style={{ background: 'var(--pn-elevated)', color: 'var(--pn-text)' }}
        >
          {name}
        </code>
      </div>
    </td>
    <td className="py-3 pr-4 text-sm" style={{ color: 'var(--pn-text-secondary)' }}>{desc}</td>
    <td className="py-3 text-xs font-mono" style={{ color: 'var(--pn-text-muted)' }}>{params}</td>
  </tr>
);

export default function LimitlessPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Image
          src="/limitless-logo.svg"
          alt="Limitless"
          width={48}
          height={48}
          className="rounded-xl"
        />
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--pn-text)' }}>Limitless MCP</h1>
          <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>
            limitless-mcp-server-production.up.railway.app/mcp • Base • Trading
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
        <div
          className="overflow-x-auto rounded-xl"
          style={{ background: 'var(--pn-elevated)', border: '1px solid var(--pn-border)' }}
        >
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--pn-border)' }}>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Tool</th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Description</th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Params</th>
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
        <div
          className="overflow-x-auto rounded-xl"
          style={{ background: 'var(--pn-elevated)', border: '1px solid var(--pn-border)' }}
        >
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--pn-border)' }}>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Tool</th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Description</th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Params</th>
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
        <div
          className="overflow-x-auto rounded-xl"
          style={{ background: 'var(--pn-elevated)', border: '1px solid var(--pn-border)' }}
        >
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--pn-border)' }}>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Tool</th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Description</th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--pn-text-muted)' }}>Params</th>
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

      <section
        className="rounded-xl p-4"
        style={{ background: 'var(--pn-elevated)', border: '1px solid var(--pn-border)' }}
      >
        <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--pn-text)' }}>
          <Image src="/limitless-logo.svg" alt="" width={16} height={16} />
          Cross-Chain Bridge
        </h3>
        <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
          Use <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--pn-accent-muted)', color: 'var(--pn-accent)' }}>limitless_bridge_quote</code> and
          <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--pn-accent-muted)', color: 'var(--pn-accent)' }}>limitless_bridge_execute</code> to bridge
          USDC from Polygon (Polymarket) to Base.
        </p>
      </section>
    </div>
  );
}
