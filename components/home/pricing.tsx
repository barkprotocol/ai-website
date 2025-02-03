import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

const features = [
  "Early access to BARK AI Agent",
  "Exclusive EAP community access",
  "Priority support",
  "Influence on product roadmap",
  "Limited edition NFT",
]

export default function Pricing() {
  return (
    <section className="py-16 bg-background" id="pricing" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-4">
        <h2 id="pricing-heading" className="text-3xl font-bold text-center mb-4">
          Early Access Program
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-8">
          Join our exclusive EAP and shape the future of BARK AI
        </p>

        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">EAP Membership</CardTitle>
            <CardDescription>Get early access and exclusive benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">1 SOL</div>
            <ul className="space-y-2" aria-label="Membership features">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="text-green-500 mr-2" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Button className="w-full mb-4">Join EAP Now</Button>
            <p className="text-sm text-muted-foreground">100% of funds used for development</p>
            <p className="text-sm text-muted-foreground">15% allocated to community treasury</p>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

