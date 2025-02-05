import Link from "next/link"
import Image from "next/image"
import { Icons } from "@/components/ui/icons"

const footerLinks = [
  { title: "Product", items: ["AI Agents", "Dashboard", "Pricing", "Security"] },
  { title: "About Us", items: ["About", "Blog", "Brand Guide", "Governance"] },
  {
    title: "Resources",
    items: [
      { name: "Documentation", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Official Website", href: "https://barkprotocol.net" },
    ],
  },
]

const socialLinks = [
  { name: "Discord", href: "https://discord.gg/barkprotocol", icon: "Discord" },
  { name: "Telegram", href: "https://t.me/barkprotocol", icon: "Telegram" },
  { name: "X", href: "https://x.com/bark_protocol", icon: "X" },
  { name: "GitHub", href: "https://github.com/barkprotocol", icon: "Github" },
] as const

const legalLinks = [
  { name: "Terms of Use", href: "/terms-of-use" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Cookies Policy", href: "/cookies-policy" },
]

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
                alt="BARK Logo"
                width={40}
                height={40}
                sizes="40px"
              />
              <div>
                <p className="text-2xl font-bold">BARK</p>
                <p className="text-xs font-medium">AI AGENT</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Stay connected with BARK AI Agent. Follow us on social media for the latest updates, tips, and community
              discussions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = Icons[link.icon]
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${link.name}`}
                  >
                    <Icon className="h-5 w-5 hover:scale-110 transition-transform" />
                  </a>
                )
              })}
            </div>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={typeof item === "string" ? item : item.name}>
                    <Link
                      href={typeof item === "string" ? "#" : item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={typeof item === "string" ? item : item.name}
                    >
                      {typeof item === "string" ? item : item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
              © {new Date().getFullYear()} BARK Protocol. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`Go to ${link.name}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

