import fetch from "node-fetch"

const ME_API_BASE = "https://api-mainnet.magiceden.dev/v2"

interface NFTListing {
  pdaAddress: string
  auctionHouse: string
  tokenAddress: string
  tokenMint: string
  seller: string
  sellerReferral: string
  tokenSize: number
  price: number
  expiry: number
}

interface NFTActivity {
  signature: string
  type: string
  source: string
  tokenMint: string
  collection: string
  slot: number
  blockTime: number
  buyer: string
  buyerReferral: string
  seller: string
  sellerReferral: string
  price: number
}

async function getCollectionStats(symbol: string): Promise<any> {
  const url = `${ME_API_BASE}/collections/${symbol}/stats`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

async function getNFTListings(symbol: string, limit = 20, offset = 0): Promise<NFTListing[]> {
  const url = `${ME_API_BASE}/collections/${symbol}/listings?limit=${limit}&offset=${offset}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

async function getNFTActivities(symbol: string, limit = 20, offset = 0): Promise<NFTActivity[]> {
  const url = `${ME_API_BASE}/collections/${symbol}/activities?limit=${limit}&offset=${offset}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

async function getWalletNFTs(walletAddress: string): Promise<any[]> {
  const url = `${ME_API_BASE}/wallets/${walletAddress}/tokens?listStatus=both`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export { getCollectionStats, getNFTListings, getNFTActivities, getWalletNFTs }

