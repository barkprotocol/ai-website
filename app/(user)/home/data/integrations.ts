export interface IntegrationTheme {
  primary: string
  secondary: string
}

export interface Integration {
  icon: string
  label: string
  description?: string
  theme: IntegrationTheme
}

export const INTEGRATIONS: Integration[] = [
  {
    icon: "integrations/pump_fun.svg",
    label: "pump.fun",
    description: "Discover new tokens, launch tokens",
    theme: {
      primary: "#10B981",
      secondary: "#10B981",
    },
  },
  {
    icon: "integrations/jupiter.svg",
    label: "Jupiter",
    description: "Swap tokens & DCA, Limit orders",
    theme: {
      primary: "#16A34A",
      secondary: "#22C55E",
    },
  },
  {
    icon: "integrations/magic_eden.svg",
    label: "Magic Eden",
    description: "Explore the best NFT collections",
    theme: {
      primary: "#9333EA",
      secondary: "#A855F7",
    },
  },
  {
    icon: "integrations/dialect.svg",
    label: "Dialect",
    description: "Create and share blinks",
    theme: {
      primary: "#0EA5E9",
      secondary: "#38BDF8",
    },
  },
  {
    icon: "integrations/dexscreener.svg",
    label: "DexScreener",
    description: "Discover trending tokens",
    theme: {
      primary: "#64748B",
      secondary: "#94A3B8",
    },
  },
  {
    icon: "integrations/defined_fi.svg",
    label: "Defined Fi",
    description: "Discover unbiassed trending tokens",
    theme: {
      primary: "#B0EECF",
      secondary: "#181432",
    },
  },
  {
    icon: "integrations/metaplex.svg",
    label: "Metaplex",
    description: "Build and manage NFTs on Solana",
    theme: {
      primary: "#000000", // Black
      secondary: "#FFFFFF", // White
    },
  },
  {
    icon: "integrations/helius.svg",
    label: "Helius",
    description: "Next-gen blockchain analytics and APIs",
    theme: {
      primary: "#F97316", // Orange
      secondary: "#F3F4F6", // Light Gray
    },
  },
]

