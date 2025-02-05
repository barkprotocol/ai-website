"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

interface ContributionLevelCardProps {
  name: string
  price: number
  description: string
  features: string[]
  highlighted?: boolean
  onSelect: () => void
}

export function ContributionLevelCard({
  name,
  price,
  description,
  features,
  highlighted,
  onSelect,
}: ContributionLevelCardProps) {
  return (
    <Card
      className={`flex flex-col ${
        highlighted
          ? "border-primary shadow-xl hover:shadow-2xl transition-shadow duration-300"
          : "shadow-md hover:shadow-lg transition-shadow duration-300"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-4xl font-bold mb-4">{price} SOL</div>
        <ul className="space-y-2" aria-label={`${name} features`}>
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="text-[#dcd7cc] mr-2" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={highlighted ? "default" : "outline"} onClick={onSelect}>
          Choose {name}
        </Button>
      </CardFooter>
    </Card>
  )
}

