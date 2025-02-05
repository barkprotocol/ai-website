"use client"
import { useState } from "react"
import { SolanaPay } from "@/components/solana-pay"
import { EAPTransactionChecker } from "@/components/eap-transaction-checker"
import { ContributionLevelCard } from "@/components/contribution-level-card"

const eapFeatures = [
  "Early access to BARK AI Agent",
  "Exclusive EAP community access",
  "Priority support",
  "Influence on product roadmap",
  "Limited edition NFT",
  "Voting rights on key decisions",
]

const contributionLevels = [
  {
    name: "Supporter",
    price: 1,
    description: "Perfect for early adopters",
    features: eapFeatures.slice(0, 4),
  },
  {
    name: "Innovator",
    price: 5,
    description: "For those who want to shape the future",
    features: eapFeatures.slice(0, 5),
    highlighted: true,
  },
  {
    name: "Visionary",
    price: 10,
    description: "For true believers and power users",
    features: eapFeatures,
  },
]

export default function ContributePage() {
  const [selectedLevel, setSelectedLevel] = useState<(typeof contributionLevels)[0] | null>(null)

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Contribute to BARK AI</h1>
      <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Join our Early Access Program (EAP) and help shape the future of AI-driven trading on Solana. Your contribution
        directly supports development and grants you exclusive benefits.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {contributionLevels.map((level) => (
          <ContributionLevelCard key={level.name} {...level} onSelect={() => setSelectedLevel(level)} />
        ))}
      </div>

      {selectedLevel && (
        <div className="mt-8 p-6 bg-card rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Contribute {selectedLevel.price} SOL</h2>
          <p className="text-sm text-muted-foreground mb-4">
            You can pay with either SOL or USDC. Select your preferred token below.
          </p>
          <SolanaPay
            amount={selectedLevel.price}
            label={`BARK AI EAP - ${selectedLevel.name}`}
            message={`Contribution for ${selectedLevel.name} level`}
          />
        </div>
      )}

      <div className="mt-8 p-6 bg-card rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Verify Your Contribution</h2>
        <EAPTransactionChecker />
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Why Contribute?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your contribution goes directly towards the development of BARK AI Agent. By joining our EAP, you're not just
          getting early access - you're helping to shape the future of AI-driven trading on Solana.
        </p>
        <div className="mb-8">
          <p className="font-semibold">Fund Allocation:</p>
          <p>85% Development | 15% Community Treasury</p>
        </div>
      </div>
    </div>
  )
}

