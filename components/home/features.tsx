"use client"

import { Bot, BarChart3, Link, HeartHandshake, MessageSquare, Vote } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "AI-Powered Trading",
    description: "Leverage advanced machine learning algorithms to optimize your trading strategies on Solana.",
    icon: Bot,
  },
  {
    title: "Real-Time Market Analysis",
    description: "Access instant insights and analytics on Solana tokens, NFTs, and DeFi protocols.",
    icon: BarChart3,
  },
  {
    title: "DeFi Protocol Integration",
    description: "Seamlessly interact with popular Solana DeFi protocols like Raydium, Jupiter, and Meteora.",
    icon: Link,
  },
  {
    title: "AI-Driven Crowdfunding",
    description: "Utilize AI to optimize fundraising campaigns for charitable causes and social initiatives.",
    icon: HeartHandshake,
  },
  {
    title: "Intelligent Chatbot Assistant",
    description: "Get 24/7 support and guidance on Solana ecosystem topics from our AI-powered chatbot.",
    icon: MessageSquare,
  },
  {
    title: "Decentralized Governance",
    description: "Participate in shaping BARK Protocol's future through community-driven proposal voting.",
    icon: Vote,
  },
]

export default function Features() {
  const { theme } = useTheme()

  return (
    <section className="py-16 bg-background" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        <h2 id="features-heading" className="text-3xl font-bold mb-4 text-center">
          BARK AI Agent Features
        </h2>
        <p className="text-lg text-center text-gray-700 mb-8 max-w-2xl mx-auto">
          Discover how BARK AI Agent revolutionizes your Solana trading and DeFi experience with these cutting-edge
          features
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={cn(
                "bg-card p-4 sm:p-6 rounded-lg shadow-lg",
                "focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50",
                "transition-all duration-200 hover:shadow-xl",
                "flex flex-col items-start",
              )}
              tabIndex={0}
            >
              <feature.icon
                className={cn(
                  "h-8 w-8 sm:h-10 sm:w-10 mb-3 sm:mb-4",
                  "text-[#dcd7cc] dark:text-[#4a4a4a]",
                  "transition-colors duration-200",
                  "group-hover:text-primary dark:group-hover:text-primary-dark",
                )}
                aria-hidden="true"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

