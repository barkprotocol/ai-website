"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard/layout"
import DashboardContent from "@/components/dashboard/content"

export default function DashboardPage() {
  const { ready, authenticated, user, logout } = usePrivy()
  const router = useRouter()

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/login")
    }
  }, [ready, authenticated, router])

  if (!ready || !authenticated) {
    return null
  }

  return (
    <DashboardLayout>
      <DashboardContent user={user} />
      <Button onClick={() => logout()} className="mt-4">
        Logout
      </Button>
    </DashboardLayout>
  )
}

