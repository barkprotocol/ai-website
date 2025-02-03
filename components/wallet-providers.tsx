"use client"

import { useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets"
import type React from "react"

export default function WalletProviders({ children }: { children: React.ReactNode }) {
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new TorusWalletAdapter()], [])

  if (!process.env.NEXT_PUBLIC_SOLANA_RPC_URL) {
    throw new Error("NEXT_PUBLIC_SOLANA_RPC_URL is not set in the environment variables")
  }

  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_SOLANA_RPC_URL}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

