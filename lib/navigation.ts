// ============================================
// NAVIGATION - Derived from endpoint registry
// Builds multi-level sidebar nav structure
// ============================================

import {
  allEndpoints,
  getEndpointsForPlatform,
  getSubcategories,
  platformInfo,
  type Section,
} from './endpoint-registry';

export interface NavItem {
  title: string;
  href?: string;
  logo?: string;
  items?: NavItem[];
}

// Static pages (Introduction, Guides)
const introductionNav: NavItem = {
  title: 'Introduction',
  items: [
    { title: 'Overview', href: '/introduction' },
    { title: 'Quick Start', href: '/introduction/quickstart' },
    { title: 'Authentication', href: '/introduction/authentication' },
  ],
};

const guidesNav: NavItem = {
  title: 'Guides',
  items: [
    { title: 'Wallet Setup', href: '/guides/wallet-setup' },
    { title: 'Trading Flow', href: '/guides/trading-flow' },
  ],
};

// Build platform nav section with subcategory grouping
function buildPlatformNav(section: Section, platform: string): NavItem {
  const info = platformInfo[platform];
  const endpoints = getEndpointsForPlatform(section, platform);
  const subcategories = getSubcategories(section, platform);
  const sectionPath = section === 'api' ? 'api' : 'mcp';

  // If few endpoints (< 8), flat list without subcategory headers
  if (endpoints.length < 8) {
    return {
      title: info?.name || platform,
      href: `/${sectionPath}/${platform}`,
      logo: info?.logo,
      items: endpoints.map(e => ({
        title: e.name,
        href: `/${sectionPath}/${platform}/${e.slug}`,
      })),
    };
  }

  // Group by subcategory
  const items: NavItem[] = [];
  for (const subcat of subcategories) {
    const subcatEndpoints = endpoints.filter(e => e.subcategory === subcat);
    items.push({
      title: subcat,
      items: subcatEndpoints.map(e => ({
        title: e.name,
        href: `/${sectionPath}/${platform}/${e.slug}`,
      })),
    });
  }

  return {
    title: info?.name || platform,
    href: `/${sectionPath}/${platform}`,
    logo: info?.logo,
    items,
  };
}

// Build API Reference section
function buildApiNav(): NavItem {
  const platforms = ['auth', 'markets', 'wallets', 'account', 'polymarket', 'kalshi', 'limitless'];
  return {
    title: 'API Reference',
    items: [
      { title: 'Overview', href: '/api' },
      ...platforms.map(p => buildPlatformNav('api', p)),
    ],
  };
}

// Build MCP Servers section
function buildMcpNav(): NavItem {
  const platforms = ['discovery', 'polymarket', 'kalshi', 'limitless'];
  return {
    title: 'MCP Servers',
    items: [
      { title: 'Overview', href: '/mcp' },
      ...platforms.map(p => buildPlatformNav('mcp', p)),
    ],
  };
}

// Full navigation tree
export const navigation: NavItem[] = [
  introductionNav,
  buildApiNav(),
  buildMcpNav(),
  guidesNav,
];
