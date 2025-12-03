import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ApiKeyGenerator from '@/components/ApiKeyGenerator';

export default function GetStarted() {
  return (
    <div className="flex min-h-screen bg-isometric">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Get Your API Key
              </h1>
              <p className="text-gray-600">
                Generate an API key to start using Quantish MCP servers with Cursor, Claude, or any MCP-compatible client.
              </p>
            </div>

            {/* API Key Generator */}
            <ApiKeyGenerator />

            {/* Instructions */}
            <div className="mt-12 space-y-8">
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Which Server Do I Need?</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="font-medium text-purple-900">🔍 Discovery</div>
                    <p className="text-sm text-purple-700 mt-1">
                      Best for: Searching and exploring markets across all platforms. 
                      No trading - just market data and discovery.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="font-medium text-blue-900">📊 Polymarket</div>
                    <p className="text-sm text-blue-700 mt-1">
                      Best for: Trading on Polymarket. Includes wallet management, 
                      order placement, position tracking, and winnings redemption.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="font-medium text-green-900">📈 Kalshi</div>
                    <p className="text-sm text-green-700 mt-1">
                      Best for: Trading on Kalshi via Solana/DFlow. 
                      Requires Solana wallet (generated or imported from Phantom).
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Access Codes</h2>
                <p className="text-gray-600 mb-4">
                  Polymarket and Kalshi trading servers require an access code to generate API keys.
                  This helps us manage capacity and ensure quality service.
                </p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>To get an access code:</strong>
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                    <li>Email <a href="mailto:hello@quantish.live" className="text-quantish-blue hover:underline">hello@quantish.live</a></li>
                    <li>Include your use case and expected volume</li>
                    <li>You'll receive your code within 24 hours</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>
                    <strong>Copy your API key</strong> - Save it securely, it's only shown once
                  </li>
                  <li>
                    <strong>Configure Cursor</strong> - Add the MCP config to{' '}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">~/.cursor/mcp.json</code>
                  </li>
                  <li>
                    <strong>Restart Cursor</strong> - Required for MCP to load
                  </li>
                  <li>
                    <strong>Start chatting</strong> - Ask Claude to search markets or place trades
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

