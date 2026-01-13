'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Key, Copy, Check, ChevronRight, ExternalLink, Terminal, Settings, Zap } from 'lucide-react';

// MCP Server configurations
const MCP_SERVERS = {
  discovery: {
    name: 'Quantish Discovery',
    description: 'Search markets across Polymarket & Kalshi',
    url: 'https://quantish.live/mcp',
    requiresKey: true,
    keyHeader: 'x-api-key',
  },
  polymarket: {
    name: 'Polymarket Trading',
    description: 'Trade on Polymarket prediction markets',
    url: 'https://quantish-sdk-production.up.railway.app/mcp',
    requiresKey: true,
    keyHeader: 'x-api-key',
  },
  kalshi: {
    name: 'Kalshi Trading',
    description: 'Trade on Kalshi via Solana & DFlow',
    url: 'https://kalshi-mcp-production-7c2c.up.railway.app/mcp',
    requiresKey: true,
    keyHeader: 'x-api-key',
  },
};

// Inline SVG components for logos
const CursorLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z"/>
  </svg>
);

const ClaudeLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const PolymarketLogo = ({ className }: { className?: string }) => (
  <img src="/polymarket-logo.svg" alt="Polymarket" className={className} />
);

const KalshiLogo = ({ className }: { className?: string }) => (
  <img src="/kalshi-logo.svg" alt="Kalshi" className={className} />
);

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<'cursor' | 'claude' | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [selectedServers, setSelectedServers] = useState<string[]>(['discovery']);
  const [externalId, setExternalId] = useState('');

  const copyToClipboard = async (text: string, itemId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedItem(itemId);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const generateApiKey = async () => {
    if (!externalId.trim()) {
      alert('Please enter an identifier (email or unique ID)');
      return;
    }

    setIsGeneratingKey(true);
    try {
      // Use the local API route to generate key (avoids CORS)
      const response = await fetch('/api/generate-discovery-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: externalId.trim(),
          name: 'Docs Generated Key'
        })
      });
      const data = await response.json();

      if (data.success && data.key) {
        setApiKey(data.key);
        setCurrentStep(2);
      } else if (data.error) {
        alert(data.error || 'Failed to generate API key');
      } else {
        alert('Failed to generate API key. Please try again.');
      }
    } catch (error) {
      console.error('Error generating key:', error);
      alert('Failed to connect to server. Please try again.');
    } finally {
      setIsGeneratingKey(false);
    }
  };

  const generateCursorConfig = () => {
    const config: Record<string, any> = { mcpServers: {} };

    selectedServers.forEach(serverId => {
      const server = MCP_SERVERS[serverId as keyof typeof MCP_SERVERS];
      config.mcpServers[`quantish-${serverId}`] = {
        url: server.url,
        headers: server.requiresKey ? { [server.keyHeader]: apiKey || 'YOUR_API_KEY' } : undefined
      };
    });

    return JSON.stringify(config, null, 2);
  };

  const generateClaudeConfig = () => {
    const config: Record<string, any> = { mcpServers: {} };

    selectedServers.forEach(serverId => {
      const server = MCP_SERVERS[serverId as keyof typeof MCP_SERVERS];
      config.mcpServers[`quantish-${serverId}`] = {
        command: 'npx',
        args: ['-y', 'mcp-remote', server.url],
        env: server.requiresKey ? { MCP_API_KEY: apiKey || 'YOUR_API_KEY' } : {}
      };
    });

    return JSON.stringify(config, null, 2);
  };

  const generateManualConfig = () => {
    return selectedServers.map(serverId => {
      const server = MCP_SERVERS[serverId as keyof typeof MCP_SERVERS];
      return `# ${server.name}
URL: ${server.url}
Method: POST
Headers:
  Content-Type: application/json
  ${server.keyHeader}: ${apiKey || 'YOUR_API_KEY'}

Example Request:
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list"
}`;
    }).join('\n\n---\n\n');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Connect to <span className="text-gradient">Quantish</span>
        </h1>
        <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
          Trade prediction markets with AI agents. Connect in under 2 minutes.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
              transition-all duration-300
              ${currentStep >= step
                ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'
              }
              ${currentStep === step ? 'ring-2 ring-[hsl(var(--primary))] ring-offset-2 ring-offset-[hsl(var(--background))]' : ''}
            `}>
              {step}
            </div>
            {step < 3 && (
              <div className={`w-16 h-0.5 mx-2 transition-colors duration-300 ${
                currentStep > step ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--border))]'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Get API Key */}
      <div className={`glass-card mb-8 transition-all duration-500 ${currentStep === 1 ? 'opacity-100' : 'opacity-50'}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center">
            <Key size={16} className="text-[hsl(var(--primary-foreground))]" />
          </div>
          <h2 className="text-xl font-bold">Step 1: Get Your API Key</h2>
          {apiKey && <Check className="text-green-500 ml-auto" size={24} />}
        </div>

        {!apiKey ? (
          <div className="space-y-4">
            <p className="text-[hsl(var(--muted-foreground))]">
              Enter your email or a unique identifier to generate your free API key.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="your@email.com or unique-id"
                value={externalId}
                onChange={(e) => setExternalId(e.target.value)}
                className="flex-1 px-4 py-3 bg-[hsl(var(--muted))] border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
              />
              <button
                onClick={generateApiKey}
                disabled={isGeneratingKey}
                className="btn-primary whitespace-nowrap"
              >
                {isGeneratingKey ? 'Generating...' : 'Get API Key'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-green-500 font-medium">API Key Generated!</p>
            <div className="flex items-center gap-3 p-4 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))]">
              <code className="flex-1 font-mono text-sm break-all">{apiKey}</code>
              <button
                onClick={() => copyToClipboard(apiKey, 'apiKey')}
                className="p-2 hover:bg-[hsl(var(--background))] rounded transition-colors"
              >
                {copiedItem === 'apiKey' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Save this key! You'll need it for all MCP connections.
            </p>
          </div>
        )}
      </div>

      {/* Step 2: Choose Platform */}
      <div className={`glass-card mb-8 transition-all duration-500 ${currentStep >= 2 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center">
            <Settings size={16} className="text-[hsl(var(--primary-foreground))]" />
          </div>
          <h2 className="text-xl font-bold">Step 2: Choose Your Platform</h2>
          {selectedPlatform && <Check className="text-green-500 ml-auto" size={24} />}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Cursor Option */}
          <button
            onClick={() => { setSelectedPlatform('cursor'); setCurrentStep(3); }}
            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left
              ${selectedPlatform === 'cursor'
                ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10'
                : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 bg-[hsl(var(--muted))]/50'
              }`}
          >
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
              <CursorLogo className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-1">Cursor IDE</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Add MCP servers via Settings → Features → MCP
            </p>
          </button>

          {/* Claude Option */}
          <button
            onClick={() => { setSelectedPlatform('claude'); setCurrentStep(3); }}
            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left
              ${selectedPlatform === 'claude'
                ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10'
                : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 bg-[hsl(var(--muted))]/50'
              }`}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Claude Desktop</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Configure via claude_desktop_config.json
            </p>
          </button>

          {/* Manual Option */}
          <button
            onClick={() => { setSelectedPlatform(null); setCurrentStep(3); }}
            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left
              border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 bg-[hsl(var(--muted))]/50`}
          >
            <div className="w-12 h-12 bg-zinc-700 rounded-xl flex items-center justify-center mb-4">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-1">Manual / Other</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Raw HTTP/JSON-RPC configuration
            </p>
          </button>
        </div>
      </div>

      {/* Step 3: Configure Servers */}
      <div className={`glass-card mb-8 transition-all duration-500 ${currentStep >= 3 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center">
            <Zap size={16} className="text-[hsl(var(--primary-foreground))]" />
          </div>
          <h2 className="text-xl font-bold">Step 3: Add MCP Servers</h2>
        </div>

        {/* Server Selection */}
        <div className="mb-6">
          <p className="text-[hsl(var(--muted-foreground))] mb-4">Select which servers to connect:</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(MCP_SERVERS).map(([id, server]) => (
              <button
                key={id}
                onClick={() => {
                  setSelectedServers(prev =>
                    prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
                  );
                }}
                className={`px-4 py-2 rounded-lg border-2 transition-all flex items-center gap-2
                  ${selectedServers.includes(id)
                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10'
                    : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50'
                  }`}
              >
                {id === 'polymarket' && <PolymarketLogo className="w-5 h-5 invert dark:invert-0" />}
                {id === 'kalshi' && <KalshiLogo className="w-5 h-5 invert dark:invert-0" />}
                {id === 'discovery' && <span className="text-lg">🔍</span>}
                <span className="font-medium">{server.name}</span>
                {selectedServers.includes(id) && <Check size={16} className="text-green-500" />}
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Output */}
        {selectedPlatform === 'cursor' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Cursor MCP Configuration</h3>
              <button
                onClick={() => copyToClipboard(generateCursorConfig(), 'cursorConfig')}
                className="btn-secondary text-sm"
              >
                {copiedItem === 'cursorConfig' ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Config</>}
              </button>
            </div>
            <div className="bg-zinc-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono">{generateCursorConfig()}</pre>
            </div>
            <div className="p-4 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))]">
              <h4 className="font-bold mb-2">How to add in Cursor:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-[hsl(var(--muted-foreground))]">
                <li>Open Cursor Settings (<code className="px-1 bg-zinc-800 rounded">⌘ + ,</code>)</li>
                <li>Go to <strong>Features</strong> → <strong>MCP Servers</strong></li>
                <li>Click <strong>"Add new MCP server"</strong></li>
                <li>Paste the configuration above</li>
                <li>Restart Cursor to apply changes</li>
              </ol>
            </div>
          </div>
        )}

        {selectedPlatform === 'claude' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Claude Desktop Configuration</h3>
              <button
                onClick={() => copyToClipboard(generateClaudeConfig(), 'claudeConfig')}
                className="btn-secondary text-sm"
              >
                {copiedItem === 'claudeConfig' ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Config</>}
              </button>
            </div>
            <div className="bg-zinc-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono">{generateClaudeConfig()}</pre>
            </div>
            <div className="p-4 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))]">
              <h4 className="font-bold mb-2">How to add in Claude Desktop:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-[hsl(var(--muted-foreground))]">
                <li>Open your config file:
                  <ul className="ml-6 mt-1">
                    <li><strong>macOS:</strong> <code className="px-1 bg-zinc-800 rounded text-xs">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
                    <li><strong>Windows:</strong> <code className="px-1 bg-zinc-800 rounded text-xs">%APPDATA%\Claude\claude_desktop_config.json</code></li>
                  </ul>
                </li>
                <li>Paste the configuration above</li>
                <li>Restart Claude Desktop</li>
              </ol>
            </div>
          </div>
        )}

        {!selectedPlatform && currentStep >= 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Manual HTTP/JSON-RPC Connection</h3>
              <button
                onClick={() => copyToClipboard(generateManualConfig(), 'manualConfig')}
                className="btn-secondary text-sm"
              >
                {copiedItem === 'manualConfig' ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>
            <div className="bg-zinc-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{generateManualConfig()}</pre>
            </div>
            <div className="p-4 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))]">
              <h4 className="font-bold mb-2">Using the MCP Protocol:</h4>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Send POST requests with JSON-RPC 2.0 format. Use <code className="px-1 bg-zinc-800 rounded">tools/list</code> to discover available tools,
                then <code className="px-1 bg-zinc-800 rounded">tools/call</code> to execute them.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Trading Platforms Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card">
          <div className="flex items-center gap-3 mb-4">
            <PolymarketLogo className="w-8 h-8 invert dark:invert-0" />
            <h3 className="font-bold text-lg">Polymarket</h3>
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
            Trade on the world's largest prediction market. Requires wallet setup after connecting.
          </p>
          <Link href="/mcp/polymarket" className="text-[hsl(var(--primary))] text-sm font-medium flex items-center gap-1 hover:underline">
            View Polymarket Docs <ChevronRight size={14} />
          </Link>
        </div>

        <div className="glass-card">
          <div className="flex items-center gap-3 mb-4">
            <KalshiLogo className="w-8 h-8 invert dark:invert-0" />
            <h3 className="font-bold text-lg">Kalshi</h3>
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
            US-regulated prediction market. Uses Solana blockchain via DFlow for trading.
          </p>
          <Link href="/mcp/kalshi" className="text-[hsl(var(--primary))] text-sm font-medium flex items-center gap-1 hover:underline">
            View Kalshi Docs <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Help Section */}
      <div className="text-center text-sm text-[hsl(var(--muted-foreground))]">
        <p>
          Need help? Check out our{' '}
          <Link href="/guides" className="text-[hsl(var(--primary))] hover:underline">guides</Link>
          {' '}or{' '}
          <a href="https://discord.gg/quantish" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--primary))] hover:underline">
            join our Discord
          </a>
        </p>
      </div>
    </div>
  );
}
