'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Key, Copy, Check, ChevronRight, Terminal, Zap, ExternalLink, Wallet } from 'lucide-react';

// MCP Server configurations
const MCP_SERVERS = {
  discovery: {
    name: 'Quantish Discovery',
    shortName: 'Discovery',
    description: 'Search & discover markets across all platforms',
    url: 'https://quantish.live/mcp',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-500',
  },
  polymarket: {
    name: 'Polymarket Trading',
    shortName: 'Polymarket',
    description: 'Trade on the world\'s largest prediction market',
    url: 'https://quantish-sdk-production.up.railway.app/mcp',
    icon: null,
    logo: '/polymarket-logo.svg',
    color: 'from-purple-500 to-pink-500',
  },
  kalshi: {
    name: 'Kalshi Trading',
    shortName: 'Kalshi',
    description: 'US-regulated prediction markets on Solana',
    url: 'https://kalshi-mcp-production-7c2c.up.railway.app/mcp',
    icon: null,
    logo: '/kalshi-logo.svg',
    color: 'from-green-500 to-emerald-500',
  },
};

// Real Cursor logo SVG
const CursorLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="black"/>
    <path d="M30 25L30 75L45 60L55 75L65 70L55 55L75 55L30 25Z" fill="white"/>
  </svg>
);

// Real Claude logo (Anthropic style)
const ClaudeLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#D97706"/>
    <circle cx="50" cy="45" r="20" fill="white"/>
    <rect x="35" y="60" width="30" height="8" rx="4" fill="white"/>
  </svg>
);

interface ServerKey {
  apiKey: string;
  address?: string;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<'cursor' | 'claude' | 'manual' | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [externalId, setExternalId] = useState('');

  // Keys for each server
  const [keys, setKeys] = useState<Record<string, ServerKey>>({});

