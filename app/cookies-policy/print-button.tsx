"use client"

import { Button } from "@/components/ui/button"
import { useCallback } from "react"

export default function PrintButton() {
  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <Button
      onClick={handlePrint}
      className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 transition-colors"
      aria-label="Print Cookies Policy"
    >
      Print Cookies Policy
    </Button>
  )
}

