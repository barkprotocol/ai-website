"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Loading } from "@/components/ui/loading"

const DynamicSolanaPayWrapper = dynamic(() => import("@/components/solana-pay-wrapper"), { ssr: false })
const DynamicEAPTransactionCheckerWrapper = dynamic(() => import("@/components/eap-transaction-checker-wrapper"), {
  ssr: false,
})

interface DynamicContributeSectionsProps {
  amount: number
  label: string
}

export function DynamicContributeSections({ amount, label }: DynamicContributeSectionsProps) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <DynamicSolanaPayWrapper amount={amount} label={label} />
      </Suspense>
      <div className="mt-8 p-6 bg-card rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Verify Your Contribution</h2>
        <Suspense fallback={<Loading />}>
          <DynamicEAPTransactionCheckerWrapper />
        </Suspense>
      </div>
    </>
  )
}

