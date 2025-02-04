import { NextResponse } from "next/server"
import { mockDb, type Subscription, type User } from "@/lib/mock-db"

export async function GET(request: Request) {
  // Verify the request is from Vercel
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Find all expired subscriptions
    const expiredSubscriptions = await mockDb.subscription.findMany({
      where: {
        endDate: new Date(),
        active: true,
      },
    })

    // Deactivate expired subscriptions
    for (const subscription of expiredSubscriptions) {
      await mockDb.subscription.updateMany({
        where: { id: subscription.id },
        data: { active: false } as Partial<Subscription>,
      })

      // Update user's subscription status
      await mockDb.user.update({
        where: { id: subscription.userId },
        data: { isSubscribed: false } as Partial<User>,
      })
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${expiredSubscriptions.length} expired subscriptions`,
    })
  } catch (error) {
    console.error("Error processing subscriptions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

