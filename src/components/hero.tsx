"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { ArrowRight, Download, Trophy, Briefcase, Rocket } from "lucide-react"
import { Reveal } from "./reveal"

const HeroScene = dynamic(
  () => import("./hero-scene").then((mod) => ({ default: mod.HeroScene })),
  { ssr: false }
)

const badges = [
  { icon: Trophy, text: "Top 12 Startup Competition" },
  { icon: Briefcase, text: "Real Business Project" },
  { icon: Rocket, text: "5+ Fullstack Projects" },
]

export function Hero() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 200)
    return () => clearTimeout(timer)
  }, [])

  if (!ready) return null

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          <div className="z-10 pt-8 lg:pt-0">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-mono mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Product Engineer Portfolio
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
                <span className="text-white">Huynh Tan</span>
                <span className="text-gradient">Tai</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg sm:text-xl text-zinc-400 mb-3 font-medium">
                Fullstack Developer
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-base text-zinc-500 max-w-md mb-10 leading-relaxed">
                Building modern web products with great user experience —
                from concept to production deployment.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-3 mb-12">
                <a
                  href="#projects"
                  className="group inline-flex h-11 px-6 items-center justify-center rounded-xl bg-white text-[#0a0a0f] text-sm font-medium hover:bg-zinc-200 transition-all duration-200"
                >
                  View Projects
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="/HuynhTanTai_CV_Formatted.docx"
                  download
                  className="group inline-flex h-11 px-6 items-center justify-center rounded-xl border border-white/10 text-sm text-zinc-300 hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
                >
                  <Download size={14} className="mr-2" />
                  Download CV
                </a>
              </div>
            </Reveal>

            <div className="flex flex-col gap-3">
              {badges.map((badge, i) => (
                <Reveal key={badge.text} delay={0.5 + i * 0.1} direction="left">
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <badge.icon size={14} className="text-cyan-400" />
                    </span>
                    <span>{badge.text}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2} className="hidden lg:block z-10">
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 blur-3xl" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-400/[0.03] via-transparent to-blue-400/[0.03] blur-2xl animate-pulse" />
              <div className="relative w-full h-full">
                <HeroScene />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
