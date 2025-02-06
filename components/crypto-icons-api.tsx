"use client"
import type React from "react"
import type { IconType } from "react-icons"

interface CryptoIconProps {
  icon: IconType
  size?: number
  color?: string
}

const CryptoIcon: React.FC<CryptoIconProps> = ({ icon: Icon, size = 24, color = "currentColor" }) => {
  return <Icon size={size} color={color} />
}

export default CryptoIcon

