import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function dbGetConversation({ conversationId }: { conversationId: string }) {
  const { data, error } = await supabase.from("conversations").select("*").eq("id", conversationId).single()
  if (error) {
    console.error("Error fetching conversation:", error)
    return null
  }
  return data
}

export async function dbGetConversationMessages({ conversationId }: { conversationId: string }) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversationId", conversationId)
    .order("createdAt", { ascending: true })
  if (error) {
    console.error("Error fetching conversation messages:", error)
    return null
  }
  return data
}

