import { type Connection, PublicKey as SolanaPublicKey } from "@solana/web3.js"
import {
  createUmi,
  generateSigner,
  signerIdentity,
  transactionBuilder,
  type PublicKey as UmiPublicKey,
} from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata, TokenStandard, fetchDigitalAsset } from "@metaplex-foundation/mpl-token-metadata"
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr"
import { createSignerFromWallet } from "@metaplex-foundation/umi-signer-wallet-adapters"
import { percentAmount } from "@metaplex-foundation/umi"
import type { Wallet } from "@coral-xyz/anchor"

async function createUmiInstance(connection: Connection, wallet: Wallet) {
  const umi = createUmi(connection.rpcEndpoint).use(mplTokenMetadata()).use(createBundlrUploader())

  const signer = createSignerFromWallet(wallet)
  umi.use(signerIdentity(signer))

  return umi
}

async function uploadMetadata(
  umi: ReturnType<typeof createUmi>,
  name: string,
  description: string,
  imageBuffer: Buffer,
): Promise<string> {
  const [imageUri] = await umi.uploader.upload([imageBuffer])
  const metadata = {
    name,
    description,
    image: imageUri,
  }
  const [metadataUri] = await umi.uploader.upload([JSON.stringify(metadata)])
  return metadataUri
}

async function mintNFT(
  umi: ReturnType<typeof createUmi>,
  name: string,
  description: string,
  imageBuffer: Buffer,
): Promise<UmiPublicKey> {
  const uri = await uploadMetadata(umi, name, description, imageBuffer)
  const mint = generateSigner(umi)

  const tx = createNft(umi, {
    mint,
    name,
    uri,
    sellerFeeBasisPoints: percentAmount(5, 2), // 5% royalty
    tokenStandard: TokenStandard.NonFungible,
  })

  const result = await tx.sendAndConfirm(umi)
  if (result.result.value.err) {
    throw new Error(`Failed to mint NFT: ${JSON.stringify(result.result.value.err)}`)
  }

  return mint.publicKey
}

interface NFTMetadata {
  name: string
  description: string
  image: string
  [key: string]: unknown
}

async function getNFTMetadata(umi: ReturnType<typeof createUmi>, mintAddress: UmiPublicKey): Promise<NFTMetadata> {
  const nft = await fetchDigitalAsset(umi, mintAddress)
  if (!nft.metadata.uri) {
    throw new Error("NFT metadata URI not found")
  }
  const response = await fetch(nft.metadata.uri)
  const data = await response.json()
  return data as NFTMetadata
}

async function updateNFTMetadata(
  umi: ReturnType<typeof createUmi>,
  mintAddress: UmiPublicKey,
  newName: string,
  newDescription: string,
): Promise<void> {
  const nft = await fetchDigitalAsset(umi, mintAddress)
  if (!nft.metadata.uri) {
    throw new Error("NFT metadata URI not found")
  }

  const currentMetadata = await getNFTMetadata(umi, mintAddress)
  const updatedMetadata: NFTMetadata = {
    ...currentMetadata,
    name: newName,
    description: newDescription,
  }

  const [newUri] = await umi.uploader.upload([JSON.stringify(updatedMetadata)])

  const tx = transactionBuilder().add(
    mplTokenMetadata().updateV1(umi, {
      mint: mintAddress,
      name: newName,
      uri: newUri,
    }),
  )

  await tx.sendAndConfirm(umi)
}

// Helper function to convert Solana PublicKey to Umi PublicKey
function solanaToUmiPublicKey(publicKey: SolanaPublicKey): UmiPublicKey {
  return publicKey.toBase58() as UmiPublicKey
}

// Helper function to convert Umi PublicKey to Solana PublicKey
function umiToSolanaPublicKey(publicKey: UmiPublicKey): SolanaPublicKey {
  return new SolanaPublicKey(publicKey)
}

export {
  createUmiInstance as createMetaplex,
  mintNFT,
  getNFTMetadata,
  updateNFTMetadata,
  solanaToUmiPublicKey,
  umiToSolanaPublicKey,
}

