"use server"

import { z } from "zod"
import type { SavedPrompt } from "@prisma/client"

import prisma from "@/lib/prisma"
import { type ActionResponse, actionClient } from "@/lib/safe-action"
import { verifyUser } from "./user"

const markConversationAsReadSchema = z.object({ id: z.string() })

export const markConversationAsRead = actionClient
  .schema(markConversationAsReadSchema)
  .action<ActionResponse<SavedPrompt>>(async ({ id }) => {
    const authResult = await verifyUser()
    const userId = authResult?.data?.data?.id

    if (!userId) {
      return { success: false, error: "Unauthorized" }
    }

    try {
      // Update conversation last read timestamp
      await prisma.conversation.update({
        where: { id, userId }, // Add userId to ensure the user owns the conversation
        data: { lastReadAt: new Date() },
      })

      return { success: true }
    } catch (error) {
      console.error("Error marking conversation as read:", error)
      return { success: false, error: "Failed to mark conversation as read" }
    }
  })

