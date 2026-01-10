'use client';

import { useState } from 'react';
import { Key, Copy, Check, Loader2, AlertCircle } from 'lucide-react';

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
    endpoint: 'https://kalshi-mcp-production-7c2c.up.railway.app',
    requiresAccessCode: false,
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
        const toolName = selectedServer === 'kalshi' ? 'kalshi_signup' : 'request_api_key';

        // Build arguments based on server type
        const args = selectedServer === 'kalshi'
          ? { externalId: email, keyName: keyName || 'Docs Generated Key' }
          : { accessCode, externalId: email, keyName: keyName || 'Docs Generated Key' };

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
              arguments: args,
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
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[hsl(var(--primary))] flex items-center justify-center border-2 border-[hsl(var(--border))]">
          <Key className="text-[hsl(var(--primary-foreground))]" size={24} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight">Generate API Key</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Get instant access to Quantish MCP servers</p>
        </div>
      </div>

      {/* Server Selection */}
      <div className="mb-8">
        <label className="block text-xs font-bold uppercase tracking-wider mb-3 text-[hsl(var(--muted-foreground))]">
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
              className={`p-4 border-2 text-left transition-all ${
                selectedServer === server
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))] brutalist-shadow'
                  : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]'
              }`}
            >
              <div className="font-bold text-sm uppercase">{SERVER_INFO[server].name}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                {SERVER_INFO[server].description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[hsl(var(--muted-foreground))]">
            Email / User ID
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[hsl(var(--muted-foreground))]">
            Key Name (optional)
          </label>
          <input
            type="text"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            placeholder="My API Key"
            className="w-full"
          />
        </div>

        {serverInfo.requiresAccessCode && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[hsl(var(--muted-foreground))]">
              Access Code
            </label>
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder={serverInfo.accessCodeFormat}
              className="w-full font-mono"
            />
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
              Contact Quantish to get an access code for {serverInfo.name}
            </p>
          </div>
        )}

        <button
          onClick={generateKey}
          disabled={isLoading || !email || (serverInfo.requiresAccessCode && !accessCode)}
          className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" strokeWidth={2.5} />
              GENERATING...
            </>
          ) : (
            <>
              <Key size={18} strokeWidth={2.5} />
              GENERATE API KEY
            </>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-8 p-4 border-2 border-red-600 bg-red-50 dark:bg-red-950 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={2.5} />
          <div>
            <div className="font-bold text-red-800 dark:text-red-200 uppercase text-sm">Error</div>
            <div className="text-sm text-red-700 dark:text-red-300">{error}</div>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-8 space-y-6">
          <div className="p-4 border-2 border-green-600 bg-green-50 dark:bg-green-950">
            <div className="flex items-center gap-2 text-green-800 dark:text-green-200 font-bold mb-2 uppercase text-sm">
              <Check size={18} strokeWidth={2.5} />
              API Key Generated Successfully!
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Save this key securely - it cannot be retrieved again.
            </p>
          </div>

          {/* API Key */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">API Key</span>
              <button
                onClick={() => copyToClipboard(result.apiKey, 'apiKey')}
                className="text-xs font-bold uppercase tracking-wider hover:text-[hsl(var(--primary))] dark:hover:text-[hsl(var(--accent))] flex items-center gap-1"
              >
                {copied === 'apiKey' ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} strokeWidth={2.5} />}
                {copied === 'apiKey' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <code className="block p-4 bg-[hsl(var(--muted))] border-2 border-[hsl(var(--border))] font-mono text-sm break-all">
              {result.apiKey}
            </code>
          </div>

          {/* API Secret (if available) */}
          {result.apiSecret && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">API Secret (HMAC)</span>
                <button
                  onClick={() => copyToClipboard(result.apiSecret!, 'apiSecret')}
                  className="text-xs font-bold uppercase tracking-wider hover:text-[hsl(var(--primary))] dark:hover:text-[hsl(var(--accent))] flex items-center gap-1"
                >
                  {copied === 'apiSecret' ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} strokeWidth={2.5} />}
                  {copied === 'apiSecret' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="block p-4 bg-[hsl(var(--muted))] border-2 border-[hsl(var(--border))] font-mono text-sm break-all">
                {result.apiSecret}
              </code>
            </div>
          )}

          {/* Cursor Config */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Cursor MCP Config</span>
              <button
                onClick={() => copyToClipboard(result.cursorConfig, 'config')}
                className="text-xs font-bold uppercase tracking-wider hover:text-[hsl(var(--primary))] dark:hover:text-[hsl(var(--accent))] flex items-center gap-1"
              >
                {copied === 'config' ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} strokeWidth={2.5} />}
                {copied === 'config' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 bg-[hsl(0_0%_5%)] text-gray-100 font-mono text-sm overflow-x-auto border-2 border-[hsl(var(--border))] brutalist-shadow">
              {result.cursorConfig}
            </pre>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
              Add to <code className="bg-[hsl(var(--muted))] px-1 border border-[hsl(var(--border))]">~/.cursor/mcp.json</code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
