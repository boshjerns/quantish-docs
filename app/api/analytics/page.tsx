import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics API - Quantish Docs',
  description: 'Trader profiles and wallet analytics.',
};

export default function AnalyticsAPIPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--pn-text)' }}>
        Analytics API
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Trader profiles, whale tracking, social discovery, and portfolio analysis.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Get Wallet Profile
        </h2>
        <div className="card mb-4">
          <code className="text-sm" style={{ color: 'var(--pn-accent)' }}>GET /v1/wallets/{`{address}`}/profile</code>
          <p className="text-sm mt-2" style={{ color: 'var(--pn-text-secondary)' }}>
            Get detailed profile with PNL, ROI, trading patterns, and category distribution.
          </p>
        </div>
        <pre className="p-4 rounded-lg text-xs overflow-x-auto" style={{ background: 'var(--code-bg)', color: 'var(--code-text)' }}>
{`curl "https://api.quantish.live/v1/wallets/0x1234.../profile" \\
  -H "x-api-key: YOUR_KEY"`}
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Get Whale Activity
        </h2>
        <div className="card mb-4">
          <code className="text-sm" style={{ color: 'var(--pn-accent)' }}>GET /v1/markets/{`{id}`}/whales</code>
          <p className="text-sm mt-2" style={{ color: 'var(--pn-text-secondary)' }}>
            Get largest traders and recent large trades for a specific market.
          </p>
        </div>
      </section>

      <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>
        For full API documentation, see the interactive API explorer at api.quantish.live
      </p>
    </div>
  );
}
