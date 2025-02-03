import { type Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { createTransferCheckedInstruction, getAssociatedTokenAddress, getMint } from "@solana/spl-token"
import { USDC_MINT, BARK_MINT } from "@/lib/constants"

export async function createSolanaPayTransaction(
  connection: Connection,
  fromPubkey: PublicKey,
  toPubkey: PublicKey,
  amount: number,
  currency: "SOL" | "USDC" | "BARK",
) {
  const transaction = new Transaction()

  if (currency === "SOL") {
    transaction.add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports: amount * LAMPORTS_PER_SOL,
      }),
    )
  } else {
    const mint = new PublicKey(currency === "USDC" ? USDC_MINT : BARK_MINT)
    const mintInfo = await getMint(connection, mint)
    const fromATA = await getAssociatedTokenAddress(mint, fromPubkey)
    const toATA = await getAssociatedTokenAddress(mint, toPubkey)

    transaction.add(
      createTransferCheckedInstruction(
        fromATA,
        mint,
        toATA,
        fromPubkey,
        amount * 10 ** mintInfo.decimals,
        mintInfo.decimals,
      ),
    )
  }

  return transaction
}

