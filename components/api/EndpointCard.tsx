'use client';

import { useState } from 'react';
import { ApiEndpoint } from '@/lib/api-endpoints';
import { MethodBadge } from './MethodBadge';
import { TryItPanel } from './TryItPanel';
import { PlatformLogo, getPlatformFromCategory } from '@/components/PlatformLogo';

interface EndpointCardProps {
  endpoint: ApiEndpoint;
  defaultExpanded?: boolean;
}

export function EndpointCard({ endpoint, defaultExpanded = false }: EndpointCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const platform = getPlatformFromCategory(endpoint.category);

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: 'var(--pn-elevated)',
        border: '1px solid var(--pn-border)',
        boxShadow: expanded ? '0 4px 24px rgba(0, 0, 0, 0.3)' : 'var(--shadow)',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-4 py-3.5 transition-colors text-left hover:brightness-110"
        style={{ background: expanded ? 'var(--pn-surface)' : 'transparent' }}
      >
        <PlatformLogo platform={platform} size="sm" />
        <MethodBadge method={endpoint.method} />
        <code
          className="text-sm font-mono flex-1"
          style={{ color: 'var(--pn-text)' }}
        >
          {endpoint.path}
        </code>
        <span
          className="text-sm hidden sm:block"
          style={{ color: 'var(--pn-text-muted)' }}
        >
          {endpoint.name}
        </span>
        <svg
          className="w-4 h-4 transition-transform shrink-0"
          style={{
            color: 'var(--pn-text-muted)',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div
          className="border-t p-4 space-y-4"
          style={{ borderColor: 'var(--pn-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
            {endpoint.description}
          </p>
          <TryItPanel endpoint={endpoint} />
        </div>
      )}
    </div>
  );
}
