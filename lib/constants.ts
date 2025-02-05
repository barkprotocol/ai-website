// AI and Token-related constants
export const MAX_TOKEN_MESSAGES = 10
export const NO_CONFIRMATION_MESSAGE = " (No confirmation required)"

// Environment-specific constants
export const APP_VERSION = process.env.npm_package_version || "1.0.0"
export const IS_BETA = true
export const NODE_ENV = process.env.NODE_ENV || "development"
export const IS_PRODUCTION = NODE_ENV === "production"
export const DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE === "true"

// API and RPC URLs
export const HELIUS_RPC_URL =
  process.env.NEXT_PUBLIC_HELIUS_RPC_URL || "https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY"
export const RPC_URL = process.env.NEXT_PUBLIC_HELIUS_RPC_URL || "https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY"
export const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"

// Blockchain-specific constants
import type { Cluster } from "@solana/web3.js"

export const NEXT_PUBLIC_SOLANA_NETWORK: Cluster = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as Cluster) || "mainnet-beta"
export const NEXT_PUBLIC_BARK_MINT_ADDRESS = process.env.NEXT_PUBLIC_BARK_MINT_ADDRESS || ""
export const BARK_PROTOCOL_ADDRESS = process.env.BARK_PROTOCOL_ADDRESS || ""
export const BARK_TOKEN_ADDRESS = "2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg"
export const MAX_API_RETRIES = 3

// Language and localization
export const DEFAULT_LANGUAGE = "en"
export const SUPPORTED_LANGUAGES = ["en"] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

// App configuration interface
export interface AppConfig {
  version: string
  isBeta: boolean
  maxTokenMessages: number
  rpcUrl: string
  defaultLanguage: SupportedLanguage
  debugMode: boolean
  barkTokenAddress: string
  maxApiRetries: number
}

// Create a config object that can be easily imported and used throughout the app
export const appConfig: AppConfig = {
  version: APP_VERSION,
  isBeta: IS_BETA,
  maxTokenMessages: MAX_TOKEN_MESSAGES,
  rpcUrl: RPC_URL,
  defaultLanguage: DEFAULT_LANGUAGE,
  debugMode: DEBUG_MODE,
  barkTokenAddress: BARK_TOKEN_ADDRESS,
  maxApiRetries: MAX_API_RETRIES,
}

export const EVENTS = {
  ACTION_CREATED: "action-created",
  ACTION_REFRESH: "action-refresh",
  CONVERSATION_READ: "conversation-read",
} as const

