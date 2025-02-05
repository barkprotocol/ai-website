"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Loading } from "@/components/ui/loading"
import { appConfig } from "@/lib/constants"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

export default function DashboardPage() {
  const { isLoading, error, user } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">Error: {error.message}</p>
          <Button asChild>
            <Link href="/">Go back to home</Link>
          </Button>
        </div>
      ) : !user ? (
        <div className="text-center">
          <div className="mb-6">
            <Logo width={80} height={80} />
            <h1 className="text-3xl font-bold mt-4 text-gray-900 dark:text-gray-100">BARK AI Agent</h1>
          </div>
          <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">Please log in to access the dashboard.</p>
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              This is your personal dashboard. Here you can manage your account, view your trading history, and access
              advanced features.
            </p>
            <div className="mt-8 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                BARK AI Agent v{appConfig.version} {appConfig.isBeta ? "(Beta)" : ""}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

