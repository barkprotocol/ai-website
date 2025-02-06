// Environment
const env = process.env.NODE_ENV || "development"

// API URLs
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bark.ai"
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"

// Authentication
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const SESSION_EXPIRY = 60 * 60 * 24 * 7 // 1 week in seconds

// Solana
const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "mainnet-beta"

// Feature flags
const ENABLE_ANALYTICS = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true"
const ENABLE_DARK_MODE = true

// Integrations
const HELIUS_API_KEY = process.env.HELIUS_API_KEY || ""
const JUPITER_API_URL = "https://quote-api.jup.ag/v4"

// AI Configuration
const AI_MODEL = process.env.AI_MODEL || "gpt-4"
const AI_TEMPERATURE = 0.7
const AI_MAX_TOKENS = 2000

// Pagination
const DEFAULT_PAGE_SIZE = 20

// Cache
const CACHE_TTL = 60 * 5 // 5 minutes in seconds

// Timeouts
const API_TIMEOUT = 30000 // 30 seconds in milliseconds

export const config = {
  env,
  api: {
    url: API_URL,
    timeout: API_TIMEOUT,
  },
  auth: {
    jwtSecret: JWT_SECRET,
    sessionExpiry: SESSION_EXPIRY,
  },
  solana: {
    network: SOLANA_NETWORK,
    rpcUrl: SOLANA_RPC_URL,
  },
  features: {
    analytics: ENABLE_ANALYTICS,
    darkMode: ENABLE_DARK_MODE,
  },
  integrations: {
    helius: {
      apiKey: HELIUS_API_KEY,
    },
    jupiter: {
      apiUrl: JUPITER_API_URL,
    },
  },
  ai: {
    model: AI_MODEL,
    temperature: AI_TEMPERATURE,
    maxTokens: AI_MAX_TOKENS,
  },
  pagination: {
    defaultPageSize: DEFAULT_PAGE_SIZE,
  },
  cache: {
    ttl: CACHE_TTL,
  },
}

export type Config = typeof config

export const appConfig = config
export type AppConfig = typeof config

