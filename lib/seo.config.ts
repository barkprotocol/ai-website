import type { Metadata } from "next"

const defaultMetadata: Metadata = {
  title: "BARK AI Agent",
  description: "Your intelligent copilot for Solana trading and DeFi interactions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai.barkprotocol.net",
    siteName: "BARK AI Agent",
    images: [
      {
        url: "https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp",
        width: 1200,
        height: 630,
        alt: "BARK AI Agent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bark_protocol",
    creator: "BARK Protocol",
  },
}

export function getSeoMetadata(pageMetadata: Partial<Metadata> = {}): Metadata {
  return {
    ...defaultMetadata,
    ...pageMetadata,
    title: pageMetadata.title ? `${pageMetadata.title} | ${defaultMetadata.title}` : defaultMetadata.title,
  }
}

