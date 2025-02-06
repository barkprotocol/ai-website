// Solana-related constants
export const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"
export const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"
export const BARK_TOKEN_ADDRESS = "2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg"
export const BARK_TOKEN_DECIMALS = 9
export const BARK_TOKEN_LOGO_URL = "https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"

// Application-wide constants
export const APP_NAME = "BARK AI Agent"
export const APP_DESCRIPTION = "Your AI-powered assistant for Solana blockchain interactions"
export const APP_URL = "https://ai.barkprotocol.net"
export const APP_VERSION = "1.0.0"

// API endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.barkprotocol.net/v1"
export const HELIUS_API_URL = `https://api.helius.xyz/v0/api-key/${process.env.HELIUS_API_KEY}`
export const JUPITER_API_BASE = "https://quote-api.jup.ag/v4"
export const COINMARKETCAP_API_URL = "https://pro-api.coinmarketcap.com"
export const DEFINED_FI_API_URL = "https://api.defined.fi"

// API keys
export const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
export const DEFINED_FI_API_KEY = process.env.DEFINED_FI_API_KEY || ""

// Authentication constants
export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
export const SESSION_EXPIRY = 60 * 60 * 24 * 7 // 7 days
export const REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 30 // 30 days

// Feature flags
export const ENABLE_ANALYTICS = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true"
export const ENABLE_DARK_MODE = true
export const ENABLE_NOTIFICATIONS = true

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// Social media links
export const TWITTER_URL = "https://x.com/bark_protocol"
export const DISCORD_URL = "https://discord.gg/barkprotocol"
export const GITHUB_URL = "https://github.com/bark-protocol/bark-ai-agent"
export const TELEGRAM_URL = "https://t.me/barkprotocol"

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    features: ["Basic AI interactions", "Limited API calls", "Community support"],
  },
  PRO: {
    name: "Pro",
    price: 19.99,
    features: ["Advanced AI interactions", "Unlimited API calls", "Priority support", "Custom integrations"],
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: 99.99,
    features: ["All Pro features", "Dedicated account manager", "Custom AI model training", "SLA guarantees"],
  },
}

// AI model constants
export const AI_MODEL_VERSION = "gpt-4"
export const MAX_TOKENS = 4096
export const MAX_CONVERSATION_HISTORY = 50

// Timeouts and intervals
export const API_TIMEOUT = 30000 // 30 seconds
export const POLLING_INTERVAL = 5000 // 5 seconds
export const RETRY_DELAY = 1000 // 1 second

// File upload constants
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf", "text/plain"]

// Error messages
export const ERROR_MESSAGES = {
  GENERAL: "An unexpected error occurred. Please try again later.",
  NETWORK: "Network error. Please check your internet connection and try again.",
  AUTHENTICATION: "Authentication failed. Please log in again.",
  NOT_FOUND: "The requested resource was not found.",
  PERMISSION: "You do not have permission to perform this action.",
  RATE_LIMIT: "You have exceeded the rate limit. Please try again later.",
}

// Cache durations
export const CACHE_DURATION = {
  SHORT: 60 * 5, // 5 minutes
  MEDIUM: 60 * 60, // 1 hour
  LONG: 60 * 60 * 24, // 1 day
  WEEK: 60 * 60 * 24 * 7, // 1 week
}

// Localization
export const DEFAULT_LOCALE = "en"
export const SUPPORTED_LOCALES = ["en", "es", "fr", "de", "ja", "ko", "zh"]

// Theme
export const THEME = {
  PRIMARY_COLOR: "#4F46E5",
  SECONDARY_COLOR: "#10B981",
  BACKGROUND_COLOR: "#F3F4F6",
  TEXT_COLOR: "#1F2937",
  ACCENT_COLOR: "#F59E0B",
  ERROR_COLOR: "#EF4444",
  SUCCESS_COLOR: "#10B981",
}

// Solana network constants
export const SOLANA_COMMITMENT = "confirmed"
export const SOLANA_TRANSACTION_TIMEOUT = 30000 // 30 seconds

// AI Agent constants
export const MAX_AGENT_STEPS = 10
export const AGENT_TIMEOUT = 60000 // 60 seconds

// Security constants
export const PASSWORD_MIN_LENGTH = 12
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/
export const MAX_LOGIN_ATTEMPTS = 5
export const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

// Performance monitoring
export const PERFORMANCE_THRESHOLD = {
  API_RESPONSE_TIME: 1000, // 1 second
  PAGE_LOAD_TIME: 3000, // 3 seconds
}

// Feature limits
export const MAX_CONVERSATIONS_PER_USER = 100
export const MAX_MESSAGES_PER_CONVERSATION = 1000
export const MAX_TOKENS_PER_REQUEST = 4096

