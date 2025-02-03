"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLDivElement>
  fromRef: React.RefObject<HTMLDivElement>
  toRef: React.RefObject<HTMLDivElement>
  curvature?: number
  reverse?: boolean
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 15,
  reverse = false,
}) => {
  const pathRef = useRef<SVGPathElement>(null)
  const controls = useAnimation()
  const isInView = useInView(containerRef)

  useEffect(() => {
    if (isInView) {
      controls.start({ pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } })
    } else {
      controls.start({ pathLength: 0, opacity: 0 })
    }
  }, [isInView, controls])

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current || !pathRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const fromRect = fromRef.current.getBoundingClientRect()
      const toRect = toRef.current.getBoundingClientRect()

      const fromX = fromRect.left + fromRect.width / 2 - containerRect.left
      const fromY = fromRect.top + fromRect.height / 2 - containerRect.top
      const toX = toRect.left + toRect.width / 2 - containerRect.left
      const toY = toRect.top + toRect.height / 2 - containerRect.top

      const midX = (fromX + toX) / 2
      const midY = (fromY + toY) / 2 + (reverse ? -curvature : curvature)

      const d = `M ${fromX},${fromY} Q ${midX},${midY} ${toX},${toY}`
      pathRef.current.setAttribute("d", d)
    }

    updatePath()
    window.addEventListener("resize", updatePath)
    return () => window.removeEventListener("resize", updatePath)
  }, [containerRef, fromRef, toRef, curvature, reverse])

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
      <motion.path
        ref={pathRef}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={controls}
        style={{ clipPath: "inset(0 100% 0 0)" }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(219,207,199,0.1)" />
          <stop offset="50%" stopColor="rgba(219,207,199,0.3)" />
          <stop offset="100%" stopColor="rgba(219,207,199,0.1)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

