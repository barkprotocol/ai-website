import { resolve } from "@bonfida/spl-name-service"
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { SOLANA_RPC_URL, SOLANA_COMMITMENT } from "./constants"

// Define PhantomProvider interface
interface PhantomProvider {
  publicKey: PublicKey | null
  isConnected: boolean
  signTransaction(transaction: Transaction): Promise<Transaction>
  signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>
  connect(): Promise<{ publicKey: PublicKey }>
  disconnect(): Promise<void>
}

export const MEMO_PROGRAM_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr")
export const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")

export const createConnection = () => new Connection(SOLANA_RPC_URL, SOLANA_COMMITMENT)

export interface TransferWithMemoParams {
  /** Target address */
  to: string
  /** Transfer amount (in SOL) */
  amount: number
  /** Attached message */
  memo: string
}

export class SolanaUtils {
  private static connection = createConnection()

  /**
   * Resolve .sol domain name to address
   * @param domain Domain name
   */
  static async resolveDomainToAddress(domain: string): Promise<string | null> {
    try {
      const owner = await resolve(this.connection, domain)
      return owner.toBase58()
    } catch (error) {
      console.error("Error resolving domain:", error)
      return null
    }
  }

  /**
   * Get wallet SOL balance
   * @param address Wallet address or .sol domain
   */
  static async getBalance(address: string): Promise<number> {
    try {
      let publicKeyStr = address

      // If it's a .sol domain, resolve to address first
      if (address.toLowerCase().endsWith(".sol")) {
        const resolvedAddress = await this.resolveDomainToAddress(address)
        if (!resolvedAddress) {
          throw new Error("Failed to resolve domain name")
        }
        publicKeyStr = resolvedAddress
      }

      const balance = await this.connection.getBalance(new PublicKey(publicKeyStr))
      return balance / LAMPORTS_PER_SOL
    } catch (error) {
      console.error("Failed to fetch balance:", error)
      return 0
    }
  }

  static async getPhantomProvider(): Promise<PhantomProvider | null> {
    if ("phantom" in window) {
      const provider = window.phantom?.solana
      if (provider?.isPhantom) {
        return provider as unknown as PhantomProvider
      }
    }

    // Fallback to window.solana
    if (window.solana?.isPhantom) {
      return window.solana as unknown as PhantomProvider
    }

    return null
  }

  /**
   * Send SOL transfer transaction with memo
   */
  static async sendTransferWithMemo(params: TransferWithMemoParams): Promise<string | null> {
    const provider = await this.getPhantomProvider()
    if (!provider) {
      throw new Error("Phantom wallet not found or connection rejected")
    }

    if (!provider.publicKey) {
      throw new Error("Wallet not connected")
    }

    const { to, amount, memo } = params
    const fromPubkey = provider.publicKey
    const toPubkey = new PublicKey(to)

    // Check balance first
    const balance = await this.connection.getBalance(fromPubkey)
    const requiredAmount = amount * LAMPORTS_PER_SOL
    if (balance < requiredAmount) {
      throw new Error(`Insufficient balance. You have ${balance / LAMPORTS_PER_SOL} SOL but need ${amount} SOL`)
    }

    try {
      // Create transaction
      const transaction = new Transaction()
      transaction.feePayer = fromPubkey

      // Create transfer instruction
      const transferInstruction = SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports: requiredAmount,
      })

      // Create Memo instruction
      const memoInstruction = new TransactionInstruction({
        keys: [{ pubkey: fromPubkey, isSigner: true, isWritable: true }],
        programId: MEMO_PROGRAM_ID,
        data: Buffer.from(memo, "utf-8"),
      })

      transaction.add(transferInstruction)
      transaction.add(memoInstruction)

      // Get latest blockhash
      const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash

      // Sign transaction
      const signedTransaction = await provider.signTransaction(transaction)

