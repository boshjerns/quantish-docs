import type { Metadata } from 'next';
import { PlatformLandingPage } from '@/components/PlatformLandingPage';

export const metadata: Metadata = {
  title: 'Polymarket API - Quantish Docs',
  description: 'Trading on Polymarket (Polygon).',
};

export default function PolymarketAPIPage() {
  return (
    <PlatformLandingPage
      section="api"
      platform="polymarket"
      description="Trading on Polymarket, the world's largest prediction market. Orders, copy trading, transfers, swaps, and redemption."
      subtitle="Polygon • Safe Wallet • CTF Exchange"
    />
  );
}
