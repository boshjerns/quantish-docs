export default function TradingGuidePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Trading Guide</h1>
        <p className="text-xl text-gray-600">
          Learn how to place trades, manage positions, and redeem winnings on prediction markets.
        </p>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How Prediction Markets Work</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-4">
            Prediction markets let you trade on the outcome of future events. Each market has 
            <strong> YES</strong> and <strong>NO</strong> shares that trade between $0 and $1.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>YES shares</strong> pay $1 if the event happens, $0 if it doesn't</li>
            <li><strong>NO shares</strong> pay $1 if the event doesn't happen, $0 if it does</li>
            <li>Prices reflect market probability (e.g., YES at $0.60 = 60% chance)</li>
          </ul>
        </div>
      </section>

      {/* Polymarket Trading */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span> Trading on Polymarket
        </h2>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Find a Market</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
              <p className="text-gray-400"># Search for markets</p>
              <p className="text-green-400">"Search for Bitcoin price prediction markets"</p>
              <p className="text-gray-400 mt-2"># Or get specific market details</p>
              <p className="text-green-400">"Get details for market with token ID 12345..."</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Place an Order</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto mb-4">
              <p className="text-gray-400"># Buy YES shares</p>
              <p className="text-green-400">"Buy $50 of YES shares on the Bitcoin 100k market at 0.45"</p>
              <p className="text-gray-400 mt-2"># Sell NO shares</p>
              <p className="text-green-400">"Sell $25 of NO shares on the election market"</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Tip:</strong> Always specify a price limit to avoid slippage. 
                Market orders execute at the current best price.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Manage Positions</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
              <p className="text-gray-400"># View your positions</p>
              <p className="text-green-400">"Show my current Polymarket positions"</p>
              <p className="text-gray-400 mt-2"># Check open orders</p>
              <p className="text-green-400">"List my open orders"</p>
              <p className="text-gray-400 mt-2"># Cancel an order</p>
              <p className="text-green-400">"Cancel order ID abc123..."</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Redeem Winnings</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto mb-4">
              <p className="text-gray-400"># After market resolves</p>
              <p className="text-green-400">"Redeem my winnings from the resolved election market"</p>
            </div>
            <p className="text-gray-600 text-sm">
              Winning shares are automatically converted to USDC. Use <code className="bg-gray-100 px-1.5 py-0.5 rounded">redeem_winnings</code> to claim.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Polymarket Trading Tools</h3>
          <div className="grid gap-3">
            {[
              { tool: 'create_order', desc: 'Place a buy or sell order' },
              { tool: 'cancel_order', desc: 'Cancel an open order' },
              { tool: 'cancel_all_orders', desc: 'Cancel all open orders' },
              { tool: 'get_open_orders', desc: 'List your open orders' },
              { tool: 'get_positions', desc: 'View your current positions' },
              { tool: 'get_trades', desc: 'View your trade history' },
              { tool: 'redeem_winnings', desc: 'Claim winnings from resolved markets' },
            ].map(({ tool, desc }) => (
              <div key={tool} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg">
                <code className="text-purple-700 font-mono text-sm bg-purple-50 px-2 py-1 rounded">{tool}</code>
                <span className="text-gray-600 text-sm">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kalshi Trading */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📈</span> Trading on Kalshi (via DFlow)
        </h2>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Search Markets</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
              <p className="text-gray-400"># Search Kalshi markets</p>
              <p className="text-green-400">"Search Kalshi for weather prediction markets"</p>
              <p className="text-gray-400 mt-2"># Get events by category</p>
              <p className="text-green-400">"Show me Kalshi events in the Economics category"</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Get Market Details</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
              <p className="text-gray-400"># View market info and prices</p>
              <p className="text-green-400">"Get details for Kalshi market INXD-24DEC31-B10000"</p>
              <p className="text-gray-400 mt-2"># Check orderbook</p>
              <p className="text-green-400">"Show the orderbook for the S&P 500 market"</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Place Trades</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto mb-4">
              <p className="text-gray-400"># Buy contracts</p>
              <p className="text-green-400">"Buy 10 YES contracts on INXD-24DEC31-B10000 at $0.35"</p>
              <p className="text-gray-400 mt-2"># Sell contracts</p>
              <p className="text-green-400">"Sell 5 NO contracts on the Fed rate hike market"</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800 text-sm">
                <strong>Note:</strong> Kalshi uses contracts (not dollar amounts). 
                Each contract costs your limit price × quantity in USDC.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Manage & Settle</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
              <p className="text-gray-400"># View positions</p>
              <p className="text-green-400">"Show my Kalshi positions"</p>
              <p className="text-gray-400 mt-2"># Get trade history</p>
              <p className="text-green-400">"Show my recent Kalshi trades"</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Kalshi Trading Tools</h3>
          <div className="grid gap-3">
            {[
              { tool: 'kalshi_search_markets', desc: 'Search markets by keyword' },
              { tool: 'kalshi_get_events', desc: 'List events with optional filters' },
              { tool: 'kalshi_get_market', desc: 'Get specific market details' },
              { tool: 'kalshi_get_orderbook', desc: 'View market orderbook depth' },
              { tool: 'kalshi_place_order', desc: 'Place a buy/sell order' },
              { tool: 'kalshi_get_positions', desc: 'View your positions' },
              { tool: 'kalshi_get_trades', desc: 'View trade history' },
            ].map(({ tool, desc }) => (
              <div key={tool} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg">
                <code className="text-green-700 font-mono text-sm bg-green-50 px-2 py-1 rounded">{tool}</code>
                <span className="text-gray-600 text-sm">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Strategies */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span> Trading Tips
        </h2>

        <div className="grid gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Use Limit Orders</h3>
            <p className="text-gray-600">
              Always set a price limit to control your entry/exit price and avoid slippage on large orders.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Check the Orderbook</h3>
            <p className="text-gray-600">
              View orderbook depth before trading to understand liquidity and find the best prices.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Diversify Positions</h3>
            <p className="text-gray-600">
              Don't put all your capital in one market. Spread across uncorrelated events.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Understand Resolution</h3>
            <p className="text-gray-600">
              Read market rules carefully. Know exactly what conditions trigger YES vs NO resolution.
            </p>
          </div>
        </div>
      </section>

      {/* Risk Warning */}
      <section className="mb-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-red-900 mb-2 flex items-center gap-2">
            ⚠️ Risk Warning
          </h2>
          <p className="text-red-800">
            Prediction markets involve significant risk. You can lose your entire investment. 
            Past performance does not guarantee future results. Only trade with money you can 
            afford to lose. This is not financial advice.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <div className="flex flex-wrap gap-4">
          <a 
            href="/reference/tools"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Tools →
          </a>
          <a 
            href="/guides/wallet"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Wallet Setup
          </a>
        </div>
      </section>
    </div>
  );
}

