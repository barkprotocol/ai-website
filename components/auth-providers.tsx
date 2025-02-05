"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { RPC_URL, NEXT_PUBLIC_SOLANA_NETWORK } from "@/lib/constants"
import type React from "react"

const solanaConnectors = toSolanaWalletConnectors({
  shouldAutoConnect: false,
})

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default function AuthProviders({
  children,
}: {
  children: React.ReactNode
}) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        config={{
          appearance: {
            theme: resolvedTheme as "light" | "dark",
            logo:
              resolvedTheme === "dark"
                ? "https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
                : "https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp",
          },
          externalWallets: {
            solana: {
              connectors: solanaConnectors as any,
            },
          },
          solanaClusters: [{ name: NEXT_PUBLIC_SOLANA_NETWORK, rpcUrl: RPC_URL }],
        }}
      >
        {children}
      </PrivyProvider>
    </ErrorBoundary>
  )
}

