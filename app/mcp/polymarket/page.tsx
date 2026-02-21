import type { Metadata } from 'next';
import { PlatformLandingPage } from '@/components/PlatformLandingPage';

export const metadata: Metadata = {
  title: 'Polymarket MCP - Quantish Docs',
  description: 'Full trading on Polymarket via MCP.',
};

export default function PolymarketPage() {
  return (
    <PlatformLandingPage
      section="mcp"
      platform="polymarket"
      description="Full trading on Polymarket, the world's largest prediction market. Wallet management, order placement, position tracking, token swaps, and transfers via MCP."
      subtitle="quantish-sdk-production.up.railway.app/mcp • Polygon • Trading"
    />
  );
}
