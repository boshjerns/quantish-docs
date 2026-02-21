import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quick Start - Quantish Docs',
  description: 'Get started with Quantish in 3 steps.',
};

const Code = ({ children }: { children: string }) => (
  <pre
    className="p-4 rounded-lg text-xs font-mono overflow-x-auto my-3"
    style={{ background: 'var(--code-bg)', color: 'var(--code-text)' }}
  >
    {children}
  </pre>
);

export default function QuickStartPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--pn-text)' }}>
        Quick Start
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Get connected in 3 steps and start trading prediction markets with AI.
      </p>

      {/* Step 1 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: 'var(--pn-accent)', color: 'white' }}
          >
            1
          </span>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--pn-text)' }}>
            Get API Keys
          </h2>
        </div>
        <p className="mb-4" style={{ color: 'var(--pn-text-secondary)' }}>
          Visit the <a href="/" className="text-[var(--pn-accent)] hover:underline">home page</a> to generate
          keys for all three servers, or call the MCP signup tools directly:
        </p>
        <Code>{`# Discovery - via admin API
POST https://quantish-docs-production.up.railway.app/api/generate-discovery-key
{"email": "your@email.com"}

# Polymarket - via MCP
POST https://quantish-sdk-production.up.railway.app/mcp
{"jsonrpc":"2.0","id":1,"method":"tools/call",
 "params":{"name":"request_api_key","arguments":{"externalId":"your@email.com"}}}

# Kalshi - via MCP
POST https://kalshi-mcp-production-7c2c.up.railway.app/mcp
{"jsonrpc":"2.0","id":1,"method":"tools/call",
 "params":{"name":"kalshi_signup","arguments":{"externalId":"your@email.com"}}}`}</Code>
      </section>

      {/* Step 2 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: 'var(--pn-accent)', color: 'white' }}
          >
            2
          </span>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--pn-text)' }}>
            Add to MCP Config
          </h2>
        </div>

        <p className="mb-2" style={{ color: 'var(--pn-text-secondary)' }}>
          <strong>Cursor / Windsurf</strong> — Edit <code className="text-xs bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">~/.cursor/mcp.json</code>:
        </p>
        <Code>{`{
  "mcpServers": {
    "quantish-discovery": {
      "url": "https://quantish.live/mcp",
      "headers": { "x-api-key": "YOUR_DISCOVERY_KEY" }
    },
    "quantish-polymarket": {
      "url": "https://quantish-sdk-production.up.railway.app/mcp",
      "headers": { "x-api-key": "YOUR_POLYMARKET_KEY" }
    },
    "quantish-kalshi": {
      "url": "https://kalshi-mcp-production-7c2c.up.railway.app/mcp",
      "headers": { "x-api-key": "YOUR_KALSHI_KEY" }
    }
  }
}`}</Code>

        <p className="mb-2" style={{ color: 'var(--pn-text-secondary)' }}>
          <strong>Claude Desktop</strong> — Edit <code className="text-xs bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">~/Library/Application Support/Claude/claude_desktop_config.json</code>:
        </p>
        <Code>{`{
  "mcpServers": {
    "quantish-discovery": {
      "url": "https://quantish.live/mcp",
      "headers": { "x-api-key": "YOUR_DISCOVERY_KEY" }
    }
  }
}`}</Code>
      </section>

      {/* Step 3 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: 'var(--pn-accent)', color: 'white' }}
          >
            3
          </span>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--pn-text)' }}>
            Start Trading
          </h2>
        </div>
        <p className="mb-4" style={{ color: 'var(--pn-text-secondary)' }}>
          Restart your IDE or Claude Desktop, then start using natural language:
        </p>
        <Code>{`# Search for markets
"Search for bitcoin prediction markets"

# Buy shares
"Buy $50 of YES on the BTC 100k market at 0.45"

# Check positions
"Show my Polymarket positions"

# Redeem winnings
"Claim my winnings from resolved markets"`}</Code>
      </section>

      <section className="card" style={{ background: 'var(--pn-accent-muted)' }}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--pn-accent)' }}>
          Need Help?
        </h3>
        <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
          Check the <a href="/mcp" className="text-[var(--pn-accent)] hover:underline">MCP Servers</a> section
          for detailed tool documentation, or visit our{' '}
          <a href="https://github.com/joinQuantish" className="text-[var(--pn-accent)] hover:underline">GitHub</a> for examples.
        </p>
      </section>
    </div>
  );
}
