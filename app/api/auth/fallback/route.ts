import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // In a real-world scenario, you would validate the email and password against your database
  // For this example, we'll use a simple check
  if (email === "user@example.com" && password === "password123") {
    const token = sign({ email }, JWT_SECRET, { expiresIn: "1h" })

    return NextResponse.json({ success: true, token })
  } else {
    return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
  }
}

