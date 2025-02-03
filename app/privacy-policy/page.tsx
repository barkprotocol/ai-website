import type { Metadata } from "next"
import { sharedMetadata } from "@/components/shared-metadata"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCallback } from "react"

export const metadata: Metadata = sharedMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for the BARK AI Agent platform",
  keywords: ["privacy", "data protection", "user rights", "GDPR", "CCPA"],
})

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  // Function to handle printing of the policy
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
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {currentDate}</p>
        <h2 id="introduction">1. Introduction</h2>
        <p>
          BARK AI Agent ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you use our website and services.
        </p>

        <h2 id="information-we-collect">2. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you:</p>
        <ul>
          <li>Create an account</li>
          <li>Use our services</li>
          <li>Communicate with us</li>
        </ul>
        <p>This may include:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Wallet address</li>
          <li>Trading preferences</li>
          <li>Transaction data</li>
        </ul>

        <h2 id="how-we-use-info">3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Send technical notices, updates, security alerts, and support messages</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Personalize and improve your experience</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
          <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 id="information-sharing">4. Information Sharing and Disclosure</h2>
        <p>
          We do not share your personal information with third parties except as described in this policy or with your
          consent. We may share your information with:
        </p>
        <ul>
          <li>Service providers who perform services on our behalf</li>
          <li>Financial institutions with which we partner</li>
          <li>Legal and regulatory authorities, as required by applicable laws</li>
        </ul>

        <h2 id="data-security">5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against
          unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of
          transmission over the Internet or electronic storage is 100% secure.
        </p>

        <h2 id="your-rights">6. Your Rights and Choices</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
        <ul>
          <li>The right to access your personal information</li>
          <li>The right to rectify inaccurate personal information</li>
          <li>The right to request deletion of your personal information</li>
          <li>The right to restrict processing of your personal information</li>
          <li>The right to data portability</li>
        </ul>

        <h2 id="policy-changes">7. Changes to this Policy</h2>
        <p>
          We may change this privacy policy from time to time. If we make significant changes, we will notify you by
          email or through our website.
        </p>

        <h2 id="contact-us">8. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us at{" "}
          <a href="mailto:privacy@barkprotocol.com" className="text-primary hover:underline">
            privacy@barkprotocol.com
          </a>
          .
        </p>
      </div>
      <div className="mt-8 text-center">
        <Button
          onClick={handlePrint}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-colors"
          aria-label="Print Privacy Policy"
        >
          Print Privacy Policy
        </Button>
      </div>
    </div>
  )
}