      // Send transaction
      const signature = await this.connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: false,
        preflightCommitment: SOLANA_COMMITMENT,
      })

      // Wait for confirmation
      const confirmation = await this.connection.confirmTransaction(
        {
          signature,
          blockhash,
          lastValidBlockHeight,
        },
        SOLANA_COMMITMENT,
      )

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`)
      }

      return signature
    } catch (error: unknown) {
      console.error("Transaction error:", error)
      if (error instanceof Error) {
        // Handle insufficient funds error
        if (error.message.includes("insufficient lamports")) {
          throw new Error(`Insufficient balance. Please make sure you have enough SOL to cover the transaction.`)
        }
        // Handle other known errors
        if (error.message.includes("Transaction simulation failed")) {
          throw new Error(`Transaction failed. Please try again.`)
        }
      }
      throw error
    }
  }

  /**
   * Get token balance for a specific mint
   * @param walletAddress Wallet address
   * @param mintAddress Token mint address
   */
  static async getTokenBalance(walletAddress: string, mintAddress: string): Promise<number> {
    try {
      const walletPublicKey = new PublicKey(walletAddress)
      const mintPublicKey = new PublicKey(mintAddress)

      const tokenAccounts = await this.connection.getTokenAccountsByOwner(walletPublicKey, { mint: mintPublicKey })

      if (tokenAccounts.value.length === 0) {
        return 0
      }

      const balance = await this.connection.getTokenAccountBalance(tokenAccounts.value[0].pubkey)
      return Number.parseFloat(balance.value.uiAmount?.toString() || "0")
    } catch (error) {
      console.error("Failed to fetch token balance:", error)
      return 0
    }
  }

  /**
   * Get all token balances for a wallet
   * @param walletAddress Wallet address
   */
  static async getAllTokenBalances(walletAddress: string): Promise<{ [mintAddress: string]: number }> {
    try {
      const walletPublicKey = new PublicKey(walletAddress)
      const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(walletPublicKey, {
        programId: TOKEN_PROGRAM_ID,
      })

      const balances: { [mintAddress: string]: number } = {}

      for (const { account } of tokenAccounts.value) {
        const mintAddress = account.data.parsed.info.mint
        const balance = Number.parseFloat(account.data.parsed.info.tokenAmount.uiAmount.toString())
        balances[mintAddress] = balance
      }

      return balances
    } catch (error) {
      console.error("Failed to fetch all token balances:", error)
      return {}
    }
  }

  /**
   * Get recent transactions for a wallet
   * @param walletAddress Wallet address
   * @param limit Number of transactions to fetch (default: 10)
   */
  static async getRecentTransactions(walletAddress: string, limit = 10): Promise<any[]> {
    try {
      const walletPublicKey = new PublicKey(walletAddress)
      const signatures = await this.connection.getSignaturesForAddress(walletPublicKey, { limit })

      const transactions = await Promise.all(
        signatures.map(async (sig) => {
          const tx = await this.connection.getTransaction(sig.signature, { maxSupportedTransactionVersion: 0 })
          return {
            signature: sig.signature,
            timestamp: sig.blockTime,
            ...tx,
          }
        }),
      )

      return transactions
    } catch (error) {
      console.error("Failed to fetch recent transactions:", error)
      return []
    }
  }

  /**
   * Estimate transaction fee
   * @param transaction Transaction to estimate fee for
   */
  static async estimateTransactionFee(transaction: Transaction): Promise<number> {
    try {
      const { feeCalculator } = await this.connection.getRecentBlockhash()
      return feeCalculator.lamportsPerSignature
    } catch (error) {
      console.error("Failed to estimate transaction fee:", error)
      return 0
    }
  }

  /**
   * Get the current network (mainnet-beta, testnet, or devnet)
   */
  static async getNetwork(): Promise<WalletAdapterNetwork> {
    try {
      const genesisHash = await this.connection.getGenesisHash()
      switch (genesisHash) {
        case "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d":
          return WalletAdapterNetwork.Mainnet
        case "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY":
          return WalletAdapterNetwork.Testnet
        case "EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG":
          return WalletAdapterNetwork.Devnet
        default:
          throw new Error("Unknown network")
      }
    } catch (error) {
      console.error("Failed to get network:", error)
      return WalletAdapterNetwork.Mainnet // Default to mainnet
    }
  }
}

// Constants for subscription and trial features
export const IS_SUBSCRIPTION_ENABLED = true
export const IS_TRIAL_ENABLED = true

// Utility function for conditional class names
export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// Function to get subscription price as a float
export function getSubPriceFloat(): number {
  // Replace this with actual logic to fetch the subscription price
  return 9.99
}

// Function to get trial tokens as a float
export function getTrialTokensFloat(): number {
  // Replace this with actual logic to fetch the trial tokens amount
  return 100.0
}

