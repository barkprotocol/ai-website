import { type Connection, Transaction } from "@solana/web3.js"
import type { TokenInfo } from "@solana/spl-token-registry"
import fetch from "node-fetch"

const JUPITER_API_BASE = "https://quote-api.jup.ag/v4"

interface JupiterRoute {
  inAmount: string
  outAmount: string
  priceImpactPct: number
  marketInfos: any[]
  amount: string
  slippageBps: number
  otherAmountThreshold: string
  swapMode: string
}

async function getJupiterRoute(
  connection: Connection,
  inputMint: string,
  outputMint: string,
  amount: number,
  slippageBps = 50,
): Promise<JupiterRoute> {
  const url = `${JUPITER_API_BASE}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  return data as JupiterRoute
}

async function executeJupiterSwap(
  connection: Connection,
  wallet: any, // Replace 'any' with the actual wallet type you're using
  route: JupiterRoute,
): Promise<string> {
  const swapRequestBody = {
    quoteResponse: route,
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

async function getTokenList(): Promise<TokenInfo[]> {
  const response = await fetch("https://token.jup.ag/strict")
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export { getJupiterRoute, executeJupiterSwap, getTokenList }

