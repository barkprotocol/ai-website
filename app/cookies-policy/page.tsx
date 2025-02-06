import type { Metadata } from "next"
import Link from "next/link"

import { sharedMetadata } from "@/components/shared-metadata"
import { DynamicPrintButton } from "./client-components"

export const metadata: Metadata = sharedMetadata({
  title: "Cookies Policy",
  description: "Learn about how we use cookies on our website.",
})

export default function CookiesPolicy() {
  return (
    <div className="container mx-auto max-w-3xl py-8">
      <h1 className="mb-6 text-3xl font-bold">Cookies Policy</h1>
      <div className="prose dark:prose-invert">
        <p>
          This Cookies Policy explains how Bark AI Agent ("we", "us", and "our") uses cookies and similar technologies
          to recognize you when you visit our website at{" "}
          <Link href="https://bark.ai" className="text-primary hover:underline">
            https://bark.ai
          </Link>{" "}
          ("Website"). It explains what these technologies are and why we use them, as well as your rights to control
          our use of them.
        </p>

        <h2>What are cookies?</h2>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website.
          Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
          as well as to provide reporting information.
        </p>

        <h2>Why do we use cookies?</h2>
        <p>
          We use first-party and third-party cookies for several reasons. Some cookies are required for technical
          reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary"
          cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience
          on our Website. Third parties serve cookies through our Website for advertising, analytics and other purposes.
        </p>

        <h2>How can I control cookies?</h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by
          setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which
          categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly
          necessary to provide you with services.
        </p>

        <h2>Where can I get further information?</h2>
        <p>
          If you have any questions about our use of cookies or other technologies, please email us at{" "}
          <a href="mailto:privacy@bark.ai" className="text-primary hover:underline">
            privacy@bark.ai
          </a>
          .
        </p>
      </div>
      <div className="mt-8">
        <DynamicPrintButton />
      </div>
    </div>
  )
}

