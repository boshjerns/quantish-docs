import Link from 'next/link';

const toolCategories = [
  {
    name: 'Authentication & Setup',
    tools: [
      { name: 'kalshi_request_api_key', desc: 'Get API credentials (requires access code)' },
      { name: 'kalshi_setup_wallet', desc: 'Generate new Solana wallet' },
      { name: 'kalshi_import_wallet', desc: 'Import existing wallet (Phantom, Solflare)' },
      { name: 'kalshi_get_wallet_info', desc: 'Get wallet public key and type' },
      { name: 'kalshi_get_wallet_import_instructions', desc: 'Instructions for secure wallet export' },
    ],
  },
  {
    name: 'Wallet & Balances',
    tools: [
      { name: 'kalshi_get_balances', desc: 'Get SOL and USDC balances' },
      { name: 'kalshi_get_token_holdings', desc: 'Get all SPL token holdings' },
    ],
  },
  {
    name: 'Market Discovery',
    tools: [
      { name: 'kalshi_search_markets', desc: 'Search markets by keyword (paginated)' },
      { name: 'kalshi_get_market', desc: 'Get details for a specific market' },
      { name: 'kalshi_get_events', desc: 'List events with filters (paginated)' },
      { name: 'kalshi_get_live_data', desc: 'Get real-time pricing' },
    ],
  },
  {
    name: 'Trading',
    tools: [
      { name: 'kalshi_get_quote', desc: 'Get swap quote for outcome tokens' },
      { name: 'kalshi_buy_yes', desc: 'Buy YES outcome tokens' },
      { name: 'kalshi_buy_no', desc: 'Buy NO outcome tokens' },
      { name: 'kalshi_sell_position', desc: 'Sell outcome tokens back to USDC' },
      { name: 'kalshi_redeem_winnings', desc: 'Redeem winning tokens after settlement' },
    ],
  },
  {
    name: 'Positions & Orders',
    tools: [
      { name: 'kalshi_get_positions', desc: 'Get current positions' },
      { name: 'kalshi_get_orders', desc: 'Get order history' },
    ],
  },
];

export default function KalshiMCP() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-[hsl(var(--primary))] flex items-center justify-center border-2 border-[hsl(var(--border))] p-2">
            <img 
              src="/kalshi-logo.svg" 
              alt="Kalshi"
              className="w-full h-full object-contain invert dark:invert-0"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight">Kalshi MCP</h1>
            <p className="text-[hsl(var(--muted-foreground))] font-mono text-sm">kalshi-mcp-server-production.up.railway.app</p>
          </div>
        </div>
        <p className="text-gray-600">
          Trade on Kalshi prediction markets via Solana blockchain and DFlow API.
          Supports generated wallets or importing existing Phantom/Solflare wallets.
        </p>
      </div>

      {/* Requirements */}
      <div className="card mb-8 border-amber-200 bg-amber-50">
        <h3 className="font-semibold text-amber-900 mb-2">⚠️ Requirements</h3>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• Access code required to generate API key</li>
          <li>• USDC on Solana for trading (wallet setup/import handled by the MCP)</li>
        </ul>
      </div>

      {/* Quick Setup */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Setup</h2>
        <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm overflow-x-auto">
{`{
  "mcpServers": {
    "quantish_kalshi": {
      "url": "https://kalshi-mcp-server-production.up.railway.app/mcp",
      "headers": {
        "x-api-key": "YOUR_API_KEY"
      }
    }
  }
}`}
        </pre>
      </div>

      {/* Key Feature */}
      <div className="card mb-8 border-green-200 bg-green-50">
        <h3 className="font-semibold text-green-900 mb-2">🔑 Bring Your Own Wallet (BYOW)</h3>
        <p className="text-sm text-green-800 mb-3">
          You can generate a new wallet or import your existing Phantom/Solflare wallet:
        </p>
        <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
          <li>Use <code className="bg-green-100 px-1 rounded">kalshi_setup_wallet</code> to generate a new wallet, OR</li>
          <li>Use <code className="bg-green-100 px-1 rounded">kalshi_import_wallet</code> to import from Phantom</li>
          <li>Your private key is encrypted locally - we never see the raw key</li>
        </ol>
      </div>

      {/* Tools by Category */}
      <div className="space-y-8">
        <h2 className="text-xl font-semibold">
          Available Tools ({toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0)} total)
        </h2>
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

      {/* Pagination Note */}
      <div className="card mt-8">
        <h2 className="text-lg font-semibold mb-4">Pagination</h2>
        <p className="text-gray-600 mb-3">
          Search results are paginated (default 10 results). Use offset for more:
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-gray-50 rounded">
            <code>"Search for bitcoin markets"</code> → First 10 results
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <code>"Get more bitcoin markets, offset 10"</code> → Next 10 results
          </div>
        </div>
      </div>
    </>
  );
}
