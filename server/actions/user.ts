import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { supabase } from "@/lib/db"
import type { User } from "@/types"

const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret"

export async function verifyUser() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return { success: false, error: "No authentication token" }
    }

    const decoded = verify(token, JWT_SECRET)
    return {
      success: true,
      data: {
        data: {
          id: typeof decoded === "object" ? decoded.sub : undefined,
        },
      },
    }
  } catch (error) {
    console.error("User verification failed:", error)
    return { success: false, error: "Invalid authentication token" }
  }
}

export async function updateUserData(id: string, data: Partial<User>) {
  try {
    const { data: updatedUser, error } = await supabase.from("users").update(data).eq("id", id).single()

    if (error) throw error

    return { success: true, data: updatedUser }
  } catch (error) {
    console.error("Error updating user:", error)
    return { success: false, error: "Failed to update user" }
  }
}

