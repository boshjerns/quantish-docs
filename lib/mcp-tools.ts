// ============================================
// MCP TOOLS REGISTRY
// All 170 MCP tools across 4 platforms
// ============================================

import type { EndpointEntry, ParamDef } from './endpoint-registry';

// Helper to build MCP entries compactly
function mcp(
  platform: string,
  subcategory: string,
  slug: string,
  toolName: string,
  name: string,
  description: string,
  requiresAuth: boolean,
  params?: ParamDef[],
): EndpointEntry {
  return { slug, name, type: 'mcp', section: 'mcp', platform, subcategory, toolName, description, requiresAuth, params };
}

function p(name: string, type: string, required: boolean, description: string, opts?: { defaultValue?: string; enumValues?: string[] }): ParamDef {
  return { name, type, required, description, ...opts };
}

// ============================================
// DISCOVERY MCP (21 tools)
// ============================================

export const discoveryTools: EndpointEntry[] = [
  mcp('discovery', 'Market Search', 'search-markets', 'search_markets', 'Search Markets', 'Search prediction markets on Polymarket and Kalshi. Returns plain text with prices, volumes, and trading IDs.', false, [
    p('query', 'string', true, 'Search query - can be natural language or keywords'),
    p('platform', 'string', false, 'Which platform to search', { defaultValue: 'all', enumValues: ['polymarket', 'kalshi', 'all'] }),
    p('category', 'string', false, 'Category to filter markets'),
    p('limit', 'number', false, 'Maximum number of results (default 10, max 20)', { defaultValue: '10' }),
    p('sortBy', 'string', false, 'Sort order', { defaultValue: 'relevance', enumValues: ['relevance', 'soonest', 'latest'] }),
  ]),
  mcp('discovery', 'Market Details', 'get-market-details', 'get_market_details', 'Get Market Details', 'Get detailed information about a specific prediction market including prices, resolution criteria, and trading IDs.', false, [
    p('platform', 'string', true, 'Platform where the market is hosted', { enumValues: ['polymarket', 'kalshi'] }),
    p('marketId', 'string', true, 'Unique identifier for the market (market ID or ticker)'),
  ]),
  mcp('discovery', 'Metadata', 'get-categories', 'get_categories', 'Get Categories', 'Get the list of available market categories across platforms.', false),
  mcp('discovery', 'Market Search', 'get-trending-markets', 'get_trending_markets', 'Trending Markets', 'Get trending prediction markets based on 24-hour volume.', false, [
    p('platform', 'string', false, 'Which platform', { defaultValue: 'all', enumValues: ['polymarket', 'kalshi', 'all'] }),
    p('category', 'string', false, 'Filter by category'),
    p('limit', 'number', false, 'Number of trending markets (default 5, max 10)', { defaultValue: '5' }),
  ]),
  mcp('discovery', 'Metadata', 'get-market-stats', 'get_market_stats', 'Market Stats', 'Get aggregate statistics about the prediction markets database including total markets, volume, and platform breakdown.', false),
  mcp('discovery', 'Metadata', 'get-search-status', 'get_search_status', 'Search Status', 'Check the status of the semantic search system including embedding availability.', false),
  mcp('discovery', 'Analytics', 'find-arbitrage', 'find_arbitrage', 'Find Arbitrage', 'Scan Polymarket for arbitrage opportunities that can be executed atomically. Supports spread, multi_outcome, and cross_market types.', false, [
    p('type', 'string', false, 'Type of arbitrage to scan', { defaultValue: 'all', enumValues: ['spread', 'multi_outcome', 'cross_market', 'all'] }),
    p('minProfitPercent', 'number', false, 'Minimum profit percentage threshold', { defaultValue: '1.5' }),
    p('category', 'string', false, 'Filter by category'),
    p('searchQuery', 'string', false, 'Filter by keyword in market title'),
    p('limit', 'number', false, 'Maximum number of opportunities', { defaultValue: '10' }),
  ]),
  mcp('discovery', 'Analytics', 'xtracker-tweet-count', 'xtracker_tweet_count', 'Xtracker Tweet Count', 'Get real-time Elon Musk tweet count data from xtracker.polymarket.com - the official resolution source for tweet count markets.', false, [
    p('handle', 'string', false, 'Twitter handle to track', { defaultValue: 'elonmusk' }),
  ]),
  mcp('discovery', 'Market Search', 'get-market-schema', 'get_market_schema', 'Get Market Schema', 'Get the complete data model for prediction markets. Call before using query_markets_sql to understand available fields.', false),
  mcp('discovery', 'Market Search', 'query-markets-sql', 'query_markets_sql', 'Query Markets SQL', 'Powerful market search with advanced filtering. Supports date ranges, volume thresholds, category filtering, probability ranges, and aggregations.', false, [
    p('sql', 'string', true, 'The search query constructed using patterns from get_market_schema'),
    p('explain', 'boolean', false, 'Debug mode - shows execution plan instead of results'),
  ]),
  mcp('discovery', 'Analytics', 'find-markets-by-probability', 'find_markets_by_probability', 'Find by Probability', 'Find markets filtered by probability/likelihood. Find high-confidence (80%+), toss-ups (40-60%), or underdogs (under 20%).', false, [
    p('minProbability', 'number', false, 'Minimum probability percentage (0-100)'),
    p('maxProbability', 'number', false, 'Maximum probability percentage (0-100)'),
    p('endingWithinDays', 'number', false, 'Only show markets ending within this many days'),
    p('minVolume', 'number', false, 'Minimum trading volume in USD'),
    p('category', 'string', false, 'Filter by category'),
    p('platform', 'string', false, 'Which platform', { defaultValue: 'all', enumValues: ['polymarket', 'kalshi', 'all'] }),
    p('limit', 'number', false, 'Maximum results', { defaultValue: '20' }),
  ]),
  mcp('discovery', 'Market Search', 'keyword-search', 'keyword_search', 'Keyword Search', 'Fast keyword search using PostgreSQL Full-Text Search. Default returns complete trading data; set fast=true for quick discovery.', false, [
    p('keywords', 'string', true, 'Keywords to search for'),
    p('platform', 'string', false, 'Which platform', { defaultValue: 'all', enumValues: ['polymarket', 'kalshi', 'limitless', 'all'] }),
    p('minVolume', 'number', false, 'Minimum trading volume in USD'),
    p('limit', 'number', false, 'Maximum results', { defaultValue: '20' }),
    p('fast', 'boolean', false, 'Fast mode: returns only basic info without full trading data', { defaultValue: 'false' }),
  ]),
  mcp('discovery', 'Market Details', 'get-multi-option-market', 'get_multi_option_market', 'Multi-Option Market', 'Get ALL options for multi-option Polymarket events. Bypasses the 100-row SQL limit for markets with many outcomes.', false, [
    p('eventIdentifier', 'string', true, 'Event ID, slug, or partial title'),
  ]),
  mcp('discovery', 'Analytics', 'find-related-markets', 'find_related_markets', 'Find Related Markets', 'Find semantically related prediction markets using vector embeddings.', false, [
    p('markets', 'array', true, 'Market identifiers (slugs, conditionIds, or eventTickers)'),
    p('platform', 'string', false, 'Filter results to a platform', { defaultValue: 'all', enumValues: ['polymarket', 'kalshi', 'limitless', 'all'] }),
    p('limit', 'number', false, 'Number of related markets', { defaultValue: '10' }),
  ]),
  mcp('discovery', 'Wallet Analytics', 'get-wallet-profile', 'get_wallet_profile', 'Wallet Profile', 'Get detailed analytical breakdown of a Polymarket wallet including identity, PNL, category distribution, and behavioral preferences.', false, [
    p('wallet', 'string', true, 'Polymarket wallet address (0x...)'),
  ]),
  mcp('discovery', 'Wallet Analytics', 'get-wallet-interests', 'get_wallet_interests', 'Wallet Interests', 'Analyze trading history and recommend semantically related markets a wallet might be interested in.', false, [
    p('wallet', 'string', true, 'Polymarket wallet address (0x...)'),
    p('platform', 'string', false, 'Filter results to a platform', { defaultValue: 'all', enumValues: ['polymarket', 'kalshi', 'limitless', 'all'] }),
    p('limit', 'number', false, 'Number of recommendations', { defaultValue: '10' }),
    p('recencyDays', 'number', false, 'Only consider trades within this many days', { defaultValue: '30' }),
  ]),
  mcp('discovery', 'Wallet Analytics', 'get-social-discovery', 'get_social_discovery', 'Social Discovery', 'Find markets using collaborative filtering: analyzes what similar traders also trade. Great for copy-trading discovery.', false, [
    p('wallet', 'string', true, 'Polymarket wallet address (0x...)'),
    p('limit', 'number', false, 'Number of recommendations', { defaultValue: '10' }),
  ]),
  mcp('discovery', 'Wallet Analytics', 'get-wallet-momentum', 'get_wallet_momentum', 'Wallet Momentum', 'Get current winning or losing positions showing unrealized PNL, percent gain/loss, and current prices.', false, [
    p('wallet', 'string', true, 'Polymarket wallet address (0x...)'),
    p('sort', 'string', false, 'Sort positions by', { defaultValue: 'pnl', enumValues: ['pnl', 'percentPnl', 'value'] }),
    p('direction', 'string', false, 'Filter direction', { defaultValue: 'winning', enumValues: ['winning', 'losing', 'all'] }),
    p('limit', 'number', false, 'Number of positions', { defaultValue: '20' }),
  ]),
  mcp('discovery', 'Wallet Analytics', 'get-contrarian-traders', 'get_contrarian_traders', 'Contrarian Traders', 'Find wallets betting against market consensus. Each contrarian includes identity, PNL, and ROI.', false, [
    p('conditionId', 'string', true, 'Polymarket market conditionId (0x...)'),
    p('limit', 'number', false, 'Number of contrarian traders', { defaultValue: '10' }),
  ]),
  mcp('discovery', 'Wallet Analytics', 'get-whale-activity', 'get_whale_activity', 'Whale Activity', 'Find largest traders on a specific market and recent large trades. Each whale includes identity, volume, PNL, and ROI.', false, [
    p('conditionId', 'string', true, 'Polymarket market conditionId (0x...)'),
    p('limit', 'number', false, 'Number of top whales', { defaultValue: '10' }),
    p('minVolume', 'number', false, 'Minimum trade volume in USDC', { defaultValue: '0' }),
  ]),
  mcp('discovery', 'Wallet Analytics', 'get-portfolio-overlap', 'get_portfolio_overlap', 'Portfolio Overlap', 'Compare two wallets\' trading activity. Shows shared markets, unique markets, and agreement rate.', false, [
    p('walletA', 'string', true, 'First wallet address (0x...)'),
    p('walletB', 'string', true, 'Second wallet address (0x...)'),
    p('limit', 'number', false, 'Number of positions to return', { defaultValue: '20' }),
  ]),
];

