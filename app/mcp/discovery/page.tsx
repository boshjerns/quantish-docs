import Link from 'next/link';

const tools = [
  {
    name: 'search_markets',
    description: 'Search for prediction markets across Polymarket and Kalshi using semantic AI-powered search.',
    params: ['query: string', 'platform?: "polymarket" | "kalshi" | "all"', 'limit?: number'],
  },
  {
    name: 'get_market_details',
    description: 'Get detailed information about a specific market including prices, volume, and outcomes.',
    params: ['platform: string', 'marketId: string'],
  },
  {
    name: 'get_trending_markets',
    description: 'Get trending markets based on 24-hour volume and activity.',
    params: ['platform?: string', 'category?: string', 'limit?: number'],
  },
  {
    name: 'get_categories',
    description: 'Get available market categories across platforms.',
    params: [],
  },
  {
    name: 'get_market_stats',
    description: 'Get aggregate statistics about the prediction markets database.',
    params: [],
  },
];

export default function DiscoveryMCP() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">🔍</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Discovery MCP</h1>
            <p className="text-gray-500">quantish.live</p>
          </div>
        </div>
        <p className="text-gray-600">
          Search and discover prediction markets across Polymarket, Kalshi, and other platforms.
          Uses semantic AI-powered search for accurate results.
        </p>
      </div>

      {/* Quick Setup */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Setup</h2>
        <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm overflow-x-auto">
{`{
  "mcpServers": {
    "quantish_discovery": {
      "url": "https://quantish.live/mcp",
      "headers": {
        "X-API-Key": "YOUR_API_KEY"
      }
    }
  }
}`}
        </pre>
        <p className="text-sm text-gray-500 mt-3">
          <Link href="/get-started" className="text-quantish-blue hover:underline">
            Get your API key →
          </Link>
        </p>
      </div>

      {/* Tools */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Available Tools</h2>
        {tools.map((tool) => (
          <div key={tool.name} className="card">
            <div className="flex items-start justify-between mb-2">
              <code className="text-lg font-semibold text-quantish-blue">
                {tool.name}
              </code>
            </div>
            <p className="text-gray-600 mb-3">{tool.description}</p>
            {tool.params.length > 0 && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-medium text-gray-500 mb-2">Parameters</div>
                <div className="space-y-1">
                  {tool.params.map((param) => (
                    <code key={param} className="block text-sm text-gray-700">
                      {param}
                    </code>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Example */}
      <div className="card mt-8">
        <h2 className="text-lg font-semibold mb-4">Example Usage</h2>
        <p className="text-gray-600 mb-4">
          Ask Claude in Cursor:
        </p>
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">You:</div>
            <p className="text-gray-800">"Search for markets about Bitcoin price predictions"</p>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Claude will call:</div>
            <code className="text-sm text-quantish-blue">
              search_markets(query: "Bitcoin price predictions")
            </code>
          </div>
        </div>
      </div>
    </>
  );
}
