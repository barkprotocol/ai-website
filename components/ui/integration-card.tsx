"use client"

import type React from "react"
import { forwardRef, useRef } from "react"
import Image from "next/image"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { cn } from "@/lib/utils"

interface Integration {
  name: string
  icon: string
  description: string
}

const integrations: Integration[] = [
  {
    name: "Jupiter",
    icon: "https://ucarecdn.com/80fffad0-0b23-4004-b942-a7ac8b20462d/jupiteragjuplogo.svg",
    description: "Best-in-class Solana DEX aggregator",
  },
  {
    name: "Orca",
    icon: "https://ucarecdn.com/20144fb1-9521-4813-b025-0dd8ab0689d5/orcaorcalogo.svg",
    description: "Leading concentrated liquidity DEX on Solana",
  },
  {
    name: "DexScreener",
    icon: "https://ucarecdn.com/43a0c33f-bb25-46a1-a2a1-e81b3ac91f54/dexscreener.png",
    description: "Real-time DEX trading data and analytics",
  },
  {
    name: "Birdeye",
    icon: "https://ucarecdn.com/7012a8a5-cded-4837-9057-6cbcdf4cb350/birdeye.png",
    description: "Comprehensive Solana analytics platform",
  },
  {
    name: "Raydium",
    icon: "https://ucarecdn.com/1f97ba42-b199-4a36-a545-aa653333b2f7/raydium.png",
    description: "Premier AMM and liquidity provider on Solana",
  },
  {
    name: "Pump.fun",
    icon: "https://ucarecdn.com/e2f52364-b75b-4588-b3aa-c9c97989124f/pumpfun.jpeg",
    description: "Fair-launch token platform on Solana",
  },
  {
    name: "OpenBook",
    icon: "https://ucarecdn.com/eafc9123-e16b-4ff3-9e3c-4865eb026b30/openbook.ico",
    description: "Decentralized order book protocol",
  },
]

const Circle = forwardRef<
  HTMLDivElement,
  {
    className?: string
    children?: React.ReactNode
    integration: Integration
  }
>(({ className, children, integration }, ref) => {
  return (
    <div className="group relative">
      <div
        ref={ref}
        className={cn(
          "relative z-10 flex size-14 items-center justify-center rounded-full",
          "border-2 border-[#dbcfc7]/20 bg-white/95 p-3",
          "shadow-[0_0_15px_-3px_rgba(219,207,199,0.3)]",
          "transition-all duration-300 ease-in-out",
          "hover:border-[#dbcfc7]/40 hover:shadow-[0_0_20px_-3px_rgba(219,207,199,0.5)]",
          className,
        )}
        role="img"
        aria-label={`${integration.name} integration`}
      >
        {children}
      </div>
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100"
        role="tooltip"
      >
        <div className="relative rounded bg-black/90 px-3 py-2 text-center text-xs text-white">
          <div className="font-medium">{integration.name}</div>
          <div className="text-[10px] text-gray-400">{integration.description}</div>
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black/90"></div>
        </div>
      </div>
    </div>
  )
})

Circle.displayName = "Circle"

export function IntegrationCard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const circleRefs = useRef<(HTMLDivElement | null)[]>([])

  return (
    <div
      className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-white to-gray-50 p-10 dark:from-gray-900 dark:to-black"
      ref={containerRef}
    >
      {/* Center BARK Logo */}
      <div ref={centerRef} className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="flex size-20 items-center justify-center rounded-full border-2 border-[#dbcfc7]/30 bg-white/95 p-4 shadow-[0_0_30px_-6px_rgba(219,207,199,0.5)]">
          <Image
            src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
            alt="BARK"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Integration Circles */}
      <div className="relative size-full">
        {integrations.map((integration, index) => {
          const angle = (index * (2 * Math.PI)) / integrations.length
          const radius = 160 // Adjust this value to change the circle size
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <div
              key={integration.name}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <Circle ref={(el) => (circleRefs.current[index] = el)} integration={integration}>
                <Image
                  src={integration.icon || "/placeholder.svg"}
                  alt={`${integration.name} icon`}
                  width={32}
                  height={32}
                  className="size-8 object-contain"
                />
              </Circle>
            </div>
          )
        })}
      </div>

      {/* Animated Beams */}
      {circleRefs.current.map((ref, index) => {
        if (!ref) return null
        return (
          <AnimatedBeam
            key={index}
            containerRef={containerRef}
            fromRef={{ current: ref }}
            toRef={centerRef}
            curvature={15}
            reverse={index % 2 === 0}
          />
        )
      })}
    </div>
  )
}

