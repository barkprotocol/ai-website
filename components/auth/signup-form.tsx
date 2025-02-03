"use client"

import { useState } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"
import type React from "react" // Added import for React

export function SignupForm() {
  const { login, authenticated, connectWallet } = usePrivy()
  const [email, setEmail] = useState("")

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login({ email })
      toast.success("Signup successful! Check your email for a login link.")
    } catch (error) {
      console.error("Signup error:", error)
      toast.error("Failed to sign up. Please try again.")
    }
  }

  const handleSolanaSignup = async () => {
    try {
      await connectWallet("solana")
      toast.success("Solana wallet connected successfully")
    } catch (error) {
      console.error("Solana wallet connection error:", error)
      toast.error("Failed to connect Solana wallet. Please try again.")
    }
  }

  if (authenticated) {
    return <p>You are already signed up and logged in.</p>
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleEmailSignup} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <Button type="submit" className="w-full">
          Sign Up with Email
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button onClick={handleSolanaSignup} className="w-full bg-black hover:bg-gray-800 text-white">
        <Image
          src="https://ucarecdn.com/0aa23f11-40b3-4cdc-891b-a169ed9f9328/sol.png"
          alt="Solana Logo"
          width={24}
          height={24}
          className="mr-2"
        />
        Sign Up with Solana
      </Button>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}

