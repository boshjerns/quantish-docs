import type { Metadata } from 'next';
import { endpointsByCategory, categoryInfo } from '@/lib/api-endpoints';
import { EndpointCard } from '@/components/api/EndpointCard';

export const metadata: Metadata = {
  title: 'Polymarket API - Quantish Docs',
  description: 'Trading on Polymarket (Polygon).',
};

export default function PolymarketAPIPage() {
  const endpoints = endpointsByCategory.polymarket;
  const info = categoryInfo.polymarket;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--pn-text)' }}>
            {info.name}
          </h1>
          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs">Auth Required</span>
        </div>
        <p className="text-lg" style={{ color: 'var(--pn-text-secondary)' }}>
          {info.description}
        </p>
      </div>

      {/* Group by subcategory */}
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>Orders</h2>
          <div className="space-y-4">
            {endpoints.filter(e => e.path.includes('/orders')).map((endpoint) => (
              <EndpointCard key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>Market Data</h2>
          <div className="space-y-4">
            {endpoints.filter(e => e.path.includes('/orderbook') || e.path.includes('/price')).map((endpoint) => (
              <EndpointCard key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>Redemption</h2>
          <div className="space-y-4">
            {endpoints.filter(e => e.path.includes('/claimable') || e.path.includes('/redeem')).map((endpoint) => (
              <EndpointCard key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>Transfers & Swaps</h2>
          <div className="space-y-4">
            {endpoints.filter(e => e.path.includes('/transfer') || e.path.includes('/swap')).map((endpoint) => (
              <EndpointCard key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>Copy Trading</h2>
          <div className="space-y-4">
            {endpoints.filter(e => e.path.includes('/copy')).map((endpoint) => (
              <EndpointCard key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
