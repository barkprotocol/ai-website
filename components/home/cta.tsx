import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="relative bg-black py-16 sm:py-24" aria-labelledby="cta-heading">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://ucarecdn.com/f6029e68-9768-49db-80a9-64e41e70acff/waveblack.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
          priority
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 id="cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
            Empower Your Solana Trading with BARK AI
          </h2>
          <p className="text-base sm:text-lg mb-8 text-white/90">
            Experience the future of Solana trading with the BARK AI Agent. Revolutionize your blockchain interactions
            and boost productivity today.
          </p>
          <Button
            asChild
            size="lg"
            className="font-medium px-8 py-3 text-lg bg-white text-black hover:bg-gray-100 focus:ring-4 focus:ring-white/50 transition-all shadow-lg hover:shadow-xl"
          >
            <Link href="/app">
              Launch App
              <span className="sr-only"> - Start using BARK AI</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

