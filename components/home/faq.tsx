"use client";

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const FAQ = () => {
  const faqs = useMemo(
    () => [
      {
        question: "What is BARK AI Agent?",
        answer:
          "BARK AI Agent is an advanced AI-powered platform designed to optimize your trading experience on the Solana blockchain. It provides smart trading strategies, real-time market analysis, and seamless DeFi interactions.",
      },
      {
        question: "How does BARK AI improve my trading?",
        answer:
          "BARK AI leverages machine learning to analyze market trends, predict opportunities, and execute trades efficiently. It helps optimize portfolios and manage risks with data-driven decisions.",
      },
      {
        question: "Is BARK AI secure?",
        answer:
          "Yes. BARK AI Agent employs encryption, multi-factor authentication, and cold storage options to secure your assets. Always follow best practices and never share private keys.",
      },
      {
        question: "Can I use BARK AI with other blockchains?",
        answer:
          "BARK AI is currently optimized for Solana, but we are expanding cross-chain compatibility. Stay tuned for updates on additional blockchain support.",
      },
      {
        question: "How do I get started?",
        answer:
          "Sign up, connect your Solana wallet, and follow the onboarding process. Customize your AI agent and explore trading features tailored to your strategy.",
      },
    ],
    [],
  )

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleQuestion = useCallback((index: number) => setActiveIndex((prev) => (prev === index ? null : index)), [])

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      toggleQuestion(index)
    }
  }

  return (
    <section className="py-16 bg-background" aria-labelledby="faq-title">
      <div className="container mx-auto px-4">
        <h2 id="faq-title" className="text-3xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Learn how BARK AI Agent enhances your trading experience.
        </p>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex justify-between items-center w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => toggleQuestion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
                aria-label={`${faq.question} (Click to ${activeIndex === index ? "close" : "open"})`}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`transition-transform ${activeIndex === index ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mt-2 text-muted-foreground"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

