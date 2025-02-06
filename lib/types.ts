export interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    createdAt?: string | Date | undefined
  }
  
  export type WalletSource = "PHANTOM" | "SOLFLARE" | "BACKPACK" | "EMBEDDED" | "OTHER"
  
  