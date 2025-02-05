"use client"

import { useState, useCallback } from "react"
import { createQR, encodeURL, type TransactionRequestURLFields } from "@solana/pay"
import { PublicKey } from "@solana/web3.js"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface SolanaPayProps {
  amount: number
  label: string
  message: string
}

const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
const RECIPIENT = new PublicKey("BARKkeAwhTuFzcLHX4DjotRsmjXQ1MshGrZbn1CUQqMo")

export function SolanaPay({ amount, label, message }: SolanaPayProps) {
  const [qr, setQr] = useState<string | null>(null)
  const [selectedToken, setSelectedToken] = useState<"SOL" | "USDC">("SOL")

  const handlePayment = useCallback(() => {
    const urlParams: TransactionRequestURLFields = {
      recipient: RECIPIENT,
      amount,
      label,
      message,
      memo: "BARK AI EAP Contribution",
    }

    if (selectedToken === "USDC") {
      urlParams.splToken = USDC_MINT
    }

    const url = encodeURL(urlParams)
    const qr = createQR(url)
    setQr(qr.toDataURL())
  }, [amount, label, message, selectedToken])

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <Select value={selectedToken} onValueChange={(value) => setSelectedToken(value as "SOL" | "USDC")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SOL">SOL</SelectItem>
            <SelectItem value="USDC">USDC</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handlePayment}>Pay with Solana</Button>
      </div>
      {qr && (
        <div className="mt-4">
          <Image src={qr || "/placeholder.svg"} alt="Solana Pay QR Code" width={250} height={250} />
        </div>
      )}
    </div>
  )
}

