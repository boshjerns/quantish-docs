import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - Quantish Docs',
  description: 'How to authenticate with Quantish MCP servers.',
};

const Code = ({ children }: { children: string }) => (
  <pre
    className="p-4 rounded-lg text-xs font-mono overflow-x-auto my-3"
    style={{ background: 'var(--code-bg)', color: 'var(--code-text)' }}
  >
    {children}
  </pre>
);

export default function AuthenticationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--pn-text)' }}>
        Authentication
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        All MCP servers use API key authentication via the <code className="text-xs bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">x-api-key</code> header.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Making Authenticated Requests
        </h2>
        <Code>{`# MCP request with auth
POST https://quantish.live/mcp
Headers:
  Content-Type: application/json
  x-api-key: YOUR_API_KEY

Body:
  {"jsonrpc":"2.0","id":1,"method":"tools/call",
   "params":{"name":"search_markets","arguments":{"query":"bitcoin"}}}`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Key Formats
        </h2>
        <div className="space-y-3">
          <div className="card">
            <h3 className="font-semibold mb-1">Discovery Keys</h3>
            <code className="text-xs" style={{ color: 'var(--pn-text-secondary)' }}>
              qm_[32 characters]
            </code>
            <p className="text-sm mt-2" style={{ color: 'var(--pn-text-secondary)' }}>
              Generated via admin API. Free, instant access.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-1">Polymarket Keys</h3>
            <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
              Returned from the <code className="text-xs bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">request_api_key</code> MCP tool.
              Includes API secret for signing orders.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-1">Kalshi Keys</h3>
            <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
              Returned from the <code className="text-xs bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">kalshi_signup</code> MCP tool.
              Also includes Solana wallet address.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Security
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--pn-accent)' }}>•</span>
            <span style={{ color: 'var(--pn-text-secondary)' }}>
              Keep your API keys secret — treat them like passwords
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--pn-accent)' }}>•</span>
            <span style={{ color: 'var(--pn-text-secondary)' }}>
              Polymarket keys include a secret — never share it
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--pn-accent)' }}>•</span>
            <span style={{ color: 'var(--pn-text-secondary)' }}>
              Keys are tied to your external ID (email) for recovery
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Rate Limits
        </h2>
        <div className="card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <th className="text-left py-2 font-semibold" style={{ color: 'var(--pn-text)' }}>Server</th>
                <th className="text-left py-2 font-semibold" style={{ color: 'var(--pn-text)' }}>Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>Discovery</td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>60 req/min</td>
              </tr>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>Polymarket</td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>30 req/min</td>
              </tr>
              <tr>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>Kalshi</td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>30 req/min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
