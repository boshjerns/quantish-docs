import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polymarket MCP - Quantish Docs',
  description: 'Full trading on Polymarket via MCP.',
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

export default function PolymarketPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold">P</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--pn-text)' }}>Polymarket MCP</h1>
          <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>
            https://quantish-sdk-production.up.railway.app/mcp • Polygon • Trading
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
              <ToolRow name="get_deposit_addresses" desc="Get addresses for funding wallet (EVM, Solana, BTC)" params="-" />
              <ToolRow name="transfer_usdc" desc="Transfer USDC to another address (gasless)" params="toAddress, amount" />
              <ToolRow name="transfer_shares" desc="Transfer shares (ERC-1155) to another address" params="toAddress, tokenId, amount" />
              <ToolRow name="swap_tokens" desc="Swap MATIC/USDC via LI.FI aggregator" params="fromToken, toToken, amount" />
              <ToolRow name="claim_winnings" desc="Claim from resolved markets (gasless)" params="positionId?" />
            </tbody>
          </table>
        </div>
      </section>

      <section className="card" style={{ background: 'var(--pn-elevated)' }}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--pn-text)' }}>Trading Flow</h3>
        <ol className="list-decimal list-inside text-sm space-y-1" style={{ color: 'var(--pn-text-secondary)' }}>
          <li>Call <code className="text-xs bg-[var(--pn-accent-muted)] px-1 py-0.5 rounded">request_api_key</code> to create account</li>
          <li>Call <code className="text-xs bg-[var(--pn-accent-muted)] px-1 py-0.5 rounded">setup_wallet</code> to deploy Safe</li>
          <li>Deposit USDC to your Safe address</li>
          <li>Use <code className="text-xs bg-[var(--pn-accent-muted)] px-1 py-0.5 rounded">place_order</code> to trade</li>
        </ol>
      </section>
    </div>
  );
}
