import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantish Agent Docs - Complete Platform Reference',
  description: 'Everything an AI agent needs to connect to and trade on Quantish prediction market MCP servers.',
};

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="mb-12 scroll-mt-20">
    <h2 className="text-xl font-bold mb-4 pb-2 border-b border-[hsl(var(--border))]">{title}</h2>
    {children}
  </section>
);

const Code = ({ children }: { children: string }) => (
  <pre className="p-4 bg-zinc-900 text-green-400 rounded-lg text-xs font-mono overflow-x-auto my-3">
    {children}
  </pre>
);

const ToolRow = ({ name, desc, params }: { name: string; desc: string; params: string }) => (
  <tr className="border-b border-[hsl(var(--border))] last:border-0">
    <td className="py-2 pr-4">
      <code className="text-xs font-mono bg-[hsl(var(--muted))] px-1.5 py-0.5 rounded">{name}</code>
    </td>
    <td className="py-2 pr-4 text-sm text-[hsl(var(--muted-foreground))]">{desc}</td>
    <td className="py-2 text-xs font-mono text-[hsl(var(--muted-foreground))]">{params}</td>
  </tr>
);

export default function AgentDocsPage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Agent Documentation
        </h1>
        <p className="text-base text-[hsl(var(--muted-foreground))]">
          Complete reference for connecting AI agents to Quantish prediction market infrastructure.
          Three MCP servers, 50+ tools, Polymarket + Kalshi + cross-platform discovery.
        </p>
      </div>

      {/* TOC */}
      <nav className="card mb-10">
        <h3 className="text-sm font-semibold mb-3 text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Contents</h3>
        <div className="grid sm:grid-cols-2 gap-1">
          {[
            ['#overview', 'Overview'],
            ['#quickstart', 'Quick Start'],
            ['#authentication', 'Authentication'],
            ['#discovery-tools', 'Discovery MCP Tools'],
            ['#polymarket-tools', 'Polymarket MCP Tools'],
            ['#kalshi-tools', 'Kalshi MCP Tools'],
            ['#wallet-setup', 'Wallet Setup'],
            ['#trading', 'Trading Flow'],
            ['#endpoints', 'Server Endpoints'],
            ['#rate-limits', 'Rate Limits'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="text-sm text-[hsl(var(--primary))] hover:underline py-0.5">
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Overview */}
      <Section id="overview" title="Overview">
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
          Quantish provides three MCP (Model Context Protocol) servers for AI agents to interact with prediction markets:
        </p>
        <div className="space-y-3">
          <div className="card">
            <h3 className="font-semibold mb-1">Discovery MCP</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Search and explore markets across Polymarket and Kalshi. Read-only. No wallet needed.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-1">Polymarket MCP</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Full trading on Polymarket (Polygon). Wallet management, order placement, position tracking, token swaps and transfers. Creates a Safe smart wallet.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-1">Kalshi MCP</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Full trading on Kalshi via DFlow (Solana). Wallet management, market search, order placement, token swaps. Creates a Solana wallet or supports BYOW (bring your own wallet).
            </p>
          </div>
        </div>
      </Section>

      {/* Quick Start */}
      <Section id="quickstart" title="Quick Start">
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
          Get connected in 3 steps:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm mb-2">1. Get API keys</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
              Visit <a href="/" className="text-[hsl(var(--primary))] hover:underline">the home page</a> to generate keys for all three servers, or call the MCP signup tools directly:
            </p>
            <Code>{`# Discovery - via admin API
POST https://quantish-docs-production.up.railway.app/api/generate-discovery-key
{"email": "your@email.com"}

# Polymarket - via MCP
POST https://quantish-sdk-production.up.railway.app/mcp
{"jsonrpc":"2.0","id":1,"method":"tools/call",
 "params":{"name":"request_api_key","arguments":{"externalId":"your@email.com"}}}

# Kalshi - via MCP
POST https://kalshi-mcp-production-7c2c.up.railway.app/mcp
{"jsonrpc":"2.0","id":1,"method":"tools/call",
 "params":{"name":"kalshi_signup","arguments":{"externalId":"your@email.com"}}}`}</Code>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">2. Add to MCP config</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">Cursor / Windsurf (<code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">~/.cursor/mcp.json</code>):</p>
            <Code>{`{
  "mcpServers": {
    "quantish-discovery": {
      "url": "https://quantish.live/mcp",
      "headers": { "x-api-key": "YOUR_DISCOVERY_KEY" }
    },
    "quantish-polymarket": {
      "url": "https://quantish-sdk-production.up.railway.app/mcp",
      "headers": { "x-api-key": "YOUR_POLYMARKET_KEY" }
    },
    "quantish-kalshi": {
      "url": "https://kalshi-mcp-production-7c2c.up.railway.app/mcp",
      "headers": { "x-api-key": "YOUR_KALSHI_KEY" }
    }
  }
}`}</Code>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">3. Start trading</h3>
            <Code>{`# Search for markets
"Search for bitcoin prediction markets"

# Buy shares
"Buy $50 of YES on the BTC 100k market at 0.45"

# Check positions
"Show my Polymarket positions"

# Redeem winnings
"Claim my winnings from resolved markets"`}</Code>
          </div>
        </div>
      </Section>

      {/* Authentication */}
      <Section id="authentication" title="Authentication">
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
          All MCP servers use API key authentication via the <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">x-api-key</code> header.
        </p>
        <Code>{`# MCP request with auth
POST https://quantish.live/mcp
Headers:
  Content-Type: application/json
  x-api-key: YOUR_API_KEY

Body:
  {"jsonrpc":"2.0","id":1,"method":"tools/call",
   "params":{"name":"search_markets","arguments":{"query":"bitcoin"}}}`}</Code>
        <div className="card mt-4">
          <h3 className="font-semibold text-sm mb-2">Key format</h3>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Discovery keys: <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">qm_[32 chars]</code><br/>
            Polymarket keys: returned from <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">request_api_key</code> tool<br/>
            Kalshi keys: returned from <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">kalshi_signup</code> tool
          </p>
        </div>
      </Section>

      {/* Discovery Tools */}
      <Section id="discovery-tools" title="Discovery MCP Tools">
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
          Search and explore markets across Polymarket and Kalshi. Read-only, no wallet required.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Tool</th>
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Description</th>
                <th className="py-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Params</th>
              </tr>
            </thead>
            <tbody>
              <ToolRow name="search_markets" desc="Semantic AI-powered search across platforms. Returns prices." params="query, platform?, limit?, sortBy?" />
              <ToolRow name="get_market_details" desc="Get full market details with prices and resolution criteria" params="platform, marketId" />
              <ToolRow name="get_trending_markets" desc="Trending markets by 24h volume" params="platform?, category?, limit?" />
              <ToolRow name="get_categories" desc="List available market categories" params="-" />
              <ToolRow name="find_arbitrage" desc="Scan for arbitrage opportunities" params="type?, minProfitPercent?, category?" />
              <ToolRow name="find_markets_by_probability" desc="Filter by probability range" params="minProbability?, maxProbability?, platform?" />
              <ToolRow name="keyword_search" desc="Fast keyword search via PostgreSQL FTS" params="keywords, platform?, limit?" />
              <ToolRow name="query_markets_sql" desc="Advanced SQL-like query with filters" params="sql" />
              <ToolRow name="get_multi_option_market" desc="Get all options for multi-outcome events" params="eventIdentifier" />
              <ToolRow name="get_market_schema" desc="Get searchable fields schema" params="-" />
              <ToolRow name="get_market_stats" desc="Aggregate statistics" params="-" />
              <ToolRow name="xtracker_tweet_count" desc="Elon Musk tweet count from xtracker" params="handle?" />
            </tbody>
          </table>
        </div>
      </Section>

      {/* Polymarket Tools */}
      <Section id="polymarket-tools" title="Polymarket MCP Tools">
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
          Full trading on Polymarket (Polygon). Requires wallet setup after signup.
        </p>

        <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-6 mb-3">Account & Wallet</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="request_api_key" desc="Create account and get API key" params="externalId, keyName?" />
              <ToolRow name="setup_wallet" desc="Deploy Safe wallet + set approvals (gasless)" params="-" />
              <ToolRow name="get_wallet_status" desc="Wallet deployment state and addresses" params="-" />
              <ToolRow name="get_balances" desc="USDC, Native USDC, and MATIC balances" params="-" />
              <ToolRow name="get_deposit_addresses" desc="Get addresses for funding (multi-chain)" params="-" />
              <ToolRow name="export_private_key" desc="Export raw private key for backup" params="-" />
              <ToolRow name="import_private_key" desc="Import existing private key" params="externalId, privateKey" />
              <ToolRow name="set_approvals" desc="Set token approvals for trading" params="force?" />
              <ToolRow name="reset_credentials" desc="Reset CLOB API credentials" params="-" />
              <ToolRow name="validate_credentials" desc="Check if CLOB credentials are valid" params="-" />
              <ToolRow name="sync_balance" desc="Force CLOB balance re-sync" params="-" />
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-6 mb-3">Trading</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="place_order" desc="Place buy/sell order" params="conditionId, tokenId, side, price, size, orderType?" />
              <ToolRow name="cancel_order" desc="Cancel an existing order" params="orderId" />
              <ToolRow name="execute_atomic_orders" desc="Execute multiple orders atomically" params="orders[]" />
              <ToolRow name="get_orders" desc="List orders by status" params="status?" />
              <ToolRow name="sync_order_status" desc="Sync order with CLOB" params="orderId" />
              <ToolRow name="get_positions" desc="View current positions" params="-" />
              <ToolRow name="sync_positions" desc="Sync positions with Data API" params="-" />
              <ToolRow name="get_claimable_winnings" desc="Check for claimable winnings" params="-" />
              <ToolRow name="claim_winnings" desc="Claim winnings from resolved markets" params="positionId?" />
              <ToolRow name="merge_tokens" desc="Merge YES+NO tokens back to USDC" params="conditionId, amount?" />
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-6 mb-3">Market Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="get_orderbook" desc="View order book bids/asks" params="tokenId" />
              <ToolRow name="get_price" desc="Get midpoint price" params="tokenId" />
              <ToolRow name="get_onchain_shares" desc="Get all ERC-1155 shares on-chain" params="-" />
              <ToolRow name="check_token_balance" desc="Check specific token balance on-chain" params="tokenId" />
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-6 mb-3">Transfers & Swaps</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="transfer_usdc" desc="Send USDC (gasless)" params="toAddress, amount" />
              <ToolRow name="transfer_shares" desc="Send shares (gasless)" params="toAddress, tokenId, amount" />
              <ToolRow name="transfer_native_usdc" desc="Send Native USDC" params="toAddress, amount" />
              <ToolRow name="send_matic" desc="Send MATIC from EOA" params="toAddress, amount" />
              <ToolRow name="swap_tokens" desc="Swap MATIC/USDC/Native USDC via LI.FI" params="fromToken, toToken, amount" />
              <ToolRow name="get_swap_quote" desc="Get swap quote without executing" params="fromToken, toToken, amount" />
            </tbody>
          </table>
        </div>
      </Section>

      {/* Kalshi Tools */}
      <Section id="kalshi-tools" title="Kalshi MCP Tools">
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
          Trade CFTC-regulated prediction markets on Kalshi via DFlow (Solana). No access code required.
        </p>

        <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-6 mb-3">Account & Wallet</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="kalshi_signup" desc="Create account with new Solana wallet" params="externalId, keyName?" />
              <ToolRow name="kalshi_setup_wallet" desc="Generate a new Solana wallet" params="-" />
              <ToolRow name="kalshi_import_wallet" desc="Import encrypted Solana wallet" params="encryptedKey, salt, iv, publicKey" />
              <ToolRow name="kalshi_import_private_key" desc="Import raw private key" params="externalId, privateKey" />
              <ToolRow name="kalshi_get_wallet_info" desc="Wallet public key and type" params="-" />
              <ToolRow name="kalshi_get_wallet_status" desc="Full wallet status and health" params="-" />
              <ToolRow name="kalshi_get_balances" desc="SOL and USDC balances" params="-" />
              <ToolRow name="kalshi_get_deposit_address" desc="Get Solana address for deposits" params="-" />
              <ToolRow name="kalshi_export_private_key" desc="Export raw private key" params="-" />
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-6 mb-3">Markets</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="kalshi_search_markets" desc="Search Kalshi markets by keyword" params="query, limit?, marketStatus?" />
              <ToolRow name="kalshi_get_market" desc="Get market details by ticker" params="ticker" />
              <ToolRow name="kalshi_get_events" desc="List events with filters" params="category?, limit?, marketStatus?" />
              <ToolRow name="kalshi_get_event" desc="Get event with all nested markets" params="ticker" />
              <ToolRow name="kalshi_get_live_data" desc="Live pricing data" params="marketTicker" />
              <ToolRow name="kalshi_check_market_initialization" desc="Check if market is tokenized on-chain" params="ticker" />
              <ToolRow name="kalshi_initialize_market" desc="Initialize market on-chain (first trade)" params="outcomeMint" />
              <ToolRow name="kalshi_get_market_by_mint" desc="Look up market by token mint address" params="mintAddress" />
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-6 mb-3">Trading</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="kalshi_buy_yes" desc="Buy YES outcome tokens" params="marketTicker, yesOutcomeMint, usdcAmount" />
              <ToolRow name="kalshi_buy_no" desc="Buy NO outcome tokens" params="marketTicker, noOutcomeMint, usdcAmount" />
              <ToolRow name="kalshi_sell_position" desc="Sell outcome tokens back to USDC" params="outcomeMint, tokenAmount" />
              <ToolRow name="kalshi_get_quote" desc="Get buy/sell quote" params="inputMint, outputMint, amount" />
              <ToolRow name="kalshi_get_positions" desc="Get current positions" params="-" />
              <ToolRow name="kalshi_get_orders" desc="Order history" params="limit?, status?" />
              <ToolRow name="kalshi_check_redemption_status" desc="Check if market is settled" params="ticker" />
              <ToolRow name="kalshi_redeem_winnings" desc="Redeem winning tokens" params="outcomeMint, tokenAmount" />
              <ToolRow name="kalshi_get_redeemable_positions" desc="All redeemable positions" params="-" />
              <ToolRow name="kalshi_redeem_all_positions" desc="Redeem all winning positions" params="-" />
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mt-6 mb-3">Transfers & Swaps</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="kalshi_send_sol" desc="Send SOL to another wallet" params="toAddress, amount" />
              <ToolRow name="kalshi_send_usdc" desc="Send USDC to another wallet" params="toAddress, amount" />
              <ToolRow name="kalshi_send_token" desc="Send any SPL token" params="toAddress, mintAddress, amount, decimals" />
              <ToolRow name="kalshi_swap_sol_to_usdc" desc="Swap SOL to USDC" params="solAmount" />
              <ToolRow name="kalshi_swap_usdc_to_sol" desc="Swap USDC to SOL" params="usdcAmount" />
              <ToolRow name="kalshi_get_swap_quote" desc="Get Jupiter swap quote" params="inputMint, outputMint, amount" />
              <ToolRow name="kalshi_execute_swap" desc="Execute token swap via Jupiter" params="inputMint, outputMint, amount" />
              <ToolRow name="kalshi_get_token_holdings" desc="All SPL token holdings" params="-" />
            </tbody>
          </table>
        </div>
      </Section>

      {/* Wallet Setup */}
      <Section id="wallet-setup" title="Wallet Setup">
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-2">Polymarket (Polygon)</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
              After signup, call <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">setup_wallet</code> to deploy a Gnosis Safe smart wallet. This is gasless.
              The setup also creates CLOB API credentials and sets token approvals for USDC and CTF contracts.
            </p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Fund via deposit address (supports ETH, SOL, BTC, USDC on multiple chains &mdash; auto-converted to USDC.e on Polygon).
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Kalshi (Solana)</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
              Signup auto-generates a Solana wallet. Alternatively, import your own via <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">kalshi_import_private_key</code>.
            </p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Fund with SOL (for gas) and USDC (for trading) on Solana. Swap between them with <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">kalshi_swap_sol_to_usdc</code>.
            </p>
          </div>
        </div>
      </Section>

      {/* Trading */}
      <Section id="trading" title="Trading Flow">
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-2">Polymarket</h3>
            <ol className="text-sm text-[hsl(var(--muted-foreground))] space-y-1 list-decimal list-inside">
              <li>Search markets with Discovery or Polymarket tools</li>
              <li>Get market details including <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">conditionId</code> and <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">tokenId</code> for YES/NO</li>
              <li>Check orderbook and price</li>
              <li>Place order: <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">place_order(conditionId, tokenId, "BUY", price, size)</code></li>
              <li>Monitor with <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">get_positions</code> and <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">get_orders</code></li>
              <li>Claim resolved: <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">claim_winnings</code></li>
            </ol>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Kalshi</h3>
            <ol className="text-sm text-[hsl(var(--muted-foreground))] space-y-1 list-decimal list-inside">
              <li>Search markets: <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">kalshi_search_markets</code></li>
              <li>Get market details and outcome mints</li>
              <li>Buy: <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">kalshi_buy_yes(ticker, outcomeMint, usdcAmount)</code></li>
              <li>Sell: <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">kalshi_sell_position(outcomeMint, amount)</code></li>
              <li>After settlement: <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">kalshi_redeem_winnings</code> or <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">kalshi_redeem_all_positions</code></li>
            </ol>
          </div>
        </div>
      </Section>

      {/* Endpoints */}
      <Section id="endpoints" title="Server Endpoints">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Server</th>
                <th className="py-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">MCP Endpoint</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-2 pr-4 font-medium text-sm">Discovery</td>
                <td className="py-2 text-sm font-mono text-[hsl(var(--primary))]">https://quantish.live/mcp</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-2 pr-4 font-medium text-sm">Polymarket</td>
                <td className="py-2 text-sm font-mono text-[hsl(var(--primary))]">https://quantish-sdk-production.up.railway.app/mcp</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium text-sm">Kalshi</td>
                <td className="py-2 text-sm font-mono text-[hsl(var(--primary))]">https://kalshi-mcp-production-7c2c.up.railway.app/mcp</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-3">
          All endpoints accept JSON-RPC 2.0 over HTTPS POST. Auth via <code className="bg-[hsl(var(--muted))] px-1 py-0.5 rounded text-xs">x-api-key</code> header.
        </p>
      </Section>

      {/* Rate Limits */}
      <Section id="rate-limits" title="Rate Limits">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Server</th>
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Limit</th>
                <th className="py-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-2 pr-4 text-sm">Discovery</td>
                <td className="py-2 pr-4 text-sm font-mono">100 req/min</td>
                <td className="py-2 text-sm text-[hsl(var(--muted-foreground))]">Read-only operations</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-2 pr-4 text-sm">Polymarket</td>
                <td className="py-2 pr-4 text-sm font-mono">60 req/min</td>
                <td className="py-2 text-sm text-[hsl(var(--muted-foreground))]">Trading ops may have lower limits</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-sm">Kalshi</td>
                <td className="py-2 pr-4 text-sm font-mono">60 req/min</td>
                <td className="py-2 text-sm text-[hsl(var(--muted-foreground))]">Subject to DFlow API limits</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-3">
          Rate limit errors return HTTP 429. Retry with exponential backoff.
        </p>
      </Section>
    </div>
  );
}
