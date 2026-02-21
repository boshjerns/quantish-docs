'use client';

import { useState } from 'react';
import { ApiEndpoint } from '@/lib/api-endpoints';
import { MethodBadge } from './MethodBadge';
import { TryItPanel } from './TryItPanel';

interface EndpointCardProps {
  endpoint: ApiEndpoint;
  defaultExpanded?: boolean;
}

export function EndpointCard({ endpoint, defaultExpanded = false }: EndpointCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-4 py-3 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors text-left"
      >
        <MethodBadge method={endpoint.method} />
        <code className="text-sm font-mono text-zinc-300 flex-1">{endpoint.path}</code>
        <span className="text-sm text-zinc-400">{endpoint.name}</span>
        <svg
          className={`w-4 h-4 text-zinc-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-zinc-800 p-4 space-y-4">
          <p className="text-sm text-zinc-400">{endpoint.description}</p>
          <TryItPanel endpoint={endpoint} />
        </div>
      )}
    </div>
  );
}
