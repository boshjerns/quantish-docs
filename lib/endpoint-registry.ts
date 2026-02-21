// ============================================
// ENDPOINT REGISTRY - Single source of truth
// Drives pages, navigation, and search
// ============================================

import { discoveryTools, polymarketMcpTools, kalshiMcpTools, limitlessMcpTools } from './mcp-tools';

// --- Types ---

export type EndpointType = 'rest' | 'mcp';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type Section = 'api' | 'mcp';

export interface ParamDef {
  name: string;
  type: string;
  required: boolean;
  description: string;
  location?: 'query' | 'path' | 'body';
  defaultValue?: string;
  enumValues?: string[];
}

export interface EndpointEntry {
  slug: string;
  name: string;
  type: EndpointType;
  section: Section;
  platform: string;
  subcategory: string;
  method?: HttpMethod;
  path?: string;
  toolName?: string;
  description: string;
  params?: ParamDef[];
  requiresAuth: boolean;
}

// --- Platform metadata ---

export interface PlatformInfo {
  name: string;
  description: string;
  logo?: string;
  chain?: string;
  requiresAuth: boolean;
}

export const platformInfo: Record<string, PlatformInfo> = {
  auth: { name: 'Authentication', description: 'Account signup and API key management', requiresAuth: false },
  markets: { name: 'Markets', description: 'Search and discover prediction markets across all platforms', requiresAuth: false },
  wallets: { name: 'Wallet Analytics', description: 'Wallet profiles, whale tracking, and social discovery', requiresAuth: false },
  account: { name: 'Account', description: 'Balances, positions, and orders across all platforms', requiresAuth: true },
  polymarket: { name: 'Polymarket', description: 'Trading on Polymarket via Polygon', logo: '/polymarket-logo.svg', chain: 'Polygon', requiresAuth: true },
  kalshi: { name: 'Kalshi', description: 'Trading on Kalshi via DFlow on Solana', logo: '/kalshi-logo.svg', chain: 'Solana', requiresAuth: true },
  limitless: { name: 'Limitless', description: 'Trading on Limitless Exchange on Base', logo: '/limitless-logo.svg', chain: 'Base', requiresAuth: true },
  discovery: { name: 'Discovery', description: 'Search and discover prediction markets across all platforms', requiresAuth: false },
};

// --- REST Endpoints (66) ---

