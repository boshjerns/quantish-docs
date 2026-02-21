import type { Metadata } from 'next';
import Image from 'next/image';
import { endpointsByCategory, categoryInfo } from '@/lib/api-endpoints';
import { EndpointCard } from '@/components/api/EndpointCard';

export const metadata: Metadata = {
  title: 'Account API - Quantish Docs',
  description: 'Balances, positions, and orders across all platforms.',
};

export default function AccountAPIPage() {
  const endpoints = endpointsByCategory.account;
  const info = categoryInfo.account;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Image
            src="/quantish-logo.svg"
            alt="Quantish"
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
                style={{ background: 'rgba(46, 92, 255, 0.2)', color: '#2E5CFF' }}
              >
                Auth Required
              </span>
            </div>
            <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>
              All Platforms • Unified View
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
