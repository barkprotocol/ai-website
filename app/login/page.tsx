"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login, authenticated, ready } = usePrivy()
  const { theme } = useTheme()

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await login()
      toast.success("Login successful")
      router.push("/app/(user)/home")
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Failed to login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!ready) {
    return <div>Loading...</div>
  }

  if (authenticated) {
    router.push("/app/(user)/home")
    return null
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
          <CardDescription>Connect your wallet or use email to login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect Wallet or Email"
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary underline-offset-4 transition-colors hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

