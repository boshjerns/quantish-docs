import type { Metadata } from 'next';
import { PlatformLandingPage } from '@/components/PlatformLandingPage';

export const metadata: Metadata = {
  title: 'Limitless MCP - Quantish Docs',
  description: 'Trade prediction markets on Base chain.',
};

export default function LimitlessPage() {
  return (
    <PlatformLandingPage
      section="mcp"
      platform="limitless"
      description="Trade prediction markets on Base chain. Full trading capabilities with automatic wallet creation. Low fees and fast transactions."
      subtitle="limitless-mcp-server-production.up.railway.app/mcp • Base • Trading"
    />
  );
}
