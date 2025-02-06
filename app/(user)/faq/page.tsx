"use client"

import { EAPTransactionChecker } from "@/components/eap-transaction-checker"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"
import type React from "react"

interface FaqItem {
  id: string
  question: string
  answer: string | React.ReactNode
}

const faqItems: FaqItem[] = [
  {
    id: "item-1",
    question: "I paid for Early Access Program, but still not showing up?",
    answer: (
      <div className="space-y-4">
        <span>
          It usually takes 5~30 seconds for the EAP to be granted to your account.
          <br />
          If the EAP is not granted, please paste your transaction hash into the transaction checker below.
        </span>
        <EAPTransactionChecker />
      </div>
    ),
  },
  {
    id: "item-2",
    question: "Can I export my embedded wallet?",
    answer: (
      <div className="space-y-4">
        <span>
          Unfortunately, to ensure a maximum level of security, we currently do not support exporting your embedded
          wallet.
          <br />
          We will be integrating with famous Embedded Wallet providers soon so you can have absolute control over your
          wallet.
        </span>
      </div>
    ),
  },
  {
    id: "item-3",
    question: "How can I become EAP Verified in Discord?",
    answer: (
      <div className="space-y-4">
        <span>
          On the bottom left, tap your wallet, then tap `Account`. Next, you should see a `Connect` button next to
          Discord. Tap on that and connect to the Discord server.
          <br />
          Once that is completed, you should now be `EAP VERIFIED` and see custom Discord channels for EAP users. Your
          name will also be color differentiated from other users.
        </span>
      </div>
    ),
  },
]

export const metadata: Metadata = {
  title: "FAQ | BARK AI Agent",
  description: "Frequently asked questions about BARK AI Agent and Early Access Program",
}

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="bg-card rounded-lg border border-border/40 px-4">
              <AccordionTrigger className="text-lg py-4 hover:no-underline">{item.question}</AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Can't find what you're looking for?{" "}
            <a
              href="https://discord.gg/barkprotocol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Join our Discord
            </a>{" "}
            for more support.
          </p>
        </div>
      </div>
    </div>
  )
}

