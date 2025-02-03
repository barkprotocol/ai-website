import {
  type Connection,
  type PublicKey,
  Transaction,
  type TransactionSignature,
  type SendOptions,
} from "@solana/web3.js"
import type { PrivyClient } from "../privy"
import type { VersionedTransaction } from "@solana/web3.js"
//import { Transaction } from "@solana/web3.js";

interface SolanaSignMessageRpcInputType {
  address: string
  chainType: string
  method: string
  params: {
    message: string
  }
}

export class PrivyEmbeddedWallet {
  privyClient: PrivyClient
  publicKey: PublicKey
  secretKey: Uint8Array

  constructor(privyClient: PrivyClient, publicKey: PublicKey) {
    if (!privyClient || !publicKey) {
      throw new Error("PrivyClient and publicKey are required")
    }
    this.privyClient = privyClient
    this.publicKey = publicKey
    // Secret key is not needed as signing is handled by Privy's API
    this.secretKey = new Uint8Array(0)
  }

  async signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> {
    try {
      const request = {
        address: this.publicKey.toBase58(),
        chainType: "solana",
        method: "signTransaction",
        params: {
          transaction: Buffer.from(transaction.serialize()).toString("base64"),
        },
      }
      const { data } = await this.privyClient.walletApi.rpc(request)
      const signedTransaction = Transaction.from(Buffer.from(data.signature, "base64")) as T
      return signedTransaction
    } catch (error) {
      throw new Error(`Failed to sign transaction: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]> {
    try {
      return Promise.all(transactions.map((tx) => this.signTransaction(tx)))
    } catch (error) {
      throw new Error(
        `Failed to sign multiple transactions: ${error instanceof Error ? error.message : "Unknown error"}`,
      )
    }
  }

  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    try {
      const request: SolanaSignMessageRpcInputType = {
        address: this.publicKey.toBase58(),
        chainType: "solana",
        method: "signMessage",
        params: {
          message: Buffer.from(message).toString("base64"),
        },
      }
      const { data } = await this.privyClient.walletApi.rpc(request)
      return Buffer.from(data.signature, "base64")
    } catch (error) {
      throw new Error(`Failed to sign message with Privy: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async sendTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T,
    connection: Connection,
    options?: SendOptions,
  ): Promise<TransactionSignature> {
    try {
      const signedTransaction = await this.signTransaction(transaction)
      return await connection.sendRawTransaction(signedTransaction.serialize(), options)
    } catch (error) {
      throw new Error(
        `Failed to send transaction through Privy: ${error instanceof Error ? error.message : "Unknown error"}`,
      )
    }
  }
}

