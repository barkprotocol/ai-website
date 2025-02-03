"use client"

import { Suspense, type ReactNode } from "react"
import dynamic from "next/dynamic"

const DynamicWalletProviders = dynamic(() => import("@/components/wallet-providers"), {
  ssr: false,
})

const DynamicWalletButton = dynamic(() => import("@/components/ui/wallet-button").then((mod) => mod.WalletButton), {
  ssr: false,
  loading: () => <div>Loading wallet...</div>,
})

export function DynamicProviders({ children }: { children: ReactNode }) {
  return (
    <DynamicWalletProviders>
      <Suspense fallback={<div>Loading wallet...</div>}>
        <DynamicWalletButton />
      </Suspense>
      {children}
    </DynamicWalletProviders>
  )
}