// ============================================
// POLYMARKET MCP (47 tools)
// ============================================

export const polymarketMcpTools: EndpointEntry[] = [
  // Wallet Setup
  mcp('polymarket', 'Wallet Setup', 'request-api-key', 'request_api_key', 'Request API Key', 'Request a new API key to access your Polymarket wallet. Creates a new wallet if you do not have one. No auth required.', false, [
    p('externalId', 'string', true, 'Your unique identifier (e.g., user ID, email hash)'),
    p('keyName', 'string', false, 'Optional friendly name for this API key'),
    p('signature', 'string', false, 'HMAC-SHA256 signature for returning users'),
    p('timestamp', 'string', false, 'Unix timestamp in milliseconds for signature verification'),
  ]),
  mcp('polymarket', 'Wallet Setup', 'setup-wallet', 'setup_wallet', 'Setup Wallet', 'Complete full wallet setup including Safe deployment, API credentials, and contract approvals. Gasless.', true),
  mcp('polymarket', 'Wallet Setup', 'reset-credentials', 'reset_credentials', 'Reset Credentials', 'Reset and regenerate CLOB API credentials. Use if existing credentials are corrupted.', true),
  mcp('polymarket', 'Wallet Setup', 'validate-credentials', 'validate_credentials', 'Validate Credentials', 'Check if your stored CLOB credentials are valid (proper base64 format).', true),
  mcp('polymarket', 'Wallet Setup', 'get-wallet-status', 'get_wallet_status', 'Get Wallet Status', 'Get your wallet status including deployment state, addresses, and approval status.', true),
  mcp('polymarket', 'Wallet Setup', 'recover-safe-address', 'recover_safe_address', 'Recover Safe Address', 'Recover/sync Safe wallet address for cases where deployment succeeded but database was not updated.', true, [
    p('knownSafeAddress', 'string', false, 'Known Safe address to verify and sync'),
  ]),
  // Approvals
  mcp('polymarket', 'Approvals', 'set-approvals', 'set_approvals', 'Set Approvals', 'Set all required token approvals for trading (USDC, CTF, Neg Risk). Gasless via Polymarket relayer.', true, [
    p('force', 'boolean', false, 'Re-approve even if already set'),
  ]),
  mcp('polymarket', 'Approvals', 'sync-balance', 'sync_balance', 'Sync Balance', 'Force Polymarket CLOB to re-sync balance/allowance data. Use when orders fail with "not enough balance".', true),
  // Balances
  mcp('polymarket', 'Balances', 'get-balances', 'get_balances', 'Get Balances', 'Get your USDC (bridged), Native USDC, and MATIC balances for both EOA and Safe wallets.', true),
  mcp('polymarket', 'Balances', 'get-deposit-addresses', 'get_deposit_addresses', 'Get Deposit Addresses', 'Get deposit addresses for funding your wallet. Returns addresses for EVM chains, Solana, and Bitcoin.', true),
  mcp('polymarket', 'Balances', 'get-supported-deposit-assets', 'get_supported_deposit_assets', 'Supported Deposit Assets', 'Get list of supported tokens and chains for deposits with minimum amounts.', true),
  // Keys
  mcp('polymarket', 'Wallet Setup', 'export-private-key', 'export_private_key', 'Export Private Key', 'Export your wallet private key. WARNING: Handle securely.', true),
  mcp('polymarket', 'Wallet Setup', 'import-private-key', 'import_private_key', 'Import Private Key', 'Import an existing private key to create a new wallet.', false, [
    p('externalId', 'string', true, 'Your unique identifier'),
    p('privateKey', 'string', true, 'Private key in hex format with 0x prefix'),
    p('keyName', 'string', false, 'Optional friendly name for the API key'),
  ]),
  // Orders
  mcp('polymarket', 'Orders', 'place-order', 'place_order', 'Place Order', 'Place a buy or sell order on Polymarket. Minimum order size is $1.', true, [
    p('conditionId', 'string', true, 'Market condition ID'),
    p('tokenId', 'string', true, 'Token ID of the outcome to trade'),
    p('side', 'string', true, 'BUY or SELL', { enumValues: ['BUY', 'SELL'] }),
    p('price', 'number', true, 'Price per share (0.01 to 0.99)'),
    p('size', 'number', true, 'Number of shares'),
    p('orderType', 'string', false, 'Order type', { enumValues: ['GTC', 'GTD', 'FOK', 'FAK'] }),
    p('expiration', 'number', false, 'Unix timestamp for GTD orders'),
    p('postOnly', 'boolean', false, 'If true, order only rests on book as maker'),
  ]),
  mcp('polymarket', 'Orders', 'cancel-order', 'cancel_order', 'Cancel Order', 'Cancel an existing order. Filled orders cannot be cancelled.', true, [
    p('orderId', 'string', true, 'Order ID to cancel'),
  ]),
  mcp('polymarket', 'Orders', 'get-orders', 'get_orders', 'Get Orders', 'Get all your orders, optionally filtered by status.', true, [
    p('status', 'string', false, 'Filter by status', { enumValues: ['PENDING', 'LIVE', 'FILLED', 'CANCELLED', 'FAILED'] }),
  ]),
  mcp('polymarket', 'Orders', 'sync-order-status', 'sync_order_status', 'Sync Order Status', 'Sync an order status with Polymarket CLOB for latest fill info.', true, [
    p('orderId', 'string', true, 'Local order ID to sync'),
  ]),
  mcp('polymarket', 'Orders', 'execute-atomic-orders', 'execute_atomic_orders', 'Atomic Orders', 'Execute multiple orders atomically - all succeed or all fail. Max 10 orders per batch.', true, [
    p('orders', 'array', true, 'Array of orders (each with conditionId, tokenId, side, price, size)'),
    p('metadata', 'string', false, 'Optional description for this batch'),
  ]),
  // Positions
  mcp('polymarket', 'Positions', 'get-positions', 'get_positions', 'Get Positions', 'Get all your positions (share holdings).', true),
  mcp('polymarket', 'Positions', 'sync-positions', 'sync_positions', 'Sync Positions', 'Sync your positions with Polymarket Data API for latest holdings.', true),
  mcp('polymarket', 'Positions', 'get-onchain-shares', 'get_onchain_shares', 'On-Chain Shares', 'Get ALL shares held by querying blockchain directly. Finds shares that were gifted or transferred.', true),
  mcp('polymarket', 'Positions', 'check-token-balance', 'check_token_balance', 'Check Token Balance', 'Check on-chain balance of a specific token ID for your wallet.', true, [
    p('tokenId', 'string', true, 'Token ID (ERC-1155 asset ID) to check'),
  ]),
  mcp('polymarket', 'Positions', 'merge-tokens', 'merge_tokens', 'Merge Tokens', 'Merge YES and NO tokens back to USDC. 1 YES + 1 NO = $1 USDC. Gasless.', true, [
    p('conditionId', 'string', true, 'Market condition ID'),
    p('yesTokenId', 'string', false, 'YES outcome token ID'),
    p('noTokenId', 'string', false, 'NO outcome token ID'),
    p('amount', 'number', false, 'Number of token pairs to merge'),
  ]),
  // Redemption
  mcp('polymarket', 'Redemption', 'get-claimable-winnings', 'get_claimable_winnings', 'Claimable Winnings', 'Check if you have any claimable winnings from resolved markets.', true),
  mcp('polymarket', 'Redemption', 'claim-winnings', 'claim_winnings', 'Claim Winnings', 'Claim winnings from resolved markets. Gasless via relayer.', true, [
    p('positionId', 'string', false, 'Specific position ID to claim (claims all if not specified)'),
  ]),
  // Transfers
  mcp('polymarket', 'Transfers', 'transfer-usdc', 'transfer_usdc', 'Transfer USDC', 'Transfer USDC from your Safe wallet. Gasless via relayer.', true, [
    p('toAddress', 'string', true, 'Destination Polygon address'),
    p('amount', 'number', true, 'Amount of USDC (e.g., 1.5 for $1.50)'),
  ]),
  mcp('polymarket', 'Transfers', 'transfer-shares', 'transfer_shares', 'Transfer Shares', 'Transfer ERC-1155 shares to another address. Gasless.', true, [
    p('toAddress', 'string', true, 'Destination Polygon address'),
    p('tokenId', 'string', true, 'Token ID to transfer'),
    p('amount', 'number', true, 'Number of shares'),
  ]),
  mcp('polymarket', 'Transfers', 'transfer-matic', 'transfer_matic', 'Transfer MATIC (Deprecated)', 'DEPRECATED: Use send_matic instead.', true, [
    p('toAddress', 'string', true, 'Destination address'),
    p('amount', 'number', true, 'Amount of MATIC'),
  ]),
  mcp('polymarket', 'Transfers', 'send-matic', 'send_matic', 'Send MATIC', 'Send native MATIC directly from EOA wallet. Requires MATIC for gas.', true, [
    p('toAddress', 'string', true, 'Destination Polygon address'),
    p('amount', 'number', true, 'Amount of MATIC'),
  ]),
  mcp('polymarket', 'Transfers', 'transfer-native-usdc', 'transfer_native_usdc', 'Transfer Native USDC', 'Transfer Native USDC (Circle) from your Safe wallet. Gasless.', true, [
    p('toAddress', 'string', true, 'Destination address'),
    p('amount', 'number', true, 'Amount of Native USDC'),
  ]),
  // Swaps
  mcp('polymarket', 'Swaps', 'swap-tokens', 'swap_tokens', 'Swap Tokens', 'Swap tokens on Polygon via LI.FI aggregator. Supports MATIC, USDC, NATIVE_USDC.', true, [
    p('fromToken', 'string', true, 'Token to swap from (MATIC, USDC, NATIVE_USDC)'),
    p('toToken', 'string', true, 'Token to swap to'),
    p('amount', 'number', true, 'Amount to swap'),
  ]),
  mcp('polymarket', 'Swaps', 'get-swap-quote', 'get_swap_quote', 'Swap Quote', 'Get a swap quote without executing. Shows estimated output, price impact, and fees.', true, [
    p('fromToken', 'string', true, 'Token to swap from'),
    p('toToken', 'string', true, 'Token to swap to'),
    p('amount', 'number', true, 'Amount to swap'),
  ]),
  // Bridge
  mcp('polymarket', 'Bridge', 'bridge-quote', 'bridge_quote', 'Bridge Quote', 'Get a quote for bridging USDC from Polygon to Base. Does NOT execute.', true, [
    p('amount', 'number', true, 'Amount of USDC to bridge'),
    p('toAddress', 'string', true, 'Destination wallet on Base'),
    p('fromToken', 'string', false, 'Source token: USDC (bridged, default) or NATIVE_USDC'),
  ]),
  mcp('polymarket', 'Bridge', 'bridge-execute', 'bridge_execute', 'Execute Bridge', 'Bridge USDC from Polymarket Safe on Polygon to a Base wallet. Takes 2-4 minutes.', true, [
    p('amount', 'number', true, 'Amount of USDC to bridge'),
    p('toAddress', 'string', true, 'Destination wallet on Base'),
    p('fromToken', 'string', false, 'Source token: USDC (default) or NATIVE_USDC'),
  ]),
  // Market Data
  mcp('polymarket', 'Market Data', 'get-orderbook', 'get_orderbook', 'Orderbook', 'Get the order book for a token showing bids and asks.', true, [
    p('tokenId', 'string', true, 'Token ID to get orderbook for'),
  ]),
  mcp('polymarket', 'Market Data', 'get-price', 'get_price', 'Get Price', 'Get the current midpoint price for a token.', true, [
    p('tokenId', 'string', true, 'Token ID to get price for'),
  ]),
  mcp('polymarket', 'Market Data', 'get-elon-tweet-count', 'get_elon_tweet_count', 'Elon Tweet Count', 'Get Elon Musk tweet count from xtracker.io. Can calculate counts for specific date ranges.', true, [
    p('startDate', 'string', false, 'Start date (YYYY-MM-DD)'),
    p('endDate', 'string', false, 'End date (YYYY-MM-DD)'),
    p('includeProjection', 'boolean', false, 'Project final total based on current pace', { defaultValue: 'true' }),
  ]),
  mcp('polymarket', 'Market Data', 'get-chart-screenshot', 'get_chart_screenshot', 'Chart Screenshot', 'Take a screenshot of a Polymarket market chart. Returns URL to download the image.', true, [
    p('url', 'string', true, 'Full Polymarket event URL'),
    p('timerange', 'string', false, 'Chart time range', { enumValues: ['1H', '6H', '1D', '1W', '1M', 'ALL'] }),
  ]),
  // API Keys
  mcp('polymarket', 'API Keys', 'list-api-keys', 'list_api_keys', 'List API Keys', 'List all your API keys (without exposing the actual keys).', true),
  mcp('polymarket', 'API Keys', 'create-additional-api-key', 'create_additional_api_key', 'Create API Key', 'Create an additional API key for your wallet.', true, [
    p('name', 'string', false, 'Friendly name for this key'),
  ]),
  mcp('polymarket', 'API Keys', 'revoke-api-key', 'revoke_api_key', 'Revoke API Key', 'Revoke one of your API keys.', true, [
    p('keyId', 'string', true, 'Key ID to revoke'),
  ]),
  // Copy Trading
  mcp('polymarket', 'Copy Trading', 'copy-trade-follow', 'copy_trade_follow', 'Follow Trader', 'Subscribe to copy trade a target wallet. Polls every 3 seconds for new trades.', true, [
    p('targetWallet', 'string', true, 'Wallet address to copy'),
    p('allocationMode', 'string', false, 'How to size trades', { enumValues: ['PERCENTAGE', 'FIXED_AMOUNT', 'MIRROR_SIZE'] }),
    p('allocationValue', 'number', false, 'Value for allocation mode (default: 10)'),
    p('maxTradeSize', 'number', false, 'Max USDC per single copy trade'),
    p('minTradeSize', 'number', false, 'Min target trade size to trigger copy', { defaultValue: '1' }),
    p('copyBuys', 'boolean', false, 'Copy BUY trades', { defaultValue: 'true' }),
    p('copySells', 'boolean', false, 'Copy SELL trades', { defaultValue: 'true' }),
  ]),
  mcp('polymarket', 'Copy Trading', 'copy-trade-unfollow', 'copy_trade_unfollow', 'Unfollow Trader', 'Stop copy trading a target wallet. Existing positions are NOT closed.', true, [
    p('targetWallet', 'string', true, 'Wallet address to stop copying'),
  ]),
  mcp('polymarket', 'Copy Trading', 'copy-trade-list', 'copy_trade_list', 'List Copy Trades', 'List all your copy trade subscriptions with stats.', true),
  mcp('polymarket', 'Copy Trading', 'copy-trade-update', 'copy_trade_update', 'Update Copy Trade', 'Update copy trade subscription parameters.', true, [
    p('targetWallet', 'string', true, 'Target wallet to update'),
    p('allocationMode', 'string', false, 'New allocation mode'),
    p('allocationValue', 'number', false, 'New allocation value'),
    p('maxTradeSize', 'number', false, 'New max trade size'),
    p('minTradeSize', 'number', false, 'New min trigger size'),
    p('copyBuys', 'boolean', false, 'Copy BUY trades'),
    p('copySells', 'boolean', false, 'Copy SELL trades'),
    p('isActive', 'boolean', false, 'Pause (false) or resume (true)'),
  ]),
  mcp('polymarket', 'Copy Trading', 'copy-trade-history', 'copy_trade_history', 'Copy Trade History', 'Get copy trade execution history with latency stats.', true, [
    p('targetWallet', 'string', false, 'Filter to specific target'),
    p('limit', 'number', false, 'Max results', { defaultValue: '20' }),
    p('offset', 'number', false, 'Pagination offset', { defaultValue: '0' }),
  ]),
  mcp('polymarket', 'Copy Trading', 'copy-trade-status', 'copy_trade_status', 'Copy Engine Status', 'Get copy trading engine status including active monitors and capacity.', true),
  // Leaderboard
  mcp('polymarket', 'Leaderboard', 'get-top-traders', 'get_top_traders', 'Top Traders', 'Get top Polymarket traders from the leaderboard. Use to discover profitable traders to copy.', true, [
    p('category', 'string', false, 'Category filter', { enumValues: ['OVERALL', 'POLITICS', 'SPORTS', 'CRYPTO', 'CULTURE', 'WEATHER', 'ECONOMICS', 'TECH', 'FINANCE'] }),
    p('timePeriod', 'string', false, 'Time window', { enumValues: ['DAY', 'WEEK', 'MONTH', 'ALL'] }),
    p('orderBy', 'string', false, 'Sort by', { enumValues: ['PNL', 'VOL'] }),
    p('limit', 'number', false, 'Number of results (1-50)', { defaultValue: '20' }),
  ]),
  mcp('polymarket', 'Leaderboard', 'get-trader-profile', 'get_trader_profile', 'Trader Profile', 'Get detailed public profile for a Polymarket trader.', true, [
    p('address', 'string', true, 'Polygon wallet address (0x...)'),
  ]),
];

