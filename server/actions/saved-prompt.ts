import { supabase } from "@/lib/db"

export async function createSavedPrompt(data: { title: string; content: string; userId: string }) {
  try {
    const { data: savedPrompt, error } = await supabase.from("saved_prompts").insert(data).single()

    if (error) throw error

    return { success: true, data: savedPrompt }
  } catch (error) {
    console.error("Error creating saved prompt:", error)
    return { success: false, error: "Failed to create saved prompt" }
  }
}

export async function getSavedPrompts(userId: string) {
  try {
    const { data: savedPrompts, error } = await supabase
      .from("saved_prompts")
      .select("*")
      .eq("userId", userId)
      .order("lastUsedAt", { ascending: false })

    if (error) throw error

    return { success: true, data: savedPrompts }
  } catch (error) {
    console.error("Error fetching saved prompts:", error)
    return { success: false, error: "Failed to fetch saved prompts" }
  }
}

export async function setSavedPromptLastUsedAt(id: string) {
  try {
    const { data: updatedPrompt, error } = await supabase
      .from("saved_prompts")
      .update({ lastUsedAt: new Date().toISOString() })
      .eq("id", id)
      .single()

    if (error) throw error

    return { success: true, data: updatedPrompt }
  } catch (error) {
    console.error("Error updating saved prompt last used at:", error)
    return { success: false, error: "Failed to update saved prompt" }
  }
}

