export default function CursorIntegrationPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cursor Integration</h1>
        <p className="text-xl text-gray-600">
          Set up Quantish MCP servers in Cursor IDE for AI-powered prediction market trading.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-0.5">✓</span>
              <span className="text-gray-600">
                <strong>Cursor IDE</strong> - Download from{' '}
                <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  cursor.sh
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-0.5">✓</span>
              <span className="text-gray-600">
                <strong>API Key</strong> - Generate from the{' '}
                <a href="/get-started" className="text-blue-600 hover:underline">Get Started</a> page
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-0.5">✓</span>
              <span className="text-gray-600">
                <strong>Claude model</strong> - Cursor uses Claude for MCP tool execution
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Step 1: Generate API Key */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Generate Your API Key</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <ol className="list-decimal list-inside space-y-4 text-gray-600">
            <li>Go to the <a href="/get-started" className="text-blue-600 hover:underline">Get API Key</a> page</li>
            <li>Select your server type:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li><strong>Discovery</strong> - Search markets (no trading)</li>
                <li><strong>Polymarket</strong> - Trade on Polymarket</li>
                <li><strong>Kalshi</strong> - Trade on Kalshi via DFlow</li>
              </ul>
            </li>
            <li>Enter your email and click "Generate API Key"</li>
            <li>Copy the generated API key and MCP config</li>
          </ol>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> Save your API key immediately. It's only shown once and cannot be retrieved later.
            </p>
          </div>
        </div>
      </section>

      {/* Step 2: Configure MCP */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Configure MCP in Cursor</h2>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Find Your Config File</h3>
          <p className="text-gray-600 mb-4">The MCP config file location depends on your OS:</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">🍎</span>
              <div>
                <p className="font-medium text-gray-900">macOS</p>
                <code className="text-sm text-gray-600">~/.cursor/mcp.json</code>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">🪟</span>
              <div>
                <p className="font-medium text-gray-900">Windows</p>
                <code className="text-sm text-gray-600">%USERPROFILE%\.cursor\mcp.json</code>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">🐧</span>
              <div>
                <p className="font-medium text-gray-900">Linux</p>
                <code className="text-sm text-gray-600">~/.cursor/mcp.json</code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Add Your MCP Configuration</h3>
          <p className="text-gray-600 mb-4">
            Create or edit the <code className="bg-gray-100 px-1.5 py-0.5 rounded">mcp.json</code> file with the following content:
          </p>
          
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-100">{`{
  "mcpServers": {
    "quantish_discovery": {
      "url": "https://quantish.live/mcp",
      "headers": {
        "X-API-Key": "YOUR_DISCOVERY_API_KEY"
      }
    },
    "polymarket": {
      "url": "https://polymarket-mcp.quantish.live/mcp",
      "headers": {
        "X-API-Key": "YOUR_POLYMARKET_API_KEY"
      }
    },
    "kalshi": {
      "url": "https://kalshi-mcp.quantish.live/mcp",
      "headers": {
        "X-API-Key": "YOUR_KALSHI_API_KEY"
      }
    }
  }
}`}</pre>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-blue-800 text-sm">
              <strong>Tip:</strong> You can add just the servers you need. Discovery is great for exploration, 
              then add Polymarket or Kalshi when you're ready to trade.
            </p>
          </div>
        </div>
      </section>

      {/* Step 3: Restart Cursor */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Restart Cursor</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-4">
            After saving your <code className="bg-gray-100 px-1.5 py-0.5 rounded">mcp.json</code> file:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Completely quit Cursor (not just close the window)</li>
            <li>Reopen Cursor</li>
            <li>Open the chat panel (Cmd/Ctrl + L)</li>
          </ol>
        </div>
      </section>

      {/* Step 4: Verify Connection */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 4: Verify Connection</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-4">Test that everything is working:</p>
          
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto mb-4">
            <p className="text-gray-400"># Try these commands in Cursor chat:</p>
            <p className="text-green-400 mt-2">"Search for Bitcoin prediction markets"</p>
            <p className="text-green-400 mt-1">"List available tools from Polymarket MCP"</p>
            <p className="text-green-400 mt-1">"Get Kalshi events in the Crypto category"</p>
          </div>
          
          <p className="text-gray-600">
            If Claude responds with market data or tool information, your MCP is configured correctly!
          </p>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">"MCP not found" or tools don't appear</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Make sure <code className="bg-gray-100 px-1.5 py-0.5 rounded">mcp.json</code> is in the correct location</li>
              <li>Check for JSON syntax errors (missing commas, brackets)</li>
              <li>Restart Cursor completely (quit and reopen)</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">"Unauthorized" or "Invalid API Key"</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Verify your API key is correct (no extra spaces)</li>
              <li>Make sure the header is exactly <code className="bg-gray-100 px-1.5 py-0.5 rounded">X-API-Key</code></li>
              <li>Generate a new key if the old one isn't working</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">"Connection refused" or timeout</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Check your internet connection</li>
              <li>Verify the URL is correct (no typos)</li>
              <li>The server might be temporarily down - try again in a few minutes</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Tools not executing</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Make sure you're using Claude model (not GPT)</li>
              <li>MCP tools only work in Agent mode, not regular chat</li>
              <li>Try being more explicit: "Use the search_markets tool to find..."</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Example Session */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example Trading Session</h2>
        <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm overflow-x-auto">
          <div className="space-y-4">
            <div>
              <p className="text-blue-400">You:</p>
              <p className="text-gray-100">"Search for upcoming election markets on Polymarket"</p>
            </div>
            <div>
              <p className="text-green-400">Claude:</p>
              <p className="text-gray-300">I found 15 election markets. Here are the most active ones...</p>
            </div>
            <div>
              <p className="text-blue-400">You:</p>
              <p className="text-gray-100">"Show me the orderbook for the presidential election market"</p>
            </div>
            <div>
              <p className="text-green-400">Claude:</p>
              <p className="text-gray-300">The current orderbook shows YES at $0.52 bid / $0.54 ask...</p>
            </div>
            <div>
              <p className="text-blue-400">You:</p>
              <p className="text-gray-100">"Buy $100 of YES shares at $0.52"</p>
            </div>
            <div>
              <p className="text-green-400">Claude:</p>
              <p className="text-gray-300">Order placed! Bought 192 YES shares at $0.52. Order ID: abc123...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <div className="flex flex-wrap gap-4">
          <a 
            href="/guides/trading"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Learn Trading →
          </a>
          <a 
            href="/guides/wallet"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Wallet Setup
          </a>
          <a 
            href="/reference/tools"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            All Tools
          </a>
        </div>
      </section>
    </div>
  );
}

