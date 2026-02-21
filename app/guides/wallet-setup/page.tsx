import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wallet Setup - Quantish Docs',
  description: 'How to set up wallets on each platform.',
};

const Code = ({ children }: { children: string }) => (
  <pre
    className="p-4 rounded-lg text-xs font-mono overflow-x-auto my-3"
    style={{ background: 'var(--code-bg)', color: 'var(--code-text)' }}
  >
    {children}
  </pre>
);

export default function WalletSetupPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--pn-text)' }}>
        Wallet Setup
      </h1>
      <p className="text-lg mb-8" style={{ color: 'var(--pn-text-secondary)' }}>
        Each platform creates a wallet automatically. Here&apos;s how to set them up and fund them.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Polymarket (Polygon)
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-4" style={{ color: 'var(--pn-text-secondary)' }}>
          <li>Call <code className="text-xs bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">request_api_key</code> to create your account</li>
          <li>Call <code className="text-xs bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">setup_wallet</code> to deploy your Safe smart wallet</li>
          <li>Call <code className="text-xs bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">get_deposit_addresses</code> to get your deposit address</li>
          <li>Send USDC to that address on Polygon network</li>
        </ol>
        <Code>{`# Example: Get deposit address
get_deposit_addresses()
# Returns: { polygon: "0x...", solana: "...", bitcoin: "..." }`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Kalshi (Solana)
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-4" style={{ color: 'var(--pn-text-secondary)' }}>
          <li>Call <code className="text-xs bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">kalshi_signup</code> to create account and wallet</li>
          <li>Call <code className="text-xs bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">kalshi_get_deposit_address</code> for your Solana address</li>
          <li>Send SOL or USDC to that address</li>
        </ol>
        <p className="text-sm" style={{ color: 'var(--pn-text-muted)' }}>
          You need SOL for transaction fees. Even 0.1 SOL is enough for many transactions.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--pn-text)' }}>
          Limitless (Base)
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-4" style={{ color: 'var(--pn-text-secondary)' }}>
          <li>Call <code className="text-xs bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">limitless_signup</code> to create account</li>
          <li>Call <code className="text-xs bg-[var(--pn-elevated)] px-1.5 py-0.5 rounded">limitless_get_deposit_address</code> for your Base address</li>
          <li>Send ETH or USDC to that address on Base network</li>
        </ol>
      </section>

      <section className="card" style={{ background: 'var(--pn-accent-muted)' }}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--pn-accent)' }}>
          Bridging Between Platforms
        </h3>
        <p className="text-sm" style={{ color: 'var(--pn-text-secondary)' }}>
          Use the bridge tools to move USDC between Polygon (Polymarket) and Base (Limitless).
          Cross-chain transfers take 2-4 minutes via LI.FI.
        </p>
      </section>
    </div>
  );
}
