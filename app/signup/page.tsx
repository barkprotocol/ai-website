"use client"

import { useEffect, useState } from "react"
import { SignupForm } from "@/components/auth/signup-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function SignupPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // or a loading spinner
  }

  return (
    <main className="container flex items-center justify-center min-h-screen py-10 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign Up for BARK AI Agent</CardTitle>
          <CardDescription>Create your account or connect your wallet to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </main>
  )
}

