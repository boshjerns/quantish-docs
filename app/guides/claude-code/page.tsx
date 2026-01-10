export default function ClaudeCodeIntegrationPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Claude Code Integration</h1>
        <p className="text-xl text-gray-600">
          Set up Quantish MCP servers in Claude Code (Anthropic's CLI) for AI-powered prediction market trading.
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
                <strong>Claude Code CLI</strong> - Install with{' '}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">npm install -g @anthropic-ai/claude-code</code>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-0.5">✓</span>
              <span className="text-gray-600">
                <strong>API Key</strong> - Generate from the{' '}
                <a href="/get-started" className="text-blue-600 hover:underline">Get Started</a> page
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
                <li><strong>Discovery</strong> - Search markets across platforms (no access code needed)</li>
                <li><strong>Kalshi</strong> - Trade on Kalshi via Solana/DFlow (no access code needed)</li>
                <li><strong>Polymarket</strong> - Trade on Polymarket (requires access code)</li>
              </ul>
            </li>
            <li>Enter your email and click "Generate API Key"</li>
            <li>Copy the generated API key</li>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Configure MCP in Claude Code</h2>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Config File Location</h3>
          <p className="text-gray-600 mb-4">Claude Code uses a settings file at:</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">🍎</span>
              <div>
                <p className="font-medium text-gray-900">macOS / Linux</p>
                <code className="text-sm text-gray-600">~/.claude/settings.json</code>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">🪟</span>
              <div>
                <p className="font-medium text-gray-900">Windows</p>
                <code className="text-sm text-gray-600">%USERPROFILE%\.claude\settings.json</code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Add Your MCP Configuration</h3>
          <p className="text-gray-600 mb-4">
            Create or edit the <code className="bg-gray-100 px-1.5 py-0.5 rounded">settings.json</code> file:
          </p>

          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-100">{`{
  "mcpServers": {
    "quantish-discovery": {
      "type": "url",
      "url": "https://quantish.live/mcp",
      "headers": {
        "X-API-Key": "YOUR_DISCOVERY_API_KEY"
      }
    },
    "quantish": {
      "type": "url",
      "url": "https://quantish-sdk-production.up.railway.app/mcp",
      "headers": {
        "x-api-key": "YOUR_POLYMARKET_API_KEY"
      }
    },
    "quantish-kalshi": {
      "type": "url",
      "url": "https://kalshi-mcp-production-7c2c.up.railway.app/mcp",
      "headers": {
        "x-api-key": "YOUR_KALSHI_API_KEY"
      }
    }
  }
}`}</pre>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-blue-800 text-sm">
              <strong>Key Difference from Cursor:</strong> Claude Code requires <code className="bg-blue-100 px-1 rounded">"type": "url"</code> for HTTP-based MCP servers.
              Server names use hyphens (e.g., <code className="bg-blue-100 px-1 rounded">quantish-kalshi</code>) instead of underscores.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Setup Commands</h3>
          <p className="text-gray-600 mb-4">You can also create the config from terminal:</p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
            <p className="text-gray-400"># Create the .claude directory</p>
            <p className="text-green-400">mkdir -p ~/.claude</p>
            <p className="text-gray-400 mt-3"># Create settings.json (replace YOUR_KEY)</p>
            <p className="text-green-400">cat {'>'} ~/.claude/settings.json {'<<'} 'EOF'</p>
            <p className="text-gray-300">{`{
  "mcpServers": {
    "quantish-discovery": {
      "type": "url",
      "url": "https://quantish.live/mcp",
      "headers": { "X-API-Key": "YOUR_KEY" }
    }
  }
}`}</p>
            <p className="text-green-400">EOF</p>
          </div>
        </div>
      </section>

      {/* Step 3: Start Claude Code */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Start Claude Code</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-4">
            After saving your config, start Claude Code:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto mb-4">
            <p className="text-green-400">claude</p>
          </div>
          <p className="text-gray-600">
            Claude Code will automatically load MCP servers from your settings file.
            You should see the servers listed when Claude starts.
          </p>
        </div>
      </section>

      {/* Step 4: Verify Connection */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 4: Verify Connection</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-4">Test that everything is working:</p>

          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto mb-4">
            <p className="text-gray-400"># Try these commands in Claude Code:</p>
            <p className="text-green-400 mt-2">"Search for Bitcoin prediction markets"</p>
            <p className="text-green-400 mt-1">"Get trending markets on Kalshi"</p>
            <p className="text-green-400 mt-1">"What's my Polymarket wallet balance?"</p>
          </div>

          <p className="text-gray-600">
            If Claude responds with market data, your MCP is configured correctly!
          </p>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">"type": "url" is required</h3>
            <p className="text-gray-600">
              Claude Code requires <code className="bg-gray-100 px-1.5 py-0.5 rounded">{"\"type\": \"url\""}</code> for HTTP-based MCP servers.
              This is different from Cursor which infers the type automatically.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">MCP server not connecting</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Check that your API key is correct (no extra spaces or quotes)</li>
              <li>Verify the URL is exactly as shown (including /mcp at the end)</li>
              <li>Ensure your internet connection is working</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">JSON syntax errors</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Use a JSON validator to check your settings.json</li>
              <li>Make sure all strings are in double quotes</li>
              <li>Check for trailing commas (not allowed in JSON)</li>
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
              <p className="text-gray-100">"Search for Super Bowl prediction markets on Kalshi"</p>
            </div>
            <div>
              <p className="text-green-400">Claude:</p>
              <p className="text-gray-300">I found several Super Bowl markets. Here are the most active ones...</p>
            </div>
            <div>
              <p className="text-blue-400">You:</p>
              <p className="text-gray-100">"Get live data for the Chiefs vs Eagles market"</p>
            </div>
            <div>
              <p className="text-green-400">Claude:</p>
              <p className="text-gray-300">The current prices are: Chiefs YES: $0.45, Eagles YES: $0.55...</p>
            </div>
            <div>
              <p className="text-blue-400">You:</p>
              <p className="text-gray-100">"Buy $50 of Chiefs YES tokens"</p>
            </div>
            <div>
              <p className="text-green-400">Claude:</p>
              <p className="text-gray-300">Order executed! Bought 111 YES tokens at $0.45. Transaction: 5xK7...</p>
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
            Learn Trading
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
