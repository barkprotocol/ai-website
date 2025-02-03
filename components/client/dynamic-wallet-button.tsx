"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

const DynamicWalletButton = dynamic(() => import("@/components/ui/wallet-button").then((mod) => mod.WalletButton), {
  ssr: false,
  loading: () => <div>Loading wallet...</div>,
})

export function ClientDynamicWalletButton() {
  return (
    <Suspense fallback={<div>Loading wallet...</div>}>
      <DynamicWalletButton />
    </Suspense>
  )
}

