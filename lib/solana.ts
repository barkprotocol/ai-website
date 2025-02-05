import type { PrivyClient, SolanaSignTransactionRpcInputType } from "@privy-io/server-auth"
import type { Connection, PublicKey, Transaction, TransactionSignature, VersionedTransaction } from "@solana/web3.js"
import type {
  SendTransactionOptions,
  SupportedTransactionVersions,
  TransactionOrVersionedTransaction,
  WalletAdapter,
  WalletName,
  WalletAdapterEvents,
} from "@solana/wallet-adapter-base"
import { WalletReadyState, WalletError } from "@solana/wallet-adapter-base"
import EventEmitter from "events"

type ArgumentMap<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => any ? A : never
}

export class PrivyEmbeddedWallet extends EventEmitter implements WalletAdapter {
  private privyClient: PrivyClient
  publicKey: PublicKey
  private connectionState: "disconnected" | "connecting" | "connected" = "disconnected"

  constructor(privyClient: PrivyClient, publicKey: PublicKey) {
    super()
    try {
      this.privyClient = privyClient
      this.publicKey = publicKey
    } catch (error) {
      throw new Error(`Failed to initialize wallet: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  name: WalletName<string> = "Privy Embedded Wallet" as WalletName<string>
  url = "https://privy.io"
  icon = "https://privy.io/favicon.ico" // Replace with actual Privy icon URL
  readyState: WalletReadyState = WalletReadyState.Installed

  get connecting(): boolean {
    return this.connectionState === "connecting"
  }

  get connected(): boolean {
    return this.connectionState === "connected"
  }

  supportedTransactionVersions?: SupportedTransactionVersions = new Set(["legacy", 0])

  async autoConnect(): Promise<void> {
    if (this.connected || this.connecting) return
    try {
      await this.connect()
    } catch (error) {
      console.error("Auto-connect failed:", error)
    }
  }

  async connect(): Promise<void> {
    if (this.connected || this.connecting) return
    try {
      this.connectionState = "connecting"
      // Removed 'connecting' event emission as it's not part of WalletAdapterEvents
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.connectionState = "connected"
      this.emit("connect", this.publicKey)
    } catch (error) {
      this.connectionState = "disconnected"
      this.emit("error", new WalletError("Failed to connect"))
      throw error
    }
  }

  async disconnect(): Promise<void> {
    if (this.connectionState === "disconnected") return
    try {
      this.connectionState = "disconnected"
      this.emit("disconnect")
    } catch (error) {
      this.emit("error", new WalletError("Failed to disconnect"))
      throw error
    }
  }

  async sendTransaction(
    transaction: TransactionOrVersionedTransaction<this["supportedTransactionVersions"]>,
    connection: Connection,
    options?: SendTransactionOptions,
  ): Promise<TransactionSignature> {
    if (!this.connected) {
      throw new Error("Wallet not connected")
    }
    try {
      const signed = await this.signTransaction(transaction)
      return await connection.sendRawTransaction(signed.serialize(), options)
    } catch (error) {
      this.emit("error", new WalletError("Failed to send transaction"))
      throw error
    }
  }

  async signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> {
    try {
      const request: SolanaSignTransactionRpcInputType<T> = {
        address: this.publicKey.toBase58(),
        chainType: "solana",
        method: "signTransaction",
        params: {
          transaction,
        },
      }
      const { data } = await this.privyClient.walletApi.rpc(request)
      return data.signedTransaction as T
    } catch (error) {
      throw new Error(`Failed to sign transaction: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]> {
    try {
      return Promise.all(transactions.map((tx) => this.signTransaction(tx)))
    } catch (error) {
      throw new Error(`Failed to sign transactions: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    // Implement message signing logic
    throw new Error("Message signing not implemented for Privy Embedded Wallet")
  }

  listeners<E extends keyof WalletAdapterEvents>(event: E): WalletAdapterEvents[E][] {
    return super.listeners(event) as WalletAdapterEvents[E][]
  }

  on<E extends keyof WalletAdapterEvents>(event: E, listener: WalletAdapterEvents[E]): this {
    return super.on(event, listener as (...args: any[]) => void)
  }

  once<E extends keyof WalletAdapterEvents>(event: E, listener: WalletAdapterEvents[E]): this {
    return super.once(event, listener as (...args: any[]) => void)
  }

  off<E extends keyof WalletAdapterEvents>(event: E, listener: WalletAdapterEvents[E]): this {
    return super.off(event, listener as (...args: any[]) => void)
  }

  removeListener<E extends keyof WalletAdapterEvents>(event: E, listener: WalletAdapterEvents[E]): this {
    return super.removeListener(event, listener as (...args: any[]) => void)
  }

  emit<E extends keyof WalletAdapterEvents>(event: E, ...args: Parameters<WalletAdapterEvents[E]>): boolean {
    return super.emit(event, ...args)
  }
}

