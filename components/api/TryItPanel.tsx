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

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <MethodBadge method={endpoint.method} />
        <code className="text-sm font-mono text-zinc-300">{endpoint.path}</code>
      </div>

      {/* API Key for auth-required endpoints */}
      {endpoint.requiresAuth && (
        <ApiKeyInput value={apiKey} onChange={setApiKey} />
      )}

      {/* Path Parameters */}
      {pathParams.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-zinc-300">Path Parameters</h4>
          {pathParams.map((p) => (
            <div key={p.name} className="flex items-center gap-2">
              <label className="text-sm text-zinc-400 w-32 shrink-0">
                {p.name}
                {p.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              <input
                type="text"
                value={params[p.name] || ''}
                onChange={(e) => handleParamChange(p.name, e.target.value)}
                placeholder={p.description}
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* Query Parameters */}
      {queryParams.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-zinc-300">Query Parameters</h4>
          {queryParams.map((p) => (
            <div key={p.name} className="flex items-center gap-2">
              <label className="text-sm text-zinc-400 w-32 shrink-0">
                {p.name}
                {p.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              <input
                type={p.type === 'number' ? 'number' : 'text'}
                value={params[p.name] || ''}
                onChange={(e) => handleParamChange(p.name, e.target.value)}
                placeholder={p.description}
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* Body Parameters */}
      {bodyParams.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-zinc-300">Request Body</h4>
          {bodyParams.map((p) => (
            <div key={p.name} className="flex items-center gap-2">
              <label className="text-sm text-zinc-400 w-32 shrink-0">
                {p.name}
                {p.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              <input
                type={p.type === 'number' ? 'number' : 'text'}
                value={params[p.name] || ''}
                onChange={(e) => handleParamChange(p.name, e.target.value)}
                placeholder={p.description}
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* Execute Button */}
      <button
        onClick={execute}
        disabled={loading || (endpoint.requiresAuth && !apiKey)}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded transition-colors"
      >
        {loading ? 'Executing...' : 'Execute'}
      </button>

      {/* Response */}
      <ResponseViewer response={response} error={error} loading={loading} />
    </div>
  );
}
