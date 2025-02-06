"use client"

import { useState } from "react"
import bs58 from "bs58"
import { Copy, ExternalLink, Check } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CopyableTextProps {
  text: string
  /**
   * Whether to show Solscan link
   */
  showSolscan?: boolean
  /**
   * Optional className for the container
   */
  className?: string
}

/**
 * Copyable text component with clipboard support and Solscan link
 */
export const CopyableText = ({ text, showSolscan = false, className }: CopyableTextProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      toast.success("Copied to clipboard")
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
      toast.error("Failed to copy text")
    }
  }

  // Validate if it's a valid bs58 address
  const isValidBs58 = (text: string): boolean => {
    try {
      const decoded = bs58.decode(text)
      return decoded.length === 32 // Solana address should be 32 bytes
    } catch {
      return false
    }
  }

  const isValidBase58 = isValidBs58(text)
  const shouldShowSolscanLink = showSolscan && isValidBase58

  return (
    <div className={cn("flex w-full select-none items-center gap-2", className)}>
      <div className="min-w-0 flex-1 truncate">
        <span className="block font-mono text-sm" title={text}>
          {text}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCopy(text)}
          className="h-6 w-6 hover:bg-sidebar-accent/50"
          aria-label={isCopied ? "Copied" : "Copy to clipboard"}
        >
          {isCopied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
        {shouldShowSolscanLink && (
          <Button variant="ghost" size="sm" asChild className="h-6 w-6 hover:bg-sidebar-accent/50">
            <a
              href={`https://solscan.io/account/${text}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on Solscan"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}

