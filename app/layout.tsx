import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '../components/Sidebar';

export const metadata: Metadata = {
  title: 'Quantish Docs - Unified Prediction Market API',
  description: 'Unified REST API for Polymarket, Kalshi, and Limitless prediction markets. Search markets, place trades, manage wallets.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <Sidebar />
          <main
            className="transition-all duration-200"
            style={{
              marginLeft: '260px',
              minHeight: '100vh',
            }}
          >
            <div className="max-w-[900px] mx-auto px-6 py-12">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
