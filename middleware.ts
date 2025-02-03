import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.JWT_SECRET })

  if (!token && request.nextUrl.pathname.startsWith("/api/auth/user")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/auth/user"],
}

