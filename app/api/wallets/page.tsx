import type { Metadata } from 'next';
import Image from 'next/image';
import { endpointsByCategory, categoryInfo } from '@/lib/api-endpoints';
import { EndpointCard } from '@/components/api/EndpointCard';

export const metadata: Metadata = {
  title: 'Wallet Analytics API - Quantish Docs',
  description: 'Wallet profiles, whale tracking, and social discovery.',
};

export default function WalletsAPIPage() {
  const endpoints = endpointsByCategory.wallets;
  const info = categoryInfo.wallets;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Image
            src="/quantish-logo.svg"
            alt="Discovery"
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
                style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}
              >
                Public
              </span>
            </div>
            <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>
              Polymarket Analytics • Whale Tracking
            </p>
          </div>
        </div>
        <p className="text-lg mt-3" style={{ color: 'var(--pn-text-secondary)' }}>
          {info.description}
        </p>
      </div>

      <div className="space-y-3">
        {endpoints.map((endpoint) => (
          <EndpointCard key={endpoint.path} endpoint={endpoint} />
        ))}
      </div>
    </div>
  );
}
