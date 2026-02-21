import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wallets API - Quantish Docs',
  description: 'Wallet management and transfers.',
};

export default function WalletsAPIPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--pn-text)' }}>
        Wallets API
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Manage wallets, check balances, transfer funds, and swap tokens.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Get Balances
        </h2>
        <div className="card mb-4">
          <code className="text-sm" style={{ color: 'var(--pn-accent)' }}>GET /v1/wallet/balances</code>
          <p className="text-sm mt-2" style={{ color: 'var(--pn-text-secondary)' }}>
            Get all token balances for your wallet.
          </p>
        </div>
        <pre className="p-4 rounded-lg text-xs overflow-x-auto" style={{ background: 'var(--code-bg)', color: 'var(--code-text)' }}>
{`curl "https://api.quantish.live/v1/wallet/balances" \\
  -H "x-api-key: YOUR_KEY"

// Response
{
  "usdc": "1250.00",
  "nativeUsdc": "500.00",
  "matic": "2.5"
}`}
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Transfer USDC
        </h2>
        <div className="card mb-4">
          <code className="text-sm" style={{ color: 'var(--pn-accent)' }}>POST /v1/wallet/transfer</code>
          <p className="text-sm mt-2" style={{ color: 'var(--pn-text-secondary)' }}>
            Transfer USDC to another address.
          </p>
        </div>
        <pre className="p-4 rounded-lg text-xs overflow-x-auto" style={{ background: 'var(--code-bg)', color: 'var(--code-text)' }}>
{`curl -X POST "https://api.quantish.live/v1/wallet/transfer" \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "0x...",
    "amount": "100.00"
  }'`}
        </pre>
      </section>

      <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>
        For full API documentation, see the interactive API explorer at api.quantish.live
      </p>
    </div>
  );
}
