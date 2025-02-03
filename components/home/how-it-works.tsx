"use client";

import { useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Bot, BarChart, Zap, Shield, Coins, Users, Link } from "lucide-react"
import { IntegrationCard } from "@/components/ui/integration-card"
import type React from "react"

interface Section {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  imageUrl: string
  blurDataUrl?: string
}

const sections: Section[] = [
  {
    title: "Connect Your Wallet",
    description:
      "Start by connecting your Solana wallet to access BARK AI Agent features and participate in the ecosystem.",
    icon: Coins,
    imageUrl: "/placeholder.svg?height=400&width=600",
    blurDataUrl: "/placeholder-blur.svg",
  },
  {
    title: "DeFi Protocol Integration",
    description:
      "Seamlessly integrate with leading Solana protocols like Helius, Jupiter, Magic Eden, and more for comprehensive DeFi functionality.",
    icon: Link,
    imageUrl: "/placeholder.svg?height=400&width=600",
    blurDataUrl: "/placeholder-blur.svg",
  },
  {
    title: "AI-Powered Trading",
    description:
      "Leverage advanced AI algorithms for smart, automated trading strategies tailored to your preferences and risk tolerance.",
    icon: Bot,
    imageUrl: "/placeholder.svg?height=400&width=600",
    blurDataUrl: "/placeholder-blur.svg",
  },
  {
    title: "Real-Time Market Analysis",
    description:
      "Access instant insights with our real-time market analysis tools, helping you make informed decisions in the fast-paced crypto market.",
    icon: BarChart,
    imageUrl: "/placeholder.svg?height=400&width=600",
    blurDataUrl: "/placeholder-blur.svg",
  },
  {
    title: "Lightning-Fast Transactions",
    description:
      "Execute trades with unprecedented speed using our optimized transaction processing system built on Solana.",
    icon: Zap,
    imageUrl: "/placeholder.svg?height=400&width=600",
    blurDataUrl: "/placeholder-blur.svg",
  },
  {
    title: "Enhanced Security",
    description:
      "Benefit from state-of-the-art security measures, including multi-factor authentication and cold storage options for your assets.",
    icon: Shield,
    imageUrl: "/placeholder.svg?height=400&width=600",
    blurDataUrl: "/placeholder-blur.svg",
  },
  {
    title: "Community Insights",
    description:
      "Gain valuable insights from our community of traders and analysts, and participate in collaborative decision-making.",
    icon: Users,
    imageUrl: "/placeholder.svg?height=400&width=600",
    blurDataUrl: "/placeholder-blur.svg",
  },
]

export default function HowItWorks() {
  const [activeSection, setActiveSection] = useState<number>(0)
  const [imageLoading, setImageLoading] = useState(true)

  const handleSectionClick = useCallback((index: number) => {
    setActiveSection(index)
    setImageLoading(true)
  }, [])

  return (
    <section className="py-16 bg-background" aria-labelledby="how-it-works-title">
      <div className="container mx-auto px-4">
        <h2 id="how-it-works-title" className="text-3xl font-bold mb-4 text-center text-primary">
          How BARK AI Agent Works
        </h2>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          Discover how BARK AI Agent revolutionizes your trading experience with cutting-edge AI and blockchain
          technology.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-2 lg:col-span-1">
            {sections.map((section, index) => (
              <motion.button
                key={section.title}
                initial={false}
                animate={{
                  backgroundColor: activeSection === index ? "hsl(var(--primary))" : "transparent",
                  color: activeSection === index ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                }}
                className={cn(
                  "w-full text-left transition-all duration-200 p-3 rounded-lg",
                  "hover:bg-primary/10 hover:text-[#dbcfc7]",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  activeSection === index ? "selection:bg-white selection:text-white" : "",
                )}
                onClick={() => handleSectionClick(index)}
                aria-pressed={activeSection === index}
              >
                <div className="flex items-center space-x-3">
                  <section.icon
                    className={`w-5 h-5 ${activeSection === index ? "text-primary-foreground" : "text-[#dbcfc7]"}`}
                    aria-hidden="true"
                  />
                  <h3 className={`text-base font-semibold ${activeSection === index ? "text-primary-foreground" : ""}`}>
                    {section.title}
                  </h3>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="bg-card p-4 rounded-lg shadow-lg lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-primary">{sections[activeSection].title}</h3>
                <p className="text-sm text-muted-foreground">{sections[activeSection].description}</p>
                {activeSection === 1 ? (
                  <IntegrationCard />
                ) : (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={sections[activeSection].imageUrl || "/placeholder.svg"}
                      alt={`Illustration for ${sections[activeSection].title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={cn(
                        "object-cover transition-opacity duration-300",
                        imageLoading ? "opacity-0" : "opacity-100",
                      )}
                      priority
                      placeholder="blur"
                      blurDataURL={sections[activeSection].blurDataUrl}
                      onLoad={() => setImageLoading(false)}
                    />
                    {imageLoading && (
                      <div className="absolute inset-0 bg-muted animate-pulse" aria-hidden="true">
                        <span className="sr-only">Loading image...</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

