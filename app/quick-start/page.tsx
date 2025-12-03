import Link from 'next/link';

export default function QuickStart() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Quick Start
      </h1>
      <p className="text-gray-600 mb-8">
        Get up and running with Quantish MCP in under 5 minutes.
      </p>

      {/* Steps */}
      <div className="space-y-8">
        {/* Step 1 */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h2 className="text-xl font-semibold">Get Your API Key</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Generate an API key from the{' '}
            <Link href="/get-started" className="text-quantish-blue hover:underline">
              Get Started
            </Link>{' '}
            page. For Discovery (market search), no access code is needed.
          </p>
        </div>

        {/* Step 2 */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h2 className="text-xl font-semibold">Configure Cursor MCP</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Add your MCP configuration to Cursor. Edit or create{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">~/.cursor/mcp.json</code>:
          </p>
          <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm overflow-x-auto">
{`{
  "mcpServers": {
    "quantish_discovery": {
      "url": "https://quantish.live/mcp",
      "headers": {
        "X-API-Key": "YOUR_DISCOVERY_KEY"
      }
    },
    "quantish": {
      "url": "https://quantish-sdk-production.up.railway.app/mcp",
      "headers": {
        "x-api-key": "YOUR_POLYMARKET_KEY"
      }
    },
    "quantish_kalshi": {
      "url": "https://kalshi-mcp-server-production.up.railway.app/mcp",
      "headers": {
        "x-api-key": "YOUR_KALSHI_KEY"
      }
    }
  }
}`}
          </pre>
          <p className="text-sm text-gray-500 mt-3">
            You only need to add the servers you want to use.
          </p>
        </div>

        {/* Step 3 */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h2 className="text-xl font-semibold">Restart Cursor</h2>
          </div>
          <p className="text-gray-600">
            Completely quit and reopen Cursor for the MCP servers to load.
            You should see them in your MCP server list.
          </p>
        </div>

        {/* Step 4 */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h2 className="text-xl font-semibold">Start Using</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Try these example prompts with Claude:
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Discovery</div>
              <code className="text-sm">"Search for Bitcoin prediction markets"</code>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Polymarket</div>
              <code className="text-sm">"What's my Polymarket wallet balance?"</code>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Kalshi</div>
              <code className="text-sm">"Show me Kalshi markets about elections"</code>
            </div>
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className="mt-12 p-6 bg-quantish-blue/10 border border-quantish-blue/20 rounded-xl">
        <h3 className="font-semibold text-lg mb-2">What's Next?</h3>
        <ul className="space-y-2 text-gray-700">
          <li>
            <Link href="/guides/wallet" className="text-quantish-blue hover:underline">
              → Set up your trading wallet
            </Link>
          </li>
          <li>
            <Link href="/guides/trading" className="text-quantish-blue hover:underline">
              → Learn how to place trades
            </Link>
          </li>
          <li>
            <Link href="/reference/tools" className="text-quantish-blue hover:underline">
              → Browse all available tools
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
