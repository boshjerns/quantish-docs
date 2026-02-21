import type { Metadata } from 'next';
import { PlatformLandingPage } from '@/components/PlatformLandingPage';

export const metadata: Metadata = {
  title: 'Discovery MCP - Quantish Docs',
  description: 'Search and explore prediction markets across all platforms.',
};

export default function DiscoveryPage() {
  return (
    <PlatformLandingPage
      section="mcp"
      platform="discovery"
      description="Search and explore markets across Polymarket and Kalshi. Read-only access — no wallet required. 21 tools for comprehensive market discovery and analysis."
      subtitle="quantish.live/mcp • Read-only • Free"
    />
  );
}
