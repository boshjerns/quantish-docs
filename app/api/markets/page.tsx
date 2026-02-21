import type { Metadata } from 'next';
import { PlatformLandingPage } from '@/components/PlatformLandingPage';

export const metadata: Metadata = {
  title: 'Markets API - Quantish Docs',
  description: 'Search and explore prediction markets.',
};

export default function MarketsAPIPage() {
  return (
    <PlatformLandingPage
      section="api"
      platform="markets"
      description="Search, filter, and explore prediction markets across Polymarket, Kalshi, and Limitless."
      subtitle="Polymarket • Kalshi • Limitless"
    />
  );
}
