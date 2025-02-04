import type { Metadata } from "next/types"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import AuthProviders from "@/components/auth-providers"
import Header from "@/components/home/header"
import Footer from "@/components/home/footer"
import ErrorBoundary from "@/components/error-boundary"
import { getSeoMetadata } from "@/lib/seo.config"
import PageLoading from "@/components/ui/page-loading"
import "./styles/globals.css"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { useMemo } from "react"
import { syne, poppins, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export const metadata: Metadata = getSeoMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const wallets = useMemo(() => [], []) // Empty array as we're using standard wallets

  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${poppins.variable} ${inter.variable}`}>
      <body className={cn("min-h-screen bg-background font-sans antialiased", syne.variable)}>
        <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_SOLANA_RPC_URL!}>
              <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                  <AuthProviders>
                    <Header />
                    <Suspense fallback={<PageLoading />}>
                      <main className="flex-grow">{children}</main>
                    </Suspense>
                    <Footer />
                    <Toaster />
                  </AuthProviders>
                </WalletModalProvider>
              </WalletProvider>
            </ConnectionProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

