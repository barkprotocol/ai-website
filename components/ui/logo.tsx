import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export function Logo({ width = 40, height = 40, className }: LogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"
        alt="BARK Logo"
        width={width}
        height={height}
        className="rounded-full"
      />
    </div>
  )
}

