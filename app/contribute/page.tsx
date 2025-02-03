import type { Metadata } from "next"
import { sharedMetadata } from "@/components/shared-metadata"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Check } from "lucide-react"
import { DynamicContributeSections } from "@/components/contribute/dynamic-contribute-sections"

export const metadata: Metadata = sharedMetadata({
  title: "Contribute | BARK AI Agent",
  description: "Join our Early Access Program and shape the future of AI-driven trading on Solana",
})

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
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Contribute to BARK AI</h1>
      <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Join our Early Access Program (EAP) and help shape the future of AI-driven trading on Solana. Your contribution
        directly supports development and grants you exclusive benefits.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {contributionLevels.map((level) => (
          <Card
            key={level.name}
            className={`flex flex-col ${level.highlighted ? "border-primary shadow-xl" : "shadow-md"}`}
          >
            <CardHeader>
              <CardTitle className="text-2xl">{level.name}</CardTitle>
              <CardDescription>{level.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-4xl font-bold mb-4">{level.price} SOL</div>
              <ul className="space-y-2" aria-label={`${level.name} features`}>
                {level.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="text-[#dcd7cc] mr-2" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <DynamicContributeSections amount={level.price} label={`BARK AI EAP - ${level.name}`} />
            </CardFooter>
          </Card>
        ))}
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

