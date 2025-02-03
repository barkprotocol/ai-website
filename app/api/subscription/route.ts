import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { action } = await req.json()

  if (action === "subscribe") {
    try {
      const subscription = await prisma.subscription.create({
        data: {
          userId: session.user.id,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          active: true,
        },
      })

      return NextResponse.json({ success: true, subscription })
    } catch (error) {
      console.error("Subscription creation error:", error)
      return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
    }
  } else if (action === "unsubscribe") {
    try {
      const subscription = await prisma.subscription.updateMany({
        where: {
          userId: session.user.id,
          active: true,
        },
        data: {
          active: false,
          endDate: new Date(),
        },
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

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        active: true,
      },
    })

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error("Subscription fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch subscription" }, { status: 500 })
  }
}

