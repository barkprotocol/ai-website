import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { mockDb } from "@/lib/mock-db"
import { PublicKey } from "@solana/web3.js"
import * as nacl from "tweetnacl"

export async function GET(req: Request) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const user = await mockDb.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        isSubscribed: true,
        subscriptionEndsAt: true,
        walletAddress: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { walletAddress, signature, message } = await req.json()

    if (!walletAddress || !signature || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify the signature
    const publicKey = new PublicKey(walletAddress)
    const messageUint8 = new TextEncoder().encode(message)
    const isValid =
      PublicKey.isOnCurve(publicKey) &&
      nacl.sign.detached.verify(messageUint8, Buffer.from(signature, "base64"), publicKey.toBytes())

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Update the user's wallet address
    const updatedUser = await mockDb.user.update({
      where: { id: session.user.id },
      data: { walletAddress },
      select: {
        id: true,
        email: true,
        name: true,
        isSubscribed: true,
        subscriptionEndsAt: true,
        walletAddress: true,
      },
    })

    return NextResponse.json({ success: true, data: updatedUser })
  } catch (error) {
    console.error("Error updating user wallet:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

