import type { Metadata } from 'next';
import { PlatformLandingPage } from '@/components/PlatformLandingPage';

export const metadata: Metadata = {
  title: 'Limitless API - Quantish Docs',
  description: 'Trading on Limitless (Base).',
};

export default function LimitlessAPIPage() {
  return (
    <PlatformLandingPage
      section="api"
      platform="limitless"
      description="Trading on Limitless prediction markets on Base chain. Orders, transfers, swaps, cross-chain bridge, and approvals."
      subtitle="Base • EOA Wallet • USDC"
    />
  );
}
