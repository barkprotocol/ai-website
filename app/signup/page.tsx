"use client"

import type React from "react"
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

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login, connectWallet } = usePrivy()
  const { theme } = useTheme()

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login({ email })
      toast.success("Signup successful! Check your email for a login link.")
      router.push("/dashboard")
    } catch (error) {
      console.error("Signup error:", error)
      toast.error("Failed to sign up. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSolanaSignup = async () => {
    setIsLoading(true)
    try {
      await connectWallet()
      toast.success("Solana wallet connected successfully")
      router.push("/dashboard")
    } catch (error) {
      console.error("Solana wallet connection error:", error)
      toast.error("Failed to connect Solana wallet. Please try again.")
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
          <CardTitle className="text-2xl font-bold">Sign up for BARK AI Agent</CardTitle>
          <CardDescription>Create your account or connect your wallet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailSignup} className="space-y-4">
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
                  Signing Up...
                </>
              ) : (
                "Sign Up with Email"
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
            onClick={handleSolanaSignup}
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
            {isLoading ? "Connecting..." : "Sign Up with Solana"}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary underline-offset-4 transition-colors hover:underline">
              Log in
            </Link>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/terms-of-use" className="text-primary underline-offset-4 transition-colors hover:underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-primary underline-offset-4 transition-colors hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