  const copyToClipboard = async (text: string, itemId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedItem(itemId);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  // Generate Discovery key via admin API
  const generateDiscoveryKey = async () => {
    if (!externalId.trim()) {
      alert('Please enter your email or unique ID first');
      return;
    }
    setIsLoading(prev => ({ ...prev, discovery: true }));
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
        alert(data.error || 'Failed to generate Discovery key');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate key. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, discovery: false }));
    }
  };

  // Generate Polymarket key via MCP
  const generatePolymarketKey = async () => {
    if (!externalId.trim()) {
      alert('Please enter your email or unique ID first');
      return;
    }
    setIsLoading(prev => ({ ...prev, polymarket: true }));
    try {
      const response = await fetch(MCP_SERVERS.polymarket.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'tools/call',
          params: {
            name: 'request_api_key',
            arguments: { externalId: externalId.trim() }
          }
        })
      });
      const data = await response.json();
      if (data.result?.content?.[0]?.text) {
        const result = JSON.parse(data.result.content[0].text);
        setKeys(prev => ({ ...prev, polymarket: { apiKey: result.apiKey, address: result.eoaAddress } }));
      } else {
        alert('Failed to generate Polymarket key');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate key. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, polymarket: false }));
    }
  };

  // Generate Kalshi key via MCP
  const generateKalshiKey = async () => {
    if (!externalId.trim()) {
      alert('Please enter your email or unique ID first');
      return;
    }
    setIsLoading(prev => ({ ...prev, kalshi: true }));
    try {
      const response = await fetch(MCP_SERVERS.kalshi.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'tools/call',
          params: {
            name: 'kalshi_signup',
            arguments: { externalId: externalId.trim() }
          }
        })
      });
      const data = await response.json();
      if (data.result?.content?.[0]?.text) {
        const result = JSON.parse(data.result.content[0].text);
        setKeys(prev => ({ ...prev, kalshi: { apiKey: result.apiKey, address: result.publicKey } }));
      } else {
        alert('Failed to generate Kalshi key');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate key. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, kalshi: false }));
    }
  };

  // Generate all keys at once
  const generateAllKeys = async () => {
    if (!externalId.trim()) {
      alert('Please enter your email or unique ID');
      return;
    }
    await Promise.all([
      generateDiscoveryKey(),
      generatePolymarketKey(),
      generateKalshiKey(),
    ]);
    setCurrentStep(2);
  };

  // Generate Cursor deeplink for a server
  const getCursorDeeplink = (serverId: string) => {
    const server = MCP_SERVERS[serverId as keyof typeof MCP_SERVERS];
    const key = keys[serverId];
    if (!key) return null;

    const config = {
      url: server.url,
      headers: { 'x-api-key': key.apiKey }
    };
    const encodedConfig = btoa(JSON.stringify(config));
    return `cursor://anysphere.cursor-deeplink/mcp/install?name=quantish-${serverId}&config=${encodedConfig}`;
  };

  // Generate full config for all servers with keys
  const getFullConfig = () => {
    const config: Record<string, any> = {};
    Object.entries(keys).forEach(([serverId, key]) => {
      const server = MCP_SERVERS[serverId as keyof typeof MCP_SERVERS];
      config[`quantish-${serverId}`] = {
        url: server.url,
        headers: { 'x-api-key': key.apiKey }
      };
    });
    return JSON.stringify({ mcpServers: config }, null, 2);
  };

  // Generate Claude Desktop config
  const getClaudeConfig = () => {
    const config: Record<string, any> = {};
    Object.entries(keys).forEach(([serverId, key]) => {
      const server = MCP_SERVERS[serverId as keyof typeof MCP_SERVERS];
      config[`quantish-${serverId}`] = {
        command: 'npx',
        args: ['-y', 'mcp-remote', server.url],
        env: { MCP_API_KEY: key.apiKey }
      };
    });
    return JSON.stringify({ mcpServers: config }, null, 2);
  };

  const hasAllKeys = keys.discovery && keys.polymarket && keys.kalshi;
  const hasAnyKey = Object.keys(keys).length > 0;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Connect to <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">Quantish</span>
        </h1>
        <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
          Trade prediction markets with AI. Get set up in 2 minutes.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[
          { num: 1, label: 'Get Keys' },
          { num: 2, label: 'Choose Platform' },
          { num: 3, label: 'Connect' }
        ].map((step, i) => (
          <div key={step.num} className="flex items-center">
            <button
              onClick={() => step.num <= currentStep && setCurrentStep(step.num)}
              className={`flex flex-col items-center transition-all ${step.num <= currentStep ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-1
                transition-all duration-300
                ${currentStep >= step.num
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'
                }
                ${currentStep === step.num ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[hsl(var(--background))]' : ''}
              `}>
                {step.num}
              </div>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{step.label}</span>
            </button>
            {i < 2 && (
              <div className={`w-12 h-0.5 mx-2 mb-5 transition-colors duration-300 ${
                currentStep > step.num ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-[hsl(var(--border))]'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Get API Keys */}
      {currentStep === 1 && (
        <div className="glass-card mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Key size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Step 1: Get Your API Keys</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Connect to all three MCP servers</p>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Email or Unique ID</label>
            <input
              type="text"
              placeholder="your@email.com"
              value={externalId}
              onChange={(e) => setExternalId(e.target.value)}
              className="w-full px-4 py-3 bg-[hsl(var(--muted))] border border-[hsl(var(--border))] rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Server Cards */}
          <div className="grid gap-4 mb-6">
            {Object.entries(MCP_SERVERS).map(([id, server]) => (
              <div key={id} className={`p-4 rounded-xl border-2 transition-all ${
                keys[id] ? 'border-green-500 bg-green-500/5' : 'border-[hsl(var(--border))]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {server.logo ? (
                      <img src={server.logo} alt={server.name} className="w-10 h-10 object-contain dark:invert" />
                    ) : (
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${server.color} flex items-center justify-center text-xl`}>
                        {server.icon}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold">{server.name}</h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">{server.description}</p>
                    </div>
                  </div>
                  {keys[id] ? (
                    <div className="flex items-center gap-2">
                      <Check className="text-green-500" size={20} />
                      <span className="text-green-500 text-sm font-medium">Connected</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (id === 'discovery') generateDiscoveryKey();
                        else if (id === 'polymarket') generatePolymarketKey();
                        else if (id === 'kalshi') generateKalshiKey();
                      }}
                      disabled={isLoading[id] || !externalId.trim()}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium text-sm disabled:opacity-50 hover:opacity-90 transition-opacity"
                    >
                      {isLoading[id] ? 'Generating...' : 'Get Key'}
                    </button>
                  )}
                </div>
                {keys[id] && (
                  <div className="mt-3 p-3 bg-[hsl(var(--muted))] rounded-lg">
                    <div className="flex items-center justify-between">
                      <code className="text-xs font-mono text-green-600 dark:text-green-400 truncate max-w-[200px]">
                        {keys[id].apiKey}
                      </code>
                      <button
                        onClick={() => copyToClipboard(keys[id].apiKey, `key-${id}`)}
                        className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                      >
                        {copiedItem === `key-${id}` ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                    {keys[id].address && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                        <Wallet size={12} />
                        <span className="truncate">{keys[id].address}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Generate All / Continue Button */}
          <div className="flex gap-3">
            {!hasAllKeys ? (
              <button
                onClick={generateAllKeys}
                disabled={!externalId.trim() || Object.values(isLoading).some(v => v)}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold disabled:opacity-50 hover:opacity-90 transition-opacity"
              >
                {Object.values(isLoading).some(v => v) ? 'Generating Keys...' : 'Generate All Keys'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(2)}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Continue <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Choose Platform */}
      {currentStep === 2 && (
        <div className="glass-card mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Terminal size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Step 2: Choose Your Platform</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">How do you want to connect?</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Cursor Option */}
            <button
              onClick={() => { setSelectedPlatform('cursor'); setCurrentStep(3); }}
              className={`p-6 rounded-xl border-2 transition-all text-left hover:border-purple-500/50
                ${selectedPlatform === 'cursor' ? 'border-purple-500 bg-purple-500/10' : 'border-[hsl(var(--border))]'}`}
            >
              <CursorLogo className="w-14 h-14 mb-4 rounded-xl" />
              <h3 className="font-bold text-lg mb-1">Cursor IDE</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                One-click install with deeplinks
              </p>
            </button>

            {/* Claude Option */}
            <button
              onClick={() => { setSelectedPlatform('claude'); setCurrentStep(3); }}
              className={`p-6 rounded-xl border-2 transition-all text-left hover:border-purple-500/50
                ${selectedPlatform === 'claude' ? 'border-purple-500 bg-purple-500/10' : 'border-[hsl(var(--border))]'}`}
            >
              <ClaudeLogo className="w-14 h-14 mb-4 rounded-xl" />
              <h3 className="font-bold text-lg mb-1">Claude Desktop</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Add to config file
              </p>
            </button>

            {/* Manual Option */}
            <button
              onClick={() => { setSelectedPlatform('manual'); setCurrentStep(3); }}
              className={`p-6 rounded-xl border-2 transition-all text-left hover:border-purple-500/50
                ${selectedPlatform === 'manual' ? 'border-purple-500 bg-purple-500/10' : 'border-[hsl(var(--border))]'}`}
            >
              <div className="w-14 h-14 mb-4 rounded-xl bg-zinc-800 flex items-center justify-center">
                <Terminal className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-1">Manual Setup</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Copy config JSON
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Connect */}
      {currentStep === 3 && selectedPlatform && (
        <div className="glass-card mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Step 3: Connect to {selectedPlatform === 'cursor' ? 'Cursor' : selectedPlatform === 'claude' ? 'Claude' : 'Your App'}</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                {selectedPlatform === 'cursor' ? 'Click to add each server' : 'Copy the configuration below'}
              </p>
            </div>
          </div>

          {/* Cursor One-Click Install */}
          {selectedPlatform === 'cursor' && (
            <div className="space-y-4">
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                Click each button to add the MCP server to Cursor. You'll need Cursor 1.0+ installed.
              </p>

              {Object.entries(MCP_SERVERS).map(([id, server]) => {
                const deeplink = getCursorDeeplink(id);
                const hasKey = !!keys[id];

                return (
                  <div key={id} className="flex items-center justify-between p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50">
                    <div className="flex items-center gap-3">
                      {server.logo ? (
                        <img src={server.logo} alt={server.name} className="w-8 h-8 object-contain dark:invert" />
                      ) : (
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${server.color} flex items-center justify-center text-sm`}>
                          {server.icon}
                        </div>
                      )}
                      <span className="font-medium">{server.name}</span>
                    </div>
                    {hasKey && deeplink ? (
                      <a
                        href={deeplink}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-medium text-sm hover:bg-zinc-800 transition-colors"
                      >
                        <CursorLogo className="w-4 h-4" />
                        Add to Cursor
                      </a>
                    ) : (
                      <span className="text-sm text-[hsl(var(--muted-foreground))]">Key required</span>
                    )}
                  </div>
                );
              })}

              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mt-6">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  <strong>Tip:</strong> After adding, restart Cursor and the servers will appear in your MCP list.
                </p>
              </div>
            </div>
          )}

          {/* Claude Desktop Config */}
          {selectedPlatform === 'claude' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">claude_desktop_config.json</span>
                <button
                  onClick={() => copyToClipboard(getClaudeConfig(), 'claude-config')}
                  className="flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                >
                  {copiedItem === 'claude-config' ? <><Check size={14} className="text-green-500" /> Copied!</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
              <div className="bg-zinc-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-sm text-green-400 font-mono">{getClaudeConfig()}</pre>
              </div>
              <div className="p-4 bg-[hsl(var(--muted))] rounded-xl">
                <h4 className="font-bold mb-2">How to add:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-[hsl(var(--muted-foreground))]">
                  <li><strong>macOS:</strong> <code className="px-1 bg-zinc-800 rounded text-xs">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
                  <li><strong>Windows:</strong> <code className="px-1 bg-zinc-800 rounded text-xs">%APPDATA%\Claude\claude_desktop_config.json</code></li>
                  <li>Paste the config above and restart Claude Desktop</li>
                </ol>
              </div>
            </div>
          )}

          {/* Manual Config */}
          {selectedPlatform === 'manual' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">MCP Configuration (Cursor format)</span>
                <button
                  onClick={() => copyToClipboard(getFullConfig(), 'manual-config')}
                  className="flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                >
                  {copiedItem === 'manual-config' ? <><Check size={14} className="text-green-500" /> Copied!</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
              <div className="bg-zinc-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-sm text-green-400 font-mono">{getFullConfig()}</pre>
              </div>

              <div className="p-4 bg-[hsl(var(--muted))] rounded-xl">
                <h4 className="font-bold mb-2">Server URLs:</h4>
                {Object.entries(MCP_SERVERS).map(([id, server]) => (
                  <div key={id} className="flex items-center gap-2 text-sm mb-2">
                    <strong>{server.shortName}:</strong>
                    <code className="text-xs bg-zinc-800 px-2 py-1 rounded">{server.url}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <button
            onClick={() => setCurrentStep(2)}
            className="mt-6 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            ← Back to platform selection
          </button>
        </div>
      )}

      {/* Platform Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card">
          <div className="flex items-center gap-3 mb-4">
            <img src="/polymarket-logo.svg" alt="Polymarket" className="w-10 h-10 object-contain dark:invert" />
            <h3 className="font-bold text-lg">Polymarket</h3>
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
            World's largest prediction market. Trade on crypto, politics, sports & more.
          </p>
          <Link href="/mcp/polymarket" className="text-purple-500 text-sm font-medium flex items-center gap-1 hover:underline">
            View Docs <ChevronRight size={14} />
          </Link>
        </div>

        <div className="glass-card">
          <div className="flex items-center gap-3 mb-4">
            <img src="/kalshi-logo.svg" alt="Kalshi" className="w-10 h-10 object-contain dark:invert" />
            <h3 className="font-bold text-lg">Kalshi</h3>
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
            CFTC-regulated US prediction market. Weather, economics, events.
          </p>
          <Link href="/mcp/kalshi" className="text-purple-500 text-sm font-medium flex items-center gap-1 hover:underline">
            View Docs <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-[hsl(var(--muted-foreground))]">
        <p>
          Need help?{' '}
          <Link href="/guides" className="text-purple-500 hover:underline">Read the guides</Link>
          {' '}or{' '}
          <a href="https://x.com/quantishlive" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
            follow us on X
          </a>
        </p>
      </div>
    </div>
  );
}
