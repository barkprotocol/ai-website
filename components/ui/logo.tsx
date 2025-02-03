import Image from "next/image"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  const { theme } = useTheme()

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="relative w-10 h-10">
        <Image
          src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
          alt="BARK AI Logo"
          layout="fill"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <span className={`font-bold text-xl font-inter leading-none ${theme === "dark" ? "text-white" : "text-black"}`}>
          BARK
        </span>
        <span
          className={`text-xs font-inter font-medium tracking-wider ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
        >
          AI AGENT
        </span>
      </div>
    </div>
  )
}

