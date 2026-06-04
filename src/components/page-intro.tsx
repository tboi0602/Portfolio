"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const FULL_NAME = "Huynh Tan Tai"
const TAGLINE = "Product Engineer"

export function PageIntro({ onFinish }: { onFinish?: () => void }) {
  const [show, setShow] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const cornerTlRef = useRef<HTMLDivElement>(null)
  const cornerBrRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const skip = localStorage.getItem("intro-seen")
    if (skip) { setShow(false); onFinish?.(); return }

    const tl = gsap.timeline({
      onComplete: () => {
        localStorage.setItem("intro-seen", "true")
        setShow(false)
        onFinish?.()
      },
    })

    tl.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power3.out" }, 0)
      .fromTo(glowRef.current, { xPercent: -100 }, { xPercent: 100, duration: 0.5, ease: "power3.out" }, 0)
      .fromTo(
        nameRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: "power2.out" },
        0.4
      )
      .fromTo(underlineRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.4, ease: "power2.out" }, 0.7)
      .fromTo(cornerTlRef.current, { opacity: 0 }, { opacity: 0.15, duration: 0.3 }, 0.6)
      .fromTo(cornerBrRef.current, { opacity: 0 }, { opacity: 0.15, duration: 0.3 }, 0.6)
      .fromTo(
        taglineRef.current?.children ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.02, ease: "power2.out" },
        0.9
      )
      .to(containerRef.current, { opacity: 0, duration: 0.6 }, 1.4)
  }, [onFinish])

  if (!show) return null

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99] flex flex-col items-center justify-center bg-[#0a0a0f]">
      {/* Loading bar */}
      <div
        ref={barRef}
        className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"
        style={{ transformOrigin: "0% 50%" }}
      />
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-full h-[6px] blur-md"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.3) 50%, transparent 100%)",
        }}
      />

      <div className="relative">
        {/* Name */}
        <div ref={nameRef} className="flex justify-center mb-3">
          {FULL_NAME.split("").map((char, i) => (
            <span
              key={i}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight inline-block"
              style={{
                color: char === "T" && (i === 6 || i === 10) ? "#22d3ee" : "#ffffff",
                textShadow:
                  char === "T" && (i === 6 || i === 10)
                    ? "0 0 30px rgba(34,211,238,0.2)"
                    : "none",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        {/* Underline */}
        <div
          ref={underlineRef}
          className="h-[2px] w-3/5 bg-gradient-to-r from-cyan-500/0 via-cyan-400 to-cyan-500/0 mx-auto rounded-full"
          style={{ transformOrigin: "50% 50%" }}
        />

        {/* Tagline */}
        <div className="text-center mt-6">
          <span
            ref={taglineRef}
            className="text-sm sm:text-base text-zinc-500 font-mono tracking-[0.2em] uppercase inline-flex flex-wrap justify-center"
          >
            {TAGLINE.split("").map((char, i) => (
              <span key={i} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Corner decorations */}
      <div
        ref={cornerTlRef}
        className="absolute top-8 left-8 w-12 h-12"
      >
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-cyan-400">
          <path d="M0 48V0h48" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div
        ref={cornerBrRef}
        className="absolute bottom-8 right-8 w-12 h-12 rotate-180"
      >
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-cyan-400">
          <path d="M0 48V0h48" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  )
}
