import type { ReactNode } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Sidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Home, BarChart2, CreditCard, Settings } from "lucide-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="w-64">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">BARK AI Agent</h2>
            <nav className="space-y-2">
              <Link href="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary"
              >
                <BarChart2 className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
              <Link
                href="/dashboard/subscription"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary"
              >
                <CreditCard className="h-5 w-5" />
                <span>Subscription</span>
              </Link>
              <Link href="/dashboard/settings" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <WalletMultiButton className="w-full mb-2">
              {({ wallet, connecting, connected }) => (
                <span>
                  {!wallet
                    ? "Select Wallet"
                    : connecting
                      ? "Connecting..."
                      : connected
                        ? `Connected: ${wallet.adapter.name}`
                        : `Connect to ${wallet.adapter.name}`}
                </span>
              )}
            </WalletMultiButton>
            <ThemeToggle />
            <Button onClick={handleLogout} variant="ghost" className="w-full mt-2">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </Sidebar>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
    </div>
  )
}

