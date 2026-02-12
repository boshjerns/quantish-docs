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
          <header className="border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Q</span>
                  </div>
                  <span className="font-bold text-lg tracking-tight">Quantish</span>
                </Link>
                <nav className="flex items-center gap-1">
                  <Link
                    href="/"
                    className="px-3 py-1.5 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] rounded-md hover:bg-[hsl(var(--muted))] transition-colors"
                  >
                    Get Keys
                  </Link>
                  <Link
                    href="/agent"
                    className="px-3 py-1.5 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] rounded-md hover:bg-[hsl(var(--muted))] transition-colors"
                  >
                    Agent Docs
                  </Link>
                  <Link
                    href="/skills"
                    className="px-3 py-1.5 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] rounded-md hover:bg-[hsl(var(--muted))] transition-colors"
                  >
                    Skills
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/joinQuantish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors hidden sm:block"
                >
                  GitHub
                </a>
                <a
                  href="https://quantish.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors hidden sm:block"
                >
                  quantish.live
                </a>
              </div>
            </div>
          </header>

          {/* Main */}
          <main className="flex-1">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t border-[hsl(var(--border))] py-6">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between text-sm text-[hsl(var(--muted-foreground))]">
              <span>&copy; 2026 Quantish</span>
              <div className="flex items-center gap-4">
                <a href="https://x.com/quantishlive" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--foreground))] transition-colors">
                  @quantishlive
                </a>
                <a href="mailto:josh@quantish.live" className="hover:text-[hsl(var(--foreground))] transition-colors">
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
