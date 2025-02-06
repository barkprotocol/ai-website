import { PublicKey, Keypair, type Connection, type TransactionSignature } from "@solana/web3.js"
import { type CoreMessage, type CoreUserMessage, generateText } from "ai"
import { SolanaAgentKit } from "solana-agent-kit"
import { z } from "zod"
import { WalletReadyState, type WalletName } from "@solana/wallet-adapter-base"
import type {
  SendTransactionOptions,
  SupportedTransactionVersions,
  TransactionOrVersionedTransaction,
  WalletAdapter,
  WalletAdapterEvents,
} from "@solana/wallet-adapter-base"
import EventEmitter from "eventemitter3"

import { defaultModel } from "@/ai/providers"
import { config } from "@/lib/config"
import prisma from "@/lib/prisma"
import { type ActionEmptyResponse, actionClient } from "@/lib/safe-action"
import { decryptPrivateKey } from "@/lib/solana/wallet-generator"
import { publicKeySchema } from "@/types/util"

// Define the schema for the agent kit input
const agentKitInputSchema = z.object({
  userId: z.string(),
  walletId: z.string(),
})

// Define the schema for the agent kit output
const agentKitOutputSchema = z.object({
  agent: z.instanceof(SolanaAgentKit),
})

// Create a custom wallet adapter that implements the WalletAdapter interface
class CustomWalletAdapter extends EventEmitter<WalletAdapterEvents> implements WalletAdapter {
  constructor(private keypair: Keypair) {
    super()
  }

  name = "Custom Wallet" as WalletName<string>
  url = "https://example.com"
  icon = "https://example.com/icon.png"
  readyState = WalletReadyState.Installed
  connecting = false
  connected = true
  supportedTransactionVersions?: SupportedTransactionVersions = new Set(["legacy", 0])

  get publicKey(): PublicKey {
    return this.keypair.publicKey
  }

  async autoConnect(): Promise<void> {
    // No-op for this implementation
  }

  async connect(): Promise<void> {
    // No-op for this implementation
  }

  async disconnect(): Promise<void> {
    // No-op for this implementation
  }

  async sendTransaction(
    transaction: TransactionOrVersionedTransaction<this["supportedTransactionVersions"]>,
    connection: Connection,
    options?: SendTransactionOptions,
  ): Promise<TransactionSignature> {
    transaction = await this.signTransaction(transaction)
    const rawTransaction = transaction.serialize()
    return await connection.sendRawTransaction(rawTransaction, options)
  }

  async signTransaction(
    transaction: TransactionOrVersionedTransaction<this["supportedTransactionVersions"]>,
  ): Promise<TransactionOrVersionedTransaction<this["supportedTransactionVersions"]>> {
    if ("version" in transaction) {
      transaction.sign([this.keypair])
    } else {
      transaction.partialSign(this.keypair)
    }
    return transaction
  }

  async signAllTransactions(
    transactions: TransactionOrVersionedTransaction<this["supportedTransactionVersions"]>[],
  ): Promise<TransactionOrVersionedTransaction<this["supportedTransactionVersions"]>[]> {
    return Promise.all(transactions.map((tx) => this.signTransaction(tx)))
  }

  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    return Uint8Array.from(this.keypair.secretKey.slice(0, 64)).map((val, idx) => val ^ message[idx])
  }
}

// Create the retrieveAgentKit action
export const retrieveAgentKit = actionClient.create(
  async (input: z.infer<typeof agentKitInputSchema>): Promise<ActionEmptyResponse> => {
    const { userId, walletId } = agentKitInputSchema.parse(input)

    try {
      // Retrieve the user and wallet from the database
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { wallets: true },
      })

      if (!user) {
        throw new Error("User not found")
      }

      const wallet = user.wallets.find((w) => w.id === walletId)

      if (!wallet) {
        throw new Error("Wallet not found")
      }

      if (!wallet.encryptedPrivateKey) {
        throw new Error("Wallet has no encrypted private key")
      }

      // Decrypt the private key
      const privateKey = await decryptPrivateKey(wallet.encryptedPrivateKey)

      if (!privateKey) {
        throw new Error("Failed to decrypt private key")
      }

      // Create the wallet adapter
      let walletAdapter: WalletAdapter

      if (wallet.walletSource === "EMBEDDED") {
        // For now, we'll use a CustomWalletAdapter for embedded wallets as well
        // In a real implementation, you'd integrate with a proper embedded wallet solution here
        const keypair = Keypair.fromSecretKey(Uint8Array.from(Buffer.from(privateKey, "hex")))
        walletAdapter = new CustomWalletAdapter(keypair)
      } else {
        const keypair = Keypair.fromSecretKey(Uint8Array.from(Buffer.from(privateKey, "hex")))
        walletAdapter = new CustomWalletAdapter(keypair)
      }

      // Create the SolanaAgentKit instance
      const agent = new SolanaAgentKit({
        rpcUrl: config.solana.rpcUrl,
        wallet: walletAdapter,
      })

      // Return the agent
      return {
        success: true,
        data: { agent },
      }
    } catch (error) {
      console.error("Error retrieving agent kit:", error)
      return {
        success: false,
        error: "Failed to retrieve agent kit",
      }
    }
  },
)

// Helper function to generate text using the agent
export async function generateAgentText(agent: SolanaAgentKit, messages: CoreMessage[], userMessage: CoreUserMessage) {
  const { response } = await generateText({
    model: defaultModel,
    messages,
    prompt: userMessage.content,
    tools: agent.tools,
  })

  return response
}

// Helper function to get the SOL balance of a wallet
export async function getSOLBalance(agent: SolanaAgentKit, publicKey: string) {
  const parsedPublicKey = publicKeySchema.parse(publicKey)
  const balance = await agent.connection.getBalance(new PublicKey(parsedPublicKey))
  return balance / 1e9 // Convert lamports to SOL
}

// Helper function to get the token balances of a wallet
export async function getTokenBalances(agent: SolanaAgentKit, publicKey: string) {
  const parsedPublicKey = publicKeySchema.parse(publicKey)
  const tokenAccounts = await agent.connection.getParsedTokenAccountsByOwner(new PublicKey(parsedPublicKey), {
    programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
  })

  return tokenAccounts.value.map((account) => ({
    mint: account.account.data.parsed.info.mint,
    amount: account.account.data.parsed.info.tokenAmount.uiAmount,
    decimals: account.account.data.parsed.info.tokenAmount.decimals,
  }))
}

// Helper function to transfer SOL
export async function transferSOL(agent: SolanaAgentKit, to: string, amount: number) {
  const parsedTo = publicKeySchema.parse(to)
  const transaction = await agent.transferSOL(new PublicKey(parsedTo), amount)
  return transaction
}

// Helper function to transfer SPL tokens
export async function transferToken(agent: SolanaAgentKit, to: string, mint: string, amount: number) {
  const parsedTo = publicKeySchema.parse(to)
  const parsedMint = publicKeySchema.parse(mint)
  const transaction = await agent.transferToken(new PublicKey(parsedTo), new PublicKey(parsedMint), amount)
  return transaction
}

