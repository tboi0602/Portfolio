"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  blur?: boolean
  duration?: number
  scale?: boolean
  distance?: number
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  blur = false,
  duration = 0.7,
  scale = false,
  distance = 30,
}: RevealProps) {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionMap[direction],
        scale: scale ? 0.98 : 1,
        filter: blur ? "blur(6px)" : "none",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
