'use client';

import { useState } from 'react';
import { ApiEndpoint } from '@/lib/api-endpoints';
import { ApiKeyInput } from './ApiKeyInput';
import { ResponseViewer } from './ResponseViewer';
import { MethodBadge } from './MethodBadge';

interface TryItPanelProps {
  endpoint: ApiEndpoint;
}

export function TryItPanel({ endpoint }: TryItPanelProps) {
  const [apiKey, setApiKey] = useState('');
  const [params, setParams] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleParamChange = (name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const buildUrl = () => {
    let url = endpoint.path;
    // Replace path params
    endpoint.params?.forEach((p) => {
      if (p.location === 'path' && params[p.name]) {
        url = url.replace(`:${p.name}`, params[p.name]);
      }
    });
    // Add query params
    const queryParams = endpoint.params?.filter((p) => p.location === 'query' && params[p.name]) || [];
    if (queryParams.length > 0) {
      const searchParams = new URLSearchParams();
      queryParams.forEach((p) => {
        searchParams.set(p.name, params[p.name]);
      });
      url += `?${searchParams.toString()}`;
    }
    return url;
  };

  const execute = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: endpoint.method,
          path: buildUrl(),
          apiKey: endpoint.requiresAuth ? apiKey : undefined,
          body: endpoint.method === 'POST' || endpoint.method === 'PUT'
            ? Object.fromEntries(
                endpoint.params?.filter((p) => p.location === 'body').map((p) => [p.name, params[p.name]]) || []
              )
            : undefined,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        try {
          const json = JSON.parse(text);
          setError(json.error?.message || text);
        } catch {
          setError(text);
        }
      } else {
        setResponse(text);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const pathParams = endpoint.params?.filter((p) => p.location === 'path') || [];
  const queryParams = endpoint.params?.filter((p) => p.location === 'query') || [];
  const bodyParams = endpoint.params?.filter((p) => p.location === 'body') || [];

  const inputStyle = {
    background: 'var(--pn-surface)',
    border: '1px solid var(--pn-border)',
    color: 'var(--pn-text)',
  };

  return (
    <div
      className="rounded-lg p-4 space-y-4"
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid var(--pn-border)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <MethodBadge method={endpoint.method} />
        <code className="text-sm font-mono" style={{ color: 'var(--pn-text-secondary)' }}>
          {endpoint.path}
        </code>
      </div>

      {/* API Key for auth-required endpoints */}
      {endpoint.requiresAuth && (
        <ApiKeyInput value={apiKey} onChange={setApiKey} />
      )}

      {/* Path Parameters */}
      {pathParams.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium" style={{ color: 'var(--pn-text)' }}>Path Parameters</h4>
          {pathParams.map((p) => (
            <div key={p.name} className="flex items-center gap-2">
              <label className="text-sm w-32 shrink-0" style={{ color: 'var(--pn-text-muted)' }}>
                {p.name}
                {p.required && <span style={{ color: 'var(--pn-error)' }}> *</span>}
              </label>
              <input
                type="text"
                value={params[p.name] || ''}
                onChange={(e) => handleParamChange(p.name, e.target.value)}
                placeholder={p.description}
                className="flex-1 rounded px-3 py-1.5 text-sm placeholder:opacity-50 focus:outline-none"
                style={{
                  ...inputStyle,
                  borderColor: 'var(--pn-accent)',
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Query Parameters */}
      {queryParams.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium" style={{ color: 'var(--pn-text)' }}>Query Parameters</h4>
          {queryParams.map((p) => (
            <div key={p.name} className="flex items-center gap-2">
              <label className="text-sm w-32 shrink-0" style={{ color: 'var(--pn-text-muted)' }}>
                {p.name}
                {p.required && <span style={{ color: 'var(--pn-error)' }}> *</span>}
              </label>
              <input
                type={p.type === 'number' ? 'number' : 'text'}
                value={params[p.name] || ''}
                onChange={(e) => handleParamChange(p.name, e.target.value)}
                placeholder={p.description}
                className="flex-1 rounded px-3 py-1.5 text-sm placeholder:opacity-50 focus:outline-none"
                style={inputStyle}
              />
            </div>
          ))}
        </div>
      )}

      {/* Body Parameters */}
      {bodyParams.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium" style={{ color: 'var(--pn-text)' }}>Request Body</h4>
          {bodyParams.map((p) => (
            <div key={p.name} className="flex items-center gap-2">
              <label className="text-sm w-32 shrink-0" style={{ color: 'var(--pn-text-muted)' }}>
                {p.name}
                {p.required && <span style={{ color: 'var(--pn-error)' }}> *</span>}
              </label>
              <input
                type={p.type === 'number' ? 'number' : 'text'}
                value={params[p.name] || ''}
                onChange={(e) => handleParamChange(p.name, e.target.value)}
                placeholder={p.description}
                className="flex-1 rounded px-3 py-1.5 text-sm placeholder:opacity-50 focus:outline-none"
                style={inputStyle}
              />
            </div>
          ))}
        </div>
      )}

      {/* Execute Button */}
      <button
        onClick={execute}
        disabled={loading || (endpoint.requiresAuth && !apiKey)}
        className="w-full font-medium py-2 px-4 rounded transition-colors"
        style={{
          background: loading || (endpoint.requiresAuth && !apiKey)
            ? 'var(--pn-text-muted)'
            : 'var(--pn-accent)',
          color: 'white',
          opacity: loading || (endpoint.requiresAuth && !apiKey) ? 0.5 : 1,
          cursor: loading || (endpoint.requiresAuth && !apiKey) ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Executing...' : 'Execute'}
      </button>

      {/* Response */}
      <ResponseViewer response={response} error={error} loading={loading} />
    </div>
  );
}
