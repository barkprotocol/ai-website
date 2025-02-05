import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { Session } from "next-auth"
import type { JWT } from "next-auth/jwt"
import { compare } from "bcryptjs"
import type { User } from "@prisma/client"

// Extend the built-in User type to include id
declare module "next-auth" {
  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

// Mock database (replace with actual database in production)
const users = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "$2a$10$IiUd5UkVWZrLKq7Q7XKzXOZzXqXZJvzz5YJGQz5XYw5Uu8TjQJKFy", // hashed 'password123'
  },
]

async function findUser(email: string) {
  return users.find((user) => user.email === email)
}

async function validatePassword(user: (typeof users)[0], inputPassword: string) {
  return compare(inputPassword, user.password)
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const user = await findUser(credentials.email)
        if (!user) {
          throw new Error("No user found with this email")
        }

        const isPasswordValid = await validatePassword(user, credentials.password)
        if (!isPasswordValid) {
          throw new Error("Invalid password")
        }

        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | undefined }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT & { id?: string } }) {
      if (session.user && token.id) {
        session.user.id = token.id
      }
      return session
    },
  },
}

export default NextAuth(authOptions)

