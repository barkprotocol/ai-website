import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { mockDb } from "@/lib/mock-db"
import { PublicKey } from "@solana/web3.js"
import crypto from "crypto"

export async function GET(req: Request) {
  const session = await getServerSession()

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const user = await mockDb.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { password, ...userWithoutPassword } = user
    return NextResponse.json({ success: true, data: userWithoutPassword })
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session || !session.user || !session.user.email) {
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
    const signatureUint8 = Buffer.from(signature, "base64")

    const isValid = crypto.verify("sha256", messageUint8, publicKey.toBuffer(), signatureUint8)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Update the user's wallet address
    const user = await mockDb.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const updatedUser = await mockDb.user.update({
      where: { id: user.id },
      data: { walletAddress },
    })

    const { password, ...userWithoutPassword } = updatedUser
    return NextResponse.json({ success: true, data: userWithoutPassword })
  } catch (error) {
    console.error("Error updating user wallet:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

