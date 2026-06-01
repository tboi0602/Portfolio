"use client"

import { BookOpen, FolderGit2, Layers } from "lucide-react"
import { Reveal } from "./reveal"

const stats = [
  { label: "GPA", value: "7.44", icon: BookOpen },
  { label: "Projects", value: "5+", icon: FolderGit2 },
  { label: "Tech Stack", value: "10+", icon: Layers },
]

export function About() {
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
                I build fullstack web applications with a strong focus on UX/UI.
                Currently studying Software Engineering at Ton Duc Thang University.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Passionate about turning complex problems into simple, beautiful,
                and intuitive digital experiences.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.2 + i * 0.1}>
                <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 text-center hover:bg-white/[0.06] transition-all duration-300 group">
                  <stat.icon
                    size={18}
                    className="text-zinc-500 mx-auto mb-3 group-hover:text-cyan-400 transition-colors"
                  />
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
