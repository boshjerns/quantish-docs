import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quantish - AI Prediction Market Infrastructure',
  description: 'Trade prediction markets with AI. Get API keys for Polymarket, Kalshi, and Discovery MCP servers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
              {/* ASCII Logo */}
              <div className="mb-3">
                <Link href="/" className="block">
                  <pre className="text-[10px] sm:text-xs leading-tight glow-cyan select-none" style={{ color: 'var(--cyan)' }}>
{`   ____                   _   _     _
  / __ \\                 | | (_)   | |
 | |  | |_   _  __ _ _ __| |_ _ ___| |__
 | |  | | | | |/ _\` | '_ \\  _| / __| '_ \\
 | |__| | |_| | (_| | | | | | | \\__ \\ | | |
  \\___\\_\\\\__,_|\\__,_|_| |_|_| |_|___/_| |_|`}
                  </pre>
                </Link>
                <div className="text-[10px] sm:text-xs mt-1" style={{ color: 'var(--fg-dim)' }}>
                  {'// AI prediction market infrastructure'}
                </div>
              </div>

              {/* Nav */}
              <nav className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[
                    { href: '/', label: 'get_keys' },
                    { href: '/agent', label: 'agent_docs' },
                    { href: '/skills', label: 'skills' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-3 py-1.5 text-xs transition-colors hover:bg-[var(--bg-elevated)]"
                      style={{ color: 'var(--fg-muted)' }}
                    >
                      [{item.label}]
                    </Link>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/joinQuantish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs transition-colors hover:opacity-80 hidden sm:block"
                    style={{ color: 'var(--fg-dim)' }}
                  >
                    github
                  </a>
                  <a
                    href="https://quantish.live"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs transition-colors hidden sm:block"
                    style={{ color: 'var(--cyan-dim)' }}
                  >
                    quantish.live
                  </a>
                </div>
              </nav>
            </div>
          </header>

          {/* Main */}
          <main className="flex-1">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t py-6" style={{ borderColor: 'var(--border)' }}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs" style={{ color: 'var(--fg-dim)' }}>
              <span>&copy; 2026 quantish</span>
              <div className="flex items-center gap-4">
                <a
                  href="https://x.com/joinQuantish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: 'var(--fg-dim)' }}
                >
                  @joinQuantish
                </a>
                <a
                  href="mailto:josh@quantish.live"
                  className="transition-colors"
                  style={{ color: 'var(--fg-dim)' }}
                >
                  josh@quantish.live
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
