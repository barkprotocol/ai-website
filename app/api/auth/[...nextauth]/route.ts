import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import { verifyMessage } from "@solana/web3.js"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Solana",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
        publicKey: { label: "Public Key", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.publicKey || !credentials?.message || !credentials?.signature) {
          return null
        }

        const messageUint8 = new TextEncoder().encode(credentials.message)
        const publicKeyUint8 = new TextEncoder().encode(credentials.publicKey)
        const signatureUint8 = new TextEncoder().encode(credentials.signature)

        const isValid = verifyMessage(messageUint8, signatureUint8, publicKeyUint8)

        if (!isValid) {
          return null
        }

        let user = await prisma.user.findUnique({
          where: { walletAddress: credentials.publicKey },
        })

        if (!user) {
          user = await prisma.user.create({
            data: { walletAddress: credentials.publicKey },
          })
        }

        return user
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

