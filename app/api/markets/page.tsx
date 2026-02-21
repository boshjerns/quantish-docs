import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markets API - Quantish Docs',
  description: 'Search and explore prediction markets.',
};

export default function MarketsAPIPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--pn-text)' }}>
        Markets API
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Search, filter, and explore prediction markets across Polymarket, Kalshi, and Limitless.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Search Markets
        </h2>
        <div className="card mb-4">
          <code className="text-sm" style={{ color: 'var(--pn-accent)' }}>GET /v1/markets</code>
          <p className="text-sm mt-2" style={{ color: 'var(--pn-text-secondary)' }}>
            Search markets by query with optional filters.
          </p>
        </div>
        <pre className="p-4 rounded-lg text-xs overflow-x-auto" style={{ background: 'var(--code-bg)', color: 'var(--code-text)' }}>
{`curl "https://api.quantish.live/v1/markets?q=bitcoin&platform=polymarket&limit=10" \\
  -H "x-api-key: YOUR_KEY"`}
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Query Parameters
        </h2>
        <div className="card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <th className="text-left py-2 font-semibold" style={{ color: 'var(--pn-text)' }}>Param</th>
                <th className="text-left py-2 font-semibold" style={{ color: 'var(--pn-text)' }}>Type</th>
                <th className="text-left py-2 font-semibold" style={{ color: 'var(--pn-text)' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <td className="py-2"><code className="text-xs">q</code></td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>string</td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>Search query</td>
              </tr>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <td className="py-2"><code className="text-xs">platform</code></td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>string</td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>polymarket, kalshi, limitless</td>
              </tr>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <td className="py-2"><code className="text-xs">category</code></td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>string</td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>Politics, Sports, Crypto, etc.</td>
              </tr>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <td className="py-2"><code className="text-xs">minProb</code></td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>number</td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>Minimum probability (0-100)</td>
              </tr>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <td className="py-2"><code className="text-xs">maxProb</code></td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>number</td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>Maximum probability (0-100)</td>
              </tr>
              <tr>
                <td className="py-2"><code className="text-xs">limit</code></td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>number</td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>Max results (default 20)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>
        For full API documentation, see the interactive API explorer at api.quantish.live
      </p>
    </div>
  );
}
