// Temporary mock implementation to replace Prisma
export const mockDb = {
    user: {
      findUnique: async (p0: { where: { email: string; }; }) => ({
        id: "mock-user-id",
        email: "mock@example.com",
        name: "Mock User",
        isSubscribed: false,
        subscriptionEndsAt: null,
        walletAddress: null,
        password: "$2a$10$XXXXXXXXXXXXXXXXXXXXXeXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // This is a mock hashed password
      }),
      update: async (data: any) => ({
        ...data.data,
        id: "mock-user-id",
      }),
    },
    subscription: {
      findFirst: async (p0: { where: { userId: any; active: boolean; }; }) => null,
      create: async (data: any) => ({
        ...data.data,
        id: "mock-subscription-id",
      }),
      updateMany: async (p0: { where: { userId: any; active: boolean; }; data: { active: boolean; endDate: Date; }; }) => ({ count: 1 }),
      findMany: async () => [],
    },
  }
  
  
  