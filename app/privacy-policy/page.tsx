import type { Metadata } from "next"
import { sharedMetadata } from "@/components/shared-metadata"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = sharedMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for the BARK AI Agent platform",
  keywords: ["privacy", "data protection", "user rights", "GDPR", "CCPA"],
})

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

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
        <h2>1. Introduction</h2>
        <p>
          BARK AI Agent ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you use our website and services.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create an account or use our services.
        </p>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services.</p>

        <h2>4. Information Sharing and Disclosure</h2>
        <p>
          We do not share your personal information with third parties except as described in this policy or with your
          consent.
        </p>

        <h2>5. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information.</p>

        <h2>6. Your Rights and Choices</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information.</p>

        <h2>7. Changes to this Policy</h2>
        <p>We may change this privacy policy from time to time. If we make significant changes, we will notify you.</p>

        <h2>8. Contact Us</h2>
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
          onClick={() => window.print()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-colors"
          aria-label="Print Privacy Policy"
        >
          Print Privacy Policy
        </Button>
      </div>
    </div>
  )
}

