import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, BarChart2, Zap, Shield, Coins, Users, Heart, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "AI Agents | BARK AI Agent",
  description:
    "Explore our advanced AI agents for optimized trading strategies, crowdfunding, charity, and disaster relief on Solana",
}

const agents = [
  {
    name: "TradeMaster",
    description: "Advanced trading algorithm for optimal entry and exit points",
    icon: Bot,
    features: ["Pattern recognition", "Risk management", "Multi-timeframe analysis"],
  },
  {
    name: "MarketSense",
    description: "Real-time market analysis and sentiment tracking",
    icon: BarChart2,
    features: ["Social media sentiment analysis", "News impact assessment", "Trend prediction"],
  },
  {
    name: "SwiftExecute",
    description: "High-frequency trading bot for Solana-based DEXes",
    icon: Zap,
    features: ["Microsecond latency", "Arbitrage opportunities", "Liquidity provision"],
  },
  {
    name: "GuardianAI",
    description: "Risk management and portfolio protection agent",
    icon: Shield,
    features: ["Stop-loss automation", "Diversification strategies", "Volatility management"],
  },
  {
    name: "YieldHarvester",
    description: "DeFi yield optimization across Solana ecosystem",
    icon: Coins,
    features: ["Yield farming", "Liquidity pool analysis", "Auto-compounding"],
  },
  {
    name: "CrowdFundGenius",
    description: "AI-powered crowdfunding optimization and management",
    icon: Users,
    features: ["Campaign strategy optimization", "Donor engagement analysis", "Predictive funding models"],
  },
  {
    name: "CharityChampion",
    description: "Intelligent charity fund allocation and impact assessment",
    icon: Heart,
    features: ["Cause prioritization", "Donation impact tracking", "Transparency reporting"],
  },
  {
    name: "DisasterRelief",
    description: "Rapid response and resource allocation for disaster situations",
    icon: AlertTriangle,
    features: ["Real-time needs assessment", "Resource optimization", "Coordination with relief agencies"],
  },
]

export default function AIAgentsPage() {
  return (
    <div className={cn("container mx-auto px-4 py-16")}>
      <h1 className="text-4xl font-bold mb-8 text-center">AI Agents</h1>
      <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
        Our AI agents are designed to provide you with advanced trading strategies and market insights. Each agent
        specializes in different aspects of cryptocurrency trading and analysis on the Solana blockchain.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
        {agents.map((agent) => (
          <Card
            key={agent.name}
            className="flex flex-col hover:shadow-lg transition-shadow duration-300"
            role="listitem"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{agent.name}</CardTitle>
                <agent.icon className="h-8 w-8 text-[#dcd7cc]" aria-label={`${agent.name} icon`} />
              </div>
              <CardDescription>{agent.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="space-y-2" role="list">
                {agent.features.map((feature, index) => (
                  <li key={index} className="flex items-center" role="listitem">
                    <Badge variant="secondary" className="mr-2">
                      {index + 1}
                    </Badge>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Supercharge Your Trading?</h2>
        <p className="text-xl mb-8">
          Experience the power of our AI agents and take your Solana trading to the next level.
        </p>
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/dashboard">Try AI Agents Now</Link>
        </Button>
      </div>
    </div>
  )
}

