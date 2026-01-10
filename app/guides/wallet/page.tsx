export default function WalletSetupPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Wallet Setup</h1>
        <p className="text-xl text-gray-600">
          Configure your trading wallet for Polymarket and Kalshi prediction markets.
        </p>
      </div>

      {/* Polymarket Wallet Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span> Polymarket Wallet
        </h2>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">How It Works</h3>
          <p className="text-gray-600 mb-4">
            Polymarket uses a Polygon-based wallet system with a Safe (Gnosis Safe) smart contract wallet
            for secure, gasless transactions. The MCP server manages wallet creation and CLOB credentials.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> Use <code className="bg-blue-100 px-1 rounded">setup_wallet</code> to deploy your Safe wallet
              and set up trading credentials. All transactions are gasless via Polymarket's relayer.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Setting Up Your Polymarket Wallet</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-600">
            <li>
              <strong>Get an API Key</strong> - Generate one from the{' '}
              <a href="/get-started" className="text-blue-600 hover:underline">Get Started</a> page (requires access code)
            </li>
            <li>
              <strong>Use the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">setup_wallet</code> tool</strong> -
              This deploys your Safe wallet and sets up CLOB credentials for trading
            </li>
            <li>
              <strong>Fund your wallet</strong> - Deposit USDC on Polygon to your Safe address
            </li>
            <li>
              <strong>Start trading</strong> - Use <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">place_order</code> to trade
            </li>
          </ol>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Wallet Tools</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <code className="text-purple-700 font-mono">setup_wallet</code>
              <p className="text-gray-600 text-sm mt-1">Deploy Safe wallet and set up CLOB credentials</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <code className="text-purple-700 font-mono">get_wallet_status</code>
              <p className="text-gray-600 text-sm mt-1">Check wallet deployment and approval status</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <code className="text-purple-700 font-mono">get_balances</code>
              <p className="text-gray-600 text-sm mt-1">Check USDC, Native USDC, and MATIC balances</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <code className="text-purple-700 font-mono">get_deposit_addresses</code>
              <p className="text-gray-600 text-sm mt-1">Get deposit addresses for funding your wallet</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <code className="text-purple-700 font-mono">export_private_key</code>
              <p className="text-gray-600 text-sm mt-1">Export wallet private key for backup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kalshi Wallet Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📈</span> Kalshi Wallet (Solana)
        </h2>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">How It Works</h3>
          <p className="text-gray-600 mb-4">
            Kalshi markets are accessed via DFlow on Solana. You'll need a Solana wallet (Ed25519 keypair) 
            to trade. The MCP server can generate one for you, or you can import an existing Phantom wallet.
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> Keep your wallet's private key secure. 
              If lost, you cannot recover funds. Export and backup your wallet immediately after creation.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Option 1: Generate New Wallet</h3>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
            <p className="text-gray-400"># Ask Claude to create a wallet</p>
            <p className="text-green-400">"Create a new Solana wallet for Kalshi trading with password: MySecurePass123"</p>
          </div>
          <p className="text-gray-600 text-sm mt-3">
            The wallet will be encrypted with your password and stored securely.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Option 2: Import from Phantom</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-600">
            <li>Open Phantom wallet → Settings → Security & Privacy</li>
            <li>Select "Show Secret Recovery Phrase" or export private key</li>
            <li>Use the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">kalshi_import_wallet</code> tool with your key</li>
          </ol>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto mt-4">
            <p className="text-gray-400"># Import existing Phantom wallet</p>
            <p className="text-green-400">"Import my Phantom wallet with private key: [your-base58-key] and password: MySecurePass123"</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Kalshi Wallet Tools</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <code className="text-green-700 font-mono">kalshi_setup_wallet</code>
              <p className="text-gray-600 text-sm mt-1">Generate a new Solana wallet for DFlow trading</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <code className="text-green-700 font-mono">kalshi_import_wallet</code>
              <p className="text-gray-600 text-sm mt-1">Import an existing Phantom/Solana wallet</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <code className="text-green-700 font-mono">kalshi_get_wallet_info</code>
              <p className="text-gray-600 text-sm mt-1">Get your Solana wallet's public key and type</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <code className="text-green-700 font-mono">kalshi_get_balances</code>
              <p className="text-gray-600 text-sm mt-1">Check SOL and USDC balances</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <code className="text-green-700 font-mono">kalshi_export_private_key</code>
              <p className="text-gray-600 text-sm mt-1">Export wallet private key for backup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">🔐</span> Security Best Practices
        </h2>
        
        <div className="grid gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Use Strong Passwords</h3>
            <p className="text-gray-600">
              Your wallet password encrypts your private key. Use at least 12 characters with 
              mixed case, numbers, and symbols.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Backup Your Wallet</h3>
            <p className="text-gray-600">
              Use <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">export_wallet</code> to 
              create an encrypted backup. Store it securely offline.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Never Share Private Keys</h3>
            <p className="text-gray-600">
              The MCP server never logs or transmits your private keys. Don't share them in chat 
              or with anyone claiming to be support.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Start Small</h3>
            <p className="text-gray-600">
              Test with small amounts first. Prediction markets involve risk - never trade more 
              than you can afford to lose.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <div className="flex flex-wrap gap-4">
          <a 
            href="/guides/trading"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Learn Trading →
          </a>
          <a 
            href="/reference/tools"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            View All Tools
          </a>
        </div>
      </section>
    </div>
  );
}

