import { COINMARKETCAP_API_KEY, COINMARKETCAP_API_URL } from "@/lib/constants"

export interface CoinMarketCapQuote {
  price: number
  volume_24h: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  market_cap: number
}

export interface CoinMarketCapData {
  id: number
  name: string
  symbol: string
  slug: string
  quote: {
    USD: CoinMarketCapQuote
  }
}

export async function getCoinMarketCapData(symbol: string): Promise<CoinMarketCapData> {
  const url = `${COINMARKETCAP_API_URL}/v1/cryptocurrency/quotes/latest?symbol=${symbol}`

  const response = await fetch(url, {
    headers: {
      "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return data.data[symbol]
}

