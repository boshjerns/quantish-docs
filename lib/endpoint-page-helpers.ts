import type { Metadata } from 'next';
import { getEndpoint, getEndpointsForPlatform, platformInfo, type Section } from './endpoint-registry';

export function generateEndpointStaticParams(section: Section, platform: string) {
  return getEndpointsForPlatform(section, platform).map(e => ({ slug: e.slug }));
}

export function generateEndpointMetadata(section: Section, platform: string, slug: string): Metadata {
  const endpoint = getEndpoint(section, platform, slug);
  if (!endpoint) return { title: 'Not Found' };
  const info = platformInfo[platform];
  const sectionLabel = section === 'api' ? 'API' : 'MCP';
  return {
    title: `${endpoint.name} - ${info?.name || platform} ${sectionLabel} - Quantish Docs`,
    description: endpoint.description,
  };
}

export function getEndpointWithNav(section: Section, platform: string, slug: string) {
  const endpoint = getEndpoint(section, platform, slug);
  if (!endpoint) return null;

  const platformEndpoints = getEndpointsForPlatform(section, platform);
  const idx = platformEndpoints.findIndex(e => e.slug === slug);
  const prev = idx > 0 ? platformEndpoints[idx - 1] : undefined;
  const next = idx < platformEndpoints.length - 1 ? platformEndpoints[idx + 1] : undefined;

  return { endpoint, prev, next };
}
