import Link from 'next/link';

const toolCategories = [
  {
    name: 'Wallet Management',
    tools: [
      { name: 'request_api_key', desc: 'Get API credentials (requires access code)' },
      { name: 'setup_wallet', desc: 'Deploy Safe wallet and set up CLOB credentials' },
      { name: 'get_wallet_status', desc: 'Check wallet deployment and approval status' },
      { name: 'get_balances', desc: 'Get USDC, Native USDC, and MATIC balances' },
    ],
  },
  {
    name: 'Trading',
    tools: [
      { name: 'place_order', desc: 'Place buy or sell order on a market' },
      { name: 'cancel_order', desc: 'Cancel an existing order' },
      { name: 'get_orders', desc: 'Get all your orders' },
      { name: 'sync_order_status', desc: 'Sync order status with CLOB' },
    ],
  },
  {
    name: 'Positions',
    tools: [
      { name: 'get_positions', desc: 'Get all your positions' },
      { name: 'sync_positions', desc: 'Sync positions with Polymarket' },
      { name: 'get_claimable_winnings', desc: 'Check for claimable winnings' },
      { name: 'claim_winnings', desc: 'Claim winnings from resolved markets' },
    ],
  },
  {
    name: 'Market Data',
    tools: [
      { name: 'search_markets', desc: 'Search for markets' },
      { name: 'get_market', desc: 'Get market details' },
      { name: 'get_orderbook', desc: 'Get order book for a token' },
      { name: 'get_price', desc: 'Get current midpoint price' },
    ],
  },
  {
    name: 'Transfers',
    tools: [
      { name: 'transfer_usdc', desc: 'Transfer USDC to another address' },
      { name: 'transfer_shares', desc: 'Transfer shares to another address' },
      { name: 'swap_tokens', desc: 'Swap between USDC, Native USDC, MATIC' },
    ],
  },
];

export default function PolymarketMCP() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-[hsl(var(--primary))] flex items-center justify-center border-2 border-[hsl(var(--border))] p-2">
            <img 
              src="/polymarket-logo.svg" 
              alt="Polymarket"
              className="w-full h-full object-contain invert dark:invert-0"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight">Polymarket MCP</h1>
            <p className="text-[hsl(var(--muted-foreground))] font-mono text-sm">quantish-sdk-production.up.railway.app</p>
          </div>
        </div>
        <p className="text-gray-600">
          Full trading capabilities on Polymarket. Includes wallet management,
          order placement, position tracking, and gasless transactions.
        </p>
      </div>

      {/* Requirements */}
      <div className="card mb-8 border-amber-200 bg-amber-50">
        <h3 className="font-semibold text-amber-900 mb-2">⚠️ Requirements</h3>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• Access code required to generate API key</li>
          <li>• USDC on Polygon for trading (wallet setup is handled by the MCP)</li>
        </ul>
      </div>

      {/* Quick Setup */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Setup</h2>
        <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm overflow-x-auto">
{`{
  "mcpServers": {
    "quantish": {
      "url": "https://quantish-sdk-production.up.railway.app/mcp",
      "headers": {
        "x-api-key": "YOUR_API_KEY"
      }
    }
  }
}`}
        </pre>
      </div>

      {/* Tools by Category */}
      <div className="space-y-8">
        <h2 className="text-xl font-semibold">Available Tools ({toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0)} total)</h2>
        {toolCategories.map((category) => (
          <div key={category.name}>
            <h3 className="text-lg font-medium mb-3">{category.name}</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {category.tools.map((tool) => (
                <div key={tool.name} className="p-3 bg-white border border-gray-200 rounded-lg">
                  <code className="text-sm font-semibold text-quantish-blue">
                    {tool.name}
                  </code>
                  <p className="text-sm text-gray-600 mt-1">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Trading Flow */}
      <div className="card mt-8">
        <h2 className="text-lg font-semibold mb-4">Getting Started</h2>
        <ol className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
            <div>
              <strong>Get API Key</strong>
              <p className="text-sm text-gray-600">Use <code className="bg-gray-100 px-1 rounded">request_api_key</code> with your access code</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
            <div>
              <strong>Setup Wallet</strong>
              <p className="text-sm text-gray-600">Use <code className="bg-gray-100 px-1 rounded">setup_wallet</code> to deploy your Safe and get CLOB credentials</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
            <div>
              <strong>Fund Wallet</strong>
              <p className="text-sm text-gray-600">Send USDC to your Safe address on Polygon</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
            <div>
              <strong>Trade</strong>
              <p className="text-sm text-gray-600">Use <code className="bg-gray-100 px-1 rounded">place_order</code> to buy/sell shares</p>
            </div>
          </li>
        </ol>
      </div>
    </>
  );
}
