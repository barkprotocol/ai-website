"use server"

import type { SavedPrompt } from "@prisma/client"
import { z } from "zod"

import { type ActionResponse, actionClient } from "@/lib/safe-action"

import {
  dbCreateSavedPrompt,
  dbDeleteSavedPrompt,
  dbGetSavedPrompts,
  dbUpdateSavedPrompt,
  dbUpdateSavedPromptIsFavorite,
  dbUpdateSavedPromptLastUsedAt,
} from "../db/queries"
import { verifyUser } from "./user"

export const createSavedPrompt = actionClient
  .schema(z.object({ title: z.string(), content: z.string() }))
  .action<ActionResponse<SavedPrompt>>(async ({ title, content }) => {
    const authResult = await verifyUser()
    const userId = authResult?.data?.data?.id

    if (!userId) {
      return { success: false, error: "Unauthorized" }
    }

    try {
      const savedPrompt = await dbCreateSavedPrompt({ userId, title, content })
      return { success: true, data: savedPrompt }
    } catch (error) {
      console.error("Failed to create saved prompt:", error)
      return { success: false, error: "Failed to create saved prompt" }
    }
  })

export const deleteSavedPrompt = actionClient
  .schema(z.object({ id: z.string() }))
  .action<ActionResponse<boolean>>(async ({ id }) => {
    const authResult = await verifyUser()
    const userId = authResult?.data?.data?.id

    if (!userId) {
      return { success: false, error: "Unauthorized" }
    }

    try {
      const isDeleted = await dbDeleteSavedPrompt({ id })
      return { success: true, data: isDeleted }
    } catch (error) {
      console.error("Failed to delete saved prompt:", error)
      return { success: false, error: "Failed to delete saved prompt" }
    }
  })

export const editSavedPrompt = actionClient
  .schema(z.object({ id: z.string(), title: z.string(), content: z.string() }))
  .action<ActionResponse<SavedPrompt>>(async ({ id, title, content }) => {
    const authResult = await verifyUser()
    const userId = authResult?.data?.data?.id

    if (!userId) {
      return { success: false, error: "Unauthorized" }
    }

    try {
      const updatedPrompt = await dbUpdateSavedPrompt({ id, title, content })
      return { success: true, data: updatedPrompt }
    } catch (error) {
      console.error("Failed to update saved prompt:", error)
      return { success: false, error: "Failed to update saved prompt" }
    }
  })

export const getSavedPrompts = actionClient.action<ActionResponse<SavedPrompt[]>>(async () => {
  const authResult = await verifyUser()
  const userId = authResult?.data?.data?.id

  if (!userId) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const savedPrompts = await dbGetSavedPrompts({ userId })
    return { success: true, data: savedPrompts }
  } catch (error) {
    console.error("Failed to get saved prompts:", error)
    return { success: false, error: "Failed to get saved prompts" }
  }
})

export const setIsFavoriteSavedPrompt = actionClient
  .schema(z.object({ id: z.string(), isFavorite: z.boolean() }))
  .action<ActionResponse<SavedPrompt>>(async ({ id, isFavorite }) => {
    const authResult = await verifyUser()
    const userId = authResult?.data?.data?.id

    if (!userId) {
      return { success: false, error: "Unauthorized" }
    }

    try {
      const updatedPrompt = await dbUpdateSavedPromptIsFavorite({ id, isFavorite })
      return { success: true, data: updatedPrompt }
    } catch (error) {
      console.error("Failed to update favorite saved prompt:", error)
      return { success: false, error: "Failed to update favorite saved prompt" }
    }
  })

export const setSavedPromptLastUsedAt = actionClient
  .schema(z.object({ id: z.string() }))
  .action<ActionResponse<SavedPrompt>>(async ({ id }) => {
    const authResult = await verifyUser()
    const userId = authResult?.data?.data?.id

    if (!userId) {
      return { success: false, error: "Unauthorized" }
    }

    try {
      const updatedPrompt = await dbUpdateSavedPromptLastUsedAt({ id })
      return { success: true, data: updatedPrompt }
    } catch (error) {
      console.error("Failed to update saved prompt lastUsedAt:", error)
      return { success: false, error: "Failed to update saved prompt lastUsedAt" }
    }
  })

