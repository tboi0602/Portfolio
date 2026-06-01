"use client"

import { Reveal } from "./reveal"
import { getIcon } from "@/lib/icon-map"
import type { AboutData } from "@/lib/data"

interface AboutProps {
  about: AboutData
}

export function About({ about }: AboutProps) {
  return (
    <section id="about" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-400 font-mono mb-6">
                About
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
                Building products that
                <br />
                <span className="text-gradient">matter</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-base text-zinc-400 leading-relaxed mb-4">
                {about.description}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {about.secondaryDescription}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {about.stats.map((stat, i) => {
              const StatIcon = getIcon(stat.icon)
              return (
                <Reveal key={stat.label} delay={0.2 + i * 0.1}>
                  <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 text-center hover:bg-white/[0.06] transition-all duration-300 group">
                    {StatIcon && (
                      <StatIcon
                        size={18}
                        className="text-zinc-500 mx-auto mb-3 group-hover:text-cyan-400 transition-colors"
                      />
                    )}
                    <div className="text-3xl font-bold text-gradient mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-500">{stat.label}</div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
