"use client"

import { useCallback, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { usePrivy } from "@privy-io/react-auth"

type User = {
  id: string
  email: string
  // Add other user properties as needed
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()
  const { login: privyLogin, logout: privyLogout, authenticated, ready } = usePrivy()

  const fetchUser = useCallback(async () => {
    if (authenticated) {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/auth/user")
        const result = await response.json()
        if (result.success && result.data) {
          setUser(result.data)
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
  }, [authenticated])

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
    isAuthenticated: authenticated,
    login,
    logout,
  }
}

