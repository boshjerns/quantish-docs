import type { Metadata } from 'next';
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
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--pn-text)' }}>
            {info.name}
          </h1>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs">Public</span>
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
