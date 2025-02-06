"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/use-user"
import { WalletCard } from "@/components/dashboard/wallet-card"
import { IntegrationCard } from "@/components/dashboard/integration-card"
import { appConfig } from "@/lib/constants"

export function DashboardContent() {
  const { user, isLoading } = useUser()
  const [isWalletLoading, setIsWalletLoading] = useState(false)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please log in to view your dashboard.</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
          <CardDescription>Your account information and summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>User ID:</strong> {user.id}
            </p>
            {user.email && (
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Wallet</CardTitle>
          <CardDescription>Manage your Solana wallet</CardDescription>
        </CardHeader>
        <CardContent>
          {user.wallet ? (
            <WalletCard
              wallet={user.wallet}
              mutateWallets={async () => {}} // This should be implemented to refresh wallet data
              allWalletAddresses={[user.wallet.address]}
            />
          ) : (
            <Button onClick={() => setIsWalletLoading(true)} disabled={isWalletLoading}>
              {isWalletLoading ? "Creating Wallet..." : "Create Wallet"}
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Connected services and platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <IntegrationCard />
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        <p>
          BARK AI Agent v{appConfig.version} {appConfig.isBeta ? "(Beta)" : ""}
        </p>
      </div>
    </div>
  )
}

