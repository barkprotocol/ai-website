"use server"

import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { z } from "zod"
import { supabase } from "@/lib/db" // Import Supabase client
import { type ActionResponse, actionClient } from "@/lib/safe-action"
import { type TransferWithMemoParams, createConnection } from "@/lib/solana"
import { verifyUser } from "./user"
import { mockDb } from "@/lib/db.mock"

const RECEIVE_WALLET_ADDRESS = process.env.NEXT_PUBLIC_EAP_RECEIVE_WALLET_ADDRESS!
const EAP_PRICE = 1.0

interface MemoData {
  type: string
  user_id: string
}

const parseTransaction = async (txHash: string): Promise<TransferWithMemoParams | null> => {
  try {
    const connection = createConnection()
    const tx = await connection.getParsedTransaction(txHash, {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    })

    if (!tx?.meta || !tx.transaction) {
      console.error("Failed to get transaction")
      return null
    }

    // Find SOL transfer instruction
    const transferIx = tx.transaction.message.instructions.find(
      (ix) => "program" in ix && ix.program === "system" && "parsed" in ix && ix.parsed.type === "transfer",
    )

    // Find Memo instruction
    const memoIx = tx.transaction.message.instructions.find((ix) => "program" in ix && ix.program === "spl-memo")

    if (!transferIx || !("parsed" in transferIx)) {
      console.error("Failed to find transfer instruction")
      return null
    }

    const transfer = transferIx.parsed
    if (!transfer.info) {
      return null
    }

    // Get memo data
    let memoData = ""
    if (memoIx && "parsed" in memoIx) {
      memoData = memoIx.parsed
    }

    return {
      to: transfer.info.destination,
      amount: Number(transfer.info.lamports) / LAMPORTS_PER_SOL,
      memo: memoData,
    }
  } catch (error) {
    console.error("Failed to parse transaction", error)
    return null
  }
}

export const checkEAPTransaction = actionClient
  .schema(z.object({ txHash: z.string() }))
  .action(async ({ parsedInput: { txHash } }): Promise<ActionResponse<{ success: boolean }>> => {
    // Verify user identity
    const authResult = await verifyUser()
    const userId = authResult?.data?.data?.id
    if (!userId) {
      return { success: false, error: "Unauthorized" }
    }

    // Check if user is already in EAP
    const user = await mockDb.user.findUnique({ where: { id: userId } })
    if (user?.isSubscribed) {
      return {
        success: false,
        error: "User is already in Early Access Program",
      }
    }

    try {
      // Parse transaction data
      const parsed = await parseTransaction(txHash)
      if (!parsed) {
        console.error("Failed to parse transaction")
        return { success: false, error: "Transaction not found" }
      }
      const { to, amount, memo: memoData } = parsed

      // Verify receiving wallet address
      if (to !== RECEIVE_WALLET_ADDRESS) {
        return { success: false, error: "Invalid receive wallet address" }
      }

      // Parse and verify memo data
      let memo: MemoData
      try {
        memo = JSON.parse(memoData)
      } catch {
        console.log("Invalid memo data format")
        console.log(memoData)
        return { success: false, error: "Invalid memo data format" }
      }

      // Verify transaction type
      if (memo.type !== "EAP_PURCHASE") {
        return { success: false, error: "Invalid transaction type" }
      }

      // Verify user ID
      if (memo.user_id !== userId) {
        return { success: false, error: "Invalid user ID" }
      }

      // Verify payment amount
      if (amount !== EAP_PRICE) {
        return {
          success: false,
          error: `Invalid amount (expected: ${EAP_PRICE} SOL, received: ${amount} SOL)`,
        }
      }

      // Update user's EAP status using Supabase
      const { data, error } = await supabase
        .from("users")
        .update({ isSubscribed: true, earlyAccess: true }) // Update earlyAccess as well
        .eq("id", memo.user_id)
        .single()

      if (error) {
        console.error("Error updating user EAP status:", error)
        return { success: false, error: "Failed to update EAP status" }
      }

      return { success: true, data: { success: true } }
    } catch (error) {
      console.error("Processing transaction failed:", error)
      return { success: false, error: "Failed to process transaction" }
    }
  })

