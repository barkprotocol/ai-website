import type { Metadata } from "next"
import { Syne, Poppins, Inter, Oswald } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import AuthProvider from "@/components/auth-provider"
import Header from "@/components/home/header"
import Footer from "@/components/home/footer"
import ErrorBoundary from "@/components/error-boundary"
import { getSeoMetadata } from "@/lib/seo.config"
import PageLoading from "@/components/ui/page-loading"
import WalletProviderComponent from "@/components/wallet-provider"
import "./globals.css"
import type React from "react"
import { Suspense } from "react"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
})

export const metadata: Metadata = getSeoMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${poppins.variable} ${inter.variable} ${oswald.variable}`}
    >
      <body className="font-sans flex flex-col min-h-screen bg-background text-foreground">
        <ErrorBoundary
          fallback={<div className="p-4 text-center text-red-500">Something went wrong. Please try again later.</div>}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <WalletProviderComponent>
              <AuthProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <Suspense fallback={<PageLoading />}>
                    <main className="flex-grow">{children}</main>
                  </Suspense>
                  <Footer />
                </div>
                <Toaster />
              </AuthProvider>
            </WalletProviderComponent>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

