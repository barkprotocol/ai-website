import { Loader2 } from "lucide-react"

export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg text-muted-foreground">Loading...</p>
    </div>
  )
}

