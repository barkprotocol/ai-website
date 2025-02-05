import type { NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error("Error getting session:", error)
    return null
  }

  return data.session?.access_token || null
}

export async function refreshAccessToken(): Promise<string | null> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.refreshSession()

  if (error) {
    console.error("Error refreshing session:", error)
    return null
  }

  return data.session?.access_token || null
}

export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const supabase = createClient(request.cookies)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return !!user
}

export async function getUserFromRequest(request: NextRequest) {
  const supabase = createClient(request.cookies)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function signOut(): Promise<void> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  await supabase.auth.signOut()
}

export function getAuthorizationHeader(): string | null {
  const cookieStore = cookies()
  const token = cookieStore.get("access_token")?.value
  return token ? `Bearer ${token}` : null
}

