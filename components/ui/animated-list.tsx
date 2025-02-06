"use client"

import React, { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export interface AnimatedListProps {
  className?: string
  children: React.ReactNode
  delay?: number
  initialDelay?: number
}

export const AnimatedList = React.memo(({ className, children, delay = 1000, initialDelay = 0 }: AnimatedListProps) => {
  const [index, setIndex] = useState(0)
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  useEffect(() => {
    if (index < childrenArray.length) {
      const timeout = setTimeout(
        () => {
          setIndex((prevIndex) => prevIndex + 1)
        },
        index === 0 ? initialDelay : delay,
      )

      return () => clearTimeout(timeout)
    }
  }, [index, delay, initialDelay, childrenArray.length])

  const itemsToShow = useMemo(() => {
    return childrenArray.slice(0, index)
  }, [index, childrenArray])

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <AnimatePresence>
        {itemsToShow.map((item, idx) => (
          <AnimatedListItem key={(item as React.ReactElement).key || idx}>{item}</AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  )
})

AnimatedList.displayName = "AnimatedList"

interface AnimatedListItemProps {
  children: React.ReactNode
}

export const AnimatedListItem: React.FC<AnimatedListItemProps> = ({ children }) => {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

