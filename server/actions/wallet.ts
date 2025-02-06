"use server"

import { PublicKey } from "@solana/web3.js"
import { z } from "zod"
import { generateEncryptedKeyPair } from "@/lib/solana/wallet-generator"

import prisma from "@/lib/prisma"
import { type ActionResponse, actionClient } from "@/lib/safe-action"
import type { EmbeddedWallet } from "@/types/db"

import { retrieveAgentKit } from "./ai"
import { verifyUser } from "./user"

export const listEmbeddedWallets = actionClient.action<ActionResponse<EmbeddedWallet[]>>(async () => {
  const authResult = await verifyUser()
  const userId = authResult?.data?.data?.id

  if (!userId) {
    return {
      success: false,
      error: "Authentication failed",
    }
  }

  const wallets = await prisma.wallet.findMany({
    where: { ownerId: userId },
  })

  return {
    success: true,
    data: wallets,
  }
})

export const getActiveWallet = actionClient.action<ActionResponse<EmbeddedWallet>>(async () => {
  const authResult = await verifyUser()
  const userId = authResult?.data?.data?.id

  if (!userId) {
    return { success: false, error: "Unauthorized" }
  }

  const wallet = await prisma.wallet.findFirst({
    where: {
      ownerId: userId,
      active: true,
    },
  })

  if (!wallet) {
    return { success: false, error: "Wallet not found" }
  }

  return {
    success: true,
    data: wallet,
  }
})

export const setActiveWallet = actionClient
  .schema(z.object({ publicKey: z.string() }))
  .action(async ({ parsedInput: { publicKey } }) => {
    const authResult = await verifyUser()
    const userId = authResult?.data?.data?.id

    if (!userId) {
      return { success: false, error: "Unauthorized" }
    }

    const wallet = await prisma.wallet.findFirst({
      where: {
        ownerId: userId,
        publicKey,
      },
    })

    if (!wallet) {
      return { success: false, error: "Wallet not found" }
    }

    const existingWallet = await prisma.wallet.findFirst({
      where: {
        ownerId: userId,
        active: true,
      },
    })

    if (existingWallet) {
      await prisma.wallet.update({
        where: {
          ownerId_publicKey: {
            ownerId: userId,
            publicKey: existingWallet.publicKey,
          },
        },
        data: {
          active: false,
        },
      })
    }

    await prisma.wallet.update({
      where: {
        ownerId_publicKey: {
          ownerId: userId,
          publicKey,
        },
      },
      data: {
        active: true,
      },
    })

    return {
      success: true,
    }
  })

export const embeddedWalletSendSOL = actionClient
  .schema(
    z.object({
      walletId: z.string(),
      recipientAddress: z.string(),
      amount: z.number(),
    }),
  )
  .action<ActionResponse<string>>(async ({ parsedInput: { walletId, recipientAddress, amount } }) => {
    const authResult = await verifyUser()
    const userId = authResult?.data?.data?.id
    if (!userId) {
      return {
        success: false,
        error: "Authentication failed",
      }
    }
    const wallet = await prisma.wallet.findUnique({
      where: { id: walletId },
    })
    if (!wallet || wallet.ownerId !== userId) {
      return {
        success: false,
        error: "Wallet not found",
      }
    }
    const agent = (await retrieveAgentKit({ walletId }))?.data?.data?.agent
    try {
      const signature = await agent?.transfer(new PublicKey(recipientAddress), amount)
      return {
        success: true,
        data: signature,
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to send SOL (error: " + error + ")",
      }
    }
  })

export const createEmbeddedWallet = actionClient
  .schema(z.object({ name: z.string().min(1).max(50) }))
  .action<ActionResponse<EmbeddedWallet>>(async ({ parsedInput: { name } }) => {
    const authResult = await verifyUser()
    const userId = authResult?.data?.data?.id

    if (!userId) {
      return {
        success: false,
        error: "Authentication failed",
      }
    }

    try {
      const { publicKey, encryptedPrivateKey } = await generateEncryptedKeyPair()
      const wallet = await prisma.wallet.create({
        data: {
          ownerId: userId,
          name,
          publicKey,
          encryptedPrivateKey,
          walletSource: "EMBEDDED",
          chain: "SOLANA",
          active: false,
        },
      })

      return {
        success: true,
        data: wallet,
      }
    } catch (error) {
      console.error("Failed to create embedded wallet:", error)
      return {
        success: false,
        error: "Failed to create embedded wallet",
      }
    }
  })

