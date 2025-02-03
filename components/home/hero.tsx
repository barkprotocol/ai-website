"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Head from "next/head"

const exchangeLinks = [
  {
    href: "https://raydium.io/",
    src: "https://cryptologos.cc/logos/raydium-ray-logo.png",
    alt: "Raydium Logo",
  },
  {
    href: "https://jup.ag/",
    src: "https://ucarecdn.com/05195456-1ed7-484b-8236-8195ebf51939/jupiter.svg",
    alt: "Jupiter Logo",
  },
  {
    href: "https://www.orca.so/",
    src: "https://ucarecdn.com/163f70d5-34ab-465f-a044-0bf1311a850a/orca.svg",
    alt: "Orca Logo",
  },
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BARK AI Agent",
    description: "Your intelligent copilot for Solana trading and DeFi interactions",
    url: "https://your-website-url.com",
  }

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>
      <AnimatePresence>
        {!mounted ? (
          <div className="w-full min-h-[calc(100vh-4rem)] bg-black animate-pulse" />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <section
              className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-black overflow-hidden py-16 px-4"
              aria-label="Hero section"
            >
              <Image
                src="https://ucarecdn.com/f6029e68-9768-49db-80a9-64e41e70acff/waveblack.png"
                alt="Abstract wave background"
                fill
                sizes="100vw"
                quality={90}
                priority
                className="object-cover object-center opacity-40"
              />
              <div
                className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black/80"
                aria-hidden="true"
              />
              <div className="relative z-10 container mx-auto text-center text-primary-foreground">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                  <div className="mb-4">
                    <span className="inline-block bg-black bg-opacity-70 text-gray-100 text-sm font-bold py-1 px-3 rounded-full">
                      BARK AI AGENT
                    </span>
                  </div>
                  <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    Your Intelligent Copilot for Solana
                  </h1>
                  <p className="font-poppins text-base sm:text-lg mb-8 text-gray-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                    Elevate your DeFi experience with BARK AI Agent. Harness the power of artificial intelligence to
                    optimize your Solana investments and navigate decentralized finance with ease.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-12">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-black hover:bg-gray-100 transition-all duration-300 shadow-md text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 relative overflow-hidden group font-poppins w-full sm:w-auto"
                    >
                      <Link href="/dashboard">
                        <span className="relative z-10">Launch Dashboard</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-all duration-300 shadow-md text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 relative overflow-hidden group font-poppins w-full sm:w-auto"
                    >
                      <Link href="https://whitepaper.ai.barkprotocol.net">
                        <span className="relative z-10">Whitepaper</span>
                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-12">
                    <p className="font-poppins text-xs sm:text-sm mb-4 text-gray-300">
                      Powered by leading Solana protocols
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                      {exchangeLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-all duration-300 hover:scale-110 group"
                        >
                          <div className="relative">
                            <Image
                              src={item.src || "/placeholder.svg"}
                              alt={item.alt}
                              width={32}
                              height={32}
                              className="h-6 w-6 sm:h-8 sm:w-8 object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-300"
                            />
                            <div
                              className="absolute inset-0 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                              aria-hidden="true"
                            ></div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="https://solscan.io/token/2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-poppins text-gray-400 text-xs sm:text-sm hover:text-white transition-colors duration-300"
                    >
                      CA: 2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

