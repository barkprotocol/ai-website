import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface SubscriptionCardProps {
  isSubscribed: boolean
  onSubscribe: () => Promise<void>
  onUnsubscribe: () => Promise<void>
}

export function SubscriptionCard({ isSubscribed, onSubscribe, onUnsubscribe }: SubscriptionCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAction = async (action: "subscribe" | "unsubscribe") => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      })
      const data = await response.json()
      if (data.success) {
        if (action === "subscribe") {
          await onSubscribe()
          toast({
            title: "Subscribed successfully",
            description: "You are now subscribed to the BARK AI Agent premium plan.",
          })
        } else {
          await onUnsubscribe()
          toast({
            title: "Unsubscribed successfully",
            description: "You have been unsubscribed from the BARK AI Agent premium plan.",
          })
        }
      } else {
        throw new Error(data.error || `Failed to ${action}`)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>BARK AI Agent Premium</CardTitle>
        <CardDescription>Unlock advanced features and AI-powered trading strategies</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          <li>Access to advanced AI trading algorithms</li>
          <li>Real-time market analysis and insights</li>
          <li>Priority customer support</li>
          <li>Customizable trading strategies</li>
        </ul>
        <div className="mt-4">
          <p className="text-2xl font-bold">$49.99/month</p>
        </div>
      </CardContent>
      <CardFooter>
        {isSubscribed ? (
          <Button onClick={() => handleAction("unsubscribe")} variant="destructive" disabled={isLoading}>
            {isLoading ? "Processing..." : "Unsubscribe"}
          </Button>
        ) : (
          <Button onClick={() => handleAction("subscribe")} disabled={isLoading}>
            {isLoading ? "Processing..." : "Subscribe Now"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

