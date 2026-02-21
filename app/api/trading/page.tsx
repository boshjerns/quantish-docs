import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trading API - Quantish Docs',
  description: 'Place orders and manage positions.',
};

export default function TradingAPIPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--pn-text)' }}>
        Trading API
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Place orders, manage positions, and redeem winnings across platforms.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Place Order
        </h2>
        <div className="card mb-4">
          <code className="text-sm" style={{ color: 'var(--pn-accent)' }}>POST /v1/orders</code>
          <p className="text-sm mt-2" style={{ color: 'var(--pn-text-secondary)' }}>
            Place a buy or sell order on a prediction market.
          </p>
        </div>
        <pre className="p-4 rounded-lg text-xs overflow-x-auto" style={{ background: 'var(--code-bg)', color: 'var(--code-text)' }}>
{`curl -X POST "https://api.quantish.live/v1/orders" \\
  -H "x-api-key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "platform": "polymarket",
    "tokenId": "12345",
    "side": "BUY",
    "price": 0.45,
    "size": 100,
    "orderType": "GTC"
  }'`}
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Order Types
        </h2>
        <div className="card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <th className="text-left py-2 font-semibold" style={{ color: 'var(--pn-text)' }}>Type</th>
                <th className="text-left py-2 font-semibold" style={{ color: 'var(--pn-text)' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <td className="py-2"><code className="text-xs">GTC</code></td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>Good Till Cancelled</td>
              </tr>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <td className="py-2"><code className="text-xs">GTD</code></td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>Good Till Date</td>
              </tr>
              <tr className="border-b" style={{ borderColor: 'var(--pn-border)' }}>
                <td className="py-2"><code className="text-xs">FOK</code></td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>Fill Or Kill</td>
              </tr>
              <tr>
                <td className="py-2"><code className="text-xs">FAK</code></td>
                <td className="py-2" style={{ color: 'var(--pn-text-secondary)' }}>Fill And Kill</td>
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
