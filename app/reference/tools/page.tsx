export default function AllToolsPage() {
  const discoveryTools = [
    { name: 'search_markets', desc: 'Search markets across Polymarket and Kalshi by keyword', params: 'query, limit?' },
    { name: 'get_market', desc: 'Get detailed information about a specific market', params: 'marketId' },
    { name: 'get_events', desc: 'List events with optional category filter', params: 'category?, limit?' },
    { name: 'get_trending', desc: 'Get trending/popular markets', params: 'limit?' },
  ];

  const polymarketTools = [
    // Wallet
    { name: 'create_wallet', desc: 'Generate a new trading wallet', params: 'password', category: 'Wallet' },
    { name: 'get_wallet_address', desc: 'Get your wallet public address', params: '-', category: 'Wallet' },
    { name: 'get_balance', desc: 'Check USDC and allowance balance', params: '-', category: 'Wallet' },
    { name: 'export_wallet', desc: 'Export encrypted wallet bundle', params: 'password', category: 'Wallet' },
    { name: 'import_wallet', desc: 'Import wallet from encrypted bundle', params: 'bundle, password', category: 'Wallet' },
    // Markets
    { name: 'search_markets', desc: 'Search Polymarket markets by keyword', params: 'query, limit?', category: 'Markets' },
    { name: 'get_market', desc: 'Get market details by condition ID', params: 'conditionId', category: 'Markets' },
    { name: 'get_orderbook', desc: 'View market orderbook depth', params: 'tokenId', category: 'Markets' },
    { name: 'get_price', desc: 'Get current market price', params: 'tokenId', category: 'Markets' },
    // Trading
    { name: 'create_order', desc: 'Place a buy or sell order', params: 'tokenId, side, size, price', category: 'Trading' },
    { name: 'cancel_order', desc: 'Cancel an open order', params: 'orderId', category: 'Trading' },
    { name: 'cancel_all_orders', desc: 'Cancel all open orders', params: '-', category: 'Trading' },
    { name: 'get_open_orders', desc: 'List your open orders', params: 'marketId?', category: 'Trading' },
    // Positions
    { name: 'get_positions', desc: 'View your current positions', params: '-', category: 'Positions' },
    { name: 'get_trades', desc: 'View your trade history', params: 'limit?', category: 'Positions' },
    { name: 'redeem_winnings', desc: 'Claim winnings from resolved markets', params: 'conditionId', category: 'Positions' },
  ];

  const kalshiTools = [
    // Wallet
    { name: 'kalshi_create_wallet', desc: 'Generate a new Solana wallet', params: 'password', category: 'Wallet' },
    { name: 'kalshi_import_wallet', desc: 'Import wallet from private key', params: 'privateKey, password', category: 'Wallet' },
    { name: 'kalshi_get_wallet_address', desc: 'Get Solana wallet public address', params: '-', category: 'Wallet' },
    { name: 'kalshi_get_balance', desc: 'Check SOL and USDC balances', params: '-', category: 'Wallet' },
    { name: 'kalshi_export_wallet', desc: 'Export encrypted wallet bundle', params: 'password', category: 'Wallet' },
    // Markets
    { name: 'kalshi_search_markets', desc: 'Search Kalshi markets by keyword', params: 'query, limit?, offset?', category: 'Markets' },
    { name: 'kalshi_get_events', desc: 'List events with filters', params: 'category?, limit?, offset?', category: 'Markets' },
    { name: 'kalshi_get_market', desc: 'Get market details by ticker', params: 'ticker', category: 'Markets' },
    { name: 'kalshi_get_orderbook', desc: 'View market orderbook', params: 'ticker', category: 'Markets' },
    // Trading
    { name: 'kalshi_place_order', desc: 'Place a buy or sell order', params: 'ticker, side, quantity, price', category: 'Trading' },
    { name: 'kalshi_cancel_order', desc: 'Cancel an open order', params: 'orderId', category: 'Trading' },
    { name: 'kalshi_get_orders', desc: 'List your orders', params: 'status?', category: 'Trading' },
    // Positions
    { name: 'kalshi_get_positions', desc: 'View your positions', params: '-', category: 'Positions' },
    { name: 'kalshi_get_trades', desc: 'View trade history', params: 'limit?', category: 'Positions' },
  ];

  const ToolTable = ({ tools, color }: { tools: typeof polymarketTools; color: string }) => {
    const categories = [...new Set(tools.map(t => t.category))];
    
    return (
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category}>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{category}</h4>
            <div className="space-y-2">
              {tools.filter(t => t.category === category).map(tool => (
                <div key={tool.name} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <code className={`font-mono text-sm px-2 py-1 rounded ${color}`}>{tool.name}</code>
                      <p className="text-gray-600 text-sm mt-2">{tool.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-gray-400">Params:</span>
                      <p className="text-xs font-mono text-gray-500">{tool.params}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All MCP Tools</h1>
        <p className="text-xl text-gray-600">
          Complete reference for all 50+ tools available across Quantish MCP servers.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">{discoveryTools.length}</p>
          <p className="text-sm text-gray-600">Discovery Tools</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">{polymarketTools.length}</p>
          <p className="text-sm text-gray-600">Polymarket Tools</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{kalshiTools.length}</p>
          <p className="text-sm text-gray-600">Kalshi Tools</p>
        </div>
      </div>

      {/* Discovery Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">🔍</span> Discovery MCP
        </h2>
        <p className="text-gray-600 mb-6">Search and explore markets across all platforms. No wallet required.</p>
        
        <div className="space-y-2">
          {discoveryTools.map(tool => (
            <div key={tool.name} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <code className="font-mono text-sm px-2 py-1 rounded bg-blue-50 text-blue-700">{tool.name}</code>
                  <p className="text-gray-600 text-sm mt-2">{tool.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-gray-400">Params:</span>
                  <p className="text-xs font-mono text-gray-500">{tool.params}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Polymarket Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">📊</span> Polymarket MCP
        </h2>
        <p className="text-gray-600 mb-6">Full trading capabilities on Polymarket. Requires wallet setup.</p>
        
        <ToolTable tools={polymarketTools} color="bg-purple-50 text-purple-700" />
      </section>

      {/* Kalshi Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">📈</span> Kalshi MCP
        </h2>
        <p className="text-gray-600 mb-6">Trade Kalshi markets via DFlow on Solana. Requires Solana wallet.</p>
        
        <ToolTable tools={kalshiTools} color="bg-green-50 text-green-700" />
      </section>

      {/* Usage Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage Examples</h2>
        <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-100">{`# Discovery - Search markets
"Search for crypto prediction markets"

# Polymarket - Place an order  
"Buy $50 of YES shares on the Bitcoin 100k market at 0.45"

# Kalshi - Get market info
"Show me the orderbook for INXD-24DEC31-B10000"

# Check positions
"What are my current Polymarket positions?"

# Redeem winnings
"Redeem my winnings from resolved markets"`}</pre>
        </div>
      </section>

      {/* Parameter Types */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Parameter Types</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">query</code>
              <span className="text-gray-600">Search string (e.g., "bitcoin", "election 2024")</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">limit</code>
              <span className="text-gray-600">Maximum number of results (default varies, max 50)</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">offset</code>
              <span className="text-gray-600">Pagination offset (for fetching more results)</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">side</code>
              <span className="text-gray-600">"buy" or "sell"</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">price</code>
              <span className="text-gray-600">Limit price between 0 and 1 (e.g., 0.45)</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">size/quantity</code>
              <span className="text-gray-600">Number of contracts or dollar amount</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">tokenId</code>
              <span className="text-gray-600">Polymarket token identifier (YES or NO token)</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">ticker</code>
              <span className="text-gray-600">Kalshi market ticker (e.g., "INXD-24DEC31-B10000")</span>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related</h2>
        <div className="flex flex-wrap gap-4">
          <a 
            href="/reference/auth"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Authentication →
          </a>
          <a 
            href="/guides/trading"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Trading Guide
          </a>
        </div>
      </section>
    </div>
  );
}

