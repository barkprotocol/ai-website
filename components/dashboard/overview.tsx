"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/hooks/use-user"
import { useWalletPortfolio } from "@/hooks/use-wallet-portfolio"

export function Overview() {
  const { user } = useUser()
  const { portfolio, isLoading: isPortfolioLoading } = useWalletPortfolio()

  if (!user) {
    return <div>Loading user data...</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isPortfolioLoading ? "Loading..." : `$${portfolio?.totalBalanceUsd.toFixed(2)}`}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Number of Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isPortfolioLoading ? "Loading..." : portfolio?.tokens.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Account Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.subscription?.active ? "Premium" : "Free"}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Joined Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{new Date(user.createdAt).toLocaleDateString()}</div>
        </CardContent>
      </Card>
    </div>
  )
}

