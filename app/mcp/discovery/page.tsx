import Link from 'next/link';

const tools = [
  {
    name: 'search_markets',
    description: 'Search for prediction markets using AI-powered semantic search',
    params: [
      { name: 'query', type: 'string', required: true, desc: 'Natural language search query' },
      { name: 'platform', type: 'string', required: false, desc: '"polymarket", "kalshi", or "all" (default)' },
      { name: 'category', type: 'string', required: false, desc: 'Filter by category' },
      { name: 'limit', type: 'number', required: false, desc: 'Max results 1-20 (default 10)' },
      { name: 'sortBy', type: 'string', required: false, desc: '"relevance", "soonest", or "latest"' },
    ],
  },
  {
    name: 'get_market_details',
    description: 'Get detailed information about a specific market',
    params: [
      { name: 'platform', type: 'string', required: true, desc: '"polymarket" or "kalshi"' },
      { name: 'marketId', type: 'string', required: true, desc: 'Market ID or ticker' },
    ],
  },
  {
    name: 'get_trending_markets',
    description: 'Get trending markets by 24-hour volume',
    params: [
      { name: 'platform', type: 'string', required: false, desc: 'Platform to query (default "all")' },
      { name: 'category', type: 'string', required: false, desc: 'Category filter (default "POLITICS")' },
      { name: 'limit', type: 'number', required: false, desc: 'Max results 1-10 (default 5)' },
    ],
  },
  {
    name: 'get_categories',
    description: 'Get available market categories for filtering',
    params: [],
  },
  {
    name: 'get_market_stats',
    description: 'Get aggregate statistics about the prediction markets database',
    params: [],
  },
  {
    name: 'get_search_status',
    description: 'Check the status of the semantic search system',
    params: [],
  },
];

export default function DiscoveryMCP() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-[hsl(var(--primary))] flex items-center justify-center border-2 border-[hsl(var(--border))]">
            <span className="text-[hsl(var(--primary-foreground))] font-bold text-2xl">Q</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight">Discovery MCP</h1>
            <p className="text-[hsl(var(--muted-foreground))] font-mono text-sm">quantish.live</p>
          </div>
        </div>
        <p className="text-[hsl(var(--muted-foreground))]">
          Search and discover prediction markets across Polymarket and Kalshi. 
          AI-powered semantic search with hybrid keyword + embedding matching.
        </p>
      </div>

      {/* Key Info */}
      <div className="card mb-8 border-green-600 dark:border-green-500 bg-green-50 dark:bg-green-950">
        <h3 className="font-bold text-green-900 dark:text-green-100 mb-2 uppercase tracking-wide">✓ No Access Code Required</h3>
        <p className="text-sm text-green-800 dark:text-green-200">
          Discovery API is open access. Generate an API key on the Get API Key page and start searching immediately.
        </p>
      </div>

      {/* Quick Setup */}
      <div className="card mb-8">
        <h2 className="text-lg font-bold mb-4 uppercase tracking-tight">MCP Configuration (Cursor)</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">Add to <code className="bg-[hsl(var(--muted))] px-1 border border-[hsl(var(--border))]">~/.cursor/mcp.json</code>:</p>
        <pre className="p-4 bg-[hsl(0_0%_5%)] text-gray-100 font-mono text-sm overflow-x-auto border-2 border-[hsl(var(--border))] brutalist-shadow">
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
        <h3 className="text-md font-bold mt-6 mb-3 uppercase tracking-tight">Claude Code</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">Add to <code className="bg-[hsl(var(--muted))] px-1 border border-[hsl(var(--border))]">~/.claude/settings.json</code>:</p>
        <pre className="p-4 bg-[hsl(0_0%_5%)] text-gray-100 font-mono text-sm overflow-x-auto border-2 border-[hsl(var(--border))] brutalist-shadow">
{`{
  "mcpServers": {
    "quantish-discovery": {
      "type": "url",
      "url": "https://quantish.live/mcp",
      "headers": {
        "X-API-Key": "YOUR_API_KEY"
      }
    }
  }
}`}
        </pre>
      </div>

      {/* REST API */}
      <div className="card mb-8">
        <h2 className="text-lg font-bold mb-4 uppercase tracking-tight">REST API Endpoints</h2>
        <div className="space-y-4 font-mono text-sm">
          <div className="p-4 border-2 border-[hsl(var(--border))]">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold">GET</span>
              <code>/mcp/tools</code>
            </div>
            <p className="text-[hsl(var(--muted-foreground))] text-xs">List all available tools</p>
          </div>
          <div className="p-4 border-2 border-[hsl(var(--border))]">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold">POST</span>
              <code>/mcp/execute</code>
            </div>
            <p className="text-[hsl(var(--muted-foreground))] text-xs">Execute any tool directly</p>
          </div>
          <div className="p-4 border-2 border-[hsl(var(--border))]">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold">POST</span>
              <code>/mcp</code>
            </div>
            <p className="text-[hsl(var(--muted-foreground))] text-xs">Full MCP protocol endpoint</p>
          </div>
        </div>
      </div>

      {/* Example */}
      <div className="card mb-8">
        <h2 className="text-lg font-bold mb-4 uppercase tracking-tight">Example Request</h2>
        <pre className="p-4 bg-[hsl(0_0%_5%)] text-gray-100 font-mono text-sm overflow-x-auto border-2 border-[hsl(var(--border))] brutalist-shadow">
{`curl -X POST https://quantish.live/mcp/execute \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: qm_your_key" \\
  -d '{
    "name": "search_markets",
    "arguments": {
      "query": "Federal Reserve interest rates",
      "platform": "all",
      "limit": 5
    }
  }'`}
        </pre>
      </div>

      {/* Tools */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold uppercase tracking-tight">Available Tools ({tools.length})</h2>
        {tools.map((tool) => (
          <div key={tool.name} className="card">
            <code className="text-lg font-bold text-[hsl(var(--primary))] dark:text-[hsl(var(--accent))]">
              {tool.name}
            </code>
            <p className="text-[hsl(var(--muted-foreground))] mt-2 mb-4">{tool.description}</p>
            
            {tool.params.length > 0 && (
              <div className="border-t-2 border-[hsl(var(--border))] pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-[hsl(var(--muted-foreground))]">
                  Parameters
                </h4>
                <div className="space-y-2">
                  {tool.params.map((param) => (
                    <div key={param.name} className="flex items-start gap-3 text-sm font-mono">
                      <code className="px-2 py-1 bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">
                        {param.name}
                      </code>
                      <span className="text-[hsl(var(--muted-foreground))]">{param.type}</span>
                      {param.required && (
                        <span className="text-xs px-1 py-0.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 font-bold">
                          REQUIRED
                        </span>
                      )}
                      <span className="text-[hsl(var(--muted-foreground))] flex-1">{param.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Rate Limits */}
      <div className="card mt-8">
        <h2 className="text-lg font-bold mb-4 uppercase tracking-tight">Rate Limits</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[hsl(var(--primary))] dark:bg-[hsl(var(--accent))]"></span>
            <strong>100 requests per minute</strong> per API key
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[hsl(var(--primary))] dark:bg-[hsl(var(--accent))]"></span>
            Rate limit headers included in responses
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[hsl(var(--primary))] dark:bg-[hsl(var(--accent))]"></span>
            Exceeding limit returns HTTP 429
          </li>
        </ul>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-4">
          Use <code className="px-1 bg-[hsl(var(--muted))] border border-[hsl(var(--border))]">get_market_stats</code> to get live database coverage statistics.
        </p>
      </div>
    </>
  );
}
