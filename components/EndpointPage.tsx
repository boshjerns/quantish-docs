'use client';

import Link from 'next/link';
import { EndpointEntry, ParamDef, platformInfo } from '@/lib/endpoint-registry';
import { MethodBadge } from './api/MethodBadge';
import { PlatformLogo } from './PlatformLogo';

function ParamsTable({ params }: { params: ParamDef[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--pn-border)' }}>
            <th className="text-left py-2 px-3 font-medium" style={{ color: 'var(--pn-text-muted)' }}>Parameter</th>
            <th className="text-left py-2 px-3 font-medium" style={{ color: 'var(--pn-text-muted)' }}>Type</th>
            <th className="text-left py-2 px-3 font-medium hidden sm:table-cell" style={{ color: 'var(--pn-text-muted)' }}>Required</th>
            <th className="text-left py-2 px-3 font-medium" style={{ color: 'var(--pn-text-muted)' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param, i) => (
            <tr key={param.name} style={{ borderBottom: i < params.length - 1 ? '1px solid var(--pn-border)' : undefined }}>
              <td className="py-2.5 px-3">
                <code className="text-sm font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--pn-elevated)', color: 'var(--pn-accent)' }}>
                  {param.name}
                </code>
              </td>
              <td className="py-2.5 px-3">
                <span className="text-xs font-mono" style={{ color: 'var(--pn-text-muted)' }}>{param.type}</span>
              </td>
              <td className="py-2.5 px-3 hidden sm:table-cell">
                {param.required ? (
                  <span className="text-xs font-medium px-1.5 py-0.5 rounded" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>required</span>
                ) : (
                  <span className="text-xs" style={{ color: 'var(--pn-text-muted)' }}>optional</span>
                )}
              </td>
              <td className="py-2.5 px-3">
                <span style={{ color: 'var(--pn-text-secondary)' }}>{param.description}</span>
                {param.defaultValue && (
                  <span className="ml-1 text-xs" style={{ color: 'var(--pn-text-muted)' }}>
                    Default: <code className="font-mono">{param.defaultValue}</code>
                  </span>
                )}
                {param.enumValues && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {param.enumValues.map(v => (
                      <code key={v} className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: 'var(--pn-elevated)', color: 'var(--pn-text-muted)' }}>
                        {v}
                      </code>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CurlExample({ endpoint }: { endpoint: EndpointEntry }) {
  if (endpoint.type !== 'rest') return null;

  let url = `https://quantish.live${endpoint.path}`;
  const queryParams = endpoint.params?.filter(p => p.location === 'query' && p.required);
  if (queryParams?.length) {
    const qs = queryParams.map(p => `${p.name}=<${p.name}>`).join('&');
    url += `?${qs}`;
  }

  const bodyParams = endpoint.params?.filter(p => p.location === 'body');
  const hasBody = bodyParams && bodyParams.length > 0;

  let curl = `curl -X ${endpoint.method} "${url}"`;
  if (endpoint.requiresAuth) {
    curl += ` \\\n  -H "x-api-key: YOUR_API_KEY"`;
  }
  if (hasBody) {
    curl += ` \\\n  -H "Content-Type: application/json"`;
    const body: Record<string, string> = {};
    bodyParams.forEach(p => { body[p.name] = `<${p.name}>`; });
    curl += ` \\\n  -d '${JSON.stringify(body, null, 2)}'`;
  }

  return (
    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--pn-border)' }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ background: 'var(--pn-elevated)', borderBottom: '1px solid var(--pn-border)' }}>
        <span className="text-xs font-medium" style={{ color: 'var(--pn-text-muted)' }}>cURL</span>
      </div>
      <pre className="p-4 text-sm overflow-x-auto" style={{ background: 'var(--pn-surface)', color: 'var(--pn-text-secondary)' }}>
        <code>{curl}</code>
      </pre>
    </div>
  );
}

interface EndpointPageViewProps {
  endpoint: EndpointEntry;
  prevEndpoint?: EndpointEntry;
  nextEndpoint?: EndpointEntry;
}

export function EndpointPageView({ endpoint, prevEndpoint, nextEndpoint }: EndpointPageViewProps) {
  const info = platformInfo[endpoint.platform];
  const hasPlatformLogo = ['polymarket', 'kalshi', 'limitless', 'discovery'].includes(endpoint.platform);

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm mb-6" style={{ color: 'var(--pn-text-muted)' }}>
        <Link href={`/${endpoint.section}`} className="hover:underline">
          {endpoint.section === 'api' ? 'API Reference' : 'MCP Servers'}
        </Link>
        <span>/</span>
        <Link href={`/${endpoint.section}/${endpoint.platform}`} className="hover:underline flex items-center gap-1.5">
          {hasPlatformLogo && <PlatformLogo platform={endpoint.platform as 'polymarket' | 'kalshi' | 'limitless' | 'discovery'} size="sm" />}
          {info?.name || endpoint.platform}
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--pn-text)' }}>{endpoint.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          {hasPlatformLogo && <PlatformLogo platform={endpoint.platform as 'polymarket' | 'kalshi' | 'limitless' | 'discovery'} size="lg" />}
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--pn-text)' }}>{endpoint.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              {endpoint.method && <MethodBadge method={endpoint.method} />}
              {endpoint.type === 'mcp' && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold border bg-purple-500/20 text-purple-400 border-purple-500/30">
                  MCP Tool
                </span>
              )}
              {endpoint.requiresAuth && (
                <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: 'rgba(96, 71, 255, 0.2)', color: '#6047FF' }}>
                  Auth Required
                </span>
              )}
              <span className="text-xs" style={{ color: 'var(--pn-text-muted)' }}>{endpoint.subcategory}</span>
            </div>
          </div>
        </div>
        <p className="text-base mt-3" style={{ color: 'var(--pn-text-secondary)' }}>
          {endpoint.description}
        </p>
      </div>

      {/* Endpoint / Tool bar */}
      <div className="rounded-lg mb-8 overflow-hidden" style={{ border: '1px solid var(--pn-border)' }}>
        <div className="px-4 py-3 flex items-center gap-3" style={{ background: 'var(--pn-elevated)' }}>
          {endpoint.type === 'rest' && endpoint.method && (
            <>
              <MethodBadge method={endpoint.method} />
              <code className="text-sm font-mono" style={{ color: 'var(--pn-text)' }}>{endpoint.path}</code>
            </>
          )}
          {endpoint.type === 'mcp' && (
            <>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold border bg-purple-500/20 text-purple-400 border-purple-500/30">
                tool
              </span>
              <code className="text-sm font-mono" style={{ color: 'var(--pn-text)' }}>{endpoint.toolName}</code>
            </>
          )}
        </div>
      </div>

      {/* Parameters */}
      {endpoint.params && endpoint.params.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>Parameters</h2>
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--pn-border)', background: 'var(--pn-surface)' }}>
            <ParamsTable params={endpoint.params} />
          </div>
        </div>
      )}

      {/* Code Example */}
      {endpoint.type === 'rest' && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>Example</h2>
          <CurlExample endpoint={endpoint} />
        </div>
      )}

      {/* MCP Usage */}
      {endpoint.type === 'mcp' && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>Usage</h2>
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--pn-border)' }}>
            <div className="flex items-center justify-between px-4 py-2" style={{ background: 'var(--pn-elevated)', borderBottom: '1px solid var(--pn-border)' }}>
              <span className="text-xs font-medium" style={{ color: 'var(--pn-text-muted)' }}>MCP Tool Call</span>
            </div>
            <pre className="p-4 text-sm overflow-x-auto" style={{ background: 'var(--pn-surface)', color: 'var(--pn-text-secondary)' }}>
              <code>{`// Use with any MCP-compatible client
const result = await client.callTool("${endpoint.toolName}", {
${(endpoint.params || []).filter(p => p.required).map(p => `  ${p.name}: "<${p.name}>"`).join(',\n')}
});`}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Prev/Next Navigation */}
      {(prevEndpoint || nextEndpoint) && (
        <div className="flex items-center justify-between pt-8 mt-8" style={{ borderTop: '1px solid var(--pn-border)' }}>
          {prevEndpoint ? (
            <Link
              href={`/${prevEndpoint.section}/${prevEndpoint.platform}/${prevEndpoint.slug}`}
              className="flex items-center gap-2 text-sm hover:underline"
              style={{ color: 'var(--pn-accent)' }}
            >
              <span>←</span>
              <span>{prevEndpoint.name}</span>
            </Link>
          ) : <div />}
          {nextEndpoint ? (
            <Link
              href={`/${nextEndpoint.section}/${nextEndpoint.platform}/${nextEndpoint.slug}`}
              className="flex items-center gap-2 text-sm hover:underline"
              style={{ color: 'var(--pn-accent)' }}
            >
              <span>{nextEndpoint.name}</span>
              <span>→</span>
            </Link>
          ) : <div />}
        </div>
      )}
    </div>
  );
}
