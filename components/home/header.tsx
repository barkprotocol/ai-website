"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LogOut } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useAuth } from "@/hooks/use-auth"
import { WalletButton } from "@/components/ui/wallet-button"
import { toast } from "@/components/ui/use-toast"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/agents", label: "AI Agents" },
  { href: "/contribute", label: "Contribute" },
  { href: "/#faq", label: "FAQ" },
]

const MobileMenu = ({
  isOpen,
  onClose,
  isAuthenticated,
  logout,
}: {
  isOpen: boolean
  onClose: () => void
  isAuthenticated: boolean
  logout: () => Promise<void>
}) => {
  const connectWallet = async (walletType: string) => {
    if (walletType === "solana") {
      // Implement Solana wallet connection logic here
      // This is a placeholder and should be replaced with actual Solana wallet connection code
      console.log("Connecting to Solana wallet...")
      // Simulating a successful connection
      return Promise.resolve()
    }
    throw new Error(`Unsupported wallet type: ${walletType}`)
  }

  const handleSolanaLogin = useCallback(async () => {
    try {
      await connectWallet("solana")
      toast.success("Solana wallet connected successfully")
    } catch (error) {
      console.error("Solana wallet connection error:", error)
      toast.error("Failed to connect Solana wallet. Please try again.")
    }
  }, [])

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-medium transition-colors hover:text-primary"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="text-lg font-medium transition-colors hover:text-primary"
              onClick={onClose}
            >
              Dashboard
            </Link>
          )}
          {isAuthenticated ? (
            <Button onClick={logout} className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
              Logout
            </Button>
          ) : (
            <Button asChild className="w-full justify-start">
              <Link href="/login">Login</Link>
            </Button>
          )}
          <WalletButton />
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { isAuthenticated, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
            alt="BARK Logo"
            width={32}
            height={32}
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
          <div className="flex flex-col">
            <span className="text-lg sm:text-2xl font-bold font-inter dark:text-white">BARK</span>
            <span className="text-xs font-medium font-inter dark:text-white hidden sm:inline-block">AI AGENT</span>
          </div>
        </Link>
        {!isMobile && (
          <>
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-4" aria-label="Main Navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary dark:text-white dark:hover:text-primary px-2 py-1 rounded-md ${
                    pathname === item.href
                      ? "bg-primary/10 text-primary dark:text-primary"
                      : "text-foreground dark:text-white"
                  }`}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-primary dark:text-white dark:hover:text-primary px-2 py-1 rounded-md ${
                    pathname === "/dashboard"
                      ? "bg-primary/10 text-primary dark:text-primary"
                      : "text-foreground dark:text-white"
                  }`}
                  aria-current={pathname === "/dashboard" ? "page" : undefined}
                >
                  Dashboard
                </Link>
              )}
            </nav>
          </>
        )}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {!isMobile && (
            <>
              <WalletButton />
              {isAuthenticated ? (
                <Button onClick={logout} variant="outline" size="sm">
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  Logout
                </Button>
              ) : (
                <Button asChild className="bg-black hover:bg-gray-800 text-white">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </>
          )}
          <ThemeToggle />
          {isMobile && (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                isAuthenticated={isAuthenticated}
                logout={logout}
              />
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}

