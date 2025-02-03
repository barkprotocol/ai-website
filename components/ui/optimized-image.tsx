"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallbackSrc?: string
}

export function OptimizedImage({ className, fallbackSrc, ...props }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden="true">
          <span className="sr-only">Loading image...</span>
        </div>
      )}
      <Image
        {...props}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          error ? "hidden" : "block",
          className,
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setError(true)
        }}
      />
      {error && fallbackSrc && (
        <Image
          {...props}
          src={fallbackSrc || "/placeholder.svg"}
          className={cn("transition-opacity duration-300", className)}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  )
}

