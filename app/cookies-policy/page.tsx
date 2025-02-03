import type { Metadata } from "next"
import { sharedMetadata } from "@/components/shared-metadata"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCallback } from "react"

export const metadata: Metadata = sharedMetadata({
  title: "Cookies Policy",
  description: "Cookies Policy for the BARK AI Agent platform",
  keywords: ["cookies", "tracking", "user preferences"],
})

export default function CookiesPolicyPage() {
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
      <h1 className="text-4xl font-bold mb-8">Cookies Policy</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {currentDate}</p>
        <h2>1. What are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your device when you visit a website. They are widely used to
          make websites work more efficiently and provide information to the owners of the site.
        </p>
        <h2>2. How We Use Cookies</h2>
        <p>We use cookies for the following purposes:</p>
        <ul>
          <li>To enable certain functions of the Service</li>
          <li>To provide analytics</li>
          <li>To store your preferences</li>
          <li>To enable advertisements delivery, including behavioral advertising</li>
        </ul>
        <h2>3. Types of Cookies We Use</h2>
        <p>
          We use both session and persistent cookies on the Service and we use different types of cookies to run the
          Service:
        </p>
        <ul>
          <li>Essential cookies: Necessary for the operation of the website</li>
          <li>
            Analytical/performance cookies: Allow us to recognize and count the number of visitors and see how visitors
            move around our website
          </li>
          <li>Functionality cookies: Used to recognize you when you return to our website</li>
          <li>
            Targeting cookies: Record your visit to our website, the pages you have visited and the links you have
            followed
          </li>
        </ul>
        <h2>4. Your Choices Regarding Cookies</h2>
        <p>
          If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the
          help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you
          might not be able to use all of the features we offer.
        </p>
        <h2>5. Changes to This Cookies Policy</h2>
        <p>
          We may update our Cookies Policy from time to time. We will notify you of any changes by posting the new
          Cookies Policy on this page.
        </p>
        <h2>6. Contact Us</h2>
        <p>
          If you have any questions about our Cookies Policy, please contact us at{" "}
          <a href="mailto:privacy@barkprotocol.net" className="text-primary hover:underline">
            privacy@barkprotocol.net
          </a>
          .
        </p>
      </div>
      <div className="mt-8 text-center">
        <Button
          onClick={handlePrint}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-colors"
          aria-label="Print Cookies Policy"
        >
          Print Cookies Policy
        </Button>
      </div>
    </div>
  )
}