// ============================================
// KALSHI MCP (51 tools)
// ============================================

export const kalshiMcpTools: EndpointEntry[] = [
  // Account
  mcp('kalshi', 'Account', 'signup', 'kalshi_signup', 'Sign Up', 'Create a new Kalshi account with a fresh Solana wallet. Returns API credentials.', false, [
    p('externalId', 'string', true, 'Your unique identifier'),
    p('keyName', 'string', false, 'Optional friendly name for your API key'),
  ]),
  mcp('kalshi', 'Account', 'request-api-key', 'kalshi_request_api_key', 'Request API Key', 'Request a new API key for Kalshi trading. Requires an access code.', false, [
    p('accessCode', 'string', true, 'Access code (format: KALSHI-XXXX-XXXX-XXXX)'),
    p('externalId', 'string', true, 'Your unique identifier'),
    p('keyName', 'string', false, 'Optional friendly name'),
  ]),
  // Wallet Setup
  mcp('kalshi', 'Wallet Setup', 'setup-wallet', 'kalshi_setup_wallet', 'Setup Wallet', 'Generate a new Solana wallet for Kalshi trading. Private key is encrypted and stored securely.', true),
  mcp('kalshi', 'Wallet Setup', 'import-wallet', 'kalshi_import_wallet', 'Import Wallet (Encrypted)', 'Import an existing Solana wallet using encrypted bundle.', true, [
    p('encryptedKey', 'string', true, 'Encrypted private key blob'),
    p('salt', 'string', true, 'Salt used for encryption'),
    p('iv', 'string', true, 'IV used for encryption'),
    p('publicKey', 'string', true, 'Solana public key for verification'),
    p('version', 'string', false, 'Bundle version', { defaultValue: '1.0' }),
  ]),
  mcp('kalshi', 'Wallet Setup', 'get-wallet-import-instructions', 'kalshi_get_wallet_import_instructions', 'Import Instructions', 'Get instructions for securely exporting your Solana wallet for import.', true),
  mcp('kalshi', 'Wallet Setup', 'import-private-key', 'kalshi_import_private_key', 'Import Private Key', 'Import an existing Solana private key directly.', false, [
    p('externalId', 'string', true, 'Your unique identifier'),
    p('privateKey', 'string', true, 'Base58-encoded Solana private key'),
    p('keyName', 'string', false, 'Optional friendly name'),
  ]),
  // Wallet Info
  mcp('kalshi', 'Wallet Info', 'get-wallet-info', 'kalshi_get_wallet_info', 'Wallet Info', 'Get wallet information including Solana public key, type, and KYC status.', true),
  mcp('kalshi', 'Wallet Info', 'get-wallet-status', 'kalshi_get_wallet_status', 'Wallet Status', 'Get comprehensive wallet status including balances, holdings, and connection health.', true),
  mcp('kalshi', 'Wallet Info', 'get-balances', 'kalshi_get_balances', 'Get Balances', 'Get your SOL and USDC balances. Also includes KYC status.', true),
  mcp('kalshi', 'Wallet Info', 'get-token-holdings', 'kalshi_get_token_holdings', 'Token Holdings', 'Get all SPL token holdings including prediction market positions.', true),
  mcp('kalshi', 'Wallet Info', 'get-deposit-address', 'kalshi_get_deposit_address', 'Deposit Address', 'Get your Solana wallet address for depositing SOL and USDC.', true),
  mcp('kalshi', 'Wallet Info', 'export-private-key', 'kalshi_export_private_key', 'Export Private Key', 'Export your Solana wallet private key. WARNING: Handle securely.', true),
  // KYC
  mcp('kalshi', 'KYC', 'check-kyc-status', 'kalshi_check_kyc_status', 'KYC Status', 'Check KYC verification status via DFlow Proof. After Feb 27, unverified wallets cannot buy.', true),
  mcp('kalshi', 'KYC', 'get-kyc-link', 'kalshi_get_kyc_link', 'KYC Link', 'Get a KYC verification link for DFlow Proof. For generated wallets, returns ready-to-use deep link.', true, [
    p('redirectUri', 'string', false, 'HTTPS URL to redirect after KYC completion'),
  ]),
  // Markets
  mcp('kalshi', 'Markets', 'search-markets', 'kalshi_search_markets', 'Search Markets', 'Search for Kalshi prediction markets by keyword via DFlow.', true, [
    p('query', 'string', true, 'Search query'),
    p('limit', 'number', false, 'Max results per page', { defaultValue: '10' }),
    p('offset', 'number', false, 'Pagination offset', { defaultValue: '0' }),
    p('marketStatus', 'string', false, 'Filter by status', { enumValues: ['active', 'inactive', 'finalized', 'all'] }),
  ]),
  mcp('kalshi', 'Markets', 'get-market', 'kalshi_get_market', 'Get Market', 'Get details for a specific Kalshi market including prices and outcome mints.', true, [
    p('ticker', 'string', true, 'Kalshi market ticker'),
  ]),
  mcp('kalshi', 'Markets', 'get-events', 'kalshi_get_events', 'List Events', 'Get list of Kalshi events with optional filters and pagination.', true, [
    p('marketStatus', 'string', false, 'Market status filter', { defaultValue: 'active', enumValues: ['active', 'inactive', 'finalized', 'all'] }),
    p('category', 'string', false, 'Filter by category'),
    p('limit', 'number', false, 'Max results', { defaultValue: '10' }),
    p('cursor', 'string', false, 'Pagination cursor'),
  ]),
  mcp('kalshi', 'Markets', 'get-event', 'kalshi_get_event', 'Get Event', 'Get a Kalshi event by ticker with all nested markets.', true, [
    p('ticker', 'string', true, 'Event ticker'),
  ]),
  mcp('kalshi', 'Markets', 'get-live-data', 'kalshi_get_live_data', 'Live Market Data', 'Get live pricing data for a Kalshi market.', true, [
    p('marketTicker', 'string', true, 'Kalshi market ticker'),
  ]),
  mcp('kalshi', 'Markets', 'check-market-initialization', 'kalshi_check_market_initialization', 'Check Initialization', 'Check if a market is initialized (tokenized) on-chain.', true, [
    p('ticker', 'string', true, 'Kalshi market ticker'),
    p('settlementMint', 'string', false, 'Settlement token mint (default: USDC)'),
  ]),
  mcp('kalshi', 'Markets', 'initialize-market', 'kalshi_initialize_market', 'Initialize Market', 'Initialize (tokenize) a Kalshi market on-chain. Creates YES/NO outcome tokens.', true, [
    p('outcomeMint', 'string', true, 'YES or NO outcome mint address'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('kalshi', 'Markets', 'check-redemption-status', 'kalshi_check_redemption_status', 'Redemption Status', 'Check if a market is settled and positions can be redeemed.', true, [
    p('ticker', 'string', true, 'Kalshi market ticker'),
    p('settlementMint', 'string', false, 'Settlement token mint'),
  ]),
  mcp('kalshi', 'Markets', 'get-market-by-mint', 'kalshi_get_market_by_mint', 'Market by Mint', 'Look up a Kalshi market by outcome token mint address.', true, [
    p('mintAddress', 'string', true, 'Outcome token mint address'),
  ]),
  // Trading
  mcp('kalshi', 'Trading', 'get-quote', 'kalshi_get_quote', 'Get Quote', 'Get a quote for buying/selling prediction market tokens via DFlow.', true, [
    p('inputMint', 'string', true, 'Token to spend (USDC mint or outcome token)'),
    p('outputMint', 'string', true, 'Token to receive'),
    p('amount', 'number', true, 'Amount in smallest units (e.g., 1000000 for 1 USDC)'),
    p('slippageBps', 'number', false, 'Slippage tolerance in basis points', { defaultValue: '100' }),
  ]),
  mcp('kalshi', 'Trading', 'buy-yes', 'kalshi_buy_yes', 'Buy YES', 'Buy YES outcome tokens for a Kalshi market.', true, [
    p('marketTicker', 'string', true, 'Kalshi market ticker'),
    p('yesOutcomeMint', 'string', true, 'YES outcome token mint'),
    p('usdcAmount', 'number', true, 'Amount of USDC to spend'),
    p('slippageBps', 'number', false, 'Slippage tolerance', { defaultValue: '100' }),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('kalshi', 'Trading', 'buy-no', 'kalshi_buy_no', 'Buy NO', 'Buy NO outcome tokens for a Kalshi market.', true, [
    p('marketTicker', 'string', true, 'Kalshi market ticker'),
    p('noOutcomeMint', 'string', true, 'NO outcome token mint'),
    p('usdcAmount', 'number', true, 'Amount of USDC to spend'),
    p('slippageBps', 'number', false, 'Slippage tolerance', { defaultValue: '100' }),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('kalshi', 'Trading', 'sell-position', 'kalshi_sell_position', 'Sell Position', 'Sell Kalshi outcome tokens back to USDC.', true, [
    p('outcomeMint', 'string', true, 'Outcome token mint to sell'),
    p('tokenAmount', 'number', true, 'Number of tokens to sell'),
    p('slippageBps', 'number', false, 'Slippage tolerance', { defaultValue: '100' }),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  // Positions
  mcp('kalshi', 'Positions', 'get-positions', 'kalshi_get_positions', 'Get Positions', 'Get your current Kalshi prediction market positions.', true),
  mcp('kalshi', 'Positions', 'get-orders', 'kalshi_get_orders', 'Get Orders', 'Get your Kalshi order history.', true, [
    p('status', 'string', false, 'Filter by status', { enumValues: ['PENDING', 'SUBMITTED', 'FILLED', 'CANCELLED', 'FAILED'] }),
    p('limit', 'number', false, 'Max results'),
  ]),
  // Redemption
  mcp('kalshi', 'Redemption', 'redeem-winnings', 'kalshi_redeem_winnings', 'Redeem Winnings', 'Redeem winning outcome tokens after market settlement.', true, [
    p('outcomeMint', 'string', true, 'Winning outcome token mint'),
    p('tokenAmount', 'number', true, 'Number of tokens to redeem'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('kalshi', 'Redemption', 'get-redeemable-positions', 'kalshi_get_redeemable_positions', 'Redeemable Positions', 'Get all positions that can be redeemed from settled markets.', true),
  mcp('kalshi', 'Redemption', 'redeem-all-positions', 'kalshi_redeem_all_positions', 'Redeem All', 'Redeem all winning positions at once.', true, [
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  // Swaps
  mcp('kalshi', 'Swaps', 'get-swap-quote', 'kalshi_get_swap_quote', 'Swap Quote', 'Get a quote for swapping tokens via Jupiter. For SOL/USDC swaps, not prediction markets.', true, [
    p('inputMint', 'string', true, 'Input token ("SOL", "USDC", or mint address)'),
    p('outputMint', 'string', true, 'Output token'),
    p('amount', 'number', true, 'Amount in human-readable units'),
    p('slippageBps', 'number', false, 'Slippage tolerance', { defaultValue: '50' }),
  ]),
  mcp('kalshi', 'Swaps', 'execute-swap', 'kalshi_execute_swap', 'Execute Swap', 'Swap tokens via Jupiter. SOL to USDC, USDC to SOL, etc.', true, [
    p('inputMint', 'string', true, 'Input token'),
    p('outputMint', 'string', true, 'Output token'),
    p('amount', 'number', true, 'Amount in human-readable units'),
    p('slippageBps', 'number', false, 'Slippage tolerance', { defaultValue: '50' }),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('kalshi', 'Swaps', 'swap-sol-to-usdc', 'kalshi_swap_sol_to_usdc', 'SOL to USDC', 'Convenience method: swap SOL to USDC.', true, [
    p('solAmount', 'number', true, 'Amount of SOL to swap'),
    p('slippageBps', 'number', false, 'Slippage tolerance', { defaultValue: '50' }),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('kalshi', 'Swaps', 'swap-usdc-to-sol', 'kalshi_swap_usdc_to_sol', 'USDC to SOL', 'Convenience method: swap USDC to SOL for transaction fees.', true, [
    p('usdcAmount', 'number', true, 'Amount of USDC to swap'),
    p('slippageBps', 'number', false, 'Slippage tolerance', { defaultValue: '50' }),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  // Transfers
  mcp('kalshi', 'Transfers', 'send-sol', 'kalshi_send_sol', 'Send SOL', 'Send SOL to another Solana wallet.', true, [
    p('toAddress', 'string', true, 'Destination Solana address'),
    p('amount', 'number', true, 'Amount of SOL'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('kalshi', 'Transfers', 'send-usdc', 'kalshi_send_usdc', 'Send USDC', 'Send USDC to another Solana wallet.', true, [
    p('toAddress', 'string', true, 'Destination Solana address'),
    p('amount', 'number', true, 'Amount of USDC'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('kalshi', 'Transfers', 'send-token', 'kalshi_send_token', 'Send Token', 'Send any SPL token to another Solana wallet. Supports Token and Token-2022 programs.', true, [
    p('toAddress', 'string', true, 'Destination address'),
    p('mintAddress', 'string', true, 'SPL token mint address'),
    p('amount', 'number', true, 'Amount to send'),
    p('decimals', 'number', true, 'Token decimals (e.g., 6 for USDC)'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  // API Keys
  mcp('kalshi', 'API Keys', 'list-api-keys', 'kalshi_list_api_keys', 'List API Keys', 'List all your Kalshi API keys.', true),
  mcp('kalshi', 'API Keys', 'create-additional-api-key', 'kalshi_create_additional_api_key', 'Create API Key', 'Create an additional API key.', true, [
    p('name', 'string', false, 'Friendly name'),
  ]),
  mcp('kalshi', 'API Keys', 'revoke-api-key', 'kalshi_revoke_api_key', 'Revoke API Key', 'Revoke one of your API keys.', true, [
    p('keyId', 'string', true, 'ID of key to revoke'),
  ]),
  // Tokens (Meme Coins)
  mcp('kalshi', 'Tokens', 'search-tokens', 'kalshi_search_tokens', 'Search Tokens', 'Search for Solana tokens (meme coins, SPL) by name or symbol via DEX Screener.', true, [
    p('query', 'string', true, 'Search query (name or symbol)'),
    p('limit', 'number', false, 'Max results', { defaultValue: '10' }),
  ]),
  mcp('kalshi', 'Tokens', 'get-token-info', 'kalshi_get_token_info', 'Token Info', 'Get detailed info about a Solana token including price, liquidity, volume, and social links.', true, [
    p('token', 'string', true, 'Token symbol or mint address'),
  ]),
  mcp('kalshi', 'Tokens', 'get-trending-tokens', 'kalshi_get_trending_tokens', 'Trending Tokens', 'Get trending/hot Solana meme coins from DEX Screener.', true, [
    p('limit', 'number', false, 'Max results', { defaultValue: '10' }),
  ]),
  mcp('kalshi', 'Tokens', 'swap-tokens', 'kalshi_swap_tokens', 'Swap Tokens', 'Swap ANY Solana token pair via Jupiter. Accepts symbols or mint addresses.', true, [
    p('fromToken', 'string', true, 'Token to sell (symbol or mint)'),
    p('toToken', 'string', true, 'Token to buy'),
    p('amount', 'number', true, 'Amount to swap'),
    p('slippageBps', 'number', false, 'Slippage tolerance', { defaultValue: '100' }),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('kalshi', 'Tokens', 'get-token-quote', 'kalshi_get_token_quote', 'Token Quote', 'Get swap quote for any Solana token pair without executing.', true, [
    p('fromToken', 'string', true, 'Token to sell'),
    p('toToken', 'string', true, 'Token to buy'),
    p('amount', 'number', true, 'Amount to swap'),
    p('slippageBps', 'number', false, 'Slippage tolerance', { defaultValue: '100' }),
  ]),
  mcp('kalshi', 'Tokens', 'get-token-balance', 'kalshi_get_token_balance', 'Token Balance', 'Check balance of any SPL token. Accepts symbol or mint address.', true, [
    p('token', 'string', true, 'Token symbol or mint address'),
  ]),
];

// ============================================
// LIMITLESS MCP (51 tools)
// ============================================

export const limitlessMcpTools: EndpointEntry[] = [
  // Account
  mcp('limitless', 'Account', 'signup', 'limitless_signup', 'Sign Up', 'Create a new Limitless account with a fresh Base wallet. Returns API credentials.', false, [
    p('externalId', 'string', true, 'Your unique identifier'),
    p('keyName', 'string', false, 'Optional friendly name'),
  ]),
  mcp('limitless', 'Account', 'request-api-key', 'limitless_request_api_key', 'Request API Key', 'Request a new API key. Requires HMAC signature from existing API secret.', true, [
    p('externalId', 'string', true, 'Your external identifier'),
    p('signature', 'string', true, 'HMAC-SHA256 signature'),
    p('timestamp', 'string', true, 'Unix timestamp in milliseconds'),
    p('keyName', 'string', false, 'Optional friendly name'),
  ]),
  // Wallet Setup
  mcp('limitless', 'Wallet Setup', 'setup-wallet', 'limitless_setup_wallet', 'Setup Wallet', 'Generate a new Base wallet. Private key is encrypted and stored securely.', true),
  mcp('limitless', 'Wallet Setup', 'import-wallet', 'limitless_import_wallet', 'Import Wallet (Encrypted)', 'Import an existing Base/Ethereum wallet using encrypted bundle.', true, [
    p('encryptedKey', 'string', true, 'Encrypted private key blob'),
    p('salt', 'string', true, 'Salt (hex encoded)'),
    p('iv', 'string', true, 'IV (hex encoded)'),
    p('publicKey', 'string', true, 'Ethereum/Base wallet address'),
    p('version', 'string', false, 'Bundle version', { defaultValue: '1.0' }),
  ]),
  mcp('limitless', 'Wallet Setup', 'get-wallet-import-instructions', 'limitless_get_wallet_import_instructions', 'Import Instructions', 'Get instructions for securely exporting your Base wallet for import.', true),
  mcp('limitless', 'Wallet Setup', 'import-private-key', 'limitless_import_private_key', 'Import Private Key', 'Import an existing private key directly.', false, [
    p('externalId', 'string', true, 'Your unique identifier'),
    p('privateKey', 'string', true, 'Hex-encoded Ethereum private key'),
    p('keyName', 'string', false, 'Optional friendly name'),
  ]),
  // Wallet Info
  mcp('limitless', 'Wallet Info', 'get-wallet-info', 'limitless_get_wallet_info', 'Wallet Info', 'Get wallet information including Base address and wallet type.', true),
  mcp('limitless', 'Wallet Info', 'get-wallet-status', 'limitless_get_wallet_status', 'Wallet Status', 'Get comprehensive status including address, type, balances, and account status.', true),
  mcp('limitless', 'Wallet Info', 'get-balances', 'limitless_get_balances', 'Get Balances', 'Get your ETH and USDC balances on Base.', true),
  mcp('limitless', 'Wallet Info', 'get-deposit-address', 'limitless_get_deposit_address', 'Deposit Address', 'Get your wallet address for depositing ETH and USDC on Base.', true),
  mcp('limitless', 'Wallet Info', 'export-private-key', 'limitless_export_private_key', 'Export Private Key', 'Export your wallet private key. WARNING: Handle securely.', true),
  // Markets
  mcp('limitless', 'Markets', 'get-markets', 'limitless_get_markets', 'List Markets', 'List active prediction markets on Limitless Exchange with pagination.', true, [
    p('limit', 'number', false, 'Max markets (default 20, max 100)', { defaultValue: '20' }),
    p('page', 'number', false, 'Page number', { defaultValue: '1' }),
    p('category', 'string', false, 'Category ID filter'),
  ]),
  mcp('limitless', 'Markets', 'search-markets', 'limitless_search_markets', 'Search Markets', 'Search prediction markets using semantic/natural language search.', true, [
    p('query', 'string', true, 'Search query - natural language or keywords'),
    p('limit', 'number', false, 'Max results', { defaultValue: '20' }),
  ]),
  mcp('limitless', 'Markets', 'get-market', 'limitless_get_market', 'Get Market', 'Get detailed info about a specific market including prices, venue data, and token IDs.', true, [
    p('slug', 'string', true, 'Market slug or address'),
  ]),
  mcp('limitless', 'Markets', 'get-orderbook', 'limitless_get_orderbook', 'Orderbook', 'Get current CLOB orderbook showing all open buy and sell orders.', true, [
    p('marketSlug', 'string', true, 'Market slug'),
  ]),
  mcp('limitless', 'Markets', 'get-price-history', 'limitless_get_price_history', 'Price History', 'Get historical price data for a market.', true, [
    p('marketSlug', 'string', true, 'Market slug'),
    p('interval', 'string', false, 'Time interval', { defaultValue: '1h', enumValues: ['1m', '5m', '15m', '1h', '4h', '1d'] }),
    p('limit', 'number', false, 'Number of data points', { defaultValue: '100' }),
  ]),
  mcp('limitless', 'Markets', 'get-categories', 'limitless_get_categories', 'Categories', 'Get list of market categories with active market counts.', true),
  // Trading
  mcp('limitless', 'Trading', 'place-order', 'limitless_place_order', 'Place Order', 'Place a limit order on Limitless. Requires CLOB-enabled market. Check approvals first.', true, [
    p('marketSlug', 'string', true, 'Market slug'),
    p('tokenId', 'string', true, 'Token ID (YES or NO outcome)'),
    p('side', 'string', true, 'BUY or SELL', { enumValues: ['BUY', 'SELL'] }),
    p('price', 'number', true, 'Limit price (0.01 to 0.99)'),
    p('size', 'number', true, 'Number of shares'),
    p('orderType', 'string', false, 'Order type', { defaultValue: 'GTC', enumValues: ['GTC', 'FOK', 'GTD', 'IOC'] }),
    p('expirationSeconds', 'number', false, 'Seconds until expiration for GTD orders'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('limitless', 'Trading', 'get-quote', 'limitless_get_quote', 'Get Quote', 'Estimate fill price and cost before placing an order.', true, [
    p('marketSlug', 'string', true, 'Market slug'),
    p('tokenId', 'string', true, 'Token ID (YES/NO outcome)'),
    p('side', 'string', true, 'BUY or SELL', { enumValues: ['BUY', 'SELL'] }),
    p('size', 'number', true, 'Number of shares'),
  ]),
  mcp('limitless', 'Approvals', 'check-approvals', 'limitless_check_approvals', 'Check Approvals', 'Check if wallet has required token approvals to trade on a market.', true, [
    p('marketSlug', 'string', true, 'Market slug'),
  ]),
  mcp('limitless', 'Approvals', 'set-approvals', 'limitless_set_approvals', 'Set Approvals', 'Set token approvals for trading. Costs ETH for gas.', true, [
    p('marketSlug', 'string', true, 'Market slug'),
    p('force', 'boolean', false, 'Re-approve even if already approved'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('limitless', 'Trading', 'get-locked-balance', 'limitless_get_locked_balance', 'Locked Balance', 'Get USDC locked in open orders (not available for new trades).', true, [
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  // Orders
  mcp('limitless', 'Orders', 'cancel-order', 'limitless_cancel_order', 'Cancel Order', 'Cancel a single open order.', true, [
    p('orderId', 'string', true, 'Order ID to cancel'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('limitless', 'Orders', 'cancel-all-orders', 'limitless_cancel_all_orders', 'Cancel All Orders', 'Cancel all open orders in a specific market.', true, [
    p('marketSlug', 'string', true, 'Market slug'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('limitless', 'Orders', 'get-orders', 'limitless_get_orders', 'Get Orders', 'Get open and historical orders for a specific market.', true, [
    p('marketSlug', 'string', true, 'Market slug'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('limitless', 'Orders', 'get-all-orders', 'limitless_get_all_orders', 'All Orders', 'Get all live orders across all markets.', true, [
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  // Positions
  mcp('limitless', 'Positions', 'get-positions', 'limitless_get_positions', 'Get Positions', 'Get active prediction market positions with entry prices and P&L.', true, [
    p('includeSettled', 'boolean', false, 'Include resolved positions', { defaultValue: 'false' }),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('limitless', 'Positions', 'sync-positions', 'limitless_sync_positions', 'Sync Positions', 'Refresh position data from Limitless API.', true, [
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('limitless', 'Positions', 'get-onchain-shares', 'limitless_get_onchain_shares', 'On-Chain Shares', 'Scan blockchain for ALL ERC-1155 outcome tokens including ones not tracked by API.', true),
  mcp('limitless', 'Positions', 'check-token-balance', 'limitless_check_token_balance', 'Check Token Balance', 'Check on-chain balance of a specific ERC-1155 token ID.', true, [
    p('tokenId', 'string', true, 'ERC-1155 token ID'),
  ]),
  mcp('limitless', 'Positions', 'get-public-positions', 'limitless_get_public_positions', 'Public Positions', 'Get positions for any wallet address using public API (no auth required).', false, [
    p('walletAddress', 'string', false, 'Base/Ethereum wallet address'),
  ]),
  mcp('limitless', 'Positions', 'get-trades', 'limitless_get_trades', 'Trade History', 'Get executed trade history with prices, sizes, fees, and P&L.', true, [
    p('limit', 'number', false, 'Max trades', { defaultValue: '50' }),
    p('offset', 'number', false, 'Pagination offset', { defaultValue: '0' }),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('limitless', 'Positions', 'get-portfolio-history', 'limitless_get_portfolio_history', 'Portfolio History', 'Get full portfolio activity including trades, splits, merges, and settlements.', true, [
    p('page', 'number', false, 'Page number', { defaultValue: '1' }),
    p('limit', 'number', false, 'Items per page', { defaultValue: '50' }),
    p('from', 'string', false, 'Start date (ISO 8601)'),
    p('to', 'string', false, 'End date (ISO 8601)'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  // Transfers
  mcp('limitless', 'Transfers', 'send-eth', 'limitless_send_eth', 'Send ETH', 'Send ETH to another address on Base.', true, [
    p('toAddress', 'string', true, 'Destination Base address'),
    p('amount', 'number', true, 'Amount of ETH'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('limitless', 'Transfers', 'send-usdc', 'limitless_send_usdc', 'Send USDC', 'Send USDC to another address on Base.', true, [
    p('toAddress', 'string', true, 'Destination Base address'),
    p('amount', 'number', true, 'Amount of USDC'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  // API Keys
  mcp('limitless', 'API Keys', 'list-api-keys', 'limitless_list_api_keys', 'List API Keys', 'List all your API keys.', true),
  mcp('limitless', 'API Keys', 'create-api-key', 'limitless_create_api_key', 'Create API Key', 'Create a new API key. Key and secret shown once at creation.', true, [
    p('name', 'string', false, 'Optional friendly name'),
  ]),
  mcp('limitless', 'API Keys', 'revoke-api-key', 'limitless_revoke_api_key', 'Revoke API Key', 'Permanently revoke an API key.', true, [
    p('keyId', 'string', true, 'API key ID to revoke'),
  ]),
  // Tokens
  mcp('limitless', 'Tokens', 'search-tokens', 'limitless_search_tokens', 'Search Tokens', 'Search for Base chain tokens (meme coins, ERC-20s) via DEX Screener.', true, [
    p('query', 'string', true, 'Search query (name or symbol)'),
    p('limit', 'number', false, 'Max results', { defaultValue: '10' }),
  ]),
  mcp('limitless', 'Tokens', 'get-token-info', 'limitless_get_token_info', 'Token Info', 'Get detailed Base token info including price, liquidity, volume, and social links.', true, [
    p('token', 'string', true, 'Token symbol or contract address'),
  ]),
  mcp('limitless', 'Tokens', 'get-trending-tokens', 'limitless_get_trending_tokens', 'Trending Tokens', 'Get trending Base chain meme coins from DEX Screener.', true, [
    p('limit', 'number', false, 'Max results', { defaultValue: '10' }),
  ]),
  mcp('limitless', 'Tokens', 'get-swap-quote', 'limitless_get_swap_quote', 'Swap Quote', 'Get a swap quote for Base token pair via LI.FI without executing.', true, [
    p('fromToken', 'string', true, 'Token to sell (symbol or address)'),
    p('toToken', 'string', true, 'Token to buy'),
    p('amount', 'number', true, 'Amount to swap'),
    p('slippageBps', 'number', false, 'Slippage tolerance', { defaultValue: '100' }),
  ]),
  mcp('limitless', 'Tokens', 'swap-tokens', 'limitless_swap_tokens', 'Swap Tokens', 'Swap ANY Base token pair via LI.FI. Auto-approves ERC-20 spending.', true, [
    p('fromToken', 'string', true, 'Token to sell'),
    p('toToken', 'string', true, 'Token to buy'),
    p('amount', 'number', true, 'Amount to swap'),
    p('slippageBps', 'number', false, 'Slippage tolerance', { defaultValue: '100' }),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('limitless', 'Tokens', 'approve-token', 'limitless_approve_token', 'Approve Token', 'Manually approve an ERC-20 token for DEX router spending.', true, [
    p('tokenAddress', 'string', true, 'ERC-20 contract address'),
    p('spenderAddress', 'string', true, 'DEX router address'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('limitless', 'Tokens', 'get-token-balance', 'limitless_get_token_balance', 'Token Balance', 'Check balance of any ERC-20 token or ETH on Base.', true, [
    p('token', 'string', true, 'Token symbol or contract address'),
  ]),
  mcp('limitless', 'Tokens', 'get-token-holdings', 'limitless_get_token_holdings', 'Token Holdings', 'Get ALL ERC-20 token holdings with balances, symbols, and USD values.', true),
  // Bridge
  mcp('limitless', 'Bridge', 'bridge-quote', 'limitless_bridge_quote', 'Bridge Quote', 'Get quote for bridging USDC from Base to Polygon via LI.FI.', true, [
    p('amount', 'number', true, 'Amount of USDC to bridge'),
    p('toAddress', 'string', true, 'Destination Polygon wallet address'),
    p('destToken', 'string', false, 'USDC variant to receive on Polygon', { defaultValue: 'USDC', enumValues: ['USDC', 'NATIVE_USDC'] }),
  ]),
  mcp('limitless', 'Bridge', 'bridge-execute', 'limitless_bridge_execute', 'Execute Bridge', 'Bridge USDC from Base to Polygon. Takes 2-4 minutes.', true, [
    p('amount', 'number', true, 'Amount of USDC to bridge'),
    p('toAddress', 'string', true, 'Destination Polygon address'),
    p('destToken', 'string', false, 'USDC variant', { defaultValue: 'USDC', enumValues: ['USDC', 'NATIVE_USDC'] }),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  // Redemption
  mcp('limitless', 'Redemption', 'get-redeemable-positions', 'limitless_get_redeemable_positions', 'Redeemable Positions', 'Find settled positions that can be redeemed for USDC.', true, [
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('limitless', 'Redemption', 'redeem-winnings', 'limitless_redeem_winnings', 'Redeem Winnings', 'Redeem winning shares from a resolved market. Costs ETH for gas.', true, [
    p('marketSlug', 'string', true, 'Market slug to redeem from'),
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
  mcp('limitless', 'Redemption', 'redeem-all', 'limitless_redeem_all', 'Redeem All', 'Redeem ALL winning shares from all resolved markets at once.', true, [
    p('password', 'string', false, 'Password for imported wallets'),
  ]),
];
