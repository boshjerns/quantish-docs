import type { Metadata } from 'next';
import { PlatformLandingPage } from '@/components/PlatformLandingPage';

export const metadata: Metadata = {
  title: 'Authentication API - Quantish Docs',
  description: 'Account signup and API key management.',
};

export default function AuthAPIPage() {
  return (
    <PlatformLandingPage
      section="api"
      platform="auth"
      description="Account signup and API key management. Create your unified API key to access all platforms."
      subtitle="Unified API Key • All Platforms"
    />
  );
}
