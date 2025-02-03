import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { useTheme } from "next-themes"
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
  const { theme } = useTheme()

  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-100"
  const textColor = theme === "dark" ? "text-white" : "text-black"
  const mutedTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600"

  return (
    <footer className={`${bgColor} ${textColor}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
            <p className={`text-sm ${mutedTextColor} mb-4`}>
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
                    className={`${mutedTextColor} hover:${textColor} transition-colors`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${link.name}`}
                  >
                    <Icon className="h-5 w-5" />
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
                      className={`text-sm ${mutedTextColor} hover:${textColor} transition-colors`}
                    >
                      {typeof item === "string" ? item : item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className={`text-sm ${mutedTextColor} mb-4 sm:mb-0`}>
              © {new Date().getFullYear()} BARK Protocol. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm ${mutedTextColor} hover:${textColor} transition-colors`}
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

