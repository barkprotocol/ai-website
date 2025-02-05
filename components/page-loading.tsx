import { Loader2 } from 'lucide-react'
import { Logo } from "@/components/ui/logo"

export default function PageLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        <Logo width={64} height={64} className="animate-pulse" />
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg font-medium text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  )
}
