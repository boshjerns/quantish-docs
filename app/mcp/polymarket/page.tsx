import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Polymarket MCP - Quantish Docs',
  description: 'Full trading on Polymarket via MCP.',
};

const ToolRow = ({ name, desc, params }: { name: string; desc: string; params: string }) => (
  <tr style={{ borderBottom: '1px solid var(--pn-border)' }}>
    <td className="py-3 pr-4">
      <div className="flex items-center gap-2">
        <Image src="/polymarket-logo.svg" alt="" width={16} height={16} className="rounded-sm opacity-60" />
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

export default function PolymarketPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Image
          src="/polymarket-logo.svg"
          alt="Polymarket"
          width={48}
          height={48}
          className="rounded-xl"
        />
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--pn-text)' }}>Polymarket MCP</h1>
          <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>
            quantish-sdk-production.up.railway.app/mcp • Polygon • Trading
          </p>
        </div>
      </div>

      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Full trading on Polymarket, the world&apos;s largest prediction market. Wallet management,
        order placement, position tracking, token swaps, and transfers. Creates a Safe smart wallet automatically.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Authentication & Setup
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
              <ToolRow name="request_api_key" desc="Create account and get API credentials" params="externalId" />
              <ToolRow name="setup_wallet" desc="Deploy Safe wallet and set approvals (gasless)" params="-" />
              <ToolRow name="get_wallet_status" desc="Check deployment state, addresses, approval status" params="-" />
              <ToolRow name="get_balances" desc="Get USDC, Native USDC, and MATIC balances" params="-" />
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
              <ToolRow name="place_order" desc="Place buy/sell order (FOK, GTC, GTD)" params="conditionId, tokenId, side, price, size, orderType?" />
              <ToolRow name="cancel_order" desc="Cancel an existing order" params="orderId" />
              <ToolRow name="get_orders" desc="List orders, optionally filtered by status" params="status?" />
              <ToolRow name="get_positions" desc="Get all share holdings" params="-" />
              <ToolRow name="get_orderbook" desc="Get bids and asks for a token" params="tokenId" />
              <ToolRow name="get_price" desc="Get current midpoint price" params="tokenId" />
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Wallet Operations
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
              <ToolRow name="get_deposit_addresses" desc="Get addresses for funding wallet (EVM, Solana, BTC)" params="-" />
              <ToolRow name="transfer_usdc" desc="Transfer USDC to another address (gasless)" params="toAddress, amount" />
              <ToolRow name="transfer_shares" desc="Transfer shares (ERC-1155) to another address" params="toAddress, tokenId, amount" />
              <ToolRow name="swap_tokens" desc="Swap MATIC/USDC via LI.FI aggregator" params="fromToken, toToken, amount" />
              <ToolRow name="claim_winnings" desc="Claim from resolved markets (gasless)" params="positionId?" />
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="rounded-xl p-4"
        style={{ background: 'var(--pn-elevated)', border: '1px solid var(--pn-border)' }}
      >
        <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--pn-text)' }}>
          <Image src="/polymarket-logo.svg" alt="" width={16} height={16} />
          Trading Flow
        </h3>
        <ol className="list-decimal list-inside text-sm space-y-1" style={{ color: 'var(--pn-text-secondary)' }}>
          <li>Call <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--pn-accent-muted)', color: 'var(--pn-accent)' }}>request_api_key</code> to create account</li>
          <li>Call <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--pn-accent-muted)', color: 'var(--pn-accent)' }}>setup_wallet</code> to deploy Safe</li>
          <li>Deposit USDC to your Safe address</li>
          <li>Use <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--pn-accent-muted)', color: 'var(--pn-accent)' }}>place_order</code> to trade</li>
        </ol>
      </section>
    </div>
  );
}
