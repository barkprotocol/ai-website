"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Head from "next/head"

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | BARK AI Agent</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Please check the URL or navigate back to the homepage."
        />
      </Head>
      <motion.main
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "flex items-center justify-center min-h-screen",
          "bg-background text-foreground",
          "transition-colors duration-300",
        )}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-lg mb-4">Page not found</p>
          <Link href="/" className="text-primary underline hover:text-primary/80 transition-colors">
            Go back home
          </Link>
        </div>
      </motion.main>
    </>
  )
}

