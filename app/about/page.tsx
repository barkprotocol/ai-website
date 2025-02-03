import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Brain, Shield, LineChart, Zap, Rocket, Code, Gavel } from "lucide-react"
import { Icons } from "@/components/ui/icons"

export const metadata: Metadata = {
  title: "About BARK AI Agent",
  description:
    "Learn more about BARK AI Agent, our MVP status, and our vision for community-driven development on Solana",
}

const coreValues = [
  { title: "Innovation", description: "Pushing the boundaries of AI and blockchain.", icon: Brain },
  { title: "Security", description: "Ensuring top-tier protection for assets and data.", icon: Shield },
  { title: "Performance", description: "Delivering fast, efficient trading solutions.", icon: Zap },
  { title: "Transparency", description: "Operating with openness in all processes.", icon: LineChart },
]

const communityLinks = [
  { name: "Discord", href: "https://discord.gg/barkprotocol", icon: Icons.Discord },
  { name: "Telegram", href: "https://t.me/barkprotocol", icon: Icons.Telegram },
  { name: "X", href: "https://twitter.com/bark_protocol", icon: Icons.X },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-8 text-center">About BARK AI Agent</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg mb-6">
              BARK AI Agent combines cutting-edge AI with Solana blockchain to revolutionize your trading experience.
            </p>
            <p className="text-lg mb-6">
              Our mission: Empower traders with AI-driven insights, real-time analysis, and seamless DeFi interactions.
            </p>
            <p className="text-lg mb-6">
              Optimize strategies, make data-driven decisions, and lead in the fast-paced world of Solana trading.
            </p>
            <Button asChild className="mt-4 bg-black text-white hover:bg-gray-800">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
          <div className="relative h-64 md:h-full">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="BARK AI Agent Dashboard"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-md relative overflow-hidden">
              <div className="flex items-center mb-4 relative z-10">
                <value.icon className="h-8 w-8 text-[#dcd7cc] mr-2" />
                <h3 className="text-xl font-semibold">{value.title}</h3>
              </div>
              <p className="text-muted-foreground relative z-10">{value.description}</p>
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Image
                  src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
                  alt="BARK Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Technology</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Advanced AI Algorithms</h3>
            <p className="text-lg mb-4">
              AI models trained on vast market data, identifying patterns for accurate predictions and informed trading
              decisions.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Solana Blockchain Integration</h3>
            <p className="text-lg mb-4">
              Leveraging Solana's high-speed, low-cost blockchain for swift and efficient trade execution.
            </p>
          </div>
          <div className="relative h-64 md:h-full">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="BARK AI Technology Illustration"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Current Status: MVP</h2>
        <div className="bg-card p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4">
            BARK AI Agent is currently in its Minimum Viable Product (MVP) stage. We've built a solid foundation with
            core AI trading features, but we're just getting started.
          </p>
          <p className="text-lg mb-4">
            Our vision extends far beyond this initial release. To reach our full potential, we need your support:
          </p>
          <ul className="list-disc list-inside mb-4 text-lg">
            <li>Community engagement to provide feedback and shape our roadmap</li>
            <li>Developers to contribute and expand our ecosystem</li>
            <li>Early adopters to test and refine our AI models</li>
          </ul>
          <p className="text-lg">Together, we can build the most powerful AI trading platform on Solana.</p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Future Development</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Code className="h-8 w-8 text-[#dcd7cc] mr-2" />
              <h3 className="text-2xl font-semibold">Developer Ecosystem</h3>
            </div>
            <p className="text-lg">
              We're creating a robust ecosystem for developers to build on top of BARK AI Agent. Soon, we'll launch our
              SDK and API documentation, enabling the community to create custom trading strategies, integrations, and
              tools.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Gavel className="h-8 w-8 text-[#dcd7cc] mr-2" />
              <h3 className="text-2xl font-semibold">Community Governance</h3>
            </div>
            <p className="text-lg">
              Our roadmap includes implementing a decentralized governance system. BARK token holders will have the
              power to propose and vote on key decisions, ensuring that our platform evolves in line with community
              needs and vision.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Join the BARK Community</h2>
        <p className="text-lg mb-6 text-center">
          Be part of our growing community. Share insights, learn, and shape the future of AI-driven Solana trading.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {communityLinks.map((link, index) => (
            <Button key={index} asChild className="bg-black text-white hover:bg-gray-800">
              <Link href={link.href} className="flex items-center">
                <link.icon className="mr-2 h-5 w-5 text-[#dcd7cc]" />
                Join {link.name}
              </Link>
            </Button>
          ))}
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Shape the Future?</h2>
        <p className="text-lg mb-6">
          Experience AI-driven trading on Solana. Join BARK AI Agent, contribute to our growth, and be part of the next
          generation of decentralized finance.
        </p>
        <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
          <Link href="/signup">
            <Rocket className="mr-2 h-5 w-5 text-[#dcd7cc]" />
            Launch Your AI Trading Journey
          </Link>
        </Button>
      </section>
    </div>
  )
}

