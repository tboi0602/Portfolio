"use client"

import { useEffect, useState } from "react"

export function PageIntro() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[99] pointer-events-none bg-[#0a0a0f]"
      style={{
        animation: "fade-out 2s ease-out forwards",
      }}
    />
  )
}
