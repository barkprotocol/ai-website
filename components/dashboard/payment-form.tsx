import { useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { createSolanaPayTransaction } from "@/lib/solana-pay"
import Image from "next/image"
import { PublicKey } from "@solana/web3.js"

const CURRENCY_ICONS = {
  SOL: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
  USDC: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
  BARK: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg/logo.png",
}

export function PaymentForm() {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<"SOL" | "USDC" | "BARK">("SOL")
  const { connection } = useConnection()
  const wallet = useWallet()

  const handlePayment = async () => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      toast.error("Please connect your wallet")
      return
    }

    try {
      const transaction = await createSolanaPayTransaction(
        connection,
        wallet.publicKey,
        new PublicKey(process.env.NEXT_PUBLIC_RECEIVER_WALLET_ADDRESS!),
        Number.parseFloat(amount),
        currency,
      )

      const signedTransaction = await wallet.signTransaction(transaction)
      const signature = await connection.sendRawTransaction(signedTransaction.serialize())
      await connection.confirmTransaction(signature)

      toast.success("Payment successful!")
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Payment failed. Please try again.")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="flex-grow"
        />
        <Select value={currency} onValueChange={(value) => setCurrency(value as "SOL" | "USDC" | "BARK")}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(CURRENCY_ICONS).map(([key, iconUrl]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center">
                  <Image src={iconUrl || "/placeholder.svg"} alt={key} width={20} height={20} className="mr-2" />
                  {key}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handlePayment} className="w-full">
        Pay with Solana
      </Button>
    </div>
  )
}

