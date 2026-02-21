import type { Metadata } from 'next';
import { PlatformLandingPage } from '@/components/PlatformLandingPage';

export const metadata: Metadata = {
  title: 'Kalshi API - Quantish Docs',
  description: 'Trading on Kalshi via DFlow (Solana).',
};

export default function KalshiAPIPage() {
  return (
    <PlatformLandingPage
      section="api"
      platform="kalshi"
      description="Trading on Kalshi via DFlow on Solana. CFTC-regulated US prediction markets with full order management."
      subtitle="Solana • DFlow • USDC"
    />
  );
}
