import Link from 'next/link';
import Image from 'next/image';
import { getEndpointsForPlatform, getSubcategories, platformInfo, type Section } from '@/lib/endpoint-registry';
import { MethodBadge } from '@/components/api/MethodBadge';

interface Props {
  section: Section;
  platform: string;
  description: string;
  subtitle?: string;
}

export function PlatformLandingPage({ section, platform, description, subtitle }: Props) {
  const info = platformInfo[platform];
  const endpoints = getEndpointsForPlatform(section, platform);
  const subcategories = getSubcategories(section, platform);
  const sectionPath = section === 'api' ? 'api' : 'mcp';
  const sectionLabel = section === 'api' ? 'API' : 'MCP';
  const logo = info?.logo || '/quantish-logo.svg';

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Image src={logo} alt={info?.name || platform} width={40} height={40} className="rounded-lg" />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--pn-text)' }}>
              {info?.name || platform} {sectionLabel}
            </h1>
            <span
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{ background: 'var(--pn-accent-muted)', color: 'var(--pn-accent)' }}
            >
              {endpoints.length} {section === 'api' ? 'endpoints' : 'tools'}
            </span>
          </div>
          {subtitle && (
            <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>{subtitle}</p>
          )}
        </div>
      </div>

      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        {description}
      </p>

      {/* Endpoint listing grouped by subcategory */}
      <div className="space-y-8">
        {subcategories.map(subcat => {
          const subcatEndpoints = endpoints.filter(e => e.subcategory === subcat);
          return (
            <section key={subcat}>
              <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--pn-text)' }}>
                {subcat}
              </h2>
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--pn-border)' }}
              >
                {subcatEndpoints.map((ep, i) => (
                  <Link
                    key={ep.slug}
                    href={`/${sectionPath}/${platform}/${ep.slug}`}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[var(--pn-elevated)]"
                    style={{
                      borderBottom: i < subcatEndpoints.length - 1 ? '1px solid var(--pn-border)' : undefined,
                    }}
                  >
                    {ep.method ? (
                      <MethodBadge method={ep.method} className="w-16 justify-center text-center" />
                    ) : (
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold border w-16 justify-center"
                        style={{ background: 'rgba(168,85,247,0.2)', color: '#a855f7', borderColor: 'rgba(168,85,247,0.3)' }}
                      >
                        MCP
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium" style={{ color: 'var(--pn-text)' }}>
                        {ep.name}
                      </span>
                      <p className="text-xs truncate" style={{ color: 'var(--pn-text-muted)' }}>
                        {ep.description}
                      </p>
                    </div>
                    {ep.path && (
                      <code className="text-xs font-mono hidden sm:block shrink-0" style={{ color: 'var(--pn-text-muted)' }}>
                        {ep.path}
                      </code>
                    )}
                    {ep.toolName && (
                      <code className="text-xs font-mono hidden sm:block shrink-0" style={{ color: 'var(--pn-text-muted)' }}>
                        {ep.toolName}
                      </code>
                    )}
                    <svg className="w-4 h-4 shrink-0" style={{ color: 'var(--pn-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
