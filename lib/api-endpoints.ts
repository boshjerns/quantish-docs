export interface ParamDefinition {
  name: string;
  type: 'string' | 'number' | 'boolean';
  required: boolean;
  description: string;
  location: 'query' | 'path' | 'body';
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  category: string;
  name: string;
  description: string;
  requiresAuth: boolean;
  params?: ParamDefinition[];
}

// ============================================
// AUTH ENDPOINTS (4)
// ============================================
const authEndpoints: ApiEndpoint[] = [
  {
    method: 'POST',
    path: '/v1/auth/signup',
    category: 'auth',
    name: 'Sign Up',
    description: 'Create account across all platforms (Polymarket, Kalshi, Limitless). Returns unified API key.',
    requiresAuth: false,
    params: [
      { name: 'externalId', type: 'string', required: true, description: 'Unique identifier for your user', location: 'body' },
      { name: 'keyName', type: 'string', required: false, description: 'Friendly name for the API key', location: 'body' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/auth/keys',
    category: 'auth',
    name: 'List API Keys',
    description: 'List all API keys associated with your account',
    requiresAuth: true,
  },
  {
    method: 'POST',
    path: '/v1/auth/keys',
    category: 'auth',
    name: 'Create API Key',
    description: 'Create an additional API key for your account',
    requiresAuth: true,
    params: [
      { name: 'name', type: 'string', required: false, description: 'Friendly name for the new key', location: 'body' },
    ],
  },
  {
    method: 'DELETE',
    path: '/v1/auth/keys/:id',
    category: 'auth',
    name: 'Revoke API Key',
    description: 'Revoke an API key by ID',
    requiresAuth: true,
    params: [
      { name: 'id', type: 'string', required: true, description: 'API key ID to revoke', location: 'path' },
    ],
  },
];

// ============================================
// MARKETS ENDPOINTS (9) - Public
// ============================================
const marketsEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/v1/markets',
    category: 'markets',
    name: 'Search Markets',
    description: 'Search prediction markets across all platforms',
    requiresAuth: false,
    params: [
      { name: 'query', type: 'string', required: false, description: 'Search query', location: 'query' },
      { name: 'platform', type: 'string', required: false, description: 'polymarket | kalshi | limitless | all', location: 'query' },
      { name: 'category', type: 'string', required: false, description: 'Filter by category', location: 'query' },
      { name: 'limit', type: 'number', required: false, description: 'Max results (default 20)', location: 'query' },
      { name: 'sortBy', type: 'string', required: false, description: 'relevance | soonest | latest', location: 'query' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/markets/trending',
    category: 'markets',
    name: 'Trending Markets',
    description: 'Get trending prediction markets',
    requiresAuth: false,
    params: [
      { name: 'platform', type: 'string', required: false, description: 'polymarket | kalshi | all', location: 'query' },
      { name: 'limit', type: 'number', required: false, description: 'Max results (default 5)', location: 'query' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/markets/categories',
    category: 'markets',
    name: 'Get Categories',
    description: 'List all market categories',
    requiresAuth: false,
  },
  {
    method: 'GET',
    path: '/v1/markets/stats',
    category: 'markets',
    name: 'Market Stats',
    description: 'Get aggregate statistics about prediction markets',
    requiresAuth: false,
  },
  {
    method: 'GET',
    path: '/v1/markets/search',
    category: 'markets',
    name: 'Keyword Search',
    description: 'Fast keyword search across markets',
    requiresAuth: false,
    params: [
      { name: 'query', type: 'string', required: false, description: 'Keywords to search', location: 'query' },
      { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/markets/arbitrage',
    category: 'markets',
    name: 'Find Arbitrage',
    description: 'Find arbitrage opportunities across markets',
    requiresAuth: false,
    params: [
      { name: 'type', type: 'string', required: false, description: 'spread | multi_outcome | cross_market | all', location: 'query' },
      { name: 'minSpread', type: 'number', required: false, description: 'Minimum spread percentage', location: 'query' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/markets/probability',
    category: 'markets',
    name: 'By Probability',
    description: 'Find markets filtered by probability range',
    requiresAuth: false,
    params: [
      { name: 'min', type: 'number', required: false, description: 'Minimum probability (0-100)', location: 'query' },
      { name: 'max', type: 'number', required: false, description: 'Maximum probability (0-100)', location: 'query' },
      { name: 'platform', type: 'string', required: false, description: 'Filter by platform', location: 'query' },
      { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/markets/:id',
    category: 'markets',
    name: 'Get Market',
    description: 'Get detailed info about a specific market',
    requiresAuth: false,
    params: [
      { name: 'id', type: 'string', required: true, description: 'Market ID', location: 'path' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/markets/:id/related',
    category: 'markets',
    name: 'Related Markets',
    description: 'Find markets related to a specific market',
    requiresAuth: false,
    params: [
      { name: 'id', type: 'string', required: true, description: 'Market ID', location: 'path' },
      { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
    ],
  },
];

// ============================================
// WALLETS ENDPOINTS (8) - Public analytics
// ============================================
const walletsEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/v1/wallets/whales',
    category: 'wallets',
    name: 'Whale Activity',
    description: 'Get whale activity for a specific market',
    requiresAuth: false,
    params: [
      { name: 'marketId', type: 'string', required: true, description: 'Polymarket conditionId', location: 'query' },
      { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
      { name: 'minVolume', type: 'number', required: false, description: 'Minimum volume filter', location: 'query' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/wallets/compare',
    category: 'wallets',
    name: 'Compare Wallets',
    description: 'Compare two wallets\' portfolio overlap',
    requiresAuth: false,
    params: [
      { name: 'w1', type: 'string', required: true, description: 'First wallet address', location: 'query' },
      { name: 'w2', type: 'string', required: true, description: 'Second wallet address', location: 'query' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/wallets/contrarian/:marketId',
    category: 'wallets',
    name: 'Contrarian Traders',
    description: 'Find traders betting against consensus on a market',
    requiresAuth: false,
    params: [
      { name: 'marketId', type: 'string', required: true, description: 'Market conditionId', location: 'path' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/wallets/:address/profile',
    category: 'wallets',
    name: 'Wallet Profile',
    description: 'Get detailed profile for a wallet',
    requiresAuth: false,
    params: [
      { name: 'address', type: 'string', required: true, description: 'Wallet address', location: 'path' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/wallets/:address/interests',
    category: 'wallets',
    name: 'Wallet Interests',
    description: 'Get recommended markets based on wallet trading history',
    requiresAuth: false,
    params: [
      { name: 'address', type: 'string', required: true, description: 'Wallet address', location: 'path' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/wallets/:address/momentum',
    category: 'wallets',
    name: 'Wallet Momentum',
    description: 'Get current winning/losing positions for a wallet',
    requiresAuth: false,
    params: [
      { name: 'address', type: 'string', required: true, description: 'Wallet address', location: 'path' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/wallets/:address/social',
    category: 'wallets',
    name: 'Social Discovery',
    description: 'Find markets based on similar wallets\' trades',
    requiresAuth: false,
    params: [
      { name: 'address', type: 'string', required: true, description: 'Wallet address', location: 'path' },
    ],
  },
];

// ============================================
// ACCOUNT ENDPOINTS (4) - Requires auth
// ============================================
const accountEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/v1/account/balances',
    category: 'account',
    name: 'All Balances',
    description: 'Get balances across all platforms',
    requiresAuth: true,
  },
  {
    method: 'GET',
    path: '/v1/account/positions',
    category: 'account',
    name: 'All Positions',
    description: 'Get positions across all platforms',
    requiresAuth: true,
  },
  {
    method: 'GET',
    path: '/v1/account/orders',
    category: 'account',
    name: 'All Orders',
    description: 'Get orders across all platforms',
    requiresAuth: true,
    params: [
      { name: 'status', type: 'string', required: false, description: 'Filter by order status', location: 'query' },
      { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/account/wallets',
    category: 'account',
    name: 'All Wallet Status',
    description: 'Get wallet status across all platforms',
    requiresAuth: true,
  },
];

// ============================================
// POLYMARKET ENDPOINTS (18) - Requires auth
// ============================================
const polymarketEndpoints: ApiEndpoint[] = [
  // Orders
  {
    method: 'POST',
    path: '/v1/polymarket/orders',
    category: 'polymarket',
    name: 'Place Order',
    description: 'Place a buy or sell order on Polymarket',
    requiresAuth: true,
    params: [
      { name: 'conditionId', type: 'string', required: true, description: 'Market condition ID', location: 'body' },
      { name: 'tokenId', type: 'string', required: true, description: 'Outcome token ID', location: 'body' },
      { name: 'side', type: 'string', required: true, description: 'BUY or SELL', location: 'body' },
      { name: 'price', type: 'number', required: true, description: 'Price per share (0.01-0.99)', location: 'body' },
      { name: 'size', type: 'number', required: true, description: 'Number of shares', location: 'body' },
    ],
  },
  {
    method: 'POST',
    path: '/v1/polymarket/orders/atomic',
    category: 'polymarket',
    name: 'Atomic Orders',
    description: 'Execute multiple orders atomically (all succeed or all fail)',
    requiresAuth: true,
    params: [
      { name: 'orders', type: 'string', required: true, description: 'Array of order objects', location: 'body' },
    ],
  },
  {
    method: 'DELETE',
    path: '/v1/polymarket/orders/:id',
    category: 'polymarket',
    name: 'Cancel Order',
    description: 'Cancel an order by ID',
    requiresAuth: true,
    params: [
      { name: 'id', type: 'string', required: true, description: 'Order ID', location: 'path' },
    ],
  },
  // Market Data
  {
    method: 'GET',
    path: '/v1/polymarket/orderbook/:tokenId',
    category: 'polymarket',
    name: 'Orderbook',
    description: 'Get orderbook for a token',
    requiresAuth: true,
    params: [
      { name: 'tokenId', type: 'string', required: true, description: 'Token ID', location: 'path' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/polymarket/price/:tokenId',
    category: 'polymarket',
    name: 'Get Price',
    description: 'Get current midpoint price for a token',
    requiresAuth: true,
    params: [
      { name: 'tokenId', type: 'string', required: true, description: 'Token ID', location: 'path' },
    ],
  },
  // Redemption
  {
    method: 'GET',
    path: '/v1/polymarket/claimable',
    category: 'polymarket',
    name: 'Claimable Winnings',
    description: 'Get claimable winnings from resolved markets',
    requiresAuth: true,
  },
  {
    method: 'POST',
    path: '/v1/polymarket/redeem',
    category: 'polymarket',
    name: 'Redeem Winnings',
    description: 'Claim winnings from resolved markets',
    requiresAuth: true,
  },
  // Transfers
  {
    method: 'POST',
    path: '/v1/polymarket/transfer/usdc',
    category: 'polymarket',
    name: 'Transfer USDC',
    description: 'Transfer USDC from your wallet',
    requiresAuth: true,
    params: [
      { name: 'toAddress', type: 'string', required: true, description: 'Destination address', location: 'body' },
      { name: 'amount', type: 'number', required: true, description: 'Amount to transfer', location: 'body' },
    ],
  },
  {
    method: 'POST',
    path: '/v1/polymarket/swap',
    category: 'polymarket',
    name: 'Swap Tokens',
    description: 'Swap tokens on Polygon',
    requiresAuth: true,
    params: [
      { name: 'fromToken', type: 'string', required: true, description: 'Token to swap from', location: 'body' },
      { name: 'toToken', type: 'string', required: true, description: 'Token to swap to', location: 'body' },
      { name: 'amount', type: 'number', required: true, description: 'Amount to swap', location: 'body' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/polymarket/swap/quote',
    category: 'polymarket',
    name: 'Swap Quote',
    description: 'Get a quote for a token swap',
    requiresAuth: true,
    params: [
      { name: 'fromToken', type: 'string', required: true, description: 'Token to swap from', location: 'query' },
      { name: 'toToken', type: 'string', required: true, description: 'Token to swap to', location: 'query' },
      { name: 'amount', type: 'number', required: true, description: 'Amount to swap', location: 'query' },
    ],
  },
  // Copy Trading
  {
    method: 'GET',
    path: '/v1/polymarket/copy/traders',
    category: 'polymarket',
    name: 'Top Traders',
    description: 'Get top traders leaderboard',
    requiresAuth: true,
    params: [
      { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
      { name: 'sortBy', type: 'string', required: false, description: 'PNL or VOL', location: 'query' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/polymarket/copy/traders/:address',
    category: 'polymarket',
    name: 'Trader Profile',
    description: 'Get profile for a specific trader',
    requiresAuth: true,
    params: [
      { name: 'address', type: 'string', required: true, description: 'Wallet address', location: 'path' },
    ],
  },
  {
    method: 'POST',
    path: '/v1/polymarket/copy/follow',
    category: 'polymarket',
    name: 'Follow Trader',
    description: 'Start copy trading a wallet',
    requiresAuth: true,
    params: [
      { name: 'targetWallet', type: 'string', required: true, description: 'Wallet to copy', location: 'body' },
    ],
  },
  {
    method: 'POST',
    path: '/v1/polymarket/copy/unfollow',
    category: 'polymarket',
    name: 'Unfollow Trader',
    description: 'Stop copy trading a wallet',
    requiresAuth: true,
    params: [
      { name: 'targetWallet', type: 'string', required: true, description: 'Wallet to stop copying', location: 'body' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/polymarket/copy/following',
    category: 'polymarket',
    name: 'List Following',
    description: 'List wallets you are copy trading',
    requiresAuth: true,
  },
  {
    method: 'PUT',
    path: '/v1/polymarket/copy/settings',
    category: 'polymarket',
    name: 'Update Copy Settings',
    description: 'Update copy trade settings',
    requiresAuth: true,
  },
  {
    method: 'GET',
    path: '/v1/polymarket/copy/history',
    category: 'polymarket',
    name: 'Copy History',
    description: 'Get copy trade execution history',
    requiresAuth: true,
    params: [
      { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/polymarket/copy/status',
    category: 'polymarket',
    name: 'Copy Engine Status',
    description: 'Get copy trading engine status',
    requiresAuth: true,
  },
];

// ============================================
// KALSHI ENDPOINTS (14) - Requires auth
// ============================================
const kalshiEndpoints: ApiEndpoint[] = [
  // Orders
  {
    method: 'POST',
    path: '/v1/kalshi/orders/buy-yes',
    category: 'kalshi',
    name: 'Buy Yes',
    description: 'Buy YES outcome tokens on Kalshi',
    requiresAuth: true,
    params: [
      { name: 'marketTicker', type: 'string', required: true, description: 'Kalshi market ticker', location: 'body' },
      { name: 'yesOutcomeMint', type: 'string', required: true, description: 'YES token mint address', location: 'body' },
      { name: 'usdcAmount', type: 'number', required: true, description: 'USDC to spend', location: 'body' },
    ],
  },
  {
    method: 'POST',
    path: '/v1/kalshi/orders/buy-no',
    category: 'kalshi',
    name: 'Buy No',
    description: 'Buy NO outcome tokens on Kalshi',
    requiresAuth: true,
    params: [
      { name: 'marketTicker', type: 'string', required: true, description: 'Kalshi market ticker', location: 'body' },
      { name: 'noOutcomeMint', type: 'string', required: true, description: 'NO token mint address', location: 'body' },
      { name: 'usdcAmount', type: 'number', required: true, description: 'USDC to spend', location: 'body' },
    ],
  },
  {
    method: 'POST',
    path: '/v1/kalshi/orders/sell',
    category: 'kalshi',
    name: 'Sell Position',
    description: 'Sell Kalshi outcome tokens',
    requiresAuth: true,
    params: [
      { name: 'outcomeMint', type: 'string', required: true, description: 'Token mint to sell', location: 'body' },
      { name: 'tokenAmount', type: 'number', required: true, description: 'Amount to sell', location: 'body' },
    ],
  },
  // Market Data
  {
    method: 'GET',
    path: '/v1/kalshi/quote',
    category: 'kalshi',
    name: 'Get Quote',
    description: 'Get a quote for a Kalshi trade',
    requiresAuth: true,
    params: [
      { name: 'inputMint', type: 'string', required: true, description: 'Input token mint', location: 'query' },
      { name: 'outputMint', type: 'string', required: true, description: 'Output token mint', location: 'query' },
      { name: 'amount', type: 'number', required: true, description: 'Amount', location: 'query' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/kalshi/markets/:ticker/live',
    category: 'kalshi',
    name: 'Live Market Data',
    description: 'Get live pricing for a Kalshi market',
    requiresAuth: true,
    params: [
      { name: 'ticker', type: 'string', required: true, description: 'Market ticker', location: 'path' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/kalshi/events',
    category: 'kalshi',
    name: 'List Events',
    description: 'Get Kalshi events with optional filters',
    requiresAuth: true,
    params: [
      { name: 'category', type: 'string', required: false, description: 'Filter by category', location: 'query' },
      { name: 'marketStatus', type: 'string', required: false, description: 'active | inactive | finalized', location: 'query' },
      { name: 'limit', type: 'number', required: false, description: 'Max results', location: 'query' },
    ],
  },
  // Redemption
  {
    method: 'GET',
    path: '/v1/kalshi/claimable',
    category: 'kalshi',
    name: 'Claimable Positions',
    description: 'Get redeemable positions from settled markets',
    requiresAuth: true,
  },
  {
    method: 'POST',
    path: '/v1/kalshi/redeem',
    category: 'kalshi',
    name: 'Redeem Winnings',
    description: 'Redeem winnings from a settled market',
    requiresAuth: true,
  },
  {
    method: 'POST',
    path: '/v1/kalshi/redeem/all',
    category: 'kalshi',
    name: 'Redeem All',
    description: 'Redeem all winning positions at once',
    requiresAuth: true,
  },
  // KYC
  {
    method: 'GET',
    path: '/v1/kalshi/kyc/status',
    category: 'kalshi',
    name: 'KYC Status',
    description: 'Check KYC verification status',
    requiresAuth: true,
  },
  {
    method: 'GET',
    path: '/v1/kalshi/kyc/link',
    category: 'kalshi',
    name: 'KYC Link',
    description: 'Get KYC verification link',
    requiresAuth: true,
    params: [
      { name: 'redirectUri', type: 'string', required: false, description: 'Redirect URL after verification', location: 'query' },
    ],
  },
  // Transfers
  {
    method: 'POST',
    path: '/v1/kalshi/transfer/usdc',
    category: 'kalshi',
    name: 'Transfer USDC',
    description: 'Transfer USDC on Solana',
    requiresAuth: true,
  },
  {
    method: 'POST',
    path: '/v1/kalshi/transfer/sol',
    category: 'kalshi',
    name: 'Transfer SOL',
    description: 'Transfer SOL on Solana',
    requiresAuth: true,
  },
  {
    method: 'POST',
    path: '/v1/kalshi/swap',
    category: 'kalshi',
    name: 'Swap Tokens',
    description: 'Swap tokens via Jupiter on Solana',
    requiresAuth: true,
  },
];

// ============================================
// LIMITLESS ENDPOINTS (14) - Requires auth
// ============================================
const limitlessEndpoints: ApiEndpoint[] = [
  // Orders
  {
    method: 'POST',
    path: '/v1/limitless/orders',
    category: 'limitless',
    name: 'Place Order',
    description: 'Place an order on Limitless',
    requiresAuth: true,
  },
  {
    method: 'DELETE',
    path: '/v1/limitless/orders/:id',
    category: 'limitless',
    name: 'Cancel Order',
    description: 'Cancel an order by ID',
    requiresAuth: true,
    params: [
      { name: 'id', type: 'string', required: true, description: 'Order ID', location: 'path' },
    ],
  },
  {
    method: 'DELETE',
    path: '/v1/limitless/orders',
    category: 'limitless',
    name: 'Cancel All Orders',
    description: 'Cancel all open orders',
    requiresAuth: true,
  },
  // Market Data
  {
    method: 'GET',
    path: '/v1/limitless/orderbook/:tokenId',
    category: 'limitless',
    name: 'Orderbook',
    description: 'Get orderbook for a token',
    requiresAuth: true,
    params: [
      { name: 'tokenId', type: 'string', required: true, description: 'Token ID', location: 'path' },
    ],
  },
  {
    method: 'GET',
    path: '/v1/limitless/quote',
    category: 'limitless',
    name: 'Get Quote',
    description: 'Get a quote for a Limitless trade',
    requiresAuth: true,
    params: [
      { name: 'marketSlug', type: 'string', required: true, description: 'Market slug', location: 'query' },
      { name: 'tokenId', type: 'string', required: true, description: 'Token ID', location: 'query' },
      { name: 'side', type: 'string', required: true, description: 'BUY or SELL', location: 'query' },
      { name: 'size', type: 'number', required: true, description: 'Size', location: 'query' },
    ],
  },
  // Redemption
  {
    method: 'GET',
    path: '/v1/limitless/claimable',
    category: 'limitless',
    name: 'Claimable Positions',
    description: 'Get redeemable positions',
    requiresAuth: true,
  },
  {
    method: 'POST',
    path: '/v1/limitless/redeem',
    category: 'limitless',
    name: 'Redeem Winnings',
    description: 'Redeem winnings from a position',
    requiresAuth: true,
  },
  {
    method: 'POST',
    path: '/v1/limitless/redeem/all',
    category: 'limitless',
    name: 'Redeem All',
    description: 'Redeem all winning positions',
    requiresAuth: true,
  },
  // Transfers
  {
    method: 'POST',
    path: '/v1/limitless/transfer/usdc',
    category: 'limitless',
    name: 'Transfer USDC',
    description: 'Transfer USDC on Base',
    requiresAuth: true,
  },
  {
    method: 'POST',
    path: '/v1/limitless/swap',
    category: 'limitless',
    name: 'Swap Tokens',
    description: 'Swap tokens on Base',
    requiresAuth: true,
  },
  // Bridge
  {
    method: 'GET',
    path: '/v1/limitless/bridge/quote',
    category: 'limitless',
    name: 'Bridge Quote',
    description: 'Get a quote for bridging from Polygon to Base',
    requiresAuth: true,
    params: [
      { name: 'amount', type: 'number', required: true, description: 'Amount to bridge', location: 'query' },
      { name: 'toAddress', type: 'string', required: false, description: 'Destination address', location: 'query' },
    ],
  },
  {
    method: 'POST',
    path: '/v1/limitless/bridge',
    category: 'limitless',
    name: 'Execute Bridge',
    description: 'Execute a bridge from Polygon to Base',
    requiresAuth: true,
  },
  // Approvals
  {
    method: 'GET',
    path: '/v1/limitless/approvals',
    category: 'limitless',
    name: 'Check Approvals',
    description: 'Check token approvals',
    requiresAuth: true,
  },
  {
    method: 'POST',
    path: '/v1/limitless/approvals',
    category: 'limitless',
    name: 'Set Approvals',
    description: 'Set token approvals for trading',
    requiresAuth: true,
  },
];

// ============================================
// EXPORT ALL
// ============================================
export const endpoints: ApiEndpoint[] = [
  ...authEndpoints,
  ...marketsEndpoints,
  ...walletsEndpoints,
  ...accountEndpoints,
  ...polymarketEndpoints,
  ...kalshiEndpoints,
  ...limitlessEndpoints,
];

export const endpointsByCategory: Record<string, ApiEndpoint[]> = {
  auth: authEndpoints,
  markets: marketsEndpoints,
  wallets: walletsEndpoints,
  account: accountEndpoints,
  polymarket: polymarketEndpoints,
  kalshi: kalshiEndpoints,
  limitless: limitlessEndpoints,
};

export const categoryInfo: Record<string, { name: string; description: string; requiresAuth: boolean }> = {
  auth: { name: 'Authentication', description: 'Account signup and API key management', requiresAuth: false },
  markets: { name: 'Markets', description: 'Search and discover prediction markets (public)', requiresAuth: false },
  wallets: { name: 'Wallet Analytics', description: 'Wallet profiles, whale tracking, and social discovery (public)', requiresAuth: false },
  account: { name: 'Account', description: 'Balances, positions, and orders across all platforms', requiresAuth: true },
  polymarket: { name: 'Polymarket', description: 'Trading on Polymarket (Polygon)', requiresAuth: true },
  kalshi: { name: 'Kalshi', description: 'Trading on Kalshi via DFlow (Solana)', requiresAuth: true },
  limitless: { name: 'Limitless', description: 'Trading on Limitless (Base)', requiresAuth: true },
};
