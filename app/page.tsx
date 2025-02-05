"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/home/hero"
import Features from "@/components/home/features"
import HowItWorks from "@/components/home/how-it-works"
import CTA from "@/components/home/cta"
import FAQ from "@/components/home/faq"
import { Loading } from "@/components/ui/loading"
import { useAuth } from "@/hooks/use-auth"

export default function HomePage() {
  const { isLoading, error } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <FAQ />
    </div>
  )
}

