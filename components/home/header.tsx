"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LogOut } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useAuth } from "@/hooks/use-auth"
import { WalletButton } from "@/components/ui/wallet-button"
import { Logo } from "@/components/ui/logo"
import { useTheme } from "next-themes"

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
  const { theme } = useTheme()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-lg font-medium transition-colors hover:text-primary ${
                theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-600"
              }`}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className={`text-lg font-medium transition-colors hover:text-primary ${
                theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-600"
              }`}
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
  const { theme } = useTheme()

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const headerBg = isScrolled
    ? theme === "dark"
      ? "bg-black/80 backdrop-blur-sm shadow-sm"
      : "bg-white/80 backdrop-blur-sm shadow-sm"
    : "bg-transparent"

  const textColor = theme === "dark" ? "text-white" : "text-black"
  const hoverColor = theme === "dark" ? "hover:text-gray-300" : "hover:text-gray-600"

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${headerBg}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4" aria-label="Main Navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${textColor} ${hoverColor} px-2 py-1 rounded-md ${
                  pathname === item.href ? (theme === "dark" ? "bg-white/10" : "bg-black/10") : ""
                }`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${textColor} ${hoverColor} px-2 py-1 rounded-md ${
                  pathname === "/dashboard" ? (theme === "dark" ? "bg-white/10" : "bg-black/10") : ""
                }`}
                aria-current={pathname === "/dashboard" ? "page" : undefined}
              >
                Dashboard
              </Link>
            )}
          </nav>
        )}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {!isMobile && (
            <>
              <WalletButton />
              {isAuthenticated ? (
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className={`${textColor} ${theme === "dark" ? "border-white hover:bg-white/10" : "border-black hover:bg-black/10"}`}
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  Logout
                </Button>
              ) : (
                <Button
                  asChild
                  className={
                    theme === "dark" ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
                  }
                >
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </>
          )}
          <ThemeToggle />
          {isMobile && (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`md:hidden ${textColor} ${
                    theme === "dark" ? "border-white hover:bg-white/10" : "border-black hover:bg-black/10"
                  }`}
                  aria-label="Open menu"
                >
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

