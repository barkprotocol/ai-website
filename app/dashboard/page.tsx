"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard/layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard"
import { withSubscription } from "@/components/auth/with-subscription"
import { BarChart, Wallet, Zap } from "lucide-react"
import { WalletInfo } from "@/components/dashboard/wallet-info"

function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [isLoading, user, router])

  if (isLoading || !user) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name || user.email}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard title="Total Balance" value="$1,234.56" description="+20.1% from last month" icon={Wallet} />
        <StatsCard title="Active Trades" value="23" description="+5 since yesterday" icon={Zap} />
        <StatsCard title="Profit/Loss" value="+$789.12" description="+12.3% from last week" icon={BarChart} />
      </div>
      <WalletInfo />
      <AnalyticsDashboard />
      <RecentActivity />
    </DashboardLayout>
  )
}

export default withSubscription(DashboardPage)

