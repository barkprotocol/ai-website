"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login, connectWallet } = usePrivy()
  const { theme } = useTheme()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login({ email })
      toast.success("Login link sent to your email")
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Failed to send login link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSolanaLogin = async () => {
    setIsLoading(true)
    try {
      await connectWallet()
      toast.success("Wallet connected successfully")
      router.push("/dashboard")
    } catch (error) {
      console.error("Wallet connection error:", error)
      toast.error("Failed to connect wallet. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-12">
      <Card className="w-full max-w-md shadow-lg dark:shadow-gray-800">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
              alt="BARK Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Login to BARK AI Agent</CardTitle>
          <CardDescription>Choose your preferred login method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white dark:bg-gray-800"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Sending Link...
                </>
              ) : (
                "Login with Email"
              )}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground dark:bg-gray-900">Or continue with</span>
            </div>
          </div>
          <Button
            onClick={handleSolanaLogin}
            className="w-full bg-black hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
            disabled={isLoading}
          >
            <Image
              src="https://ucarecdn.com/0aa23f11-40b3-4cdc-891b-a169ed9f9328/sol.png"
              alt="Solana Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary underline-offset-4 transition-colors hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <Link href="/forgot-password" className="text-primary underline-offset-4 transition-colors hover:underline">
              Forgot password?
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

