"use client"

import { useEffect, useRef } from "react"

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -300, y: -300 })
  const trail = useRef({ x: -300, y: -300 })
  const target = useRef({ x: -300, y: -300 })
  const opacity = useRef(1)
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      opacity.current = 1
      clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => { opacity.current = 0 }, 3000)
    }

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.25
      pos.current.y += (target.current.y - pos.current.y) * 0.25
      trail.current.x += (target.current.x - trail.current.x) * 0.06
      trail.current.y += (target.current.y - trail.current.y) * 0.06

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 100}px, ${pos.current.y - 100}px)`
        glowRef.current.style.opacity = String(opacity.current)
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trail.current.x - 200}px, ${trail.current.y - 200}px)`
        if (opacity.current < 0.1) trailRef.current.style.opacity = "0"
        else trailRef.current.style.opacity = "1"
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMove)
    const raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      cancelAnimationFrame(raf)
      clearTimeout(idleTimer.current)
    }
  }, [])

  return (
    <>
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-[0] hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.03) 0%, transparent 60%)",
          transition: "opacity 0.5s ease",
        }}
        aria-hidden="true"
      />
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[200px] h-[200px] pointer-events-none z-[0] hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, rgba(59, 130, 246, 0.03) 40%, transparent 70%)",
          filter: "blur(4px)",
          transition: "opacity 0.5s ease",
        }}
        aria-hidden="true"
      />
    </>
  )
}
