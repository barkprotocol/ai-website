import { supabase } from "@/lib/db"

export async function subscribeUser(userId: string) {
  try {
    const { data: existingSubscription, error: findError } = await supabase
      .from("subscriptions")
      .select()
      .eq("userId", userId)
      .eq("active", true)
      .single()

    if (findError && findError.code !== "PGRST116") throw findError
    if (existingSubscription) {
      return { success: false, error: "User already has an active subscription" }
    }

    const { data: newSubscription, error: insertError } = await supabase
      .from("subscriptions")
      .insert({
        userId,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        active: true,
      })
      .single()

    if (insertError) throw insertError

    return { success: true, data: newSubscription }
  } catch (error) {
    console.error("Error subscribing user:", error)
    return { success: false, error: "Failed to create subscription" }
  }
}

export async function unsubscribeUser(userId: string) {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .update({ active: false, endDate: new Date().toISOString() })
      .eq("userId", userId)
      .eq("active", true)

    if (error) throw error

    if (data && data.length === 0) {
      return { success: false, error: "No active subscription found" }
    }

    return { success: true, data: { message: "Subscription cancelled successfully" } }
  } catch (error) {
    console.error("Error unsubscribing user:", error)
    return { success: false, error: "Failed to cancel subscription" }
  }
}

export async function reactivateUser(userId: string) {
  try {
    const { data: existingSubscription, error: findError } = await supabase
      .from("subscriptions")
      .select()
      .eq("userId", userId)
      .eq("active", false)
      .single()

    if (findError) throw findError
    if (!existingSubscription) {
      return { success: false, error: "No inactive subscription found" }
    }

    const { data: updatedSubscription, error: updateError } = await supabase
      .from("subscriptions")
      .update({
        active: true,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .eq("id", existingSubscription.id)
      .single()

    if (updateError) throw updateError

    return { success: true, data: { message: "Subscription reactivated successfully" } }
  } catch (error) {
    console.error("Error reactivating user:", error)
    return { success: false, error: "Failed to reactivate subscription" }
  }
}