const restEndpoints: EndpointEntry[] = [
  // AUTH (4)
  { slug: 'signup', name: 'Sign Up', type: 'rest', section: 'api', platform: 'auth', subcategory: 'Account', method: 'POST', path: '/v1/auth/signup', description: 'Create account across all platforms (Polymarket, Kalshi, Limitless). Returns unified API key.', requiresAuth: false, params: [
    { name: 'externalId', type: 'string', required: true, description: 'Unique identifier for your user', location: 'body' },
    { name: 'keyName', type: 'string', required: false, description: 'Friendly name for the API key', location: 'body' },
  ]},
  { slug: 'list-keys', name: 'List API Keys', type: 'rest', section: 'api', platform: 'auth', subcategory: 'API Keys', method: 'GET', path: '/v1/auth/keys', description: 'List all API keys associated with your account.', requiresAuth: true },
  { slug: 'create-key', name: 'Create API Key', type: 'rest', section: 'api', platform: 'auth', subcategory: 'API Keys', method: 'POST', path: '/v1/auth/keys', description: 'Create an additional API key for your account.', requiresAuth: true, params: [
    { name: 'name', type: 'string', required: false, description: 'Friendly name for the new key', location: 'body' },
  ]},
  { slug: 'revoke-key', name: 'Revoke API Key', type: 'rest', section: 'api', platform: 'auth', subcategory: 'API Keys', method: 'DELETE', path: '/v1/auth/keys/:id', description: 'Revoke an API key by ID.', requiresAuth: true, params: [
    { name: 'id', type: 'string', required: true, description: 'API key ID to revoke', location: 'path' },
  ]},

  // MARKETS (9)
  { slug: 'search', name: 'Search Markets', type: 'rest', section: 'api', platform: 'markets', subcategory: 'Search', method: 'GET', path: '/v1/markets', description: 'Search prediction markets across all platforms.', requiresAuth: false, params: [
    { name: 'query', type: 'string', required: false, description: 'Search query', location: 'query' },
    { name: 'platform', type: 'string', required: false, description: 'Filter by platform', location: 'query', enumValues: ['polymarket', 'kalshi', 'limitless', 'all'] },
    { name: 'category', type: 'string', required: false, description: 'Filter by category', location: 'query' },
    { name: 'limit', type: 'number', required: false, description: 'Max results (default 20)', location: 'query' },
    { name: 'sortBy', type: 'string', required: false, description: 'Sort order', location: 'query', enumValues: ['relevance', 'soonest', 'latest'] },
  ]},
  { slug: 'trending', name: 'Trending Markets', type: 'rest', section: 'api', platform: 'markets', subcategory: 'Search', method: 'GET', path: '/v1/markets/trending', description: 'Get trending prediction markets by 24h volume.', requiresAuth: false, params: [
    { name: 'platform', type: 'string', required: false, description: 'Filter by platform', location: 'query', enumValues: ['polymarket', 'kalshi', 'all'] },
    { name: 'limit', type: 'number', required: false, description: 'Max results (default 5)', location: 'query' },
  ]},
  { slug: 'categories', name: 'Get Categories', type: 'rest', section: 'api', platform: 'markets', subcategory: 'Metadata', method: 'GET', path: '/v1/markets/categories', description: 'List all available market categories.', requiresAuth: false },
  { slug: 'stats', name: 'Market Stats', type: 'rest', section: 'api', platform: 'markets', subcategory: 'Metadata', method: 'GET', path: '/v1/markets/stats', description: 'Get aggregate statistics about prediction markets.', requiresAuth: false },
  { slug: 'keyword-search', name: 'Keyword Search', type: 'rest', section: 'api', platform: 'markets', subcategory: 'Search', method: 'GET', path: '/v1/markets/search', description: 'Fast keyword search across markets using PostgreSQL Full-Text Search.', requiresAuth: false, params: [
    { name: 'query', type: 'string', required: false, description: 'Keywords to search', location: 'query' },
    { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
  ]},
  { slug: 'arbitrage', name: 'Find Arbitrage', type: 'rest', section: 'api', platform: 'markets', subcategory: 'Analytics', method: 'GET', path: '/v1/markets/arbitrage', description: 'Find arbitrage opportunities across prediction markets.', requiresAuth: false, params: [
    { name: 'type', type: 'string', required: false, description: 'Type of arbitrage', location: 'query', enumValues: ['spread', 'multi_outcome', 'cross_market', 'all'] },
    { name: 'minSpread', type: 'number', required: false, description: 'Minimum spread percentage', location: 'query' },
  ]},
  { slug: 'by-probability', name: 'By Probability', type: 'rest', section: 'api', platform: 'markets', subcategory: 'Analytics', method: 'GET', path: '/v1/markets/probability', description: 'Find markets filtered by probability range.', requiresAuth: false, params: [
    { name: 'min', type: 'number', required: false, description: 'Minimum probability (0-100)', location: 'query' },
    { name: 'max', type: 'number', required: false, description: 'Maximum probability (0-100)', location: 'query' },
    { name: 'platform', type: 'string', required: false, description: 'Filter by platform', location: 'query' },
    { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
  ]},
  { slug: 'get-market', name: 'Get Market', type: 'rest', section: 'api', platform: 'markets', subcategory: 'Details', method: 'GET', path: '/v1/markets/:id', description: 'Get detailed information about a specific market.', requiresAuth: false, params: [
    { name: 'id', type: 'string', required: true, description: 'Market ID', location: 'path' },
  ]},
  { slug: 'related', name: 'Related Markets', type: 'rest', section: 'api', platform: 'markets', subcategory: 'Analytics', method: 'GET', path: '/v1/markets/:id/related', description: 'Find semantically related markets.', requiresAuth: false, params: [
    { name: 'id', type: 'string', required: true, description: 'Market ID', location: 'path' },
    { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
  ]},

  // WALLETS (7)
  { slug: 'whales', name: 'Whale Activity', type: 'rest', section: 'api', platform: 'wallets', subcategory: 'Market Analysis', method: 'GET', path: '/v1/wallets/whales', description: 'Get whale activity for a specific market.', requiresAuth: false, params: [
    { name: 'marketId', type: 'string', required: true, description: 'Polymarket conditionId', location: 'query' },
    { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
    { name: 'minVolume', type: 'number', required: false, description: 'Minimum volume filter', location: 'query' },
  ]},
  { slug: 'compare', name: 'Compare Wallets', type: 'rest', section: 'api', platform: 'wallets', subcategory: 'Comparison', method: 'GET', path: '/v1/wallets/compare', description: "Compare two wallets' portfolio overlap.", requiresAuth: false, params: [
    { name: 'w1', type: 'string', required: true, description: 'First wallet address', location: 'query' },
    { name: 'w2', type: 'string', required: true, description: 'Second wallet address', location: 'query' },
  ]},
  { slug: 'contrarian', name: 'Contrarian Traders', type: 'rest', section: 'api', platform: 'wallets', subcategory: 'Market Analysis', method: 'GET', path: '/v1/wallets/contrarian/:marketId', description: 'Find traders betting against consensus on a market.', requiresAuth: false, params: [
    { name: 'marketId', type: 'string', required: true, description: 'Market conditionId', location: 'path' },
  ]},
  { slug: 'profile', name: 'Wallet Profile', type: 'rest', section: 'api', platform: 'wallets', subcategory: 'Profiles', method: 'GET', path: '/v1/wallets/:address/profile', description: 'Get detailed analytical breakdown of a wallet.', requiresAuth: false, params: [
    { name: 'address', type: 'string', required: true, description: 'Wallet address', location: 'path' },
  ]},
  { slug: 'interests', name: 'Wallet Interests', type: 'rest', section: 'api', platform: 'wallets', subcategory: 'Profiles', method: 'GET', path: '/v1/wallets/:address/interests', description: 'Get recommended markets based on wallet trading history.', requiresAuth: false, params: [
    { name: 'address', type: 'string', required: true, description: 'Wallet address', location: 'path' },
  ]},
  { slug: 'momentum', name: 'Wallet Momentum', type: 'rest', section: 'api', platform: 'wallets', subcategory: 'Profiles', method: 'GET', path: '/v1/wallets/:address/momentum', description: 'Get current winning/losing positions for a wallet.', requiresAuth: false, params: [
    { name: 'address', type: 'string', required: true, description: 'Wallet address', location: 'path' },
  ]},
  { slug: 'social', name: 'Social Discovery', type: 'rest', section: 'api', platform: 'wallets', subcategory: 'Discovery', method: 'GET', path: '/v1/wallets/:address/social', description: "Find markets based on similar wallets' trades.", requiresAuth: false, params: [
    { name: 'address', type: 'string', required: true, description: 'Wallet address', location: 'path' },
  ]},

  // ACCOUNT (4)
  { slug: 'balances', name: 'All Balances', type: 'rest', section: 'api', platform: 'account', subcategory: 'Portfolio', method: 'GET', path: '/v1/account/balances', description: 'Get balances across all platforms.', requiresAuth: true },
  { slug: 'positions', name: 'All Positions', type: 'rest', section: 'api', platform: 'account', subcategory: 'Portfolio', method: 'GET', path: '/v1/account/positions', description: 'Get positions across all platforms.', requiresAuth: true },
  { slug: 'orders', name: 'All Orders', type: 'rest', section: 'api', platform: 'account', subcategory: 'Portfolio', method: 'GET', path: '/v1/account/orders', description: 'Get orders across all platforms.', requiresAuth: true, params: [
    { name: 'status', type: 'string', required: false, description: 'Filter by order status', location: 'query' },
    { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
  ]},
  { slug: 'wallet-status', name: 'All Wallet Status', type: 'rest', section: 'api', platform: 'account', subcategory: 'Portfolio', method: 'GET', path: '/v1/account/wallets', description: 'Get wallet status across all platforms.', requiresAuth: true },

  // POLYMARKET REST (18)
  { slug: 'place-order', name: 'Place Order', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Orders', method: 'POST', path: '/v1/polymarket/orders', description: 'Place a buy or sell order on Polymarket.', requiresAuth: true, params: [
    { name: 'conditionId', type: 'string', required: true, description: 'Market condition ID', location: 'body' },
    { name: 'tokenId', type: 'string', required: true, description: 'Outcome token ID', location: 'body' },
    { name: 'side', type: 'string', required: true, description: 'BUY or SELL', location: 'body', enumValues: ['BUY', 'SELL'] },
    { name: 'price', type: 'number', required: true, description: 'Price per share (0.01-0.99)', location: 'body' },
    { name: 'size', type: 'number', required: true, description: 'Number of shares', location: 'body' },
  ]},
  { slug: 'atomic-orders', name: 'Atomic Orders', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Orders', method: 'POST', path: '/v1/polymarket/orders/atomic', description: 'Execute multiple orders atomically (all succeed or all fail).', requiresAuth: true, params: [
    { name: 'orders', type: 'array', required: true, description: 'Array of order objects', location: 'body' },
  ]},
  { slug: 'cancel-order', name: 'Cancel Order', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Orders', method: 'DELETE', path: '/v1/polymarket/orders/:id', description: 'Cancel an order by ID.', requiresAuth: true, params: [
    { name: 'id', type: 'string', required: true, description: 'Order ID', location: 'path' },
  ]},
  { slug: 'orderbook', name: 'Orderbook', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Market Data', method: 'GET', path: '/v1/polymarket/orderbook/:tokenId', description: 'Get orderbook for a token showing bids and asks.', requiresAuth: true, params: [
    { name: 'tokenId', type: 'string', required: true, description: 'Token ID', location: 'path' },
  ]},
  { slug: 'price', name: 'Get Price', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Market Data', method: 'GET', path: '/v1/polymarket/price/:tokenId', description: 'Get current midpoint price for a token.', requiresAuth: true, params: [
    { name: 'tokenId', type: 'string', required: true, description: 'Token ID', location: 'path' },
  ]},
  { slug: 'claimable', name: 'Claimable Winnings', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Redemption', method: 'GET', path: '/v1/polymarket/claimable', description: 'Get claimable winnings from resolved markets.', requiresAuth: true },
  { slug: 'redeem', name: 'Redeem Winnings', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Redemption', method: 'POST', path: '/v1/polymarket/redeem', description: 'Claim winnings from resolved markets.', requiresAuth: true },
  { slug: 'transfer-usdc', name: 'Transfer USDC', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Transfers', method: 'POST', path: '/v1/polymarket/transfer/usdc', description: 'Transfer USDC from your Safe wallet.', requiresAuth: true, params: [
    { name: 'toAddress', type: 'string', required: true, description: 'Destination address', location: 'body' },
    { name: 'amount', type: 'number', required: true, description: 'Amount to transfer', location: 'body' },
  ]},
  { slug: 'swap', name: 'Swap Tokens', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Swaps', method: 'POST', path: '/v1/polymarket/swap', description: 'Swap tokens on Polygon via LI.FI aggregator.', requiresAuth: true, params: [
    { name: 'fromToken', type: 'string', required: true, description: 'Token to swap from', location: 'body' },
    { name: 'toToken', type: 'string', required: true, description: 'Token to swap to', location: 'body' },
    { name: 'amount', type: 'number', required: true, description: 'Amount to swap', location: 'body' },
  ]},
  { slug: 'swap-quote', name: 'Swap Quote', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Swaps', method: 'GET', path: '/v1/polymarket/swap/quote', description: 'Get a quote for a token swap without executing.', requiresAuth: true, params: [
    { name: 'fromToken', type: 'string', required: true, description: 'Token to swap from', location: 'query' },
    { name: 'toToken', type: 'string', required: true, description: 'Token to swap to', location: 'query' },
    { name: 'amount', type: 'number', required: true, description: 'Amount to swap', location: 'query' },
  ]},
  { slug: 'top-traders', name: 'Top Traders', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Copy Trading', method: 'GET', path: '/v1/polymarket/copy/traders', description: 'Get top traders leaderboard.', requiresAuth: true, params: [
    { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
    { name: 'sortBy', type: 'string', required: false, description: 'Sort by PNL or VOL', location: 'query', enumValues: ['PNL', 'VOL'] },
  ]},
  { slug: 'trader-profile', name: 'Trader Profile', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Copy Trading', method: 'GET', path: '/v1/polymarket/copy/traders/:address', description: 'Get profile for a specific trader.', requiresAuth: true, params: [
    { name: 'address', type: 'string', required: true, description: 'Wallet address', location: 'path' },
  ]},
  { slug: 'follow', name: 'Follow Trader', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Copy Trading', method: 'POST', path: '/v1/polymarket/copy/follow', description: 'Start copy trading a wallet.', requiresAuth: true, params: [
    { name: 'targetWallet', type: 'string', required: true, description: 'Wallet to copy', location: 'body' },
  ]},
  { slug: 'unfollow', name: 'Unfollow Trader', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Copy Trading', method: 'POST', path: '/v1/polymarket/copy/unfollow', description: 'Stop copy trading a wallet.', requiresAuth: true, params: [
    { name: 'targetWallet', type: 'string', required: true, description: 'Wallet to stop copying', location: 'body' },
  ]},
  { slug: 'following', name: 'List Following', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Copy Trading', method: 'GET', path: '/v1/polymarket/copy/following', description: 'List wallets you are copy trading.', requiresAuth: true },
  { slug: 'copy-settings', name: 'Update Copy Settings', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Copy Trading', method: 'PUT', path: '/v1/polymarket/copy/settings', description: 'Update copy trade settings.', requiresAuth: true },
  { slug: 'copy-history', name: 'Copy History', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Copy Trading', method: 'GET', path: '/v1/polymarket/copy/history', description: 'Get copy trade execution history.', requiresAuth: true, params: [
    { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
  ]},
  { slug: 'copy-status', name: 'Copy Engine Status', type: 'rest', section: 'api', platform: 'polymarket', subcategory: 'Copy Trading', method: 'GET', path: '/v1/polymarket/copy/status', description: 'Get copy trading engine status.', requiresAuth: true },

  // KALSHI REST (14)
  { slug: 'buy-yes', name: 'Buy Yes', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'Orders', method: 'POST', path: '/v1/kalshi/orders/buy-yes', description: 'Buy YES outcome tokens on Kalshi.', requiresAuth: true, params: [
    { name: 'marketTicker', type: 'string', required: true, description: 'Kalshi market ticker', location: 'body' },
    { name: 'yesOutcomeMint', type: 'string', required: true, description: 'YES token mint address', location: 'body' },
    { name: 'usdcAmount', type: 'number', required: true, description: 'USDC to spend', location: 'body' },
  ]},
  { slug: 'buy-no', name: 'Buy No', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'Orders', method: 'POST', path: '/v1/kalshi/orders/buy-no', description: 'Buy NO outcome tokens on Kalshi.', requiresAuth: true, params: [
    { name: 'marketTicker', type: 'string', required: true, description: 'Kalshi market ticker', location: 'body' },
    { name: 'noOutcomeMint', type: 'string', required: true, description: 'NO token mint address', location: 'body' },
    { name: 'usdcAmount', type: 'number', required: true, description: 'USDC to spend', location: 'body' },
  ]},
  { slug: 'sell', name: 'Sell Position', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'Orders', method: 'POST', path: '/v1/kalshi/orders/sell', description: 'Sell Kalshi outcome tokens back to USDC.', requiresAuth: true, params: [
    { name: 'outcomeMint', type: 'string', required: true, description: 'Token mint to sell', location: 'body' },
    { name: 'tokenAmount', type: 'number', required: true, description: 'Amount to sell', location: 'body' },
  ]},
  { slug: 'quote', name: 'Get Quote', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'Market Data', method: 'GET', path: '/v1/kalshi/quote', description: 'Get a quote for a Kalshi trade via DFlow.', requiresAuth: true, params: [
    { name: 'inputMint', type: 'string', required: true, description: 'Input token mint', location: 'query' },
    { name: 'outputMint', type: 'string', required: true, description: 'Output token mint', location: 'query' },
    { name: 'amount', type: 'number', required: true, description: 'Amount in smallest units', location: 'query' },
  ]},
  { slug: 'live-data', name: 'Live Market Data', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'Market Data', method: 'GET', path: '/v1/kalshi/markets/:ticker/live', description: 'Get live pricing for a Kalshi market.', requiresAuth: true, params: [
    { name: 'ticker', type: 'string', required: true, description: 'Market ticker', location: 'path' },
  ]},
  { slug: 'events', name: 'List Events', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'Market Data', method: 'GET', path: '/v1/kalshi/events', description: 'Get Kalshi events with optional filters.', requiresAuth: true, params: [
    { name: 'category', type: 'string', required: false, description: 'Filter by category', location: 'query' },
    { name: 'marketStatus', type: 'string', required: false, description: 'Market status filter', location: 'query', enumValues: ['active', 'inactive', 'finalized'] },
    { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
  ]},
  { slug: 'claimable', name: 'Claimable Positions', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'Redemption', method: 'GET', path: '/v1/kalshi/claimable', description: 'Get redeemable positions from settled markets.', requiresAuth: true },
  { slug: 'redeem', name: 'Redeem Winnings', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'Redemption', method: 'POST', path: '/v1/kalshi/redeem', description: 'Redeem winnings from a settled market.', requiresAuth: true },
  { slug: 'redeem-all', name: 'Redeem All', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'Redemption', method: 'POST', path: '/v1/kalshi/redeem/all', description: 'Redeem all winning positions at once.', requiresAuth: true },
  { slug: 'kyc-status', name: 'KYC Status', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'KYC', method: 'GET', path: '/v1/kalshi/kyc/status', description: 'Check KYC verification status via DFlow Proof.', requiresAuth: true },
  { slug: 'kyc-link', name: 'KYC Link', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'KYC', method: 'GET', path: '/v1/kalshi/kyc/link', description: 'Get KYC verification link.', requiresAuth: true, params: [
    { name: 'redirectUri', type: 'string', required: false, description: 'Redirect URL after verification', location: 'query' },
  ]},
  { slug: 'transfer-usdc', name: 'Transfer USDC', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'Transfers', method: 'POST', path: '/v1/kalshi/transfer/usdc', description: 'Transfer USDC on Solana.', requiresAuth: true },
  { slug: 'transfer-sol', name: 'Transfer SOL', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'Transfers', method: 'POST', path: '/v1/kalshi/transfer/sol', description: 'Transfer SOL on Solana.', requiresAuth: true },
  { slug: 'swap', name: 'Swap Tokens', type: 'rest', section: 'api', platform: 'kalshi', subcategory: 'Swaps', method: 'POST', path: '/v1/kalshi/swap', description: 'Swap tokens via Jupiter on Solana.', requiresAuth: true },

  // LIMITLESS REST (14)
  { slug: 'place-order', name: 'Place Order', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Orders', method: 'POST', path: '/v1/limitless/orders', description: 'Place an order on Limitless Exchange.', requiresAuth: true },
  { slug: 'cancel-order', name: 'Cancel Order', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Orders', method: 'DELETE', path: '/v1/limitless/orders/:id', description: 'Cancel an order by ID.', requiresAuth: true, params: [
    { name: 'id', type: 'string', required: true, description: 'Order ID', location: 'path' },
  ]},
  { slug: 'cancel-all', name: 'Cancel All Orders', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Orders', method: 'DELETE', path: '/v1/limitless/orders', description: 'Cancel all open orders.', requiresAuth: true },
  { slug: 'orderbook', name: 'Orderbook', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Market Data', method: 'GET', path: '/v1/limitless/orderbook/:tokenId', description: 'Get orderbook for a token.', requiresAuth: true, params: [
    { name: 'tokenId', type: 'string', required: true, description: 'Token ID', location: 'path' },
  ]},
  { slug: 'quote', name: 'Get Quote', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Market Data', method: 'GET', path: '/v1/limitless/quote', description: 'Get a quote for a Limitless trade.', requiresAuth: true, params: [
    { name: 'marketSlug', type: 'string', required: true, description: 'Market slug', location: 'query' },
    { name: 'tokenId', type: 'string', required: true, description: 'Token ID', location: 'query' },
    { name: 'side', type: 'string', required: true, description: 'BUY or SELL', location: 'query', enumValues: ['BUY', 'SELL'] },
    { name: 'size', type: 'number', required: true, description: 'Number of shares', location: 'query' },
  ]},
  { slug: 'claimable', name: 'Claimable Positions', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Redemption', method: 'GET', path: '/v1/limitless/claimable', description: 'Get redeemable positions from settled markets.', requiresAuth: true },
  { slug: 'redeem', name: 'Redeem Winnings', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Redemption', method: 'POST', path: '/v1/limitless/redeem', description: 'Redeem winnings from a settled market.', requiresAuth: true },
  { slug: 'redeem-all', name: 'Redeem All', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Redemption', method: 'POST', path: '/v1/limitless/redeem/all', description: 'Redeem all winning positions at once.', requiresAuth: true },
  { slug: 'transfer-usdc', name: 'Transfer USDC', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Transfers', method: 'POST', path: '/v1/limitless/transfer/usdc', description: 'Transfer USDC on Base.', requiresAuth: true },
  { slug: 'swap', name: 'Swap Tokens', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Swaps', method: 'POST', path: '/v1/limitless/swap', description: 'Swap tokens on Base via LI.FI.', requiresAuth: true },
  { slug: 'bridge-quote', name: 'Bridge Quote', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Bridge', method: 'GET', path: '/v1/limitless/bridge/quote', description: 'Get a quote for bridging USDC between Polygon and Base.', requiresAuth: true, params: [
    { name: 'amount', type: 'number', required: true, description: 'Amount to bridge', location: 'query' },
    { name: 'toAddress', type: 'string', required: false, description: 'Destination address', location: 'query' },
  ]},
  { slug: 'bridge', name: 'Execute Bridge', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Bridge', method: 'POST', path: '/v1/limitless/bridge', description: 'Execute a cross-chain bridge between Polygon and Base.', requiresAuth: true },
  { slug: 'check-approvals', name: 'Check Approvals', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Approvals', method: 'GET', path: '/v1/limitless/approvals', description: 'Check token approvals for trading.', requiresAuth: true },
  { slug: 'set-approvals', name: 'Set Approvals', type: 'rest', section: 'api', platform: 'limitless', subcategory: 'Approvals', method: 'POST', path: '/v1/limitless/approvals', description: 'Set token approvals for trading.', requiresAuth: true },
];

// --- Combined ---

export const allEndpoints: EndpointEntry[] = [
  ...restEndpoints,
  ...discoveryTools,
  ...polymarketMcpTools,
  ...kalshiMcpTools,
  ...limitlessMcpTools,
];

// --- Helpers ---

export function getEndpoint(section: Section, platform: string, slug: string): EndpointEntry | undefined {
  return allEndpoints.find(e => e.section === section && e.platform === platform && e.slug === slug);
}

export function getEndpointsForPlatform(section: Section, platform: string): EndpointEntry[] {
  return allEndpoints.filter(e => e.section === section && e.platform === platform);
}

export function getSubcategories(section: Section, platform: string): string[] {
  const endpoints = getEndpointsForPlatform(section, platform);
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const e of endpoints) {
    if (!seen.has(e.subcategory)) {
      seen.add(e.subcategory);
      ordered.push(e.subcategory);
    }
  }
  return ordered;
}

export function getAllPlatforms(section: Section): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const e of allEndpoints) {
    if (e.section === section && !seen.has(e.platform)) {
      seen.add(e.platform);
      ordered.push(e.platform);
    }
  }
  return ordered;
}

export function generateStaticParamsForSection(section: Section): { platform: string; slug: string }[] {
  return allEndpoints
    .filter(e => e.section === section)
    .map(e => ({ platform: e.platform, slug: e.slug }));
}

// Re-export for backwards compat with existing pages
export { restEndpoints };
