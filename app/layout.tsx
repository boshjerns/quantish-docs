import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Quantish Docs - API & MCP Documentation',
  description: 'Documentation for Quantish prediction market APIs and MCP integrations for Polymarket, Kalshi, and Discovery services.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-isometric">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-8">
              <div className="max-w-4xl mx-auto">
                {children}
              </div>
            </main>
            <footer className="footer py-6 px-8">
              <div className="max-w-5xl mx-auto flex items-center justify-between text-sm">
                <div className="font-medium">© 2025 QUANTISH</div>
                <div className="flex items-center gap-6">
                  <a href="https://github.com/boshjerns/polymarket-mcp-server" className="font-bold uppercase tracking-wider hover:text-[hsl(var(--primary))] dark:hover:text-[hsl(var(--accent))] transition-colors">
                    GitHub
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
