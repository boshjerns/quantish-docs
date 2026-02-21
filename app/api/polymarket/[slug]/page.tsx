import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EndpointPageView } from '@/components/EndpointPage';
import { generateEndpointStaticParams, generateEndpointMetadata, getEndpointWithNav } from '@/lib/endpoint-page-helpers';

const SECTION = 'api' as const;
const PLATFORM = 'polymarket';

export function generateStaticParams() {
  return generateEndpointStaticParams(SECTION, PLATFORM);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return generateEndpointMetadata(SECTION, PLATFORM, params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  const data = getEndpointWithNav(SECTION, PLATFORM, params.slug);
  if (!data) notFound();
  return <EndpointPageView endpoint={data.endpoint} prevEndpoint={data.prev} nextEndpoint={data.next} />;
}
