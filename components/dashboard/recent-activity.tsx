import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest trades and actions</CardDescription>
      </CardHeader>
      <CardContent>
        {/* TODO: Implement actual recent activity list */}
        <p>No recent activities to display.</p>
      </CardContent>
    </Card>
  )
}

