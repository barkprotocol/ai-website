// Solana-related constants
export const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"
export const BARK_TOKEN_ADDRESS = "2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg"
export const BARK_TOKEN_DECIMALS = 9
export const BARK_TOKEN_LOGO_URL = "https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"

// Application-wide constants
export const APP_NAME = "BARK AI Agent"
export const APP_DESCRIPTION = "Your AI-powered assistant for Solana blockchain interactions"
export const APP_URL = "https://ai.barkprotocol.net"

// API endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.barkprotocol.net/v1"
export const HELIUS_API_URL = `https://api.helius.xyz/v0/api-key/${process.env.HELIUS_API_KEY}`

// Authentication constants
export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
export const SESSION_EXPIRY = 60 * 60 * 24 * 7 // 7 days

// Feature flags
export const ENABLE_ANALYTICS = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true"
export const ENABLE_DARK_MODE = true

// Pagination
export const DEFAULT_PAGE_SIZE = 20

// Social media links
export const TWITTER_URL = "https://x.com/bark_protocol"
export const DISCORD_URL = "https://discord.gg/barkprotocol"
export const GITHUB_URL = "https://github.com/bark-protocol/bark-ai-agent"

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  BASIC: {
    name: "Basic",
    price: 9.99,
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  PRO: {
    name: "Pro",
    price: 19.99,
    features: ["All Basic features", "Feature 4", "Feature 5", "Feature 6"],
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: 49.99,
    features: ["All Pro features", "Feature 7", "Feature 8", "Feature 9", "Feature 10"],
  },
}

// AI model constants
export const AI_MODEL_VERSION = "gpt-4"
export const MAX_TOKENS = 2048

// Timeouts and intervals
export const API_TIMEOUT = 30000 // 30 seconds
export const POLLING_INTERVAL = 5000 // 5 seconds

// File upload constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"]

// Error messages
export const ERROR_MESSAGES = {
  GENERAL: "An unexpected error occurred. Please try again later.",
  NETWORK: "Network error. Please check your internet connection and try again.",
  AUTHENTICATION: "Authentication failed. Please log in again.",
  NOT_FOUND: "The requested resource was not found.",
  PERMISSION: "You do not have permission to perform this action.",
}

// Cache durations
export const CACHE_DURATION = {
  SHORT: 60 * 5, // 5 minutes
  MEDIUM: 60 * 60, // 1 hour
  LONG: 60 * 60 * 24, // 1 day
}

// Localization
export const DEFAULT_LOCALE = "en"
export const SUPPORTED_LOCALES = ["en", "es", "fr", "de", "ja"]

// Theme
export const THEME = {
  PRIMARY_COLOR: "#4F46E5",
  SECONDARY_COLOR: "#10B981",
  BACKGROUND_COLOR: "#F3F4F6",
  TEXT_COLOR: "#1F2937",
}

