import type { Metadata } from "next"
import { sharedMetadata } from "@/components/shared-metadata"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCallback } from "react"

export const metadata: Metadata = sharedMetadata({
  title: "Terms of Use",
  description: "Terms of Use for the BARK AI Agent platform",
  keywords: ["legal", "terms", "conditions"],
})

export default function TermsOfUsePage() {
  const currentDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <nav className="mb-8">
        <Link href="/" className="text-primary hover:underline" aria-label="Go back to home page">
          ← Back to Home
        </Link>
      </nav>
      <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {currentDate}</p>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the BARK AI Agent platform, you agree to be bound by these Terms of Use. If you do not
          agree to these terms, please do not use our services.
        </p>
        <h2>2. Description of Service</h2>
        <p>
          BARK AI Agent provides AI-powered trading assistance and analysis for the Solana blockchain. Our services
          include but are not limited to AI-driven trading strategies, real-time market analysis, and DeFi integrations.
        </p>
        <h2>3. User Obligations</h2>
        <p>
          Users are responsible for maintaining the confidentiality of their account information and for all activities
          that occur under their account. Users must comply with all applicable laws and regulations.
        </p>
        <h2>4. Intellectual Property</h2>
        <p>
          All content and functionality on the BARK AI Agent platform is the exclusive property of BARK Protocol and is
          protected by copyright, trademark, and other intellectual property laws.
        </p>
        <h2>5. Limitation of Liability</h2>
        <p>
          BARK AI Agent and its affiliates shall not be liable for any indirect, incidental, special, consequential or
          punitive damages resulting from your use of or inability to use the service.
        </p>
        <h2>6. Modifications to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Use at any time. If we make significant changes, we will notify
          you via email or through a notification on the platform. Your continued use of the platform after such changes
          constitutes your acceptance of the new Terms of Use.
        </p>
        <h2>7. Governing Law</h2>
        <p>
          These Terms of Use shall be governed by and construed in accordance with the laws of the jurisdiction in which
          BARK Protocol is registered, without regard to its conflict of law provisions.
        </p>
        <h2>8. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Use, please contact us at{" "}
          <a href="mailto:legal@barkprotocol.com" className="text-primary hover:underline">
            legal@barkprotocol.com
          </a>
          .
        </p>
      </div>
      <div className="mt-8 text-center">
        <Button
          onClick={handlePrint}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-colors"
          aria-label="Print the Terms of Use document"
        >
          Print Terms of Use
        </Button>
      </div>
    </div>
  )
}

