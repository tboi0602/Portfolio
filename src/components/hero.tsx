"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { ArrowRight, Download, Trophy, Briefcase, Rocket } from "lucide-react"
import { MagneticButton } from "./magnetic-button"

const HeroScene = dynamic(
  () => import("./hero-scene").then((mod) => ({ default: mod.HeroScene })),
  { ssr: false }
)

const badges = [
  { icon: Trophy, text: "Top 12 Startup Competition" },
  { icon: Briefcase, text: "Real Business Project" },
  { icon: Rocket, text: "5+ Fullstack Projects" },
]

const ease = [0.16, 1, 0.3, 1] as const

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, delay, ease },
})

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          <div className="z-10 pt-8 lg:pt-0">
            <motion.div {...fadeUp(0.3)}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-mono mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Product Engineer Portfolio
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.5)}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
                <span className="text-white">Huynh Tan</span>
                <span className="text-gradient">Tai</span>
              </h1>
            </motion.div>

            <motion.div {...fadeUp(0.7)}>
              <p className="text-lg sm:text-xl text-zinc-400 mb-3 font-medium">
                Fullstack Developer
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.9)}>
              <p className="text-base text-zinc-500 max-w-md mb-10 leading-relaxed">
                Building modern web products with great user experience —
                from concept to production deployment.
              </p>
            </motion.div>

            <motion.div {...fadeUp(1.1)}>
              <div className="flex flex-wrap gap-3 mb-12">
                <MagneticButton href="#projects" className="group inline-flex h-11 px-6 items-center justify-center rounded-xl bg-white text-[#0a0a0f] text-sm font-medium hover:bg-zinc-200 transition-all duration-200">
                  View Projects
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
                </MagneticButton>
                <MagneticButton href="/HuynhTanTai_CV.docx" download className="group inline-flex h-11 px-6 items-center justify-center rounded-xl border border-white/10 text-sm text-zinc-300 hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200">
                  <Download size={14} className="mr-2" />
                  Download CV
                </MagneticButton>
              </div>
            </motion.div>

            <div className="flex flex-col gap-3">
              {badges.map((badge, i) => (
                <motion.div key={badge.text} {...fadeUp(1.3 + i * 0.15)}>
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <badge.icon size={14} className="text-cyan-400" />
                    </span>
                    <span>{badge.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.6, ease }}
            className="hidden lg:block z-10"
          >
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 blur-3xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 1.2, ease }}
              />
              <motion.div
                className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-400/[0.03] via-transparent to-blue-400/[0.03] blur-2xl animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.4, ease }}
              />
              <div className="relative w-full h-full">
                <HeroScene />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
