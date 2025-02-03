"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loading } from "@/components/ui/loading"

const DynamicHero = dynamic(() => import("@/components/home/hero"), { ssr: false })
const DynamicFeatures = dynamic(() => import("@/components/home/features"), { ssr: false })
const DynamicHowItWorks = dynamic(() => import("@/components/home/how-it-works"), { ssr: false })
const DynamicCTA = dynamic(() => import("@/components/home/cta"), { ssr: false })
const DynamicFAQ = dynamic(() => import("@/components/home/faq"), { ssr: false })

export function DynamicHomeSections() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <DynamicHero />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicFeatures />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicHowItWorks />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicCTA />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DynamicFAQ />
      </Suspense>
    </>
  )
}

