'use client';

import { useState } from 'react';
import Link from 'next/link';

const MCP_SERVERS = {
  discovery: {
    name: 'DISCOVERY',
    description: 'Search & discover markets across all platforms',
    url: 'https://quantish.live/mcp',
    tag: 'read-only',
  },
  polymarket: {
    name: 'POLYMARKET',
    description: 'Trade on the world\'s largest prediction market',
    url: 'https://quantish-sdk-production.up.railway.app/mcp',
    tag: 'polygon',
  },
  kalshi: {
    name: 'KALSHI',
    description: 'CFTC-regulated prediction markets on Solana',
    url: 'https://kalshi-mcp-production-7c2c.up.railway.app/mcp',
    tag: 'solana',
  },
  limitless: {
    name: 'LIMITLESS',
    description: 'Trade prediction markets on Base chain',
    url: 'https://limitless-mcp-server-production.up.railway.app/mcp',
    tag: 'base',
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

  const generateLimitlessKey = async () => {
    setIsLoading(prev => ({ ...prev, limitless: true }));
    setErrors(prev => ({ ...prev, limitless: '' }));
    try {
      const response = await fetch(MCP_SERVERS.limitless.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', id: 1,
          method: 'tools/call',
          params: { name: 'limitless_signup', arguments: { externalId: externalId.trim() } }
        })
      });
      const data = await response.json();
      const result = data.result?.content?.[0]?.text ? JSON.parse(data.result.content[0].text) : null;
      if (result?.apiKey) {
        setKeys(prev => ({ ...prev, limitless: { apiKey: result.apiKey, apiSecret: result.apiSecret, address: result.walletAddress } }));
      } else {
        setErrors(prev => ({ ...prev, limitless: result?.error || 'Failed to generate key' }));
      }
    } catch {
      setErrors(prev => ({ ...prev, limitless: 'Network error. Try again.' }));
    } finally {
      setIsLoading(prev => ({ ...prev, limitless: false }));
    }
  };

  const generateAllKeys = async () => {
    if (!externalId.trim()) return;
    await Promise.all([generateDiscoveryKey(), generatePolymarketKey(), generateKalshiKey(), generateLimitlessKey()]);
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
    if (keys.limitless) {
      config['quantish-limitless'] = { url: MCP_SERVERS.limitless.url, headers: { 'x-api-key': keys.limitless.apiKey } };
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
    if (keys.limitless) {
      config['quantish-limitless'] = { command: 'npx', args: ['-y', 'mcp-remote', MCP_SERVERS.limitless.url], env: { MCP_API_KEY: keys.limitless.apiKey } };
    }
    return JSON.stringify({ mcpServers: config }, null, 2);
  };

  const keyGenFn: Record<string, () => Promise<void>> = {
    discovery: generateDiscoveryKey,
    polymarket: generatePolymarketKey,
    kalshi: generateKalshiKey,
    limitless: generateLimitlessKey,
  };

  return (
    <div>
      {/* Hero */}
      <div className="mb-10">
        <div className="text-xs mb-4" style={{ color: 'var(--fg-dim)' }}>
          {'>'} system.init() :: api_key_generator v2.0
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Get your API keys
        </h1>
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
          Connect to Quantish MCP servers. Trade prediction markets with AI.
          <br />
          <span style={{ color: 'var(--fg-dim)' }}>Setup time: ~2 minutes</span>
        </p>
      </div>

      {/* Email Input */}
      <div className="max-w-2xl mb-8">
        <label className="block text-xs mb-2" style={{ color: 'var(--fg-muted)' }}>
          $ enter_id <span style={{ color: 'var(--fg-dim)' }}>// email or unique identifier</span>
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="you@example.com"
            value={externalId}
            onChange={(e) => setExternalId(e.target.value)}
            className="flex-1 input-dark"
          />
          <button
            onClick={generateAllKeys}
            disabled={!externalId.trim() || Object.values(isLoading).some(v => v)}
            className="btn-primary whitespace-nowrap"
          >
            {Object.values(isLoading).some(v => v) ? '[ ... ]' : '[ GET ALL KEYS ]'}
          </button>
        </div>
      </div>

      {/* Server Cards */}
      <div className="max-w-2xl space-y-3 mb-10">
        {Object.entries(MCP_SERVERS).map(([id, server]) => {
          const key = keys[id];
          const error = errors[id];
          const loading = isLoading[id];

          return (
            <div
              key={id}
              className="card"
              style={key ? { borderColor: 'var(--green-dim)' } : undefined}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm" style={{ color: key ? 'var(--green)' : 'var(--fg)' }}>
                      {server.name}
                    </h3>
                    <span className="tag tag-free">free</span>
                    <span className="tag tag-cyan">{server.tag}</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>{server.description}</p>
                </div>
                {key ? (
                  <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: 'var(--green)' }}>
                    [READY]
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      if (!externalId.trim()) return;
                      keyGenFn[id]?.();
                    }}
                    disabled={loading || !externalId.trim()}
                    className="btn-ghost shrink-0"
                  >
                    {loading ? '[...]' : '[GET KEY]'}
                  </button>
                )}
              </div>

              {/* Show key */}
              {key && (
                <div className="mt-3 p-3" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-xs truncate" style={{ color: 'var(--green)' }}>
                      {key.apiKey}
                    </code>
                    <button
                      onClick={() => copyToClipboard(key.apiKey, `key-${id}`)}
                      className="text-xs shrink-0 transition-colors"
                      style={{ color: copiedItem === `key-${id}` ? 'var(--green)' : 'var(--fg-dim)' }}
                    >
                      {copiedItem === `key-${id}` ? '[COPIED]' : '[COPY]'}
                    </button>
                  </div>
                  {key.address && (
                    <div className="mt-1.5 text-xs truncate" style={{ color: 'var(--fg-dim)' }}>
                      wallet: {key.address}
                    </div>
                  )}
                </div>
              )}

              {/* Show error */}
              {error && (
                <div className="mt-3 text-xs" style={{ color: 'var(--red)' }}>
                  ERROR: {error}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Config Output */}
      {hasAnyKey && (
        <div className="max-w-2xl mb-10">
          <h2 className="text-sm font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Connect to your IDE
          </h2>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowConfig(showConfig === 'cursor' ? null : 'cursor')}
              className={showConfig === 'cursor' ? 'btn-primary' : 'btn-ghost'}
            >
              CURSOR / WINDSURF
            </button>
            <button
              onClick={() => setShowConfig(showConfig === 'claude' ? null : 'claude')}
              className={showConfig === 'claude' ? 'btn-primary' : 'btn-ghost'}
            >
              CLAUDE DESKTOP
            </button>
          </div>

          {showConfig && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: 'var(--fg-dim)' }}>
                  {showConfig === 'cursor' ? '~/.cursor/mcp.json' : '~/Library/Application Support/Claude/claude_desktop_config.json'}
                </span>
                <button
                  onClick={() => copyToClipboard(showConfig === 'cursor' ? getCursorConfig() : getClaudeConfig(), 'config')}
                  className="text-xs transition-colors"
                  style={{ color: copiedItem === 'config' ? 'var(--green)' : 'var(--fg-dim)' }}
                >
                  {copiedItem === 'config' ? '[COPIED]' : '[COPY]'}
                </button>
              </div>
              <pre className="code-block">
                {showConfig === 'cursor' ? getCursorConfig() : getClaudeConfig()}
              </pre>
              {showConfig === 'claude' && (
                <p className="text-xs mt-2" style={{ color: 'var(--fg-dim)' }}>
                  Requires <code style={{ color: 'var(--fg-muted)' }}>npx</code> (Node.js). Paste into config and restart Claude Desktop.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Agent docs link */}
      <div className="max-w-2xl">
        <div className="card" style={{ borderColor: 'var(--border-bright)' }}>
          <p className="text-xs mb-2" style={{ color: 'var(--fg-muted)' }}>
            Building an AI agent? See the full platform reference.
          </p>
          <Link href="/agent" className="text-xs font-bold" style={{ color: 'var(--cyan)' }}>
            {'>'} agent_documentation --full &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
