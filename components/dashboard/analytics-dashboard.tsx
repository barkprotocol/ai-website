import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "@/components/ui/charts"

export function AnalyticsDashboard() {
  // This data would typically come from an API call
  const tradeData = [
    { date: "2023-05-01", profit: 120 },
    { date: "2023-05-02", profit: -45 },
    { date: "2023-05-03", profit: 67 },
    { date: "2023-05-04", profit: 210 },
    { date: "2023-05-05", profit: -15 },
  ]

  const portfolioAllocation = [
    { name: "SOL", value: 40 },
    { name: "USDC", value: 30 },
    { name: "BARK", value: 20 },
    { name: "Other", value: 10 },
  ]

  const tradingVolume = [
    { name: "Buy", value: 65 },
    { name: "Sell", value: 35 },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profit/Loss Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={tradeData} xKey="date" yKey="profit" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart data={portfolioAllocation} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Trading Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={tradingVolume} />
        </CardContent>
      </Card>
    </div>
  )
}

