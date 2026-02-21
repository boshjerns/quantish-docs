import type { Metadata } from 'next';
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

      <div className="space-y-4">
        {endpoints.map((endpoint) => (
          <EndpointCard key={endpoint.path} endpoint={endpoint} />
        ))}
      </div>
    </div>
  );
}
