import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { mockDb, type FindUniqueArgs } from "@/lib/mock-db"
import { createHash, timingSafeEqual } from "crypto"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const findArgs: FindUniqueArgs = {
          where: { email: credentials.email },
        }
        const user = await mockDb.user.findUnique(findArgs)

        if (!user || !user.password) {
          throw new Error("User not found")
        }

        const hashedInputPassword = createHash("sha256").update(credentials.password).digest("hex")
        const hashedStoredPassword = Buffer.from(user.password, "hex")
        const isValid = timingSafeEqual(Buffer.from(hashedInputPassword, "hex"), hashedStoredPassword)

        if (!isValid) {
          throw new Error("Invalid password")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name || undefined,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).id = token.id
      }
      return session
    },
  },
}

