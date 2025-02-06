"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const faqs = [
  {
    question: "What is BARK AI Agent?",
    answer:
      "BARK AI Agent is an advanced AI-powered assistant designed specifically for the Solana blockchain ecosystem. It helps users interact with various Solana protocols, manage their assets, and stay informed about the latest developments in the Solana network.",
  },
  {
    question: "How does the Early Access Program work?",
    answer:
      "The Early Access Program allows a limited number of users to try BARK AI Agent before its public release. Participants get exclusive access to features, can provide feedback, and help shape the future of the product.",
  },
  {
    question: "What features are available in the Early Access Program?",
    answer:
      "Early Access participants can use BARK AI Agent for portfolio management, real-time market data analysis, automated trading strategies, and seamless interaction with Solana DeFi protocols.",
  },
  {
    question: "How can I join the Early Access Program?",
    answer:
      "To join the Early Access Program, you need to sign up on our website and complete the application process. We'll review your application and notify you if you're selected to participate.",
  },
  {
    question: "Is my data safe with BARK AI Agent?",
    answer:
      "Yes, we take data security very seriously. BARK AI Agent uses state-of-the-art encryption and security measures to protect your data and transactions. We never store or have access to your private keys.",
  },
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find answers to common questions about BARK AI Agent and our Early Access Program</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
