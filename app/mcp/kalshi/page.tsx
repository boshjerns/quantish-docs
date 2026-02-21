import type { Metadata } from 'next';
import { PlatformLandingPage } from '@/components/PlatformLandingPage';

export const metadata: Metadata = {
  title: 'Kalshi MCP - Quantish Docs',
  description: 'Full trading on Kalshi via DFlow on Solana.',
};

export default function KalshiPage() {
  return (
    <PlatformLandingPage
      section="mcp"
      platform="kalshi"
      description="Full trading on Kalshi via DFlow on Solana. CFTC-regulated US prediction markets. Create a new Solana wallet or import your own."
      subtitle="kalshi-mcp-production-7c2c.up.railway.app/mcp • Solana • Trading"
    />
  );
}
