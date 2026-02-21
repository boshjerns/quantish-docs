import { allEndpoints, platformInfo } from './endpoint-registry';

export interface SearchItem {
  title: string;
  href: string;
  category: string;
  description: string;
  keywords: string[];
  method?: string;
  platform?: string;
}

// Static pages that aren't in the endpoint registry
const staticPages: SearchItem[] = [
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
  {
    title: 'API Overview',
    href: '/api',
    category: 'API Reference',
    description: 'REST API reference with 66 endpoints across all platforms.',
    keywords: ['rest', 'endpoints', 'base url', 'api key'],
  },
  {
    title: 'MCP Overview',
    href: '/mcp',
    category: 'MCP Servers',
    description: 'Model Context Protocol servers for AI agent integration.',
    keywords: ['mcp', 'model context protocol', 'ai', 'agent', 'claude', 'cursor', 'tools'],
  },
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
];

// Auto-generate search entries from endpoint registry
function buildEndpointSearchItems(): SearchItem[] {
  return allEndpoints.map(ep => {
    const sectionPath = ep.section === 'api' ? 'api' : 'mcp';
    const info = platformInfo[ep.platform];
    const platformName = info?.name || ep.platform;
    const category = ep.section === 'api' ? `${platformName} API` : `${platformName} MCP`;

    // Build keywords from multiple sources
    const keywords: string[] = [
      ep.platform,
      ep.subcategory.toLowerCase(),
      ...ep.slug.split('-'),
    ];
    if (ep.toolName) keywords.push(ep.toolName);
    if (ep.path) keywords.push(...ep.path.split('/').filter(s => s && !s.startsWith(':')));
    if (ep.method) keywords.push(ep.method.toLowerCase());
    if (ep.params) {
      for (const p of ep.params) {
        if (p.name.length > 2) keywords.push(p.name);
      }
    }

    return {
      title: ep.name,
      href: `/${sectionPath}/${ep.platform}/${ep.slug}`,
      category,
      description: ep.description,
      keywords: Array.from(new Set(keywords)),
      method: ep.method,
      platform: ep.platform,
    };
  });
}

// Platform landing pages
function buildPlatformLandingPages(): SearchItem[] {
  const apiPlatforms = ['auth', 'markets', 'wallets', 'account', 'polymarket', 'kalshi', 'limitless'];
  const mcpPlatforms = ['discovery', 'polymarket', 'kalshi', 'limitless'];

  const items: SearchItem[] = [];
  for (const p of apiPlatforms) {
    const info = platformInfo[p];
    items.push({
      title: `${info?.name || p} API`,
      href: `/api/${p}`,
      category: 'API Reference',
      description: `${info?.name || p} API endpoints and documentation.`,
      keywords: [p, 'api', info?.name?.toLowerCase() || ''].filter(Boolean),
    });
  }
  for (const p of mcpPlatforms) {
    const info = platformInfo[p];
    items.push({
      title: `${info?.name || p} MCP`,
      href: `/mcp/${p}`,
      category: 'MCP Servers',
      description: `${info?.name || p} MCP tools for AI agents.`,
      keywords: [p, 'mcp', 'tools', info?.name?.toLowerCase() || ''].filter(Boolean),
    });
  }
  return items;
}

export const searchIndex: SearchItem[] = [
  ...staticPages,
  ...buildPlatformLandingPages(),
  ...buildEndpointSearchItems(),
];
