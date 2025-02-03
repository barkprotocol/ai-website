"use client"

import { useCallback, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { usePrivy } from "@privy-io/react-auth"
import { useWallet } from "@solana/wallet-adapter-react"

type User = {
  id: string
  email: string
  name?: string
  isSubscribed: boolean
  subscriptionEndsAt?: Date
  walletAddress?: string | null
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()
  const { login: privyLogin, logout: privyLogout, authenticated, ready } = usePrivy()
  const { publicKey, connected } = useWallet()

  const fetchUser = useCallback(async () => {
    if (authenticated && connected) {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/auth/user")
        const result = await response.json()
        if (result.success && result.data) {
          setUser({
            ...result.data,
            walletAddress: publicKey?.toBase58() || null,
          })
        } else {
          setUser(null)
          setError(new Error(result.error || "Failed to fetch user data"))
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        setUser(null)
        setError(error instanceof Error ? error : new Error("An unknown error occurred"))
      } finally {
        setIsLoading(false)
      }
    } else {
      setUser(null)
      setIsLoading(false)
    }
  }, [authenticated, connected, publicKey])

  useEffect(() => {
    if (ready) {
      fetchUser()
    }
  }, [ready, fetchUser])

  const login = useCallback(() => {
    privyLogin()
  }, [privyLogin])

  const logout = useCallback(async () => {
    try {
      await privyLogout()
      setUser(null)
      toast.success("Logged out successfully")
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
      toast.error("Logout failed. Please try again.")
    }
  }, [privyLogout, router])

  return {
    user,
    isLoading,
    error,
    isAuthenticated: authenticated && connected,
    login,
    logout,
    fetchUser,
  }
}

