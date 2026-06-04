"use client"

import { useRef, useCallback, type ReactNode } from "react"

interface TiltCardProps {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -6
      const rotateY = ((x - centerX) / centerX) * 6
      cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.1) 0%, transparent 60%)`
      }
    })
  }, [])

  const handleLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
    if (!cardRef.current) return
    cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)"
    if (glareRef.current) glareRef.current.style.background = "transparent"
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}
    >
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
      />
      {children}
    </div>
  )
}
