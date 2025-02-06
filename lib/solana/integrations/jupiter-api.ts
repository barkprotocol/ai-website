import { type Connection, Transaction } from "@solana/web3.js"
import { JUPITER_API_BASE } from "@/lib/constants"

export interface JupiterQuoteResponse {
  inputMint: string
  outputMint: string
  amount: string
  swapMode: string
  slippageBps: number
  otherAmountThreshold: string
  swapEstimate: {
    inputAmount: string
    outputAmount: string
    priceImpactPct: number
  }
  routePlan: Array<{
    swapInfo: {
      ammKey: string
      label: string
      inputMint: string
      outputMint: string
      inAmount: string
      outAmount: string
      feeAmount: string
      feeMint: string
    }
  }>
}

export async function getJupiterQuote(
  inputMint: string,
  outputMint: string,
  amount: number,
  slippageBps = 50,
): Promise<JupiterQuoteResponse> {
  const url = `${JUPITER_API_BASE}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.json()
}

export async function executeJupiterSwap(
  connection: Connection,
  wallet: any,
  quoteResponse: JupiterQuoteResponse,
): Promise<string> {
  const swapRequestBody = {
    quoteResponse,
    userPublicKey: wallet.publicKey.toString(),
    wrapUnwrapSOL: true,
  }

  const swapResponse = await fetch(`${JUPITER_API_BASE}/swap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(swapRequestBody),
  })

  if (!swapResponse.ok) {
    throw new Error(`Swap request failed! status: ${swapResponse.status}`)
  }

  const swapData = await swapResponse.json()
  const { swapTransaction } = swapData

  // Deserialize and sign the transaction
  const transaction = Transaction.from(Buffer.from(swapTransaction, "base64"))
  const signedTransaction = await wallet.signTransaction(transaction)

  // Send the signed transaction
  const txid = await connection.sendRawTransaction(signedTransaction.serialize())
  await connection.confirmTransaction(txid)

  return txid
}

