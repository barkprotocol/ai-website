import type { Conversation } from "@prisma/client"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

interface ConversationsState {
  conversations: Conversation[]
  isLoading: boolean
  activeId: string | null
}

interface ConversationsActions {
  setConversations: (conversations: Conversation[]) => void
  addConversation: (conversation: Conversation) => void
  removeConversation: (id: string) => void
  setActiveId: (id: string | null) => void
  setLoading: (loading: boolean) => void
  markAsRead: (id: string) => void
}

type ConversationsStore = ConversationsState & ConversationsActions

export const useConversationsStore = create<ConversationsStore>()(
  immer((set) => ({
    conversations: [],
    isLoading: true,
    activeId: null,
    setConversations: (conversations) =>
      set((state) => {
        state.conversations = conversations
        state.isLoading = false
      }),
    addConversation: (conversation) =>
      set((state) => {
        state.conversations.unshift(conversation)
      }),
    removeConversation: (id) =>
      set((state) => {
        state.conversations = state.conversations.filter((c: { id: string }) => c.id !== id)
      }),
    setActiveId: (id) =>
      set((state) => {
        state.activeId = id
      }),
    setLoading: (loading) =>
      set((state) => {
        state.isLoading = loading
      }),
    markAsRead: (id) =>
      set((state) => {
        const conversation = state.conversations.find((c: { id: string }) => c.id === id)
        if (conversation) {
          conversation.lastReadAt = new Date()
        }
      }),
  })),
)

