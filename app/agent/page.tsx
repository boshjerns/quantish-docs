import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantish Agent Docs - Complete Platform Reference',
  description: 'Everything an AI agent needs to connect to and trade on Quantish prediction market MCP servers.',
};

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="mb-12 scroll-mt-20">
    <h2
      className="text-lg font-bold mb-4 pb-2"
      style={{ borderBottom: '1px solid var(--border)', fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <span style={{ color: 'var(--cyan)' }}>## </span>{title}
    </h2>
    {children}
  </section>
);

const Code = ({ children }: { children: string }) => (
  <pre className="code-block my-3">{children}</pre>
);

const ToolRow = ({ name, desc, params }: { name: string; desc: string; params: string }) => (
  <tr style={{ borderBottom: '1px solid var(--border)' }}>
    <td className="py-2 pr-4">
      <code className="text-xs px-1.5 py-0.5" style={{ color: 'var(--cyan)', background: 'var(--bg)', border: '1px solid var(--border)' }}>
        {name}
      </code>
    </td>
    <td className="py-2 pr-4 text-xs" style={{ color: 'var(--fg-muted)' }}>{desc}</td>
    <td className="py-2 text-xs" style={{ color: 'var(--fg-dim)' }}>{params}</td>
  </tr>
);

export default function AgentDocsPage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <div className="text-xs mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'>'} docs.load(&quot;agent-reference&quot;) :: v3.0
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Agent Documentation
        </h1>
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
          Complete reference for connecting AI agents to Quantish prediction market infrastructure.
          <br />
          <span style={{ color: 'var(--fg-dim)' }}>4 MCP servers &middot; 100+ tools &middot; Polymarket + Kalshi + Limitless + Discovery</span>
        </p>
      </div>

      {/* TOC */}
      <nav className="card mb-10">
        <h3 className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>
          {'// TABLE OF CONTENTS'}
        </h3>
        <div className="grid sm:grid-cols-2 gap-1">
          {[
            ['#overview', 'overview'],
            ['#quickstart', 'quick_start'],
            ['#authentication', 'authentication'],
            ['#discovery-tools', 'discovery_mcp_tools'],
            ['#polymarket-tools', 'polymarket_mcp_tools'],
            ['#kalshi-tools', 'kalshi_mcp_tools'],
            ['#limitless-tools', 'limitless_mcp_tools'],
            ['#copy-trading', 'copy_trading'],
            ['#bridges', 'cross_chain_bridges'],
            ['#specialty-endpoints', 'specialty_endpoints'],
            ['#wallet-setup', 'wallet_setup'],
            ['#trading', 'trading_flow'],
            ['#endpoints', 'server_endpoints'],
            ['#rate-limits', 'rate_limits'],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-xs py-0.5 transition-colors hover:opacity-80"
              style={{ color: 'var(--cyan)' }}
            >
              {'>'} {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Overview */}
      <Section id="overview" title="Overview">
        <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
          Quantish provides four MCP (Model Context Protocol) servers for AI agents to interact with prediction markets:
        </p>
        <div className="space-y-3">
          <div className="card">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-sm">Discovery MCP</h3>
              <span className="tag tag-cyan">read-only</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
              Search and explore markets across Polymarket, Kalshi, and Limitless. Find related markets and wallet interest recommendations. No wallet needed.
            </p>
          </div>
          <div className="card">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-sm">Polymarket MCP</h3>
              <span className="tag tag-cyan">polygon</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
              Full trading on Polymarket. Wallet management, orders, positions, token swaps, transfers, copy trading, and cross-chain bridging. Creates a Safe smart wallet.
            </p>
          </div>
          <div className="card">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-sm">Kalshi MCP</h3>
              <span className="tag tag-cyan">solana</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
              Full trading on Kalshi via DFlow (Solana). Wallet management, markets, orders, token swaps. BYOW supported.
            </p>
          </div>
          <div className="card">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-sm">Limitless MCP</h3>
              <span className="tag tag-cyan">base</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
              Trade prediction markets on Base chain via Limitless Exchange. CLOB orders, multi-outcome markets, Base token trading, and cross-chain bridging.
            </p>
          </div>
        </div>
      </Section>

      {/* Quick Start */}
      <Section id="quickstart" title="Quick Start">
        <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>Get connected in 3 steps:</p>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-xs mb-2">
              <span style={{ color: 'var(--cyan)' }}>01</span> Get API keys
            </h3>
            <p className="text-xs mb-2" style={{ color: 'var(--fg-muted)' }}>
              Visit <a href="/" className="transition-colors hover:opacity-80" style={{ color: 'var(--cyan)' }}>the home page</a> or call MCP signup tools directly:
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
 "params":{"name":"kalshi_signup","arguments":{"externalId":"your@email.com"}}}

# Limitless - via MCP
POST https://limitless-mcp-server-production.up.railway.app/mcp
{"jsonrpc":"2.0","id":1,"method":"tools/call",
 "params":{"name":"limitless_signup","arguments":{"externalId":"your@email.com"}}}`}</Code>
          </div>
          <div>
            <h3 className="font-bold text-xs mb-2">
              <span style={{ color: 'var(--cyan)' }}>02</span> Add to MCP config
            </h3>
            <p className="text-xs mb-2" style={{ color: 'var(--fg-muted)' }}>
              Cursor / Windsurf (<code style={{ color: 'var(--fg)' }}>~/.cursor/mcp.json</code>):
            </p>
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
    },
    "quantish-limitless": {
      "url": "https://limitless-mcp-server-production.up.railway.app/mcp",
      "headers": { "x-api-key": "YOUR_LIMITLESS_KEY" }
    }
  }
}`}</Code>
          </div>
          <div>
            <h3 className="font-bold text-xs mb-2">
              <span style={{ color: 'var(--cyan)' }}>03</span> Start trading
            </h3>
            <Code>{`# Search for markets
"Search for bitcoin prediction markets"

# Buy shares
"Buy $50 of YES on the BTC 100k market at 0.45"

# Check positions
"Show my Polymarket positions"

# Copy a whale
"Follow the top Polymarket trader with $2 per trade"

# Redeem winnings
"Claim my winnings from resolved markets"`}</Code>
          </div>
        </div>
      </Section>

      {/* Authentication */}
      <Section id="authentication" title="Authentication">
        <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
          All MCP servers use API key authentication via the <code style={{ color: 'var(--cyan)' }}>x-api-key</code> header.
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
          <h3 className="font-bold text-xs mb-2">Key format</h3>
          <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
            Discovery keys: <code style={{ color: 'var(--green)' }}>qm_[32 chars]</code><br/>
            Polymarket keys: returned from <code style={{ color: 'var(--green)' }}>request_api_key</code> tool<br/>
            Kalshi keys: returned from <code style={{ color: 'var(--green)' }}>kalshi_signup</code> tool<br/>
            Limitless keys: returned from <code style={{ color: 'var(--green)' }}>limitless_signup</code> tool
          </p>
        </div>
      </Section>

      {/* Discovery Tools */}
      <Section id="discovery-tools" title="Discovery MCP Tools">
        <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
          Search and explore markets across Polymarket, Kalshi, and Limitless. Read-only, no wallet required.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-bright)' }}>
                <th className="py-2 pr-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Tool</th>
                <th className="py-2 pr-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Description</th>
                <th className="py-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Params</th>
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
              <ToolRow name="find_related_markets" desc="Find semantically similar markets via embeddings" params="markets[], platform?, limit?" />
              <ToolRow name="get_wallet_interests" desc="Analyze wallet trades and recommend related markets" params="wallet, platform?, limit?, recencyDays?" />
            </tbody>
          </table>
        </div>
      </Section>

      {/* Polymarket Tools */}
      <Section id="polymarket-tools" title="Polymarket MCP Tools">
        <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
          Full trading on Polymarket (Polygon). Requires wallet setup after signup.
        </p>

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// ACCOUNT & WALLET'}
        </h3>
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
              <ToolRow name="list_api_keys" desc="List all API keys for account" params="-" />
              <ToolRow name="create_additional_api_key" desc="Create another API key" params="keyName?" />
              <ToolRow name="revoke_api_key" desc="Revoke an API key" params="keyId" />
              <ToolRow name="recover_safe_address" desc="Recover Safe wallet address from chain" params="-" />
            </tbody>
          </table>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// TRADING'}
        </h3>
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

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// MARKET DATA'}
        </h3>
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

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// TRANSFERS & SWAPS'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="transfer_usdc" desc="Send USDC (gasless)" params="toAddress, amount" />
              <ToolRow name="transfer_shares" desc="Send shares (gasless)" params="toAddress, tokenId, amount" />
              <ToolRow name="transfer_native_usdc" desc="Send Native USDC" params="toAddress, amount" />
              <ToolRow name="transfer_matic" desc="Send MATIC from EOA" params="toAddress, amount" />
              <ToolRow name="send_matic" desc="Send MATIC (alias)" params="toAddress, amount" />
              <ToolRow name="swap_tokens" desc="Swap MATIC/USDC/Native USDC via LI.FI" params="fromToken, toToken, amount" />
              <ToolRow name="get_swap_quote" desc="Get swap quote without executing" params="fromToken, toToken, amount" />
            </tbody>
          </table>
        </div>
      </Section>

      {/* Kalshi Tools */}
      <Section id="kalshi-tools" title="Kalshi MCP Tools">
        <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
          Trade CFTC-regulated prediction markets on Kalshi via DFlow (Solana). No access code required.
        </p>

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// ACCOUNT & WALLET'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="kalshi_signup" desc="Create account with new Solana wallet" params="externalId, keyName?" />
              <ToolRow name="kalshi_request_api_key" desc="Get new key for existing user" params="externalId" />
              <ToolRow name="kalshi_setup_wallet" desc="Generate a new Solana wallet" params="-" />
              <ToolRow name="kalshi_import_wallet" desc="Import encrypted Solana wallet" params="encryptedKey, salt, iv, publicKey" />
              <ToolRow name="kalshi_import_private_key" desc="Import raw private key" params="externalId, privateKey" />
              <ToolRow name="kalshi_get_wallet_info" desc="Wallet public key and type" params="-" />
              <ToolRow name="kalshi_get_wallet_status" desc="Full wallet status and health" params="-" />
              <ToolRow name="kalshi_get_balances" desc="SOL and USDC balances" params="-" />
              <ToolRow name="kalshi_get_deposit_address" desc="Get Solana address for deposits" params="-" />
              <ToolRow name="kalshi_export_private_key" desc="Export raw private key" params="-" />
              <ToolRow name="kalshi_get_wallet_import_instructions" desc="How to export from Phantom" params="-" />
              <ToolRow name="kalshi_list_api_keys" desc="List all API keys" params="-" />
              <ToolRow name="kalshi_create_additional_api_key" desc="Create another API key" params="keyName?" />
              <ToolRow name="kalshi_revoke_api_key" desc="Revoke an API key" params="keyId" />
            </tbody>
          </table>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// MARKETS'}
        </h3>
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

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// TRADING'}
        </h3>
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

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// TRANSFERS & SWAPS'}
        </h3>
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
              <ToolRow name="kalshi_search_tokens" desc="Search for SPL tokens" params="query" />
              <ToolRow name="kalshi_get_token_info" desc="Token details by mint address" params="mintAddress" />
              <ToolRow name="kalshi_get_trending_tokens" desc="Trending Solana tokens" params="-" />
              <ToolRow name="kalshi_swap_tokens" desc="Swap any SPL token pair" params="fromToken, toToken, amount" />
              <ToolRow name="kalshi_get_token_quote" desc="Quote without executing" params="fromToken, toToken, amount" />
              <ToolRow name="kalshi_get_token_balance" desc="Any token balance" params="symbol or address" />
            </tbody>
          </table>
        </div>
      </Section>

      {/* Limitless Tools */}
      <Section id="limitless-tools" title="Limitless MCP Tools">
        <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
          Trade prediction markets on Base chain via Limitless Exchange. Binary and multi-outcome markets with CLOB orders and on-chain settlement.
        </p>

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// ACCOUNT & WALLET'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="limitless_signup" desc="Create account with Base wallet" params="externalId, keyName?" />
              <ToolRow name="limitless_request_api_key" desc="Get new key for existing user" params="externalId" />
              <ToolRow name="limitless_setup_wallet" desc="Generate new Base wallet" params="-" />
              <ToolRow name="limitless_import_wallet" desc="Import encrypted wallet bundle" params="encryptedBundle" />
              <ToolRow name="limitless_get_wallet_import_instructions" desc="How to export from MetaMask" params="-" />
              <ToolRow name="limitless_import_private_key" desc="Import raw private key" params="privateKey" />
              <ToolRow name="limitless_get_wallet_info" desc="Wallet address and type" params="-" />
              <ToolRow name="limitless_get_wallet_status" desc="Full status with balances" params="-" />
              <ToolRow name="limitless_get_balances" desc="ETH + USDC balances on Base" params="-" />
              <ToolRow name="limitless_get_deposit_address" desc="Base address for deposits" params="-" />
              <ToolRow name="limitless_export_private_key" desc="Export wallet key" params="-" />
              <ToolRow name="limitless_list_api_keys" desc="List all API keys" params="-" />
              <ToolRow name="limitless_create_api_key" desc="Create additional key" params="keyName?" />
              <ToolRow name="limitless_revoke_api_key" desc="Revoke a key" params="keyId" />
            </tbody>
          </table>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// MARKET DISCOVERY'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="limitless_get_markets" desc="List active markets (paginated)" params="limit?, offset?, category?" />
              <ToolRow name="limitless_search_markets" desc="Semantic search for markets" params="query, limit?" />
              <ToolRow name="limitless_get_market" desc="Market details by slug" params="slug" />
              <ToolRow name="limitless_get_orderbook" desc="CLOB orderbook for a market" params="slug" />
              <ToolRow name="limitless_get_price_history" desc="Historical prices" params="slug, interval?" />
              <ToolRow name="limitless_get_categories" desc="Categories with counts" params="-" />
            </tbody>
          </table>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// TRADING'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="limitless_place_order" desc="Limit order on CLOB market" params="slug, side, price, size" />
              <ToolRow name="limitless_cancel_order" desc="Cancel single order" params="orderId" />
              <ToolRow name="limitless_cancel_all_orders" desc="Cancel all orders in a market" params="slug" />
              <ToolRow name="limitless_get_orders" desc="Orders for a market" params="slug" />
              <ToolRow name="limitless_get_all_orders" desc="All live orders" params="-" />
              <ToolRow name="limitless_check_approvals" desc="Check USDC/CTF approvals" params="slug" />
              <ToolRow name="limitless_set_approvals" desc="Approve trading tokens" params="slug" />
              <ToolRow name="limitless_get_quote" desc="Estimate fill price" params="slug, side, size" />
            </tbody>
          </table>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// POSITIONS'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="limitless_get_positions" desc="Active positions with P&L" params="-" />
              <ToolRow name="limitless_get_trades" desc="Trade history" params="-" />
              <ToolRow name="limitless_get_portfolio_history" desc="Full activity history" params="-" />
              <ToolRow name="limitless_sync_positions" desc="Refresh from API" params="-" />
              <ToolRow name="limitless_get_onchain_shares" desc="Scan blockchain for ERC-1155 tokens" params="-" />
              <ToolRow name="limitless_check_token_balance" desc="Check specific token balance" params="tokenId" />
              <ToolRow name="limitless_get_public_positions" desc="Any wallet's positions (public)" params="address" />
            </tbody>
          </table>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// TRANSFERS'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="limitless_send_eth" desc="Send ETH on Base" params="to, amount" />
              <ToolRow name="limitless_send_usdc" desc="Send USDC on Base" params="to, amount" />
            </tbody>
          </table>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// TOKEN TRADING'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="limitless_search_tokens" desc="Search Base tokens" params="query" />
              <ToolRow name="limitless_get_token_info" desc="Token details (price, vol)" params="address" />
              <ToolRow name="limitless_get_trending_tokens" desc="Hot Base meme coins" params="-" />
              <ToolRow name="limitless_swap_tokens" desc="Swap any Base token pair" params="fromToken, toToken, amount" />
              <ToolRow name="limitless_get_swap_quote" desc="Quote without executing" params="fromToken, toToken, amount" />
              <ToolRow name="limitless_approve_token" desc="Manual ERC-20 approval" params="tokenAddress" />
              <ToolRow name="limitless_get_token_balance" desc="Any token balance" params="symbol or address" />
              <ToolRow name="limitless_get_token_holdings" desc="All ERC-20 holdings" params="-" />
            </tbody>
          </table>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// REDEMPTION'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="limitless_get_redeemable_positions" desc="Find settled winners" params="-" />
              <ToolRow name="limitless_redeem_winnings" desc="Redeem specific market" params="slug" />
              <ToolRow name="limitless_redeem_all" desc="Redeem all winners" params="-" />
            </tbody>
          </table>
        </div>
      </Section>

      {/* Copy Trading */}
      <Section id="copy-trading" title="Copy Trading">
        <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
          Automatically mirror trades from top Polymarket wallets. Subscribe to any wallet address and the engine detects trades via WebSocket (sub-second latency) and mirrors them as FOK orders.
        </p>

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// COPY TRADE TOOLS (Polymarket MCP)'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-bright)' }}>
                <th className="py-2 pr-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Tool</th>
                <th className="py-2 pr-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Description</th>
                <th className="py-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Params</th>
              </tr>
            </thead>
            <tbody>
              <ToolRow name="copy_trade_follow" desc="Subscribe to copy a target wallet" params="targetWallet, allocationMode, allocationValue, maxPerTrade?, minTriggerSize?, marketFilter?" />
              <ToolRow name="copy_trade_unfollow" desc="Stop copying a wallet" params="targetWallet" />
              <ToolRow name="copy_trade_list" desc="List subscriptions with stats" params="-" />
              <ToolRow name="copy_trade_update" desc="Update allocation/filters/pause" params="targetWallet, ..." />
              <ToolRow name="copy_trade_history" desc="Execution history with latency" params="limit?" />
              <ToolRow name="copy_trade_status" desc="Engine health and monitor count" params="-" />
            </tbody>
          </table>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider mt-6 mb-3" style={{ color: 'var(--fg-dim)' }}>
          {'// TRADER DISCOVERY (Polymarket MCP)'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody>
              <ToolRow name="get_top_traders" desc="Leaderboard by PNL or volume" params="category?, timePeriod?, orderBy?, limit?" />
              <ToolRow name="get_trader_profile" desc="Public trader profile and stats" params="wallet" />
            </tbody>
          </table>
        </div>

        <div className="card mt-4">
          <h3 className="font-bold text-xs mb-2">Copy trading flow</h3>
          <ol className="text-xs space-y-1 list-decimal list-inside" style={{ color: 'var(--fg-muted)' }}>
            <li>Find targets: <code style={{ color: 'var(--green)' }}>get_top_traders</code> or <code style={{ color: 'var(--green)' }}>get_trader_profile(wallet)</code></li>
            <li>Subscribe: <code style={{ color: 'var(--green)' }}>copy_trade_follow(targetWallet, &quot;FIXED_AMOUNT&quot;, 5)</code></li>
            <li>Monitor: <code style={{ color: 'var(--green)' }}>copy_trade_list</code> and <code style={{ color: 'var(--green)' }}>copy_trade_history</code></li>
            <li>Adjust: <code style={{ color: 'var(--green)' }}>copy_trade_update(targetWallet, ...)</code></li>
            <li>Stop: <code style={{ color: 'var(--green)' }}>copy_trade_unfollow(targetWallet)</code></li>
          </ol>
        </div>
      </Section>

      {/* Bridges */}
      <Section id="bridges" title="Cross-Chain Bridges">
        <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
          Move funds between chains via LI.FI. Bridge USDC between Polygon (Polymarket) and Base (Limitless).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-bright)' }}>
                <th className="py-2 pr-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Tool</th>
                <th className="py-2 pr-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Server</th>
                <th className="py-2 pr-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Description</th>
                <th className="py-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Params</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4">
                  <code className="text-xs px-1.5 py-0.5" style={{ color: 'var(--cyan)', background: 'var(--bg)', border: '1px solid var(--border)' }}>bridge_quote</code>
                </td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--fg-dim)' }}>Polymarket</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--fg-muted)' }}>Quote Polygon to Base bridge</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-dim)' }}>amount, toAddress?</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4">
                  <code className="text-xs px-1.5 py-0.5" style={{ color: 'var(--cyan)', background: 'var(--bg)', border: '1px solid var(--border)' }}>bridge_execute</code>
                </td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--fg-dim)' }}>Polymarket</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--fg-muted)' }}>Execute Polygon to Base bridge via LI.FI</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-dim)' }}>amount, toAddress?</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4">
                  <code className="text-xs px-1.5 py-0.5" style={{ color: 'var(--cyan)', background: 'var(--bg)', border: '1px solid var(--border)' }}>limitless_bridge_quote</code>
                </td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--fg-dim)' }}>Limitless</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--fg-muted)' }}>Quote Base to Polygon bridge</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-dim)' }}>amount, toAddress?</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4">
                  <code className="text-xs px-1.5 py-0.5" style={{ color: 'var(--cyan)', background: 'var(--bg)', border: '1px solid var(--border)' }}>limitless_bridge_execute</code>
                </td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--fg-dim)' }}>Limitless</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--fg-muted)' }}>Execute Base to Polygon bridge via LI.FI</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-dim)' }}>amount, toAddress?</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card mt-4">
          <h3 className="font-bold text-xs mb-2">Bridge flow</h3>
          <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
            Use <code style={{ color: 'var(--green)' }}>toAddress</code> to bridge to a different wallet (e.g., Limitless Base wallet to Polymarket Safe). Without it, funds stay in the same wallet on the destination chain.
          </p>
        </div>
      </Section>

      {/* Specialty Endpoints */}
      <Section id="specialty-endpoints" title="Specialty Endpoints">
        <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
          Public REST API endpoints on quantish.live. No authentication required. Rate-limited by IP.
          Designed for AI agents and builders who want recommendation data without MCP.
        </p>

        <div className="card mb-6">
          <h3 className="font-bold text-sm mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Related Markets
          </h3>
          <Code>{`GET https://quantish.live/api/markets/related?markets=slug1,slug2&platform=all&limit=20`}</Code>
          <p className="text-xs mb-3" style={{ color: 'var(--fg-muted)' }}>
            Find semantically related prediction markets across all platforms using vector embeddings. Pass slugs, conditionIds, or event tickers.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-bright)' }}>
                  <th className="py-1 pr-4" style={{ color: 'var(--fg-dim)' }}>Param</th>
                  <th className="py-1 pr-4" style={{ color: 'var(--fg-dim)' }}>Required</th>
                  <th className="py-1" style={{ color: 'var(--fg-dim)' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="py-1 pr-4" style={{ color: 'var(--cyan)' }}>markets</td>
                  <td className="py-1 pr-4" style={{ color: 'var(--yellow)' }}>yes</td>
                  <td className="py-1" style={{ color: 'var(--fg-muted)' }}>Comma-separated slugs, conditionIds, or eventTickers (max 10)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="py-1 pr-4" style={{ color: 'var(--cyan)' }}>platform</td>
                  <td className="py-1 pr-4" style={{ color: 'var(--fg-dim)' }}>no</td>
                  <td className="py-1" style={{ color: 'var(--fg-muted)' }}>&quot;polymarket&quot;, &quot;kalshi&quot;, &quot;limitless&quot;, or &quot;all&quot; (default)</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4" style={{ color: 'var(--cyan)' }}>limit</td>
                  <td className="py-1 pr-4" style={{ color: 'var(--fg-dim)' }}>no</td>
                  <td className="py-1" style={{ color: 'var(--fg-muted)' }}>1-50 (default 20)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Code>{`// Response
{
  "results": [{
    "id": "...",
    "platform": "polymarket",
    "title": "Will Bitcoin reach $150k by June?",
    "relevanceScore": 0.87,
    "volume": 245000,
    "endDate": "2026-06-30",
    "category": "Crypto",
    "slug": "will-bitcoin-reach-150k",
    "url": "https://polymarket.com/event/...",
    "image": "https://..."
  }],
  "count": 20,
  "meta": {
    "algorithm": "centroid_embedding",
    "searchTimeMs": 142,
    "inputMarkets": 2
  }
}`}</Code>
          <p className="text-xs" style={{ color: 'var(--fg-dim)' }}>
            Rate limit: 30 requests/min per IP
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold text-sm mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Wallet Interests
          </h3>
          <Code>{`GET https://quantish.live/api/markets/interests?wallet=0x...&platform=all&limit=20&recency=30`}</Code>
          <p className="text-xs mb-3" style={{ color: 'var(--fg-muted)' }}>
            Analyze a Polymarket wallet&apos;s trading history and recommend related markets they haven&apos;t traded yet.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-bright)' }}>
                  <th className="py-1 pr-4" style={{ color: 'var(--fg-dim)' }}>Param</th>
                  <th className="py-1 pr-4" style={{ color: 'var(--fg-dim)' }}>Required</th>
                  <th className="py-1" style={{ color: 'var(--fg-dim)' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="py-1 pr-4" style={{ color: 'var(--cyan)' }}>wallet</td>
                  <td className="py-1 pr-4" style={{ color: 'var(--yellow)' }}>yes</td>
                  <td className="py-1" style={{ color: 'var(--fg-muted)' }}>Ethereum address (0x...)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="py-1 pr-4" style={{ color: 'var(--cyan)' }}>platform</td>
                  <td className="py-1 pr-4" style={{ color: 'var(--fg-dim)' }}>no</td>
                  <td className="py-1" style={{ color: 'var(--fg-muted)' }}>&quot;polymarket&quot;, &quot;kalshi&quot;, &quot;limitless&quot;, or &quot;all&quot; (default)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="py-1 pr-4" style={{ color: 'var(--cyan)' }}>limit</td>
                  <td className="py-1 pr-4" style={{ color: 'var(--fg-dim)' }}>no</td>
                  <td className="py-1" style={{ color: 'var(--fg-muted)' }}>1-50 (default 20)</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4" style={{ color: 'var(--cyan)' }}>recency</td>
                  <td className="py-1 pr-4" style={{ color: 'var(--fg-dim)' }}>no</td>
                  <td className="py-1" style={{ color: 'var(--fg-muted)' }}>Days of trade history to weight (1-365, default 30)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Code>{`// Response
{
  "results": [{
    "id": "...",
    "platform": "kalshi",
    "title": "Fed rate cut in March?",
    "relevanceScore": 0.82,
    "volume": 180000,
    "endDate": "2026-03-20",
    "category": "Economics",
    "slug": "FED-26MAR-T4.375",
    "url": "https://kalshi.com/markets/..."
  }],
  "count": 20,
  "profile": {
    "tradesAnalyzed": 47,
    "distinctMarkets": 12,
    "topCategories": ["Crypto", "Economics", "Politics"],
    "tradingPeriod": "28 days"
  },
  "meta": {
    "algorithm": "weighted_interest_centroid",
    "searchTimeMs": 380
  }
}`}</Code>
          <p className="text-xs" style={{ color: 'var(--fg-dim)' }}>
            Rate limit: 10 requests/min per IP
          </p>
        </div>
      </Section>

      {/* Wallet Setup */}
      <Section id="wallet-setup" title="Wallet Setup">
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-sm">Polymarket</h3>
              <span className="tag tag-cyan">polygon</span>
            </div>
            <p className="text-xs mb-2" style={{ color: 'var(--fg-muted)' }}>
              After signup, call <code style={{ color: 'var(--green)' }}>setup_wallet</code> to deploy a Gnosis Safe smart wallet. Gasless.
              Creates CLOB API credentials and sets token approvals for USDC and CTF contracts.
            </p>
            <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
              Fund via deposit address (supports ETH, SOL, BTC, USDC on multiple chains &mdash; auto-converted to USDC.e on Polygon).
            </p>
          </div>
          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-sm">Kalshi</h3>
              <span className="tag tag-cyan">solana</span>
            </div>
            <p className="text-xs mb-2" style={{ color: 'var(--fg-muted)' }}>
              Signup auto-generates a Solana wallet. Or import your own via <code style={{ color: 'var(--green)' }}>kalshi_import_private_key</code>.
            </p>
            <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
              Fund with SOL (for gas) and USDC (for trading) on Solana. Swap between them with <code style={{ color: 'var(--green)' }}>kalshi_swap_sol_to_usdc</code>.
            </p>
          </div>
          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-sm">Limitless</h3>
              <span className="tag tag-cyan">base</span>
            </div>
            <p className="text-xs mb-2" style={{ color: 'var(--fg-muted)' }}>
              Signup auto-generates a Base chain wallet. Or import your own via <code style={{ color: 'var(--green)' }}>limitless_import_private_key</code>.
            </p>
            <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
              Fund with ETH (for gas) and USDC (for trading) on Base. Deposit to the address returned by <code style={{ color: 'var(--green)' }}>limitless_get_deposit_address</code>.
            </p>
          </div>
        </div>
      </Section>

      {/* Trading */}
      <Section id="trading" title="Trading Flow">
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-sm">Polymarket</h3>
              <span className="tag tag-cyan">polygon</span>
            </div>
            <ol className="text-xs space-y-1 list-decimal list-inside" style={{ color: 'var(--fg-muted)' }}>
              <li>Search markets with Discovery or Polymarket tools</li>
              <li>Get market details including <code style={{ color: 'var(--green)' }}>conditionId</code> and <code style={{ color: 'var(--green)' }}>tokenId</code> for YES/NO</li>
              <li>Check orderbook and price</li>
              <li>Place order: <code style={{ color: 'var(--green)' }}>place_order(conditionId, tokenId, &quot;BUY&quot;, price, size)</code></li>
              <li>Monitor with <code style={{ color: 'var(--green)' }}>get_positions</code> and <code style={{ color: 'var(--green)' }}>get_orders</code></li>
              <li>Claim resolved: <code style={{ color: 'var(--green)' }}>claim_winnings</code></li>
            </ol>
          </div>
          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-sm">Kalshi</h3>
              <span className="tag tag-cyan">solana</span>
            </div>
            <ol className="text-xs space-y-1 list-decimal list-inside" style={{ color: 'var(--fg-muted)' }}>
              <li>Search markets: <code style={{ color: 'var(--green)' }}>kalshi_search_markets</code></li>
              <li>Get market details and outcome mints</li>
              <li>Buy: <code style={{ color: 'var(--green)' }}>kalshi_buy_yes(ticker, outcomeMint, usdcAmount)</code></li>
              <li>Sell: <code style={{ color: 'var(--green)' }}>kalshi_sell_position(outcomeMint, amount)</code></li>
              <li>After settlement: <code style={{ color: 'var(--green)' }}>kalshi_redeem_winnings</code> or <code style={{ color: 'var(--green)' }}>kalshi_redeem_all_positions</code></li>
            </ol>
          </div>
          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-sm">Limitless</h3>
              <span className="tag tag-cyan">base</span>
            </div>
            <ol className="text-xs space-y-1 list-decimal list-inside" style={{ color: 'var(--fg-muted)' }}>
              <li>Search markets: <code style={{ color: 'var(--green)' }}>limitless_search_markets</code></li>
              <li>Get details: <code style={{ color: 'var(--green)' }}>limitless_get_market(slug)</code></li>
              <li>Check approvals: <code style={{ color: 'var(--green)' }}>limitless_check_approvals</code> + <code style={{ color: 'var(--green)' }}>limitless_set_approvals</code></li>
              <li>Get quote: <code style={{ color: 'var(--green)' }}>limitless_get_quote(slug, side, size)</code></li>
              <li>Place order: <code style={{ color: 'var(--green)' }}>limitless_place_order(slug, side, price, size)</code></li>
              <li>Monitor: <code style={{ color: 'var(--green)' }}>limitless_get_positions</code></li>
              <li>Claim: <code style={{ color: 'var(--green)' }}>limitless_redeem_winnings(slug)</code></li>
            </ol>
          </div>
        </div>
      </Section>

      {/* Endpoints */}
      <Section id="endpoints" title="Server Endpoints">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-bright)' }}>
                <th className="py-2 pr-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Server</th>
                <th className="py-2 pr-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Endpoint</th>
                <th className="py-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4 font-bold text-xs">Discovery</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--cyan)' }}>https://quantish.live/mcp</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-muted)' }}>Cross-platform search</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4 font-bold text-xs">Polymarket</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--cyan)' }}>https://quantish-sdk-production.up.railway.app/mcp</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-muted)' }}>Polygon trading</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4 font-bold text-xs">Kalshi</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--cyan)' }}>https://kalshi-mcp-production-7c2c.up.railway.app/mcp</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-muted)' }}>Solana/DFlow trading</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4 font-bold text-xs">Limitless</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--cyan)' }}>https://limitless-mcp-server-production.up.railway.app/mcp</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-muted)' }}>Base chain trading</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-bold text-xs">REST API</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--cyan)' }}>https://quantish.live/api/markets/*</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-muted)' }}>Public endpoints (no auth)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--fg-dim)' }}>
          MCP endpoints accept JSON-RPC 2.0 over HTTPS POST. Auth via <code style={{ color: 'var(--cyan)' }}>x-api-key</code> header.
          REST endpoints accept standard GET requests with query params. No auth required.
        </p>
      </Section>

      {/* Rate Limits */}
      <Section id="rate-limits" title="Rate Limits">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-bright)' }}>
                <th className="py-2 pr-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Server</th>
                <th className="py-2 pr-4 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Limit</th>
                <th className="py-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-dim)' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4 text-xs">Discovery</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--green)' }}>100 req/min</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-muted)' }}>Read-only operations</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4 text-xs">Polymarket</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--yellow)' }}>60 req/min</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-muted)' }}>Trading ops may have lower limits</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4 text-xs">Kalshi</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--yellow)' }}>60 req/min</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-muted)' }}>Subject to DFlow API limits</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4 text-xs">Limitless</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--yellow)' }}>60 req/min</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-muted)' }}>Base chain operations</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 pr-4 text-xs">REST /api/markets/related</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--green)' }}>30 req/min</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-muted)' }}>Per IP, no auth needed</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-xs">REST /api/markets/interests</td>
                <td className="py-2 pr-4 text-xs" style={{ color: 'var(--green)' }}>10 req/min</td>
                <td className="py-2 text-xs" style={{ color: 'var(--fg-muted)' }}>Per IP, no auth needed</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--fg-dim)' }}>
          Rate limit errors return HTTP 429. Retry with exponential backoff.
        </p>
      </Section>
    </div>
  );
}
