import type { Metadata } from 'next';
import Image from 'next/image';
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
        <div className="flex items-center gap-3 mb-2">
          <Image
            src="/polymarket-logo.svg"
            alt="Polymarket"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold" style={{ color: 'var(--pn-text)' }}>
                {info.name}
              </h1>
              <span
                className="px-2 py-0.5 rounded text-xs font-medium"
                style={{ background: 'rgba(96, 71, 255, 0.2)', color: '#6047FF' }}
              >
                Auth Required
              </span>
            </div>
            <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>
              Polygon • Safe Wallet • CTF Exchange
            </p>
          </div>
        </div>
        <p className="text-lg mt-3" style={{ color: 'var(--pn-text-secondary)' }}>
          {info.description}
        </p>
      </div>

      {/* Group by subcategory */}
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>Orders</h2>
          <div className="space-y-3">
            {endpoints.filter(e => e.path.includes('/orders')).map((endpoint) => (
              <EndpointCard key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>Market Data</h2>
          <div className="space-y-3">
            {endpoints.filter(e => e.path.includes('/orderbook') || e.path.includes('/price')).map((endpoint) => (
              <EndpointCard key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>Redemption</h2>
          <div className="space-y-3">
            {endpoints.filter(e => e.path.includes('/claimable') || e.path.includes('/redeem')).map((endpoint) => (
              <EndpointCard key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>Transfers & Swaps</h2>
          <div className="space-y-3">
            {endpoints.filter(e => e.path.includes('/transfer') || e.path.includes('/swap')).map((endpoint) => (
              <EndpointCard key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>Copy Trading</h2>
          <div className="space-y-3">
            {endpoints.filter(e => e.path.includes('/copy')).map((endpoint) => (
              <EndpointCard key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
