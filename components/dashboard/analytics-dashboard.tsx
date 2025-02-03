import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "@/components/ui/charts"

export function AnalyticsDashboard() {
  const tradeData = {
    labels: ["2023-05-01", "2023-05-02", "2023-05-03", "2023-05-04", "2023-05-05"],
    datasets: [
      {
        label: "Profit/Loss",
        data: [120, -45, 67, 210, -15],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  const portfolioAllocation = {
    labels: ["SOL", "USDC", "BARK", "Other"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
      },
    ],
  }

  const tradingVolume = {
    labels: ["Buy", "Sell"],
    datasets: [
      {
        label: "Trading Volume",
        data: [65, 35],
        backgroundColor: ["rgba(75, 192, 192, 0.8)", "rgba(255, 99, 132, 0.8)"],
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profit/Loss Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={tradeData} />
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

