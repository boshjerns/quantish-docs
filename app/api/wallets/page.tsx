import type { Metadata } from 'next';
import { PlatformLandingPage } from '@/components/PlatformLandingPage';

export const metadata: Metadata = {
  title: 'Wallet Analytics API - Quantish Docs',
  description: 'Wallet profiles, whale tracking, and social discovery.',
};

export default function WalletsAPIPage() {
  return (
    <PlatformLandingPage
      section="api"
      platform="wallets"
      description="Wallet profiles, whale tracking, social discovery, and portfolio analysis across Polymarket."
      subtitle="Polymarket Analytics • Whale Tracking"
    />
  );
}
