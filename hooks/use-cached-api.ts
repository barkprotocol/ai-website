import { useState, useEffect } from "react"

interface CacheItem<T> {
  data: T
  timestamp: number
}

const cache: { [key: string]: CacheItem<any> } = {}
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function useCachedApi<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedItem = cache[url]
        if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
          setData(cachedItem.data)
          setIsLoading(false)
          return
        }

        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
        cache[url] = { data: result, timestamp: Date.now() }
      } catch (e) {
        setError(e instanceof Error ? e : new Error("An unknown error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url, options])

  return { data, error, isLoading }
}

