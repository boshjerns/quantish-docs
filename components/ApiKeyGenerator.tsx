'use client';

import { useState } from 'react';
import { Key, Copy, Check, Loader2, AlertCircle, ChevronDown } from 'lucide-react';

type ServerType = 'discovery' | 'polymarket' | 'kalshi';

interface ApiKeyResult {
  apiKey: string;
  apiSecret?: string;
  cursorConfig: string;
}

const SERVER_INFO: Record<ServerType, {
  name: string;
  description: string;
  endpoint: string;
  requiresAccessCode: boolean;
  accessCodeFormat?: string;
}> = {
  discovery: {
    name: 'Discovery',
    description: 'Search markets across Polymarket & Kalshi',
    endpoint: 'https://quantish.live',
    requiresAccessCode: false,
  },
  polymarket: {
    name: 'Polymarket',
    description: 'Trade on Polymarket prediction markets',
    endpoint: 'https://quantish-sdk-production.up.railway.app',
    requiresAccessCode: true,
    accessCodeFormat: 'QNT-XXXX-XXXX-XXXX',
  },
  kalshi: {
    name: 'Kalshi',
    description: 'Trade on Kalshi prediction markets (Solana)',
    endpoint: 'https://kalshi-mcp-server-production.up.railway.app',
    requiresAccessCode: true,
    accessCodeFormat: 'KALSHI-XXXX-XXXX-XXXX',
  },
};

export default function ApiKeyGenerator() {
  const [selectedServer, setSelectedServer] = useState<ServerType>('discovery');
  const [email, setEmail] = useState('');
  const [keyName, setKeyName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiKeyResult | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const serverInfo = SERVER_INFO[selectedServer];

  const generateKey = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      if (selectedServer === 'discovery') {
        // Discovery uses the admin API route (server-side proxy)
        const response = await fetch('/api/generate-discovery-key', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name: keyName }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate key');
        }

        setResult({
          apiKey: data.key,
          cursorConfig: JSON.stringify({
            mcpServers: {
              quantish_discovery: {
                url: 'https://quantish.live/mcp',
                headers: {
                  'X-API-Key': data.key,
                },
              },
            },
          }, null, 2),
        });
      } else {
        // Polymarket and Kalshi use MCP tools directly
        const toolName = selectedServer === 'kalshi' ? 'kalshi_request_api_key' : 'request_api_key';
        
        const response = await fetch(`${serverInfo.endpoint}/mcp`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'tools/call',
            params: {
              name: toolName,
              arguments: {
                accessCode,
                externalId: email,
                keyName: keyName || 'Docs Generated Key',
              },
            },
          }),
        });

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message || 'Failed to generate key');
        }

        const content = JSON.parse(data.result?.content?.[0]?.text || '{}');
        
        if (content.error) {
          throw new Error(content.error);
        }

        const mcpName = selectedServer === 'kalshi' ? 'quantish_kalshi' : 'quantish';
        
        setResult({
          apiKey: content.apiKey,
          apiSecret: content.apiSecret,
          cursorConfig: JSON.stringify({
            mcpServers: {
              [mcpName]: {
                url: `${serverInfo.endpoint}/mcp`,
                headers: {
                  'x-api-key': content.apiKey,
                },
              },
            },
          }, null, 2),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-quantish-blue rounded-lg flex items-center justify-center">
          <Key className="text-white" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Generate API Key</h2>
          <p className="text-sm text-gray-500">Get instant access to Quantish MCP servers</p>
        </div>
      </div>

      {/* Server Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Server
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(SERVER_INFO) as ServerType[]).map((server) => (
            <button
              key={server}
              onClick={() => {
                setSelectedServer(server);
                setResult(null);
                setError(null);
              }}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                selectedServer === server
                  ? 'border-quantish-blue bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{SERVER_INFO[server].name}</div>
              <div className="text-xs text-gray-500 mt-1">
                {SERVER_INFO[server].description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email / User ID
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-quantish-blue focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Key Name (optional)
          </label>
          <input
            type="text"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            placeholder="My API Key"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-quantish-blue focus:border-transparent"
          />
        </div>

        {serverInfo.requiresAccessCode && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Access Code
            </label>
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder={serverInfo.accessCodeFormat}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-quantish-blue focus:border-transparent font-mono"
            />
            <p className="text-xs text-gray-500 mt-1">
              Contact Quantish to get an access code for {serverInfo.name}
            </p>
          </div>
        )}

        <button
          onClick={generateKey}
          disabled={isLoading || !email || (serverInfo.requiresAccessCode && !accessCode)}
          className="w-full pill-btn pill-btn-blue py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Key size={18} />
              Generate API Key
            </>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <div className="font-medium text-red-800">Error</div>
            <div className="text-sm text-red-600">{error}</div>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800 font-medium mb-2">
              <Check size={18} />
              API Key Generated Successfully!
            </div>
            <p className="text-sm text-green-700">
              Save this key securely - it cannot be retrieved again.
            </p>
          </div>

          {/* API Key */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">API Key</span>
              <button
                onClick={() => copyToClipboard(result.apiKey, 'apiKey')}
                className="text-sm text-quantish-blue hover:underline flex items-center gap-1"
              >
                {copied === 'apiKey' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'apiKey' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <code className="block p-3 bg-white border border-gray-200 rounded font-mono text-sm break-all">
              {result.apiKey}
            </code>
          </div>

          {/* API Secret (if available) */}
          {result.apiSecret && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">API Secret (for HMAC signing)</span>
                <button
                  onClick={() => copyToClipboard(result.apiSecret!, 'apiSecret')}
                  className="text-sm text-quantish-blue hover:underline flex items-center gap-1"
                >
                  {copied === 'apiSecret' ? <Check size={14} /> : <Copy size={14} />}
                  {copied === 'apiSecret' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="block p-3 bg-white border border-gray-200 rounded font-mono text-sm break-all">
                {result.apiSecret}
              </code>
            </div>
          )}

          {/* Cursor Config */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Cursor MCP Config</span>
              <button
                onClick={() => copyToClipboard(result.cursorConfig, 'config')}
                className="text-sm text-quantish-blue hover:underline flex items-center gap-1"
              >
                {copied === 'config' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'config' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-3 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-x-auto">
              {result.cursorConfig}
            </pre>
            <p className="text-xs text-gray-500 mt-2">
              Add this to <code className="bg-gray-200 px-1 rounded">~/.cursor/mcp.json</code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

