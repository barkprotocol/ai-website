import type { Connection, PublicKey } from "@solana/web3.js"
import {
  type Dialect,
  DialectSdk,
  type DialectSdkInfo,
  ThreadMemberScope,
  type EncryptionKeysProvider,
  NodeDialectWalletAdapter,
} from "@dialectlabs/sdk"

async function createDialectClient(
  connection: Connection,
  wallet: any, // Replace 'any' with the actual wallet type you're using
  environment: "development" | "production" = "development",
): Promise<Dialect> {
  const config: DialectSdkInfo = {
    environment,
  }

  const encryptionKeysProvider: EncryptionKeysProvider = {
    publicKey: wallet.publicKey,
    signMessage: wallet.signMessage,
  }

  const dialectWalletAdapter = new NodeDialectWalletAdapter(wallet)

  return await DialectSdk.initialize({
    wallet: dialectWalletAdapter,
    encryptionKeysProvider,
    config,
  })
}

async function createThread(dialect: Dialect, recipients: PublicKey[], name: string): Promise<string> {
  const thread = await dialect.threads.create({
    encrypted: true,
    recipients: recipients.map((recipient) => ({
      publicKey: recipient,
      scopes: [ThreadMemberScope.ADMIN],
    })),
    name,
  })

  return thread.id
}

async function sendMessage(dialect: Dialect, threadId: string, content: string): Promise<void> {
  await dialect.messages.send({
    threadId,
    content,
  })
}

async function getMessages(dialect: Dialect, threadId: string, limit = 50): Promise<any[]> {
  const messages = await dialect.messages.list({
    threadId,
    limit,
  })

  return messages
}

async function subscribeToThread(
  dialect: Dialect,
  threadId: string,
  callback: (message: any) => void,
): Promise<() => void> {
  const subscription = await dialect.messages.subscribeToThread({
    threadId,
    callback,
  })

  return () => subscription.unsubscribe()
}

export { createDialectClient, createThread, sendMessage, getMessages, subscribeToThread }

