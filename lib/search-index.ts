export interface SearchItem {
  title: string;
  href: string;
  category: string;
  description: string;
  keywords: string[];
}

export const searchIndex: SearchItem[] = [
  // ============================================
  // INTRODUCTION
  // ============================================
  {
    title: 'Overview',
    href: '/introduction',
    category: 'Introduction',
    description: 'Introduction to Quantish prediction market infrastructure and unified API.',
    keywords: ['intro', 'getting started', 'what is quantish', 'about'],
  },
  {
    title: 'Quick Start',
    href: '/introduction/quickstart',
    category: 'Introduction',
    description: 'Get up and running with Quantish API in minutes.',
    keywords: ['start', 'begin', 'tutorial', 'setup', 'first request'],
  },
  {
    title: 'Authentication',
    href: '/introduction/authentication',
    category: 'Introduction',
    description: 'How to authenticate with API keys and manage your credentials.',
    keywords: ['auth', 'api key', 'login', 'signup', 'credentials', 'x-api-key'],
  },

  // ============================================
  // API REFERENCE
  // ============================================
  {
    title: 'API Overview',
    href: '/api',
    category: 'API Reference',
    description: 'REST API reference with 66 endpoints across all platforms.',
    keywords: ['rest', 'endpoints', 'base url', 'quick start', 'api key'],
  },
  {
    title: 'Authentication API',
    href: '/api/auth',
    category: 'API Reference',
    description: 'Account signup and API key management endpoints.',
    keywords: ['signup', 'login', 'api keys', 'create key', 'revoke', 'list keys'],
  },
  {
    title: 'Markets API',
    href: '/api/markets',
    category: 'API Reference',
    description: 'Search, filter, and explore prediction markets across all platforms.',
    keywords: ['search', 'trending', 'categories', 'stats', 'arbitrage', 'probability', 'related'],
  },
  {
    title: 'Wallet Analytics API',
    href: '/api/wallets',
    category: 'API Reference',
    description: 'Wallet profiles, whale tracking, and social discovery.',
    keywords: ['whale', 'profile', 'interests', 'momentum', 'social', 'compare', 'contrarian'],
  },
  {
    title: 'Account API',
    href: '/api/account',
    category: 'API Reference',
    description: 'Balances, positions, and orders across all platforms.',
    keywords: ['balances', 'positions', 'orders', 'wallets', 'portfolio'],
  },
  {
    title: 'Polymarket API',
    href: '/api/polymarket',
    category: 'API Reference',
    description: 'Trading on Polymarket with orders, copy trading, and transfers.',
    keywords: ['polymarket', 'polygon', 'order', 'place order', 'cancel', 'copy trade', 'swap', 'transfer', 'redeem', 'orderbook', 'price'],
  },
  {
    title: 'Kalshi API',
    href: '/api/kalshi',
    category: 'API Reference',
    description: 'Trading on Kalshi via DFlow on Solana.',
    keywords: ['kalshi', 'solana', 'buy yes', 'buy no', 'sell', 'quote', 'events', 'kyc', 'redeem'],
  },
  {
    title: 'Limitless API',
    href: '/api/limitless',
    category: 'API Reference',
    description: 'Trading on Limitless prediction markets on Base.',
    keywords: ['limitless', 'base', 'order', 'quote', 'bridge', 'approvals', 'redeem', 'transfer'],
  },

  // ============================================
  // MCP SERVERS
  // ============================================
  {
    title: 'MCP Overview',
    href: '/mcp',
    category: 'MCP Servers',
    description: 'Model Context Protocol servers for AI agent integration.',
    keywords: ['mcp', 'model context protocol', 'ai', 'agent', 'claude', 'cursor', 'tools'],
  },
  {
    title: 'Discovery MCP',
    href: '/mcp/discovery',
    category: 'MCP Servers',
    description: 'Search and discover prediction markets across all platforms.',
    keywords: ['discovery', 'search', 'trending', 'arbitrage', 'whale', 'related', 'probability'],
  },
  {
    title: 'Polymarket MCP',
    href: '/mcp/polymarket',
    category: 'MCP Servers',
    description: 'Polymarket trading tools for AI agents.',
    keywords: ['polymarket', 'trading', 'order', 'position', 'balance', 'copy trade'],
  },
  {
    title: 'Kalshi MCP',
    href: '/mcp/kalshi',
    category: 'MCP Servers',
    description: 'Kalshi trading tools via DFlow on Solana.',
    keywords: ['kalshi', 'solana', 'trading', 'order', 'kyc'],
  },
  {
    title: 'Limitless MCP',
    href: '/mcp/limitless',
    category: 'MCP Servers',
    description: 'Limitless trading tools on Base.',
    keywords: ['limitless', 'base', 'trading', 'bridge'],
  },

  // ============================================
  // GUIDES
  // ============================================
  {
    title: 'Wallet Setup',
    href: '/guides/wallet-setup',
    category: 'Guides',
    description: 'How to set up and configure wallets for trading.',
    keywords: ['wallet', 'setup', 'create', 'deposit', 'fund', 'safe'],
  },
  {
    title: 'Trading Flow',
    href: '/guides/trading-flow',
    category: 'Guides',
    description: 'Step-by-step guide to placing trades and managing positions.',
    keywords: ['trade', 'order', 'buy', 'sell', 'position', 'price'],
  },

  // ============================================
  // KEY CONCEPTS (for better search coverage)
  // ============================================
  {
    title: 'Copy Trading',
    href: '/api/polymarket',
    category: 'API Reference',
    description: 'Copy trade top traders on Polymarket automatically.',
    keywords: ['copy', 'follow', 'trader', 'leaderboard', 'mirror', 'auto'],
  },
  {
    title: 'Bridge Assets',
    href: '/api/limitless',
    category: 'API Reference',
    description: 'Bridge USDC from Polygon to Base for Limitless trading.',
    keywords: ['bridge', 'cross-chain', 'polygon', 'base', 'usdc', 'transfer'],
  },
  {
    title: 'KYC Verification',
    href: '/api/kalshi',
    category: 'API Reference',
    description: 'KYC verification required for Kalshi trading.',
    keywords: ['kyc', 'verify', 'identity', 'kalshi', 'dflow'],
  },
  {
    title: 'Redeem Winnings',
    href: '/api/polymarket',
    category: 'API Reference',
    description: 'Claim winnings from resolved prediction markets.',
    keywords: ['redeem', 'claim', 'winnings', 'resolved', 'settlement'],
  },
  {
    title: 'Arbitrage Opportunities',
    href: '/api/markets',
    category: 'API Reference',
    description: 'Find arbitrage opportunities across prediction markets.',
    keywords: ['arbitrage', 'spread', 'profit', 'opportunity'],
  },
];
