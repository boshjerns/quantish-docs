import type { Metadata } from 'next';
import Link from 'next/link';
import { endpointsByCategory, categoryInfo } from '@/lib/api-endpoints';

export const metadata: Metadata = {
  title: 'API Reference - Quantish Docs',
  description: 'REST API reference for Quantish prediction market infrastructure.',
};

export default function APIOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--pn-text)' }}>
        API Reference
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Quantish provides a unified REST API for prediction market trading across Polymarket, Kalshi, and Limitless.
      </p>

      {/* Quick Start */}
      <section className="card mb-8" style={{ background: 'var(--pn-elevated)' }}>
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Quick Start
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--pn-text-secondary)' }}>
              1. Get an API Key
            </h3>
            <pre className="p-3 rounded-lg text-xs overflow-x-auto" style={{ background: 'var(--code-bg)', color: 'var(--code-text)' }}>
{`curl -X POST https://api.quantish.live/v1/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{"externalId": "your-unique-id"}'`}
            </pre>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--pn-text-secondary)' }}>
              2. Make Requests
            </h3>
            <pre className="p-3 rounded-lg text-xs overflow-x-auto" style={{ background: 'var(--code-bg)', color: 'var(--code-text)' }}>
{`curl https://api.quantish.live/v1/markets/trending \\
  -H "x-api-key: YOUR_API_KEY"`}
            </pre>
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Authentication
        </h2>
        <div className="card" style={{ background: 'var(--pn-elevated)' }}>
          <p className="mb-4" style={{ color: 'var(--pn-text-secondary)' }}>
            All trading endpoints require authentication via the <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded">x-api-key</code> header.
            Market search and wallet analytics are public and don&apos;t require a key.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs">Public</span>
            <span style={{ color: 'var(--pn-text-secondary)' }}>/v1/markets/*, /v1/wallets/*</span>
          </div>
          <div className="flex items-center gap-2 text-sm mt-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs">Auth Required</span>
            <span style={{ color: 'var(--pn-text-secondary)' }}>/v1/account/*, /v1/polymarket/*, /v1/kalshi/*, /v1/limitless/*</span>
          </div>
        </div>
      </section>

      {/* API Categories */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Endpoints by Category
        </h2>
        <div className="grid gap-4">
          {Object.entries(categoryInfo).map(([key, info]) => (
            <Link
              key={key}
              href={`/api/${key}`}
              className="card block hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold" style={{ color: 'var(--pn-text)' }}>
                      {info.name}
                    </h3>
                    {info.requiresAuth ? (
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs">Auth</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs">Public</span>
                    )}
                  </div>
                  <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
                    {info.description}
                  </p>
                </div>
                <div className="text-2xl font-bold" style={{ color: 'var(--pn-text-muted)' }}>
                  {endpointsByCategory[key]?.length || 0}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Base URL */}
      <section className="card" style={{ background: 'var(--pn-accent-muted)' }}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--pn-accent)' }}>
          Base URL
        </h3>
        <code className="text-sm" style={{ color: 'var(--pn-text)' }}>
          https://api.quantish.live
        </code>
        <p className="text-sm mt-2" style={{ color: 'var(--pn-text-secondary)' }}>
          All API endpoints are prefixed with <code className="text-xs bg-zinc-800 px-1 py-0.5 rounded">/v1</code>
        </p>
      </section>
    </div>
  );
}
