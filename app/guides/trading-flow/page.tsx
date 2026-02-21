import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trading Flow - Quantish Docs',
  description: 'Complete trading workflow on prediction markets.',
};

const Code = ({ children }: { children: string }) => (
  <pre
    className="p-4 rounded-lg text-xs font-mono overflow-x-auto my-3"
    style={{ background: 'var(--code-bg)', color: 'var(--code-text)' }}
  >
    {children}
  </pre>
);

export default function TradingFlowPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--pn-text)' }}>
        Trading Flow
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        The complete workflow for trading on prediction markets via Quantish.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          1. Find a Market
        </h2>
        <p className="mb-4" style={{ color: 'var(--pn-text-secondary)' }}>
          Use the Discovery MCP to search for markets across all platforms.
        </p>
        <Code>{`# Search for markets
search_markets(query="bitcoin price 100k 2024", limit=5)

# Get trending markets
get_trending_markets(category="Crypto", limit=10)

# Filter by probability (high confidence)
find_markets_by_probability(minProbability=80, maxProbability=100)`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          2. Analyze the Market
        </h2>
        <Code>{`# Get full market details
get_market_details(platform="polymarket", marketId="0x123...")

# Check orderbook liquidity
get_orderbook(tokenId="12345")

# See who's trading (whales)
get_whale_activity(conditionId="0x123...", limit=10)`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          3. Place an Order
        </h2>
        <Code>{`# Polymarket - Buy YES shares
place_order(
  conditionId="0x123...",
  tokenId="67890",  # YES token
  side="BUY",
  price=0.45,      # Max price to pay
  size=100,         # Number of shares
  orderType="GTC"   # Good Till Cancelled
)

# Kalshi - Buy YES
kalshi_buy_yes(
  marketTicker="KXBTC-24",
  yesOutcomeMint="...",
  usdcAmount=50
)`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          4. Monitor Positions
        </h2>
        <Code>{`# Check your positions
get_positions()

# Check order status
get_orders(status="LIVE")

# Sync order status after fill
sync_order_status(orderId="123")`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          5. Redeem Winnings
        </h2>
        <p className="mb-4" style={{ color: 'var(--pn-text-secondary)' }}>
          After a market resolves, claim your winnings.
        </p>
        <Code>{`# Check claimable winnings
get_claimable_winnings()

# Claim all winnings
claim_winnings()`}</Code>
      </section>

      <section className="card" style={{ background: 'var(--pn-elevated)' }}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--pn-text)' }}>Pro Tips</h3>
        <ul className="list-disc list-inside text-sm space-y-1" style={{ color: 'var(--pn-text-secondary)' }}>
          <li>Use <code className="text-xs bg-[var(--pn-accent-muted)] px-1 py-0.5 rounded">FOK</code> orders for guaranteed fills</li>
          <li>Check the orderbook before placing large orders</li>
          <li>Monitor whale activity for market sentiment</li>
          <li>Set price limits slightly below market for better fills</li>
        </ul>
      </section>
    </div>
  );
}
