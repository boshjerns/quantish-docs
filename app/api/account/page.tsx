import type { Metadata } from 'next';
import { PlatformLandingPage } from '@/components/PlatformLandingPage';

export const metadata: Metadata = {
  title: 'Account API - Quantish Docs',
  description: 'Balances, positions, and orders across all platforms.',
};

export default function AccountAPIPage() {
  return (
    <PlatformLandingPage
      section="api"
      platform="account"
      description="Balances, positions, and orders across all platforms. Unified view of your trading activity."
      subtitle="All Platforms • Unified View"
    />
  );
}
