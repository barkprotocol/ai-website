"use client"

import { useState } from "react"
import { SolanaPay } from "@/components/solana-pay"
import { Button } from "@/components/ui/button"

interface SolanaPayWrapperProps {
  amount: number
  label: string
}

export default function SolanaPayWrapper({ amount, label }: SolanaPayWrapperProps) {
  const [showPay, setShowPay] = useState(false)

  if (!showPay) {
    return <Button onClick={() => setShowPay(true)}>Choose {label.split(" - ")[1]}</Button>
  }

  return <SolanaPay amount={amount} label={label} message={`Contribution for ${label.split(" - ")[1]} level`} />
}

