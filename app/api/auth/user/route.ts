import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: session.user.id,
        name: session.user.name || null,
        email: session.user.email || null,
      },
    })
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function HEAD(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    return NextResponse.json({}, { status: session ? 200 : 401 })
  } catch (error) {
    console.error("Error checking authentication:", error)
    return NextResponse.json({}, { status: 500 })
  }
}

