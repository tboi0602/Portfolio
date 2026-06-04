"use client"

import { useRef, type ReactNode } from "react"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  as?: "a" | "button"
  href?: string
  download?: boolean
  onClick?: () => void
}

export function MagneticButton({
  children,
  className,
  as: Tag = "a",
  href,
  download,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = "translate(0px, 0px)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {Tag === "a" ? (
        <a href={href} className={className} download={download}>
          {children}
        </a>
      ) : (
        <button onClick={onClick} className={className}>
          {children}
        </button>
      )}
    </div>
  )
}
