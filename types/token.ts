export interface Token {
    mint: string
    symbol: string
    name: string
    decimals: number
    logoURI?: string
    tags?: string[]
  }
  
  export interface TokenBalance extends Token {
    balance: number
    usdValue?: number
  }
  
  export interface TokenMetadata {
    mint: string
    name: string
    symbol: string
    decimals: number
    logoURI?: string
  }
  
  export interface TokenAccount {
    pubkey: string
    mint: string
    owner: string
    amount: string
    delegateOption: number
    delegate: string
    state: number
    isNative: boolean
    rentExemptReserve: string | null
    closeAuthority: string | null
  }
  
  export type TokenList = Token[]
  
  export interface TokenPriceInfo {
    price: number
    volume24h: number
    marketCap: number
  }
  
  export interface TokenWithPrice extends Token {
    priceInfo?: TokenPriceInfo
  }
  
  