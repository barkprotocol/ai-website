"use client"
import { DashboardLayout } from "@/components/dashboard/layout"
import { SubscriptionCard } from "@/components/dashboard/subscription-card"
import { PaymentForm } from "@/components/dashboard/payment-form"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SubscriptionPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Subscription Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubscriptionCard
          isSubscribed={user?.isSubscribed || false}
          onSubscribe={async () => {
            // This will be handled by the PaymentForm
          }}
          onUnsubscribe={async () => {
            // Implement unsubscribe logic
          }}
        />
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentForm />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

