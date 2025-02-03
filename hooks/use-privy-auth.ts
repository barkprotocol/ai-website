import { usePrivy } from "@privy-io/react-auth"
import { useCallback } from "react"
import { toast } from "sonner"

export function usePrivyAuth() {
  const { login, authenticated, logout: privyLogout, user, ready } = usePrivy()

  const handleLogin = useCallback(
    async (method: "email" | "wallet") => {
      try {
        if (method === "email") {
          await login({ loginMethod: "email" })
        } else {
          await login({ loginMethod: "wallet" })
        }
        toast.success("Logged in successfully")
      } catch (error) {
        console.error("Login error:", error)
        toast.error("Failed to log in. Please try again.")
      }
    },
    [login],
  )

  const handleLogout = useCallback(async () => {
    try {
      await privyLogout()
      toast.success("Logged out successfully")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Failed to log out. Please try again.")
    }
  }, [privyLogout])

  return {
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: authenticated,
    user,
    isReady: ready,
  }
}

