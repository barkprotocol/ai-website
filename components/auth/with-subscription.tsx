import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type React from "react" // Added import for React

export function withSubscription<P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  return function WithSubscriptionComponent(props: P) {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !user?.isSubscribed) {
        router.push("/dashboard/subscription")
      }
    }, [user, isLoading, router])

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (!user?.isSubscribed) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

