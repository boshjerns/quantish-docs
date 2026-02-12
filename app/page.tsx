'use client';

import { useState } from 'react';
import Link from 'next/link';

const MCP_SERVERS = {
  discovery: {
    name: 'Discovery',
    description: 'Search & discover markets across all platforms',
    url: 'https://quantish.live/mcp',
    badge: 'Free',
    badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  },
  polymarket: {
    name: 'Polymarket',
    description: 'Trade on the world\'s largest prediction market',
    url: 'https://quantish-sdk-production.up.railway.app/mcp',
    badge: 'Free',
    badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  },
  kalshi: {
    name: 'Kalshi',
    description: 'CFTC-regulated prediction markets on Solana',
    url: 'https://kalshi-mcp-production-7c2c.up.railway.app/mcp',
    badge: 'Free',
    badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  },
};

interface ServerKey {
  apiKey: string;
  apiSecret?: string;
  address?: string;
}

export default function Home() {
  const [externalId, setExternalId] = useState('');
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [keys, setKeys] = useState<Record<string, ServerKey>>({});
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfig, setShowConfig] = useState<'cursor' | 'claude' | null>(null);

  const copyToClipboard = async (text: string, itemId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedItem(itemId);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const generateDiscoveryKey = async () => {
    setIsLoading(prev => ({ ...prev, discovery: true }));
    setErrors(prev => ({ ...prev, discovery: '' }));
    try {
      const response = await fetch('/api/generate-discovery-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: externalId.trim() })
      });
      const data = await response.json();
      if (data.success && data.key) {
        setKeys(prev => ({ ...prev, discovery: { apiKey: data.key } }));
      } else {
        setErrors(prev => ({ ...prev, discovery: data.error || 'Failed to generate key' }));
      }
    } catch {
      setErrors(prev => ({ ...prev, discovery: 'Network error. Try again.' }));
    } finally {
      setIsLoading(prev => ({ ...prev, discovery: false }));
    }
  };

  const generatePolymarketKey = async () => {
    setIsLoading(prev => ({ ...prev, polymarket: true }));
    setErrors(prev => ({ ...prev, polymarket: '' }));
    try {
      const response = await fetch(MCP_SERVERS.polymarket.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', id: 1,
          method: 'tools/call',
          params: { name: 'request_api_key', arguments: { externalId: externalId.trim() } }
        })
      });
      const data = await response.json();
      const result = data.result?.content?.[0]?.text ? JSON.parse(data.result.content[0].text) : null;
      if (result?.apiKey) {
        setKeys(prev => ({ ...prev, polymarket: { apiKey: result.apiKey, apiSecret: result.apiSecret, address: result.eoaAddress } }));
      } else {
        setErrors(prev => ({ ...prev, polymarket: result?.error || 'Failed to generate key' }));
      }
    } catch {
      setErrors(prev => ({ ...prev, polymarket: 'Network error. Try again.' }));
    } finally {
      setIsLoading(prev => ({ ...prev, polymarket: false }));
    }
  };

  const generateKalshiKey = async () => {
    setIsLoading(prev => ({ ...prev, kalshi: true }));
    setErrors(prev => ({ ...prev, kalshi: '' }));
    try {
      const response = await fetch(MCP_SERVERS.kalshi.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', id: 1,
          method: 'tools/call',
          params: { name: 'kalshi_signup', arguments: { externalId: externalId.trim() } }
        })
      });
      const data = await response.json();
      const result = data.result?.content?.[0]?.text ? JSON.parse(data.result.content[0].text) : null;
      if (result?.apiKey) {
        setKeys(prev => ({ ...prev, kalshi: { apiKey: result.apiKey, address: result.publicKey } }));
      } else {
        setErrors(prev => ({ ...prev, kalshi: result?.error || 'Failed to generate key' }));
      }
    } catch {
      setErrors(prev => ({ ...prev, kalshi: 'Network error. Try again.' }));
    } finally {
      setIsLoading(prev => ({ ...prev, kalshi: false }));
    }
  };

  const generateAllKeys = async () => {
    if (!externalId.trim()) return;
    await Promise.all([generateDiscoveryKey(), generatePolymarketKey(), generateKalshiKey()]);
  };

  const hasAnyKey = Object.keys(keys).length > 0;

  const getCursorConfig = () => {
    const config: Record<string, any> = {};
    if (keys.discovery) {
      config['quantish-discovery'] = { url: MCP_SERVERS.discovery.url, headers: { 'x-api-key': keys.discovery.apiKey } };
    }
    if (keys.polymarket) {
      config['quantish-polymarket'] = { url: MCP_SERVERS.polymarket.url, headers: { 'x-api-key': keys.polymarket.apiKey } };
    }
    if (keys.kalshi) {
      config['quantish-kalshi'] = { url: MCP_SERVERS.kalshi.url, headers: { 'x-api-key': keys.kalshi.apiKey } };
    }
    return JSON.stringify({ mcpServers: config }, null, 2);
  };

  const getClaudeConfig = () => {
    const config: Record<string, any> = {};
    if (keys.discovery) {
      config['quantish-discovery'] = { command: 'npx', args: ['-y', 'mcp-remote', MCP_SERVERS.discovery.url], env: { MCP_API_KEY: keys.discovery.apiKey } };
    }
    if (keys.polymarket) {
      config['quantish-polymarket'] = { command: 'npx', args: ['-y', 'mcp-remote', MCP_SERVERS.polymarket.url], env: { MCP_API_KEY: keys.polymarket.apiKey } };
    }
    if (keys.kalshi) {
      config['quantish-kalshi'] = { command: 'npx', args: ['-y', 'mcp-remote', MCP_SERVERS.kalshi.url], env: { MCP_API_KEY: keys.kalshi.apiKey } };
    }
    return JSON.stringify({ mcpServers: config }, null, 2);
  };

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Get your API keys
        </h1>
        <p className="text-base text-[hsl(var(--muted-foreground))] max-w-lg mx-auto">
          Connect to Quantish MCP servers and trade prediction markets with AI. Set up in 2 minutes.
        </p>
      </div>

      {/* Email Input */}
      <div className="max-w-xl mx-auto mb-8">
        <label className="block text-sm font-medium mb-2">Your email or unique ID</label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="you@example.com"
            value={externalId}
            onChange={(e) => setExternalId(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent"
          />
          <button
            onClick={generateAllKeys}
            disabled={!externalId.trim() || Object.values(isLoading).some(v => v)}
            className="px-5 py-2.5 bg-[hsl(var(--primary))] text-white rounded-lg text-sm font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {Object.values(isLoading).some(v => v) ? 'Generating...' : 'Get All Keys'}
          </button>
        </div>
      </div>

      {/* Server Cards */}
      <div className="max-w-xl mx-auto space-y-3 mb-10">
        {Object.entries(MCP_SERVERS).map(([id, server]) => {
          const key = keys[id];
          const error = errors[id];
          const loading = isLoading[id];

          return (
            <div key={id} className={`card ${key ? 'border-green-300 dark:border-green-700' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{server.name}</h3>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${server.badgeColor}`}>
                      {server.badge}
                    </span>
                  </div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{server.description}</p>
                </div>
                {key ? (
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium shrink-0 mt-0.5">
                    &#10003; Ready
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      if (!externalId.trim()) return;
                      if (id === 'discovery') generateDiscoveryKey();
                      else if (id === 'polymarket') generatePolymarketKey();
                      else generateKalshiKey();
                    }}
                    disabled={loading || !externalId.trim()}
                    className="px-3 py-1.5 text-sm font-medium border border-[hsl(var(--border))] rounded-lg hover:bg-[hsl(var(--muted))] disabled:opacity-50 transition-colors shrink-0"
                  >
                    {loading ? '...' : 'Get Key'}
                  </button>
                )}
              </div>

              {/* Show key */}
              {key && (
                <div className="mt-3 p-3 bg-[hsl(var(--muted))] rounded-lg">
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-xs font-mono truncate text-green-700 dark:text-green-400">
                      {key.apiKey}
                    </code>
                    <button
                      onClick={() => copyToClipboard(key.apiKey, `key-${id}`)}
                      className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] shrink-0"
                    >
                      {copiedItem === `key-${id}` ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  {key.address && (
                    <div className="mt-1.5 text-xs text-[hsl(var(--muted-foreground))] truncate">
                      Wallet: {key.address}
                    </div>
                  )}
                </div>
              )}

              {/* Show error */}
              {error && (
                <div className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Config Output */}
      {hasAnyKey && (
        <div className="max-w-xl mx-auto mb-10">
          <h2 className="text-lg font-bold mb-4">Connect to your IDE</h2>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowConfig(showConfig === 'cursor' ? null : 'cursor')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                showConfig === 'cursor'
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]'
              }`}
            >
              Cursor / Windsurf
            </button>
            <button
              onClick={() => setShowConfig(showConfig === 'claude' ? null : 'claude')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                showConfig === 'claude'
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]'
              }`}
            >
              Claude Desktop
            </button>
          </div>

          {showConfig && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">
                  {showConfig === 'cursor' ? '~/.cursor/mcp.json' : '~/Library/Application Support/Claude/claude_desktop_config.json'}
                </span>
                <button
                  onClick={() => copyToClipboard(showConfig === 'cursor' ? getCursorConfig() : getClaudeConfig(), 'config')}
                  className="text-xs font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                >
                  {copiedItem === 'config' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 bg-zinc-900 text-green-400 rounded-lg text-xs font-mono overflow-x-auto">
                {showConfig === 'cursor' ? getCursorConfig() : getClaudeConfig()}
              </pre>
              {showConfig === 'claude' && (
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
                  Requires <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded">npx</code> (Node.js) installed. Paste into config file and restart Claude Desktop.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Agent docs link */}
      <div className="max-w-xl mx-auto text-center">
        <div className="card bg-[hsl(var(--muted))]">
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
            Building an AI agent? See the full platform reference.
          </p>
          <Link href="/agent" className="text-sm font-semibold text-[hsl(var(--primary))] hover:underline">
            Agent Documentation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
