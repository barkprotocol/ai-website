"use client"

import { useEffect, useState, useCallback } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)

  const handleChange = useCallback((event: MediaQueryListEvent) => {
    setMatches(event.matches)
  }, [])

  useEffect(() => {
    setMounted(true)

    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      const mediaQuery = window.matchMedia(query)
      setMatches(mediaQuery.matches)

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } else {
      console.warn("matchMedia is not supported in this environment")
    }
  }, [query, handleChange])

  // Prevent hydration mismatch by returning false until mounted
  if (!mounted) return false

  return matches
}

