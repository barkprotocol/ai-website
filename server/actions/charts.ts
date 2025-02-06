import { z } from "zod"

const API_KEY = process.env.CG_API_KEY
const BASE_URL = process.env.CG_BASE_URL || "https://api.coingecko.com/api/v3"

const tokenSchema = z.object({
  id: z.string(),
})

const priceHistorySchema = z.object({
  prices: z.array(z.tuple([z.number(), z.number()])),
})

export const getTokenId = async (contractAddress: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API key not found")
  }
  const url = `${BASE_URL}/coins/solana/contract/${contractAddress}`
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": API_KEY,
    },
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`Failed to fetch token ID: ${response.statusText}`)
    }

    const data = await response.json()
    const parsed = tokenSchema.parse(data)
    return parsed.id
  } catch (error) {
    console.error("Error fetching token ID:", error)
    throw error
  }
}

export const getPriceHistory = async (tokenId: string, days = 7): Promise<{ time: string; value: number }[]> => {
  if (!API_KEY) {
    throw new Error("API key not found")
  }
  const url = `${BASE_URL}/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}&precision=18`
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": API_KEY,
    },
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`Failed to fetch price history: ${response.statusText}`)
    }

    const data = await response.json()
    const parsed = priceHistorySchema.parse(data)
    return parsed.prices.map(([time, value]) => ({
      time: new Date(time).toLocaleString(),
      value,
    }))
  } catch (error) {
    console.error("Error fetching price history:", error)
    throw error
  }
}

