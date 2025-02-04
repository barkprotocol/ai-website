import { createHash } from "crypto"

export interface FindUniqueArgs {
  where: {
    id?: string
    email?: string
  }
}

export interface User {
  id: string
  email: string
  name: string | null
  password: string
  isSubscribed: boolean
  subscriptionEndsAt: Date | null
  walletAddress: string | null
}

export interface Subscription {
  id: string
  userId: string
  startDate: Date
  endDate: Date
  active: boolean
}

export interface UpdateManyArgs {
  where: Partial<Subscription>
  data: Partial<Subscription>
}

export interface FindManyArgs {
  where: Partial<Subscription>
}

// Temporary mock implementation to replace Prisma
export const mockDb = {
  user: {
    findUnique: async (args: FindUniqueArgs): Promise<User | null> => {
      // This is a simplified mock that returns a user based on id or email
      if (args.where.id === "mock-user-id" || args.where.email === "mock@example.com") {
        return {
          id: "mock-user-id",
          email: "mock@example.com",
          name: "Mock User",
          password: createHash("sha256").update("your-default-password").digest("hex"),
          isSubscribed: false,
          subscriptionEndsAt: null,
          walletAddress: null,
        }
      }
      return null
    },
    update: async (args: { where: { id: string }; data: Partial<User> }): Promise<User> => {
      const user = await mockDb.user.findUnique({ where: { id: args.where.id } })
      if (!user) {
        throw new Error("User not found")
      }
      return {
        ...user,
        ...args.data,
      }
    },
  },
  subscription: {
    findFirst: async (args: { where: { userId: string; active: boolean } }): Promise<Subscription | null> => {
      // Mock implementation
      if (args.where.userId === "mock-user-id" && args.where.active) {
        return {
          id: "mock-subscription-id",
          userId: "mock-user-id",
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          active: true,
        }
      }
      return null
    },
    create: async (args: { data: Subscription }): Promise<Subscription> => {
      // Mock implementation
      return {
        ...args.data,
        id: "mock-subscription-id",
      }
    },
    updateMany: async (args: UpdateManyArgs): Promise<{ count: number }> => {
      // Mock implementation
      console.log("Updating subscription:", args)
      return { count: 1 }
    },
    findMany: async (args: FindManyArgs): Promise<Subscription[]> => {
      // Mock implementation that respects the where clause
      if (args.where.endDate && args.where.endDate <= new Date()) {
        const currentDate = new Date()
        return [
          {
            id: "mock-expired-subscription",
            userId: "mock-user-id",
            startDate: new Date(currentDate.getTime() - 60 * 24 * 60 * 60 * 1000),
            endDate: new Date(currentDate.getTime() - 86400000), // 1 day ago
            active: true,
          },
        ]
      }
      return []
    },
  },
}

