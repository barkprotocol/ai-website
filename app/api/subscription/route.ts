import { NextResponse } from "next/server"
import { mockDb, type User, type Subscription } from "@/lib/mock-db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  // Use optional chaining and nullish coalescing to handle potential undefined values
  const userId = session?.user?.id ?? "default-user-id"

  const { action } = await req.json()

  if (action === "subscribe") {
    try {
      const subscription = await mockDb.subscription.create({
        data: {
          userId,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          active: true,
        } as Subscription,
      })

      await mockDb.user.update({
        where: { id: userId },
        data: { isSubscribed: true } as Partial<User>,
      })

      return NextResponse.json({ success: true, subscription })
    } catch (error) {
      console.error("Subscription creation error:", error)
      return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
    }
  } else if (action === "unsubscribe") {
    try {
      const subscription = await mockDb.subscription.updateMany({
        where: {
          userId,
          active: true,
        },
        data: {
          active: false,
          endDate: new Date(),
        },
      })

      await mockDb.user.update({
        where: { id: userId },
        data: { isSubscribed: false } as Partial<User>,
      })

      return NextResponse.json({ success: true, subscription })
    } catch (error) {
      console.error("Subscription cancellation error:", error)
      return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 })
    }
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  // Use optional chaining and nullish coalescing to handle potential undefined values
  const userId = session?.user?.id ?? "default-user-id"

  try {
    const subscription = await mockDb.subscription.findFirst({
      where: {
        userId,
        active: true,
      },
    })

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error("Subscription fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch subscription" }, { status: 500 })
  }
}

