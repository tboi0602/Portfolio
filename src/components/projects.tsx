"use client"

import { Reveal } from "./reveal"
import { ProjectCard } from "./project-card"
import type { Project } from "@/lib/data"

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-400 font-mono">
              Featured Work
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex items-end justify-between mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Projects
              <span className="text-gradient">.</span>
            </h2>
            <span className="hidden sm:block text-xs text-zinc-500">
              {projects.length} projects
            </span>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
