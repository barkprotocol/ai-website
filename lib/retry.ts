export async function retry<T>(operation: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  let lastError: Error | null = null
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      console.error(`Attempt ${i + 1} failed: ${lastError.message}`)
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }
  throw lastError
}

