import type React from "react"
import { DashboardSidebar } from "./app-sidebar"
import { DashboardContent } from "./content"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <DashboardContent />
        {children}
      </main>
    </div>
  )
}

