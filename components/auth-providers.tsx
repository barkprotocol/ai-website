"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { RPC_URL, NEXT_PUBLIC_SOLANA_NETWORK } from "@/lib/constants"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { retry } from "@/lib/retry"
import { FallbackAuth } from "@/components/auth/fallback-auth"
import type React from "react"

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Authentication Error</AlertTitle>
      <AlertDescription>
        <p>Failed to load authentication provider: {error.message}</p>
        <Button onClick={resetErrorBoundary} className="mt-2">
          Try again
        </Button>
      </AlertDescription>
    </Alert>
  )
}

const PrivyProviderWithRetry = ({ children, theme }: { children: React.ReactNode; theme: string }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [privyError, setPrivyError] = useState<Error | null>(null)

  useEffect(() => {
    const initPrivy = async () => {
      try {
        await retry(
          async () => {
            // Simulate Privy initialization
            await new Promise<void>((resolve) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            })
          },
          3,
          1000,
        )
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to initialize Privy after retries:", error)
        setPrivyError(error instanceof Error ? error : new Error("Failed to initialize Privy"))
      }
    }

    initPrivy()
  }, [])

  if (isLoading) {
    return <div>Loading authentication provider...</div>
  }

  if (privyError) {
    console.error("Privy initialization error:", privyError)
    return <FallbackAuth />
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      onError={(error) => {
        console.error("Privy provider error:", error)
        setPrivyError(error)
      }}
      config={{
        appearance: {
          theme: theme as "light" | "dark",
          logo: "https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp",
        },
        loginMethods: ["email", "wallet"],
        defaultChain: "solana",
        supportedChains: [{ name: NEXT_PUBLIC_SOLANA_NETWORK, rpcUrl: RPC_URL }],
      }}
    >
      {children}
    </PrivyProvider>
  )
}

export default function AuthProviders({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const theme = resolvedTheme || "light"

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <PrivyProviderWithRetry theme={theme}>{children}</PrivyProviderWithRetry>
    </ErrorBoundary>
  )
}

