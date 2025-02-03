"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface AuthResponse {
  success: boolean
  token?: string
  message?: string
}

export function FallbackAuth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/fallback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data: AuthResponse = await response.json()

      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token)
        toast.success("Logged in successfully")
        router.push("/dashboard")
      } else {
        throw new Error(data.message || "Authentication failed")
      }
    } catch (error) {
      console.error("Fallback authentication error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to log in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Fallback Authentication</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </div>
  )
}

