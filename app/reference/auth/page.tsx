export default function AuthenticationPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Authentication</h1>
        <p className="text-xl text-gray-600">
          How API keys and authentication work across Quantish MCP servers.
        </p>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-4">
            Quantish uses API keys to authenticate requests to our MCP servers. Each server 
            (Discovery, Polymarket, Kalshi) requires its own API key.
          </p>
          <div className="grid gap-4 mt-6">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-500 text-xl">🔍</span>
              <div>
                <p className="font-medium text-gray-900">Discovery API Key</p>
                <p className="text-sm text-gray-600">Read-only access to search markets across platforms</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-500 text-xl">📊</span>
              <div>
                <p className="font-medium text-gray-900">Polymarket API Key</p>
                <p className="text-sm text-gray-600">Full trading access on Polymarket (requires access code)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-500 text-xl">📈</span>
              <div>
                <p className="font-medium text-gray-900">Kalshi API Key</p>
                <p className="text-sm text-gray-600">Full trading access on Kalshi via DFlow (requires access code)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Generating API Keys */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Generating API Keys</h2>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Discovery (Free)</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Go to <a href="/get-started" className="text-blue-600 hover:underline">Get API Key</a></li>
            <li>Select "Discovery" server</li>
            <li>Enter your email</li>
            <li>Click "Generate API Key"</li>
          </ol>
          <p className="text-sm text-gray-500 mt-4">No access code required for Discovery.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Polymarket & Kalshi (Access Code Required)</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Email <a href="mailto:hello@quantish.live" className="text-blue-600 hover:underline">hello@quantish.live</a> to request an access code</li>
            <li>Include your use case and expected trading volume</li>
            <li>Receive your access code within 24 hours</li>
            <li>Use the access code when generating your API key</li>
          </ol>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
            <p className="text-amber-800 text-sm">
              <strong>Why access codes?</strong> Access codes help us manage server capacity and ensure 
              quality service for all users. They also help prevent abuse.
            </p>
          </div>
        </div>
      </section>

      {/* Using API Keys */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Using API Keys</h2>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">In Cursor MCP Config</h3>
          <p className="text-gray-600 mb-4">
            Add your API key to <code className="bg-gray-100 px-1.5 py-0.5 rounded">~/.cursor/mcp.json</code>:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-100">{`{
  "mcpServers": {
    "quantish_discovery": {
      "url": "https://quantish.live/mcp",
      "headers": {
        "X-API-Key": "qm_your_api_key_here"
      }
    }
  }
}`}</pre>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Direct API Calls</h3>
          <p className="text-gray-600 mb-4">
            For direct HTTP requests, include the API key in the <code className="bg-gray-100 px-1.5 py-0.5 rounded">X-API-Key</code> header:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-100">{`curl -X POST https://quantish.live/api/mcp/execute \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: qm_your_api_key_here" \\
  -d '{"tool": "search_markets", "args": {"query": "bitcoin"}}'`}</pre>
          </div>
        </div>
      </section>

      {/* API Key Format */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">API Key Format</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-4">Quantish API keys follow this format:</p>
          <div className="bg-gray-100 rounded-lg p-4 font-mono text-center text-lg">
            <span className="text-purple-600">qm_</span>
            <span className="text-gray-600">[32 random characters]</span>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono shrink-0">qm_</code>
              <span className="text-gray-600">Prefix identifying Quantish keys</span>
            </div>
            <div className="flex items-start gap-3">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono shrink-0">[32 chars]</code>
              <span className="text-gray-600">Cryptographically random alphanumeric string</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Example: <code className="bg-gray-100 px-1.5 py-0.5 rounded">qm_JuTmBHbIyBrmUd1Aif__r1cEpY11dqbm</code>
          </p>
        </div>
      </section>

      {/* Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Security Best Practices</h2>
        <div className="grid gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">🔒 Keep Keys Secret</h3>
            <p className="text-gray-600">
              Never share your API key publicly. Don't commit it to git or post it in forums/chat.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">🔄 Rotate Regularly</h3>
            <p className="text-gray-600">
              Generate new API keys periodically. Revoke old keys you no longer use.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">📍 Use Separate Keys</h3>
            <p className="text-gray-600">
              Use different API keys for development vs production. This limits exposure if one is compromised.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">🚨 Monitor Usage</h3>
            <p className="text-gray-600">
              If you notice unexpected activity, revoke your key immediately and generate a new one.
            </p>
          </div>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Rate Limits</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-4">
            API requests are rate limited to ensure fair usage:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 pr-4 font-semibold text-gray-900">Server</th>
                  <th className="py-2 pr-4 font-semibold text-gray-900">Limit</th>
                  <th className="py-2 font-semibold text-gray-900">Notes</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Discovery</td>
                  <td className="py-3 pr-4">100 req/min</td>
                  <td className="py-3">Search and read operations</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Polymarket</td>
                  <td className="py-3 pr-4">60 req/min</td>
                  <td className="py-3">Trading operations may have lower limits</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Kalshi</td>
                  <td className="py-3 pr-4">60 req/min</td>
                  <td className="py-3">Subject to DFlow API limits</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Rate limit errors return HTTP 429. Wait and retry with exponential backoff.
          </p>
        </div>
      </section>

      {/* Endpoints */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">API Endpoints</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Discovery</h3>
              <div className="space-y-1 font-mono text-sm">
                <p><span className="text-gray-500">MCP:</span> <code className="text-blue-600">https://quantish.live/mcp</code></p>
                <p><span className="text-gray-500">Tools:</span> <code className="text-blue-600">https://quantish.live/api/mcp/tools</code></p>
                <p><span className="text-gray-500">Execute:</span> <code className="text-blue-600">https://quantish.live/api/mcp/execute</code></p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Polymarket</h3>
              <div className="space-y-1 font-mono text-sm">
                <p><span className="text-gray-500">MCP:</span> <code className="text-purple-600">https://polymarket-mcp.quantish.live/mcp</code></p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Kalshi</h3>
              <div className="space-y-1 font-mono text-sm">
                <p><span className="text-gray-500">MCP:</span> <code className="text-green-600">https://kalshi-mcp.quantish.live/mcp</code></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revoking Keys */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Revoking API Keys</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-600 mb-4">
            To revoke an API key or report suspicious activity:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Email <a href="mailto:hello@quantish.live" className="text-blue-600 hover:underline">hello@quantish.live</a></li>
            <li>Include the key prefix (first 10 characters, e.g., <code className="bg-gray-100 px-1.5 py-0.5 rounded">qm_JuTmBHb</code>)</li>
            <li>Describe the reason for revocation</li>
          </ol>
          <p className="text-sm text-gray-500 mt-4">
            Keys are revoked immediately. Generate a new key to continue using the service.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related</h2>
        <div className="flex flex-wrap gap-4">
          <a 
            href="/get-started"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get API Key →
          </a>
          <a 
            href="/guides/cursor"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cursor Setup
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

