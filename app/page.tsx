'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, Wallet, BarChart3, Bot, Terminal } from 'lucide-react';

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

// ASCII Art Logo - Gemini CLI style
const ASCII_LOGO = `
  ██████╗ ██╗   ██╗ █████╗ ███╗   ██╗████████╗██╗   ██╗███╗   ███╗
 ██╔═══██╗██║   ██║██╔══██╗████╗  ██║╚══██╔══╝██║   ██║████╗ ████║
 ██║   ██║██║   ██║███████║██╔██╗ ██║   ██║   ██║   ██║██╔████╔██║
 ██║▄▄ ██║██║   ██║██╔══██║██║╚██╗██║   ██║   ██║   ██║██║╚██╔╝██║
 ╚██████╔╝╚██████╔╝██║  ██║██║ ╚████║   ██║   ╚██████╔╝██║ ╚═╝ ██║
  ╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝`;

export default function Home() {
  const [externalId, setExternalId] = useState('');
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [keys, setKeys] = useState<Record<string, ServerKey>>({});
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        setKeys(prev => ({ ...prev, kalshi: { apiKey: result.apiKey } }));
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
    await Promise.all([
      generateDiscoveryKey(),
      generatePolymarketKey(),
      generateKalshiKey(),
    ]);
  };

  return (
    <div className="landing-page">
      {/* ASCII Art Hero */}
      <section className="ascii-hero">
        <pre className="ascii-logo">{ASCII_LOGO}</pre>
        <div className="hero-badge">
          <span className="version-tag">v3.0</span>
          <span className="stats">50+ MCP tools • 39,000+ markets</span>
        </div>
        <h1 className="hero-title">QUANTISH</h1>
        <p className="hero-tagline">Unified Prediction Market Infrastructure</p>
        <p className="hero-subtitle">
          One API key. Three platforms. Search markets, place trades, and manage
          wallets across Polymarket, Kalshi, and Limitless.
        </p>
        <div className="hero-actions">
          <Link href="/introduction" className="btn-primary">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/mcp" className="btn-ghost">
            View MCP Servers
          </Link>
        </div>
      </section>

      {/* Platform Logos */}
      <section className="platform-section">
        <p className="section-label">Supported Platforms</p>
        <div className="platform-grid">
          <div className="platform-item">
            <Image src="/polymarket-logo.png" alt="Polymarket" width={32} height={32} className="platform-img" />
            <span>Polymarket</span>
          </div>
          <div className="platform-item">
            <Image src="/kalshi-logo.jpg" alt="Kalshi" width={32} height={32} className="platform-img" />
            <span>Kalshi</span>
          </div>
          <div className="platform-item">
            <Image src="/limitless-logo.jpg" alt="Limitless" width={32} height={32} className="platform-img" />
            <span>Limitless</span>
          </div>
        </div>
      </section>

      {/* Key Generator */}
      <section className="generator-section">
        <h2>Get API Keys</h2>
        <p>Enter your email to generate keys for all MCP servers at once.</p>
        <div className="generator-card">
          <input
            type="email"
            value={externalId}
            onChange={(e) => setExternalId(e.target.value)}
            placeholder="your@email.com"
            className="input-dark"
          />
          <button
            onClick={generateAllKeys}
            disabled={!externalId.trim() || Object.values(isLoading).some(Boolean)}
            className="btn-primary"
          >
            {Object.values(isLoading).some(Boolean) ? 'Generating...' : 'Generate All Keys'}
          </button>
        </div>

        {/* Generated Keys */}
        {Object.keys(keys).length > 0 && (
          <div className="keys-list">
            {Object.entries(keys).map(([server, key]) => (
              <div key={server} className="key-item">
                <div>
                  <span className="key-server">{server}</span>
                  <code className="key-value">{key.apiKey.slice(0, 20)}...</code>
                </div>
                <button onClick={() => copyToClipboard(key.apiKey, server)} className="btn-ghost btn-sm">
                  {copiedItem === server ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <h2>Everything You Need</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Search className="feature-icon" />
            <h3>Cross-Platform Search</h3>
            <p>39,000+ markets from Polymarket, Kalshi, and Limitless. Search, filter by probability, find arbitrage.</p>
          </div>

          <div className="feature-card">
            <Wallet className="feature-icon" />
            <h3>Unified Trading</h3>
            <p>Place orders, manage positions, and redeem winnings on any platform through a single REST interface.</p>
          </div>

          <div className="feature-card">
            <BarChart3 className="feature-icon" />
            <h3>Wallet Analytics</h3>
            <p>Trader profiles, whale tracking, social discovery, momentum signals, and portfolio overlap analysis.</p>
          </div>

          <div className="feature-card">
            <Bot className="feature-icon" />
            <h3>AI Agent Ready</h3>
            <p>MCP servers for Claude Desktop, Cursor, Windsurf. One command to start trading with AI.</p>
          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="integrations-section">
        <h2>Three Ways to Integrate</h2>
        <div className="integrations-grid">
          <Link href="/api/markets" className="integration-card">
            <span className="integration-tag tag-api">REST API</span>
            <h3>api.quantish.live/v1</h3>
            <p>Standard REST endpoints with OpenAPI spec. Works with any language.</p>
          </Link>

          <Link href="/mcp" className="integration-card">
            <span className="integration-tag tag-mcp">MCP</span>
            <h3>MCP Servers</h3>
            <p>Model Context Protocol for AI agents. Connect to Cursor, Claude Desktop, or any MCP client.</p>
          </Link>

          <a href="https://github.com/joinQuantish" className="integration-card">
            <span className="integration-tag tag-skill">Skills</span>
            <h3>Claude Code Skills</h3>
            <p>Drop-in skills for Claude Code CLI. One command to start trading.</p>
          </a>
        </div>
      </section>

      {/* Terminal Example */}
      <section className="terminal-section">
        <h2><Terminal className="inline w-5 h-5 mr-2" />Quick Example</h2>
        <div className="terminal-window">
          <div className="terminal-header">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="terminal-title">terminal</span>
          </div>
          <pre className="terminal-body">
{`# Search for markets
curl "https://quantish.live/mcp" \\
  -H "x-api-key: YOUR_KEY" \\
  -d '{"method":"tools/call","params":{"name":"search_markets","arguments":{"query":"bitcoin"}}}'

# Buy shares on Polymarket
curl "https://quantish-sdk-production.up.railway.app/mcp" \\
  -H "x-api-key: YOUR_KEY" \\
  -d '{"method":"tools/call","params":{"name":"place_order","arguments":{...}}}'`}
          </pre>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to start?</h2>
        <p>Generate your API keys and start trading prediction markets with AI.</p>
        <div className="cta-actions">
          <Link href="/introduction/quickstart" className="btn-primary">
            Quick Start <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="https://github.com/joinQuantish" className="btn-ghost">
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
